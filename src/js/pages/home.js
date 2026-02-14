export async function renderHome(el, base, siteConfig) {
  const heroSelections = siteConfig.heroSelections || [];

  const buttonsHtml = heroSelections
    .map(
      (item) =>
        `<a href="#${item.path}" class="hero-button">${item.label}</a>`
    )
    .join('');

  el.innerHTML = `
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
  `;

  // Trigger fade-in animations after render
  setTimeout(() => {
    const hero = el.querySelector('.home-hero');
    if (hero) {
      hero.classList.add('fade-in-active');
    }
  }, 50);
}
