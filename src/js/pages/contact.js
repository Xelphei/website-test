import { loadYaml } from '../utils/yaml.js';

export async function renderContact(el, base) {
  el.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-16" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark text-center mb-8">Contact Us</h1>
      <div id="contact-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;

  try {
    const config = await loadYaml(`${base}data/contact.yaml`);
    const contentEl = document.getElementById('contact-content');
    if (!contentEl) return;

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
    const contentEl = document.getElementById('contact-content');
    if (contentEl) contentEl.innerHTML = '<p class="text-red-500 font-body">Failed to load contact information.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
