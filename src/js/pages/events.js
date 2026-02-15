import { loadYaml } from '../utils/yaml.js';

const CATEGORY_PATTERNS = [
  { regex: /\[Volunteer\]/i, category: 'Volunteer', color: '#18428F' },
  { regex: /\[Meeting\]/i, category: 'Meeting', color: '#00C2F3' },
  { regex: /\[Social\]/i, category: 'Social', color: '#F26524' },
  { regex: /\[Workshop\]/i, category: 'Workshop', color: '#19226D' },
  { regex: /\[Conference\]/i, category: 'Conference', color: '#B64B28' },
];

const DEFAULT_CATEGORY = { category: 'General', color: '#41434C' };

function detectCategory(title) {
  for (const pattern of CATEGORY_PATTERNS) {
    if (pattern.regex.test(title)) {
      return { category: pattern.category, color: pattern.color };
    }
  }
  return DEFAULT_CATEGORY;
}

function stripCategoryTag(title) {
  return title.replace(/\[(Volunteer|Meeting|Social|Workshop|Conference)\]\s*/i, '');
}

export async function renderEvents(el, base) {
  el.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-8">Upcoming Events</h1>
      <div id="events-list">
        <div class="text-center py-8 text-gray-400 font-body">Loading events...</div>
      </div>
    </div>
  `;

  try {
    const config = await loadYaml(`${base}data/events.yaml`);
    const listEl = document.getElementById('events-list');

    // Load secrets from environment variables
    const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
    const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

    if (!apiKey || apiKey === 'YOUR_API_KEY') {
      listEl.innerHTML = `
        <div class="rounded-lg p-6 text-center" style="background-color: #F8F8F8; border: 1px solid #E2E1EE;">
          <p class="font-body text-primary-dark font-semibold mb-2">Calendar Not Configured</p>
          <p class="font-body text-gray-500 text-sm">
            To display events, add your Google Calendar API key and Calendar ID to your
            <code class="px-1 rounded" style="background-color: #E2E1EE;">.env</code> file.
            See MAINTENANCE.md for setup instructions.
          </p>
        </div>
      `;
      return;
    }

    await fetchEvents({ ...config, apiKey, calendarId }, listEl);
  } catch {
    document.getElementById('events-list').innerHTML =
      '<p class="text-red-500 font-body">Failed to load events configuration.</p>';
  }
}

async function fetchEvents(config, listEl) {
  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events?key=${config.apiKey}&timeMin=${now}&maxResults=${config.maxResults || 10}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-8">
          <p class="font-body text-gray-500">No upcoming events at this time. Check back soon!</p>
        </div>
      `;
      return;
    }

    const events = data.items.slice(0, 10);

    listEl.innerHTML = `
      <div class="timeline-container">
        <div class="timeline-track">
          ${events
            .map((event) => {
              const title = event.summary || 'Untitled Event';
              const { category, color } = detectCategory(title);
              const cleanTitle = stripCategoryTag(title);

              const start = event.start.dateTime || event.start.date;
              const startDate = new Date(start);
              const dateStr = startDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              let timeStr = '';
              if (event.start.dateTime) {
                const end = event.end.dateTime;
                const endDate = new Date(end);
                timeStr = `${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
              }

              return `
                <div class="timeline-event" style="--event-color: ${color}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-card">
                    <span class="timeline-category">${escapeHtml(category)}</span>
                    <h3 class="font-heading font-semibold text-primary-dark mt-1">${escapeHtml(cleanTitle)}</h3>
                    <p class="font-body text-sm text-gray-500 mt-1">${dateStr}</p>
                    ${timeStr ? `<p class="font-body text-sm text-gray-400">${timeStr}</p>` : ''}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
      <p class="text-center text-sm text-gray-400 mt-4 font-body">Scroll horizontally to see more events &rarr;</p>
    `;
  } catch {
    listEl.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="font-body text-red-800 font-semibold mb-2">Unable to Load Events</p>
        <p class="font-body text-red-600 text-sm">There was an error fetching events from Google Calendar. Please try again later.</p>
      </div>
    `;
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
