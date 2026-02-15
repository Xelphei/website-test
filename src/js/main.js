import { Router } from './router.js';
import { loadYaml } from './utils/yaml.js';
import { renderHome } from './pages/home.js';
import { renderNews } from './pages/news.js';
import { renderEvents } from './pages/events.js';
import { renderBoard } from './pages/board.js';
import { renderGallery } from './pages/gallery.js';
import { renderProgramItem } from './pages/program-item.js';
import { renderPrograms } from './pages/programs.js';
import { renderContact } from './pages/contact.js';

const BASE = import.meta.env.BASE_URL;

let programsData = null;

async function init() {
  const siteConfig = await loadYaml(`${BASE}data/site.yaml`);
  programsData = await loadYaml(`${BASE}data/programs.yaml`);

  document.title = siteConfig.name;

  const app = document.getElementById('app');
  app.innerHTML = buildLayout(siteConfig, programsData);

  const contentEl = document.getElementById('page-content');

  // Build routes: static + dynamic program item routes
  const routes = {
    '/': (el) => renderHome(el, BASE, siteConfig),
    '/news': (el) => renderNews(el, BASE),
    '/events': (el) => renderEvents(el),
    '/board': (el) => renderBoard(el, BASE),
    '/gallery': (el) => renderGallery(el, BASE),
    '/programs': (el) => renderPrograms(el, BASE),
    '/contact': (el) => renderContact(el, BASE),
    '/404': (el) => {
      el.innerHTML = `
        <div class="text-center py-20">
          <h1 class="font-heading text-4xl font-bold text-primary-dark mb-4">Page Not Found</h1>
          <p class="font-body text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <a href="#/" class="font-body text-primary-blue hover:text-secondary-navy underline">Go Home</a>
        </div>`;
    },
  };

  // Add program item routes from programs.yaml
  for (const program of programsData.programs) {
    for (const item of program.items) {
      if (item.slug && !item.link && !item.scrollTo) {
        routes[`/programs/${item.slug}`] = (el) => renderProgramItem(el, BASE, item.slug);
      }
    }
  }

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

  // Handle scrollTo nav links and redirect old routes
  initScrollToLinks();
  initLinkInterception();

  // Floating nav scroll behavior
  initFloatingNav();
}

function buildLayout(config, programs) {
  // Separate regular nav items from the Parent Organization link
  const regularNavItems = config.floatingNav.filter((item) => !item.external);
  const externalItem = config.floatingNav.find((item) => item.external);

  const regularLinks = regularNavItems
    .map((item) => {
      // Programs gets a special dropdown wrapper
      if (item.label === 'Programs') {
        return buildProgramsDropdown(item, programs);
      }
      if (item.scrollTo) {
        return `<a href="#/" data-scroll-to="${item.scrollTo}" data-nav-link class="nav-link">${item.label}</a>`;
      }
      return `<a href="#${item.path}" data-nav-link class="nav-link">${item.label}</a>`;
    })
    .join('');

  const externalLink = externalItem
    ? `<a href="${externalItem.path}" target="_blank" rel="noopener noreferrer" class="nav-link-parent">${externalItem.label}</a>`
    : '';

  const mobileNavLinks = buildMobileNav(config, programs);

  const socialLinks = config.socials
    ? config.socials
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="${s.platform}">${s.platform}</a>`
        )
        .join(' | ')
    : '';

  return `
    <!-- Top Navigation -->
    <nav id="floating-nav" class="site-nav">
      <div class="nav-inner">
        <a href="#/" class="nav-logo">
          <img src="${BASE}images/logo.png" alt="${config.name}" class="h-8 w-8 object-contain" onerror="this.style.display='none'" />
          <span class="font-body text-white font-bold text-lg">OPC</span>
        </a>
        <div class="nav-center">
          ${regularLinks}
        </div>
        <div class="nav-right">
          ${externalLink}
        </div>
        <button id="floating-menu-toggle" class="lg:hidden p-2 text-gray-200 hover:text-white" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div id="floating-mobile-menu" class="hidden lg:hidden border-t border-primary-dark/30">
        ${mobileNavLinks}
      </div>
    </nav>

    <!-- Main Content -->
    <main id="page-content" class="flex-1 w-full">
      <div class="text-center py-12">
        <div class="animate-pulse text-gray-400 font-body">Loading...</div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-primary-dark text-gray-300 mt-auto">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="font-heading font-semibold text-white">${config.name}</p>
            <p class="font-body text-sm">${config.footer?.tagline || ''}</p>
          </div>
          ${socialLinks ? `<div class="font-body text-sm">${socialLinks}</div>` : ''}
        </div>
        <div class="mt-6 pt-4 border-t border-gray-600 text-center text-sm text-gray-400 font-body">
          &copy; ${new Date().getFullYear()} ${config.name}. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}

