import assert from 'node:assert/strict'
import test from 'node:test'
import { assessReserves, type ReserveReport } from './risk.ts'

const NOW = Math.floor(Date.parse('2026-10-28T12:00:00Z') / 1000)
const base: ReserveReport = { accountName: 'DemoUSD', totalTrust: 1000, totalToken: 1000, ripcord: false, updatedAt: '2026-10-28T11:00:00Z' }

test('fully backed is healthy', () => {
	const r = assessReserves(base, NOW)
	assert.equal(r.status, 'HEALTHY')
	assert.equal(r.ratioBps, 10000)
	assert.equal(r.statusCode, 0)
})

test('slightly under 100% is a watch', () => {
	assert.equal(assessReserves({ ...base, totalTrust: 995 }, NOW).status, 'WATCH')
})

test('well under is undercollateralized', () => {
	const r = assessReserves({ ...base, totalTrust: 900 }, NOW)
	assert.equal(r.status, 'UNDERCOLLATERALIZED')
	assert.equal(r.ratioBps, 9000)
})

test('ripcord halts regardless of ratio', () => {
	assert.equal(assessReserves({ ...base, ripcord: true }, NOW).status, 'HALTED')
})

test('old reports are stale', () => {
	assert.equal(assessReserves({ ...base, updatedAt: '2026-10-20T00:00:00Z' }, NOW).status, 'STALE')
})

test('zero supply never reports healthy', () => {
	assert.equal(assessReserves({ ...base, totalToken: 0 }, NOW).status, 'UNDERCOLLATERALIZED')
})

test('invalid date is treated as stale', () => {
	assert.equal(assessReserves({ ...base, updatedAt: 'nope' }, NOW).status, 'STALE')
})
