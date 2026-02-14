# Website Maintenance Guide

This guide explains how to update and maintain the Organization Professional Chapter website. You do **not** need to be a programmer to make most changes — just edit the YAML or Markdown files described below, push to the `main` branch, and the site will deploy automatically.

---

## Project Structure

```
website-test/
├── public/
│   ├── content/           # Markdown text content
│   │   ├── home.md        # (kept for reference — no longer rendered on home page)
│   │   └── about.md       # About page text
│   ├── data/              # YAML data files (edit these to change data)
│   │   ├── site.yaml      # Org name, navigation, socials, footer
│   │   ├── board.yaml     # Executive board + founding members
│   │   ├── programs.yaml  # Ongoing programs (K-12, PD, Social)
│   │   ├── news.yaml      # Chapter news / announcements
│   │   ├── events.yaml    # Google Calendar API config
│   │   ├── gallery.yaml   # Gallery photo entries
│   │   └── contact.yaml   # Google Form embed config
│   └── images/
│       ├── hero-bg.jpg        # Home page hero background image
│       ├── logo.png           # Organization logo
│       ├── board/             # Board member headshots
│       ├── board/founding/    # Founding member photos
│       ├── gallery/           # Gallery photos
│       └── news/              # News article images
├── src/
│   ├── css/style.css          # Styles
│   └── js/                    # Application code
├── index.html                 # Entry point
└── .github/workflows/         # Auto-deployment
```

---

## Quick Reference: What to Edit

| I want to...                        | Edit this file                      |
|--------------------------------------|-------------------------------------|
| Change the organization name         | `public/data/site.yaml` → `name`   |
| Update navigation links              | `public/data/site.yaml` → `floatingNav` |
| Change the About page text           | `public/content/about.md`          |
| Add/remove a board member            | `public/data/board.yaml`           |
| Add a founding member                | `public/data/board.yaml` → `founding` |
| Add a program or activity            | `public/data/programs.yaml`        |
| Post a news item                     | `public/data/news.yaml`            |
| Add gallery photos                   | `public/data/gallery.yaml` + image file |
| Change the hero background image     | Replace `public/images/hero-bg.jpg`|
| Change the logo                      | Replace `public/images/logo.png`   |
| Configure events calendar            | `public/data/events.yaml`          |
| Configure contact form               | `public/data/contact.yaml`         |
| Update social media links            | `public/data/site.yaml` → `socials`|
| Change footer tagline                | `public/data/site.yaml` → `footer.tagline` |

---

## Editing the About Page

Edit `public/content/about.md`. This file uses Markdown:

```markdown
# About Us

Our chapter is dedicated to...

## Our Mission

We aim to...

## Membership

Join us by [contacting us](#/contact).
```

### Markdown Syntax Quick Reference
- `# Heading 1`, `## Heading 2`, `### Heading 3`
- `**bold text**`, `*italic text*`
- `- bullet point`
- `1. numbered item`
- `[link text](url)` for external links
- `[link text](#/about)` for internal page links

---

## Updating the Executive Board

Edit `public/data/board.yaml`.

### Adding a Current Board Member

1. Add a headshot photo to `public/images/board/` (recommended: 400×400 pixels, square)
2. Add an entry under `current:` in `board.yaml`:

```yaml
current:
  - name: Full Name
    title: Board Title (e.g., President)
    photo: board/filename.jpg
    bio: A short biography sentence.
    linkedin: https://linkedin.com/in/username    # optional
    website: https://their-website.com             # optional
```

### Adding a Founding Chapter Member

1. Add a photo to `public/images/board/founding/`
2. Add an entry under `founding:` in `board.yaml`:

```yaml
founding:
  - name: Dr. Full Name
    photo: board/founding/filename.jpg
    bio: Description of their founding role.
    linkedin: https://linkedin.com/in/username    # optional
    website: https://example.com                   # optional
```

### Updating Previous Boards

Edit the `previous:` section:

```yaml
previous:
  year: 2024-2025
  members:
    - name: Full Name
      title: Board Title
```

### Removing a Board Member

Delete the entire block for that person (from the `- name:` line to just before the next `- name:` or the next section).

---

## Managing Ongoing Programs

Edit `public/data/programs.yaml`. Programs appear as expandable accordion cards.

### Adding a New Program Bucket

Add a new entry at the top level:

```yaml
programs:
  - id: unique-id          # lowercase, no spaces (e.g., "community-service")
    title: Program Name
    summary: One-line description shown when hovering over the collapsed card.
    items:
      - name: Activity Name
        description: What this activity is about.
        link: "#/contact"   # optional — adds a "Learn more" link
```

### Adding an Activity to an Existing Bucket

Find the program bucket and add a new item under `items:`:

```yaml
    items:
      - name: New Activity
        description: Description of the activity.
```

### Removing a Program or Activity

