/**
 * Fetch upcoming events from Google Calendar API and write to a static JSON file.
 *
 * This runs at build time (CI) so the API key is never shipped to the client.
 * The output file (public/data/events.json) is read by the client at runtime.
 *
 * Required environment variables:
 *   GOOGLE_CALENDAR_API_KEY
 *   GOOGLE_CALENDAR_ID
 *
 * Usage:
 *   node scripts/fetch-events.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'public', 'data', 'events.json');
const MAX_RESULTS = 10;

// Load .env file for local development (CI sets env vars directly)
function loadEnvFile() {
  try {
    const envPath = join(__dirname, '..', '.env');
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex);
      const value = trimmed.slice(eqIndex + 1);
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // No .env file — that's fine in CI
  }
}

loadEnvFile();

async function main() {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || apiKey === 'YOUR_API_KEY') {
    console.log('GOOGLE_CALENDAR_API_KEY not set — writing empty events file.');
    writeFileSync(OUTPUT_PATH, JSON.stringify({ events: [], fetchedAt: null }));
    return;
  }

  if (!calendarId || calendarId.includes('YOUR_CALENDAR_ID')) {
    console.log('GOOGLE_CALENDAR_ID not set — writing empty events file.');
    writeFileSync(OUTPUT_PATH, JSON.stringify({ events: [], fetchedAt: null }));
    return;
  }

  const now = new Date().toISOString();
  const url =
    `https://www.googleapis.com/calendar/v3/calendars/` +
    `${encodeURIComponent(calendarId)}/events` +
    `?key=${apiKey}` +
    `&timeMin=${now}` +
    `&maxResults=${MAX_RESULTS}` +
    `&singleEvents=true` +
    `&orderBy=startTime`;

  console.log(`Fetching up to ${MAX_RESULTS} events from Google Calendar...`);

  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    console.error(`Google Calendar API returned ${response.status}: ${text}`);
    process.exit(1);
  }

  const data = await response.json();
  const items = (data.items || []).map((event) => ({
    summary: event.summary || 'Untitled Event',
    start: event.start,
    end: event.end,
  }));

  const output = {
    events: items,
    fetchedAt: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Wrote ${items.length} events to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('Failed to fetch events:', err.message);
  process.exit(1);
});
