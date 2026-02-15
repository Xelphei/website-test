const BASE = import.meta.env.BASE_URL;

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

export async function renderEvents(el) {
  el.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-8">Upcoming Events</h1>
      <div id="events-list">
        <div class="text-center py-8 text-gray-400 font-body">Loading events...</div>
      </div>
    </div>
  `;

  const listEl = document.getElementById('events-list');

  try {
    const response = await fetch(`${BASE}data/events.json`);

    if (!response.ok) {
      listEl.innerHTML = `
        <div class="rounded-lg p-6 text-center" style="background-color: #F8F8F8; border: 1px solid #E2E1EE;">
          <p class="font-body text-primary-dark font-semibold mb-2">Events Not Available</p>
          <p class="font-body text-gray-500 text-sm">
            Event data has not been generated yet. Run
            <code class="px-1 rounded" style="background-color: #E2E1EE;">npm run fetch-events</code>
            or push to main to trigger a build.
          </p>
        </div>
      `;
      return;
    }

    const data = await response.json();

    if (!data.events || data.events.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-8">
          <p class="font-body text-gray-500">No upcoming events at this time. Check back soon!</p>
        </div>
      `;
      return;
    }

    const events = data.events;

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
      ${data.fetchedAt ? `<p class="text-center text-xs text-gray-300 mt-2 font-body">Last updated: ${new Date(data.fetchedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>` : ''}
    `;
  } catch {
    listEl.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="font-body text-red-800 font-semibold mb-2">Unable to Load Events</p>
        <p class="font-body text-red-600 text-sm">There was an error loading event data. Please try again later.</p>
      </div>
    `;
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
