/**
 * Reserve risk assessment. Pure and deterministic, so it can be unit tested without
 * the CRE runtime and every DON node reaches the same answer.
 */
export type ReserveReport = {
	accountName: string
	totalTrust: number // reserves held
	totalToken: number // token supply outstanding
	ripcord: boolean
	updatedAt: string
}

export type RiskStatus = 'HEALTHY' | 'WATCH' | 'UNDERCOLLATERALIZED' | 'HALTED' | 'STALE'

export type RiskAssessment = {
	status: RiskStatus
	statusCode: number // written on-chain
	ratioBps: number // reserves / supply in basis points, 10000 = 100%
	reasons: string[]
}

export const STATUS_CODE: Record<RiskStatus, number> = {
	HEALTHY: 0,
	WATCH: 1,
	UNDERCOLLATERALIZED: 2,
	HALTED: 3,
	STALE: 4,
}

export type RiskThresholds = {
	healthyBps: number // at or above: healthy
	watchBps: number // at or above: watch, below: undercollateralized
	maxAgeSeconds: number
}

export const DEFAULT_THRESHOLDS: RiskThresholds = {
	healthyBps: 10000,
	watchBps: 9900,
	maxAgeSeconds: 24 * 60 * 60,
}

export function assessReserves(report: ReserveReport, nowSeconds: number, t: RiskThresholds = DEFAULT_THRESHOLDS): RiskAssessment {
	const reasons: string[] = []
	const ratioBps = report.totalToken > 0 ? Math.floor((report.totalTrust / report.totalToken) * 10000) : 0
	const ageSeconds = nowSeconds - Math.floor(new Date(report.updatedAt).getTime() / 1000)

	const done = (status: RiskStatus): RiskAssessment => ({ status, statusCode: STATUS_CODE[status], ratioBps, reasons })

	if (report.ripcord) {
		reasons.push('Issuer ripcord is active')
		return done('HALTED')
	}
	if (!Number.isFinite(ageSeconds) || ageSeconds > t.maxAgeSeconds) {
		reasons.push(`Report is older than ${t.maxAgeSeconds}s`)
		return done('STALE')
	}
	if (report.totalToken <= 0) {
		reasons.push('Token supply is zero or missing')
		return done('UNDERCOLLATERALIZED')
	}
	if (ratioBps >= t.healthyBps) {
		reasons.push(`Reserves cover supply at ${(ratioBps / 100).toFixed(2)}%`)
		return done('HEALTHY')
	}
	if (ratioBps >= t.watchBps) {
		reasons.push(`Coverage ${(ratioBps / 100).toFixed(2)}% is slightly under 100%`)
		return done('WATCH')
	}
	reasons.push(`Coverage ${(ratioBps / 100).toFixed(2)}% is below the ${(t.watchBps / 100).toFixed(2)}% floor`)
	return done('UNDERCOLLATERALIZED')
}
