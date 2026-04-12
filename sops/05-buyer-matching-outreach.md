# 05 — Buyer Matching & Outreach

## Purpose
This is the highest-leverage step in the business. A great deal with no matched buyers is worth zero. This SOP turns the ad-hoc "who do I know who might want this" habit into a deterministic query + cadenced outreach that a VA can run on autopilot.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Informed:** Brooke (daily digest of new outreach + replies)

## Trigger
Opportunity moved to **Marketing** after the deal sheet is published per [SOP 04](./04-deal-packaging.md).

## Inputs required
- Published deal sheet PDF + Drive shareable link
- Deal metadata: state, city, deal type, contract price, asking price, ARV, property type, asset class
- GHL access (buyer smart lists)

## Tools & systems used
- GHL → Contacts, Smart Lists, Workflows, SMS/Email templates
- Google Drive (deal sheet link)
- Optional: Airtable or Notion for an outreach tracking board

## The matching query

For every deal, build a buyer list using these filters (pulled from the custom fields documented in [SOP 12](./12-ghl-crm-hygiene.md) and `netlify/functions/buyer-demand.js`):

| Filter | Value from deal |
|---|---|
| Contact Role | `buyer` OR `partner_and_buyer` |
| Target States contains | `[deal state]` |
| Target Cities contains | `[deal city]` OR empty (empty = state-wide) |
| Deal Structures contains | `[deal type]` |
| Property Type contains | `[deal property type]` |
| Max Price ≥ | `[asking price]` |
| Max Entry ≥ | `[buyer entry fee]` (sub-to / SF only) |
| Min ARV ≤ | `[our ARV]` |
| `do_not_contact` tag | NOT present |
| Active (last activity in 90 days) | true |

**Target:** 10+ matched buyers for a GREEN deal, 5+ for a YELLOW deal. Fewer than 5 matches → the deal goes on a watch list and Brooke decides whether to broadcast wider or to source new buyers in that market.

## Step-by-step procedure

### Step 1 — Build the matched list (10 min)
1. Open **GHL → Contacts → Smart Lists**.
2. If a saved list already exists for `(state × deal_structure)`, start there. Otherwise build it fresh using the filters above.
3. Save the list as `Deal Match — [City ST] — [Deal Type] — [YYYY-MM-DD]`.
4. Note the **match count**. Paste it into the opportunity's `Matched Buyer Count` custom field.

### Step 2 — Rank the buyers (5 min)
Within the matched list, rank buyers in this order:
1. `vip_partner` OR `repeat_partner` with closed deals > 2
2. Buyers who expressed interest in this city/state in the last 30 days (check recent notes)
3. Buyers whose `Max Price` and `Min ARV` are comfortably above our numbers (not at the edge)
4. Everyone else

The top 3 ranked buyers get a **direct SMS + personal message from Brooke** or a senior VA (not a blast). The rest get the standard outreach sequence.

### Step 3 — Send Day 0 outreach
**Top 3 — personal SMS (Brooke or VA, name-checked):**
Use the "Top 3 — personal touch" template below. Add one sentence of personalization ("I know you bought a 3/2 in Tempe last month, this one's similar but cleaner").

**The rest — automated blast via GHL workflow:**
1. Open the workflow **"Deal Blast — Standard"** in GHL.
2. Enter the smart list as the audience.
3. Populate merge tags:
   - Deal sheet link (Drive)
   - Asking price
   - City / ST
   - Deal type
4. Preview one message. Confirm merge tags resolved.
5. Start the workflow.

Each buyer receives:
- **SMS** at Day 0 (within 30 min of sheet publish)
- **Email** at Day 0 + 1 hour (deal sheet attached + inline)

### Step 4 — Log the outreach
Paste into the opportunity note log:
```
[YYYY-MM-DD HH:MM] [initials] — Outreach sent. Matched buyers: [N]. Top 3 personal: [names]. Standard blast to the remaining [N-3]. Workflow: Deal Blast — Standard. Next touch: Day 2.
```

### Step 5 — Follow-up cadence
| Day | Action | Audience |
|---|---|---|
| 0 | Initial SMS + email | All matched |
| 2 | "Still interested?" SMS | Non-responders only |
| 5 | "Final call — any interest?" SMS | Non-responders only |
| 7 | Move to stale; new broadcast to a second-tier list (buyers in neighboring states or slightly outside criteria) | if no offers |
| 14 | Price drop discussion with partner | if no offers |

**Never** send a fourth SMS without changing the message or the offer. That's how buyers unsubscribe us.

