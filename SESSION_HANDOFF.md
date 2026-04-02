# Dispo Buddy — Session Handoff

## Last Updated: 2026-04-02

## What Was Done

### GHL Automation Audit — Complete

Audited all 3 Netlify functions, 3 frontend forms, and their GHL integrations.

### Architecture

| Form | Page | Endpoint | Backend Function |
|------|------|----------|-----------------|
| Contact | `/contact` | `/.netlify/functions/partner-onboard` | `partner-onboard.js` (formType='contact') |
| Join Network | `/join` | `/.netlify/functions/partner-onboard` | `partner-onboard.js` (formType='partner-onboard') |
| Submit Deal | `/submit-deal` | `/.netlify/functions/dispo-buddy-submit` | `dispo-buddy-submit.js` |
| Buyer Map (GET) | `/buyers-map` | `/.netlify/functions/buyer-demand` | `buyer-demand.js` |

### GHL Automations Per Form

**Submit Deal → `dispo-buddy-submit.js`:**
1. Upsert contact in GHL (source: "Dispo Buddy — Submit Deal")
2. Apply tags: `dispo-buddy`, `jv-partner`, deal-type tags, `db-first-deal` if applicable
3. Create opportunity in "3. JV Deals" pipeline (stage: "New JV Lead")
4. Create Notion page (if NOTION_TOKEN set)
5. SMS confirmation to partner
6. Email confirmation to partner
7. Internal SMS alert (if INTERNAL_ALERT_PHONE set)
8. Internal email alert (if INTERNAL_ALERT_EMAIL set)
9. Add note to GHL contact
10. First-deal welcome SMS (if first deal)

**Join Network → `partner-onboard.js`:**
1. Upsert contact in GHL (source: "Dispo Buddy — Partner Onboarding")
2. Apply tags: `dispo-buddy`, `jv-partner`, `db-onboarding`, conditionally `db-agent`, `db-deal-ready`
3. Create opportunity in same "3. JV Deals" pipeline (stage: "New JV Lead")
4. Welcome SMS to partner
5. Welcome email to partner
6. Internal SMS alert
7. Internal email alert
8. Deal-ready nudge SMS (if deal_ready='Yes')
9. Add note to GHL contact

**Contact Form → `partner-onboard.js` (formType='contact'):**
1. Upsert contact in GHL (source: "Dispo Buddy — Contact Form")
2. Apply tags: `dispo-buddy`, `db-contact-form`
3. Auto-reply email
4. Internal SMS alert
5. Internal email alert
6. Add note to GHL contact

### Bugs Fixed

1. **CRITICAL: join.html field name mismatch** — Frontend sent camelCase (`fullName`, `dealReady`, `role`, etc.) but `partner-onboard.js` expects snake_case (`full_name`, `deal_ready`, `partner_type`, etc.). Every partner onboarding submission was returning 400. Fixed by updating `join.html` to send snake_case keys.

2. **dispo-buddy-submit.js missing OPTIONS handler** — No CORS preflight handling, which could cause submit-deal form to fail in some browsers. Added OPTIONS handler and full CORS headers.

### Webhook Overlap Analysis

- Contact form and Join form share `partner-onboard.js` — **intentional**, dispatched via `formType`. No conflict.
- Both `partner-onboard.js` and `dispo-buddy-submit.js` create opportunities in the **same** GHL pipeline (`XbZojO2rHmYtYa8C0yUP`, stage `cf2388f0-fdbf-4fb1-b633-86569034fcce`). A partner who joins AND submits gets two opportunities. If GHL workflows trigger on "new opportunity in JV Deals pipeline," they'd fire for both. **Recommendation:** Either use a separate pipeline for onboarding, or add pipeline-stage logic in GHL to differentiate (e.g., different stage for onboarding vs. deal submission).

### GHL Config Details

- **Location ID:** `7IyUgu1zpi38MDYpSDTs`
- **JV Pipeline ID:** `XbZojO2rHmYtYa8C0yUP`
- **JV Stage (New):** `cf2388f0-fdbf-4fb1-b633-86569034fcce`
- **API Base:** `https://services.leadconnectorhq.com`
- **API Version:** `2021-07-28`

### Env Vars Required

| Variable | Required | Used By |
|----------|----------|---------|
| `GHL_API_KEY` | Yes | All 3 functions |
| `GHL_LOCATION_ID` | Yes | All 3 functions |
| `INTERNAL_ALERT_PHONE` | Optional | partner-onboard, dispo-buddy-submit |
| `INTERNAL_ALERT_EMAIL` | Optional | partner-onboard, dispo-buddy-submit |
| `NOTION_TOKEN` | Optional | dispo-buddy-submit only |
| `NOTION_DB_ID` | Optional | dispo-buddy-submit (defaults to hardcoded) |

## What's Next (Before Go-Live)

- [ ] **Test all 3 forms end-to-end** with GHL API key connected
- [ ] **Verify GHL custom field keys** match what the functions send (field keys like `jv_partner_name`, `deal_type`, etc.)
- [ ] **Check GHL workflows** — ensure no duplicate triggers from partner onboarding + deal submission both creating opportunities in the same pipeline
- [ ] **Review GHL pipeline stages** — consider separate pipeline or stage for onboarding vs. deals
- [ ] **Verify Notion DB properties** match the field mappings in `dispo-buddy-submit.js`
- [ ] **Set Netlify env vars** (GHL_API_KEY, GHL_LOCATION_ID, INTERNAL_ALERT_PHONE, INTERNAL_ALERT_EMAIL)
- [ ] **DNS / domain** — ensure dispobuddy.com points to Netlify
