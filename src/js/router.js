export class Router {
  constructor(routes) {
    this.routes = routes;
    this.contentEl = null;
    this.isTransitioning = false;
  }

  init(contentEl) {
    this.contentEl = contentEl;
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  async resolve() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '') || '/';
    const route = this.routes[path] || this.routes['/404'];

    // Check if we should skip the fade transition (circle-expand was used)
    const skipFade = window.__skipFadeTransition === true;
    window.__skipFadeTransition = false;

    if (!skipFade) {
      // Normal fade out current content
      this.contentEl.classList.add('page-fade-out');
      await new Promise((r) => setTimeout(r, 300));
    }

    this.updateNavState(hash);
    this.closeMobileMenu();

    if (route) {
      await route(this.contentEl);
    }

    if (!skipFade) {
      // Normal fade in new content
      this.contentEl.classList.remove('page-fade-out');
      this.contentEl.classList.add('page-fade-in');
      await new Promise((r) => setTimeout(r, 300));
      this.contentEl.classList.remove('page-fade-in');
    } else {
      // Ensure no fade classes linger
      this.contentEl.classList.remove('page-fade-out', 'page-fade-in');
    }

    this.isTransitioning = false;

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }

  updateNavState(hash) {
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === hash || (hash === '' && href === '#/')) {
        link.classList.add('text-white', 'font-semibold');
        link.classList.remove('text-gray-200');
      } else {
        link.classList.remove('text-white', 'font-semibold');
        link.classList.add('text-gray-200');
      }
    });
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById('floating-mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}
