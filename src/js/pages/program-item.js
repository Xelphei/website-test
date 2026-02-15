import { loadYaml } from '../utils/yaml.js';

export async function renderProgramItem(el, base, slug) {
  el.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <div id="program-item-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const data = await loadYaml(`${base}data/programs.yaml`);
    const contentEl = document.getElementById('program-item-content');

    // Find the item across all programs
    let foundItem = null;
    let foundProgram = null;
    for (const program of data.programs) {
      for (const item of program.items) {
        if (item.slug === slug) {
          foundItem = item;
          foundProgram = program;
          break;
        }
      }
      if (foundItem) break;
    }

    if (!foundItem) {
      contentEl.innerHTML = `
        <div class="text-center py-12">
          <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">Program Not Found</h1>
          <p class="font-body text-gray-500 mb-6">The program you're looking for doesn't exist.</p>
          <a href="#/programs" class="font-body text-primary-cyan hover:text-primary-blue underline">Back to Programs</a>
        </div>
      `;
      return;
    }

    // Build optional sections
    const detailsHtml = foundItem.details
      ? `
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Additional Details</h2>
          <p class="font-body text-gray-600 leading-relaxed">${escapeHtml(foundItem.details)}</p>
        </div>
      `
      : '';

    const volunteerHtml = foundItem.volunteer
      ? `
        <div class="program-item-section program-item-callout">
          <h2 class="font-heading text-xl font-bold mb-3" style="color: #00C2F3;">Call for Volunteers</h2>
          <p class="font-body text-gray-600 leading-relaxed">${escapeHtml(foundItem.volunteer)}</p>
          <a href="#/contact" class="program-item-cta">Get Involved &rarr;</a>
        </div>
      `
      : '';

    const linksHtml =
      foundItem.links && foundItem.links.length > 0
        ? `
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Links &amp; Resources</h2>
          <ul class="space-y-2">
            ${foundItem.links
              .map(
                (link) =>
                  `<li>
                    <a href="${escapeAttr(link.url)}" target="_blank" rel="noopener noreferrer" class="program-item-link">
                      ${escapeHtml(link.label || link.url)} <span class="text-xs">&nearr;</span>
                    </a>
                    ${link.description ? `<p class="font-body text-gray-500 text-sm mt-0.5">${escapeHtml(link.description)}</p>` : ''}
                  </li>`
              )
              .join('')}
          </ul>
        </div>
      `
        : '';

    const imagesHtml =
      foundItem.images && foundItem.images.length > 0
        ? `
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Photos</h2>
          <div class="program-item-gallery">
            ${foundItem.images
              .map(
                (img) =>
                  `<div class="program-item-gallery-item">
                    <img src="${base}images/${escapeAttr(img.src)}" alt="${escapeAttr(img.alt || '')}" class="rounded-lg w-full h-auto" />
                    ${img.caption ? `<p class="font-body text-sm text-gray-500 mt-1">${escapeHtml(img.caption)}</p>` : ''}
                  </div>`
              )
              .join('')}
          </div>
        </div>
      `
        : '';

    const faqHtml = buildFaqHtml(foundItem.faq);
    const experimentsHtml = buildExperimentsHtml(foundItem.experiments);
    const rolesHtml = buildRolesHtml(foundItem.roles);

    contentEl.innerHTML = `
      <nav class="font-body text-sm text-gray-400 mb-6">
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">Ongoing Programs</a>
        <span class="mx-2">/</span>
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">${escapeHtml(foundProgram.title)}</a>
        <span class="mx-2">/</span>
        <span class="text-primary-dark">${escapeHtml(foundItem.name)}</span>
      </nav>
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">${escapeHtml(foundItem.name)}</h1>
      <div class="font-body text-gray-600 leading-relaxed text-lg mb-8">
        <p>${escapeHtml(foundItem.description)}</p>
      </div>
      ${detailsHtml}
      ${volunteerHtml}
      ${experimentsHtml}
      ${rolesHtml}
      ${imagesHtml}
      ${faqHtml}
      ${linksHtml}
      <div class="border-t pt-6 mt-8" style="border-color: #E2E1EE;">
        <p class="font-body text-gray-500 text-sm">
          This program is part of our <strong>${escapeHtml(foundProgram.title)}</strong> initiative.
          <a href="#/contact" class="text-primary-cyan hover:text-primary-blue underline ml-1">Contact us</a> to learn more or get involved.
        </p>
      </div>
    `;

    // Initialize FAQ accordion interactivity
    initFaqAccordion();

    // Initialize experiment card filters
    initExperimentFilters();
  } catch {
    const el2 = document.getElementById('program-item-content');
    if (el2) el2.innerHTML = '<p class="text-red-500 font-body">Failed to load program details.</p>';
  }
}

/* ============================================
   FAQ Accordion
   ============================================ */
