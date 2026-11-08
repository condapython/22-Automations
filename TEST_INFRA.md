# E2E Test Infrastructure Specification: 22-Automations

**Document Version**: 1.0.0  
**Target System**: 22-Automations Production Web Platform  
**Architecture**: Next.js 15.5.2 App Router (Static Export), TypeScript, Tailwind CSS  
**Target Offerings**: IndusEye RS3 (24 GHz FMCW Radar) & Enterprise AI Training ($1.1M B2B Pipeline)  
**Security Model**: Multi-layer HTTP Security Headers, Restrictive CSP, Anti-Bot Honeypot, Dwell-Time Tamper Resistance, Zod Schema Validation  

---

## 1. Executive Summary & Testing Philosophy

This document defines the End-to-End (E2E) Test Infrastructure for 22-Automations. Built to guarantee that the production platform adheres strictly to the requirements set forth in `ORIGINAL_REQUEST.md` and `PROJECT.md`, the testing framework operates on an **opaque-box, requirement-driven methodology**.

### Core Testing Tenets:
1. **Opaque-Box Verification**: Tests evaluate externally observable behaviors, rendered DOM structures, HTTP response headers, configuration files, static build artifacts in `out/`, and functional validation engines. Internal implementation details are never asserted in isolation.
2. **Authoritative Expected Output Derivation**: Every test case traces directly to an authoritative requirement in `ORIGINAL_REQUEST.md` (R1–R4) or `PROJECT.md` Feature Inventory (Features 1–10). Expected values are not invented to match convenient implementations.
3. **Zero Facade Testing**: No mock or test passes trivially. Every assertion tests real logic, string predicates, schema constraints, security headers, or end-to-end workflows.
4. **4-Tier Comprehensive Hierarchy**:
   - **Tier 1: Feature Coverage** (>=5 tests per feature across all 10 features in the inventory = >=50 tests).
   - **Tier 2: Boundary & Corner Cases** (>=5 tests per feature category: empty inputs, extreme string lengths, invalid emails/phones, unicode/XSS strings, timing boundaries = >=50 tests).
   - **Tier 3: Cross-Feature Interactions & User Journeys** (5 end-to-end multi-step flows connecting navigation, catalog, hardware showcase, pilot modal, and submission lifecycles).
   - **Tier 4: Real-World Enterprise Application Scenarios** (3 full-spectrum operational simulations: Auto Spa Multi-Bay Retrofit, Enterprise AI Training Cohort Booking, and Corporate InfoSec Penetration Audit).

---

## 2. Test Architecture & Runner Design

### 2.1 Execution Engine
The test suite utilizes the native **Node.js Test Runner** (`node:test`, `node:assert/strict`), providing:
- Zero external testing dependencies or heavy browser driver bloat.
- Sub-second execution speeds suitable for local pre-commit hooks and CI/CD pipelines.
- Native ESM (`.mjs`) support and strict assertion semantics.
- Structured reporting with pass/fail telemetry, feature coverage breakdown, and timing analytics.

### 2.2 Execution Command
The test suite is driven by a standalone master runner:
```bash
node tests/e2e/runner.mjs
```
Alternatively, individual tiers or test modules can be executed directly:
```bash
node --test tests/e2e/tier1-features/*.test.mjs
node --test tests/e2e/tier2-boundaries/*.test.mjs
node --test tests/e2e/tier3-interactions/*.test.mjs
node --test tests/e2e/tier4-scenarios/*.test.mjs
```

