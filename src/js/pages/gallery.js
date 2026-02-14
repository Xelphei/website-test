import { loadYaml } from '../utils/yaml.js';

export async function renderGallery(el, base) {
  el.innerHTML = `
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Photo Gallery</h1>
    <div id="gallery-content">
      <div class="text-center py-8 text-gray-400">Loading...</div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/gallery.yaml`);
    const contentEl = document.getElementById('gallery-content');

    if (!data.photos || data.photos.length === 0) {
      contentEl.innerHTML =
        '<p class="text-gray-500 text-center py-8">No photos available yet.</p>';
      return;
    }

    contentEl.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${data.photos
          .map(
            (photo, i) => `
          <div class="group cursor-pointer" data-gallery-index="${i}">
            <div class="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="${base}images/${photo.path}"
                alt="${escapeHtml(photo.caption)}"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400 text-sm p-4 text-center\\'>${escapeHtml(photo.caption)}</div>'"
              />
            </div>
            <p class="text-sm text-gray-600 mt-2">${escapeHtml(photo.caption)}</p>
            ${photo.date ? `<p class="text-xs text-gray-400">${photo.date}</p>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    `;

    // Lightbox functionality
    contentEl.querySelectorAll('[data-gallery-index]').forEach((item) => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.galleryIndex);
        openLightbox(data.photos, index, base);
      });
    });
  } catch {
    document.getElementById('gallery-content').innerHTML =
      '<p class="text-red-500">Failed to load gallery.</p>';
  }
}

function openLightbox(photos, index, base) {
  const photo = photos[index];

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="${base}images/${photo.path}" alt="${escapeHtml(photo.caption)}" />
    <div class="lightbox-caption">${escapeHtml(photo.caption)}</div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
      overlay.remove();
    }
  });

  document.addEventListener(
    'keydown',
    function handler(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handler);
      }
    }
  );

  document.body.appendChild(overlay);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
