# 14 — Partner Communication

## Purpose
Our public promise is "no ghosting" and "24–48 hour review." Partners need to feel a human on the other end of every message. This SOP defines the tone, channels, SLAs, TCPA compliance, and ready-to-paste templates for every routine partner interaction.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA (day-to-day), Brooke (partner escalations)
- **Informed:** Admin VA (for billing/payout questions)

## Trigger
Any inbound partner message (SMS, email, form submission, phone call) OR any scheduled outbound partner touch.

## Inputs required
- GHL Conversations access
- Partner's contact record (so you know their tier, first-deal status, and any prior notes)
- Template library (below)

## Tools & systems used
- GHL → Conversations (primary)
- GHL → Email / SMS templates
- Personal phone (Brooke only, for VIPs)

## Response SLAs

| Channel | Business hours (Mon–Fri, 8a–6p local AZ) | After hours / weekends |
|---|---|---|
| SMS inbound | < 2 hours | first response by 9 AM next business day |
| Email inbound | < 24 hours | first response by 10 AM next business day |
| Phone voicemail | < 4 hours (SMS or callback) | first response by 10 AM next business day |
| Form submission | automated confirmation immediately; human follow-up within 24 hours |
| Decision on a submitted deal | within 48 hours from submission |

**If a response will be delayed**, send a holding message. **Do not go silent.** Ever.

## Tone & voice guide

DispoBuddy writes like a plain-spoken real estate pro who respects the partner's time. Copy the voice from the website:

- **Short sentences.** No fluff, no corporate speak, no emoji spam.
- **Confident, not cocky.** We know what we're doing and we say so, but we don't dunk on anyone.
- **Specific over vague.** "Spread is 12%, we'd need to see 18% for this market to move" beats "numbers are a little tight."
- **Honest.** Declines are honest. "This won't move because X" is always better than "we'll keep you posted."
- **Lowercase "dispo", "wholesaler", "buyer"** in conversational text. Proper nouns for brand names only.

