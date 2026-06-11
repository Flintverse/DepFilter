# Shopify Polaris v13 Design System — Reference Guide

This document captures every design token, component pattern, HTML structure, CSS rule, and JavaScript convention used in this project. Any AI reading this file can reproduce the exact same visual language without consulting external sources.

---

## 1. Technology Stack

- **No build tools.** Plain HTML + CSS + JS. Each page is a fully self-contained `.html` file.
- **No Tailwind, no Bootstrap, no Font Awesome.** All styling is custom CSS using Polaris design tokens as CSS variables.
- **No React/Vue/Svelte.** Vanilla JS only.
- **Inter variable font** loaded from Google Fonts.
- **Polaris SVG icons** inlined directly into HTML/JS strings. Never use icon fonts.

---

## 2. Font Loading

Always place these three lines in `<head>` before the `<style>` block:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap" rel="stylesheet">
```

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', sans-serif;
```

### Font Weights (Polaris non-standard scale)

| Name      | Value | Usage                              |
|-----------|-------|------------------------------------|
| regular   | 450   | Body text, nav items, normal text  |
| medium    | 550   | Labels, column headings, buttons   |
| semibold  | 650   | Page titles, active nav, card titles |
| bold      | 700   | Logo text only                     |

> ⚠️ Do NOT use 400/500/600/700 for these names — Polaris uses 450/550/650/700.

---

## 3. CSS Custom Properties (Design Tokens)

Paste this `:root` block at the top of every page's `<style>`:

```css
*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Typography */
  --ff: 'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', sans-serif;

  /* Backgrounds */
  --bg:       rgba(241,241,241,1);   /* page/app background (light gray) */
  --sf:       #fff;                   /* surface: cards, modals, sidebar */
  --sf-hov:   rgba(247,247,247,1);   /* surface on hover */
  --sf-act:   rgba(243,243,243,1);   /* surface active/selected state */
  --fill:     #303030;               /* primary button bg, toggle on, active accent */
  --fill-hov: #1a1a1a;               /* primary button bg on hover */
  --fill-t:   rgba(0,0,0,.02);       /* table thead/tfoot bg, modal footer bg */

  /* Text */
  --text:  rgba(48,48,48,1);         /* primary text */
  --text2: rgba(97,97,97,1);         /* secondary/subdued text */
  --textd: rgba(181,181,181,1);      /* disabled text, placeholder, muted icons */
  --lnk:   rgba(0,91,211,1);         /* link color */

  /* Borders */
  --bdr:     rgba(227,227,227,1);    /* default border */
  --bdr-foc: rgba(0,91,211,1);       /* focus-state border (same as link) */

  /* Status Colors */
  --crit: rgba(181,38,11,1);         /* destructive/error (delete hover) */

  /* Border Radius */
  --r1: 4px;   /* small: badge corners, checkbox */
  --r2: 8px;   /* default: buttons, inputs, cards, table wrapper */
  --r3: 12px;  /* modals only */

  /* Shadows */
  --sh1: 0px 1px 0px 0px rgba(26,26,26,.07);
  /* ↑ subtle bottom shadow — icon buttons, search bar, table borders */

  --sh3: 0px 4px 6px -2px rgba(26,26,26,.2);
  /* ↑ card/surface elevation — used on all white cards */

  /* Button Shadows (Polaris multi-layer inset system) */
  --shbtn:
    0px -1px 0px 0px #b5b5b5 inset,
    0px 0px 0px 1px rgba(0,0,0,.1) inset,
    0px .5px 0px 1.5px #fff inset;

  --shbtn-hov:
    0px 1px 0px 0px #ebebeb inset,
    -1px 0px 0px 0px #ebebeb inset,
    1px 0px 0px 0px #ebebeb inset,
    0px -1px 0px 0px #ccc inset;

  --shbtnp:
    0px -1px 0px 1px rgba(0,0,0,.8) inset,
    0px 0px 0px 1px rgba(48,48,48,1) inset,
    0px .5px 0px 1.5px rgba(255,255,255,.25) inset;

  --shbtnp-hov:
    0px 1px 0px 0px rgba(255,255,255,.24) inset,
    1px 0px 0px 0px rgba(255,255,255,.2) inset,
    -1px 0px 0px 0px rgba(255,255,255,.2) inset,
    0px -1px 0px 0px #000 inset;
}

html, body {
  font-family: var(--ff);
  background: var(--bg);
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
  min-height: 100vh;
}
a { color: var(--lnk); }
```

---

## 4. Page Layout

Every page uses a **flex sidebar + main** shell:

```html
<div class="lay">
  <aside class="sb" id="sidebar"> ... </aside>
  <main class="main"> ... </main>
</div>
```

