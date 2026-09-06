# Viktech Software Solutions

Static marketing website for Viktech Software Solutions — plain HTML, CSS, and
JavaScript, no build step, no framework.

## Run it locally

```bash
npm start
```

Opens a local server at [http://localhost:8092](http://localhost:8092)
(needs Python 3, which ships with macOS). Or just open `public/index.html`
directly in a browser.

## Project structure

```
public/
  index.html      the whole site (single page, anchor-linked sections)
  styles.css      theme, layout, components
  script.js       nav toggle, scroll reveal, contact form
  robots.txt
  sitemap.xml
```

## Before going live — things to update

- [ ] Replace the placeholder email in `public/index.html` and `public/script.js`
      (`hello@viktechsoftware.com`) with your real business email
- [ ] Replace the placeholder cards in the "Featured work" section with real
      projects/case studies
- [ ] Update the domain in `public/robots.txt` and `public/sitemap.xml`
      once you own one
- [ ] Add a real favicon and logo mark (currently a plain "V" badge)
- [ ] Wire the contact form to a real backend (e.g. [Formspree](https://formspree.io),
      Netlify Forms) if you want submissions without opening the visitor's
      email client — it currently opens a pre-filled `mailto:` link

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) is already
set up to deploy `public/` to **GitHub Pages** automatically on every push to
`main`. To turn it on:

1. Push this repo to GitHub.
2. Go to the repo's **Settings → Pages** → set Source to **GitHub Actions**.
3. Push again (or re-run the workflow) — your site goes live at
   `https://<username>.github.io/<repo>/`.

To use a custom domain, add a `CNAME` file to `public/` with your domain name,
then point your domain's DNS at GitHub Pages (see
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

Alternatively, this being a plain static site, you can also drag-and-drop the
`public/` folder onto [Netlify](https://app.netlify.com) for instant hosting
with no GitHub connection required.
