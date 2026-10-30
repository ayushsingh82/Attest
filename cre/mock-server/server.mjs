// Mock reserve API for local simulation. Run: node server.mjs
import { createServer } from 'node:http'

const hoursAgo = (h) => new Date(Date.now() - h * 3600_000).toISOString()

const SCENARIOS = {
	healthy: { accountName: 'DemoUSD', totalTrust: 1_050_000, totalToken: 1_000_000, ripcord: false, updatedAt: hoursAgo(1) },
	watch: { accountName: 'DemoUSD', totalTrust: 995_000, totalToken: 1_000_000, ripcord: false, updatedAt: hoursAgo(1) },
	under: { accountName: 'DemoUSD', totalTrust: 900_000, totalToken: 1_000_000, ripcord: false, updatedAt: hoursAgo(1) },
	halted: { accountName: 'DemoUSD', totalTrust: 1_050_000, totalToken: 1_000_000, ripcord: true, updatedAt: hoursAgo(1) },
	stale: { accountName: 'DemoUSD', totalTrust: 1_050_000, totalToken: 1_000_000, ripcord: false, updatedAt: hoursAgo(72) },
}

createServer((req, res) => {
	const name = req.url?.split('/').pop() ?? ''
	const body = SCENARIOS[name]
	res.writeHead(body ? 200 : 404, { 'content-type': 'application/json' })
	res.end(JSON.stringify(body ?? { error: `unknown scenario, try ${Object.keys(SCENARIOS).join(', ')}` }))
}).listen(8787, () => console.log('Mock reserve API on http://localhost:8787/reserves/<healthy|watch|under|halted|stale>'))
