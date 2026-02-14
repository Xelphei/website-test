import { renderMarkdown } from '../utils/markdown.js';

export async function renderAwards(el, base) {
  el.innerHTML = `
    <div class="prose max-w-none" id="awards-content">
      <div class="text-center py-8 text-gray-400">Loading...</div>
    </div>
  `;

  try {
    const html = await renderMarkdown(`${base}content/awards.md`);
    document.getElementById('awards-content').innerHTML = html;
  } catch {
    document.getElementById('awards-content').innerHTML =
      '<p class="text-red-500">Failed to load content.</p>';
  }
}
