import { loadYaml } from '../utils/yaml.js';

export async function renderHome(el, base, siteConfig) {
  const heroSelections = siteConfig.heroSelections || [];

  const buttonsHtml = heroSelections
    .map((item) => {
      const bgColor = item.color || '#18428F';
      if (item.scrollTo) {
        return `<a href="#/" data-scroll-to="${item.scrollTo}" class="hero-bar-button gradient-text-hover" style="background-color: ${bgColor}">${item.label}</a>`;
      }
      if (item.path) {
        return `<a href="#${item.path}" class="hero-bar-button gradient-text-hover" data-circle-expand style="background-color: ${bgColor}">${item.label}</a>`;
      }
      return `<a href="#/" class="hero-bar-button gradient-text-hover" style="background-color: ${bgColor}">${item.label}</a>`;
    })
    .join('');

  el.innerHTML = `
    <!-- Hero Section (half page) -->
    <div class="home-hero" style="background-image: url('${base}images/hero-bg.jpg')">
      <div class="home-hero-overlay"></div>
      <div class="home-hero-content">
        <h1 class="home-hero-title">${siteConfig.name}</h1>
      </div>
      <div class="hero-button-bar">
        ${buttonsHtml}
      </div>
    </div>

    <!-- About Section (5 subsections) -->
    <section id="about-section" class="home-section bg-white">
      <div class="max-w-5xl mx-auto px-4 py-16">
        <div id="about-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section id="partners-section" class="home-section" style="background-color: #F8F8F8;">
      <div class="max-w-5xl mx-auto px-4 py-16">
        <h2 class="font-heading text-3xl font-bold text-primary-dark text-center mb-4">Our Partners</h2>
        <div id="partners-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact-section" class="home-section bg-white">
      <div class="max-w-4xl mx-auto px-4 py-16">
        <h2 class="font-heading text-3xl font-bold text-primary-dark text-center mb-8">Contact Us</h2>
        <div id="contact-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>
  `;

  // Trigger hero fade-in
  setTimeout(() => {
    const hero = el.querySelector('.home-hero');
    if (hero) hero.classList.add('fade-in-active');
  }, 50);

  // Set up circle-expand transition for Programs button
  initCircleExpand(el);

  // Load sections
  loadAboutSection(base);
  loadPartnersSection(base);
  loadContactSection(base);
}

function initCircleExpand(el) {
  el.querySelectorAll('[data-circle-expand]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href');
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Calculate size needed to cover viewport
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y)
      );
      const diameter = maxDist * 2;

      const overlay = document.createElement('div');
      overlay.className = 'circle-expand-overlay';
      overlay.style.cssText = `
        left: ${x - diameter / 2}px;
        top: ${y - diameter / 2}px;
        width: ${diameter}px;
        height: ${diameter}px;
        background-color: ${btn.style.backgroundColor || '#00C2F3'};
      `;
      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.remove();
        window.location.hash = href;
      }, 500);
    });
  });
}

async function loadAboutSection(base) {
  try {
    const data = await loadYaml(`${base}data/about.yaml`);
    const contentEl = document.getElementById('about-content');
    if (!contentEl || !data.subsections) return;

    contentEl.innerHTML = data.subsections
      .map((sub, index) => {
        const isReverse = index % 2 === 1;
        const subtitleHtml = sub.subtitle
          ? `<p class="font-body text-sm text-primary-cyan font-semibold mb-2">${escapeHtml(sub.subtitle)}</p>`
          : '';

        return `
          <div class="about-subsection ${isReverse ? 'reverse' : ''}">
            <div class="about-subsection-image">
              <img
                src="${base}images/${sub.image}"
                alt="${escapeHtml(sub.title)}"
                class="about-circle-image"
                onerror="this.style.display='none'"
              />
            </div>
            <div class="about-subsection-text">
              <h3 class="font-heading text-2xl font-bold text-primary-dark mb-2">${escapeHtml(sub.title)}</h3>
              ${subtitleHtml}
              <p class="font-body text-gray-600 leading-relaxed">${escapeHtml(sub.description)}</p>
            </div>
          </div>
        `;
      })
      .join('<hr class="my-2 border-secondary-light">');
  } catch {
    const el = document.getElementById('about-content');
    if (el) el.innerHTML = '<p class="text-red-500 font-body">Failed to load content.</p>';
  }
}

async function loadPartnersSection(base) {
  try {
    const data = await loadYaml(`${base}data/partners.yaml`);
    const contentEl = document.getElementById('partners-content');
    if (!contentEl) return;

    const introHtml = data.intro
      ? `<p class="font-body text-gray-600 text-center mb-8">${escapeHtml(data.intro)}</p>`
      : '';

    const partnersHtml = (data.partners || [])
      .map((partner) => {
        const img = `<img src="${base}images/${partner.logo}" alt="${escapeHtml(partner.name)}" class="partner-logo" onerror="this.parentElement.innerHTML='<span class=\\'font-body text-gray-500 text-sm\\'>${escapeHtml(partner.name)}</span>'" />`;
        if (partner.url) {
          return `<a href="${partner.url}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(partner.name)}">${img}</a>`;
        }
        return `<div title="${escapeHtml(partner.name)}">${img}</div>`;
      })
      .join('');

    contentEl.innerHTML = `
      ${introHtml}
      <div class="partners-grid">
        ${partnersHtml}
      </div>
    `;
  } catch {
    const el = document.getElementById('partners-content');
    if (el) el.innerHTML = '<p class="text-red-500 font-body">Failed to load partners.</p>';
  }
}

async function loadContactSection(base) {
  try {
    const config = await loadYaml(`${base}data/contact.yaml`);
    const contentEl = document.getElementById('contact-content');
    if (!contentEl) return;

    // Load embed URL from env var
    const embedUrl = import.meta.env.VITE_GOOGLE_FORM_EMBED_URL;

    const descriptionHtml = config.description
      ? `<p class="font-body text-gray-600 mb-8 text-center">${escapeHtml(config.description)}</p>`
      : '';

    const formSection =
      embedUrl && !embedUrl.includes('YOUR_FORM_ID')
        ? `
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <iframe
          src="${embedUrl}"
          width="100%"
          height="800"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="w-full"
          title="Contact Form"
        >Loading form...</iframe>
      </div>
    `
        : `
      <div class="border border-secondary-light rounded-lg p-6 text-center" style="background-color: #F8F8F8;">
        <p class="font-body text-primary-dark font-semibold mb-2">Contact Form Not Configured</p>
        <p class="font-body text-gray-500 text-sm">
          To display the contact form, add your Google Form embed URL to your
          <code class="bg-secondary-light px-1 rounded">.env</code> file.
          See MAINTENANCE.md for setup instructions.
        </p>
      </div>
    `;

    contentEl.innerHTML = descriptionHtml + formSection;
  } catch {
    const el = document.getElementById('contact-content');
    if (el) el.innerHTML = '<p class="text-red-500 font-body">Failed to load contact information.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
