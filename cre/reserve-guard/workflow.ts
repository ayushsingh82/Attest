import {
	bytesToHex,
	ConsensusAggregationByFields,
	type CronPayload,
	cre,
	getNetwork,
	type HTTPSendRequester,
	median,
	type Runtime,
	TxStatus,
} from '@chainlink/cre-sdk'
import { type Address, encodeAbiParameters, type Hex } from 'viem'
import { z } from 'zod'
import { DataFeedsCache } from './contracts/evm/ts/generated/DataFeedsCache'
import { assessReserves, type RiskThresholds } from './risk'

export const configSchema = z.object({
	schedule: z.string(),
	url: z.string(),
	dataIdHex: z.string(),
	thresholds: z.object({
		healthyBps: z.number(),
		watchBps: z.number(),
		maxAgeSeconds: z.number(),
	}),
	evms: z.array(
		z.object({
			dataFeedsCacheAddress: z.string(),
			chainName: z.string(),
			gasLimit: z.string(),
		}),
	),
})

export type Config = z.infer<typeof configSchema>
type EVMConfig = z.infer<typeof configSchema.shape.evms.element>

interface ReserveApiResponse {
	accountName: string
	totalTrust: number
	totalToken: number
	ripcord: boolean
	updatedAt: string
}

/** Numeric view of the API response so every node can reach consensus with `median`. */
interface ReserveSample {
	totalTrust: number
	totalToken: number
	ripcord: number // 0 or 1
	updatedAtSeconds: number
}

export const fetchReserves = (sendRequester: HTTPSendRequester, config: Config): ReserveSample => {
	const response = sendRequester.sendRequest({ method: 'GET', url: config.url }).result()
	if (response.statusCode !== 200) {
		throw new Error(`HTTP request failed with status: ${response.statusCode}`)
	}
	const body: ReserveApiResponse = JSON.parse(Buffer.from(response.body).toString('utf-8'))
	return {
		totalTrust: body.totalTrust,
		totalToken: body.totalToken,
		ripcord: body.ripcord ? 1 : 0,
		updatedAtSeconds: Math.floor(new Date(body.updatedAt).getTime() / 1000),
	}
}

export const encodeGuardBundle = (b: { lastUpdated: number; totalReserve: bigint; ratioBps: number; statusCode: number }): Hex =>
	encodeAbiParameters(
		[
			{
				name: 'guard',
				type: 'tuple',
				components: [
					{ name: 'lastUpdated', type: 'uint32' },
					{ name: 'totalReserve', type: 'uint256' },
					{ name: 'ratioBps', type: 'uint32' },
					{ name: 'status', type: 'uint8' },
				],
			},
		],
		[{ lastUpdated: b.lastUpdated, totalReserve: b.totalReserve, ratioBps: b.ratioBps, status: b.statusCode }],
	)

export const encodeReports = (reports: { dataId: string; timestamp: number; bundle: Hex }[]): Hex =>
	encodeAbiParameters(
		[
			{
				name: 'reports',
				type: 'tuple[]',
				components: [
					{ name: 'dataId', type: 'bytes32' },
					{ name: 'timestamp', type: 'uint32' },
					{ name: 'bundle', type: 'bytes' },
				],
			},
		],
		[reports.map((r) => ({ dataId: padRight(r.dataId), timestamp: r.timestamp, bundle: r.bundle }))],
	)

const padRight = (input: string): Hex => {
	let hex = input.toLowerCase().replace(/^0x/, '')
	if (hex.length % 2 !== 0) hex = `0${hex}`
	if (hex.length / 2 > 32) throw new Error('dataId exceeds 32 bytes')
	return `0x${hex.padEnd(64, '0')}` as Hex
}

const writeGuard = (evm: EVMConfig, runtime: Runtime<Config>, reportData: Hex): string => {
	const network = getNetwork({ chainFamily: 'evm', chainSelectorName: evm.chainName, isTestnet: true })
	if (!network) throw new Error(`Network not found: ${evm.chainName}`)

	const client = new cre.capabilities.EVMClient(network.chainSelector.selector)
	const cache = new DataFeedsCache(client, evm.dataFeedsCacheAddress as Address)
	const resp = cache.writeReport(runtime, reportData, { gasLimit: evm.gasLimit })
	if (resp.txStatus !== TxStatus.SUCCESS) {
		throw new Error(`Failed to write report: ${resp.errorMessage || resp.txStatus}`)
	}
	const txHash = bytesToHex(resp.txHash || new Uint8Array(32))
	runtime.log(`Wrote reserve status on ${evm.chainName}, tx ${txHash}`)
	return txHash
}

const runGuard = (runtime: Runtime<Config>): string => {
	runtime.log(`Fetching reserves from ${runtime.config.url}`)

	const sample = new cre.capabilities.HTTPClient()
		.sendRequest(
			runtime,
			fetchReserves,
			ConsensusAggregationByFields<ReserveSample>({
				totalTrust: median,
				totalToken: median,
				ripcord: median,
				updatedAtSeconds: median,
			}),
		)(runtime.config)
		.result()

	const nowSeconds = Math.floor(Date.now() / 1000)
	const assessment = assessReserves(
		{
			accountName: 'reserve',
			totalTrust: sample.totalTrust,
			totalToken: sample.totalToken,
			ripcord: sample.ripcord >= 1,
			updatedAt: new Date(sample.updatedAtSeconds * 1000).toISOString(),
		},
		nowSeconds,
		runtime.config.thresholds as RiskThresholds,
	)
	runtime.log(`Risk: ${assessment.status} ratio=${assessment.ratioBps}bps. ${assessment.reasons.join('; ')}`)

	const bundle = encodeGuardBundle({
		lastUpdated: sample.updatedAtSeconds,
		totalReserve: BigInt(Math.floor(sample.totalTrust)),
		ratioBps: assessment.ratioBps,
		statusCode: assessment.statusCode,
	})
	const reportData = encodeReports([{ dataId: runtime.config.dataIdHex, timestamp: nowSeconds, bundle }])

	for (const evm of runtime.config.evms) {
		writeGuard(evm, runtime, reportData)
	}
	return `${assessment.status}:${assessment.ratioBps}`
}

export const onCronTrigger = (runtime: Runtime<Config>, payload: CronPayload): string => {
	if (!payload.scheduledExecutionTime) throw new Error('Scheduled execution time is required')
	runtime.log('Running Reserve Guard')
	return runGuard(runtime)
}

export function initWorkflow(config: Config) {
	const cron = new cre.capabilities.CronCapability()
	return [cre.handler(cron.trigger({ schedule: config.schedule }), onCronTrigger)]
}
