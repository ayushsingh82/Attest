# UI ideas

Direction: a clean, Chainlink-inspired look (dark navy, blue accents, hexagon motif). Inspired by, not a copy of, chain.link. Use our own name and logo.

## Palette

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B101C` | Page background (dark) |
| `--surface` | `#121A2B` | Cards, panels |
| `--border` | `#1F2A44` | Card and table borders |
| `--primary` | `#375BD2` | Buttons, links, active states |
| `--primary-hover` | `#4A6FE8` | Hover |
| `--text` | `#F5F7FA` | Main text |
| `--muted` | `#8B97B3` | Secondary text |
| `--success` | `#2FB37A` | Reserve OK, trade profit |
| `--warn` | `#E8A93A` | Reserve warning |
| `--danger` | `#E5484D` | Undercollateralised, trade loss |

Also provide a light theme with the same tokens redefined.

## Typography

- Sans-serif UI font (Inter or similar), tight headings, generous line height
- Monospace for hashes, addresses and tx links

## Layout

- Top nav: logo, Dashboard, Trades, Reserves, Workflow, Docs; right side has a network badge and a connect button
- Max content width about 1200px, 16px side gutter on mobile
- Cards with 12px radius, 1px border, subtle hover lift
- Hexagon shapes as a background pattern and icon frames

## Pages

| Page | What it shows |
|---|---|
| Landing | Hero with headline, two CTAs (Open dashboard, View workflow), three feature cards, how-it-works steps |
| Dashboard | Stat tiles (reserve ratio, open practice positions, last workflow run, KOLs tracked), recent decisions table |
| Reserves | On-chain supply versus reported reserves, ratio gauge, history chart, status badge |
| Signals | KOL feed with token, sentiment, conviction and urgency chips, and a convergence indicator |
| Trades | Practice trade table. Row expands to show the evidence, the reasoning steps and the on-chain hash with a link to the explorer. |
| Workflow | CRE run timeline (trigger, fetch, LLM, decision, on-chain write) with status per step and simulation log |
| Settings | KOL list (up to 20), risk limits, signal thresholds |

## Components

- Stat tile with sparkline
- Status badge (OK, Warning, Breach)
- Hash chip with copy button and explorer link
- Step timeline for workflow runs
- Evidence drawer: posts and data behind a decision
- Ratio gauge for reserves
- Data table with sort and filter

## Interactions

- Live "last run" indicator that updates after each simulation
- Expandable rows for the reasoning trail
- Copy-to-clipboard on hashes and addresses
- Skeleton loaders, never blank panels

## Notes

- Keep it dark by default and respect `prefers-color-scheme`
- Charts use a validated palette with a single accent per series
- Do not use the Chainlink logo or name as our own branding
