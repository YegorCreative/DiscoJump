# Disco Jump

**Discover places that match who you actually are.**

Disco Jump is a mobile-first lifestyle discovery app that learns your personal taste profile — your *Vibe DNA* — and recommends restaurants, nightlife venues, cafés, galleries, and hidden gems that genuinely fit how you live. No generic lists. No paid placements. Just places ranked for you.

---

## The Concept: Vibe DNA

Most discovery apps show you what's popular. Disco Jump shows you what's *yours*.

When you take the Vibe DNA quiz, Disco Jump builds a profile of your lifestyle personality — one of six types: **Night Crawler**, **Elevated One**, **Culture Seeker**, **Social Spark**, **Cozy Soul**, or **Urban Explorer**. Every place in the app is then scored against your profile in real time, so the discover feed, mood engine results, and place match scores all reflect your actual taste — not the crowd's.

Your DNA is stored locally. No account required.

---

## MVP Features

### Home
- Personalized greeting based on time of day
- Recommended places grid, ranked by Vibe DNA match when a profile exists
- Hidden gems section
- Mood chip row (visual, sets up for filter integration)
- "I Feel Like…" CTA to open the Mood Engine

### Discover
- **Functional search** — searches place name, category, location, tags, and description in real time
- Filter chips: For You, Food, Nightlife, Cozy, Adventure, Hidden Gems
- "For You" tab ranks places by full DNA score when a profile is set
- DNA context strip shows active vibe type when filtering
- Polished empty state for no-results searches
- Mood chip browser at the bottom

### Vibe DNA Quiz (`/onboarding`)
- 5-step quiz covering food style, nightlife preference, energy level, exploration style, and social context
- Animated step transitions with direction awareness (Framer Motion)
- Scores answers against 6 vibe type archetypes and picks the best match
- Full result screen: vibe type, tagline, traits, and a "Go Explore" CTA
- Saves profile to `localStorage` under `dj_vibe_profile`

### Place Detail (`/place/[id]`)
- Hero image with back button and share button
- Full metadata: category, location, distance, price level
- Vibe Match Score (uses DNA score when profile exists, falls back to static score)
- "Why it matches your vibe" — 3 contextual reasons
- "Best for" tags
- Save to Collection button (persists to `localStorage`)
- Functional "Open in Map" button (opens Google Maps)
- "Explore more places" back link

### Saved (`/saved`)
- Lists all saved places with name, category, location, distance
- Thumbnail links to place detail
- Polished empty state with CTA to Discover

### Profile (`/profile`)
- Dynamic Vibe DNA section — shows quiz result, vibe type, traits, and retake button
- Skeleton state during hydration
- CTA to take the quiz if no profile exists
- Settings rows (mock — no backend)

### Mood Engine (`/` → "I Feel Like…" modal)
- 3-step flow: feeling → energy level → distance
- Animated step transitions
- Result screen shows 3 matched places, ranked by DNA score when available
- "🧬 Ranked by your Vibe DNA" label when profile exists
- "Build DNA →" prompt when no profile
- Each result card links directly to the place detail page