### 2.3 Directory Layout
```
tests/e2e/
├── runner.mjs                             # Master orchestrator & summary reporter
├── helpers/
│   ├── artifact-loader.mjs                # Source, config, and static artifact reader
│   ├── csp-parser.mjs                     # Content Security Policy syntax & directive parser
│   └── validation-engine.mjs              # Independent validation oracle for form contracts
├── tier1-features/
│   ├── feat1_remove_ai_geo.test.mjs       # Feature 1: Complete excision of AI-GEO
│   ├── feat2_remove_pos_crm.test.mjs      # Feature 2: Complete excision of POS CRM
│   ├── feat3_remove_email_sms.test.mjs    # Feature 3: Complete excision of Email & SMS
│   ├── feat4_ai_training_transition.test.mjs # Feature 4: "AI Workflows" -> "AI Training"
│   ├── feat5_primary_offerings_nav.test.mjs  # Feature 5: Primary Offerings Navigation
│   ├── feat6_induseye_rs3_specs.test.mjs  # Feature 6: IndusEye RS3 Enterprise Specs
│   ├── feat7_enterprise_ai_training.test.mjs # Feature 7: Enterprise AI Training Showcase
│   ├── feat8_b2b_value_prop.test.mjs      # Feature 8: $1.1M B2B Value Prop & Pricing
│   ├── feat9_security_headers_csp.test.mjs # Feature 9: Multi-layer CSP & Security Headers
│   └── feat10_form_anti_tamper.test.mjs   # Feature 10: Form Validation & Anti-Tamper
├── tier2-boundaries/
│   ├── boundary_input_validation.test.mjs # Boundary test: length limits, regex, email/phone
│   ├── boundary_security_tamper.test.mjs  # Boundary test: honeypot, dwell times, XSS/SQLi
│   ├── boundary_csp_directives.test.mjs   # Boundary test: forbidden origins, frame-ancestors
│   ├── boundary_catalog_layout.test.mjs   # Boundary test: card counts, grid balance, 404s
│   └── boundary_pricing_funnel.test.mjs   # Boundary test: minimum contract thresholds, zero/negative
├── tier3-interactions/
│   ├── flow_nav_to_induseye_pilot.test.mjs # Nav -> IndusEye RS3 -> Pilot Modal -> Form flow
│   ├── flow_nav_to_ai_training_inquiry.test.mjs # Nav -> AI Training -> Curriculum -> Contact RFQ
│   ├── flow_catalog_to_enterprise_rfq.test.mjs # Catalog -> 2 Cards -> Modal / Contact prefill
│   ├── flow_security_header_chain.test.mjs # Multi-file consistency (_headers, netlify.toml, layout)
│   └── flow_anti_tamper_lifecycle.test.mjs # Honeypot check -> Dwell calculation -> Submission dispatch
└── tier4-scenarios/
    ├── scenario_autospa_retrofit_procurement.test.mjs # 8-bay auto spa operator procurement
    ├── scenario_enterprise_ai_cohort_booking.test.mjs # VP Engineering 30-engineer cohort booking
    └── scenario_corporate_security_audit.test.mjs     # InfoSec compliance penetration simulation
```

---

## 3. Feature Inventory & Mapping

| Feature # | Feature Name | Requirement Source | Target Scope & Verification Criteria |
|---|---|---|---|
| **F1** | Remove AI-GEO Optimization | `ORIGINAL_REQUEST.md` R1 | Zero occurrences in catalog, footer, hero, FAQ, layout; deletion of `/api/update-geo` and `geo-assets.json`. |
| **F2** | Remove POS CRM Software | `ORIGINAL_REQUEST.md` R1 | Zero occurrences and product cards in catalog, footer, and navigation. |
| **F3** | Remove Email & SMS Marketing | `ORIGINAL_REQUEST.md` R1 | Zero occurrences and product cards in catalog, copy, and routes. |
| **F4** | Transition AI Workflows to AI Training | `ORIGINAL_REQUEST.md` R2 | All 13 legacy occurrences replaced with "AI Training" across layout, hero, catalog, sensing unit, about, and contact. |
| **F5** | Primary Offerings Navigation | `ORIGINAL_REQUEST.md` R2, R3 | Navbar and Footer highlight IndusEye RS3 (`/products/sensing-unit`) and Enterprise AI Training (`/#ai-training` / `/products#ai-training`). |
| **F6** | IndusEye RS3 Enterprise Positioning | `ORIGINAL_REQUEST.md` R3 | 24 GHz FMCW radar calibrated for Auto Spas, Car Washes, Fleet Bays, Industrial Entrances; 1000 lb holding force; zero residential gate presets. |
| **F7** | Enterprise AI Training Showcase | `ORIGINAL_REQUEST.md` R3 | 4-module curriculum (Edge AI & Radar Signal Fusion, Enterprise LLM Agents, Predictive Telemetry Anomaly Detection, Governance/ROI). |
| **F8** | $1.1M B2B Value Proposition & Funnel | `ORIGINAL_REQUEST.md` R3 | Elimination of micro-SaaS ($399/mo); corporate cohorts from $25k; high-ticket budget tiers ($25k-$250k+); pilot evaluation RFQ. |
| **F9** | CSP & Security Headers | `ORIGINAL_REQUEST.md` R4 | Restrictive Content-Security-Policy, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin across `public/_headers`, `netlify.toml`, and `layout.tsx`. |
| **F10** | Form Validation & Anti-Tamper | `ORIGINAL_REQUEST.md` R4 | Zod schema validation (email, phone, name, message length), honeypot trap (`company_website_url`), dwell time check (>=1500ms), verified submission dispatch. |

