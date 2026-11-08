# Project: 22-Automations — IndusEye RS3, AI Training & Revenue Security Hardening

## Architecture
- **Framework**: Next.js 15.5.2 (App Router), React 18, Tailwind CSS, shadcn/ui (Radix primitives), Framer Motion.
- **Export Mode**: Static HTML export (`output: 'export'`, `distDir: 'out'`).
- **Target Offerings**:
  1. **IndusEye RS3**: 24 GHz FMCW Radar sensing and access unit engineered for Auto Spas, Car Washes, Fleet Bays, and High-Duty Industrial Entrances.
  2. **Enterprise AI Training**: High-ticket B2B corporate engineering cohorts and executive strategy intensives.
- **Security & Integrity Model**:
  - Multi-layer HTTP Security Headers & Restrictive CSP (`public/_headers`, `netlify.toml`, `<meta>` in `layout.tsx`).
  - Strict input validation via Zod, anti-bot honeypots, and submission timing verification.
  - Elimination of unauthenticated legacy endpoints (`/api/update-geo`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Remove AI-GEO Optimization | Remove all references in catalog, footer, hero, FAQ, layout, and delete `/api/update-geo` and `geo-assets.json` | M1 | Survey (R1) — DONE |
| 2 | Remove POS CRM Software | Remove all references and product cards from catalog, footer, and navigation | M1 | Survey (R1) — DONE |
| 3 | Remove Email & SMS Marketing | Remove all references and product cards from catalog and copy | M1 | Survey (R1) — DONE |
| 4 | Transition AI Workflows to AI Training | Replace all 13 occurrences of "AI Workflows" with "AI Training" across layout, homepage, catalog, sensing-unit, contact, and about | M1 | Survey (R2) — DONE |
| 5 | Primary Offerings Navigation | Highlight IndusEye RS3 and AI Training as primary offerings in `Navbar.tsx`, `Footer.tsx`, and site-wide navigation | M1 | Survey (R2, R3) — DONE |
| 6 | IndusEye RS3 Enterprise Positioning | Re-align specifications for Auto Spas, Car Washes, Fleet Bays, and Industrial Entrances; eliminate residential presets | M1 | Survey (R3) — DONE |
| 7 | Enterprise AI Training Showcase | Present 4-module curriculum (Edge AI/Sensor Fusion, LLM Agents, Telemetry Anomaly Detection, Governance) on homepage and catalog | M1 | Survey (R3) — DONE |
| 8 | $1.1M B2B Value Proposition & Funnel | Remove retail micro-pricing; introduce pilot evaluation, fleet rollout packages, and high-ticket B2B budgets | M1 | Survey (R3) — DONE |
| 9 | Content Security Policy (CSP) & Security Headers | Implement restrictive CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy across headers and meta tag | M2 | Survey (R4) — DONE |
| 10 | Form Validation & Anti-Tamper Protection | Implement Zod schema validation, honeypot fields, and timestamp checks on contact and pilot forms; connect real submission flow | M2 | Survey (R4) — DONE |
| 11 | Full E2E Verification & Adversarial Hardening | Pass 100% of E2E tests (Tiers 1-4), verify `npm run build`, `npm run lint`, and typecheck | M3 | Survey (Acceptance Criteria) — DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Offerings & Content Transformation | Excising legacy offerings (R1), transitioning AI Workflows to AI Training (R2), and re-aligning B2B positioning for $1.1M sales (R3) | none | DONE |
| M2 | Revenue & Integrity Security Hardening | Multi-layer CSP and security headers, Zod validation, anti-bot honeypot, anti-tamper timestamp checks (R4) | M1 | DONE |
| M3 | Final Milestone: E2E Verification & Hardening | Pass 100% E2E test suite (Tiers 1-4: 108/108 passed), adversarial test coverage, build & lint verification | M2, E2E Track | DONE |

## Interface Contracts
### Navbar / Header ↔ Pages
- `Navbar.tsx` exposes primary navigation links:
  - `IndusEye RS3`: `/products/sensing-unit` (highlighted pill)
  - `AI Training`: `/#ai-training` or `/products#ai-training`
  - `Products & Systems`: `/products`
  - `Case Studies`: `/portfolio`
  - `About`: `/about`
  - `Contact`: `/contact`

### Products Catalog ↔ Offerings
- `src/app/products/page.tsx` renders exactly two primary enterprise product cards:
  1. `IndusEye RS3` (Flagship 24 GHz FMCW Radar Hardware)
  2. `Enterprise AI Training & Edge Systems` (Corporate Cohorts & Technical Enablement)
- 2-column centered layout for visual balance.

### Form Validation Contract (`src/lib/validations/`)
- Exported Zod schemas: `ContactFormSchema`, `PilotRequestSchema`.
- Required fields, email format, telephone format, honeypot check (`company_website_url.length === 0`), and minimum dwell time (`form_timestamp <= Date.now() - 1500`).

### Security Headers Contract
- Headers defined identically in `public/_headers`, `netlify.toml`, and `src/app/layout.tsx`.
- Whitelisted domains: `unpkg.com`, `images.unsplash.com`, `source.unsplash.com`, `ext.same-assets.com`, `ugc.same-assets.com`, `api.dicebear.com`, `cdn.pixabay.com`, `sample-videos.com`, `formsubmit.co`, `fonts.googleapis.com`, `fonts.gstatic.com`.

## Code Layout
- `src/app/layout.tsx`: Root HTML, metadata, CSP meta tag, global font definitions.
- `src/app/page.tsx`: Homepage with IndusEye RS3 showcase, Enterprise AI Training section, B2B telemetry bar.
- `src/app/products/page.tsx`: Catalog showcasing IndusEye RS3 and Enterprise AI Training.
- `src/app/products/sensing-unit/page.tsx`: IndusEye RS3 dedicated hardware page.
- `src/app/contact/page.tsx`: Enterprise contact form with high-ticket budget and offering selectors.
- `src/components/Navbar.tsx`: Global navigation header.
- `src/components/Footer.tsx`: Global footer.
- `src/components/products/HardwareSensingProduct.tsx`: IndusEye RS3 interactive component and modal.
- `src/lib/validations/`: Form schemas and anti-tamper logic.
- `public/_headers` & `netlify.toml`: HTTP security headers and CSP rules.
- `tests/e2e/`: Requirement-driven E2E test suite (108 assertions across 4 tiers).
