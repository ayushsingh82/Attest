# Bounty details

Hackathon: BLI Legal Tech Hackathon 2 (Blockchain Legal Institute) on DoraHacks
Deadline: 2026-11-01 06:31 (UTC+5:30)
Format: virtual

## Chainlink: Best workflow with CRE

| Item | Details |
|---|---|
| Sponsor | Chainlink |
| Prize | 2 winners x $1,000 = $2,000 |
| Task | Build a workflow with the Chainlink Runtime Environment (CRE) |

## What CRE is

Chainlink Runtime Environment (CRE) is an orchestration layer for building smart contracts that are data-connected, compliance-ready, privacy-preserving and interoperable across blockchains and traditional systems. It connects blockchains to external APIs, enterprise systems, data sources, LLMs and AI agents.

- Workflows are modular programs written with the CRE SDK (Go or TypeScript)
- The CRE CLI compiles, simulates and deploys workflows
- Deployed workflows run on a Decentralized Oracle Network (DON) for fault-tolerant execution

## Requirements

| Requirement | Detail |
|---|---|
| Use a CRE workflow | Build, simulate, or deploy a workflow used as the orchestration layer in the project |
| Integrate a blockchain | At least one blockchain |
| Integrate something external | At least one external API, system, data source, LLM or AI agent |
| Show it works | A successful simulation through the CRE CLI, or a live deployment on the CRE network |

## Example use cases (from the sponsor)

- AI agents consuming CRE workflows with x402 payments
- AI agent blockchain abstraction
- AI-assisted CRE workflow generation
- Stablecoin issuance
- Tokenized asset servicing and lifecycle management
- AI-powered prediction market settlement
- Automated risk monitoring
- Real-time reserve health checks

## Resources

| Resource | Notes |
|---|---|
| CRE documentation | https://docs.chain.link/cre |
| CRE templates repository | Cloned at `../cre-templates` |
| Chainlink Bootcamp: Intro to CRE | Recording and gitbook |
| LinkLab: Intro to CRE | Recording and gitbook |
| Workshop: Stablecoin Issuance With CRE | |
| Workshop: Build a Custom Proof of Reserve Data Feed With CRE | Convergence Hackathon |

## Useful templates in `cre-templates/starter-templates`

| Template | Relevance |
|---|---|
| `bring-your-own-data` | Puts off-chain data on chain, closest to a reserve data feed |
| `custom-data-feed` | Custom feed workflow |
| `tokenized-asset-servicing` | Tokenized asset lifecycle |
| `stablecoin-ace-ccip` | Stablecoin issuance |
| `prediction-market` and `sports-resolution` | AI or data-driven settlement |
| `circuit-breaker` | Automated risk monitoring |
| `confidential-workflows/ai-audit-firewall` | AI compliance screening, ships with a mock server |

## Requirement checklist

| Requirement | Where it is met | Done |
|---|---|---|
| CRE workflow is the orchestration layer | | [ ] |
| At least one blockchain integrated | | [ ] |
| At least one external API, data source, LLM or agent | | [ ] |
| Successful CLI simulation or live deployment | | [ ] |

## Submission checklist

- [ ] BUIDL created on DoraHacks and submitted to the Chainlink CRE bounty
- [ ] Public repo link
- [ ] CLI simulation log or screenshot, or live deployment link
- [ ] Demo video
- [ ] README explaining the workflow
- [ ] Submitted before 2026-11-01 06:31 (UTC+5:30)

## Notes

Prize amounts and bounties are at the sole discretion of the event producers and may change or be withdrawn. The idea for this project is not final.
