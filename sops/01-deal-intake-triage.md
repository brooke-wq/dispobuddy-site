# 01 — Deal Intake & Triage

## Purpose
Every public promise we make — 24–48 hour review, no ghosting, fast decisions — lives or dies in the first two hours after a deal hits the system. This SOP makes sure every submission is verified, logged, acknowledged, assigned to a reviewer, and on the SLA clock, without dropping anything.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Informed:** Brooke (via automated internal alert)

## Trigger
A partner submits the form at `/submit-deal`. This fires `netlify/functions/dispo-buddy-submit.js`, which:
1. Upserts a GHL contact
2. Applies tags
3. Creates an opportunity in pipeline "3. JV Deals" at stage "New JV Lead"
4. Creates a Notion page
5. Sends automated confirmation SMS + email to the partner
6. Sends automated internal SMS + email alerts to Brooke (`INTERNAL_ALERT_PHONE` / `INTERNAL_ALERT_EMAIL`)
7. Adds a note to the GHL contact
8. Fires a first-deal welcome SMS if `is_this_your_first_deal_with_dispo_buddy = Yes`

**The Dispo VA is responsible for verifying every one of those steps actually happened and taking over from there.**

## Inputs required
- Internal alert SMS/email (confirms something happened)
- GHL access
- Notion access
- Drive folder template

## Tools & systems used
- GHL → Conversations, Contacts, Opportunities
- Notion → DispoBuddy Deals database
- Google Drive → `/DispoBuddy/Deals/YYYY/` folder
- Netlify logs (only if something failed)

## Step-by-step procedure

When you receive the internal alert SMS ("New JV Deal: …"):

### Step 1 — Verify the automated pipeline fired correctly
1. **Open GHL → Opportunities → 3. JV Deals → New JV Lead.**
2. Find the new opportunity. Confirm:
   - [ ] Contact is created/updated with correct name, phone, email
   - [ ] Tags are applied (role, source, first_deal if applicable)
   - [ ] Opportunity has the property address in its name
   - [ ] Monetary value field is populated (asking price)
   - [ ] Partner confirmation SMS shows in the conversation log
   - [ ] Partner confirmation email shows in the conversation log
3. **Open Notion → DispoBuddy Deals.** Confirm a new row was created matching this submission. If not, flag [SOP 13](./13-notion-deal-tracker.md) — create manually.
4. **If any of the above is missing:** check Netlify function logs for `dispo-buddy-submit`. Screenshot the error and escalate to Brooke. Then recreate the missing pieces by hand.

### Step 2 — Assess completeness
Open the opportunity in GHL and pull the submission data. Check for the required fields below. Mark the deal's **Status** based on what's there.

**Required for any deal:**
- [ ] Partner name, phone, email
- [ ] Property address (full: street, city, state, ZIP)
- [ ] Under contract? Y/N
- [ ] Deal type selected
- [ ] Contract price OR asking price
- [ ] Occupancy status
- [ ] Close of escrow date
- [ ] Photo link
- [ ] Contract/docs link (if under contract)

**Required for sub-to or seller finance:**
- [ ] Existing mortgage balance
- [ ] Interest rate
- [ ] Monthly payment
- [ ] Lender
- [ ] (SF only) loan term, balloon

**If any required field is missing:**
- Move opportunity to **Needs Info** stage
- Tag opportunity `needs_info`
- Send the appropriate "Needs Info" SMS from [SOP 14](./14-partner-communication.md)
- Do NOT start the 24–48hr clock until the info is in

**If everything is there:**
- Move opportunity to **Under Review** stage
- Tag `under_review`
- Start the 24–48hr SLA clock (note the decision deadline in the opportunity custom field `Decision Deadline`)

