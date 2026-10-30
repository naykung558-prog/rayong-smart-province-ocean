# Rayong Blue Coast — Smart Province (ocean theme)

Static showcase site for Rayong Smart Province with an ocean theme: animated waves, cartoon sea life, a 3D digital-twin city on an island and a 3D tourism map floating on the sea. All figures are sample data.

## Run locally

The 3D scenes are ES modules, so serve the folder over http:

```bash
node serve.js
```

Then open http://localhost:5174/

## Stack

Plain HTML/CSS/JS — Tailwind CSS v4 (browser build), Lucide icons, Lenis smooth scroll and three.js, all loaded from CDNs. No build step.

## Structure

- `index.html` — page markup
- `assets/css/site.css` — theme, animations, sea background
- `assets/js/data.js` — content (Thai/English strings)
- `assets/js/app.js` — page behaviour
- `assets/js/sea-toons.js` — cartoon sea creatures
- `assets/js/scene-twin.js`, `assets/js/scene-map.js` — 3D scenes
