# Dispo Buddy — Cron Jobs (Droplet)

These scripts run on the Droplet (64.23.204.220) as cron jobs.

**AUDIT STATUS: ALL DISABLED except watchdog.**  
Do NOT enable until individually tested and verified.

## Dedup Module

`dedup.js` prevents duplicate notifications. Both `notify-buyers` and `deal-follow-up` must use it.

### Usage

```js
const dedup = require('./dedup');
const log = dedup.load(); // loads from ./sent-log.json

// Before sending a notification:
if (dedup.wasSent(log, 'notify-buyers', dealId, buyerId)) {
  console.log('Already notified, skipping');
  return;
}

// After successfully sending:
dedup.markSent(log, 'notify-buyers', dealId, buyerId);
dedup.save(null, log); // saves to ./sent-log.json

// Periodic cleanup (run at start of each cron execution):
const removed = dedup.cleanup(log); // removes entries older than 30 days
if (removed > 0) dedup.save(null, log);
```

### Dedup Keys

- **notify-buyers**: `(dealId, buyerContactId)` — one notification per deal per buyer
- **deal-follow-up**: `(dealId, stage)` — one follow-up per deal per stage

## Deploying to Droplet

```bash
scp cron/dedup.js root@64.23.204.220:/path/to/cron/
scp cron/notify-buyers.js root@64.23.204.220:/path/to/cron/
scp cron/deal-follow-up.js root@64.23.204.220:/path/to/cron/
```

## Re-enabling Cron Jobs (ONE AT A TIME)

1. Deploy dedup module
2. Test in isolation with `node notify-buyers.js --dry-run`
3. Enable cron, monitor for 24 hours
4. Check `sent-log.json` for correct entries
5. Then move to the next cron job
