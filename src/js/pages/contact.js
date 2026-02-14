import { loadYaml } from '../utils/yaml.js';

export async function renderContact(el, base, siteConfig) {
  el.innerHTML = `
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
    <div id="contact-content">
      <div class="text-center py-8 text-gray-400">Loading...</div>
    </div>
  `;

  try {
    const config = await loadYaml(`${base}data/contact.yaml`);
    const contentEl = document.getElementById('contact-content');

    const contactInfo =
      siteConfig.contact?.email || siteConfig.contact?.phone
        ? `
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
        ${config.description ? `<p class="text-gray-600 mb-4">${escapeHtml(config.description)}</p>` : ''}
        <div class="flex flex-col sm:flex-row gap-4 text-gray-600">
          ${siteConfig.contact?.email ? `<div class="flex items-center gap-2"><span class="font-medium">Email:</span> <a href="mailto:${siteConfig.contact.email}" class="text-primary-600 hover:text-primary-800">${siteConfig.contact.email}</a></div>` : ''}
          ${siteConfig.contact?.phone ? `<div class="flex items-center gap-2"><span class="font-medium">Phone:</span> ${siteConfig.contact.phone}</div>` : ''}
        </div>
      </div>
    `
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

    contentEl.innerHTML = contactInfo + formSection;
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