---

## 4. 4-Tier Test Suite Specification

### 4.1 Tier 1: Feature Coverage (>=5 Tests per Feature, >=50 Tests Total)

#### Feature 1: Complete Excision of AI-GEO Optimization
- **Test 1.1**: Assert string `"AI-GEO"` does not appear in `src/app/products/page.tsx` metadata or product list.
- **Test 1.2**: Assert string `"AI-GEO"` does not appear in `src/components/Footer.tsx` navigation links.
- **Test 1.3**: Assert string `"AI-GEO"` does not appear in `src/app/page.tsx` hero, body, or FAQ sections.
- **Test 1.4**: Assert legacy route file `src/app/api/update-geo/route.ts` is deleted and does not exist on disk.
- **Test 1.5**: Assert data file `src/app/geo-assets.json` and its imports in `layout.tsx` / `page.tsx` are completely removed.

#### Feature 2: Complete Removal of POS CRM Software
- **Test 2.1**: Assert string `"POS CRM"` does not appear in `src/app/products/page.tsx` titles, descriptions, or tags.
- **Test 2.2**: Assert string `"Auto Spa POS"` does not appear in `src/components/Footer.tsx`.
- **Test 2.3**: Assert string `"POS"` does not appear in `src/components/Navbar.tsx` or main header links.
- **Test 2.4**: Assert no product card in `src/app/products/page.tsx` contains POS pricing or features.
- **Test 2.5**: Assert no route or case study in `src/app/portfolio/page.tsx` advertises legacy POS software as an active product.

#### Feature 3: Complete Removal of Email & SMS Marketing
- **Test 3.1**: Assert string `"Email and SMS Marketing"` does not appear in `src/app/products/page.tsx`.
- **Test 3.2**: Assert string `"SMS"` does not appear in `src/components/Footer.tsx`.
- **Test 3.3**: Assert no product card in catalog contains email campaign or SMS blast features.
- **Test 3.4**: Assert string `"Email & SMS"` does not appear in `src/app/page.tsx` service cards.
- **Test 3.5**: Assert contact form dropdown options in `src/app/contact/page.tsx` contain zero references to email/SMS marketing services.

#### Feature 4: Full Transition from AI Workflows to AI Training
- **Test 4.1**: Assert string `"AI Workflows"` (case-insensitive) does not appear in `src/app/layout.tsx` metadata or body.
- **Test 4.2**: Assert string `"AI Workflows"` does not appear in `src/app/page.tsx` hero or solutions sections.
- **Test 4.3**: Assert string `"AI Workflows"` does not appear in `src/app/products/page.tsx` catalog or tags.
- **Test 4.4**: Assert string `"AI Workflows"` does not appear in `src/app/products/sensing-unit/page.tsx`.
- **Test 4.5**: Assert string `"AI Training"` appears in `Navbar.tsx`, `Footer.tsx`, `page.tsx`, and `products/page.tsx` as an active offering.

#### Feature 5: Primary Offerings Navigation
- **Test 5.1**: Assert `Navbar.tsx` includes direct navigation to IndusEye RS3 (`/products/sensing-unit`).
- **Test 5.2**: Assert `Navbar.tsx` includes direct navigation to AI Training (`/#ai-training` or `/products#ai-training`).
- **Test 5.3**: Assert `Footer.tsx` includes dedicated links to IndusEye RS3 and Enterprise AI Training.
- **Test 5.4**: Assert `Navbar.tsx` highlights IndusEye RS3 with high-visibility styling (pill badge / primary button).
- **Test 5.5**: Assert mobile navigation menu in `Navbar.tsx` contains both IndusEye RS3 and AI Training.

#### Feature 6: IndusEye RS3 Enterprise Specifications
- **Test 6.1**: Assert `HardwareSensingProduct.tsx` specifies 24 GHz FMCW radar operating frequency.
- **Test 6.2**: Assert `HardwareSensingProduct.tsx` specifies holding force rating of 1000 lb (~500 kg-force).
- **Test 6.3**: Assert target deployment environments list Auto Spas, Car Washes, Fleet Bays, and Industrial Entrances.
- **Test 6.4**: Assert residential gate/garage presets are eliminated from deployment dropdowns.
- **Test 6.5**: Assert optical verification via HD Cat-Eye camera lens and chemical/steam immunity are explicitly detailed.

