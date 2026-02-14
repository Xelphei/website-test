import { loadYaml } from '../utils/yaml.js';

export async function renderEvents(el, base) {
  el.innerHTML = `
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
    <div id="events-list">
      <div class="text-center py-8 text-gray-400">Loading events...</div>
    </div>
  `;

  try {
    const config = await loadYaml(`${base}data/events.yaml`);
    const listEl = document.getElementById('events-list');

    if (!config.apiKey || config.apiKey === 'YOUR_API_KEY') {
      listEl.innerHTML = `
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p class="text-yellow-800 font-semibold mb-2">Calendar Not Configured</p>
          <p class="text-yellow-600 text-sm">
            To display events, add your Google Calendar API key and Calendar ID to
            <code class="bg-yellow-100 px-1 rounded">public/data/events.yaml</code>.
            See MAINTENANCE.md for setup instructions.
          </p>
        </div>
      `;
      return;
    }

    await fetchEvents(config, listEl);
  } catch {
    document.getElementById('events-list').innerHTML =
      '<p class="text-red-500">Failed to load events configuration.</p>';
  }
}

async function fetchEvents(config, listEl) {
  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events?key=${config.apiKey}&timeMin=${now}&maxResults=${config.maxResults || 10}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-500">No upcoming events at this time. Check back soon!</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = data.items
      .map((event) => {
        const start = event.start.dateTime || event.start.date;
        const end = event.end.dateTime || event.end.date;
        const isAllDay = !event.start.dateTime;

        const startDate = new Date(start);
        const dateStr = startDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        let timeStr = '';
        if (!isAllDay) {
          const endDate = new Date(end);
          timeStr = `${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }

        return `
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
            <div class="flex flex-col sm:flex-row sm:items-start gap-4">
              <div class="flex-shrink-0 bg-primary-50 text-primary-700 rounded-lg p-3 text-center min-w-[80px]">
                <div class="text-2xl font-bold">${startDate.getDate()}</div>
                <div class="text-sm uppercase">${startDate.toLocaleDateString('en-US', { month: 'short' })}</div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">${escapeHtml(event.summary || 'Untitled Event')}</h3>
                <p class="text-sm text-gray-500 mt-1">${dateStr}${timeStr ? ` &middot; ${timeStr}` : ' &middot; All Day'}</p>
                ${event.location ? `<p class="text-sm text-gray-500 mt-1">${escapeHtml(event.location)}</p>` : ''}
                ${event.description ? `<p class="text-gray-600 mt-2 text-sm">${escapeHtml(event.description)}</p>` : ''}
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  } catch (err) {
    listEl.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-800 font-semibold mb-2">Unable to Load Events</p>
        <p class="text-red-600 text-sm">There was an error fetching events from Google Calendar. Please try again later.</p>
      </div>
    `;
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
