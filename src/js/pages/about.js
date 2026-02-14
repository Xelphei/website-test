import { renderMarkdown } from '../utils/markdown.js';

export async function renderAbout(el, base) {
  el.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="prose max-w-none" id="about-content">
        <div class="text-center py-8 text-gray-400">Loading...</div>
      </div>
    </div>
  `;

  try {
    const html = await renderMarkdown(`${base}content/about.md`);
    document.getElementById('about-content').innerHTML = html;
  } catch {
    document.getElementById('about-content').innerHTML =
      '<p class="text-red-500">Failed to load content.</p>';
  }
}
