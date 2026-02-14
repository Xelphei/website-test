# Website Maintenance Guide

This guide explains how to update and maintain the organization's website.

## Project Structure

```
website-test/
├── public/
│   ├── content/           # Markdown content (edit these to change page text)
│   │   ├── home.md
│   │   ├── about.md
│   │   └── awards.md
│   ├── data/              # YAML configuration (edit these to change data)
│   │   ├── site.yaml      # Org name, navigation, socials, footer
│   │   ├── board.yaml     # Board members
│   │   ├── events.yaml    # Google Calendar API config
│   │   ├── gallery.yaml   # Gallery photo entries
│   │   └── contact.yaml   # Google Form embed config
│   └── images/
│       ├── board/         # Board member headshots
│       ├── gallery/       # Gallery photos
│       └── logo.png       # Organization logo
├── src/
│   ├── css/style.css      # Styles
│   └── js/                # Application code
├── index.html             # Entry point
└── .github/workflows/     # Auto-deployment
```

## Editing Page Content

Page content is written in Markdown files located in `public/content/`.

### Home Page (`public/content/home.md`)
Edit this file to change the home page text, mission statement, and quick links.

### About Page (`public/content/about.md`)
Edit this file to update the organization history, values, and membership info.

### Awards Page (`public/content/awards.md`)
Edit this file to update award descriptions and past recipients.

### Markdown Syntax Quick Reference
- `# Heading 1`, `## Heading 2`, `### Heading 3`
- `**bold text**`, `*italic text*`
- `- bullet point`
- `1. numbered item`
- `[link text](url)`
- `[link to page](#/about)` for internal links

## Updating Board Members

Edit `public/data/board.yaml`:

```yaml
current:
  - name: Full Name
    title: Board Title
    photo: board/filename.jpg    # Photo in public/images/board/
    bio: Short biography text.

previous:
  year: 2024-2025
  members:
    - name: Full Name
      title: Board Title
```

### Adding a Board Member Photo
1. Add the headshot image to `public/images/board/`
2. Use a descriptive filename (e.g., `jane-smith.jpg`)
3. Recommended size: 400x400 pixels, square aspect ratio
4. Update the `photo` field in `board.yaml` to match the filename

## Updating the Gallery

Edit `public/data/gallery.yaml`:

```yaml
photos:
  - path: gallery/photo-name.jpg
    caption: Description of the photo
    date: 2025-09-15
```

### Adding Gallery Photos
1. Add the photo to `public/images/gallery/`
2. Add a new entry to `gallery.yaml` with the path, caption, and date
3. Recommended: optimize images before uploading (max ~1MB each)

## Setting Up Google Calendar Events

The events page displays upcoming events from a public Google Calendar.

### Step 1: Create a Google Cloud API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Calendar API**
4. Go to **Credentials** > **Create Credentials** > **API Key**
5. Restrict the key to **Google Calendar API** only

### Step 2: Make Your Calendar Public
1. Open Google Calendar
2. Go to **Settings** > select your calendar
3. Under **Access permissions**, check "Make available to public"
4. Copy the **Calendar ID** from the "Integrate calendar" section

### Step 3: Update Configuration
Edit `public/data/events.yaml`:
```yaml
calendarId: your-calendar-id@group.calendar.google.com
apiKey: AIzaSy...your-api-key
maxResults: 10
```

## Setting Up the Contact Form

The contact page embeds a Google Form.

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create your form with desired fields
3. To receive email notifications: go to **Responses** > three-dot menu > **Get email notifications for new responses**

### Step 2: Get the Embed URL
1. Click **Send** in the form editor
2. Click the embed icon (`<>`)
3. Copy the `src` URL from the iframe code

### Step 3: Update Configuration
Edit `public/data/contact.yaml`:
```yaml
embedUrl: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
description: Your description text here.
```

## Updating Site Configuration

Edit `public/data/site.yaml` to change:

- **Organization name**: `name` field
- **Navigation links**: `nav` array
- **Social media links**: `socials` array
- **Footer tagline**: `footer.tagline`
- **Contact info**: `contact.email` and `contact.phone`

## Adding a New Page

1. Create a Markdown file in `public/content/` (e.g., `resources.md`)
2. Create a page renderer in `src/js/pages/` (e.g., `resources.js`):
   ```js
   import { renderMarkdown } from '../utils/markdown.js';

   export async function renderResources(el, base) {
     el.innerHTML = `<div class="prose max-w-none" id="resources-content">Loading...</div>`;
     const html = await renderMarkdown(`${base}content/resources.md`);
     document.getElementById('resources-content').innerHTML = html;
   }
   ```
3. Import and register the route in `src/js/main.js`:
   ```js
   import { renderResources } from './pages/resources.js';
   // In the routes object:
   '/resources': (el) => renderResources(el, BASE),
   ```
4. Add navigation entry in `public/data/site.yaml`:
   ```yaml
   nav:
     - label: Resources
       path: /resources
   ```

## Deployment

The site deploys automatically when you push to the `main` branch via GitHub Actions.

### Manual Deployment
```bash
npm run build
```
The built site will be in the `dist/` folder.

### Local Development
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).

## Updating the Logo

Replace `public/images/logo.png` with your new logo. Recommended: square image, at least 200x200 pixels.

## GitHub Pages Setup

1. Go to your repository **Settings** > **Pages**
2. Under **Build and deployment**, select **GitHub Actions** as the source
3. Push to `main` to trigger the first deploy
