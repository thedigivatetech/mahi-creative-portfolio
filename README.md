# Syed Hussain — Creative Director & Video Editor Portfolio

Official portfolio website for **Syed Hussain** (`syedhussainmahi.com`), showcasing video editing, short-form reels, creative direction, graphic design, advertising campaigns, and digital solutions.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 3
- **Animation:** Framer Motion (with `prefers-reduced-motion` support)
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **Linting:** Oxlint

## Project Structure

```text
Mahi-Portfolio/
├── .gitignore
├── README.md
└── website-source/          # Main Vite + React + TypeScript application
    ├── index.html           # SEO metadata, Open Graph, JSON-LD structured data
    ├── package.json
    ├── public/
    │   ├── images/          # Profile, thumbnails, case studies & graphic design assets
    │   ├── portfolio/       # Portfolio media & compressed showcase videos
    │   ├── favicon/         # Site favicon
    │   ├── robots.txt
    │   └── sitemap.xml
    ├── scripts/             # Asset verification & media inspection utilities
    └── src/
        ├── components/      # Reusable UI, gallery, video player & modal components
        ├── data/            # Centralised portfolio, services, blog & project data
        ├── hooks/           # Custom hooks (SEO meta tags, utilities)
        ├── pages/           # Home, Project Detail, Admin pages
        ├── sections/        # Page sections (Hero, Work, Services, Process, About, Contact)
        └── styles/          # Global styles & design tokens
```

## Getting Started

All application commands are run from inside the `website-source/` directory.

### 1. Install Dependencies

```bash
cd website-source
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The site will start locally at `http://localhost:5173/`.

### 3. Build for Production

```bash
npm run build
```

This runs TypeScript type-checking (`tsc -b`) followed by `vite build`, outputting the production bundle to `website-source/dist/`.

To preview the production build locally:

```bash
npm run preview
```

### 4. Verify Portfolio Media Assets

```bash
node scripts/verify-project-media.cjs
```

## Notes for Deployment

- Update `PRODUCTION_DOMAIN` or environment-specific values if migrating domains (currently configured for `syedhussainmahi.com`).
- Never commit `.env` files, API keys, or private client documents.
- Raw uncompressed `.mp4` files in `website-source/public/portfolio/videos/` are excluded via `.gitignore` to keep the repository within GitHub file-size limits; the site serves the web-optimised files in `website-source/public/portfolio/videos/compressed/`.
