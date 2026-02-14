import { loadYaml } from '../utils/yaml.js';

export async function renderNews(el, base) {
  el.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-8">Chapter News</h1>
      <div id="news-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/news.yaml`);
    const contentEl = document.getElementById('news-content');

    if (!data.newsItems || data.newsItems.length === 0) {
      contentEl.innerHTML =
        '<p class="font-body text-gray-500 text-center py-8">No news available yet. Check back soon!</p>';
      return;
    }

    contentEl.innerHTML = `
      <div class="news-grid">
        ${data.newsItems
          .map(
            (item) => `
          <div class="news-card">
            <div class="news-card-image">
              <img
                src="${base}images/${item.image}"
                alt="${escapeHtml(item.title)}"
                onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400 text-sm p-4 text-center font-body\\' style=\\'background-color: #E2E1EE\\'>Image unavailable</div>'"
              />
            </div>
            <div class="p-5">
              <p class="font-body text-xs uppercase tracking-wide mb-2" style="color: #B64B28;">${formatDate(item.date)}</p>
              <h3 class="font-heading font-semibold text-primary-dark mb-2">${escapeHtml(item.title)}</h3>
              <p class="font-body text-gray-600 text-sm">${escapeHtml(item.description)}</p>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  } catch {
    document.getElementById('news-content').innerHTML =
      '<p class="text-red-500 font-body">Failed to load news.</p>';
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
