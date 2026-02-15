import { loadYaml } from '../utils/yaml.js';

export async function renderPrograms(el, base) {
  el.innerHTML = `
    <div class="max-w-5xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark text-center mb-12">Ongoing Programs</h1>
      <div id="programs-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/programs.yaml`);
    const contentEl = document.getElementById('programs-content');
    if (!contentEl) return;

    contentEl.innerHTML = data.programs
      .map((program, index) => {
        const isReverse = false; // All images on left
        const itemsHtml = program.items
          .map((item) => {
            // Build the link for the item name itself
            let href = '';
            let attrs = '';
            if (item.link) {
              href = item.link;
            } else if (item.scrollTo) {
              href = '#/';
              attrs = `data-scroll-to="${item.scrollTo}"`;
            } else if (item.slug) {
              href = `#/programs/${item.slug}`;
            }

            const nameHtml = href
              ? `<a href="${href}" ${attrs} class="program-item-name-link">${escapeHtml(item.name)}<span class="program-item-arrow"> &rarr;</span></a>`
              : `<span class="font-body font-semibold text-primary-dark">${escapeHtml(item.name)}</span>`;

            return `
              <div class="mb-4">
                <h4 class="font-body font-semibold text-primary-dark">${nameHtml}</h4>
                <p class="font-body text-gray-600 text-sm mt-1">${escapeHtml(item.description)}</p>
              </div>
            `;
          })
          .join('');

        return `
          <div class="program-page-card ${isReverse ? 'reverse' : ''}">
            <div class="program-page-card-image">
              <img
                src="${base}images/${program.image}"
                alt="${escapeHtml(program.title)}"
                class="program-circle-image"
                onerror="this.style.display='none'"
              />
            </div>
            <div class="program-page-card-content">
              <h2 class="font-heading text-2xl font-bold text-primary-dark mb-2">${escapeHtml(program.title)}</h2>
              <p class="font-body text-gray-500 mb-4">${escapeHtml(program.summary)}</p>
              <div class="space-y-2">
                ${itemsHtml}
              </div>
            </div>
          </div>
          ${index < data.programs.length - 1 ? '<hr class="my-4 border-secondary-light">' : ''}
        `;
      })
      .join('');
  } catch {
    const contentEl = document.getElementById('programs-content');
    if (contentEl) contentEl.innerHTML = '<p class="text-red-500 font-body">Failed to load programs.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
