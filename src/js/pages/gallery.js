import { loadYaml } from '../utils/yaml.js';

export async function renderGallery(el, base) {
  el.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-6">Photo Gallery</h1>
      <div id="gallery-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/gallery.yaml`);
    const contentEl = document.getElementById('gallery-content');

    if (!data.photos || data.photos.length === 0) {
      contentEl.innerHTML =
        '<p class="font-body text-gray-500 text-center py-8">No photos available yet.</p>';
      return;
    }

    contentEl.innerHTML = `
      <div class="masonry-grid">
        ${data.photos
          .map(
            (photo, i) => `
          <div class="masonry-item cursor-pointer" data-gallery-index="${i}">
            <img
              src="${base}images/${photo.path}"
              alt="${escapeHtml(photo.caption)}"
              onerror="this.style.display='none'"
            />
            <div class="masonry-overlay">
              <p class="text-white text-sm font-medium font-body">${escapeHtml(photo.caption)}</p>
              ${photo.date ? `<p class="text-gray-300 text-xs mt-1 font-body">${photo.date}</p>` : ''}
            </div>
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
      '<p class="text-red-500 font-body">Failed to load gallery.</p>';
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
