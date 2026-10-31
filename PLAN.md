# Plan

Project for the Chainlink "Best workflow with CRE" bounty ($2,000, 2 winners) at the BLI Legal Tech Hackathon 2.
Deadline: 2026-11-01 06:31 (UTC+5:30). Bounty details are in [BOUNTY.md](./BOUNTY.md).

## Idea: Attest

A CRE workflow that fetches a reserve report from an external API, decides if reserves cover token supply, and writes the status on-chain. Chosen because it is the lowest-risk way to meet every requirement: one blockchain, one external API, and a CLI simulation.

Code lives in [`cre/`](./cre/README.md).

## Requirements

| Requirement | How it is met | State |
|---|---|---|
| CRE workflow is the orchestration layer | `cre/reserve-guard/workflow.ts` | Written |
| At least one blockchain | EVM write to DataFeedsCache on Sepolia | Written |
| External API, data source, LLM or agent | HTTP fetch of the reserve report | Written, mock API running |
| Successful CLI simulation or live deploy | `cre workflow simulate reserve-guard` | **Not run yet, needs `cre login`** |

## Milestones

| # | Milestone | State |
|---|---|---|
| 1 | Choose the idea | Done |
| 2 | CRE CLI installed (v1.2.0) | Done |
| 3 | Risk logic with unit tests | Done, 7 passing |
| 4 | Mock reserve API with 5 scenarios | Done |
| 5 | Workflow code and config | Done |
| 6 | `bun install` in `cre/reserve-guard` | Done (cre-sdk 1.23.0) |
| 7 | Type-check | Done, `tsc --noEmit` is clean |
| 8 | `cre workflow simulate` and save the log | **Blocked: needs `cre login` (interactive, run by you)** |
| 9 | Run the other scenarios (watch, under, halted, stale) | Waiting on 8 |
| 10 | Optional: broadcast a real Sepolia write with a funded key | Optional |
| 11 | Next.js dashboard (workflow steps, 5 scenarios, simulation log panel) | Done, builds and serves |
| 12 | README, demo video, DoraHacks submission | Open |

## Next steps

1. Run `cre login` (opens a browser). The CLI refuses to simulate without it.
2. Start the mock API: `node cre/mock-server/server.mjs`.
3. From `cre/`, run `cre workflow simulate reserve-guard --non-interactive --trigger-index 0 | tee simulation-log.txt`. The dashboard shows this file automatically.
4. Change `url` in `cre/reserve-guard/config.json` to try watch, under, halted and stale.
5. Record the demo video and submit.

## Ideas to strengthen it (after the simulation works)

| Idea | Value |
|---|---|
| LLM summary of the reserve report through the HTTP capability | Adds the "AI" angle some judges look for |
| Second chain write (Base Sepolia) | Shows multi-chain |
| Feed the status into the RYO project as a risk gate | Ties the two projects together |

## Risks

| Risk | Mitigation |
|---|---|
| SDK API differs from the template | Workflow is modelled on the template, fix on first type-check |
| Simulation needs RPC access | `project.yaml` uses a public Sepolia RPC |
| Chain write needs a funded key | Simulation works without broadcasting |
