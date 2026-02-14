import { loadYaml } from '../utils/yaml.js';

export async function renderPrograms(el, base) {
  el.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Ongoing Programs</h1>
      <div id="programs-content">
        <div class="text-center py-8 text-gray-400">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/programs.yaml`);
    const contentEl = document.getElementById('programs-content');
    let expandedId = null;

    function render() {
      contentEl.innerHTML = data.programs
        .map((program) => {
          const isExpanded = expandedId === program.id;
          return `
            <div class="program-bucket mb-4" data-program-id="${program.id}">
              <div class="program-bucket-header ${isExpanded ? 'expanded' : ''}">
                <div class="flex-1">
                  <h2 class="text-xl font-semibold text-gray-900">${escapeHtml(program.title)}</h2>
                  <p class="program-summary text-sm text-gray-500 mt-1">${escapeHtml(program.summary)}</p>
                </div>
                <svg class="program-chevron w-5 h-5 text-gray-400 flex-shrink-0 ${isExpanded ? 'rotated' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div class="program-bucket-content ${isExpanded ? 'expanded' : ''}">
                <div class="p-6 pt-0">
                  ${program.items
                    .map(
                      (item) => `
                    <div class="program-item mb-4 last:mb-0">
                      <h3 class="font-semibold text-gray-800">${escapeHtml(item.name)}</h3>
                      <p class="text-gray-600 text-sm mt-1">${escapeHtml(item.description)}</p>
                      ${item.link ? `<a href="${item.link}" class="text-primary-600 hover:text-primary-800 text-sm mt-1 inline-block">Learn more &rarr;</a>` : ''}
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            </div>
          `;
        })
        .join('');

      // Attach click handlers
      contentEl.querySelectorAll('.program-bucket-header').forEach((header) => {
        header.addEventListener('click', () => {
          const bucket = header.closest('.program-bucket');
          const id = bucket.dataset.programId;
          expandedId = expandedId === id ? null : id;
          render();
        });
      });
    }

    render();
  } catch {
    document.getElementById('programs-content').innerHTML =
      '<p class="text-red-500">Failed to load programs.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
