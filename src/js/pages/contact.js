import { loadYaml } from '../utils/yaml.js';

export async function renderContact(el, base) {
  el.innerHTML = `
    <div class="max-w-3xl mx-auto px-4 py-16" style="margin-top: 60px;">
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

    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    const ccEmails = import.meta.env.VITE_CONTACT_CC_EMAILS || '';

    const descriptionHtml = config.description
      ? `<p class="font-body text-gray-600 mb-8 text-center">${escapeHtml(config.description)}</p>`
      : '';

    if (!contactEmail || contactEmail.includes('your-email@example.com')) {
      contentEl.innerHTML = `
        ${descriptionHtml}
        <div class="border border-secondary-light rounded-lg p-6 text-center" style="background-color: #F8F8F8;">
          <p class="font-body text-primary-dark font-semibold mb-2">Contact Form Not Configured</p>
          <p class="font-body text-gray-500 text-sm">
            To display the contact form, add your email address to the
            <code class="bg-secondary-light px-1 rounded">VITE_CONTACT_EMAIL</code> variable in your
            <code class="bg-secondary-light px-1 rounded">.env</code> file.
            See MAINTENANCE.md for setup instructions.
          </p>
        </div>
      `;
      return;
    }

    const ccInput = ccEmails
      ? `<input type="hidden" name="_cc" value="${escapeAttr(ccEmails)}" />`
      : '';

    contentEl.innerHTML = `
      ${descriptionHtml}
      <form
        action="https://formsubmit.co/${escapeAttr(contactEmail)}"
        method="POST"
        class="contact-form"
        id="contact-form"
      >
        <!-- FormSubmit configuration -->
        <input type="hidden" name="_subject" value="New Contact Form Submission" />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_honey" style="display:none" />
        ${ccInput}

        <div class="contact-form-group">
          <label for="name" class="contact-form-label">Name <span class="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            class="contact-form-input"
          />
        </div>

        <div class="contact-form-group">
          <label for="email" class="contact-form-label">Email <span class="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your.email@example.com"
            class="contact-form-input"
          />
        </div>

        <div class="contact-form-group">
          <label for="subject" class="contact-form-label">Subject</label>
          <input
            type="text"
            id="subject"
            name="_subject"
            placeholder="What is this about?"
            class="contact-form-input"
          />
        </div>

        <div class="contact-form-group">
          <label for="message" class="contact-form-label">Message <span class="text-red-500">*</span></label>
          <textarea
            id="message"
            name="message"
            required
            rows="6"
            placeholder="Your message..."
            class="contact-form-textarea"
          ></textarea>
        </div>

        <button type="submit" class="contact-form-button">
          Send Message
        </button>
      </form>
    `;
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

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
