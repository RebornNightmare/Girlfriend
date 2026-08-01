# Happy Girlfriend Day ❤️

A cinematic, interactive "digital love letter" built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and Motion. Frontend-only — no backend, no database,
nothing to configure before it works.

## 1. Install

```bash
npm install
```

> This project was scaffolded without network access in the build sandbox, so
> `npm install` has **not** been run or verified here. Run it locally (or let
> Vercel run it on deploy) before your first `npm run dev` / `npm run build`.

## 2. Personalize (all in one place)

Open **`config/site.ts`** and edit:

- `girlfriendName`, `authorName`
- `relationshipStartDate` — powers the live Love Counter
- `musicEnabled` / `musicSrc` — see step 4 below

Then edit the content files in **`data/`** — nothing is hardcoded in components:

| File | Powers |
|---|---|
| `data/memories.ts` | The Love Story timeline (5 chapters) and the photo gallery captions/images |
| `data/reasons.ts` | The 100 flip cards |
| `data/messages.ts` | The "Secret Letters" envelopes |
| `data/promises.ts` | The notebook-paper promise list |
| `components/sections/FinalLetter.tsx` | The `LETTER_BODY` constant near the top |

## 3. Add real photos (optional but recommended)

The photo gallery currently uses generated placeholder artwork at
`public/images/gallery-1.svg` … `gallery-6.svg`. Drop real photos into
`public/images/` (JPEG/PNG/WebP all work) and point `data/memories.ts` →
`galleryPhotos[].src` at them, e.g. `/images/us-at-the-beach.jpg`.

## 4. Add background music (optional)

1. Add an MP3 at `public/audio/theme.mp3`
2. Set `musicEnabled: true` in `config/site.ts`

Music never autoplays — it only starts after the person taps the floating
music button (bottom-right), which satisfies mobile browser autoplay rules.

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 6. Lint & build

```bash
npm run lint
npm run build
```

## 7. Deploy to Vercel

```bash
npx vercel
```

or connect the repo at vercel.com — zero configuration needed, it's a
standard Next.js app.

---

## What's inside

- **Loading screen** → animated heart, progress bar, respects reduced motion
- **Hero** → aurora background, floating hearts, letter-by-letter title reveal
- **Love Story Timeline** → scroll-reveal vertical timeline from `data/memories.ts`
- **Photo Gallery** → polaroid-style cards with hover zoom, `next/image` lazy loading
- **Love Counter** → live days/hours/minutes/seconds ticking from `relationshipStartDate`
- **100 Reasons** → flip cards, keyboard accessible (Enter/Space), from `data/reasons.ts`
- **Heart Garden** → interactive `<canvas>` — click/tap to bloom flowers, hearts, sparkles, butterflies (capped particle count, 60fps loop)
- **Secret Letters** → floating envelopes that open into a modal message, from `data/messages.ts`
- **Promises** → notebook-paper section with a handwriting-style reveal, from `data/promises.ts`
- **Final Letter** → paper unfold + typewriter effect, editable in `FinalLetter.tsx`
- **Final Surprise** → glowing "Don't Click" button → `canvas-confetti` celebration
- **Ending Scene** → night sky, twinkling stars, moon, rising lanterns, closing message

## Engineering notes

- Every animation-heavy component checks `useReducedMotion()` and falls back
  to a static/simple state for people with `prefers-reduced-motion: reduce`.
- `HeartGarden`, `SecretLetters`, and `FinalSurprise` are loaded via
  `next/dynamic` (`ssr: false`) to keep the initial JS bundle lean.
- No file exceeds ~300 lines; content is fully separated from presentation.
- Colors, fonts, and animation keyframes are defined once in
  `tailwind.config.ts` / `app/globals.css` — no magic numbers scattered
  through components.
- Metadata, Open Graph, and Twitter card tags are set in `app/layout.tsx`
  via `config/site.ts`.

## Known limitations to be aware of

- The gallery ships with generated placeholder SVG artwork, not real photos
  (none were provided) — swap them in per step 3 above.
- No audio file is bundled — music is off by default until you add one.
- `npm install` / `npm run build` have not been executed in this environment
  (no network access here); please run them before deploying to catch any
  environment-specific issues.
