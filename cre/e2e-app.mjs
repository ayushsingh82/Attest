// Serves the built Next app and checks each page. Run `npx next build` first.
import { spawn } from "node:child_process";

const PORT = 3130;
const base = `http://localhost:${PORT}`;
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
for (let i = 0; i < 40; i++) {
	try { if ((await fetch(base)).ok) break; } catch {}
	await new Promise((r) => setTimeout(r, 500));
}
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const checks = [
	["/", ["Know if a token is still backed", "From report to chain in four steps", "Why it matters", "105.0", "UNDERCOLLATERALIZED", "Architecture", "Frequently asked questions", "See the risk logic run"]],
	["/dashboard", ["Live simulator", "Report inputs", "What gets written on-chain", "HEALTHY", "10500", "The five mock reports", "99.50%"]],
	["/workflow", ["Cron trigger", "HTTP fetch with consensus", "EVM write", "HALTED (3)", "dataIdHex", "ethereum-testnet-sepolia", "On-chain payload", "0x92bc132002694088c8afE4f09EEA87c46fF5902f", "ratioBps"]],
	["/simulation", ["No simulation log yet", "cre login"]],
];
let failed = 0;
for (const [path, needles] of checks) {
	const res = await fetch(base + path);
	const text = strip(await res.text());
	const missing = needles.filter((n) => !text.includes(n));
	const ok = res.status === 200 && !missing.length;
	if (!ok) failed++;
	console.log(`${ok ? "PASS" : "FAIL"} ${path} ${res.status}${missing.length ? " missing: " + missing.join(" | ") : ""}`);
}
const nf = await fetch(base + "/nope");
if (nf.status !== 404) failed++;
console.log(`${nf.status === 404 ? "PASS" : "FAIL"} /nope ${nf.status}`);
server.kill();
console.log(failed ? `\n${failed} FAILED` : "\nALL PASSED");
process.exit(failed ? 1 : 0);
