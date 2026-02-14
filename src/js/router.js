export class Router {
  constructor(routes) {
    this.routes = routes;
    this.contentEl = null;
  }

  init(contentEl) {
    this.contentEl = contentEl;
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  resolve() {
    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '') || '/';
    const route = this.routes[path] || this.routes['/404'];

    // Update active nav state
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === hash || (hash === '' && href === '#/')) {
        link.classList.add('text-primary-600', 'font-semibold');
        link.classList.remove('text-gray-600');
      } else {
        link.classList.remove('text-primary-600', 'font-semibold');
        link.classList.add('text-gray-600');
      }
    });

    // Close mobile menu on navigation
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }

    if (route) {
      route(this.contentEl);
    }

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }

  navigate(path) {
    window.location.hash = path;
  }
}
