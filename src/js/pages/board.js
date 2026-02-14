import { loadYaml } from '../utils/yaml.js';

export async function renderBoard(el, base) {
  el.innerHTML = `
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Board Members</h1>
    <div id="board-content">
      <div class="text-center py-8 text-gray-400">Loading...</div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/board.yaml`);
    const contentEl = document.getElementById('board-content');

    const currentHtml = data.current
      .map(
        (member) => `
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div class="aspect-square bg-gray-100 flex items-center justify-center">
          <img
            src="${base}images/${member.photo}"
            alt="${escapeHtml(member.name)}"
            class="w-full h-full object-cover"
            onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400 text-6xl font-light\\'>${member.name.charAt(0)}</div>'"
          />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900">${escapeHtml(member.name)}</h3>
          <p class="text-primary-600 text-sm font-medium">${escapeHtml(member.title)}</p>
          ${member.bio ? `<p class="text-gray-500 text-sm mt-2">${escapeHtml(member.bio)}</p>` : ''}
        </div>
      </div>
    `
      )
      .join('');

    let previousHtml = '';
    if (data.previous) {
      previousHtml = `
        <div class="mt-12">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Previous Board (${escapeHtml(data.previous.year)})</h2>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
            ${data.previous.members
              .map(
                (member) => `
              <div class="px-4 py-3 flex items-center justify-between">
                <span class="font-medium text-gray-800">${escapeHtml(member.name)}</span>
                <span class="text-gray-500 text-sm">${escapeHtml(member.title)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    }

    contentEl.innerHTML = `
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Current Board</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${currentHtml}
      </div>
      ${previousHtml}
    `;
  } catch {
    document.getElementById('board-content').innerHTML =
      '<p class="text-red-500">Failed to load board members.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