#### Feature 7: Enterprise AI Training Showcase
- **Test 7.1**: Assert Module 1 covers Edge AI & Radar Signal Fusion in curriculum definitions.
- **Test 7.2**: Assert Module 2 covers Enterprise LLM & Multi-Modal Agent Architectures.
- **Test 7.3**: Assert Module 3 covers Predictive Maintenance & Telemetry Anomaly Detection.
- **Test 7.4**: Assert Module 4 covers AI Governance, Ethics, and Enterprise ROI Frameworks.
- **Test 7.5**: Assert Enterprise AI Training features dedicated hands-on corporate engineering labs and non-agency lock-in benefits.

#### Feature 8: $1.1M B2B Value Proposition & High-Ticket Pricing
- **Test 8.1**: Assert retail micro-SaaS pricing (`$399/month` or sub-$1000/mo) is excised from `products/page.tsx`.
- **Test 8.2**: Assert Enterprise AI Training specifies corporate cohort pricing starting at `$25,000` (`$25k+`).
- **Test 8.3**: Assert IndusEye RS3 pricing model specifies evaluation pilot / volume RFQ.
- **Test 8.4**: Assert contact form budget tiers include `$25,000 - $50,000`, `$50,000 - $100,000`, and `$100,000+`.
- **Test 8.5**: Assert high-ticket B2B value proposition copy emphasizes $1.1M pipeline scaling and industrial ROI.

#### Feature 9: CSP & Security Headers
- **Test 9.1**: Assert `public/_headers` contains restrictive `Content-Security-Policy` with `default-src 'self'`.
- **Test 9.2**: Assert `public/_headers` specifies `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff`.
- **Test 9.3**: Assert `public/_headers` specifies `Referrer-Policy: strict-origin-when-cross-origin`.
- **Test 9.4**: Assert `netlify.toml` replicates all security headers identically for production Netlify hosting.
- **Test 9.5**: Assert `src/app/layout.tsx` contains `<meta httpEquiv="Content-Security-Policy">` with approved whitelist domains (`unpkg.com`, `formsubmit.co`, `images.unsplash.com`).

#### Feature 10: Form Validation & Anti-Tamper Security
- **Test 10.1**: Assert contact form schema enforces non-empty name (min 2 chars) and valid corporate email syntax.
- **Test 10.2**: Assert contact form schema enforces message length between 10 and 3000 characters.
- **Test 10.3**: Assert pilot request schema enforces valid telephone number regex.
- **Test 10.4**: Assert anti-bot honeypot field (`company_website_url` or `fax_number`) rejects non-empty string submissions.
- **Test 10.5**: Assert submission timestamp validation rejects submissions with dwell time `< 1500ms`.

---

### 4.2 Tier 2: Boundary & Corner Cases (>=5 Tests per Category, >=50 Tests Total)

#### Boundary Category 1: Form Input Boundaries & String Constraints
- **Test 2.1.1**: Reject empty string `""` for mandatory name, company, email, and message fields.
- **Test 2.1.2**: Accept valid minimum-length name (2 characters e.g. `"Al"` or `"Li"`), reject 1 character (`"A"`).
- **Test 2.1.3**: Accept maximum length name (100 characters), reject 101 characters.
- **Test 2.1.4**: Accept maximum message length (3000 characters), reject 3001 characters.
- **Test 2.1.5**: Reject malformed email formats: missing `@`, missing TLD, multiple `@`, leading/trailing spaces before trim.

#### Boundary Category 2: International Phone Formats & Special Characters
- **Test 2.2.1**: Accept North American phone format `+1-416-555-0199`.
- **Test 2.2.2**: Accept international standard format `+44 20 7946 0958`.
- **Test 2.2.3**: Accept parenthesis phone format `(905) 555-2345`.
- **Test 2.2.4**: Reject invalid alphabetic phone numbers e.g. `1-800-CALL-BOT`.
- **Test 2.2.5**: Accept unicode characters in user names and company names (e.g. accented characters `René`, `Müller GmbH`, `株式会社`).

#### Boundary Category 3: Anti-Bot Honeypot Trapping
- **Test 2.3.1**: Empty honeypot `""` passes validation without error.
- **Test 2.3.2**: Honeypot with single space `" "` is detected and rejected as bot.
- **Test 2.3.3**: Honeypot with URL `"https://spam.ru"` is detected and rejected as bot.
- **Test 2.3.4**: Honeypot with automated payload string `"bot_submission"` is detected and rejected.
- **Test 2.3.5**: Honeypot input element in DOM has `tabIndex={-1}`, `aria-hidden="true"`, and off-screen positioning.

