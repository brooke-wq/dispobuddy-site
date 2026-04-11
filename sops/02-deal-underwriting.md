# 02 — Deal Underwriting

## Purpose
Underwriting is where DispoBuddy's reputation is built and where the biggest single bottleneck in the business lives today ([B1](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder)). This SOP turns underwriting from a founder-only judgment call into a deterministic rubric a trained VA can execute for 80% of deals, with Brooke stepping in only on grey areas.

## Owner / Roles
- **Accountable:** Brooke (final pass/fail call — non-delegable)
- **Responsible (comp pulling + rubric evaluation):** Dispo VA
- **Responsible (final call):** Brooke (until an underwriting VA is trained to handle "green" deals solo)
- **Consulted:** Brooke (on any yellow/edge case)

## Trigger
A deal has been triaged and moved to "Under Review" per [SOP 01](./01-deal-intake-triage.md).

## Inputs required
- Complete deal submission (all required fields present)
- Comp-pulling tool access (PropStream OR Batch OR MLS)
- Underwriting calculator (Google Sheet — link in team vault)
- Access to our buyer demand data (the `/buyers-map` page + GHL)

## Tools & systems used
- GHL (opportunity + notes)
- PropStream / Batch / local MLS
- Google Sheet: "DispoBuddy Underwriter v1" (auto-calculates rubric)
- Drive folder for the deal (`/04 — Comps/`)

## Underwriting rubric by deal type

For every deal, run all four checks in order. The deal passes only if it clears every check with a GREEN or YELLOW result; a single RED fails the deal.

### Universal checks (all deal types)

#### Check 1 — Ownership & contract validity
- [ ] Partner has the property under a signed purchase contract (we saw it in `/02 — Contracts/`)
- [ ] Contract close date is ≥ 14 days away (enough runway to market)
- [ ] Contract is assignable (or has a rider/nominee clause that allows assignment)
- [ ] No outstanding title issues disclosed (liens, probate, pending litigation)

**RED if any of these fail.** Decline per [SOP 11](./11-dead-deal-rejection.md).

#### Check 2 — Property fundamentals
- [ ] Property type is one we sell (SFR, small multi, large multi, land, mobile, commercial — not unusual asset classes like boat slips, storage units without prior Brooke OK)
- [ ] Market has active buyers (check the buyer demand map and GHL buyer list for the state)
- [ ] Photos exist and show the property in its actual condition
- [ ] We can identify at least 3 sold comps within a 1-mile radius in the last 6 months

**YELLOW if comps are sparse (2 comps, 12 months).** Escalate to Brooke.
**RED if no comps exist** (no market). Decline.

#### Check 3 — Spread & fee analysis
Calculate the following in the underwriter sheet:

