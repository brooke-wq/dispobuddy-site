# 16 — Website & Functions Deploy

## Purpose
dispobuddy.com is the front door to the business. If the site breaks, we lose submissions; if a Netlify function breaks, the entire deal-intake pipeline silently fails. This SOP defines how changes are made, tested, deployed, and smoke-tested — so we never ship a regression that costs us deals.

## Owner / Roles
- **Accountable:** Brooke (technical approval + deploys)
- **Responsible:** Brooke (all code changes go through her today; a future dev contractor can be added to the RACI)
- **Consulted:** Dispo VA (for copy changes and content review)

## Trigger
- A bug on the live site or in a Netlify function
- A request for new functionality (new field, new form, new page)
- A copy/content update
- A compliance-required change (e.g., consent language update)
- An env var rotation

## Inputs required
- GitHub repo access: `brooke-wq/dispobuddy-site`
- Netlify dashboard access
- GHL API credentials (stored in env vars, never in code)
- Notion integration token (stored in env var)
- A local development environment (git + a text editor)

## Tools & systems used
- GitHub — `brooke-wq/dispobuddy-site` (source of truth)
- Netlify — hosting, deploy previews, env vars, function logs
- Local editor — VS Code or similar
- Terminal — git + Netlify CLI (optional but recommended)
- Browser — smoke-testing the deployed site

## Repo layout

```
dispobuddy-site/
├── *.html                          # Static pages (index, process, submit-deal, etc.)
├── logo-*.svg                      # Brand assets
├── robots.txt
├── netlify.toml                    # Netlify build config
├── netlify/
│   └── functions/
│       ├── dispo-buddy-submit.js   # /submit-deal form handler
│       ├── partner-onboard.js      # /join and /contact form handler
│       ├── buyer-demand.js         # /buyers-map data source
│       └── sitemap.js              # generated sitemap
└── sops/                           # These SOPs (this folder)
```

## Required Netlify environment variables

**Never commit these to git. Always set in Netlify dashboard → Site settings → Environment variables.**

| Variable | Purpose | Where it's used |
|---|---|---|
| `GHL_API_KEY` | GHL private integration API key | all 3 functions |
| `GHL_LOCATION_ID` | GHL sub-account / location ID | all 3 functions |
| `NOTION_TOKEN` | Notion integration token | `dispo-buddy-submit.js` |
| `NOTION_DB_ID` | Notion deal database ID (`a3c0a38fd9294d758dedabab2548ff29`) | `dispo-buddy-submit.js` |
| `INTERNAL_ALERT_PHONE` | Brooke's phone for internal SMS alerts | submit + onboard |
| `INTERNAL_ALERT_EMAIL` | Brooke's email for internal alerts | submit + onboard |

Confirm all six are set in every environment (production, deploy previews).

## Branch strategy

- `main` — production. Auto-deploys to dispobuddy.com on every merge.
- `claude/*` — feature branches Claude Code creates for automated tasks.
- `brooke/*` — feature branches Brooke creates for manual changes.
- All changes go through a pull request. **Never push directly to `main`** unless fixing a critical production bug and Brooke explicitly approves.

## Step-by-step deploy procedure

### Step 1 — Plan the change (5 min)
1. Write a one-sentence description of what's changing and why.
2. Identify which files will be touched.
3. Identify any env var changes needed.
4. Identify any GHL/Notion schema changes needed.

### Step 2 — Create a branch
```bash
git checkout main
git pull origin main
git checkout -b brooke/<short-description>
```

### Step 3 — Make the change
1. Edit files in your local editor.
2. For HTML changes, preview in the browser by opening the file directly.
3. For Netlify function changes, test locally with `netlify dev` (requires Netlify CLI). This proxies the functions through a local dev server so you can hit them with Postman or curl.
4. **Never hardcode credentials.** Read from `process.env.*` exactly like the existing functions do.

### Step 4 — Test locally (HTML changes)
1. Open the modified HTML file in your browser.
2. Click through the interaction paths.
3. Validate responsive behavior (resize the window).
4. Check the browser console for JavaScript errors.

### Step 5 — Test locally (function changes)
1. Start `netlify dev`.
2. Post a test payload to the function:
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/dispo-buddy-submit \
     -H "Content-Type: application/json" \
     -d '{"jv_partner_name":"Test","jv_phone_number":"5555555555","property_address":"123 Test","deal_type":"Cash"}'
   ```
3. Check the response status and body.
4. Check GHL manually to confirm the contact/opportunity was created (use a throwaway contact, not a real one).
5. Check Netlify function logs in the terminal for any warnings.

### Step 6 — Commit and push
```bash
git add -A
git commit -m "Short imperative description of the change"
git push -u origin brooke/<short-description>
```

### Step 7 — Open a PR
1. Go to `github.com/brooke-wq/dispobuddy-site`.
2. Open a pull request from your branch to `main`.
3. Description: what changed, why, what to test.
4. Wait for the Netlify deploy preview to build.

### Step 8 — Test the deploy preview
The preview URL looks like `https://deploy-preview-<N>--dispobuddy.netlify.app`.