function buildFaqHtml(faq) {
  if (!faq || faq.length === 0) return '';

  return `
    <div class="program-item-section">
      <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Frequently Asked Questions</h2>
      <div class="faq-list">
        ${faq
          .map(
            (item, i) => `
          <div class="faq-item">
            <button class="faq-question" data-faq-index="${i}">
              <span>${escapeHtml(item.question)}</span>
              <svg class="faq-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="faq-answer" data-faq-answer="${i}">
              <p>${escapeHtml(item.answer)}</p>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

function initFaqAccordion() {
  const buttons = document.querySelectorAll('.faq-question');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-faq-index');
      const answer = document.querySelector(`.faq-answer[data-faq-answer="${index}"]`);
      const chevron = btn.querySelector('.faq-chevron');

      const isOpen = answer.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-answer').forEach((a) => a.classList.remove('open'));
      document.querySelectorAll('.faq-chevron').forEach((c) => c.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        answer.classList.add('open');
        chevron.classList.add('open');
      }
    });
  });
}

/* ============================================
   Experiment Cards with Filters
   ============================================ */
function buildExperimentsHtml(experiments) {
  if (!experiments || experiments.length === 0) return '';

  // Collect unique grades and time ranges for filter buttons
  const grades = new Set();
  const times = new Set();
  experiments.forEach((exp) => {
    if (exp.grade) grades.add(exp.grade);
    if (exp.time) times.add(exp.time);
  });

  const gradeFilters = [...grades]
    .map((g) => `<button class="experiment-filter-btn" data-filter-type="grade" data-filter-value="${escapeAttr(g)}">${escapeHtml(g)}</button>`)
    .join('');

  const timeFilters = [...times]
    .map((t) => `<button class="experiment-filter-btn" data-filter-type="time" data-filter-value="${escapeAttr(t)}">${escapeHtml(t)}</button>`)
    .join('');

  const hasFilters = grades.size > 0 || times.size > 0;

  const filtersHtml = hasFilters
    ? `
      <div class="experiment-filters">
        <button class="experiment-filter-btn active" data-filter-type="all" data-filter-value="all">All</button>
        ${gradeFilters}
        ${timeFilters}
      </div>
    `
    : '';

  const cardsHtml = experiments
    .map((exp) => {
      const tags = [];
      if (exp.grade) tags.push(exp.grade);
      if (exp.time) tags.push(exp.time);

      const stepsHtml = exp.steps && exp.steps.length > 0
        ? `
          <div class="mt-3">
            <p class="experiment-card-label">Student Steps</p>
            <ol class="experiment-card-steps">
              ${exp.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
            </ol>
          </div>
        `
        : '';

      const notesHtml = exp.teacherNotes
        ? `<div class="experiment-card-notes"><strong>Teacher Notes:</strong> ${escapeHtml(exp.teacherNotes)}</div>`
        : '';

      return `
        <div class="experiment-card" data-grade="${escapeAttr(exp.grade || '')}" data-time="${escapeAttr(exp.time || '')}">
          <div class="experiment-card-header">
            <h3 class="experiment-card-title">${escapeHtml(exp.title)}</h3>
            ${tags.length > 0 ? `<div class="experiment-card-meta">${tags.map((t) => `<span class="experiment-card-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
          </div>
          <div class="experiment-card-body">
            <p>${escapeHtml(exp.description)}</p>
            ${stepsHtml}
            ${notesHtml}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="program-item-section">
      <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Experiment Cards</h2>
      ${filtersHtml}
      <div class="experiment-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

function initExperimentFilters() {
  const filterBtns = document.querySelectorAll('.experiment-filter-btn');
  const cards = document.querySelectorAll('.experiment-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.getAttribute('data-filter-type');
      const value = btn.getAttribute('data-filter-value');

      cards.forEach((card) => {
        if (type === 'all') {
          card.classList.remove('hidden-card');
        } else {
          const cardValue = card.getAttribute(`data-${type}`);
          if (cardValue === value) {
            card.classList.remove('hidden-card');
          } else {
            card.classList.add('hidden-card');
          }
        }
      });
    });
  });
}

/* ============================================
   Volunteer Role Cards
   ============================================ */
function buildRolesHtml(roles) {
  if (!roles || roles.length === 0) return '';

  const cardsHtml = roles
    .map((role) => {
      const responsibilitiesHtml =
        role.responsibilities && role.responsibilities.length > 0
          ? `
          <div>
            <p class="role-card-section-label">Responsibilities</p>
            <ul class="role-card-list">
              ${role.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
            </ul>
          </div>
        `
          : '';

      const perksHtml =
        role.perks && role.perks.length > 0
          ? `
          <div>
            <p class="role-card-section-label">Perks</p>
            <ul class="role-card-perks">
              ${role.perks.map((p) => `<li>&#10003; ${escapeHtml(p)}</li>`).join('')}
            </ul>
          </div>
        `
          : '';

      return `
        <div class="role-card">
          <div class="role-card-header">
            <h3 class="role-card-title">${escapeHtml(role.title)}</h3>
          </div>
          <div class="role-card-body">
            ${role.description ? `<p class="font-body text-sm text-gray-600 mb-3">${escapeHtml(role.description)}</p>` : ''}
            ${responsibilitiesHtml}
            ${perksHtml}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="program-item-section">
      <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Volunteer Roles</h2>
      <div class="role-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

/* ============================================
   Utility Functions
   ============================================ */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
