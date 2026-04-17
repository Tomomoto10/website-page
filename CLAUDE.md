# StardropHost Website — Claude Instructions

## What this is

Static single-page marketing website for StardropHost. Hosted on **Cloudflare Pages** connected to the GitHub repo `Tomomoto10/website-page`. Pushing to this repo deploys the live site at `stardrophost.dev` automatically — no build step, no CI needed.

**This is the live public site. Every change pushed here is immediately live.**

---

## File Layout

```
website-page/
├── index.html          # Entire website — all pages + demo overlay (~1800 lines)
├── favicon.png
├── css/
│   ├── style.css       # All styles
│   └── app.js          # DUPLICATE of js/app.js — must be kept in sync
├── js/
│   └── app.js          # Authoritative JS (nav, demo functions, chat filtering)
└── img/                # Images and GIFs
```

**Critical:** `css/app.js` and `js/app.js` are identical files. Whenever you change one, apply the same change to the other.

---

## Deployment

```bash
git add .
git commit -m "your message"
git push
```

Cloudflare Pages detects the push and redeploys. No containers, no nginx, no install script involved.

The `StardropHost-website/` folder (nginx + docker-compose) is a secondary dev copy — **not the live site**. Do not touch it for website changes.

---

## Page Structure

The site is a single HTML file with all pages hidden/shown via JS. Nav items use `data-page`:

| `data-page` | Content |
|---|---|
| `home` | Hero, action cards (Demo + Download), preview GIFs |
| `features` | Feature cards grid + Coming Soon card |
| `guides` | Server / Player / Updating guides (pending — cards are "coming soon" style) |
| `download` | Pre-requisites, install command, after-installing |
| `source` | Source/GitHub page |

Page containers: `id="page-{name}"`, class `page`. Active page shown by JS nav handler.

---

## Demo Overlay

Full interactive demo of the web panel — embedded inside `index.html`, triggered by `openDemo()`, closed by `closeDemo()`.

Demo nav items: `class="demo-nav-item"`, `data-page` values: `dashboard, farm, players, chat, saves, mods, console, remote, config`

Demo page containers: `id="demo-page-{name}"`, class `demo-page page`

**The demo is a simulation only.** Nothing connects to a real server.

---

## Key JS Functions (`js/app.js` and `css/app.js`)

| Function | Purpose |
|---|---|
| `openDemo()` / `closeDemo()` | Show/hide overlay, start/stop CPU/RAM interval |
| `demoToast(msg, type)` | Toast — container `id="demo-toast-container"` |
| `demoToggleServer()` | Toggle Stop/Start on `id=demo-server-btn` |
| `demoSetChatPlayer(name, btn)` | Switch active chat pill; filter feed by `data-player` |
| `demoSetChatColor(color, btn)` | Set `demoChatColor` var |
| `demoChatSend()` | Append message + bot reply after 1s |
| `demoConsoleSend()` | Append to `demo-term-output` |
| `demoConsoleFilter(filter, btn)` | Filter `demo-log-output .log-line` by `.log-tag` text |
| `copyCommand()` | Copy install curl command, toast success |
| `demoSecurityMode(mode)` | Toggle block/allow section visibility |

---

## Style Notes

- All page/demo CSS is in `css/style.css`
- Panel UI classes (used in the demo) are also defined here
- Inner cards use `bg-tertiary` style with border
- Collapsible sections use `<details>`/`<summary>`
- Accent callout cards use purple styling

---

## Pending Items

1. **Guides page** — add Server Guides, Player Guides, Updating & Maintenance cards (all "coming soon" style with placeholder text)
2. **Download — OS callout** — remove 💡 emoji, change to `bg-tertiary` inner-card style, rename heading to "Recommended Environments", add note "not all are tested but should work"
3. **Download — "It's that simple!"** — remove the accent `<p>` below the install command card

---

## Tone & Content Rules

- This site is for **end users**, not developers — keep language simple and friendly
- The main app README (`StardropHost/StardropHost/README.md`) is the developer reference
- Feature descriptions must match what is actually implemented — check `StardropHost/docs/KNOWN_ISSUES.md` before claiming something works
- Do not add features to the site that are listed as "Deferred" or "In Development" without marking them Coming Soon