Banned phrases:
- "Touching base" (we're not a 1998 sales training video)
- "Circle back"
- "Per my last email"
- "As discussed" without saying what was discussed
- Any apology longer than one sentence

## TCPA + consent rules

1. **Every form we accept contains an explicit consent checkbox.** See `submit-deal.html` and `join.html` — the consent language is:
   > "I agree to receive SMS and email communications from Dispo Buddy regarding my partner application and deal opportunities. Message & data rates may apply. Reply STOP to opt out."
2. **Never text a contact who didn't consent.** If a contact came from a referral or list, you must get consent on a recorded call or via a double opt-in link before the first SMS.
3. **STOP handling** — GHL handles this automatically at the platform level. If a contact texts STOP, they are flagged `do_not_contact` and removed from all automations. Do NOT text them again even if Brooke asks — route the request through Brooke and she'll re-consent them manually on a call.
4. **Quiet hours** — no outbound SMS before 8 AM or after 9 PM in the recipient's local time zone.
5. **Record every consent event** in the contact's activity log.
6. See [SOP 15](./15-compliance.md) for the full compliance picture.

## Canonical templates

All templates use merge tags. Paste into GHL templates library once, reuse forever.

### SMS — Deal received confirmation
*(automated by `dispo-buddy-submit.js`, do not duplicate manually)*
```
{{contact.first_name}}, we got your deal at {{custom_values.property_address}}. You'll hear from us in 24–48 hours with a yes, no, or what we need. — Dispo Buddy
```

### SMS — First-deal welcome
*(automated for `first_deal = yes`)*
```
Welcome to the Dispo Buddy network, {{contact.first_name}}! Since this is your first deal with us, here's what to expect:

1. We review your deal within 24–48 hrs
2. If accepted, we send a simple JV agreement
3. We handle packaging, marketing & buyer outreach
4. 50/50 split paid at close through title

Questions? Text us anytime.
```

### SMS — Needs info (missing photos)
```
{{contact.first_name}} — loving the spread on {{custom_values.property_address}} but we need photos before we can move on this. A quick phone-quality Drive or Dropbox link works. Can you send by EOD?
```

### SMS — Needs info (missing comps / ARV backup)
```
{{contact.first_name}} — good deal structure on {{custom_values.property_address}}, but we need your comp data to verify the ARV. Send 3 recent comps (sold in last 6 months) and we'll close out review today.
```

### SMS — Needs info (missing mortgage info for sub-to / SF)
```
{{contact.first_name}} — for {{custom_values.property_address}} we need the existing mortgage info to underwrite the sub-to. Need: balance, rate, monthly payment, lender. Can be approximate if you don't have the statement handy.
```

### SMS — Accepted, JV agreement incoming
```
{{contact.first_name}} — deal accepted. Spread works, fee is reasonable, we have buyers for this one. JV agreement is coming to your email from DocuSign in the next hour. Sign it and we start marketing immediately.
```

### SMS — Declined (honest reason template)
```
{{contact.first_name}} — tough call, but we're going to pass on {{custom_values.property_address}}. Reason: {{decline_reason}}. If {{what_would_change_it}} we'd take another look. Keep the deals coming.
```

### SMS — Deal gone to marketing
```
{{contact.first_name}} — just pushed {{custom_values.property_address}} out to matched buyers in our network. You'll hear from me when offers come in. ETA first offer: 48–72 hrs.
```

### SMS — Offer received, need partner review
```
{{contact.first_name}} — got an offer on {{custom_values.property_address}}. {{buyer_type}} buyer at ${{offer_amount}}, {{close_terms}}. My take: {{recommendation}}. Can you get back to me by {{deadline}}?
```

### SMS — Going to close / title opened
```
{{contact.first_name}} — {{custom_values.property_address}} is opening at {{title_company}} today. COE {{coe_date}}. You'll get updates from title directly plus a ping from me at each milestone.
```

### SMS — Payout notification
```
{{contact.first_name}} — {{custom_values.property_address}} closed! 🎉 Your 50/50 share is ${{payout_amount}}. Title is wiring today. You should see it in 1–3 business days. Next deal?
```

### Email — Partner confirmation (longer form, first deal)
Subject: `Deal Received — Dispo Buddy`
```
Hi {{contact.first_name}},

We just received your deal at {{custom_values.property_address}}.

Here's what happens next:

1. **Review (24–48 hrs)** — Our underwriting team looks at comps, spread, and marketability.
2. **Decision** — You'll get a yes, a no, or a "we need X to move forward" — never silence.
3. **If yes** — We send a simple, non-exclusive JV agreement via DocuSign. You sign, we start marketing.
4. **Marketing** — We package the deal and push it to matched buyers in our network.
5. **Close** — 50/50 split through title at close. No invoicing, no chasing.

In the meantime, if anything changes on the deal (price, timing, seller) just reply to this email or text {{internal_alert_phone}}.

— The Dispo Buddy team
```

### Email — Decline with feedback (longer form)
Subject: `{{custom_values.property_address}} — a pass (and why)`
```
{{contact.first_name}},

Thanks for sending {{custom_values.property_address}} over. We looked at it seriously but we're going to pass. Here's why:

{{decline_reason_paragraph}}

What would make us look at this again:
- {{change_1}}
- {{change_2}}
- {{change_3}}

This is not a "we're too busy" pass — we genuinely underwrote it. If you can adjust the numbers or the structure, send it back anytime.

And keep the deals coming — one pass doesn't mean anything about the next one.

— Dispo Buddy
```

### Email — JV agreement intro
Subject: `JV Agreement — {{custom_values.property_address}}`
```
{{contact.first_name}},

Deal accepted. JV agreement is attached (or incoming from DocuSign). The terms:

- **Split:** 50/50 of net assignment fee at close
- **Non-exclusive:** you can still market the deal yourself
- **Term:** 90 days from signature (auto-terminates if not closed)
- **Fee:** Actual assignment fee, minus title / escrow costs, split 50/50 at close through title

Sign when you get a chance. As soon as it's signed, we start buyer outreach.

— Brooke
```

## Step-by-step inbound triage procedure

For every new inbound message the Dispo VA sees:

1. **Open the conversation in GHL.** Read the whole thread, not just the latest message.
2. **Classify the message:**
   - Deal question → route based on deal's current stage, use templates above
   - Payment question → route to Admin VA ([SOP 18](./18-financial-payout-reconciliation.md))
   - New deal idea (not yet submitted) → send `/submit-deal` link + offer help
   - Complaint / grievance → **escalate to Brooke immediately**
   - Off-topic / spam → mark as read, do not reply
3. **Pull the contact record** to check role tag, VIP status, and recent deal history. Adjust tone accordingly.
4. **Compose reply** using the closest template. Edit merge tags if GHL didn't fill them.
5. **Send and log** — GHL auto-logs the send. Add an internal note if the message required judgment.
6. **If you cannot answer with 95% confidence** → respond with a holding message and tag Brooke:
   ```
   {{contact.first_name}} — pulling Brooke in on this one so you get the right answer. She'll respond within {{N}} hours.
   ```

## SLAs / quality standards
- **First response times** above
- **Holding messages** — any delay > SLA gets a holding message, never silence
- **Tone match** — no slang, no emoji, no fluff, no banned phrases
- **Template compliance** — if a template exists for the situation, use it (you may edit for context, but don't invent a new voice)
- **Internal notes** — every judgment call gets a note

## Escalation / edge cases
- **Partner complains** (about payout, timing, communication, agreement terms) → Brooke, same day, always
- **Legal threat or attorney letter** → Brooke AND [SOP 15 — Compliance](./15-compliance.md) immediately. Do not reply yourself.
- **Angry partner at 11 PM** — reply with a calming holding message; do not try to resolve at 11 PM; ping Brooke first thing next morning
- **Partner asks for exclusivity** → remind them we're non-exclusive by design (see process page); if they push, route to Brooke
- **Partner asks to renegotiate the 50/50 split** → Brooke only. Never commit to different terms on behalf of her.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md)
- [08 — Partner Onboarding](./08-partner-onboarding.md)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md)
- [15 — Compliance](./15-compliance.md)

## Bottleneck this SOP addresses
[B4 — Partner onboarding has no education layer](./00-bottlenecks.md#b4--partner-onboarding-has-no-education-layer) and [B10 — Founder single-point-of-failure](./00-bottlenecks.md#b10--founder-single-point-of-failure) (the template library is how a VA replaces Brooke for routine messages)

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