### Step 3 — Create the deal folder in Drive
1. Navigate to `/DispoBuddy/Deals/YYYY/`.
2. Create a new folder: `YYYY-MM-DD — [City, ST] — [Partner Last Name] — [Street Address]`.
3. Copy the template sub-folders:
   ```
   /01 — Submission (submission form export + any attachments)
   /02 — Contracts (purchase contract, amendments, rider)
   /03 — Photos (from partner)
   /04 — Comps (our comp pulls)
   /05 — Deal Sheet (what we market, see SOP 04)
   /06 — Buyer Outreach (who we contacted)
   /07 — Offers (what came back)
   /08 — Title & Closing (title docs, HUD)
   /09 — JV Agreement (executed)
   ```
4. Drop the partner's submitted photo/docs links into `/01 — Submission/` as a README.md with the links.
5. Link the folder URL to the GHL opportunity's `Drive Folder` custom field.
6. Link the folder URL to the Notion row's `Drive Folder` property.

### Step 4 — Assign the reviewer
1. Default reviewer: **Brooke** (until an underwriting VA is hired and trained).
2. Assign the opportunity to the reviewer in GHL (Owner field).
3. In the opportunity's note log, paste:
   ```
   [YYYY-MM-DD HH:MM] [your initials] — Triaged. Completeness: [COMPLETE / NEEDS INFO]. Moved to [stage]. Reviewer: Brooke. Decision deadline: [YYYY-MM-DD HH:MM].
   ```

### Step 5 — Hand off to underwriting
- Text Brooke in the daily ops thread: `New deal: [City, ST] — [deal type] — [asking] — review deadline [time]`.
- The deal is now in Brooke's court per [SOP 02 — Deal Underwriting](./02-deal-underwriting.md).

### Step 6 — Watch the SLA clock
Every 4 hours until a decision is made:
- Is the deal still in "Under Review"? Is it past 20 hours with no decision? Ping Brooke.
- Is it in "Needs Info" with no partner response after 12 hours? Send the follow-up SMS per [SOP 14](./14-partner-communication.md).

## Templates & scripts

**Confirmation that triage is complete (internal note):**
```
[YYYY-MM-DD HH:MM] [initials] — Triage complete. Pipeline stage: Under Review. All required fields present. Drive folder created: [url]. Reviewer: Brooke. Decision deadline: [YYYY-MM-DD HH:MM].
```

**Partner ping — missing info (choose from [SOP 14](./14-partner-communication.md) library):**
See the "Needs Info" SMS templates.

**Escalation — automated pipeline failed:**
```
ESC — dispo-buddy-submit function failed for [partner/property]. Error: [paste]. I've manually created the GHL contact + opportunity + Notion row. Need you to investigate the function.
```

## SLAs / quality standards
- **Triage complete** within **2 hours** of submission during business hours, or by 10 AM next business day.
- **All required fields checked** on every intake. Never start an SLA clock on a deal that's missing info.
- **Drive folder created** for every single deal, even the ones that will obviously decline — we want the paper trail.
- **Internal note written** in every deal's log. No undocumented triage.

## Escalation / edge cases
- **Duplicate submission** (same partner, same address, within 7 days) — merge into the existing opportunity, add a note explaining the merge, reply to the partner acknowledging the duplicate.
- **Partner submitted a deal they're not the original contract holder on** — tag `assignment_of_assignment`, escalate to Brooke + [SOP 15](./15-compliance.md).
- **Deal is outside our active markets** — still triage, still underwrite; Brooke will decide on a case-by-case basis.
- **Partner is on `do_not_contact`** — do not reply via SMS. Route to Brooke; she will call.
- **Partner's consent checkbox wasn't checked** — the form should have rejected the submit. If it got through, flag [SOP 16](./16-website-functions-deploy.md) bug.

## Related SOPs
- [02 — Deal Underwriting](./02-deal-underwriting.md) (the next step)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (pipeline stage source of truth)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md)
- [14 — Partner Communication](./14-partner-communication.md)
- [16 — Website & Functions Deploy](./16-website-functions-deploy.md) (when something fails)

## Bottleneck this SOP addresses
[B5 — Incomplete deal submissions force back-and-forth](./00-bottlenecks.md#b5--incomplete-deal-submissions-force-back-and-forth) and [B1 — Underwriting single-threaded](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder) (by filtering incomplete deals before they hit the underwriter)

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
