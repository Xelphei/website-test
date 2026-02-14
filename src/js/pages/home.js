import { renderMarkdown } from '../utils/markdown.js';

export async function renderHome(el, base) {
  el.innerHTML = `
    <div class="hero text-center">
      <h1>Professional Organization</h1>
      <p>Advancing professionals through community, education, and recognition.</p>
      <div class="flex flex-wrap justify-center gap-4 mt-6">
        <a href="#/about" class="bg-white text-primary-700 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">Learn More</a>
        <a href="#/events" class="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">Upcoming Events</a>
      </div>
    </div>
    <div class="prose max-w-none" id="home-content">
      <div class="text-center py-8 text-gray-400">Loading...</div>
    </div>
  `;

  try {
    const html = await renderMarkdown(`${base}content/home.md`);
    document.getElementById('home-content').innerHTML = html;
  } catch {
    document.getElementById('home-content').innerHTML =
      '<p class="text-red-500">Failed to load content.</p>';
  }
}