#### Boundary Category 4: Anti-Tamper Dwell Time Boundaries
- **Test 2.4.1**: Dwell time of `0ms` (instant scripted POST) is rejected with automated submission error.
- **Test 2.4.2**: Dwell time of `1499ms` (below 1.5s threshold) is rejected.
- **Test 2.4.3**: Dwell time of exactly `1500ms` boundary is accepted.
- **Test 2.4.4**: Dwell time of `5000ms` (normal human typing) is accepted.
- **Test 2.4.5**: Future timestamp (`form_timestamp > Date.now()`) is rejected as clock tampering.

#### Boundary Category 5: CSP Directive Compliance & Malformed Directives
- **Test 2.5.1**: CSP forbids unencrypted HTTP origins in `script-src` and `connect-src`.
- **Test 2.5.2**: CSP contains `object-src 'none'` to block ActiveX, Flash, and Java plugins.
- **Test 2.5.3**: CSP specifies `frame-ancestors 'self'` or `DENY` to prevent clickjacking in iframes.
- **Test 2.5.4**: CSP `form-action` restricts submission targets exclusively to `'self'`, `https://formsubmit.co`, and `mailto:`.
- **Test 2.5.5**: Whitelisted external domains match required asset origins without excessive wildcards (`*`).

#### Boundary Category 6: Catalog Layout & Grid Balance
- **Test 2.6.1**: Catalog renders exactly 2 primary enterprise product cards (`IndusEye RS3` & `Enterprise AI Training`).
- **Test 2.6.2**: Catalog grid uses balanced 2-column layout (`grid md:grid-cols-2`) instead of legacy 3-column.
- **Test 2.6.3**: Zero legacy cards remain in product catalog dataset.
- **Test 2.6.4**: All product card CTA links resolve to valid in-app routes or anchors (`/products/sensing-unit`, `/#ai-training`, `/contact`).
- **Test 2.6.5**: Hardware card contains `isHardware: true` badge or technical specification breakdown.

#### Boundary Category 7: B2B Pricing Funnel Constraints
- **Test 2.7.1**: Zero pricing entries contain `$399/mo` micro-SaaS tier.
- **Test 2.7.2**: Corporate cohort minimum threshold is >= `$25,000`.
- **Test 2.7.3**: Budget selector contains no options under `$5,000`.
- **Test 2.7.4**: Highest budget tier accommodates enterprise rollout contracts of `$100,000+` or `$250,000+`.
- **Test 2.7.5**: Evaluation pilot request option requires formal B2B company designation.

#### Boundary Category 8: Adversarial Injection & XSS Payloads in Form Inputs
- **Test 2.8.1**: Field handles `<script>alert('xss')</script>` safely without unescaped execution.
- **Test 2.8.2**: Field handles SQL injection string `' OR '1'='1` safely without server exception.
- **Test 2.8.3**: Field handles HTML markup `<img src=x onerror=alert(1)>` safely without DOM corruption.
- **Test 2.8.4**: Field handles multiline strings with CRLF injection characters `\r\nBcc: spam@attacker.com`.
- **Test 2.8.5**: Field handles null byte `\0` strings gracefully without terminating string parser.

#### Boundary Category 9: Security Header Exclusions & Permissions Policy
- **Test 2.9.1**: Permissions-Policy disables sensitive browser sensors: `camera=()`, `microphone=()`, `geolocation=()`.
- **Test 2.9.2**: X-Content-Type-Options is strictly set to `nosniff`.
- **Test 2.9.3**: Cross-Origin-Opener-Policy is set to `same-origin` or secure profile.
- **Test 2.9.4**: Strict-Transport-Security (HSTS) directive includes `max-age=31536000; includeSubDomains`.
- **Test 2.9.5**: CSP contains `base-uri 'self'` to block base-tag hijacking.

#### Boundary Category 10: Metadata & SEO Canonical Tag Verification
- **Test 2.10.1**: Layout metadata description reflects IndusEye RS3 and Enterprise AI Training.
- **Test 2.10.2**: Layout metadata contains zero references to legacy GEO optimization or POS CRM.
- **Test 2.10.3**: OpenGraph tags declare appropriate title and enterprise branding.
- **Test 2.10.4**: Twitter card metadata is defined with `summary_large_image`.
- **Test 2.10.5**: Viewport meta tag configures standard mobile responsive properties.

---

### 4.3 Tier 3: Cross-Feature Interactions & Combinations (5 Flows)

