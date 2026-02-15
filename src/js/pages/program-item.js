import { loadYaml } from '../utils/yaml.js';

export async function renderProgramItem(el, base, slug) {
  el.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <div id="program-item-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/programs.yaml`);
    const contentEl = document.getElementById('program-item-content');

    // Find the item across all programs
    let foundItem = null;
    let foundProgram = null;
    for (const program of data.programs) {
      for (const item of program.items) {
        if (item.slug === slug) {
          foundItem = item;
          foundProgram = program;
          break;
        }
      }
      if (foundItem) break;
    }

    if (!foundItem) {
      contentEl.innerHTML = `
        <div class="text-center py-12">
          <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">Program Not Found</h1>
          <p class="font-body text-gray-500 mb-6">The program you're looking for doesn't exist.</p>
          <a href="#/programs" class="font-body text-primary-cyan hover:text-primary-blue underline">Back to Programs</a>
        </div>
      `;
      return;
    }

    // Build optional sections
    const detailsHtml = foundItem.details
      ? `
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Additional Details</h2>
          <p class="font-body text-gray-600 leading-relaxed">${escapeHtml(foundItem.details)}</p>
        </div>
      `
      : '';

    const volunteerHtml = foundItem.volunteer
      ? `
        <div class="program-item-section program-item-callout">
          <h2 class="font-heading text-xl font-bold mb-3" style="color: #00C2F3;">Call for Volunteers</h2>
          <p class="font-body text-gray-600 leading-relaxed">${escapeHtml(foundItem.volunteer)}</p>
          <a href="#/contact" class="program-item-cta">Get Involved &rarr;</a>
        </div>
      `
      : '';

    const linksHtml =
      foundItem.links && foundItem.links.length > 0
        ? `
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Links &amp; Resources</h2>
          <ul class="space-y-2">
            ${foundItem.links
              .map(
                (link) =>
                  `<li>
                    <a href="${escapeAttr(link.url)}" target="_blank" rel="noopener noreferrer" class="program-item-link">
                      ${escapeHtml(link.label || link.url)} <span class="text-xs">&nearr;</span>
                    </a>
                    ${link.description ? `<p class="font-body text-gray-500 text-sm mt-0.5">${escapeHtml(link.description)}</p>` : ''}
                  </li>`
              )
              .join('')}
          </ul>
        </div>
      `
        : '';

    const imagesHtml =
      foundItem.images && foundItem.images.length > 0
        ? `
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Photos</h2>
          <div class="program-item-gallery">
            ${foundItem.images
              .map(
                (img) =>
                  `<div class="program-item-gallery-item">
                    <img src="${base}images/${escapeAttr(img.src)}" alt="${escapeAttr(img.alt || '')}" class="rounded-lg w-full h-auto" />
                    ${img.caption ? `<p class="font-body text-sm text-gray-500 mt-1">${escapeHtml(img.caption)}</p>` : ''}
                  </div>`
              )
              .join('')}
          </div>
        </div>
      `
        : '';

    contentEl.innerHTML = `
      <nav class="font-body text-sm text-gray-400 mb-6">
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">Ongoing Programs</a>
        <span class="mx-2">/</span>
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">${escapeHtml(foundProgram.title)}</a>
        <span class="mx-2">/</span>
        <span class="text-primary-dark">${escapeHtml(foundItem.name)}</span>
      </nav>
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">${escapeHtml(foundItem.name)}</h1>
      <div class="font-body text-gray-600 leading-relaxed text-lg mb-8">
        <p>${escapeHtml(foundItem.description)}</p>
      </div>
      ${detailsHtml}
      ${volunteerHtml}
      ${imagesHtml}
      ${linksHtml}
      <div class="border-t pt-6 mt-8" style="border-color: #E2E1EE;">
        <p class="font-body text-gray-500 text-sm">
          This program is part of our <strong>${escapeHtml(foundProgram.title)}</strong> initiative.
          <a href="#/contact" class="text-primary-cyan hover:text-primary-blue underline ml-1">Contact us</a> to learn more or get involved.
        </p>
      </div>
    `;
  } catch {
    const el2 = document.getElementById('program-item-content');
    if (el2) el2.innerHTML = '<p class="text-red-500 font-body">Failed to load program details.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