### First-Run Welcome
- Full-screen welcome overlay for first-time visitors
- Dismissed to `localStorage` (`dj_dismissed_welcome`) and never shown again

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| UI | React 19 |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) |
| Styling | CSS custom properties + Tailwind CSS v4 (utility classes minimal) |
| Fonts | [Syne](https://fonts.google.com/specimen/Syne) (display) · [Inter](https://fonts.google.com/specimen/Inter) (body) via `next/font` |
| Data | Static TypeScript files — no database, no API |
| Persistence | `localStorage` — no auth, no backend |
| Rendering | Fully static (SSG) — all 17 routes prerendered at build time |

---

## Local Setup

**Requirements**: Node.js 18+ and npm.

```bash
# Clone
git clone https://github.com/YegorCreative/DiscoJump.git
cd DiscoJump

# Install
npm install

# Development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm run start

# Lint
npm run lint
```

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── globals.css         # Design tokens + global styles
│   ├── discover/           # Discover page + DiscoverClient
│   ├── onboarding/         # Vibe DNA quiz
│   ├── place/[id]/         # Dynamic place detail (SSG)
│   ├── profile/            # Profile page + ProfileVibeSection
│   ├── saved/              # Saved places page
│   └── vibe/               # Static Vibe DNA showcase page
│
├── components/
│   ├── home/               # Home-specific components
│   │   ├── HomeClient.tsx
│   │   ├── HomeHeader.tsx
│   │   ├── RecommendedPlaces.tsx
│   │   ├── HiddenGems.tsx
│   │   ├── IFeelLikeCTA.tsx
│   │   ├── MoodChipRow.tsx
│   │   └── DiscoBallHeroBackground.tsx
│   ├── layout/             # App frame
│   │   ├── AppShell.tsx    # Phone frame wrapper
│   │   ├── BottomNav.tsx   # 5-tab navigation
│   │   └── GlowBackground.tsx
│   ├── mood/               # Mood Engine modal
│   │   ├── MoodEngineModal.tsx
│   │   ├── MoodStep.tsx
│   │   ├── MoodOptionButton.tsx
│   │   ├── MoodResultPreview.tsx
│   │   └── SelectedMoodTags.tsx
│   ├── place/              # Place detail components
│   │   ├── PlaceDetailCard.tsx
│   │   ├── PlaceDetailHero.tsx
│   │   └── PlaceNotFound.tsx
│   └── ui/                 # Shared primitives
│       ├── PlaceCard.tsx
│       ├── MoodChip.tsx
│       ├── SaveButton.tsx
│       ├── SectionHeader.tsx
│       ├── VibeCard.tsx
│       └── DNAStat.tsx
│
├── data/                   # All static data
│   ├── places.ts           # 8 place entries (Place[])
│   ├── moods.ts            # 10 mood chips
│   ├── quiz.ts             # 5-question quiz + 6 vibe type definitions
│   ├── vibeDNA.ts          # Static DNA traits for /vibe page
│   └── saved.ts            # Mock saved collections (unused in MVP)
│
├── hooks/
│   ├── useVibeProfile.ts   # Read/write dj_vibe_profile from localStorage
│   └── useSavedPlaces.ts   # Read/write dj_saved_places from localStorage
│
├── lib/
│   └── placeScoring.ts     # scorePlaceForProfile() + buildDNAScoreMap()
│
└── types/
    └── index.ts            # Shared interfaces: Place, Mood, VibeDNATrait, etc.
```

---

## localStorage Keys

| Key | Type | Description |
|---|---|---|
| `dj_vibe_profile` | `{ vibeTypeId, completedAt }` | Vibe DNA quiz result. Drives all personalized sorting. |
| `dj_saved_places` | `string[]` | Array of saved place IDs. |
| `dj_dismissed_welcome` | `"true"` | Set on first-run welcome dismissal. Never shown again once set. |

All keys are namespaced with `dj_` to avoid collisions.

---

## Design System

Disco Jump uses a dark cinematic aesthetic with neon accents. All tokens are CSS custom properties defined in `globals.css`.

**Core palette**

| Token | Value | Usage |
|---|---|---|
| `--dj-surface` | `#0e0e16` | Page background |
| `--dj-card` | `rgba(255,255,255,0.04)` | Card/input backgrounds |
| `--dj-border` | `rgba(255,255,255,0.08)` | Subtle borders |
| `--dj-text` | `#f0eff4` | Primary text |
| `--dj-text-secondary` | `#a09fb5` | Supporting text |
| `--dj-muted` | `#5e5d72` | Placeholder / disabled text |
| `--dj-purple` | `#9b5de5` | Primary accent |
| `--dj-purple-light` | `#b47aff` | Active states |
| `--dj-cyan` | `#00f5ff` | DNA / data accent |
| `--dj-gradient-primary` | `135deg, #9b5de5 → #f72585` | Buttons, highlights |

**Typography**: Syne (`--font-display`) for headings, Inter (`--font-body`) for body. Display sizes use `clamp()` for fluid scaling.

**Motion**: All transitions use `[0.22, 1, 0.36, 1]` cubic-bezier (fast ease-out). Slide animations are direction-aware (forward/back).

**Layout**: The app renders inside a centered phone frame (max-width 430px) on desktop. On actual mobile it fills the viewport. Bottom navigation is always visible.

---

## Known Limitations

These are intentional MVP scope boundaries, not bugs.

- **`/vibe` page is static** — it shows hardcoded DNA traits from `vibeDNA.ts`, not the user's actual quiz result. The "Full DNA →" link from Profile lands here but isn't personalized yet.
- **Mood chips on Home are decorative** — they toggle visual state but don't filter the place list.
- **Search bar does not auto-focus on mobile** — iOS suppresses `focus()` without a direct user gesture.
- **"Share" button on place detail** has no handler — placeholder for the Web Share API.
- **Profile settings rows** (Notifications, Privacy, Help) have no interaction — mock UI.
- **"Edit Profile" and "Sign Out"** on the Profile page have no handlers — no auth system.
- **Place data is static** — all 8 places are hardcoded in `places.ts`. No live data source.
- **Distance is static** — `distance` field is a hardcoded string, not calculated from the user's location.

---

## Roadmap

Prioritized next steps to move beyond MVP.

### Near-term
- [ ] **Dynamic `/vibe` page** — read `dj_vibe_profile` and render the user's actual vibe type content instead of static traits
- [ ] **Mood chip filtering on Home** — wire mood chips to filter `RecommendedPlaces`
- [ ] **Web Share API** on place detail — enable native share sheet on mobile
- [ ] **Retake quiz confirmation** — warn user that retaking will overwrite their current profile

### Mid-term
- [ ] **More place data** — expand `places.ts` to 20–30 entries covering more categories and cities
- [ ] **Saved collections** — group saved places into named collections (data model exists in `saved.ts`)
- [ ] **Place map view** — toggle between card grid and map pin view on Discover
- [ ] **Geolocation distance** — calculate real distance using `navigator.geolocation`

### Long-term
- [ ] **Backend + real data** — replace static data with a live places API
- [ ] **City selection** — allow users to browse places in different cities
- [ ] **Social features** — share place recommendations with friends
- [ ] **Auth + cloud sync** — persist saved places and DNA profile across devices

---

## License

MIT — see [LICENSE](LICENSE) for details.