```css
.lay  { display: flex; min-height: 100vh; }
.main { flex: 1; overflow-x: hidden; }
.pg   { max-width: 960px; margin: 0 auto; padding: 24px; }
```

---

## 5. Sidebar Component

### HTML Structure

```html
<aside class="sb" id="sidebar">
  <div class="sb-hd">
    <div class="sb-logo">Fd</div>
    <span class="sb-title nav-lbl">Findter Filter &amp; Search</span>
    <button class="sb-tgl" id="sidebar-toggle" title="Toggle sidebar">
      <span id="toggle-icon"><!-- chevron SVG injected by JS --></span>
    </button>
  </div>
  <div class="sb-nav" id="nav"></div>
</aside>
```

### Sidebar CSS

```css
.sb {
  width: 248px;
  background: var(--sf);          /* white — NOT gray */
  border-right: 1px solid var(--bdr);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width .25s;
  min-height: 100vh;
}
.sb.col { width: 56px; }          /* collapsed state */

.sb-hd {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--bdr);
  gap: 8px;
  overflow: hidden;
}

.sb-logo {
  width: 28px; height: 28px;
  border-radius: 6px;
  background: var(--fill);        /* #303030 */
  color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.sb-title {
  font-size: 13px; font-weight: 650;
  color: var(--text);
  flex: 1;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}

.sb-tgl {
  width: 28px; height: 28px;
  border: none; background: transparent;
  cursor: pointer;
  border-radius: var(--r1);
  display: flex; align-items: center; justify-content: center;
  color: var(--text2);
  flex-shrink: 0;
}
.sb-tgl:hover { background: var(--sf-hov); }

.sb-nav {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}
```

### Nav Button CSS

```css
.nav-btn {
  width: 100%;
  border: none; background: transparent;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: var(--r2);
  font-family: var(--ff);
  font-size: 13px; font-weight: 450;
  color: var(--text2);
  text-align: left;
  display: flex; align-items: center;
  overflow: hidden;
  transition: background .1s, color .1s;
  white-space: nowrap;
}
.nav-btn:hover:not([disabled]) { background: var(--sf-hov); color: var(--text); }
.nav-btn.act  { background: var(--sf-act) !important; color: var(--text) !important; font-weight: 650; }
.nav-btn[disabled] { color: var(--textd) !important; cursor: not-allowed; }
.nav-lbl { overflow: hidden; text-overflow: ellipsis; }
```

### Navigation Data & JS

```javascript
const NAV = [
  { id: 'filter',    label: 'Filter' },
  { id: 'search',    label: 'Search' },
  { id: 'metafield', label: 'Metafield' },
  { id: 'ymm',       label: 'Year Make Model' },
  { id: 'grid',      label: 'Filter & Product Grid Design' },
  { id: 'settings',  label: 'Settings' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'advanced',  label: 'Advanced Features' },
];

// Which tabs are clickable (others are disabled/grayed):
const ENABLED = new Set(['settings', 'metafield', 'ymm']);

// Set to the id of whichever tab the CURRENT PAGE represents:
const ACTIVE = 'settings'; // e.g. 'metafield' on Metafield.html, 'ymm' on YearMakeModel.html

let col = false; // sidebar collapsed state

function renderNav() {
  $('nav').innerHTML = NAV.map(n => {
    const en = ENABLED.has(n.id), act = n.id === ACTIVE;
    return `<button data-nav="${n.id}" ${en ? '' : 'disabled'} class="nav-btn${act ? ' act' : ''}" title="${n.label}">
              <span class="nav-lbl">${escapeHtml(n.label)}</span>
            </button>`;
  }).join('');

  $('nav').querySelectorAll('[data-nav]').forEach(b => {
    if (ENABLED.has(b.dataset.nav)) b.onclick = () => {
      const v = b.dataset.nav;
      if (v === 'settings')  location.href = 'index.html';
      if (v === 'metafield') location.href = 'Metafield.html';
      if (v === 'ymm')       location.href = 'YearMakeModel.html';
      // active page's own id: do nothing (no navigation)
    };
  });
  updateSb();
}

function updateSb() {
  $('sidebar').classList.toggle('col', col);
  $('sidebar').querySelectorAll('.nav-lbl').forEach(el => el.classList.toggle('hidden', col));
  document.querySelector('.sb-title').classList.toggle('hidden', col);
  $('toggle-icon').innerHTML = col ? IC.chevR : IC.chevL;
}

$('sidebar-toggle').onclick = () => { col = !col; updateSb(); };
```

> **Rule:** The `ACTIVE` constant must match the current page's tab id. Never set a disabled tab as `ACTIVE`.

