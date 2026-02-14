import { Router } from './router.js';
import { loadYaml } from './utils/yaml.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderPrograms } from './pages/programs.js';
import { renderNews } from './pages/news.js';
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
    '/': (el) => renderHome(el, BASE, siteConfig),
    '/about': (el) => renderAbout(el, BASE),
    '/programs': (el) => renderPrograms(el, BASE),
    '/news': (el) => renderNews(el, BASE),
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
  const menuBtn = document.getElementById('floating-menu-toggle');
  const mobileMenu = document.getElementById('floating-mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Floating nav scroll behavior
  initFloatingNav();
}

function buildLayout(config) {
  const navLinks = config.floatingNav
    .map((item) => {
      if (item.external) {
        return `<a href="${item.path}" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-white transition-colors">${item.label}</a>`;
      }
      return `<a href="#${item.path}" data-nav-link class="text-gray-300 hover:text-white transition-colors">${item.label}</a>`;
    })
    .join('');

  const mobileNavLinks = config.floatingNav
    .map((item) => {
      if (item.external) {
        return `<a href="${item.path}" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">${item.label}</a>`;
      }
      return `<a href="#${item.path}" data-nav-link class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">${item.label}</a>`;
    })
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
    <!-- Floating Navigation -->
    <nav id="floating-nav" class="floating-nav">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#/" class="flex items-center gap-2">
          <img src="${BASE}images/logo.png" alt="${config.name}" class="h-8 w-8 object-contain" onerror="this.style.display='none'" />
          <span class="text-white font-bold text-lg">OPC</span>
        </a>
        <div class="hidden lg:flex items-center gap-5 text-sm">
          ${navLinks}
        </div>
        <button id="floating-menu-toggle" class="lg:hidden p-2 text-gray-300 hover:text-white" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div id="floating-mobile-menu" class="hidden lg:hidden border-t border-gray-700">
        ${mobileNavLinks}
      </div>
    </nav>

    <!-- Main Content -->
    <main id="page-content" class="flex-1 w-full">
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

function initFloatingNav() {
  const nav = document.getElementById('floating-nav');
  if (!nav) return;

  let ticking = false;

  function updateNavVisibility() {
    const hash = window.location.hash || '#/';
    const isHome = hash === '#/' || hash === '#' || hash === '';

    if (isHome) {
      // Show nav after scrolling past one viewport height
      if (window.scrollY > window.innerHeight) {
        nav.classList.add('floating-nav-visible');
      } else {
        nav.classList.remove('floating-nav-visible');
      }
    } else {
      // Always show nav on non-home pages
      nav.classList.add('floating-nav-visible');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavVisibility);
      ticking = true;
    }
  });

  window.addEventListener('hashchange', () => {
    requestAnimationFrame(updateNavVisibility);
  });

  // Initial check
  updateNavVisibility();
}

init();
