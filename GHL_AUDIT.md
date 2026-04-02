# Dispo Buddy -- GHL Automations Audit

**Date:** 2026-04-02
**Scope:** All Netlify functions, form integrations, GHL webhook flows

---

## CRITICAL BUGS FIXED

### 1. Join Form Completely Broken (partner-onboard.js)

**Severity:** CRITICAL -- /join form returned 400 on every submission

**Root cause:** `join.html` sends camelCase field names (`fullName`, `role`, `dealReady`, etc.)
but `partner-onboard.js` expects snake_case (`full_name`, `partner_type`, `deal_ready`).
The validation check `if (!body.full_name || ...)` always failed.

**Field mapping gap:**
| Form sends (join.html) | Server expected |
|------------------------|-----------------|
| `fullName`             | `full_name`     |
| `role`                 | `partner_type`  |
| `markets`              | `primary_markets` |
| `dealTypes` (array)    | `deal_types` (string) |
| `volume`               | `monthly_volume` |
| `dealReady`            | `deal_ready`    |
| `source`               | `referral_source` |

**Fix:** Added `normalizeOnboardingFields()` function that maps both camelCase and snake_case
inputs, so the form works regardless of naming convention.

### 2. Missing CORS Preflight Handler (dispo-buddy-submit.js)

**Severity:** HIGH -- Browsers sending OPTIONS preflight to /submit-deal got 405

`partner-onboard.js` had an OPTIONS handler, but `dispo-buddy-submit.js` did not.
Also missing `Access-Control-Allow-Headers` and `Access-Control-Allow-Methods` in responses.

**Fix:** Added OPTIONS handler and consistent CORS headers to `respond()`.

### 3. Undefined CF.TARGET_MARKETS (buyer-demand.js)

**Severity:** MEDIUM -- Buyers with only free-text market data were silently excluded

Line 119 references `CF.TARGET_MARKETS` but it was never defined in the CF object.
This meant the fallback buyer-matching logic for free-text market fields never fired.

**Fix:** Added `TARGET_MARKETS` as alias for `TARGET_CITIES` in CF object.

### 4. XSS in Internal Email Templates

**Severity:** MEDIUM -- User input rendered as raw HTML in internal alert emails

All user-supplied data (names, messages, addresses) was interpolated directly into HTML
templates without escaping. A malicious submission with `<script>` tags in the name
field would execute in internal alert emails.

**Fix:** Added `esc()` helper to both function files; applied to all user data in HTML templates.

---

## WEBHOOK OVERLAP ANALYSIS

### Same Pipeline + Stage for Different Purposes

Both `partner-onboard.js` and `dispo-buddy-submit.js` create opportunities in:
- **Pipeline:** `3. JV Deals` (`XbZojO2rHmYtYa8C0yUP`)
- **Stage:** `New JV Lead` (`cf2388f0-fdbf-4fb1-b633-86569034fcce`)

| Source | Opportunity Name Pattern | Monetary Value |
|--------|-------------------------|----------------|
| Partner onboarding | `Onboarding -- {Type} -- {Name}` | $0 |
| Deal submission | `{DealType} -- {City} {State} -- {Name}` | Actual asking price |

**Impact:** $0-value onboarding opportunities mix with real deal opportunities, cluttering
the pipeline view and skewing revenue reporting.

**Recommendation:** Either:
1. Create a separate pipeline stage for onboarding (e.g. "Partner Onboarding") so deals and
   partners are visually separated, OR
2. Stop creating opportunities for onboarding and only create them for deal submissions.
   Partner tracking can use tags + contact properties instead.

### Contact Data Overwrite on Repeat Submissions

When the same partner submits multiple deals, `contacts/upsert` overwrites ALL custom fields
with the latest deal's data. Previous deal info is lost from the contact record.

**What IS preserved:** Notion pages (each submission = new page), CRM notes (appended).
**What is LOST:** Custom field values on the GHL contact (property address, deal type, pricing).

**Recommendation:** This is acceptable IF Notion is your source of truth for deal data.
If you need deal history in GHL, consider appending deal data to notes only (don't overwrite
custom fields) or using a per-deal pipeline opportunity as the record.

### No Duplicate Opportunity Check

Every form submission creates a new opportunity. If a partner accidentally submits twice,
you get duplicate pipeline entries.

**Recommendation:** Add a check before creating the opportunity -- search for existing open
opportunities for the same contact in the same pipeline. If found, skip or update.

