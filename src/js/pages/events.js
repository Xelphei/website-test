const BASE = import.meta.env.BASE_URL;

const CATEGORY_PATTERNS = [
  { regex: /\[Volunteer\]/i, category: 'Volunteer', color: '#00C2F3' },
  { regex: /\[Meeting\]/i, category: 'Meeting', color: '#18428F' },
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

function formatEventDate(event) {
  const isAllDay = !event.start.dateTime;

  if (isAllDay) {
    const startParts = event.start.date.split('-');
    const startDate = new Date(startParts[0], startParts[1] - 1, startParts[2]);

    const endParts = event.end.date.split('-');
    const endDate = new Date(endParts[0], endParts[1] - 1, endParts[2]);
    endDate.setDate(endDate.getDate() - 1);

    const fmt = { month: 'short', day: 'numeric', year: 'numeric' };
    const startStr = startDate.toLocaleDateString('en-US', fmt);

    if (endDate.getTime() > startDate.getTime()) {
      const endStr = endDate.toLocaleDateString('en-US', fmt);
      return { dateStr: `${startStr} – ${endStr}`, timeStr: 'All Day', isAllDay: true };
    }

    return { dateStr: startStr, timeStr: 'All Day', isAllDay: true };
  }

  const startDate = new Date(event.start.dateTime);
  const endDate = new Date(event.end.dateTime);

  const dateStr = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const timeFmt = { hour: 'numeric', minute: '2-digit' };
  const timeStr = `${startDate.toLocaleTimeString('en-US', timeFmt)} – ${endDate.toLocaleTimeString('en-US', timeFmt)}`;

  const startDay = startDate.toDateString();
  const endDay = endDate.toDateString();
  if (startDay !== endDay) {
    const endDateStr = endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return { dateStr: `${dateStr} – ${endDateStr}`, timeStr, isAllDay: false };
  }

  return { dateStr, timeStr, isAllDay: false };
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
      <p class="font-body text-sm text-gray-400 mb-4">Scroll down to browse events &rarr;</p>
      <div class="timeline-container" id="timeline-scroll-container">
        <div class="timeline-track">
          ${events
            .map((event) => {
              const title = event.summary || 'Untitled Event';
              const { category, color } = detectCategory(title);
              const cleanTitle = stripCategoryTag(title);
              const { dateStr, timeStr } = formatEventDate(event);

              const descHtml = event.description
                ? `<p class="font-body text-sm text-gray-500 mt-2 line-clamp-2">${escapeHtml(event.description)}</p>`
                : '';

              return `
                <div class="timeline-event" style="--event-color: ${color}" onclick="window.location.hash='#/contact'">
                  <div class="timeline-card">
                    <span class="timeline-category">${escapeHtml(category)}</span>
                    <h3 class="font-heading font-semibold text-primary-dark mt-1">${escapeHtml(cleanTitle)}</h3>
                    <p class="font-body text-sm text-gray-500 mt-1">${dateStr}</p>
                    <p class="font-body text-sm text-gray-400">${timeStr}</p>
                    ${descHtml}
                    <p class="font-body text-xs mt-2" style="color: var(--event-color)">Click to contact us about this event</p>
                  </div>
                  <div class="timeline-dot"></div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
      ${data.fetchedAt ? `<p class="text-center text-xs text-gray-300 mt-6 font-body">Last updated: ${new Date(data.fetchedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>` : ''}
    `;

    // Intercept vertical scroll (wheel) and convert to horizontal scroll
    const scrollContainer = document.getElementById('timeline-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', (e) => {
        // Only intercept if there's horizontal overflow
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }
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