- **Spread** = `asking_price - contract_price` (what we're trying to make)
- **Spread %** = `spread / asking_price × 100`
- **ARV cushion** = `arv - asking_price`
- **ARV cushion %** = `arv_cushion / arv × 100`
- **Fee-to-ARV ratio** = `spread / arv × 100`
- **Fee-to-price ratio** = `spread / contract_price × 100`

#### Check 4 — Timeline
- [ ] Close date ≥ 14 days away
- [ ] Partner is responsive (< 4 hours to messages)
- [ ] Seller is motivated (timeline urgency, disclosed hardship, or clean exit reason)

---

### Cash assignment rubric

| Metric | GREEN (auto-pass) | YELLOW (Brooke review) | RED (auto-decline) |
|---|---|---|---|
| Spread % | ≥ 12% | 8–12% | < 8% |
| ARV cushion % | ≥ 25% | 15–25% | < 15% |
| Fee-to-ARV | ≤ 8% | 8–12% | > 12% |
| Comp count (6-mo, 1-mi) | ≥ 3 | 2 | < 2 |
| Days to COE | ≥ 21 | 14–21 | < 14 |

### Subject-to rubric

Additional sub-to metrics on top of universals:

| Metric | GREEN | YELLOW | RED |
|---|---|---|---|
| Existing UPB vs ARV | ≤ 80% | 80–90% | > 90% |
| Existing interest rate | ≤ 5% | 5–7% | > 7% |
| Payment-to-rent ratio (PITI vs market rent) | ≤ 80% | 80–100% | > 100% |
| Buyer down payment needed | ≤ $30k | $30k–$60k | > $60k |
| Due-on-sale risk (lender type) | Fannie/Freddie conventional | Portfolio/unknown | Commercial with accelerated DOS clauses |

### Seller finance rubric

| Metric | GREEN | YELLOW | RED |
|---|---|---|---|
| Seller loan amount vs ARV | ≤ 70% | 70–80% | > 80% |
| Interest rate | ≤ 5% | 5–7% | > 7% |
| Amortization / balloon | 30yr with no balloon OR ≥ 5yr balloon | 3–5yr balloon | < 3yr balloon |
| Monthly payment vs market rent | ≤ 75% | 75–90% | > 90% |

### Novation rubric

| Metric | GREEN | YELLOW | RED |
|---|---|---|---|
| Retail list price vs ARV | ≤ 95% | 95–100% | > 100% |
| Projected marketing days | ≤ 30 | 30–60 | > 60 |
| Seller cooperation (listing, showings) | Willing | Reluctant | Hostile |
| Entry fee | ≤ $15k | $15k–$30k | > $30k |

### Hybrid / Morby stack rubric

Too deal-specific to rubric fully. **Always YELLOW → escalate to Brooke.** The Dispo VA pulls comps and runs universal checks, then hands off.

### Lease option / wrap mortgage rubric

Same — always YELLOW → Brooke.

## Step-by-step underwriting procedure

### Step 1 — Pull comps (30 minutes max)
1. Open PropStream (or Batch).
2. Enter the property address.
3. Filter: sold in last 6 months, within 1 mile, same property type, ±20% sqft, ±1 bed.
4. Pull the top 5 comps.
5. Eliminate outliers (foreclosure, REO, off-market flips with weird numbers).
6. Save the comp list as a PDF to `/04 — Comps/` in the deal folder.
7. Average the comps → this is our **independent ARV estimate**.
8. Compare to partner's ARV estimate. If the partner's ARV is within ±5%, we accept theirs. If it's higher by more than 5%, we use ours (more conservative).

### Step 2 — Enter numbers into the underwriter sheet
1. Open **Google Sheet: "DispoBuddy Underwriter v1"** (link in team vault).
2. Create a new tab named `YYYY-MM-DD — [City ST] — [street]`.
3. Paste from the submission:
   - Partner name, contact
   - Deal type
   - Contract price
   - Asking price
   - Partner's ARV
   - Your independent ARV
   - Repair estimate
   - (sub-to / SF only) mortgage balance, rate, payment, balloon
4. The sheet calculates every rubric metric automatically and returns GREEN / YELLOW / RED.

### Step 3 — Apply the rubric
1. Work down the rubric for the deal type. Every metric gets a color.
2. **All green** → the deal is green. You can recommend **Accept**.
3. **Any yellow** → the deal is yellow. Write a 3-sentence memo explaining what's yellow and why, then escalate.
4. **Any red** → the deal is red. Draft a decline per [SOP 11](./11-dead-deal-rejection.md).

### Step 4 — Sanity-check against buyer demand
1. Open `/buyers-map` on the live site OR query GHL for buyers matching `TARGET_STATES = [deal state]` AND `DEAL_STRUCTURES = [deal type]`.
2. How many buyers match? If < 3, **yellow** regardless of financial rubric — we can't move a deal to a thin buyer pool.
3. Document the matched buyer count in the underwriter sheet.

### Step 5 — Write the decision memo
In the GHL opportunity note log, paste:
```
UW MEMO — [YYYY-MM-DD]

Deal: [deal type] at [address]
Partner: [name]

RUBRIC:
- [Deal type] — [GREEN/YELLOW/RED]
- Spread %: [X%] ([color])
- ARV cushion %: [X%] ([color])
- Fee-to-ARV: [X%] ([color])
- Comp count: [N] ([color])
- Days to COE: [N] ([color])
- Buyer match count: [N] ([color])

ARV: $[X] (partner said $[Y], delta $[Z])
Independent comps: [link to /04 — Comps/ folder]

RECOMMENDATION: [ACCEPT / ESCALATE / DECLINE]
REASON: [one sentence]
```

### Step 6 — Hand off for final call
- **GREEN deal:** Dispo VA can flip stage to **Accepted — Package** directly (once trained and approved by Brooke) OR escalate to Brooke for sign-off until that approval is in place.
- **YELLOW deal:** Always Brooke. Ping her in the daily ops thread with the memo link.
- **RED deal:** Dispo VA drafts the decline per [SOP 11](./11-dead-deal-rejection.md) and Brooke approves before sending (initially) OR sends directly (once trained).

## Templates & scripts

**Accept decision (for the opportunity note):**
```
UW DECISION: ACCEPT
Rubric passed all green. Moving to Accepted — Package. Next step: JV agreement via SOP 03.
```

**Escalate to Brooke:**
```
UW DECISION: ESCALATE
One or more yellows: [list]. Memo in notes above. Need your call by [deadline].
```

**Decline (draft for partner, requires Brooke OK):**
```
Hi [partner], I underwrote [address] and we're going to pass. Reason: [one-paragraph honest explanation tied to the rubric metric that failed]. What would change it: [what we'd need to see]. Send me your next one.
```

## SLAs / quality standards
- **Comp pulling** — 30 minutes or less per deal
- **Rubric evaluation** — 15 minutes or less once comps are in
- **Total underwriting** — under 24 hours from receipt in "Under Review"
- **Comp list quality** — always 3+ comps saved to Drive for every deal we review. No exceptions. No "I eyeballed it."
- **Decision memo** — written for every deal, in the opportunity notes

## Escalation / edge cases
- **Partner's ARV is > 15% above your comps** — this is a red flag (they may be hiding bad numbers). Escalate to Brooke; do not accept without a conversation.
- **Wildly creative structure** (anything not in the rubric) — always Brooke.
- **First deal from a partner and it's a yellow/red** — soften the decline; offer an intro call to coach them. The goal is to keep them in the funnel, not burn them on deal #1.
- **Deal in a compliance-sensitive state** (see [SOP 15](./15-compliance.md)) — always Brooke.
- **Partner is a VIP (5+ closed deals)** — even a red deal gets a phone call, not just an SMS decline.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md) (upstream)
- [03 — JV Agreement](./03-jv-agreement.md) (next step on accept)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md) (next step on decline)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (stage moves)
- [14 — Partner Communication](./14-partner-communication.md) (decision templates)

## Bottleneck this SOP addresses
**[B1 — Underwriting is single-threaded on the founder](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder)** — the whole reason this SOP exists.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version with deterministic rubrics | Claude (on behalf of Brooke) |
