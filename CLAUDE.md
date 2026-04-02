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
- [ ] Implement file-based dedup (sent-log.json) for notify-buyers cron
- [ ] Implement file-based dedup (sent-log.json) for deal-follow-up cron

#### Phase 2: Audit Each Automation
- [ ] Audit notify-buyers — test in isolation, verify matching logic, check for duplicate sends
- [ ] Audit deal-follow-up — test in isolation, verify timing logic, check for duplicate sends
- [ ] Audit each GHL workflow — document what each does, verify triggers
- [ ] Audit watchdog — verify it reports correctly

#### Phase 3: Test Forms End-to-End
- [ ] Test signup form (partner-onboard.js) — submit → GHL contact + tags + pipeline + notifications
- [ ] Test buy box / buying criteria form — verify custom fields map correctly
- [ ] Test offer form — verify pipeline stage updates
- [ ] Test inquiry form — verify contact form handler
- [ ] Test deal submission form (dispo-buddy-submit.js) — full flow including Notion

#### Phase 4: Re-enable Automations (ONE AT A TIME)
- [ ] Re-enable notify-buyers with dedup — monitor for 24hrs
- [ ] Re-enable deal-follow-up with dedup — monitor for 24hrs
- [ ] Re-enable GHL workflows one at a time — monitor each

#### Phase 5: Enhancements (AFTER stabilization)
- [ ] Add deal detail pages (dynamic routes)
- [ ] Add partner dashboard
- [ ] Add buyer criteria update form
- [ ] Improve SEO / landing pages
