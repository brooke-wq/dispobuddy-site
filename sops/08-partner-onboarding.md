# 08 — Partner Onboarding

## Purpose
A new partner's first 7 days determine whether they become a repeat submitter. Today, most first-time partners submit a poor-quality deal, get a decline, and vanish. This SOP fixes that by front-loading education — so by the time they submit their first deal, they already know what "good" looks like.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA (drip execution, intro call scheduling)
- **Consulted:** Brooke (for intro calls with high-potential partners)

## Trigger
A new partner submits the `/join` form. `netlify/functions/partner-onboard.js` fires and:
1. Upserts a GHL contact
2. Applies partner role tag + partner type tag (wholesaler / bird dog / agent / investor)
3. Sends automated welcome SMS + email
4. Fires internal alert to Brooke

**The Dispo VA then runs the 7-day drip below.**

## Inputs required
- Internal alert (confirms something happened)
- GHL access
- Welcome pack assets (see "Welcome pack contents" below)

## Tools & systems used
- GHL → Contacts, Workflows, Templates, Conversations
- Calendly (or similar) for intro call booking
- Google Drive → shared welcome pack folder
- Loom (video library)

## The 7-day welcome drip

This is the single biggest lever on repeat submissions. Every new partner goes through it unless they opt out.

| Day | Channel | Content | Goal |
|---|---|---|---|
| 0 | SMS + Email | Welcome, what DispoBuddy does, link to `/process` | Set expectations |
| 1 | Email | "How to submit a great deal" guide (PDF or blog post) | Teach the rubric before they submit |
| 2 | Email | Sample deal sheet PDF | Show them our quality bar |
| 3 | Email | Buybox explainer — what our buyers want | Help them source better |
| 5 | SMS | "Want a 15-min intro call with Brooke?" + Calendly link | Build the human relationship |
| 7 | SMS | "Got a deal yet? Here's the 5-min submit form" | First-deal nudge |
| 14 | Email | If still no submission, "What's blocking you?" | Re-engage |
| 30 | Email | If still no submission, pause the drip; move to monthly newsletter | Graceful exit |

## Welcome pack contents

Stored in Google Drive → `/DispoBuddy/Partner Welcome Pack/` (shared link goes out in every Day 1 email).

1. **Welcome letter** (1 page) — who we are, why we exist, what we promise
2. **How to submit a great deal** (2 pages) — the 7 required items, with examples of good vs bad submissions
3. **Deal type playbook** (4 pages) — 1 page each on cash, sub-to, SF, novation, explaining when each makes sense
4. **Sample deal sheet** (1 page PDF) — our production quality
5. **Buybox explainer** (1 page) — "what our buyers want right now"
6. **FAQ** (2 pages) — mirrors `/faq` on the site
7. **Loom video library links** — 2-minute videos per deal type

## Step-by-step procedure

### Step 1 — On new partner signup
Within 2 hours of the internal alert:

1. Open the new contact in GHL.
2. Confirm the automated welcome SMS and email fired. If not, send manually from the template library.
3. Review the partner's self-reported info from the `/join` form:
   - Role (wholesaler / bird dog / agent / investor)
   - Primary markets
   - Deal types they work with
   - Monthly deal volume
   - "Got a deal ready now?"
4. Tag the contact:
   - `partner`
   - Role-specific: `partner_wholesaler` / `partner_bird_dog` / `partner_agent` / `partner_investor`
   - Volume-specific: `partner_low_volume` (1-3/mo) / `mid_volume` (4-10) / `high_volume` (11+)
   - `source_[source]` from the form
5. **If they said "Got a deal ready now? = Yes"**:
   - Tag `hot_prospect`
   - Schedule an intro call within 48 hours (Brooke for high-volume, VA for low-volume)
   - Send the Day 5 SMS *immediately* — don't wait 5 days. They're ready, meet them there.

### Step 2 — Enroll in the drip workflow
1. Open the GHL workflow **"Partner Welcome Drip"**.
2. Add the new contact to the workflow (unless they're a `hot_prospect` — they're on a faster track).
3. Confirm the workflow is running.

