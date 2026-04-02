# Dispo Buddy — Project Reference

## What This Is
Dispo Buddy (dispobuddy.com) is a JV disposition partner platform for wholesalers, bird dogs, and agents. 
Static site hosted on Netlify with serverless functions. GHL (GoHighLevel) is the CRM backend.
Owned by Deal Pros LLC. Operated by Brooke.

## Tech Stack
- **Frontend**: Static HTML/CSS/JS (no framework), hosted on Netlify
- **Backend**: Netlify Functions (Node.js serverless)
- **CRM**: GoHighLevel (GHL) — contacts, pipelines, messaging
- **Deal Tracking**: Notion database
- **Automation**: Droplet cron jobs (64.23.204.220) + GHL workflows
- **Domain**: dispobuddy.com

## Repository Structure
```
index.html              — Homepage
buyers-map.html         — Interactive buyer demand map (Leaflet + buyer-demand API)
submit-deal.html        — Deal submission form
join.html               — Partner onboarding form
contact.html            — Contact form
process.html            — How it works page
what-we-look-for.html   — Deal criteria page
proof.html              — Social proof / testimonials
faq.html                — FAQ page
404.html                — Error page
netlify.toml            — Netlify config (redirects, headers, function routing)
netlify/functions/
  buyer-demand.js       — GET /api/buyer-demand — aggregated buyer map data from GHL
  dispo-buddy-submit.js — POST /api/dispo-buddy-submit — deal submission → GHL + Notion
  partner-onboard.js    — POST /api/partner-onboard — partner signup + contact form → GHL
  sitemap.js            — GET /sitemap.xml — dynamic sitemap
cron/                   — Droplet cron job scripts (deploy to 64.23.204.220)
  dedup.js              — File-based dedup module (sent-log.json)
  notify-buyers.js      — Notify matched buyers about new deals (DISABLED)
  deal-follow-up.js     — Follow up on stale deals (DISABLED)
  README.md             — Deployment and usage docs
```

## Key IDs & Config
- **GHL Location**: 7IyUgu1zpi38MDYpSDTs
- **JV Pipeline**: XbZojO2rHmYtYa8C0yUP
- **JV Stage (New)**: cf2388f0-fdbf-4fb1-b633-86569034fcce
- **Notion DB**: a3c0a38fd9294d758dedabab2548ff29

### GHL Custom Field IDs (buyer-demand.js)
- TARGET_STATES: aewzY7iEvZh12JhMVi7E
- TARGET_CITIES: DbY7dHIXk8YowpaWrxYj
- DEAL_STRUCTURES: 0L0ycmmsEjy6OPDL0rgq
- PROPERTY_TYPE: HGC6xWLpSqoAQPZr0uwY
- MAX_PRICE: BcxuopmSK4wA3Z3NyanD
- MAX_ENTRY: SZmNHA3BQva2AZg00ZNP
- MIN_ARV: KKGEfgdaqu98yrZYkmoO
- EXIT_STRATEGIES: 98i8EKc3OWYSqS4Qb1nP
- BUYER_TYPE: 95PgdlIYfXYcMymnjsIv
- CONTACT_ROLE: agG4HMPB5wzsZXiRxfmR

## Environment Variables (Netlify)
- `GHL_API_KEY` — GHL private integration API key
- `GHL_LOCATION_ID` — GHL location ID
- `INTERNAL_ALERT_PHONE` — Brooke's phone for internal SMS alerts
- `INTERNAL_ALERT_EMAIL` — Brooke's email for internal alerts
- `NOTION_TOKEN` — Notion integration token
- `NOTION_DB_ID` — Notion database ID for deals

## Automation Architecture
- **Netlify Functions**: Handle form submissions (deal submit, partner onboard, contact)
  - Auto-send confirmation SMS + email to submitter
  - Auto-send internal alert SMS + email to Brooke
  - Create GHL contact, tags, pipeline opportunity
  - Create Notion deal page
- **Droplet Cron Jobs** (ALL DISABLED except watchdog during audit):
  - notify-buyers — notify matched buyers about new deals
  - deal-follow-up — follow up on stale deals
  - watchdog — health monitoring (ONLY active cron)
- **GHL Workflows**: ALL DISABLED during audit/stabilization

## Important Notes
- The buyer-demand API has a MIN_BUYERS_PER_MARKET privacy threshold
- buyer-demand.js has a 10-minute in-memory cache
- All messaging goes through GHL conversations API (SMS + Email)
- Contact upsert uses phone as the dedup key

---

## AUDIT / STABILIZATION MODE — ACTIVE

**Status**: All Droplet cron jobs DISABLED except watchdog. All GHL workflows DISABLED.
Do NOT enable any cron jobs or outbound messaging until individually tested.

### TODO List

#### Phase 1: Fix & Stabilize (CURRENT)
- [x] Fix homepage — add dynamic Hot Markets section from buyer-demand API
- [x] Fix buyers-map AZ filter — state-only buyers not showing, MIN_BUYERS threshold too high
- [x] Fix join form — field names were mismatched (fullName→full_name, role→partner_type, etc.) — form was completely broken
- [x] Implement file-based dedup (sent-log.json) — cron/dedup.js module created
- [x] Create skeleton cron scripts (notify-buyers.js, deal-follow-up.js) with dedup integration
- [x] Audit form field mapping across all forms (join, contact, submit-deal)
- [x] Audit buyer-demand.js — found dead CF.TARGET_MARKETS reference (non-critical)

#### Phase 2: Audit Each Automation
- [ ] Audit notify-buyers — implement matching logic in cron/notify-buyers.js, test in isolation
- [ ] Audit deal-follow-up — implement follow-up logic in cron/deal-follow-up.js, test in isolation
- [ ] Audit each GHL workflow — document what each does, verify triggers
- [ ] Audit watchdog — verify it reports correctly

#### Phase 3: Test Forms End-to-End
- [x] Audit signup form (partner-onboard.js) — field mapping fixed, code reviewed
- [x] Audit contact form handler — field mapping verified, code reviewed
- [x] Audit deal submission form (dispo-buddy-submit.js) — field mapping verified, code reviewed
- [ ] LIVE TEST signup form — submit → GHL contact + tags + pipeline + notifications
- [ ] LIVE TEST contact form — submit → GHL contact + auto-reply + internal alert
- [ ] LIVE TEST deal submission form — full flow including Notion
- [ ] Test buy box / buying criteria form — verify custom fields map correctly
- [ ] Test offer form — verify pipeline stage updates

#### Phase 4: Re-enable Automations (ONE AT A TIME)
- [ ] Re-enable notify-buyers with dedup — monitor for 24hrs
- [ ] Re-enable deal-follow-up with dedup — monitor for 24hrs
- [ ] Re-enable GHL workflows one at a time — monitor each

#### Phase 5: Enhancements (AFTER stabilization)
- [ ] Add deal detail pages (dynamic routes)
- [ ] Add partner dashboard
- [ ] Add buyer criteria update form
- [ ] Improve SEO / landing pages
