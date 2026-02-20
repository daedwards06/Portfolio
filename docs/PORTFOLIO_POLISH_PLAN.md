# Portfolio Polish Plan — Pre-Swap Fixes & Improvements

> Generated: 2026-02-20
> Target executor: Copilot agent mode (Claude Sonnet 4.6)
> Target outcome: Address all remaining gaps identified during portfolio review so the site is **swap-ready** — content-rich, bug-free, and visually finished.
> Prerequisite: Completed phases 0–2 of `PORTFOLIO_REBUILD_PLAN.md`
> Estimated effort: 1 focused session

---

## Table of Contents

1. [Phase 4: Bug Fixes](#phase-4-bug-fixes)
2. [Phase 5: Content Depth](#phase-5-content-depth)
3. [Phase 5.5: Multi-Project Routing & Navigation](#phase-55-multi-project-routing--navigation)
4. [Phase 6: Structural Additions](#phase-6-structural-additions)
5. [Phase 7: SEO & Final Polish](#phase-7-seo--final-polish)
6. [Phase 8: Assets & Decisions (Owner)](#phase-8-assets--decisions-owner)

---

## Phase 4: Bug Fixes

**Goal:** Eliminate broken behavior before adding anything new.

### Task 4.1: Fix Content Duplication on Project Page

**Why:** The project page currently renders the first line of the MARS markdown body as a plain-text excerpt *and* then renders the full markdown content (which includes that same first line) below the `<hr>`. The opening paragraph appears twice.

**Checklist:**
- [ ] Remove the raw `featured.body.trim().split('\n')[0]` line from `src/pages/project.astro`
- [ ] Replace it with `featured.data.title` context or remove the paragraph entirely (the `<FeaturedContent />` already renders everything)
- [ ] Verify the project page renders cleanly with no repeated text

**Prompt for Copilot:**

```
In src/pages/project.astro there is a content duplication bug. Here is the current markup inside the {featured ? ( ... )} block:

<article class="card">
  <h2>{featured.data.title}</h2>
  <p>
    {featured.body.trim().split('\n')[0]}
  </p>

  <div class="btnrow">
    ...buttons...
  </div>

  <hr />
  {FeaturedContent ? <FeaturedContent /> : null}
</article>

THE BUG: The <p>{featured.body.trim().split('\n')[0]}</p> renders the first line of the raw markdown. Then <FeaturedContent /> renders the full markdown INCLUDING that same first line. Result: the opening paragraph appears twice.

FIX: Remove the entire <p>{featured.body.trim().split('\n')[0]}</p> block (3 lines). Keep <h2>, the btnrow, the <hr />, and <FeaturedContent /> exactly as they are. Do not change anything else in the file.
```

---

## Phase 5: Content Depth

**Goal:** Make the MARS project page and About page strong enough to impress a recruiter in under 60 seconds.

### Task 5.1: Add Results / Metrics Section to MARS

**Why:** The MARS project page is the portfolio's centerpiece but currently lacks quantified results. Recruiters scan for measurable impact — coverage numbers, evaluation scores, dataset scale.

**Checklist:**
- [ ] Add a "Results" or "Evaluation" section to `src/content/projects/mars.md`
- [ ] Include 3–4 key metrics from the MARS README (e.g., NDCG, catalog coverage, diversity score)
- [ ] Format as a small table or bold callout list for scannability

**Prompt for Copilot:**

```
Edit the file src/content/projects/mars.md. Here is its current full content:

---
title: "MARS — My Anime Recommendation System"
featured: true
date: "2026-02"
links:
  demo: "https://myanimerecommendationsystem-x6rqm6vqjmbr2ij8i8yk3b.streamlit.app"
  repo: "https://github.com/daedwards06/MyAnimeRecommendationSystem"
tags:
  - Recommendations
  - NLP
  - Streamlit
  - Python
---

A hybrid recommendation engine combining collaborative filtering, content-based similarity, and neural embeddings to recommend anime across a 13,000+ title catalog.

## Why it stands out
- Three-stage scoring pipeline: candidate generation → shortlist → reranking
- Hybrid CF: FunkSVD matrix factorization + item-kNN blending
- Multi-modal content signals: TF-IDF/SVD + neural sentence embeddings
- Explainability and diversity controls in the UI

## Links
- Demo: ...
- Repository: ...

TASK: Add a new "## Results" section AFTER "## Why it stands out" and BEFORE "## Links". Use a markdown table with these columns: Metric | Value | Notes.

Include these rows (use TODO placeholders for the actual numbers — the owner will fill them in):
1. NDCG@10 — TODO — ranking quality across top-10 recommendations
2. Catalog coverage — TODO — percentage of the 13k+ catalog surfaced
3. Diversity (ILS) — TODO — intra-list similarity / diversity score
4. Cold-start handling — TODO — accuracy on users with < 5 ratings

Do NOT change the frontmatter, the opening paragraph, "Why it stands out", or "Links" sections. Only add the new "## Results" section in the specified location.
```

---

### Task 5.2: Add Tech Stack Section to MARS

**Why:** A tech stack list makes the project's scope instantly clear and is highly scannable. Recruiters and hiring managers look for specific technologies.

**Checklist:**
- [ ] Add a "Tech Stack" section to `src/content/projects/mars.md`
- [ ] Include: Python, pandas, scikit-learn, sentence-transformers, Streamlit, and any other key libraries
- [ ] Keep it as a flat list or small grid — not paragraphs

**Prompt for Copilot:**

```
Edit the file src/content/projects/mars.md.

TASK: Add a new "## Tech Stack" section AFTER the "## Results" section (or after "## Why it stands out" if Results doesn't exist yet) and BEFORE the "## Links" section.

Format it as a bullet list with these entries:
- **Python** — core language
- **pandas / NumPy** — data wrangling and numerical computation
- **scikit-learn** — matrix factorization (FunkSVD), kNN, TF-IDF/SVD
- **sentence-transformers** — neural sentence embeddings for content similarity
- **Streamlit** — interactive web UI and deployment
- **Jikan API** — MyAnimeList data sourcing

Do NOT change anything else in the file — only insert this new section in the correct location.
```

---

### Task 5.3: Expand About Page

**Why:** The current About page is a single paragraph and a skills list. Adding a brief career trajectory and a "what I'm looking for" line makes it more personal and actionable for recruiters.

**Checklist:**
- [ ] Add 1–2 sentences about background / what drew you to data science
- [ ] Add a line about domains of interest (recommendations, NLP, media/entertainment, etc.)
- [ ] Add a closing line about what you're looking for (roles, industries)
- [ ] Keep the professional tone — no fluff

**Prompt for Copilot:**

```
Edit the file src/pages/about.astro. Here is the current content inside <BaseLayout>:

<header class="header">
  <h1>About</h1>
  <p class="muted">A little context on who I am and what I build.</p>
</header>

<p>
  I'm {siteConfig.name}, a data scientist focused on building practical machine learning systems —
  especially recommendation and ranking pipelines — and shipping them as usable products.
</p>

<h2>Skills</h2>
<ul>
  <li>Python, SQL</li>
  <li>Experiment design, evaluation, and metrics</li>
  <li>Recommenders (CF, embeddings, hybrid pipelines)</li>
  <li>Deployment-oriented apps (Streamlit) and clean codebases</li>
</ul>

TASK: Expand the content BETWEEN the existing <p> bio paragraph and the <h2>Skills</h2> section. Add:

1. A second <p> paragraph (2–3 sentences) about background and what draws you to data science. Use a professional tone. Example direction: interest in building systems that connect people with content they enjoy, drawn to recommendation systems and NLP because they blend statistical rigor with real user impact.

2. A new <h2>Interests</h2> section with a short <p> listing domains: recommendation systems, NLP, media/entertainment, and applied ML.

3. After the existing Skills </ul>, add a new <h2>What I'm looking for</h2> section with a single <p>: something like "I'm seeking data science and ML engineering roles where I can build production-grade systems — ideally in recommendation, ranking, or NLP-adjacent domains."

CONSTRAINTS:
- Keep the professional tone consistent with the existing paragraph.
- Do NOT add a resume download link.
- Do NOT change the <header>, the existing bio <p>, or the Skills list — only add new content around them.
- Use {siteConfig.name} where appropriate (it's already imported).
```

---

## Phase 5.5: Multi-Project Routing & Navigation

**Goal:** Make the portfolio truly drop-in scalable — adding a new project should require only a new markdown file in `src/content/projects/`, with zero code changes needed.

### Task 5.5.1: Create Dynamic Project Route (`/projects/[slug]`)

**Why:** Currently there is only `src/pages/project.astro`, a single page that finds the `featured` project and renders it. There is no route for individual projects by slug. When a second project is added, it has no page — Astro will ingest the markdown via content collections but there's no URL to visit it at.

**Checklist:**
- [ ] Create `src/pages/projects/[slug].astro` using Astro's `getStaticPaths` pattern
- [ ] Each project renders its own page at `/projects/<slug>/`
- [ ] Reuse the existing `.card`, `.btnrow`, `.btn` styles — no new CSS needed
- [ ] Verify MARS is accessible at `/projects/mars/`

**Prompt for Copilot:**

```
Create a new file: src/pages/projects/[slug].astro

This is a dynamic route that renders individual project pages from the Astro content collection.

Here is the content collection setup (src/content.config.ts):

import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    featured: z.boolean().default(false),
    date: z.string().optional(),
    links: z.object({
      demo: z.string().url().optional(),
      repo: z.string().url().optional(),
    }).optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };

Here is the exact file to create:

---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}) satisfies GetStaticPaths;

const { project } = Astro.props;
const { Content } = await project.render();
---

<BaseLayout
  title={project.data.title}
  description={`Case study: ${project.data.title}`}
  path={`/projects/${project.id}`}
>
  <header class="header">
    <h1>{project.data.title}</h1>
    {project.data.tags.length > 0 && (
      <p class="muted">{project.data.tags.join(' · ')}</p>
    )}
    <div class="btnrow">
      {project.data.links?.demo && (
        <a class="btn primary" href={project.data.links.demo} target="_blank" rel="noreferrer">
          Live demo
        </a>
      )}
      {project.data.links?.repo && (
        <a class="btn" href={project.data.links.repo} target="_blank" rel="noreferrer">
          Repository
        </a>
      )}
    </div>
  </header>

  <article class="card">
    <Content />
  </article>
</BaseLayout>

NOTES:
- project.id is the filename without extension (e.g., "mars" from mars.md). This becomes the URL slug.
- The layout, CSS classes (header, muted, btnrow, btn, card), and BaseLayout props all follow the same patterns used in the existing pages.
- Do not create any other files or make any other changes.
```

---

### Task 5.5.2: Create Projects Listing Page (`/projects/`)

**Why:** There is no page that lists all projects. When there are 2+ projects, users need a browsable index. Even with one project, this page serves as the canonical "work" section.

**Checklist:**
- [ ] Create `src/pages/projects/index.astro`
- [ ] List all projects from the content collection, sorted by date (newest first)
- [ ] Each project renders as a card with title, summary (first line of body or a description field), tags, and links
- [ ] Each card links to `/projects/[slug]/`

**Prompt for Copilot:**

```
Create a new file: src/pages/projects/index.astro

This is the projects listing page. It shows all projects as cards.

Here is the exact file to create:

---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL;
const projects = await getCollection('projects');
const sorted = projects.sort((a, b) => {
  const da = a.data.date ?? '';
  const db = b.data.date ?? '';
  return db.localeCompare(da);
});
---

<BaseLayout title="Projects" description="Data science projects by Dominique Edwards." path="/projects">
  <header class="header">
    <h1>Projects</h1>
    <p class="muted">Case studies and technical work. New projects are added as markdown files.</p>
  </header>

  <div class="cards">
    {sorted.map((project) => (
      <a href={`${base}projects/${project.id}/`} class="project-card card">
        <h2>{project.data.title}</h2>
        {project.data.tags.length > 0 && (
          <p class="muted" style="font-size: 0.85rem;">{project.data.tags.join(' · ')}</p>
        )}
      </a>
    ))}
  </div>
</BaseLayout>

ALSO append these styles to the END of src/styles/global.css:

a.project-card {
  text-decoration: none;
  display: block;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

a.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px color-mix(in oklab, CanvasText 14%, transparent);
}

a.project-card h2 {
  margin-top: 0;
}

NOTES:
- The .cards grid class is already defined in global.css (grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))).
- The .card class is already defined (background, border, radius, padding, shadow).
- The new .project-card styles just add hover interactivity and remove the underline for the anchor wrapper.
- Do not modify any existing CSS rules — only append the new ones.
```

---

### Task 5.5.3: Update Navigation to "Projects"

**Why:** The nav currently says "Project" (singular) and links to `/project/`. It needs to link to the new `/projects/` listing page and use the plural label.

**Checklist:**
- [ ] Change nav label from "Project" to "Projects"
- [ ] Change nav href from `${base}project/` to `${base}projects/`
- [ ] Update the `aria-current` path check from `/project` to `/projects`

**Prompt for Copilot:**

```
Edit the file src/layouts/BaseLayout.astro.

Here is the current nav block:

<nav>
  <a href={base} aria-current={path === '/' ? 'page' : undefined}>Home</a>
  <a
    href={`${base}project/`}
    aria-current={path === '/project' ? 'page' : undefined}
  >
    Project
  </a>
  <a href={`${base}about/`} aria-current={path === '/about' ? 'page' : undefined}>
    About
  </a>
  <a
    href={`${base}contact/`}
    aria-current={path === '/contact' ? 'page' : undefined}
  >
    Contact
  </a>
</nav>

TASK: Make these exact changes to the "Project" nav link:
1. Change href from `${base}project/` to `${base}projects/`
2. Change aria-current check from path === '/project' to path?.startsWith('/projects')
3. Change display text from "Project" to "Projects"

The result for that one <a> should be:

  <a
    href={`${base}projects/`}
    aria-current={path?.startsWith('/projects') ? 'page' : undefined}
  >
    Projects
  </a>

Do NOT change the Home, About, or Contact links. Do NOT change anything else in the file.
```

---

### Task 5.5.4: Update Home Page CTA

**Why:** The Home page CTA is hardcoded: `<a class="btn primary" href={`${base}project/`}>View MARS</a>`. This should dynamically reference the featured project and link to the new route.

**Checklist:**
- [ ] Make the CTA dynamically pull the featured project's title and slug
- [ ] Link to `/projects/mars/` (or whichever project is featured)
- [ ] If no featured project exists, link to `/projects/` as fallback

**Prompt for Copilot:**

```
Edit the file src/pages/index.astro.

Here is the current full file:

---
import BaseLayout from '../layouts/BaseLayout.astro';
import { siteConfig } from '../siteConfig';

const base = import.meta.env.BASE_URL;
---

<BaseLayout
  title={`${siteConfig.name} — Portfolio`}
  description="Data science portfolio featuring MARS — My Anime Recommendation System."
  path="/"
>
  <header class="header">
    <h1>{siteConfig.name}</h1>
    <p class="muted">{siteConfig.roleTagline}</p>
    <div class="btnrow">
      <a class="btn primary" href={`${base}project/`}>View MARS</a>
      <a class="btn" href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub</a>
      <a class="btn" href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
    </div>
  </header>

  <section>
    <h2>What I build</h2>
    <ul>
      <li>End-to-end ML systems with clean evaluation and clear tradeoffs</li>
      <li>Recommendation and ranking pipelines with explainability</li>
      <li>Data products with simple, reliable UIs for non-technical users</li>
    </ul>
  </section>
</BaseLayout>

TASK: Make two changes:

1. In the frontmatter, add an import and query to find the featured project:
   import { getCollection } from 'astro:content';
   const projects = await getCollection('projects');
   const featured = projects.find((p) => p.data.featured) ?? projects[0];

2. Replace the hardcoded CTA:
   <a class="btn primary" href={`${base}project/`}>View MARS</a>
   
   With a dynamic CTA:
   {featured ? (
     <a class="btn primary" href={`${base}projects/${featured.id}/`}>
       View {featured.data.title.split('—')[0].trim()}
     </a>
   ) : (
     <a class="btn primary" href={`${base}projects/`}>View Projects</a>
   )}

CONSTRAINTS:
- Keep all other elements (GitHub btn, LinkedIn btn, the "What I build" section) exactly as they are.
- The .split('—')[0].trim() extracts just "MARS" from "MARS — My Anime Recommendation System" for a shorter button label. If the title doesn't contain "—", it uses the full title.
- Do NOT change the BaseLayout props, the header <h1>, or the <section>.
```

---

### Task 5.5.5: Remove Old Single Project Page

**Why:** `src/pages/project.astro` is now replaced by `src/pages/projects/index.astro` (listing) and `src/pages/projects/[slug].astro` (individual). The old file should be removed to avoid a dead route.

**Checklist:**
- [ ] Delete `src/pages/project.astro`
- [ ] Verify the build still succeeds (`npm run build`)
- [ ] Verify `/projects/` and `/projects/mars/` work correctly

**Prompt for Copilot:**

```
Delete the file src/pages/project.astro.

REASON: This file has been replaced by two new files:
- src/pages/projects/index.astro (listing all projects)
- src/pages/projects/[slug].astro (individual project pages)

The old /project/ route is no longer needed. After deleting, run `npm run build` to verify the build succeeds.

Do not create any redirect or replacement file. The nav already points to /projects/ (updated in Task 5.5.3).
```

---

## Phase 6: Structural Additions

**Goal:** Add missing structural elements that make the site feel complete and professional.

### Task 6.1: Add a Footer

**Why:** The site currently ends abruptly after the main content. A footer with name, year, and social links is a standard expectation and signals "finished product."

**Checklist:**
- [ ] Add a `<footer>` to `src/layouts/BaseLayout.astro` after `<main>`
- [ ] Include: © 2026 Dominique Edwards, GitHub link, LinkedIn link
- [ ] Style the footer in `src/styles/global.css` (subtle, muted text, top border)

**Prompt for Copilot:**

```
Edit the file src/layouts/BaseLayout.astro.

Here is the current end of the <body> tag:

    <nav>
      ...nav links...
    </nav>
    <main>
      <slot />
    </main>
  </body>
</html>

TASK: Add a <footer> element between </main> and </body>. The footer needs:

1. Import siteConfig at the top of the frontmatter (add: import { siteConfig } from '../siteConfig';)
2. The footer markup:
   <footer>
     <p>© 2026 {siteConfig.name}</p>
     <p>
       <a href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub</a>
       ·
       <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
     </p>
   </footer>

3. Add footer styles to src/styles/global.css (append at the end of the file):
   footer {
     max-width: var(--max-width);
     margin: 0 auto;
     padding: 24px var(--pad);
     border-top: 1px solid var(--border);
     text-align: center;
     color: var(--muted);
     font-size: 0.85rem;
   }
   footer a {
     color: var(--muted);
     text-decoration: none;
   }
   footer a:hover {
     color: var(--accent);
   }

CONSTRAINTS:
- Use the existing CSS variables (--max-width, --pad, --border, --muted, --accent) — do NOT define new ones.
- Do NOT change the <nav> or <main> elements.
- The siteConfig import goes alongside the existing '../styles/global.css' import in the frontmatter.
```

---

### Task 6.2: Add a 404 Page

**Why:** If someone hits a bad URL on GitHub Pages they get the default GitHub 404. A custom 404 keeps them on-brand and gives them a way back.

**Checklist:**
- [ ] Create `src/pages/404.astro`
- [ ] Use `BaseLayout` with a friendly message and a link back to Home
- [ ] Keep it minimal

**Prompt for Copilot:**

```
Create a new file: src/pages/404.astro

Use this exact content:

---
import BaseLayout from '../layouts/BaseLayout.astro';

const base = import.meta.env.BASE_URL;
---

<BaseLayout title="Not Found" description="Page not found." path="/404">
  <header class="header">
    <h1>404</h1>
    <p class="muted">Page not found.</p>
  </header>

  <p>The page you're looking for doesn't exist or has been moved.</p>

  <div class="btnrow">
    <a class="btn primary" href={base}>Back to Home</a>
  </div>
</BaseLayout>

NOTES:
- This follows the exact same pattern as the other pages (index.astro, about.astro, contact.astro).
- It uses BaseLayout, the "header" class, "muted" class, "btnrow" and "btn primary" classes — all already defined in global.css.
- The base URL variable is used for the Home link to work on GitHub Pages.
- Do not add any other content or styling.
```

---

### Task 6.3: Add GitHub Link to Contact Page

**Why:** The Contact page lists email and LinkedIn but omits GitHub — odd for a developer portfolio. The link is already in `siteConfig`.

**Checklist:**
- [ ] Add a GitHub list item to `src/pages/contact.astro`
- [ ] Use `siteConfig.links.github`

**Prompt for Copilot:**

```
Edit the file src/pages/contact.astro.

Here is the current <ul> block:

<ul>
  <li>
    Email:
    <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
  </li>
  <li>
    LinkedIn:
    <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
      {siteConfig.links.linkedin}
    </a>
  </li>
</ul>

TASK: Add a third <li> for GitHub AFTER the LinkedIn <li>, using the same markup pattern:

  <li>
    GitHub:
    <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
      {siteConfig.links.github}
    </a>
  </li>

siteConfig.links.github is already defined ('https://github.com/daedwards06') and siteConfig is already imported. Do NOT change anything else in the file.
```

---

## Phase 7: SEO & Final Polish

**Goal:** Cover the remaining SEO and discoverability gaps.

### Task 7.1: Add Sitemap

**Why:** A sitemap helps search engines discover and index all pages. Astro has a first-party integration that takes minimal effort.

**Checklist:**
- [ ] Install `@astrojs/sitemap`
- [ ] Add it to `astro.config.mjs` integrations
- [ ] Verify `sitemap-index.xml` is generated in the build output

**Prompt for Copilot:**

```
Add the @astrojs/sitemap integration to this Astro project. Two changes are needed:

1. INSTALL: Run `npm install @astrojs/sitemap` in the terminal.

2. EDIT astro.config.mjs. Here is the current file:

// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://daedwards06.github.io',
  base: '/Portfolio',
});

Change it to:

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://daedwards06.github.io',
  base: '/Portfolio',
  integrations: [sitemap()],
});

After both changes, run `npm run build` and verify that dist/Portfolio/sitemap-index.xml exists in the build output. Do NOT change anything else.
```

---

### Task 7.2: Add robots.txt

**Why:** Signals to crawlers that the site is indexable. Standard best practice.

**Checklist:**
- [ ] Create `public/robots.txt`
- [ ] Allow all crawlers, point to sitemap URL

**Prompt for Copilot:**

```
Create a new file: public/robots.txt

Use this exact content:

User-agent: *
Allow: /

Sitemap: https://daedwards06.github.io/Portfolio/sitemap-index.xml

Do not create any other files or make any other changes.
```

---

## Phase 8: Assets & Decisions (Owner)

**Goal:** Items that require the site owner's input — cannot be fully automated.

### Task 8.1: Add MARS Demo Screenshot

**Why:** A text-only project page undersells a project that has a live, visual Streamlit app. A screenshot breaks up the text and proves the system is real and deployed.

**Checklist:**
- [ ] Take a clean screenshot of the MARS Streamlit app
- [ ] Save it to `public/mars-demo.png` (or similar)
- [ ] Embed it in `src/content/projects/mars.md` with alt text
- [ ] Optionally add a subtle image style (rounded corners, shadow) in `global.css`

**Owner action required:** Capture or export the screenshot.

---

### Task 8.2: Decide on Headshot

**Why:** Portfolios with a face feel more personal and memorable, especially when job-seeking. But it's a personal choice.

**Checklist:**
- [ ] Decision: include headshot or omit
- [ ] If including: save to `public/headshot.jpg` and embed on About or Home page

**Owner action required:** Provide image or decide to skip.

---

### Task 8.3: Fill in MARS Metrics (If Placeholder)

**Why:** If Task 5.1 used TODO placeholders for metrics, the owner must fill in real numbers from the MARS evaluation results.

**Checklist:**
- [ ] Replace any TODO markers in `mars.md` with real values
- [ ] Verify numbers match the MARS repo README

**Owner action required:** Provide exact metric values.

---

### Task 8.4: Choose Cutover Strategy

**Why:** The old portfolio at `/dedwards_portfolio/` is still live. A decision is needed before the swap.

**Options:**
- **Option A:** Keep old site as-is (least effort, both coexist)
- **Option B:** Add a banner on the old site linking to the new one
- **Option C:** Replace the old site entirely (move new site into old repo or change Pages settings)

**Checklist:**
- [ ] Choose A, B, or C
- [ ] Execute the chosen strategy
- [ ] Verify public URLs work

**Owner action required:** Make the call.

---

## Execution Summary

| Phase | Tasks | Can Automate? | Effort |
|-------|-------|---------------|--------|
| **4 — Bug Fixes** | 4.1 | Yes | Trivial |
| **5 — Content Depth** | 5.1, 5.2, 5.3 | Mostly (metrics may need owner input) | Medium |
| **5.5 — Multi-Project Routing** | 5.5.1, 5.5.2, 5.5.3, 5.5.4, 5.5.5 | Yes | Medium |
| **6 — Structural** | 6.1, 6.2, 6.3 | Yes | Small |
| **7 — SEO** | 7.1, 7.2 | Yes | Small |
| **8 — Assets/Decisions** | 8.1–8.4 | No (owner required) | Varies |

**Recommended execution order:** 4.1 → 5.2 → 5.1 → 5.3 → 5.5.1 → 5.5.2 → 5.5.3 → 5.5.4 → 5.5.5 → 6.3 → 6.1 → 6.2 → 7.1 → 7.2 → 8.*

> **Note on execution order:** Phase 5.5 tasks must be done in sequence (5.5.1 → 5.5.5) because each builds on the previous. The old project page (5.5.5) should only be deleted after the new routes and nav are confirmed working.
