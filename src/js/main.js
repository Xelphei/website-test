import { Router } from './router.js';
import { loadYaml } from './utils/yaml.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderAwards } from './pages/awards.js';
import { renderEvents } from './pages/events.js';
import { renderContact } from './pages/contact.js';
import { renderBoard } from './pages/board.js';
import { renderGallery } from './pages/gallery.js';

const BASE = import.meta.env.BASE_URL;

async function init() {
  const siteConfig = await loadYaml(`${BASE}data/site.yaml`);

  document.title = siteConfig.name;

  const app = document.getElementById('app');
  app.innerHTML = buildLayout(siteConfig);

  const contentEl = document.getElementById('page-content');

  const routes = {
    '/': (el) => renderHome(el, BASE),
    '/about': (el) => renderAbout(el, BASE),
    '/awards': (el) => renderAwards(el, BASE),
    '/events': (el) => renderEvents(el, BASE),
    '/contact': (el) => renderContact(el, BASE, siteConfig),
    '/board': (el) => renderBoard(el, BASE),
    '/gallery': (el) => renderGallery(el, BASE),
    '/404': (el) => {
      el.innerHTML = `
        <div class="text-center py-20">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p class="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <a href="#/" class="text-primary-600 hover:text-primary-800 underline">Go Home</a>
        </div>`;
    },
  };

  const router = new Router(routes);
  router.init(contentEl);

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function buildLayout(config) {
  const navLinks = config.nav
    .map(
      (item) =>
        `<a href="#${item.path}" data-nav-link class="text-gray-600 hover:text-primary-600 transition-colors">${item.label}</a>`
    )
    .join('');

  const mobileNavLinks = config.nav
    .map(
      (item) =>
        `<a href="#${item.path}" data-nav-link class="block px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">${item.label}</a>`
    )
    .join('');

  const socialLinks = config.socials
    ? config.socials
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="${s.platform}">${s.platform}</a>`
        )
        .join(' | ')
    : '';

  return `
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#/" class="flex items-center gap-3">
          <img src="${BASE}images/logo.png" alt="${config.name}" class="h-10 w-10 object-contain" onerror="this.style.display='none'" />
          <span class="text-xl font-bold text-primary-800">${config.name}</span>
        </a>
        <div class="hidden md:flex items-center gap-6">
          ${navLinks}
        </div>
        <button id="menu-toggle" class="md:hidden p-2 text-gray-600 hover:text-primary-600" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <div id="mobile-menu" class="hidden md:hidden border-t">
        ${mobileNavLinks}
      </div>
    </header>

    <!-- Main Content -->
    <main id="page-content" class="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
      <div class="text-center py-12">
        <div class="animate-pulse text-gray-400">Loading...</div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 mt-auto">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="font-semibold text-white">${config.name}</p>
            <p class="text-sm">${config.footer?.tagline || ''}</p>
          </div>
          ${socialLinks ? `<div class="text-sm">${socialLinks}</div>` : ''}
        </div>
        <div class="mt-6 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; ${new Date().getFullYear()} ${config.name}. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}

init();
