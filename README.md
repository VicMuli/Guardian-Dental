# Guardian Dental — Website

A modern dental clinic website built with **Vite + React + TypeScript** and managed via **Decap CMS**.

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → Opens at http://localhost:5173
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About the clinic |
| `/services` | Services offered |
| `/team` | Meet the team |
| `/blog` | Blog posts (CMS-managed) |
| `/podcasts` | Podcast episodes (CMS-managed) |
| `/gallery` | Photo gallery (CMS-managed) |
| `/contact` | Contact details |
| `/book` | Book an appointment |

---

## Content Management (Decap CMS)

### One-Time Netlify Setup

> Complete these steps **once** after deploying to Netlify.

1. **Netlify Dashboard → Site Settings → Identity** → click **Enable Identity**
2. **Identity → Services** → click **Enable Git Gateway**
3. **Identity → Registration preferences** → set to **Invite only**
4. **Identity → Users** → **Invite users** → enter the clinic owner's email

### Accessing the CMS

Visit `https://your-site.netlify.app/admin/` and log in with the invited email.

### Update `site_url` in CMS Config

Open `public/admin/config.yml` and set:

```yaml
site_url: https://your-actual-site-name.netlify.app
```

---

## Content Structure

All CMS-managed content lives in the `content/` folder as Markdown files with YAML frontmatter.

```
content/
  blog/          ← Blog posts (.md)
  podcasts/      ← Podcast episodes (.md)
  gallery/       ← Photo gallery collections (.md)

public/
  uploads/       ← Media uploads from CMS (images, audio)
  admin/
    index.html   ← CMS panel entry point
    config.yml   ← CMS configuration
```

### Blog Post Fields
`title` · `date` · `description` · `author` · `tags` · `thumbnail` · `body` (markdown)

### Podcast Episode Fields
`title` · `date` · `episode` · `description` · `guest` · `duration` · `audio` · `thumbnail` · `body` (show notes)

### Gallery Collection Fields
`title` · `category` · `description` · `order` · `images[]` (image, caption, alt)

---

## Build for Production

```bash
npm run build
# Output goes to /dist — deploy this folder to Netlify
```

---

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- [Decap CMS](https://decapcms.org/) for content management
- [gray-matter](https://github.com/jonschlinkert/gray-matter) + [marked](https://marked.js.org/) for Markdown parsing
- [React Router](https://reactrouter.com/) (Hash routing)
- [Lucide React](https://lucide.dev/) icons