1. Hit every page you changed.
2. Submit a test form submission on the preview. **Use a throwaway email and phone** — the submission still fires real GHL and Notion writes because deploy previews share env vars with prod. Clean up the test contact after.
3. Check browser console for errors.
4. Check Netlify function logs in the deploy preview (Netlify → Site → Deploys → Preview → Functions).

### Step 9 — Merge and deploy to prod
1. Once the deploy preview checks out, merge the PR.
2. Netlify auto-deploys `main` to dispobuddy.com within 2–5 minutes.
3. Watch the build log for any errors.

### Step 10 — Smoke test prod (critical — never skip)
Hit every form and verify end-to-end:

| Test | Steps | Expected |
|---|---|---|
| Deal submission | Submit a full deal with a test email/phone on `/submit-deal` | 200 response, confirmation SMS received, GHL contact + opportunity created, Notion row created, internal alert fired to Brooke |
| Partner onboarding | Submit `/join` form with test info | 200 response, welcome SMS received, GHL contact created, internal alert to Brooke |
| Contact form | Submit `/contact` form with test info | 200 response, GHL message, internal alert to Brooke |
| Buyers map | Load `/buyers-map` | Map loads with live data, function returns a 200, data looks sensible |
| FAQ, Process, What We Look For, Proof, Home | Click-through | No 404s, no broken images, no console errors |

**If any test fails:** immediately revert the merge (`git revert <commit>` on main, force-push to main with Brooke's explicit OK) or roll back via Netlify (Netlify → Deploys → previous deploy → Publish deploy).

### Step 11 — Clean up
1. Delete the test contact from GHL.
2. Delete the test Notion row.
3. Delete the feature branch locally and on GitHub.
4. Update any related SOPs if the change affected a documented process.
5. Update the changelog in any SOP that references the changed code.

## Emergency hotfix procedure

If the production site is broken (forms failing, 500 errors, down):

1. **Revert first, diagnose later.** In Netlify → Deploys, click the last-known-good deploy and "Publish deploy." That takes < 30 seconds.
2. **Then** investigate and fix on a branch.
3. Never edit live files directly in the Netlify dashboard — always go through git.
4. After the fix is deployed, write a 3-paragraph post-mortem in `/sops/Incidents/YYYY-MM-DD-description.md`: what broke, what we did, what we'll do differently.

## Templates & scripts

### Test curl for the submit function
```bash
curl -X POST https://dispobuddy.com/.netlify/functions/dispo-buddy-submit \
  -H "Content-Type: application/json" \
  -d '{
    "jv_partner_name": "Test Partner",
    "jv_phone_number": "5555551234",
    "jv_partner_email": "test@example.com",
    "property_address": "123 Test St",
    "property_city": "Phoenix",
    "property_state": "AZ",
    "property_zip": "85001",
    "deal_type": "Cash",
    "contracted_price": "150000",
    "desired_asking_price": "165000",
    "arv_estimate": "210000",
    "is_this_your_first_deal_with_dispo_buddy": "No",
    "under_contract": "Yes"
  }'
```

### Revert a merged PR
```bash
git checkout main
git pull origin main
git revert <commit-hash>
git push origin main
```

### Set/update an env var in Netlify
1. Netlify dashboard → Site settings → Environment variables
2. Add / edit / delete
3. **Redeploy** to pick up the new value (env vars are only read at build/runtime start)

## SLAs / quality standards
- **Every change in a branch + PR** (zero direct pushes to main)
- **Every change smoke-tested on the deploy preview**
- **Every prod deploy smoke-tested** within 10 minutes of deploy
- **Hotfix revert within 5 minutes** of a broken deploy being noticed
- **Post-mortem within 24 hours** of any production incident

## Escalation / edge cases
- **Env var rotation** (GHL rotates the key, we update it) — set the new value in Netlify, trigger a redeploy, smoke-test, document the rotation date
- **New env var added** — update this SOP's "Required Netlify environment variables" table, update the function code to read it, update `.env.example` if we ever add one
- **Schema change to GHL pipeline / stages / tags** — update [SOP 12](./12-ghl-crm-hygiene.md), then update the function code if stage IDs are hardcoded, then deploy
- **Netlify outage** — we can't do much; check status.netlify.com; partners will get errors on form submit; drop a Twitter/LinkedIn update if it's prolonged
- **GHL outage** — function calls will fail at the GHL step. The Netlify function still returns 500. Monitor GHL status. Consider temporarily buffering submissions to a queue if outages get common.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md) (downstream consumer)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (schema ownership)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md) (schema ownership)
- [15 — Compliance](./15-compliance.md) (consent language changes)

## Bottleneck this SOP addresses
[B5 — Incomplete deal submissions](./00-bottlenecks.md#b5--incomplete-deal-submissions-force-back-and-forth) — the submit form hardening lives in this deploy flow.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
