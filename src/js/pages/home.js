import { loadYaml } from '../utils/yaml.js';
import { renderMarkdown } from '../utils/markdown.js';

export async function renderHome(el, base, siteConfig) {
  const heroSelections = siteConfig.heroSelections || [];

  const buttonsHtml = heroSelections
    .map((item) => {
      if (item.scrollTo) {
        return `<a href="#/" data-scroll-to="${item.scrollTo}" class="hero-button">${item.label}</a>`;
      }
      return `<a href="#${item.path}" class="hero-button">${item.label}</a>`;
    })
    .join('');

  el.innerHTML = `
    <!-- Hero Section -->
    <div class="home-hero" style="background-image: url('${base}images/hero-bg.jpg')">
      <div class="home-hero-overlay"></div>
      <div class="home-hero-content">
        <h1 class="home-hero-title">${siteConfig.name}</h1>
        <div class="home-hero-buttons">
          ${buttonsHtml}
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Scroll</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>

    <!-- About Section -->
    <section id="about-section" class="home-section bg-white">
      <div class="max-w-4xl mx-auto px-4 py-16">
        <div class="prose max-w-none" id="about-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>

    <!-- Programs Section -->
    <section id="programs-section" class="home-section" style="background-color: #F8F8F8;">
      <div class="max-w-6xl mx-auto px-4 py-16">
        <h2 class="font-heading text-3xl font-bold text-primary-dark text-center mb-10">Ongoing Programs</h2>
        <div id="programs-content">
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

  // Load about content
  loadAboutSection(base);
  // Load programs
  loadProgramsSection(base);
  // Load contact
  loadContactSection(base);
}

async function loadAboutSection(base) {
  try {
    const html = await renderMarkdown(`${base}content/about.md`);
    const el = document.getElementById('about-content');
    if (el) el.innerHTML = html;
  } catch {
    const el = document.getElementById('about-content');
    if (el) el.innerHTML = '<p class="text-red-500 font-body">Failed to load content.</p>';
  }
}

async function loadProgramsSection(base) {
  try {
    const data = await loadYaml(`${base}data/programs.yaml`);
    const contentEl = document.getElementById('programs-content');
    if (!contentEl) return;

    let selectedId = null;

    function render() {
      contentEl.innerHTML = `
        <div class="programs-horizontal">
          ${data.programs
            .map((program) => {
              const isSelected = selectedId === program.id;
              return `
                <div class="program-card ${isSelected ? 'selected' : ''}" data-program-id="${program.id}">
                  <div class="program-card-image">
                    <img
                      src="${base}images/${program.image}"
                      alt="${escapeHtml(program.title)}"
                      onerror="this.parentElement.innerHTML='<div class=\\'program-card-image-fallback\\'>${escapeHtml(program.title.charAt(0))}</div>'"
                    />
                    <div class="program-card-overlay">
                      <h3 class="font-heading text-xl font-bold text-white">${escapeHtml(program.title)}</h3>
                      <p class="font-body text-sm text-gray-200 mt-1">${escapeHtml(program.summary)}</p>
                    </div>
                  </div>
                  <div class="program-card-body">
                    <h3 class="font-heading text-lg font-bold text-primary-dark">${escapeHtml(program.title)}</h3>
                    <p class="font-body text-sm text-gray-500 mt-1">${escapeHtml(program.summary)}</p>
                  </div>
                  ${isSelected ? `
                    <div class="program-card-expanded">
                      ${program.items
                        .map(
                          (item) => `
                        <div class="program-expanded-item">
                          <h4 class="font-body font-semibold text-primary-dark">${escapeHtml(item.name)}</h4>
                          <p class="font-body text-gray-600 text-sm mt-1">${escapeHtml(item.description)}</p>
                          ${item.link
                            ? `<a href="${item.link}" class="font-body text-primary-cyan hover:text-primary-blue text-sm mt-1 inline-block">Learn more &rarr;</a>`
                            : item.scrollTo
                              ? `<a href="#/" data-scroll-to="${item.scrollTo}" class="font-body text-primary-cyan hover:text-primary-blue text-sm mt-1 inline-block">Learn more &rarr;</a>`
                              : item.slug
                                ? `<a href="#/programs/${item.slug}" class="font-body text-primary-cyan hover:text-primary-blue text-sm mt-1 inline-block" onclick="event.stopPropagation()">Learn more &rarr;</a>`
                                : ''}
                        </div>
                      `
                        )
                        .join('')}
                    </div>
                  ` : ''}
                </div>
              `;
            })
            .join('')}
        </div>
      `;

      // Attach click handlers
      contentEl.querySelectorAll('.program-card').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.programId;
          selectedId = selectedId === id ? null : id;
          render();
        });
      });
    }

    render();
  } catch {
    const el = document.getElementById('programs-content');
    if (el) el.innerHTML = '<p class="text-red-500 font-body">Failed to load programs.</p>';
  }
}

async function loadContactSection(base) {
  try {
    const config = await loadYaml(`${base}data/contact.yaml`);
    const contentEl = document.getElementById('contact-content');
    if (!contentEl) return;

    const descriptionHtml = config.description
      ? `<p class="font-body text-gray-600 mb-8 text-center">${escapeHtml(config.description)}</p>`
      : '';

    const formSection =
      config.embedUrl && !config.embedUrl.includes('YOUR_FORM_ID')
        ? `
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <iframe
          src="${config.embedUrl}"
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
          To display the contact form, add your Google Form embed URL to
          <code class="bg-secondary-light px-1 rounded">public/data/contact.yaml</code>.
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