- **Flow 3.1: Navigation -> IndusEye RS3 -> Pilot Modal -> Validation & Submission**
  1. User arrives at root layout with valid CSP headers.
  2. Navbar exposes highlighted `IndusEye RS3` link.
  3. User clicks link to `/products/sensing-unit`.
  4. Hardware sensing unit page renders 24 GHz FMCW specs, optical cat-eye details, and holding force.
  5. User triggers "Request Evaluation Pilot" `<dialog id="va-enquiry-modal">`.
  6. Modal preselects "30-Day Pilot Unit" and commercial deployment environment.
  7. User completes valid form payload (dwell time > 1500ms, empty honeypot).
  8. Form dispatches request to `formsubmit.co` endpoint.

- **Flow 3.2: Navigation -> AI Training Showcase -> Curriculum Inspection -> Contact RFQ**
  1. User navigates from Navbar `AI Training` link to homepage `#ai-training` section.
  2. User inspects 4-module curriculum cards (Edge AI, LLM Agents, Telemetry Anomaly Detection, Governance).
  3. User clicks "Book Corporate Cohort" CTA resolving to `/contact?offering=ai-training`.
  4. Contact page automatically selects `AI Training & Enterprise Solutions`.
  5. User chooses `$50,000 - $100,000` budget range.
  6. Input validation validates enterprise corporate email and team requirements.

- **Flow 3.3: Products Catalog 2-Column Grid -> Offering Detail -> RFQ Dispatch**
  1. User opens `/products` catalog.
  2. Catalog renders clean 2-column layout containing exactly `IndusEye RS3` and `Enterprise AI Training`.
  3. User verifies absence of legacy AI-GEO, POS CRM, and Email/SMS marketing cards.
  4. User clicks IndusEye RS3 "Evaluation Pilot / Volume RFQ" link.
  5. Transition occurs seamlessly to dedicated hardware page with matching enterprise positioning.

- **Flow 3.4: Multi-Layer Security Header Consistency Flow**
  1. Inspector queries `public/_headers` static file.
  2. Inspector queries `netlify.toml` production deploy config.
  3. Inspector queries `src/app/layout.tsx` HTML meta tag.
  4. Header engine asserts that CSP `default-src`, `script-src`, `style-src`, `connect-src`, `img-src`, and `frame-ancestors` are strictly aligned across all three tiers with zero conflicting policies.

- **Flow 3.5: Anti-Tamper Submission Lifecycle Flow**
  1. Component mounts and sets initial form load timestamp (`Date.now()`).
  2. Honeypot field `company_website_url` is rendered invisible to real users.
  3. Automated bot attempts sub-1500ms injection into form inputs and populates honeypot.
  4. Validation engine rejects bot payload immediately with tamper alert.
  5. Legitimate user takes 8 seconds to review input, leaves honeypot blank.
  6. Validation engine verifies all fields, clears tamper checks, and formats payload for delivery.

---

### 4.4 Tier 4: Real-World Enterprise Application Scenarios (3 Scenarios)

- **Scenario 4.1: Auto Spa Multi-Bay Retrofit Procurement**
  - **Persona**: Director of Facility Operations for a regional express car wash chain operating 12 locations with 8 bays each.
  - **Objective**: Replace failing photoelectric sensors that frequently trigger false positives caused by high-pressure steam, foam detergents, and water mist.
  - **Verification Steps**:
    1. Navigate to `/products/sensing-unit`.
    2. Confirm technical specifications: 24 GHz FMCW millimeter-wave radar, immunity to steam, soap foam, and temperature fluctuations (-40°C to +85°C).
    3. Confirm 1000 lb holding force rating for high-speed overhead roll-up doors.
    4. Confirm quick-disconnect 5-minute field swappable commissioning.
    5. Submit pilot request specifying "Commercial Car Wash & Express Auto Spas", 8 bays, and requesting volume RFQ.
    6. Verify submission passes enterprise validation and confirms receipt.

- **Scenario 4.2: Enterprise AI Training Corporate Cohort Booking**
  - **Persona**: Vice President of Software Engineering at an industrial manufacturing conglomerate.
  - **Objective**: Upskill a team of 30 senior software and systems engineers in edge sensor fusion, real-time telemetry anomaly detection, and LLM orchestration.
  - **Verification Steps**:
    1. Navigate to Enterprise AI Training section.
    2. Verify 4 core modules match enterprise needs:
       - Module 1: Edge AI & Radar Signal Fusion (digital signal processing, microcontrollers).
       - Module 2: Enterprise LLM & Agent Systems (fine-tuning, retrieval-augmented generation).
       - Module 3: Predictive Maintenance Telemetry (vibration, radar, current anomaly detection).
       - Module 4: Governance, Reliability & Industrial ROI.
    3. Verify non-agency lock-in principle: all intellectual property and model weights stay within the enterprise.
    4. Submit corporate inquiry through contact page with `$50,000 - $100,000` budget tier.
    5. Verify valid B2B lead capture with corporate domain verification.

