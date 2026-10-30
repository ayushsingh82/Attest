// End-to-end check of everything except the CRE runtime: mock API -> HTTP fetch -> risk logic.
// Run: node --experimental-strip-types cre/e2e.mjs
import { spawn } from "node:child_process";
import { assessReserves } from "./reserve-guard/risk.ts";

const server = spawn("node", ["cre/mock-server/server.mjs"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 800));

const expected = { healthy: "HEALTHY", watch: "WATCH", under: "UNDERCOLLATERALIZED", halted: "HALTED", stale: "STALE" };
let failed = 0;
for (const [name, status] of Object.entries(expected)) {
	const res = await fetch(`http://localhost:8787/reserves/${name}`);
	const report = await res.json();
	const got = assessReserves(report, Math.floor(Date.now() / 1000));
	const ok = res.status === 200 && got.status === status;
	if (!ok) failed++;
	console.log(`${ok ? "PASS" : "FAIL"} ${name.padEnd(8)} -> ${got.status} (${got.ratioBps} bps, code ${got.statusCode})`);
}
const bad = await fetch("http://localhost:8787/reserves/nope");
const badOk = bad.status === 404;
if (!badOk) failed++;
console.log(`${badOk ? "PASS" : "FAIL"} unknown scenario -> ${bad.status}`);
server.kill();
console.log(failed ? `\n${failed} FAILED` : "\nALL PASSED");
process.exit(failed ? 1 : 0);