---

## 6. Components

### 6.1 Buttons

Three button variants. All use `<button>` or `<a>` with class `btn` plus a modifier.

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px;
  padding: 6px 16px; height: 32px;
  border-radius: var(--r2);   /* 8px */
  font-family: var(--ff);
  font-size: 13px; font-weight: 550;
  cursor: pointer; border: none;
  white-space: nowrap;
  transition: box-shadow .1s, background .1s;
}

/* Primary — dark fill */
.btn-p { background: var(--fill); color: #fff; box-shadow: var(--shbtnp); }
.btn-p:hover { background: var(--fill-hov); box-shadow: var(--shbtnp-hov); }

/* Secondary — white with border shadow */
.btn-s { background: var(--sf); color: var(--text); box-shadow: var(--shbtn); }
.btn-s:hover { box-shadow: var(--shbtn-hov); }
```

**Usage:**
```html
<button class="btn btn-p">Save</button>
<button class="btn btn-s">Cancel</button>
```

#### Icon Button (square, 32×32)

```css
.ibtn {
  width: 32px; height: 32px; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--r2);
  cursor: pointer;
  border: 1px solid var(--bdr);
  background: var(--sf);
  color: var(--text2);
  box-shadow: var(--sh1);
  transition: background .1s, color .1s, border-color .1s;
  flex-shrink: 0;
}
.ibtn:hover { background: var(--sf-hov); }

/* Destructive variant — used on delete/trash buttons */
.ibtn-del:hover {
  background: rgba(181,38,11,.06);
  color: var(--crit);
  border-color: rgba(181,38,11,.3);
}
```

**Usage:**
```html
<button class="ibtn" title="Edit"><!-- edit SVG --></button>
<button class="ibtn ibtn-del" title="Delete"><!-- trash SVG --></button>
```

#### Back / Link Button (anchor styled as icon button)

```css
.back-a {
  width: 32px; height: 32px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--r2);
  text-decoration: none;
  border: 1px solid var(--bdr);
  background: var(--sf); color: var(--text2);
  box-shadow: var(--sh1);
  flex-shrink: 0;
  transition: background .1s;
}
.back-a:hover { background: var(--sf-hov); }
```

**Usage:**
```html
<a href="index.html" class="back-a" title="Back to Settings"><!-- arrow-left SVG --></a>
```

---

### 6.2 Input Field

```css
.inp {
  width: 100%;
  border: 1px solid var(--bdr);
  border-radius: var(--r2);
  padding: 7px 12px;
  font-family: var(--ff); font-size: 13px;
  color: var(--text);
  background: var(--sf);
  outline: none;
  transition: border-color .1s, box-shadow .1s;
}
.inp::placeholder { color: var(--textd); }
.inp:focus {
  border-color: var(--bdr-foc);               /* rgba(0,91,211,1) */
  box-shadow: 0 0 0 3px rgba(0,91,211,.2);    /* blue focus ring */
}
```

**Usage:**
```html
<label class="flbl" for="my-input">Label text</label>
<input id="my-input" type="text" class="inp" placeholder="Placeholder…">
<p class="fhint">Helper text below the input.</p>
```

Helper CSS:
```css
.flbl  { font-size: 13px; font-weight: 550; color: var(--text); display: block; margin-bottom: 4px; }
.fhint { font-size: 12px; color: var(--text2); margin-top: 3px; }
```

---

### 6.3 Select / Dropdown

```css
.sel {
  width: 100%;
  border: 1px solid var(--bdr);
  border-radius: var(--r2);
  padding: 7px 36px 7px 12px;
  font-family: var(--ff); font-size: 13px;
  color: var(--text); background: var(--sf);
  outline: none; appearance: none; -webkit-appearance: none;
  cursor: pointer;
  transition: border-color .1s, box-shadow .1s;
  /* Polaris chevron-down arrow as inline SVG data URI */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23616161' fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}
.sel:focus {
  border-color: var(--bdr-foc);
  box-shadow: 0 0 0 3px rgba(0,91,211,.2);
}
```

---

### 6.4 Search Bar (icon + input composite)

```css
.srch {
  display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--bdr);
  border-radius: var(--r2);
  padding: 7px 12px;
  background: var(--sf);
  transition: border-color .1s, box-shadow .1s;
}
.srch:focus-within {
  border-color: var(--bdr-foc);
  box-shadow: 0 0 0 3px rgba(0,91,211,.2);
}
.srch input {
  flex: 1; border: none; outline: none;
  background: transparent;
  font-family: var(--ff); font-size: 13px; color: var(--text);
}
.srch input::placeholder { color: var(--textd); }
```

**Usage:**
```html
<div class="srch">
  <!-- search icon SVG -->
  <input type="text" id="my-search" placeholder="Search…">
