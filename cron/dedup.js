/**
 * Dedup Module — File-based sent-log for cron jobs
 *
 * Prevents duplicate sends in notify-buyers and deal-follow-up cron jobs.
 * Uses a JSON file (sent-log.json) to track what has been sent.
 *
 * Usage:
 *   const dedup = require('./dedup');
 *   const log = dedup.load('/path/to/sent-log.json');
 *
 *   // Check before sending
 *   if (dedup.wasSent(log, 'notify-buyers', 'deal-123', 'buyer-456')) {
 *     console.log('Already sent, skipping');
 *   } else {
 *     // ... send notification ...
 *     dedup.markSent(log, 'notify-buyers', 'deal-123', 'buyer-456');
 *     dedup.save('/path/to/sent-log.json', log);
 *   }
 *
 * Log structure:
 *   {
 *     "notify-buyers": {
 *       "deal-123:buyer-456": { "sentAt": "2026-04-02T...", "type": "notify-buyers" }
 *     },
 *     "deal-follow-up": {
 *       "deal-789:stage-1": { "sentAt": "2026-04-02T...", "type": "deal-follow-up" }
 *     }
 *   }
 */

const fs = require('fs');
const path = require('path');

// Default log file path (same directory as the cron scripts)
const DEFAULT_LOG_PATH = path.join(__dirname, 'sent-log.json');

// Max age for log entries before cleanup (30 days)
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Load the sent log from disk. Returns empty structure if file doesn't exist.
 */
function load(filePath) {
  var logPath = filePath || DEFAULT_LOG_PATH;
  try {
    if (fs.existsSync(logPath)) {
      var raw = fs.readFileSync(logPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('dedup: Failed to load sent-log, starting fresh:', err.message);
  }
  return {};
}

/**
 * Save the sent log to disk. Creates file if it doesn't exist.
 */
function save(filePath, log) {
  var logPath = filePath || DEFAULT_LOG_PATH;
  try {
    fs.writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf8');
  } catch (err) {
    console.error('dedup: Failed to save sent-log:', err.message);
  }
}

/**
 * Build a composite key from variable parts.
 * e.g. buildKey('deal-123', 'buyer-456') => 'deal-123:buyer-456'
 */
function buildKey() {
  return Array.prototype.slice.call(arguments).join(':');
}

/**
 * Check if a notification was already sent.
 * @param {object} log - The loaded sent log
 * @param {string} category - e.g. 'notify-buyers' or 'deal-follow-up'
 * @param {...string} keyParts - Parts that make up the unique key
 * @returns {boolean} true if already sent
 */
function wasSent(log, category) {
  var keyParts = Array.prototype.slice.call(arguments, 2);
  var key = keyParts.join(':');
  if (!log[category]) return false;
  return !!log[category][key];
}

/**
 * Mark a notification as sent.
 * @param {object} log - The loaded sent log
 * @param {string} category - e.g. 'notify-buyers' or 'deal-follow-up'
 * @param {...string} keyParts - Parts that make up the unique key
 */
function markSent(log, category) {
  var keyParts = Array.prototype.slice.call(arguments, 2);
  var key = keyParts.join(':');
  if (!log[category]) log[category] = {};
  log[category][key] = {
    sentAt: new Date().toISOString(),
    type: category
  };
}

/**
 * Clean up old entries beyond MAX_AGE_MS (default 30 days).
 * Call periodically to prevent the log from growing indefinitely.
 * @param {object} log - The loaded sent log
 * @param {number} [maxAgeMs] - Custom max age in milliseconds
 * @returns {number} Number of entries removed
 */
function cleanup(log, maxAgeMs) {
  var maxAge = maxAgeMs || MAX_AGE_MS;
  var now = Date.now();
  var removed = 0;

  Object.keys(log).forEach(function(category) {
    var entries = log[category];
    if (!entries || typeof entries !== 'object') return;
    Object.keys(entries).forEach(function(key) {
      var entry = entries[key];
      if (entry && entry.sentAt) {
        var sentTime = new Date(entry.sentAt).getTime();
        if (now - sentTime > maxAge) {
          delete entries[key];
          removed++;
        }
      }
    });
    // Remove empty categories
    if (Object.keys(entries).length === 0) {
      delete log[category];
    }
  });

  return removed;
}

/**
 * Get count of entries in a category.
 */
function count(log, category) {
  if (!log[category]) return 0;
  return Object.keys(log[category]).length;
}

/**
 * Get all entries in a category (for debugging/auditing).
 */
function getEntries(log, category) {
  return log[category] || {};
}

module.exports = {
  load: load,
  save: save,
  buildKey: buildKey,
  wasSent: wasSent,
  markSent: markSent,
  cleanup: cleanup,
  count: count,
  getEntries: getEntries,
  DEFAULT_LOG_PATH: DEFAULT_LOG_PATH,
  MAX_AGE_MS: MAX_AGE_MS
};