### Step 3 — Monitor and personalize
Throughout the 7 days:

1. Watch their GHL activity log.
2. If they open the Day 1 guide and click through → all good, continue.
3. If they ignore Day 1 → send a personal SMS Day 3 asking if they have questions.
4. If they reply at any point → hand to [SOP 14](./14-partner-communication.md) for response.
5. If they book an intro call → Brooke or VA runs the call per the intro call script below.

### Step 4 — Intro call (15 minutes)
The script:

1. **Welcome** (1 min) — "Thanks for booking. Goal today: make sure you know how we work and get you set up to send your first deal."
2. **Their context** (3 min) — "Tell me about your business. What are you working on now? Any deals in your pipeline?"
3. **Our process** (3 min) — Walk through the 6 steps from `/process`. Emphasize 24-48hr, 50/50, non-exclusive.
4. **What we look for** (3 min) — "Here's how we underwrite. The non-negotiables are [list]. Here's what gets declined fast [list]."
5. **First deal coaching** (3 min) — "When you submit, send [list]. The difference between a 24-hour yes and a back-and-forth decline is whether you have [items]."
6. **Wrap** (2 min) — "Any questions? Great. Go submit something. Text me directly if you hit a snag."

**Log the call** in GHL with notes on what they're working on, their markets, and any commitments you made.

### Step 5 — First deal celebration
When the partner submits their first deal:
1. The automated first-deal welcome SMS fires (hardcoded in `dispo-buddy-submit.js`).
2. Add a personal note in the opportunity: "First deal for this partner — extra care on the review, extra patience on the feedback."
3. Route to [SOP 01](./01-deal-intake-triage.md).
4. After the decision (accept or decline), send a personal note of encouragement regardless of outcome.

### Step 6 — Graduation to repeat partner
After 2 closed deals with a partner:
1. Tag `repeat_partner`.
2. Send a "thank you for the repeat business" SMS with a VIP referral code (if applicable).
3. Offer to save their info for faster future submissions (we already do automatically — just remind them).