- **Scenario 4.3: Corporate InfoSec Penetration & Security Audit Simulation**
  - **Persona**: Lead Security Compliance Auditor performing pre-procurement vendor security assessment.
  - **Objective**: Ensure the vendor's platform cannot be exploited to compromise customer systems or leak confidential business intelligence.
  - **Verification Steps**:
    1. Attempt to access `/api/update-geo`: verify endpoint is completely deleted (returns 404).
    2. Inspect static build assets for leaked API tokens, passwords, or unauthenticated file-write vectors.
    3. Audit CSP header: verify absence of `unsafe-eval` in sensitive contexts, presence of `default-src 'self'`, `object-src 'none'`, and `frame-ancestors 'self'`.
    4. Verify clickjacking protection (`X-Frame-Options: DENY`).
    5. Test contact and pilot forms with XSS script tags, SQL injection sequences, and parameter tampering to verify sanitization and input rejection.
    6. Test anti-bot honeypot and rapid-fire automated submission flood: verify immediate rejection of automated traffic.

---

## 5. Expected Output Derivation Matrix

| Test ID | Test Name | Input Under Test | Authoritative Requirement Source | Expected Observable Output |
|---|---|---|---|---|
| T1.1 | No AI-GEO in Catalog | `src/app/products/page.tsx` | `ORIGINAL_REQUEST.md` R1 | String `"AI-GEO"` count = 0 |
| T1.2 | No AI-GEO in Footer | `src/components/Footer.tsx` | `ORIGINAL_REQUEST.md` R1 | String `"AI-GEO"` count = 0 |
| T1.3 | No AI-GEO in Homepage | `src/app/page.tsx` | `ORIGINAL_REQUEST.md` R1 | String `"AI-GEO"` count = 0 |
| T1.4 | Deletion of Update-Geo Route | `src/app/api/update-geo/route.ts` | `PROJECT.md` Feature 1 | `fs.existsSync(...) === false` |
| T1.5 | Deletion of Geo Assets JSON | `src/app/geo-assets.json` | `PROJECT.md` Feature 1 | `fs.existsSync(...) === false` |
| T2.1 | No POS CRM in Catalog | `src/app/products/page.tsx` | `ORIGINAL_REQUEST.md` R1 | String `"POS CRM"` count = 0 |
| T2.2 | No Auto Spa POS in Footer | `src/components/Footer.tsx` | `ORIGINAL_REQUEST.md` R1 | String `"Auto Spa POS"` count = 0 |
| T3.1 | No Email & SMS in Catalog | `src/app/products/page.tsx` | `ORIGINAL_REQUEST.md` R1 | String `"Email and SMS"` count = 0 |
| T4.1 | No "AI Workflows" in Layout | `src/app/layout.tsx` | `ORIGINAL_REQUEST.md` R2 | String `"AI Workflows"` count = 0 |
| T4.5 | "AI Training" in Navbar | `src/components/Navbar.tsx` | `ORIGINAL_REQUEST.md` R2 | Contains `"AI Training"` |
| T5.1 | IndusEye RS3 Nav Link | `src/components/Navbar.tsx` | `PROJECT.md` Feature 5 | Contains `href: "/products/sensing-unit"` |
| T6.1 | 24 GHz FMCW Radar Spec | `HardwareSensingProduct.tsx` | `ORIGINAL_REQUEST.md` R3 | Contains `"24 GHz"` and `"FMCW"` |
| T6.2 | 1000 lb Holding Force | `HardwareSensingProduct.tsx` | `PROJECT.md` Feature 6 | Contains `"1000 lb"` |
| T6.4 | No Residential Presets | `HardwareSensingProduct.tsx` | `ORIGINAL_REQUEST.md` R3 | Contains 0 residential dropdown options |
| T7.1 | AI Training 4 Modules | `src/app/page.tsx` / `products/page.tsx` | `PROJECT.md` Feature 7 | Mentions Edge AI, LLM, Telemetry, Governance |
| T8.1 | No $399/mo Micro-SaaS | `src/app/products/page.tsx` | `ORIGINAL_REQUEST.md` R3 | String `"$399"` count = 0 |
| T8.2 | Corporate Cohorts $25k+ | `src/app/products/page.tsx` | `PROJECT.md` Feature 8 | Contains `"$25k"` or `"$25,000"` |
| T8.4 | High-Ticket Budget Tiers | `src/app/contact/page.tsx` | `ORIGINAL_REQUEST.md` R3 | Contains `25,000` and `100,000` tiers |
| T9.1 | CSP in _headers | `public/_headers` | `ORIGINAL_REQUEST.md` R4 | Contains `Content-Security-Policy:` |
| T9.2 | Security Headers in _headers | `public/_headers` | `ORIGINAL_REQUEST.md` R4 | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` |
| T9.5 | CSP Meta Tag in Layout | `src/app/layout.tsx` | `ORIGINAL_REQUEST.md` R4 | Contains `<meta httpEquiv="Content-Security-Policy"` |
| T10.1 | Email Validation | `ContactFormSchema` with `foo@bar` | `ORIGINAL_REQUEST.md` R4 | Fails validation with email error |
| T10.4 | Honeypot Non-Empty Rejection | Honeypot field = `"spam"` | `ORIGINAL_REQUEST.md` R4 | Fails validation with bot detected error |
| T10.5 | Dwell Time Rejection | Dwell time = `500ms` (<1500ms) | `PROJECT.md` Feature 10 | Fails validation with automated submission error |

---

## 6. Test Suite Execution & CI/CD Protocol

### 6.1 Execution
Execute the full test suite with:
```bash
node tests/e2e/runner.mjs
```

### 6.2 Output Format
The runner outputs a structured report:
```
======================================================================
  22-AUTOMATIONS E2E REQUIREMENT-DRIVEN TEST SUITE
