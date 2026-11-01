export const DOC_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "quickstart", label: "Quickstart" },
  { id: "configuration", label: "Configuration" },
  { id: "statuses", label: "Status codes" },
  { id: "payload", label: "On-chain payload" },
  { id: "consume", label: "Read the status" },
  { id: "testing", label: "Testing" },
  { id: "notes", label: "Notes" },
];

export const QUICKSTART = `# 1. Start the mock reserve API (leave running)
cd cre
node mock-server/server.mjs

# 2. Log in to the CRE CLI (one time, opens a browser)
cre login

# 3. Use a dummy key for simulation without broadcast
cp .env.example .env

# 4. Simulate the workflow
cre workflow simulate reserve-guard --non-interactive --trigger-index 0`;

export const CONFIG = `{
  "schedule": "0 */5 * * * *",
  "url": "http://localhost:8787/reserves/healthy",
  "dataIdHex": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "thresholds": { "healthyBps": 10000, "watchBps": 9900, "maxAgeSeconds": 86400 },
  "evms": [{
    "dataFeedsCacheAddress": "0x92bc132002694088c8afE4f09EEA87c46fF5902f",
    "chainName": "ethereum-testnet-sepolia",
    "gasLimit": "1000000"
  }]
}`;

export const CONFIG_FIELDS: [string, string][] = [
  ["schedule", "Cron expression with seconds. The default fires every 5 minutes."],
  ["url", "Reserve API endpoint. Use /reserves/watch, /under, /halted or /stale to try other scenarios."],
  ["dataIdHex", "Identifier the report is stored under in DataFeedsCache."],
  ["thresholds.healthyBps", "Coverage at or above this is HEALTHY. 10000 means 100%."],
  ["thresholds.watchBps", "Coverage at or above this is WATCH. Below it is UNDERCOLLATERALIZED."],
  ["thresholds.maxAgeSeconds", "A report older than this is STALE. Default is 24 hours."],
  ["evms[].dataFeedsCacheAddress", "Contract that receives the write."],
  ["evms[].chainName", "Target chain, for example ethereum-testnet-sepolia."],
  ["evms[].gasLimit", "Gas limit for the write transaction."],
];

export const STATUS_ROWS: [string, string, string][] = [
  ["HEALTHY", "0", "Coverage is 100% or more"],
  ["WATCH", "1", "Coverage is 99% to under 100%"],
  ["UNDERCOLLATERALIZED", "2", "Coverage is under 99%, or supply is missing"],
  ["HALTED", "3", "Issuer ripcord is active. Takes priority over everything else"],
  ["STALE", "4", "Report is older than 24 hours, or its date is invalid"],
];

export const PAYLOAD_ROWS: [string, string, string][] = [
  ["lastUpdated", "uint32", "Report timestamp from the issuer"],
  ["totalReserve", "uint256", "Reserves held, in whole units"],
  ["ratioBps", "uint32", "Reserves divided by supply. 10000 means 100%"],
  ["status", "uint8", "0 (healthy) to 4 (stale)"],
];

export const CONSUME = `// Illustrative sketch, not production code.
// Decode the report that the workflow wrote, then branch on the status code.
enum Status { HEALTHY, WATCH, UNDERCOLLATERALIZED, HALTED, STALE }

function deposit(uint256 amount) external {
    (, , , uint8 status) = _latestAttestation();   // lastUpdated, totalReserve, ratioBps, status
    require(status == uint8(Status.HEALTHY), "reserves not healthy");
    _mint(msg.sender, amount);
}`;

export const TESTING = `# Risk logic unit tests (Node 22+, no install needed)
npm test

# Typecheck, lint and tests together
npm run check`;