Delete the entire block for that program or item.

---

## Posting Chapter News

Edit `public/data/news.yaml`. News items display as image cards in a responsive grid.

### Adding a News Item

1. Add an image to `public/images/news/` (recommended: landscape, ~800×600 pixels)
2. Add an entry to `news.yaml` (newest items first):

```yaml
newsItems:
  - image: news/my-photo.jpg
    title: Headline of the News
    description: A paragraph describing the news or achievement.
    date: 2025-12-01
```

### Removing a News Item

Delete the entire block (from `- image:` to just before the next `- image:` or end of file).

---

## Updating the Gallery

Edit `public/data/gallery.yaml`.

### Adding Gallery Photos

1. Add the photo to `public/images/gallery/` (recommended: max ~1MB each)
2. Add a new entry to `gallery.yaml`:

```yaml
photos:
  - path: gallery/photo-name.jpg
    caption: Description of the photo
    date: 2025-09-15
```

Photos display in a staggered masonry layout. Hovering shows the caption overlay. Clicking opens a full-screen lightbox.

---

## Changing the Hero Background Image

Replace the file `public/images/hero-bg.jpg` with your new image.

- **Recommended size**: 1920×1080 pixels or larger
- **Format**: JPEG for best compression
- **Keep the same filename** (`hero-bg.jpg`) so no code changes are needed

If the hero area looks too dark or too light, the overlay opacity can be adjusted in `src/css/style.css` — look for `.home-hero-overlay` and change the `rgba(0, 0, 0, 0.55)` value (higher = darker).

---

## Event Categories

Events are pulled from Google Calendar. The event **title** determines its category color on the timeline. Add a tag in square brackets at the start of the event title:

| Tag in Title       | Category    | Color  |
|--------------------|-------------|--------|
| `[Volunteer] ...`  | Volunteer   | Green  |
| `[Meeting] ...`    | Meeting     | Blue   |
| `[Social] ...`     | Social      | Amber  |
| `[Workshop] ...`   | Workshop    | Purple |
| `[Conference] ...` | Conference  | Red    |
| *(no tag)*         | General     | Gray   |

**Example calendar event titles:**
- `[Social] End-of-Year Holiday Party`
- `[Meeting] Monthly Board Meeting`
- `[Volunteer] Science Demo at Lincoln Elementary`

The tag is automatically removed from the displayed title.

---

## Setting Up Google Calendar Events

### Step 1: Create a Google Cloud API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Calendar API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Restrict the key to **Google Calendar API** only

### Step 2: Make Your Calendar Public
1. Open Google Calendar
2. Go to **Settings** → select your calendar
3. Under **Access permissions**, check "Make available to public"
4. Copy the **Calendar ID** from the "Integrate calendar" section

### Step 3: Update Configuration
Edit `public/data/events.yaml`:
```yaml
calendarId: your-calendar-id@group.calendar.google.com
apiKey: AIzaSy...your-api-key
maxResults: 10
```

---

## Setting Up the Contact Form

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create your form with desired fields
3. To receive email notifications: go to **Responses** → three-dot menu → **Get email notifications for new responses**

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

---

## Updating Site Configuration

Edit `public/data/site.yaml` to change:

- **Organization name**: `name` field (appears in nav, footer, hero)
- **Hero buttons**: `heroSelections` array (the 3 buttons on the home page)
- **Navigation links**: `floatingNav` array (all links in the floating nav bar)
- **Social media links**: `socials` array
- **Footer tagline**: `footer.tagline`

### Adding a Navigation Link

Add a new entry to the `floatingNav` array:

```yaml
floatingNav:
  - label: New Page
    path: /new-page
```

For external links (opens in a new tab):

```yaml
  - label: External Site
    path: https://example.com
    external: true
```

---

## Updating the Logo

Replace `public/images/logo.png` with your new logo. Recommended: square image, at least 200×200 pixels. Keep the same filename.

---

## Deployment

The site deploys automatically when you push to the `main` branch via GitHub Actions.

### Local Development
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).

### Manual Build
```bash
npm run build
```
The built site will be in the `dist/` folder.

---

## How the Website Works (Overview)

- **Home page**: Full-screen hero image with the chapter name and three buttons. A floating navigation bar appears when you scroll down (or immediately on other pages).
- **About**: Renders the Markdown content from `about.md`.
- **Ongoing Programs**: Accordion-style cards loaded from `programs.yaml`.
- **Chapter News**: Gallery of image cards from `news.yaml`.
- **Events**: Horizontal scrollable timeline of events from Google Calendar, color-coded by category.
- **Executive Board**: Card grid of current members, founding members, and previous board list.
- **Gallery**: Masonry photo grid with hover overlays and lightbox viewing.
- **Contact**: Google Form embed.

All page transitions use a smooth fade-out/fade-in animation.