---

## FORM TESTING CHECKLIST

### /contact (contact.html)
- [x] Sends `formType: 'contact'` to `/.netlify/functions/partner-onboard`
- [x] Required fields: `name`, `email`
- [x] Auto-reply email sent to submitter
- [x] Internal SMS + email alerts (if env vars set)
- [x] CRM note added
- [x] Tags applied: `dispo-buddy`, `db-contact-form`

### /join (join.html)
- [x] Sends `formType: 'partner-onboard'` to `/.netlify/functions/partner-onboard`
- [x] Required fields: `full_name` (was `fullName`), `email`, `phone`, `partner_type` (was `role`)
- [x] **FIX APPLIED:** Field name normalization
- [x] Welcome SMS + email sent to partner
- [x] Internal SMS + email alerts
- [x] Opportunity created in JV Deals pipeline
- [x] Deal-ready nudge SMS if `deal_ready === 'Yes'`
- [x] Tags: `dispo-buddy`, `jv-partner`, `db-onboarding`, conditional `db-agent`, `db-deal-ready`
- [x] UTM tracking captured and passed to GHL attribution

### /submit-deal (submit-deal.html)
- [x] Sends to `/.netlify/functions/dispo-buddy-submit`
- [x] **FIX APPLIED:** CORS OPTIONS handler added
- [x] Required fields: `jv_partner_name`, `jv_phone_number`
- [x] Confirmation SMS + email to partner
- [x] Internal SMS + email alerts
- [x] Opportunity created with monetary value
- [x] Notion page created (if NOTION_TOKEN set)
- [x] First-deal welcome SMS if applicable
- [x] Draft auto-save to localStorage
- [x] Tags: deal-type-specific + `db-first-deal`, `db-direct-to-seller`, `db-jv-with-wholesaler`

### /buyers-map (buyer-demand API)
- [x] GET `/.netlify/functions/buyer-demand`
- [x] **FIX APPLIED:** CF.TARGET_MARKETS defined
- [x] Privacy: 2+ buyer minimum per market
- [x] 10-minute in-memory cache
- [x] Aggregates by city/state with price ranges

---

## GHL INTEGRATION MAP

```
Form Submissions
    |
    +-- /contact -----> partner-onboard.js ----> GHL Contact (upsert)
    |                                       +--> Tags: db-contact-form
    |                                       +--> Note added
    |                                       +--> Auto-reply email
    |
    +-- /join --------> partner-onboard.js ----> GHL Contact (upsert)
    |                                       +--> Tags: db-onboarding + role-based
    |                                       +--> Opportunity: "Onboarding -- Type -- Name" ($0)
    |                                       +--> Welcome SMS + email
    |                                       +--> Deal-ready nudge (conditional)
    |
    +-- /submit-deal -> dispo-buddy-submit.js -> GHL Contact (upsert, overwrites)
    |                                       +--> Tags: db-deal-submission + deal-type
    |                                       +--> Opportunity: "DealType -- City ST -- Name" ($value)
    |                                       +--> Notion page created
    |                                       +--> Confirmation SMS + email
    |                                       +--> First-deal welcome (conditional)
    |
    +-- /buyers-map --> buyer-demand.js -------> GHL Contacts search (read-only)
                                            +--> Aggregated, anonymized response
```

## Environment Variables Required

| Variable | Used By | Required? |
|----------|---------|-----------|
| `GHL_API_KEY` | All functions | Yes |
| `GHL_LOCATION_ID` | All functions | Yes |
| `INTERNAL_ALERT_PHONE` | partner-onboard, dispo-buddy-submit | Optional |
| `INTERNAL_ALERT_EMAIL` | partner-onboard, dispo-buddy-submit | Optional |
| `NOTION_TOKEN` | dispo-buddy-submit | Optional |
| `NOTION_DB_ID` | dispo-buddy-submit | Optional (defaults to hardcoded ID) |

---

## REMAINING RECOMMENDATIONS

1. **Separate pipeline stages** for onboarding vs. deal submissions
2. **Add opportunity dedup** before creating new pipeline entries
3. **Consider a GHL webhook trigger** (inbound) for status updates back to the site
4. **Rate limiting** -- no rate limiting on form endpoints; consider Netlify rate limiting
5. **Monitor GHL API usage** -- each submission makes 4-6 API calls; at volume this could hit rate limits
