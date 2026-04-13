# 06 — Offer Management & Negotiation

## Purpose
Offers are the moment of truth. Buyers discover deals through **Terms For Sale** (deals.termsforsale.com) and submit inquiries, walkthrough requests, and offers there or via direct reply to our outreach. This SOP defines how we log them, present them to the partner, negotiate within authority limits, and pick a winner — without letting a deal stall or a buyer feel ghosted.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (logging, routing, standard negotiation):** Dispo VA
- **Responsible (final acceptance / reject / counter):** Brooke + Partner (joint decision)

## Trigger
A buyer replies to outreach with an offer, OR a buyer submits an inquiry/offer through Terms For Sale, OR a buyer initiates a conversation about terms via SMS/email/phone.

## Inputs required
- Deal sheet + deal folder
- Underwriting memo (our walk-away floor)
- Partner's communicated priorities (price vs speed vs certainty)
- JV agreement (to confirm we have authority to negotiate)

## Tools & systems used
- GHL (opportunity + contact notes)
- Deal folder `/07 — Offers/`
- Phone / SMS / email to partner

## Step-by-step procedure

### Step 1 — Log every offer immediately
Within **15 minutes** of an offer landing:

1. Open the GHL opportunity.
2. Add a new note in the log:
   ```
   [YYYY-MM-DD HH:MM] OFFER RECEIVED
   Buyer: [name] (GHL contact id [id])
   Offer: $[amount]
   Deposit: $[emd]
   Close date: [date]
   Contingencies: [list]
   As-is / inspection window: [days]
   Funding: [cash / subject-to / SF / wholesale assignment]
   Notes: [anything the buyer said that matters]
   ```
3. Save the buyer's written offer (if any) to `/07 — Offers/[buyer]-[date].pdf`.
4. Add an `offer_received` tag to the opportunity.
5. Tag the buyer contact with `offered_on_[opportunity_id]`.

### Step 2 — Present the offer to the partner
**Within 2 business hours** of logging the offer, send the partner the "Offer Received" SMS from [SOP 14](./14-partner-communication.md):

```
{{contact.first_name}} — got an offer on {{custom_values.property_address}}. {{buyer_type}} buyer at ${{offer_amount}}, {{close_terms}}. My take: {{recommendation}}. Can you get back to me by {{deadline}}?
```