</div>
```

---

### 6.5 Toggle Switch

Size: **44 × 24px**. Thumb: **18 × 18px**. Padding: **3px** on all sides.

```css
.tgl {
  position: relative;
  display: inline-block;
  width: 44px; height: 24px;
  border: none; padding: 0;
  cursor: pointer;
  border-radius: 12px;
  outline: none;
  appearance: none; -webkit-appearance: none;
  transition: background .2s;
  flex-shrink: 0;
  vertical-align: middle;
}
.tgl:focus-visible { box-shadow: 0 0 0 3px rgba(0,91,211,.25); }
.tgl.on  { background: var(--fill); }           /* #303030 */
.tgl.off { background: rgba(204,204,204,1); }   /* mid gray */

.tgl-th {
  display: block;
  position: absolute;
  top: 3px; left: 3px;
  width: 18px; height: 18px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
  transition: transform .2s;
  pointer-events: none;
}
.tgl.on .tgl-th { transform: translateX(20px); }
/* off state: translateX(0) — the default, no rule needed */
```

**HTML structure (always this exact markup):**
```html
<button type="button" class="tgl on" id="my-toggle">
  <span class="tgl-th"></span>
</button>
```

**JS to wire toggle click:**
```javascript
// Inline click handler (simplest):
document.querySelectorAll('.tgl').forEach(btn => {
  btn.onclick = () => { btn.classList.toggle('on'); btn.classList.toggle('off'); };
});