After 5 closed deals:
1. Tag `vip_partner`.
2. They get the top-3 personal outreach treatment on every deal submission (Brooke's direct line).

## Templates & scripts

### Day 0 welcome SMS (automated)
```
Welcome to Dispo Buddy, {{contact.first_name}}! You're now in our partner network. Over the next week I'll send you a few short resources on how to submit deals we can actually move. First one comes tomorrow. — Brooke
```

### Day 0 welcome email (automated)
Subject: `Welcome to Dispo Buddy`
```
Hi {{contact.first_name}},

You just joined the Dispo Buddy network — thanks for reaching out. Quick orientation:

**What we do:** We're your JV dispo partner. You find deals, we move them, we split 50/50 at close.

**What you do next:**
- Read our process: [link to /process]
- Check out what we look for: [link to /what-we-look-for]
- When you have a deal ready, submit it here: [link to /submit-deal]

Over the next week I'll send you 3 short resources so your first deal lands strong:

- Day 1: "How to submit a great deal"
- Day 2: Sample deal sheet (so you see what we produce)
- Day 3: What our buyers want right now

If you have a deal ready **right now**, skip ahead and [submit it] — I'll personally review it.

— Brooke
Dispo Buddy • (480) 842-5332
```

### Day 1 email
Subject: `How to submit a great deal (5-min read)`
```
Hi {{contact.first_name}},

Here's the difference between a 24-hour YES and a 3-day back-and-forth:

**You send us this (and the deal moves):**
1. Clear property address (full street, city, state, ZIP)
2. Contract price AND asking price
3. Your ARV estimate + 3 comps
4. Phone-quality photos (interior + exterior, 6+)
5. Deal type (cash, sub-to, SF, etc.)
6. Timeline (COE date, contract expiration)
7. Existing mortgage info (if creative finance)

**You don't send us this (and the deal sits):**
- Vague "house in Phoenix, good spread"
- "I'll get photos later"
- No comps / no ARV backup
- Padded numbers

Full how-to-submit guide: [Drive link to guide PDF]

Ready? [Submit a deal link]

— Brooke
```

### Day 2 email
Subject: `What our deal sheets look like`
```
Hi {{contact.first_name}},

Here's a sample of what we produce when you send us a good deal: [Drive link to sample deal sheet PDF]

This is what goes out to our buyer network. Professional, specific, defensible. This is why deals move.

When you submit a deal, we build this within 4 hours of signing the JV agreement. You focus on the next deal.

— Brooke
```

### Day 3 email
Subject: `What our buyers want right now`
```
Hi {{contact.first_name}},

Quick buyer update — here's what our active buyer network is asking for this month:

- **AZ, TX, FL** — cash SFR, $150k–$350k, 15%+ spread
- **TN, GA, KY** — sub-to and sub-to/hybrid, low-rate assumption
- **OH, IN** — small multi (2-4 unit) buy-and-hold, min 7% cap
- **All states** — motivated sellers with 30-45 day COE, no probate drama

If you're sourcing in those lanes, you're in our sweet spot.

Live buyer map: [link to /buyers-map]

— Brooke
```

### Day 5 SMS (intro call offer)
```
{{contact.first_name}} — want to hop on a 15-min call? I can walk you through what we look for in your specific markets and answer any questions. Book here: [Calendly link]
```

### Day 7 SMS (first deal nudge)
```
{{contact.first_name}} — ready to send your first deal? Takes 5 min. [Submit link]. If you want me to review before you submit, just text me the details and I'll take a look.
```

### Day 14 email (no submission yet)
Subject: `Checking in — any deals brewing?`
```
{{contact.first_name}},

Just checking in — nothing yet in the queue from you. What's blocking you? If there's a deal you're on the fence about, text me the numbers and I'll give you a gut-check before you submit.

— Brooke
```

### Day 30 email (graceful exit)
Subject: `Pausing our welcome series`
```
{{contact.first_name}},

Haven't heard from you in 30 days so I'm going to pause the welcome series. You're still in our network — when a deal comes up, just submit it at dispobuddy.com. We'll be here.

Monthly newsletter starts next month if you want market updates.

— Brooke
```

## SLAs / quality standards
- **100% of new partners enrolled** in the welcome drip within 2 hours of signup
- **Hot prospects booked for intro call within 48 hours**
- **Personal response to every reply** within 2 business hours
- **Tagging complete** within the first hour of signup
- **No unsubscribes or complaints** from the drip cadence (if we get even one, review the copy)

## Escalation / edge cases
- **Partner is a complete beginner** (no licensed activity, no past deals) → Brooke intro call; may need extra coaching or may not be a fit.
- **Partner has 10+ deals under contract right now** — VIP fast-track; Brooke runs the call personally; set up direct Slack/SMS channel.
- **Partner is also a licensed agent in a state with tight wholesaling rules** → Brooke + [SOP 15](./15-compliance.md) review before accepting any deal.
- **Partner pushes back on the 50/50 split** — we don't negotiate. Brooke replies with "here's why it's 50/50" pitch; if they still say no, they're not a fit.
- **Partner is hostile or rude during onboarding** — flag Brooke; we reserve the right to decline partners who can't work productively.
- **Partner wants to "become a buyer too"** — welcome! Route through [SOP 09](./09-buyer-network-intake.md) in parallel; tag `partner_and_buyer`.

## Related SOPs
- [09 — Buyer Network Intake](./09-buyer-network-intake.md) (if they also want to be a buyer)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (tagging conventions)
- [14 — Partner Communication](./14-partner-communication.md)
- [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md) (source attribution)

## Bottleneck this SOP addresses
**[B4 — Partner onboarding has no education layer](./00-bottlenecks.md#b4--partner-onboarding-has-no-education-layer)** — primary fix.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version with 7-day drip + intro call script | Claude (on behalf of Brooke) |