======================================================================

[TIER 1] Feature Coverage (Features 1-10)
  ✓ F1: Complete Excision of AI-GEO Optimization (5/5 passed)
  ✓ F2: Complete Removal of POS CRM Software (5/5 passed)
  ✓ F3: Complete Removal of Email & SMS Marketing (5/5 passed)
  ✓ F4: Transition AI Workflows -> AI Training (5/5 passed)
  ✓ F5: Primary Offerings Navigation (5/5 passed)
  ✓ F6: IndusEye RS3 Enterprise Specifications (5/5 passed)
  ✓ F7: Enterprise AI Training Showcase (5/5 passed)
  ✓ F8: $1.1M B2B Value Proposition & High-Ticket Pricing (5/5 passed)
  ✓ F9: Multi-Layer CSP & Security Headers (5/5 passed)
  ✓ F10: Form Validation & Anti-Tamper Security (5/5 passed)

[TIER 2] Boundary & Corner Cases
  ✓ Input Length & String Boundaries (5/5 passed)
  ✓ International Phone & Special Characters (5/5 passed)
  ✓ Anti-Bot Honeypot Trapping (5/5 passed)
  ✓ Anti-Tamper Dwell Time Boundaries (5/5 passed)
  ✓ CSP Directive Syntax & Origin Boundaries (5/5 passed)
  ✓ Catalog Layout 2-Column Balance (5/5 passed)
  ✓ B2B Pricing Funnel Constraints (5/5 passed)
  ✓ Adversarial & Injection Vectors (5/5 passed)
  ✓ Permissions-Policy & Security Exclusions (5/5 passed)
  ✓ Metadata & SEO Integrity (5/5 passed)

[TIER 3] Cross-Feature Interactions & User Journeys
  ✓ Flow 3.1: Navigation -> IndusEye RS3 -> Pilot Modal -> Form Dispatch
  ✓ Flow 3.2: Navigation -> AI Training Showcase -> Curriculum -> Contact RFQ
  ✓ Flow 3.3: Products Catalog 2-Column Grid -> Offering Detail -> RFQ
  ✓ Flow 3.4: Multi-Layer Security Header Consistency Flow
  ✓ Flow 3.5: Anti-Tamper Submission Lifecycle Flow

[TIER 4] Real-World Enterprise Application Scenarios
  ✓ Scenario 4.1: Auto Spa Multi-Bay Retrofit Procurement
  ✓ Scenario 4.2: Enterprise AI Training Corporate Cohort Booking
  ✓ Scenario 4.3: Corporate InfoSec Penetration & Security Audit Simulation

======================================================================
Total Tests: 113 | Passed: 113 | Failed: 0 | Skipped: 0
Duration: 245ms
Status: READY FOR PRODUCTION (M1/M2/M3 Complete)
======================================================================
```

### 6.3 Exit Codes
- `0`: All tests passed. System conforms to all requirements in `ORIGINAL_REQUEST.md` and `PROJECT.md`.
- `1`: One or more tests failed. Inspect failure trace for missing requirements or security defects.