function buildProgramsDropdown(navItem, programs) {
  const bucketItems = programs.programs
    .map((program) => {
      const subItems = program.items
        .map((item) => {
          if (item.link) {
            return `<a href="${item.link}" class="dropdown-sub-item">${item.name}</a>`;
          }
          if (item.scrollTo) {
            return `<a href="#/" data-scroll-to="${item.scrollTo}" class="dropdown-sub-item">${item.name}</a>`;
          }
          return `<a href="#/programs/${item.slug}" class="dropdown-sub-item">${item.name}</a>`;
        })
        .join('');

      return `
        <div class="dropdown-bucket">
          <div class="dropdown-bucket-label">${program.title}</div>
          <div class="dropdown-sub-menu">
            ${subItems}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="nav-dropdown-wrapper">
      <a href="#${navItem.path}" data-nav-link class="nav-link">${navItem.label}</a>
      <div class="nav-dropdown">
        ${bucketItems}
      </div>
    </div>
  `;
}

function buildMobileNav(config, programs) {
  return config.floatingNav
    .map((item) => {
      if (item.external) {
        return `<a href="${item.path}" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 font-body font-bold text-white hover:bg-primary-dark/50 transition-colors">${item.label}</a>`;
      }
      if (item.label === 'Programs') {
        // Programs with sub-items in mobile
        const subLinks = programs.programs
          .map((program) => {
            const items = program.items
              .map((pi) => {
                if (pi.link) {
                  return `<a href="${pi.link}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${pi.name}</a>`;
                }
                if (pi.scrollTo) {
                  return `<a href="#/" data-scroll-to="${pi.scrollTo}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${pi.name}</a>`;
                }
                return `<a href="#/programs/${pi.slug}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${pi.name}</a>`;
              })
              .join('');
            return `
              <div class="block px-6 py-1 font-body text-sm text-gray-300">${program.title}</div>
              ${items}
            `;
          })
          .join('');
        return `
          <a href="#${item.path}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${item.label}</a>
          ${subLinks}
        `;
      }
      if (item.scrollTo) {
        return `<a href="#/" data-scroll-to="${item.scrollTo}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${item.label}</a>`;
      }
      return `<a href="#${item.path}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${item.label}</a>`;
    })
    .join('');
}

function initScrollToLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-scroll-to]');
    if (!link) return;

    e.preventDefault();
    const targetId = link.dataset.scrollTo;
    const hash = window.location.hash || '#/';
    const isHome = hash === '#/' || hash === '#' || hash === '';

    // Close mobile menu
    const mobileMenu = document.getElementById('floating-mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');

    if (isHome) {
      scrollToSection(targetId);
    } else {
      window.location.hash = '#/';
      setTimeout(() => scrollToSection(targetId), 400);
    }
  });
}

// Intercept clicks on old-style links like #/about
// that now correspond to home page sections
function initLinkInterception() {
  const sectionMap = {
    '#/about': 'about-section',
  };

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    const sectionId = sectionMap[hash];
    if (sectionId) {
      // Redirect to home and scroll
      window.location.hash = '#/';
      setTimeout(() => scrollToSection(sectionId), 400);
    }
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const navHeight = document.getElementById('floating-nav')?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function initFloatingNav() {
  const nav = document.getElementById('floating-nav');
  if (!nav) return;

  let ticking = false;

  function updateNavState() {
    if (window.scrollY > 10) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavState);
      ticking = true;
    }
  });

  updateNavState();
}

init();