// Or in a dynamic render (e.g. table rows):
// Re-render the whole component with the new state in data, don't mutate classes directly.
```

> **Math:** Container 44px, thumb 18px, padding 3px each side. Off: thumb at x=3. On: thumb at x=3+20=23, right edge=41, right gap=3px. Perfectly symmetric.

---

### 6.6 Card (white elevated surface)

```css
.card {
  background: var(--sf);
  border-radius: var(--r2);      /* 8px */
  box-shadow: var(--sh3);        /* 0px 4px 6px -2px rgba(26,26,26,.2) */
  overflow: hidden;
}
```

**With header + body pattern:**
```css
.card-hd     { padding: 16px; border-bottom: 1px solid var(--bdr); }
.card-hd-ttl { font-size: 13px; font-weight: 650; }
.card-hd-sub { font-size: 12px; color: var(--text2); margin-top: 2px; }
.card-bd     { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
```

**Usage:**
```html
<div class="card">
  <div class="card-hd">
    <p class="card-hd-ttl">Section Title</p>
    <p class="card-hd-sub">Optional subtitle text.</p>
  </div>
  <div class="card-bd">
    <!-- content rows -->
  </div>
</div>
```

---

### 6.7 Settings Hub Card (clickable card link)

Used on the main `index.html` settings hub only.

```css
.sc {
  display: block; text-decoration: none;
  background: var(--sf);
  border-radius: var(--r2);
  box-shadow: var(--sh3);
  padding: 16px;
  transition: box-shadow .15s;
}
.sc:hover { box-shadow: var(--sh3), 0 0 0 2px rgba(0,0,0,.12); }

.sc-ttl {
  font-size: 13px; font-weight: 650;
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 4px;
}
.sc-sub { font-size: 12px; color: var(--text2); line-height: 1.5; }
```

**Usage:**
```html
<a href="Sort_by.html" class="sc">
  <div class="sc-ttl">Sort By <!-- arrow-right SVG (12px) --></div>
  <p class="sc-sub">Configure the sort options shoppers see.</p>
</a>
```

---

### 6.8 Table / Data Wrapper

```css
.tw {
  background: var(--sf);
  border-radius: var(--r2);
  box-shadow: var(--sh3);
  overflow: hidden;
}
.dt { width: 100%; border-collapse: collapse; font-size: 13px; }

.dt thead tr    { background: var(--fill-t); border-bottom: 1px solid var(--bdr); }
.dt thead th    {
  padding: 10px 16px; text-align: left;
  font-size: 11px; font-weight: 650;
  text-transform: uppercase; letter-spacing: .06em;
  color: var(--text2);
}

.dt tbody tr               { border-bottom: 1px solid var(--bdr); }
.dt tbody tr:last-child    { border-bottom: none; }
.dt tbody tr:hover         { background: var(--sf-hov); }
.dt td                     { padding: 12px 16px; vertical-align: middle; }

/* Table footer (count row, etc.) */
/* No dedicated class — use inline style: padding:10px 16px; background:var(--fill-t); border-top:1px solid var(--bdr); */
```

**Usage pattern:**
```html
<div class="tw mt5">
  <table class="dt">
    <thead>
      <tr>
        <th>Column A</th>
        <th style="width:160px">Column B</th>
        <th style="width:80px;text-align:center">Action</th>
      </tr>
    </thead>
    <tbody id="my-tbody"></tbody>
  </table>
  <div style="padding:10px 16px;background:var(--fill-t);border-top:1px solid var(--bdr)">
    <span id="my-count" style="font-size:13px;font-weight:550">5/10 selected</span>
  </div>
</div>
```

---

### 6.9 Badges / Tags

```css
/* Base badge — inline pill */
/* (no shared .bdg class — use inline-flex with specific variant) */

/* Neutral gray */
.bdg-n  { display:inline-flex;align-items:center;padding:2px 8px;border-radius:var(--r1);font-size:12px;font-weight:550;background:rgba(0,0,0,.07);color:var(--text2); }

/* Filter — blue */
.bdg-f  { display:inline-flex;align-items:center;padding:2px 8px;border-radius:var(--r1);font-size:12px;font-weight:550;background:#ddeeff;color:#005bd3; }

/* Search — green */
.bdg-s  { display:inline-flex;align-items:center;padding:2px 8px;border-radius:var(--r1);font-size:12px;font-weight:550;background:#d5f0e6;color:#006e52; }

/* Sort — purple */
.bdg-so { display:inline-flex;align-items:center;padding:2px 8px;border-radius:var(--r1);font-size:12px;font-weight:550;background:#ede8fc;color:#5b2ab0; }

/* Keyword/synonym tag — surface-active gray */
.tag    { display:inline-flex;align-items:center;padding:2px 8px;border-radius:var(--r1);background:var(--sf-act);font-size:12px;font-weight:550;color:var(--text); }
```

---

### 6.10 Tabs (subtab bar)

```css
.tabs {
  display: flex; overflow-x: auto;
  border-bottom: 1px solid var(--bdr);
  padding: 0 16px; gap: 4px;
}
.tab {
  padding: 10px 12px;
  font-size: 13px; font-weight: 450;
  color: var(--text2);
  border: none; background: transparent;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;          /* overlap the container border-bottom */
  white-space: nowrap;
  transition: color .1s;
  font-family: var(--ff);
}
.tab:hover { color: var(--text); }
.tab.act   { color: var(--text); font-weight: 650; border-bottom-color: var(--fill); }
```

**Usage:**
```html
<div class="tabs" id="subtab-bar">
  <!-- rendered by JS -->
</div>
```

```javascript
function renderSubtabs() {
  $('subtab-bar').innerHTML = SUBTABS.map(t =>
    `<button data-tab="${t.id}" class="tab${t.id === activeSubtab ? ' act' : ''}">${escapeHtml(t.label)}</button>`
  ).join('');
  $('subtab-bar').querySelectorAll('[data-tab]').forEach(b =>
    b.onclick = () => { flushFields(); activeSubtab = b.dataset.tab; renderSubtabs(); renderFields(); }
  );
}
```

---

### 6.11 Modal

```css
/* Backdrop */
.ov {
  position: fixed; inset: 0; z-index: 50;
  background: rgba(0,0,0,.5);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

/* Dialog box */
.mo {
  background: var(--sf);
  border-radius: var(--r3);       /* 12px — modals use r3, not r2 */
  box-shadow: 0 4px 24px rgba(0,0,0,.3);
  width: 100%; max-width: 460px;
  overflow: hidden;
  animation: mIn .15s ease-out;
}
.mo-sm { max-width: 380px; }      /* smaller variant */

@keyframes mIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.mo-hd {
  padding: 16px 20px;
  border-bottom: 1px solid var(--bdr);
  display: flex; justify-content: space-between; align-items: center;
}
.mo-ttl { font-size: 14px; font-weight: 650; }

.mo-bd {
  padding: 20px;
  display: flex; flex-direction: column; gap: 16px;
}

.mo-ft {
  padding: 12px 20px;
  border-top: 1px solid var(--bdr);
  background: var(--fill-t);
  display: flex; justify-content: flex-end; gap: 8px;
}
```

**HTML:**
```html
<div id="my-modal" class="ov hidden">
  <div class="mo">
    <div class="mo-hd">
      <span class="mo-ttl">Modal Title</span>
      <button id="modal-close" class="ibtn" style="border:none;box-shadow:none;background:transparent">
        <!-- X icon SVG -->
      </button>
    </div>
    <div class="mo-bd">
      <!-- form content -->
    </div>
    <div class="mo-ft">
      <button id="modal-cancel" class="btn btn-s">Cancel</button>
      <button id="modal-save"   class="btn btn-p">Save</button>
    </div>
  </div>
</div>
```

**JS pattern:**
```javascript
function openModal() { $('my-modal').classList.remove('hidden'); }
function closeModal() { $('my-modal').classList.add('hidden'); }

$('modal-close').onclick  = closeModal;
$('modal-cancel').onclick = closeModal;
$('modal-save').onclick   = saveAndClose;
// Click outside to close:
$('my-modal').addEventListener('click', e => { if (e.target.id === 'my-modal') closeModal(); });
```

> **Rule:** Always use `hidden` class to show/hide. Never `display:none` inline. Add `.hidden { display:none!important; }` to every page.

---

### 6.12 Info Banner

```css
.bnr {
  border-radius: var(--r2);
  padding: 12px 16px;
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px;
  /* informational variant (only variant used): */
  background: #e8f4fe;
  border: 1px solid rgba(0,91,211,.2);
  color: #003d9c;
}
```

**Usage:**
```html
<div class="bnr mt5">
  <!-- info-circle SVG, 20×20, flex-shrink:0, margin-top:1px -->
  <p>Banner message text with <strong>bold emphasis</strong>.</p>
</div>
```

---

### 6.13 Checkbox

```css
.chklbl {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; font-size: 13px; color: var(--text);
}
.chklbl input {
  width: 16px; height: 16px;
  border-radius: 3px;
  accent-color: var(--fill);  /* #303030 — dark checkbox fill */
  cursor: pointer; flex-shrink: 0;
}
```

**Usage:**
```html
<label class="chklbl">
  <input type="checkbox" id="chk-filter">
  Filter
</label>
```

---

### 6.14 Drag-and-drop Table Rows

```css
.row-drag { opacity: .4; }
.row-ov   { border-top: 2px solid var(--fill) !important; }
```

**JS drag pattern:**
```javascript
let dragIdx = null;
tbody.querySelectorAll('tr').forEach(tr => {
  tr.addEventListener('dragstart', e => {
    dragIdx = +tr.dataset.idx;
    tr.classList.add('row-drag');
    e.dataTransfer.effectAllowed = 'move';
  });
  tr.addEventListener('dragend', () => {
    tr.classList.remove('row-drag');
    tbody.querySelectorAll('tr').forEach(r => r.classList.remove('row-ov'));
  });
  tr.addEventListener('dragover', e => {
    e.preventDefault();
    tbody.querySelectorAll('tr').forEach(r => r.classList.remove('row-ov'));
    tr.classList.add('row-ov');
  });
  tr.addEventListener('drop', e => {
    e.preventDefault();
    const target = +tr.dataset.idx;
    if (dragIdx === null || dragIdx === target) return;
    const [moved] = dataArray.splice(dragIdx, 1);
    dataArray.splice(target, 0, moved);
    dragIdx = null;
    renderTable();
  });
});
```

---

### 6.15 Divider (inside card body)

```css
.divider { height: 1px; background: var(--bdr); margin: 4px 0; }
```

Use between toggle rows inside `.card-bd`:
```html
<div class="divider"></div>
```

---

## 7. Icon System (Polaris SVG Paths)

All icons are Polaris v13 SVG paths. Standard size is **16×16** (`class="ic"`). Use `fill:currentColor` so color is controlled by the parent's `color` property.

```css
.ic    { width: 16px; height: 16px; fill: currentColor; display: block; flex-shrink: 0; }
.ic-sm { width: 12px; height: 12px; fill: currentColor; display: block; flex-shrink: 0; }
.ic-xl { width: 40px; height: 40px; fill: currentColor; display: block; }
```

### Full Icon Library Used in This Project

```javascript
const IC = {

  // Navigation
  chevL: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M11.78 5.97a.75.75 0 0 1 0 1.06L8.81 10l2.97 2.97a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" fill="currentColor"/>
  </svg>`,

  chevR: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M8.22 5.97a.75.75 0 0 0 0 1.06L11.19 10 8.22 12.97a.75.75 0 1 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0Z" fill="currentColor"/>
  </svg>`,

  arrL: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" fill="currentColor"/>
  </svg>`,

  arrR: `<svg class="ic-sm" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.69L11.72 6.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H3.75A.75.75 0 0 1 3 10Z" fill="currentColor"/>
  </svg>`,

  // Actions
  edit: `<svg class="ic" viewBox="0 0 20 20">
    <path d="m11.47 3.87 4.7 4.7-8.5 8.5H3.01l-.01-4.63 8.47-8.57Zm1.06-1.06 1.94-1.94a1.5 1.5 0 0 1 2.12 0l2.55 2.55a1.5 1.5 0 0 1 0 2.12l-1.94 1.94-4.67-4.67Z" fill="currentColor"/>
  </svg>`,

  del: `<svg class="ic" viewBox="0 0 20 20">
    <path d="M14 4h3a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H3a1 1 0 0 1 0-2h3V2.5A1.5 1.5 0 0 1 7.5 1h5A1.5 1.5 0 0 1 14 2.5V4ZM8.5 2.5v1.5h3V2.5h-3ZM6 6v10h8V6H6Zm2 2.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5Zm3 0a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5Z" fill="currentColor"/>
  </svg>`,

  x: `<svg class="ic" viewBox="0 0 20 20">
    <path d="m11.06 10 3.22-3.22a.75.75 0 0 0-1.06-1.06L10 8.94 6.78 5.72a.75.75 0 0 0-1.06 1.06L8.94 10l-3.22 3.22a.75.75 0 1 0 1.06 1.06L10 11.06l3.22 3.22a.75.75 0 1 0 1.06-1.06L11.06 10Z" fill="currentColor"/>
  </svg>`,

  plus: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M17 10a.75.75 0 0 1-.75.75h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5a.75.75 0 0 1 1.5 0v5.5h5.5A.75.75 0 0 1 17 10Z" fill="currentColor"/>
  </svg>`,

  chk: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M15.78 5.97a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L3.97 10.72a.75.75 0 0 1 1.06-1.06l3 3 6.69-6.69a.75.75 0 0 1 1.06 0Z" fill="currentColor"/>
  </svg>`,

  // Content
  drag: `<svg class="ic" viewBox="0 0 20 20">
    <path d="M7 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM13 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM7 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM13 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM7 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM13 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" fill="currentColor"/>
  </svg>`,

  info: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7.25-3.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75Zm0 2.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" fill="currentColor"/>
  </svg>`,

  srch: `<svg class="ic" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M13.74 12.68a6.5 6.5 0 1 1 1.06-1.06l3.26 3.27a.75.75 0 1 1-1.06 1.06l-3.26-3.27Zm.76-5.18a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" fill="currentColor"/>
  </svg>`,

  tags: `<svg class="ic-xl" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h5a1.5 1.5 0 0 1 1.06.44l10 10a1.5 1.5 0 0 1 0 2.12l-5 5a1.5 1.5 0 0 1-2.12 0l-10-10A1.5 1.5 0 0 1 1 7.5v-5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor"/>
  </svg>`,

};
```

> **Usage:** Embed `IC.chevL`, `IC.del`, etc. directly inside template literal HTML strings. For static HTML, copy-paste the SVG inline.

---

## 8. JavaScript Utility Functions

These functions appear identically in every page. Copy them verbatim.

```javascript
// DOM shorthand
const $ = id => document.getElementById(id);

// XSS-safe string escaping — always use before inserting user data into innerHTML
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
```

---

## 9. Save / Cancel Pattern (Snapshot & Restore)

Every page with editable state follows this pattern:

```javascript
// 1. Deep-copy initial state as the "saved" baseline
let workingData = getInitialData();
let savedData   = JSON.parse(JSON.stringify(workingData));

// 2. Save button: commit working → saved, flash confirmation
$('save-btn').onclick = () => {
  savedData = JSON.parse(JSON.stringify(workingData));
  const btn = $('save-btn');
  const prev = btn.innerHTML;
  btn.innerHTML = IC.chk + ' Saved';       // checkmark flash
  setTimeout(() => { btn.innerHTML = prev; }, 1500);
};

// 3. Cancel button: restore saved → working, re-render
$('cancel-btn').onclick = () => {
  workingData = JSON.parse(JSON.stringify(savedData));
  render();
};
```

---

## 10. Spacing Utilities

```css
.mt3 { margin-top: 12px; }
.mt4 { margin-top: 16px; }
.mt5 { margin-top: 20px; }
.mt6 { margin-top: 24px; }

/* Flex row helpers */
.frow  { display: flex; gap: 8px; }
.fbe   { justify-content: space-between; align-items: center; }
.fend  { justify-content: flex-end; }

/* Grid */
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.g3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }

.hidden { display: none !important; }
```

---

## 11. Page Boilerplate (Full Template)

Use this as the starting point for every new page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Title – Findter Filter &amp; Search</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap" rel="stylesheet">
<style>
/* === PASTE FULL :root + base styles HERE === */
/* === PASTE only the component CSS you need === */
.hidden{display:none!important}
</style>
</head>
<body>
<div class="lay">
  <aside class="sb" id="sidebar">
    <div class="sb-hd">
      <div class="sb-logo">Fd</div>
      <span class="sb-title nav-lbl">Findter Filter &amp; Search</span>
      <button class="sb-tgl" id="sidebar-toggle" title="Toggle sidebar">
        <span id="toggle-icon"></span>
      </button>
    </div>
    <div class="sb-nav" id="nav"></div>
  </aside>
  <main class="main">
    <div class="pg">
      <!-- PAGE CONTENT HERE -->
    </div>
  </main>
</div>
<script>
const $=id=>document.getElementById(id);
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

const IC={
  chevL:`<svg class="ic" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.78 5.97a.75.75 0 0 1 0 1.06L8.81 10l2.97 2.97a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" fill="currentColor"/></svg>`,
  chevR:`<svg class="ic" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.22 5.97a.75.75 0 0 0 0 1.06L11.19 10 8.22 12.97a.75.75 0 1 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0Z" fill="currentColor"/></svg>`,
};

const NAV=[
  {id:'filter',label:'Filter'},{id:'search',label:'Search'},
  {id:'metafield',label:'Metafield'},{id:'ymm',label:'Year Make Model'},
  {id:'grid',label:'Filter & Product Grid Design'},{id:'settings',label:'Settings'},
  {id:'analytics',label:'Analytics'},{id:'advanced',label:'Advanced Features'},
];
const ENABLED=new Set(['settings','metafield','ymm']);
const ACTIVE='settings'; // ← CHANGE THIS per page
let col=false;

function renderNav(){
  $('nav').innerHTML=NAV.map(n=>{
    const en=ENABLED.has(n.id),act=n.id===ACTIVE;
    return `<button data-nav="${n.id}" ${en?'':'disabled'} class="nav-btn${act?' act':''}" title="${n.label}"><span class="nav-lbl">${escapeHtml(n.label)}</span></button>`;
  }).join('');
  $('nav').querySelectorAll('[data-nav]').forEach(b=>{
    if(ENABLED.has(b.dataset.nav))b.onclick=()=>{
      const v=b.dataset.nav;
      if(v==='settings')location.href='index.html';
      else if(v==='metafield')location.href='Metafield.html';
      else if(v==='ymm')location.href='YearMakeModel.html';
    };
  });
  updateSb();
}
function updateSb(){
  $('sidebar').classList.toggle('col',col);
  $('sidebar').querySelectorAll('.nav-lbl').forEach(el=>el.classList.toggle('hidden',col));
  document.querySelector('.sb-title').classList.toggle('hidden',col);
  $('toggle-icon').innerHTML=col?IC.chevR:IC.chevL;
}
$('sidebar-toggle').onclick=()=>{col=!col;updateSb();};

renderNav();
// ... page-specific JS below
</script>
</body>
</html>
```

---

## 12. File Map

| File                     | Sidebar ACTIVE | Description                              |
|--------------------------|----------------|------------------------------------------|
| `index.html`             | `settings`     | Settings hub with 3 nav cards            |
| `Sort_by.html`           | `settings`     | Drag-drop sort options table + toggles   |
| `Translate.html`         | `settings`     | 5-subtab translation fields              |
| `Synonyms.html`          | `settings`     | Synonym groups list + add/edit modal     |
| `Metafield.html`         | `metafield`    | Metafield table with Apply-to modal      |
| `YearMakeModel.html`     | `ymm`          | YMM widget configuration + card layout  |

---

## 13. Rules Summary (Quick Reference)

| What                        | Rule                                                              |
|-----------------------------|-------------------------------------------------------------------|
| Font weights                | 450 / 550 / 650 / 700 — never 400/500/600                        |
| Card border-radius          | 8px (`--r2`) — never rounded-xl or 12px for cards                |
| Modal border-radius         | 12px (`--r3`) — only modals                                       |
| Sidebar background          | White (`--sf`) — never gray                                       |
| Primary button background   | `#303030` (`--fill`) — never blue for primary actions             |
| Focus ring                  | `0 0 0 3px rgba(0,91,211,.2)` — always this exact blue           |
| Icon size                   | 16×16px standard, 12×12px small, 40×40px empty state             |
| Icons                       | Inline SVG only — never FA, never external image                  |
| Disabled nav items          | Use `[disabled]` attribute + `--textd` color                      |
| Table header text           | 11px, uppercase, letter-spacing .06em, `--text2`                  |
| Page max-width              | `960px` centered with 24px padding                               |
| Save feedback               | Checkmark flash for 1500ms — never alert() or toast library       |
| XSS safety                  | Always call `escapeHtml()` before inserting strings to innerHTML  |
| Toggle size                 | 44×24px track, 18×18px thumb, 3px padding, translateX(20px) on   |
| Modal max-width             | 460px standard, 380px small variant                               |