**Recommendation logic** (what the "my take" line should say):
- Offer ≥ 95% of asking AND cash AND reasonable close date → **"recommend accept"**
- Offer 85–95% of asking OR terms slightly off → **"recommend counter at [X]"**
- Offer < 85% of asking → **"recommend reject unless you want to negotiate"**
- Any offer with weird contingencies (long inspection, financing, sale of buyer's home) → **"needs discussion — call me"**

### Step 3 — Capture the partner's response and authority
Record the partner's decision in the opportunity note log:
```
[YYYY-MM-DD HH:MM] PARTNER RESPONSE
Decision: [accept / counter / reject]
Counter terms (if applicable): $[amount], [other terms]
Floor (lowest the partner will go): $[amount] — confidential, do not share
Authority granted: [what Brooke can negotiate without re-confirming]
```

**Key:** always capture a **floor** so the VA can negotiate without waking the partner up on every round.

### Step 4 — Counter or accept

**If accepting:**
1. Reply to the buyer within 1 hour of partner sign-off. Use the "accept" template below.
2. Request the signed purchase agreement + assignment from the buyer. Give a 24-hour deadline.
3. Move the opportunity to **Offer Received** stage (if not already) and note the target buyer.
4. Notify losing buyers **only after** the winning buyer has signed and EMD is in escrow — not before.

**If countering:**
1. Reply to the buyer within 1 hour with the counter. Use the "counter" template.
2. Give a 24-hour response window on the counter.
3. Log the counter in the opportunity note.

**If rejecting:**
1. Reply to the buyer within 1 hour with the reject template (polite, honest, leave the door open).
2. Log the reject in the opportunity note.

### Step 5 — Handle multiple offers
When 2+ offers are active:

1. Order them by: (a) net to partner, then (b) closing speed, then (c) certainty (cash > financed).
2. Send the partner a **comparison summary**:
   ```
   OFFERS on [address] as of [timestamp]:
   
   1. [buyer name] — $[offer] / EMD $[emd] / COE [date] / [financing] / net to us $[net]
   2. [buyer name] — $[offer] / EMD $[emd] / COE [date] / [financing] / net to us $[net]
   3. [buyer name] — $[offer] / EMD $[emd] / COE [date] / [financing] / net to us $[net]
   
   My take: #[N] because [reason].
   Which one do you want to move on?
   ```
3. Never accept two offers on the same deal. As soon as the partner picks, send politely-phrased "moving with another buyer" messages to the others.

### Step 6 — Once an offer is accepted
1. Request the signed assignment agreement from the buyer (use Deal Pros LLC's standard form; Brooke has it).
2. Confirm EMD is headed to the title company.
3. Move opportunity to **Under Contract (Buyer)** stage.
4. Hand off to [SOP 07 — Closing & Title Coordination](./07-closing-title-coordination.md).
5. Tag the buyer contact: `closed_deal_[YYYY]`, `last_closed_deal_[YYYY-MM]`.
6. Notify losing buyers with the "moved with another buyer" template.
7. Add a note:
   ```
   [YYYY-MM-DD HH:MM] [initials] — Offer accepted. Buyer: [name]. Price: $[amount]. Signed assignment on file in /07 — Offers/. Moving to Under Contract (Buyer). Title company: [name].
   ```

## Templates & scripts

### Counter the buyer
```
{{contact.first_name}} — thanks for the offer. The partner countered at $[counter_price] [+ any other terms]. Everything else on your offer stays the same. Deadline on this counter is [date + 24hrs]. Hit me back when you've had a look.
```

### Accept the buyer
```
{{contact.first_name}} — you've got it. We're moving with your offer at $[price]. Next step: I'll send over the assignment + contract for signature today. Please wire EMD ($[emd]) to [title_company] within 48 hours of signing.
```

### Reject the buyer (low offer)
```
{{contact.first_name}} — appreciate the offer but the partner's not going to move at $[offer]. If you can get to $[counter_suggestion] we'd look at it again. Otherwise I'll keep you posted on future deals in your buybox.
```

### Reject the buyer (terms)
```
{{contact.first_name}} — the number works but the [contingency/close_date] doesn't fit the seller's timeline. If you can do [change] we're in business. Otherwise we'll pass this round.
```

### Moved with another buyer
```
{{contact.first_name}} — wanted to close the loop on [address]. We went with another offer this round. Appreciate you looking and I'll send you the next deal in [market] as soon as it's in the door.
```

### Partner follow-up (silent partner — 4 hour nudge)
```
[partner_first_name] — still waiting for your call on the offer at [address]. The buyer is asking for a response by [time]. Need your decision.
```

### Partner follow-up (silent partner — 12 hour, voice call)
Call directly. No more text reminders. Script:
```
"Hey [partner], it's [your name] from Dispo Buddy. We have a $[amount] offer on [address] sitting with you and the buyer's about to walk. I need a yes, no, or counter in the next 30 minutes. What do you want me to do?"
```

## SLAs / quality standards
- **Every offer logged within 15 minutes** of receipt
- **Every offer presented to the partner within 2 business hours** of logging
- **Every buyer reply sent within 1 hour** of partner sign-off
- **Every rejected buyer notified within 1 hour** of acceptance of the winner
- **Zero silent offers** — every offer gets a reply (accept, counter, or reject)
- **Zero double-accept events** — the one-winner-at-a-time rule is absolute

## Escalation / edge cases
- **Partner is unreachable > 12 hours and there's an offer pending** — call directly. If still unreachable, use the authority the partner gave you in the JV agreement (if explicit) OR tell the buyer "waiting on my partner, 24-hour delay expected."
- **Buyer tries to renegotiate after accepting** — Brooke only. Potential re-trade. Do not concede anything without her.
- **Buyer wants to re-assign our assignment** (double-dip) — allowed but disclose to partner, and make sure our assignment fee is locked in regardless.
- **Partner wants to back out after accepting an offer** — Brooke + possible [SOP 15](./15-compliance.md) issue. This is a breach risk.
- **Buyer threatens legal action** — [SOP 15](./15-compliance.md) immediately. No reply.
- **Partner asks for an offer update every hour** — politely set expectations: "I'll ping you when there's news; outside that you can assume nothing has changed."

## Related SOPs
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (upstream)
- [07 — Closing & Title Coordination](./07-closing-title-coordination.md) (downstream)
- [14 — Partner Communication](./14-partner-communication.md)
- [15 — Compliance](./15-compliance.md)

## Bottleneck this SOP addresses
Supports the [B2](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based) fix — a working matching pipeline is useless without a working offer management pipeline.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
