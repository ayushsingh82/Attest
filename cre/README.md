# Attest (CRE workflow)

A Chainlink CRE workflow that checks whether a token's reserves still cover its supply and writes a risk status on-chain.

| Step | What happens |
|---|---|
| 1 | Cron trigger fires |
| 2 | HTTP capability fetches a reserve report (mock API locally), with `median` consensus across nodes |
| 3 | `risk.ts` turns reserves and supply into a status: HEALTHY, WATCH, UNDERCOLLATERALIZED, HALTED or STALE |
| 4 | EVM capability writes ratio (bps), status code and reserve amount to a DataFeedsCache contract on Sepolia |

This covers the bounty requirement: a CRE workflow joining a blockchain with an external API, shown by a CLI simulation.

## Layout

| Path | Purpose |
|---|---|
| `reserve-guard/workflow.ts` | CRE workflow (HTTP fetch, consensus, risk, chain write) |
| `reserve-guard/risk.ts` | Pure risk logic, unit tested |
| `reserve-guard/risk.test.ts` | 7 tests |
| `reserve-guard/config.json` | Schedule, API URL, thresholds, target chain and contract |
| `mock-server/server.mjs` | Mock reserve API with five scenarios |
| `reserve-guard/contracts/` | DataFeedsCache ABI and bindings, copied from the official `bring-your-own-data` template |
| `project.yaml` | RPCs and DON family |

## Run

```bash
# 1. Mock reserve API (leave running)
node mock-server/server.mjs

# 2. Tests, no install needed (Node 22+)
node --experimental-strip-types --test reserve-guard/risk.test.ts

# 3. Install workflow dependencies (already done)
bun install --cwd ./reserve-guard

# 3b. Log in once, the CLI needs it to simulate
cre login

# 4. Dummy key is enough for simulation without broadcast
cp .env.example .env

# 5. Simulate, from this folder
cre workflow simulate reserve-guard
```

To try other scenarios, change `url` in `reserve-guard/config.json` to `/reserves/watch`, `/under`, `/halted` or `/stale`.

## Status

| Item | State |
|---|---|
| Risk logic and tests | Done, 7 passing |
| Workflow code | Written, modelled on the official PoR template |
| Mock API | Done and checked with curl |
| `bun install`, `tsc --noEmit` | Done, clean |
| `cre workflow simulate` | Not run. The CLI needs `cre login` first. Save the output to `simulation-log.txt` as the bounty proof. |

The workflow type-checks but has not been simulated yet, so expect small runtime fixes on the first run.
