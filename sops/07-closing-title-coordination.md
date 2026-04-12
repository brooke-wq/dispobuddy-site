# 07 — Closing & Title Coordination

## Purpose
Deals die at closing more often than they die at underwriting. This SOP is the zero-surprises checklist for getting a deal from "offer accepted" to "wire received, partner paid, Closed Won" — with title issues, partner silence, and buyer flakiness all handled.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Consulted:** Title company, partner, buyer
- **Informed:** Brooke (daily, until close)

## Trigger
Opportunity moved to **Under Contract (Buyer)** per [SOP 06](./06-offer-management-negotiation.md).

## Inputs required
- Fully-signed buyer assignment (from SOP 06)
- Original purchase contract (from partner)
- Title company choice (from the preferred list below or buyer's choice)
- JV agreement (for the split disbursement instructions)
- Wire instructions for Deal Pros LLC

## Tools & systems used
- Email (primary — title companies prefer email)
- Phone (secondary for urgent items)
- DocuSign (amendments, assignments)
- Google Drive → `/08 — Title & Closing/`
- GHL (notes, stage)

## Preferred title companies by state

> **Brooke to maintain this list.** Once an assignment-friendly title company proves reliable, add them here and stop hunting.

| State | Title company | Contact | Notes |
|---|---|---|---|
| AZ | *TBD* | *TBD* | |
| TX | *TBD* | *TBD* | |
| FL | *TBD* | *TBD* | |
| KY | *TBD* | *TBD* | |
| TN | *TBD* | *TBD* | |
| GA | *TBD* | *TBD* | |
| OH | *TBD* | *TBD* | |
| IN | *TBD* | *TBD* | |

**New state / no preferred closer:** use the buyer's chosen title, but vet them quickly — call first, confirm they close assignments, confirm they will cut a JV disbursement check directly, confirm turnaround time.

## Day-1-of-contract packet

Within **1 business day** of the buyer signing the assignment, send this packet to title (one email, everything attached):

1. **Original purchase contract** (partner ↔ seller)
2. **Assignment of contract** (us ↔ buyer)
3. **JV agreement** (us ↔ partner) — **not** for recording, just for title to understand the disbursement
4. **EMD receipt** from the buyer
5. **Deal Pros LLC entity docs** (articles of organization, EIN letter)
6. **Wire instructions for Deal Pros LLC** (for our share of the assignment fee at close)
7. **Partner's wire instructions or mailing address** (for their share)
8. **Close of escrow target date**
9. **Seller contact info**
10. **Buyer contact info**

## Disbursement instructions (stapled to the day-1 email)

```
JV DISBURSEMENT INSTRUCTIONS

Total assignment fee: $[gross]
Title/escrow fees charged against the assignment: $[fees]
Net assignment fee: $[gross - fees]

Split:
- 50% to Deal Pros LLC (Dispo Buddy) = $[half], wire per attached instructions
- 50% to [partner_entity_or_name] = $[half], wire per attached instructions OR check mailed to [address]

Please confirm receipt and provide the settlement statement no later than 24 hours before close for both parties to review.
```

## Step-by-step procedure

### Step 1 — Open title (Day 1)
1. Pick the title company (preferred list OR buyer's choice if vetted).
2. Send the day-1 packet email (structure above).
3. In GHL, add a custom field `Title Company` with the company name and the closer's name.
4. Add a note:
   ```
   [YYYY-MM-DD HH:MM] [initials] — Title opened at [company], closer [name]. Day-1 packet sent. Target COE [date].
   ```

### Step 2 — Confirm title acceptance (Day 1-2)
1. Expect title to reply within 24 hours confirming receipt. If not, **call them**.
2. Confirm they will: (a) honor the assignment, (b) cut the JV disbursement check directly at close, (c) not require additional docs from the partner we haven't anticipated.
3. If they refuse any of these → escalate to Brooke; may need to change title company.

### Step 3 — Preliminary title check (Day 3-7)
1. Ask title to run a preliminary title search.
2. Review the prelim when it arrives. Look for:
   - Liens (mortgages, tax liens, HOA liens, mechanic's liens)
   - Cloudy title (probate, divorce decrees, heir issues)
   - Easements that might affect value
   - Existing judgments against the seller
3. Clean prelim → proceed.
4. Any issues → tag the note log with `title_issue`, call Brooke, brief the partner.

### Step 4 — Inspection period (contract-dependent)
1. If the buyer has an inspection window, confirm they schedule within 48 hours.
2. Coordinate showings with the partner (or directly with the seller if that's how the contract is set up).
3. Monitor for inspection repair requests or cancellation.
4. Day after inspection, get a status update from the buyer: proceed, request repairs, walk away.

### Step 5 — EMD confirmation (Day 2-5)
1. Confirm EMD is deposited at title. Get a receipt.
2. File the receipt in `/08 — Title & Closing/`.
3. If EMD does not arrive within 72 hours of signing → **escalate to Brooke.** This is a major flake signal.

### Step 6 — Weekly check-in with title
Every Monday while the deal is open:
1. Email title: "Quick status on [address]? Anything blocking us from closing on [COE]?"
2. Log the response in the opportunity note.
3. Update the partner with the same info (text or email).

### Step 7 — Final week
Starting **7 days before COE**:
1. Confirm title has everything they need (funds from buyer, signed seller docs, payoff statement on any existing mortgage).
2. Confirm the buyer is on track for cash-to-close.
3. Confirm the settlement statement / CD arrives **24 hours before close** for both parties to review.
4. Review the settlement statement:
   - Our assignment fee line item is present
   - Our wire instructions are correct
   - Partner's disbursement is correct
   - No surprise charges against us
5. Any issue on the settlement statement → immediate call to title to fix BEFORE signing.

### Step 8 — Close day
1. Confirm all parties signed.
2. Confirm funds disbursed by title.
3. Confirm our wire hit Deal Pros LLC's account.
4. Confirm the partner's wire or check was sent.
5. Update GHL: opportunity → **Closed Won**. Set `Closed At` date and `Final Assignment Fee`.
6. Tag contact with `closed_deal_[YYYY]`, `last_closed_[YYYY-MM]`.
7. Send partner the payout notification SMS from [SOP 14](./14-partner-communication.md):
   ```
   {{contact.first_name}} — {{custom_values.property_address}} closed! 🎉 Your 50/50 share is $[payout]. Title is wiring today. You should see it in 1–3 business days. Next deal?
   ```
8. Send the winning buyer a quick "thanks, looking forward to the next one" message.
9. File the final HUD / settlement statement in `/08 — Title & Closing/`.
10. Trigger [SOP 18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md).

## Templates & scripts

### Day-1 email to title
Subject: `Dispo Buddy — New Assignment — [City ST] — [Street] — COE [date]`
```
Hi [closer_name],

New assignment coming your way. Summary:

- Property: [address]
- Seller: [seller_name_entity]
- Partner-to-DispoBuddy contract: attached
- DispoBuddy-to-Buyer assignment: attached
- JV Agreement between DispoBuddy and [partner]: attached (for disbursement reference only)
- Target COE: [date]
- EMD: $[amount] — buyer is wiring by [date]

At close, please cut the net assignment fee 50/50 per the attached disbursement instructions:
- 50% to Deal Pros LLC (Dispo Buddy) — wire instructions attached
- 50% to [partner_name_or_entity] — wire instructions / mailing address attached

Please confirm receipt and let me know if anything is missing. We'd love to hit COE on [date].

Thanks,
[name]
Dispo Buddy • (480) 842-5332
```

### Weekly check-in
```
Hi [closer_name] — quick status on [address]? Anything blocking us from closing on [COE]? Happy to chase down whatever's open.

Thanks!
```

### Urgent title issue to partner
```
[partner_first_name] — title kicked back an issue on [address]: [one-sentence summary]. Calling you in 10 minutes to talk through it. Pick up.
```

### Settlement statement review request
```
Hi [closer_name] — can you send the settlement statement as soon as it's ready? Brooke will review our side within 2 hours of receipt so we're not holding up close day.
```

## SLAs / quality standards
- **Day-1 packet sent within 1 business day** of buyer signing
- **Weekly title check-in** every Monday until close
- **Settlement statement reviewed** within 2 hours of receipt
- **Our wire received AND partner wire confirmed** before marking Closed Won
- **Deal folder complete** — contract, assignment, JV, EMD receipt, settlement statement, wire confirmation, executed HUD all filed in `/08 — Title & Closing/` within 48 hours of close

## Escalation / edge cases
- **Title refuses to honor the assignment** → change title companies same day; escalate to Brooke.
- **Title refuses to cut a JV disbursement** → still closeable; we receive the full fee then ACH the partner their half per the JV agreement. Brooke authorizes this fallback.
- **Partner wants to re-trade on the fee at close** → absolute no; the JV agreement locks it. Brooke handles the pushback.
- **Buyer tries to extend COE past the contract deadline** → check the original purchase contract for extension rights; if the seller won't extend, the deal is at risk. Brooke + partner decide.
- **Seller backs out day-of-close** → collect EMD refund; mark opportunity as `Dead — Seller Backed Out`; brief the buyer and offer them the next similar deal.
- **Title company goes silent for > 48 hours** → escalate; second email + phone call; if still silent, consider whether to swap title companies (Brooke decides).
- **Partner is unreachable at close day** → we can close without them in most cases (they're not on title); just make sure their disbursement is wired per the JV agreement.
- **Mortgage payoff comes in higher than expected** (common on sub-to conversions) → re-run the math; if it eats too much of the spread, talk to partner immediately.

## Related SOPs
- [06 — Offer Management & Negotiation](./06-offer-management-negotiation.md) (upstream)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md) (for fall-throughs)
- [14 — Partner Communication](./14-partner-communication.md) (templates)
- [15 — Compliance](./15-compliance.md) (EMD handling)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md) (downstream)

## Bottleneck this SOP addresses
**[B7 — Title coordination is ad-hoc per market](./00-bottlenecks.md#b7--title-coordination-is-ad-hoc-per-market)** — primary fix. The preferred-title list + day-1 packet is the whole solution.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
