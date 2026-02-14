import { loadYaml } from '../utils/yaml.js';

export async function renderContact(el, base, siteConfig) {
  el.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <div id="contact-content">
        <div class="text-center py-8 text-gray-400">Loading...</div>
      </div>
    </div>
  `;

  try {
    const config = await loadYaml(`${base}data/contact.yaml`);
    const contentEl = document.getElementById('contact-content');

    const descriptionHtml = config.description
      ? `<p class="text-gray-600 mb-8">${escapeHtml(config.description)}</p>`
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
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p class="text-yellow-800 font-semibold mb-2">Contact Form Not Configured</p>
        <p class="text-yellow-600 text-sm">
          To display the contact form, add your Google Form embed URL to
          <code class="bg-yellow-100 px-1 rounded">public/data/contact.yaml</code>.
          See MAINTENANCE.md for setup instructions.
        </p>
      </div>
    `;

    contentEl.innerHTML = descriptionHtml + formSection;
  } catch {
    document.getElementById('contact-content').innerHTML =
      '<p class="text-red-500">Failed to load contact information.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
