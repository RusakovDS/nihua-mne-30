# AGENTS.md

## What this repo is
No code exists yet. The only file is `plan.pdf` — a Russian technical spec (ТЗ) for a
**mobile-only, single-page birthday-invitation website** ("Лиза 30 лет!").
All work must follow that spec; it is the source of truth.

## Reading the spec
`pdftotext` without encoding flags produces garbled Cyrillic. Always extract with:
```
pdftotext -enc UTF-8 plan.pdf -
```

## Deliverable
- A single static `index.html` with CSS and JS inline (no backend, no bundler, no build step).
- Deployable to any static host by copying `index.html`, `photos/`, `music/`.
- There is no test, lint, or typecheck tooling — verify changes by opening the page.

## Hard constraints from the spec
- **Mobile only.** Target width 360–430px; on desktop just center a narrow column.
  First screen height must use `dvh` (account for mobile address bar).
- **Never invent copy.** Quoted Russian texts in the spec must be used verbatim.
  Anything the spec does not define (hosting, stack, colors, fonts, code-word gate)
  is the developer's choice; anything the *customer* still owes (photos, links, map
  coords) must be a `TODO` placeholder — list those at the end.
- **Assets use exact filenames** (create `photos/` and `music/`):
  `header-1.jpg`…`header-4.jpg`, `cottage.jpg`, `pool.jpg`, `banya.jpg`,
  `quote.jpg`, `dresscode-1.jpg`…`dresscode-6.jpg`, `helper-sister.jpg`,
  `helper-husband.jpg`, `glass.jpg`, `music/30-let.mp3`. Until real files arrive,
  substitute placeholders with these names.
- **Unknown links → TODO placeholders opened in a new tab:** Ohmywishes wishlist,
  questionnaire form, map embed (address: СНТ Строитель, 878, 644065, Омск, Советский округ).
- **Block order is fixed:** start screen → header → invitation + 3 cards → overnight
  quote → dress-code → mandatory condition → useful info → finale → questionnaire (last).

## Behavior quirks
- Music starts **only** on the "Открыть приглашение" button click (mobile autoplay
  block), loops forever, and there is **no mute button** by design.
- Confetti (e.g. `canvas-confetti`) fires once on that same click, in palette pinks.
- Blocks fade in on scroll; respect `prefers-reduced-motion`.
- Put all colors, fonts, and key sizes in CSS variables in one place for easy swapping.
- Use two Cyrillic-capable Google Fonts (bold uppercase + handwritten) and verify
  Cyrillic renders correctly.