### Step 6 — Log replies and route them
Every reply:
1. Open the conversation in GHL.
2. **Interested:** tag the contact `interested_in_[opp_id]`, capture their specific question, reply within 1 hour with answers. Route details to [SOP 06](./06-offer-management-negotiation.md).
3. **Not interested:** reply with a polite "Got it, thanks for letting me know — I'll keep your buybox in mind." Log the reason (too expensive, wrong city, bad timing) in a note for SOP 10 buyer hygiene.
4. **Wants a showing:** coordinate per [SOP 07](./07-closing-title-coordination.md) access instructions. Do not send a showing request to the partner without confirming the partner is OK with it.
5. **Silent or unopened after Day 5:** no further action on this deal; leave the buyer alone. They'll see the next one.

### Step 7 — Daily digest to Brooke
End of each day in Marketing stage, send the daily ops ping:
```
[Deal address]
Day [N] in marketing
Sent: [initial send count] / Replies: [reply count] / Interested: [interested count] / Offers: [offer count]
Top activity: [bullet what happened today]
```

## Templates & scripts

### Top 3 — personal touch SMS
```
Hey [first_name] — got a [deal_type] deal in [city_state] you'd probably like. Asking $[asking_price]. [one-sentence personalization tied to their known buybox]. Full deal sheet: [drive_link]. Worth a look?
```

### Standard Day 0 SMS
```
{{contact.first_name}} — new [deal_type] deal in [city_state]. Asking $[asking_price] / ARV ~$[arv]. [one_line_hook]. Deal sheet: [drive_link]. Reply if you want more.
```

### Standard Day 0 email
Subject: `New [deal_type] — [city_state] — $[asking_price]`
```
Hi {{contact.first_name}},

Just pushed a new deal out in [city_state]. Quick highlights:

- [deal_type]
- Asking: $[asking_price]
- ARV: ~$[arv]
- Spread: [spread_explanation]
- [one_line_property_description]

Deal sheet attached. Reply to this email or text me back if you want to get in front of it.

— Dispo Buddy
[phone]
```

### Day 2 SMS (non-responders)
```
{{contact.first_name}} — quick follow up on the [city_state] deal. Still open, still moving. Any interest? [drive_link]
```

### Day 5 SMS (final call)
```
{{contact.first_name}} — last call on [address]. We're talking to other buyers this week and it'll likely move by [day]. If it fits, hit me back — if not, no worries, next one's coming.
```

### Reply — interested, wants more info
```
{{contact.first_name}} — awesome. What specific info do you need? I have [list what we have handy]. If you want to walk it, the access is [access]. Otherwise happy to hop on a call for 10 mins.
```

### Reply — not interested
```
Got it, {{contact.first_name}}. Appreciate the quick reply. I'll keep your buybox in mind for the next one.
```

### Reply — interested but price is high
```
{{contact.first_name}} — heard. Let me talk to the partner about wiggle room and I'll come back to you by [deadline]. Worst case: I'll keep you posted on any amendments.
```

*(For offer logistics, hand to [SOP 06](./06-offer-management-negotiation.md).)*

## SLAs / quality standards
- **Initial outreach within 30 minutes** of deal sheet publication
- **Match count ≥ 5** before blasting. If fewer than 5, escalate.
- **100% of replies acknowledged within 1 business hour**
- **Daily digest to Brooke** for every deal in Marketing
- **No buyer receives more than 3 SMS touches on the same deal**

## Escalation / edge cases
- **Fewer than 3 matched buyers** — escalate to Brooke. She may widen criteria or broadcast to a warm-but-not-matched list.
- **A buyer complains about frequency** — immediately reduce their outreach, add a `reduced_frequency` tag, never 3+ touches in a week.
- **A top-3 buyer ignores the personal message** — do not re-send personally. Let them flow into the standard cadence.
- **Two partners bring similar deals in the same week** — coordinate outreach so we don't double-send buyers; both partners' deals can still run, but use different buyer sub-lists if possible.
- **Unsubscribe / STOP during outreach** — respect immediately; do not argue; tag `do_not_contact`.

## Related SOPs
- [04 — Deal Packaging](./04-deal-packaging.md) (upstream)
- [06 — Offer Management & Negotiation](./06-offer-management-negotiation.md) (downstream)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md)
- [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md)
- [14 — Partner Communication](./14-partner-communication.md)

## Bottleneck this SOP addresses
**[B2 — Deal → buyer matching is manual and memory-based](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based)** — primary fix. Also supports [B3](./00-bottlenecks.md#b3--buybox-is-not-collected-consistently-across-asset-types) by forcing the matching query through the canonical custom fields.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
