import { loadYaml } from '../utils/yaml.js';

export async function renderBoard(el, base) {
  el.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-6">Executive Board</h1>
      <div id="board-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/board.yaml`);
    const contentEl = document.getElementById('board-content');

    const currentHtml = data.current
      .map((member) => renderMemberCard(member, base))
      .join('');

    let foundingHtml = '';
    if (data.founding && data.founding.length > 0) {
      const foundingCards = data.founding
        .map((member) => renderMemberCard(member, base))
        .join('');
      foundingHtml = `
        <div class="mt-12">
          <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-6">Founding Chapter Members</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${foundingCards}
          </div>
        </div>
      `;
    }

    let previousHtml = '';
    if (data.previous) {
      previousHtml = `
        <div class="mt-12">
          <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-4">Previous Executive Board (${escapeHtml(data.previous.year)})</h2>
          <div class="bg-white rounded-lg shadow-sm divide-y" style="border: 1px solid #E2E1EE;">
            ${data.previous.members
              .map(
                (member) => `
              <div class="px-4 py-3 flex items-center justify-between">
                <span class="font-body font-medium text-primary-dark">${escapeHtml(member.name)}</span>
                <span class="font-body text-gray-500 text-sm">${escapeHtml(member.title)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    }

    contentEl.innerHTML = `
      <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-6">Current Board</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${currentHtml}
      </div>
      ${foundingHtml}
      ${previousHtml}
    `;
  } catch {
    document.getElementById('board-content').innerHTML =
      '<p class="text-red-500 font-body">Failed to load board members.</p>';
  }
}

function renderMemberCard(member, base) {
  const linkedinIcon = member.linkedin
    ? `<a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="board-link-icon" aria-label="LinkedIn">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>`
    : '';

  const websiteIcon = member.website
    ? `<a href="${member.website}" target="_blank" rel="noopener noreferrer" class="board-link-icon" aria-label="Website">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
      </a>`
    : '';

  return `
    <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" style="border: 1px solid #E2E1EE;">
      <div class="aspect-square flex items-center justify-center" style="background-color: #E2E1EE;">
        <img
          src="${base}images/${member.photo}"
          alt="${escapeHtml(member.name)}"
          class="w-full h-full object-cover"
          onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-6xl font-light font-heading\\' style=\\'color: #18428F;\\'>${member.name.charAt(0)}</div>'"
        />
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-heading font-semibold text-primary-dark">${escapeHtml(member.name)}</h3>
            ${member.title ? `<p class="font-body text-sm font-medium" style="color: #00C2F3;">${escapeHtml(member.title)}</p>` : ''}
          </div>
          <div class="flex gap-2">
            ${linkedinIcon}
            ${websiteIcon}
          </div>
        </div>
        ${member.bio ? `<p class="font-body text-gray-500 text-sm mt-2">${escapeHtml(member.bio)}</p>` : ''}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
