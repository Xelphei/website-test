import { loadYaml } from '../utils/yaml.js';

export async function renderHome(el, base, siteConfig) {
  const heroSelections = siteConfig.heroSelections || [];

  const buttonsHtml = heroSelections
    .map((item) => {
      const bgColor = item.color || '#18428F';
      if (item.scrollTo) {
        return `<a href="#/" data-scroll-to="${item.scrollTo}" class="hero-bar-button" style="background-color: ${bgColor}">${item.label}</a>`;
      }
      if (item.path) {
        return `<a href="#${item.path}" class="hero-bar-button" style="background-color: ${bgColor}">${item.label}</a>`;
      }
      return `<a href="#/" class="hero-bar-button" style="background-color: ${bgColor}">${item.label}</a>`;
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

    <!-- About Section (5 subsections with color circles) -->
    <section id="about-section" class="home-section bg-white">
      <div class="about-section-container">
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
  `;

  // Trigger hero fade-in
  setTimeout(() => {
    const hero = el.querySelector('.home-hero');
    if (hero) hero.classList.add('fade-in-active');
  }, 50);

  // Load sections
  loadAboutSection(base);
  loadPartnersSection(base);
}

async function loadAboutSection(base) {
  try {
    const data = await loadYaml(`${base}data/about.yaml`);
    const contentEl = document.getElementById('about-content');
    if (!contentEl || !data.subsections) return;

    contentEl.innerHTML = data.subsections
      .map((sub, index) => {
        const isReverse = index % 2 === 1;
        const circleColor = sub.color || '#18428F';
        const subtitleHtml = sub.subtitle
          ? `<p class="font-body text-sm text-primary-cyan font-semibold mb-2">${escapeHtml(sub.subtitle)}</p>`
          : '';

        return `
          <div class="about-subsection ${isReverse ? 'reverse' : ''}">
            <div class="about-subsection-circle" style="background-color: ${circleColor}"></div>
            <div class="about-subsection-text-box" style="border: 2px solid ${circleColor}">
              <h3 class="font-heading text-2xl font-bold mb-2" style="color: ${circleColor}">${escapeHtml(sub.title)}</h3>
              ${subtitleHtml}
              <p class="font-body text-gray-600 leading-relaxed">${escapeHtml(sub.description)}</p>
            </div>
          </div>
        `;
      })
      .join('');
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
        return `<span class="partner-name">${escapeHtml(partner.name)}</span>`;
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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
