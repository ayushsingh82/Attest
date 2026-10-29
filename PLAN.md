# Plan

Project for the BLI Legal Tech Hackathon 2 (DoraHacks). Deadline: 2026-11-01 06:31 (UTC+5:30).

The idea is not final. This plan is the working direction.

## Target bounties

| Bounty | Sponsor | Prize | Core requirement |
|---|---|---|---|
| Best workflow with CRE | Chainlink | 2 x $1,000 | CRE workflow joining a blockchain with an external API, data source, LLM or agent, shown by a CLI simulation or live deployment |
| Autonomous Agents | RYO-CHAN | $6,000 | Agent that interprets market evidence and records practice trades, with a repeatable reasoning trail |

## Working idea

A Chainlink CRE workflow that checks reserve health for a tokenized asset, then gates an AI agent that decides on practice trades. Each decision is stored with a hash of its evidence on-chain, giving an audit trail.

Candidates still being compared:

- Proof-of-Reserve with an AI risk layer
- AI Audit Firewall (adapted from the `ai-audit-firewall` CRE template)
- Multi-KOL Narrative Agent (RYO-CHAN spotlight)

## Architecture (draft)

1. Config: KOL list (up to 20), risk limits, signal thresholds
2. CRE workflow: cron trigger, HTTP fetch of reserves, prices and posts
3. LLM analysis: token, sentiment, conviction, urgency, risk summary
4. Practice trade engine: opens or closes paper positions within risk limits
5. On-chain write: testnet contract stores hash of evidence and decision
6. Next.js app: shows each trade with the evidence behind it

## Milestones

- [ ] Pick the final idea
- [ ] Install the CRE CLI and run a template from `cre-templates`
- [ ] Mock data feed for KOL posts and reserves
- [ ] LLM extraction and decision logic
- [ ] CRE workflow simulation succeeds
- [ ] Testnet contract and on-chain write
- [ ] Next.js dashboard with the reasoning trail
- [ ] Demo video and README
- [ ] Submit on DoraHacks

## Deliverables

- CRE workflow (TypeScript)
- CLI simulation log
- Testnet contract and transaction link
- Reasoning-trail log per trade
- README with signal rules and risk limits
- Demo video

## Risks

| Risk | Mitigation |
|---|---|
| X API paid or restricted | Mock or cached feed, stated clearly in the submission |
| CRE learning curve | Start from the official templates |
| Time | Cut the dashboard before the workflow or the audit trail |
