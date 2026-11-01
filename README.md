<div align="center">

# Attest

**Proof of reserves, on-chain.**
Chainlink nodes check reserves against supply and publish the result on-chain.

[![Chainlink CRE](https://img.shields.io/badge/Chainlink-CRE-375BD2)](https://chain.link)
[![Network](https://img.shields.io/badge/network-Sepolia-blue)](https://sepolia.etherscan.io)
[![Status](https://img.shields.io/badge/status-demo-orange)](#status-and-limitations)
[![Tests](https://img.shields.io/badge/tests-7%20passing-brightgreen)](#testing)

</div>

Attest is a Chainlink Runtime Environment (CRE) workflow that continuously checks whether a tokenized asset or stablecoin is still backed by its reserves, and publishes a verifiable status to a smart contract. It replaces the monthly PDF attestation with a live, machine-readable signal that lending markets, exchanges and auditors can act on.

Built for the **Chainlink "Best workflow with CRE"** bounty at the **BLI Legal Tech Hackathon 2**.

## Contents

- [The problem](#the-problem)
- [How it works](#how-it-works)
- [Status codes](#status-codes)
- [On-chain payload](#on-chain-payload)
- [Quickstart](#quickstart)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Bounty requirements](#bounty-requirements)
- [Status and limitations](#status-and-limitations)
- [Roadmap](#roadmap)

## The problem

- Reserves live in PDFs that are published monthly and are out of date on arrival.
- The party being checked is the party publishing the proof. No neutral node is in the loop.
- Smart contracts cannot read a PDF, so they cannot react when backing slips.
- A stale report, an emergency halt and thin coverage all look the same: silence.

## How it works

```
Cron trigger -> HTTP fetch (each node) -> Median consensus -> Risk check -> EVM write (Sepolia)
```

| Step | What happens |
|---|---|
| 1. Trigger | A `CronCapability` fires the handler on the schedule in `config.json` (5 minutes by default). |
| 2. Fetch | Each node calls the reserve API through the HTTP capability. |
| 3. Consensus | Numeric fields are merged with median consensus, so one faulty node cannot change the result. |
| 4. Risk check | `risk.ts` turns reserves, supply, ripcord and report age into a coverage ratio and a status. |
| 5. Write | The result is ABI-encoded and written to a `DataFeedsCache` contract on Sepolia via the EVM capability. |

## Status codes

| Status | Code | Condition |
|---|---|---|
| `HEALTHY` | 0 | Coverage is 100% or more |
| `WATCH` | 1 | Coverage is 99% to under 100% |
| `UNDERCOLLATERALIZED` | 2 | Coverage is under 99%, or supply is missing |
| `HALTED` | 3 | Issuer ripcord is active |
| `STALE` | 4 | Report is older than 24 hours, or the date is invalid |

## On-chain payload

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | `uint32` | Report timestamp from the issuer |
| `totalReserve` | `uint256` | Reserves held, in whole units |
| `ratioBps` | `uint32` | Reserves divided by supply, 10000 = 100% |
| `status` | `uint8` | 0 (healthy) to 4 (stale) |

Target: `DataFeedsCache` on Ethereum Sepolia, `0x92bc132002694088c8afE4f09EEA87c46fF5902f` (from Chainlink's bring-your-own-data template).

## Quickstart

### Web app

```bash
npm install
npm run dev
```

Open http://localhost:3000. Pages: Dashboard (live simulator), Workflow, Simulation, Use cases, Docs, About, Roadmap, FAQ.

### CRE workflow

Requires Node 22+, [Bun](https://bun.sh) and the [CRE CLI](https://docs.chain.link/cre).

```bash
cd cre

# 1. Start the mock reserve API (leave running)
node mock-server/server.mjs

# 2. Log in once. The CLI needs it to simulate.
cre login

# 3. Use a dummy key for simulation without broadcast
cp .env.example .env

# 4. Simulate and save the log
cre workflow simulate reserve-guard --non-interactive --trigger-index 0 | tee simulation-log.txt
```

To try other scenarios, set `url` in `cre/reserve-guard/config.json` to `/reserves/watch`, `/under`, `/halted` or `/stale`.

## Project structure

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router pages: home, dashboard, workflow, simulation, use cases, docs, about, roadmap, FAQ |
| `components/brand`, `layout`, `ui`, `features` | Logo, header/footer/nav, shared UI, and the simulator |
| `lib/content/` | Page copy and data (nav, FAQ, use cases, roadmap, workflow steps) kept out of the page files |
| `lib/scenarios.ts`, `lib/utils.ts` | Mock scenarios shared with the workflow risk logic, and the `cn` helper |
| `cre/reserve-guard/workflow.ts` | CRE workflow: fetch, consensus, risk, chain write |
| `cre/reserve-guard/risk.ts` | Pure risk logic, shared with the web simulator |
| `cre/reserve-guard/risk.test.ts` | Unit tests |
| `cre/reserve-guard/config.json` | Schedule, API URL, thresholds, target chain and contract |
| `cre/reserve-guard/contracts/` | `DataFeedsCache` ABI and bindings from the official template |
| `cre/mock-server/server.mjs` | Mock reserve API with five scenarios |
| `docs/` | `PLAN.md`, `BOUNTY.md` and `UI.md`: plan, bounty details and design notes |

## Testing

```bash
node --experimental-strip-types --test cre/reserve-guard/risk.test.ts
npx tsc --noEmit
```

## Bounty requirements

| Requirement | How it is met |
|---|---|
| Use a CRE workflow as orchestration | `cre/reserve-guard/workflow.ts` |
| Integrate a blockchain | EVM write to `DataFeedsCache` on Sepolia |
| Integrate something external | HTTP fetch of a reserve report |
| Show it works | `cre workflow simulate`, log in `cre/simulation-log.txt` (see below) |

## Status and limitations

- The workflow type-checks and the risk logic is tested, but **`cre workflow simulate` has not been run yet**. It needs a one-time interactive `cre login`.
- Reserve data comes from a **mock API**, not a real custodian.
- Targets **Sepolia testnet only**.
- **Demo only. Not audited. Not financial advice.**

## Roadmap

- [x] CRE workflow with HTTP fetch, median consensus and EVM write
- [x] Risk logic with five statuses and unit tests
- [x] Mock reserve API and web app
- [ ] Run `cre workflow simulate` and publish the log
- [ ] Broadcast a real write to Sepolia
- [ ] Real custodian and attestation adapters
- [ ] Per-token thresholds and alerting webhooks
- [ ] Audit and mainnet deployment

---

Attest. Built for the Chainlink CRE bounty at the BLI Legal Tech Hackathon 2.
Demo only. Not audited. Not financial advice.
