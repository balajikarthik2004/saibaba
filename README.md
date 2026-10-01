# Sai Sannidhi — Devotee App for the Shirdi Sai Baba Temples of North America

A front-end-only devotee companion for a **network** of Shirdi Sai Baba temples in the United States.
React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7. All data is mocked — no backend yet.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run lint
```

---

## 1. Domain research — what a Sai Baba temple actually is

Everything in the UI is modelled on how these temples really run.

### The four daily aartis

This is the spine of the product. Every Shirdi Sai temple in the world keeps the same four, in the same
order Baba kept them in Dwarkamai:

| Aarti | Devanagari | When | Meaning |
|---|---|---|---|
| **Kakad** | काकड आरती | Dawn | Waking Baba with lit cloth-wick torches |
| **Madhyan** | मध्यान्ह आरती | Noon | The hour He took bhiksha; naivedyam, then annadanam |
| **Dhoop** | धूप आरती | Dusk | Incense; lamps lit; **Udi distributed** |
| **Shej** | शेज आरती | Night | Baba laid to rest; sanctum closed |

**Clock times differ per temple**, which is the key product insight. Observed real examples:

- Dallas/DFW — Kakad **5:15 AM**, Madhyan 12:00, Dhoop 6:15 PM, Shej 9:00 PM
- Milpitas (Shirdi Sai Parivaar) — 6:30 AM / 12:00 / 6:30 PM / 8:30 PM
- Chicago — 10:00 AM / 12:00 / 5:00 PM / 8:00 PM

Because the network spans PT/CT/ET, **every timing in this app is computed in the temple's own IANA
timezone**, not the visitor's. See `src/lib/utils.ts` → `minutesNowIn`, `aartiStatus`.

### Thursday is the whole week

Thursday (Guruvar) is Baba's day: palki/palanquin procession after Dhoop Aarti, bhajan sandhya, Udi
distribution, and the largest annadanam. The app surfaces Thursday everywhere — hero badge, calendar
highlighting, annadanam day-picker, event list.

### The festival calendar

- **Vijayadashami / Punyatithi** (Baba's Mahasamadhi, 15 Oct 1918) — the holiest day; 3 days of
  continuous parayan, 108-kalasha abhishekam, maha annadanam
- **Ram Navami / Urs** — Baba *himself* fixed the Urs on Rama Navami so Hindu and Muslim devotees would
  keep one festival together. Chandan procession, rath yatra, flag change.
- **Guru Purnima**, **Datta Jayanti** (Baba is revered as a Datta avatar), Navratri, Deepavali,
  Shivaratri, Kartik Purnima, Makar Sankranti

### Sevas and the US price ladder

Observed real US temple pricing informed `src/data/sevas.ts`:
Archana ~$11–21 · Abhishekam ~$31–75 · Satyanarayana Vratham ~$101–151 ·
Annadanam ~$116–301 · yearly sponsorships $501–$2,501.

Every seva needs a **sankalpa**: devotee name + **gotra** + **nakshatra**. The booking form models this,
including the real-world provision that devotees who don't know their gotra use Kashyapa ("Not known").

### Who the devotees are

- Multi-generational, multilingual: Telugu, Hindi, Marathi, Tamil, Gujarati, Kannada, English
- Three distinct cohorts: elders (rides + home prasad), working families (Thursday + festivals),
  students/youth (campus satsang buses, Sai Yuva retreats)
- A large diaspora that **cannot physically attend** — hence live darshan, virtual seva, and Udi by mail
- Non-Hindu neighbours and first-time visitors — hence the explicit "first visit" guide

### The non-negotiables of Sai practice

- **Shraddha & Saburi** — faith and patience, the only two coins Baba asked for
- **Sabka Malik Ek** — one Master of all; he kept a fire and a mosque, read the Quran and the Gita
- **Annadanam** — feed whoever comes, no questions. The single most-sponsored seva.
- **Udi** — ash from the perpetual Dhuni, given free to everyone
- **Shri Sai Satcharitra** — 53 chapters, read as a 7-day **Saptah Parayan**, Thursday to Thursday

---

## 2. Design direction — deliberately *not* the Meenakshi site

| | Meenakshi reference | **Sai Sannidhi** |
|---|---|---|
| Deity character | Goddess temple — jewel tones, gopuram colour | Fakir-saint — ash, fire, sandalwood |
| Palette | Bright temple-south colours | **Dhuni at dusk**: ember saffron + antique gold on deep sandal-brown night |
| Motif | Gopuram / kolam | **Dhuni embers, rotating mandala, dīpa flame, Dwarkamai arch** |
| Type | — | Marcellus (display) · Cormorant Garamond (quotes) · Outfit (UI) · Tiro Devanagari |
| Structure | Single temple | **Multi-temple network with a global sannidhi switcher** |

Signature elements: rising ember particles from the Dhuni, a slowly counter-rotating mandala behind
every major section, a circular aarti countdown ring, gold hairline borders, parchment grain, and a
full **sandalwood-parchment light mode**.

All artwork is **inline SVG generated in code** (`src/components/Sacred.tsx`) — no image files, nothing
to break, crisp at any size. `ArtTile` renders deterministic motifs as photography placeholders; swap it
for real temple imagery when the media library exists.

---

## 2b. Photography

All imagery is real, licensed photography fetched from **Wikimedia Commons** and verified to load before
being written into `src/data/images.ts` (67 entries, each with `alt`, `credit`, `license` and `source`).

- `src/components/Photo.tsx` renders every image with a shimmering skeleton while it decodes, a fade-in,
  and a drawn SVG fallback (`ArtTile`) if the network is unavailable — a card is never blank or broken.
- Pass `fill` for a background image; pass `ratio` for an inline one. **Do not pass `absolute inset-0`
  via `className`** — Tailwind's `relative` on the component wins and the image collapses to no height.
- `/credits` lists every photograph with its author and licence. The CC BY / CC BY-SA licences here
  **require** that page stay reachable while these images are in use.
- To swap in the temples' own photography: replace the `src` of each entry in `src/data/images.ts`.
  Nothing else changes.

## 2c. Development authentication & dashboard

`/login` is a **development-only** sign-in: no server, no password check, no token. Any email plus a
four-character password signs you in, and there are three one-click demo accounts (Devotee, Volunteer,
Trustee). The session is a record in `localStorage`.

- `/dashboard` is a sidebar app shell — devotee card, navigation, a live next-aarti widget and a temple
  photo — with sections for Overview, My Sevas, Giving & Receipts, Parayan, Saved and Profile.
- `RequireAuth` (exported from `src/pages/Login.tsx`) guards `/dashboard/*` and bounces to `/login`,
  remembering where you were headed.
- The old `/account` route now redirects into the dashboard.
- **To make this real:** replace `signIn` in `src/lib/store.tsx` with an API call. Nothing else in the
  app reads credentials.

## 3. Features

**Worship** — Aarti timings & live countdown per temple · lyrics in Devanagari + transliteration +
meaning · mock audio player · seva catalogue (20 sevas, 6 categories) with full sankalpa booking flow,
basket and checkout · live darshan page with per-aarti reminders and devotee chat · annadanam
sponsor-a-day calendar with 4 tiers.

**Gather** — 10-temple network with region filter, search and ZIP-based nearest-temple finder · temple
detail pages (aartis, weekly schedule, priests & languages, facilities, deities, directions) · festival
calendar in list **and** month-grid view with RSVP · volunteer roles with signup · masonry gallery with
lightbox and favourites.

**Learn** — Sai Satcharitra: all 53 chapters, 7-day Saptah tracker with persisted progress, reader
modal · teachings: Eleven Assurances, six guiding principles, life timeline, quote wall, Udi
explainer · devotee experiences with submission form · first-visit guide, FAQ, contact form, directory.

**Personal** — dev sign-in with three demo roles · sidebar dashboard (overview, sevas, giving + tax
receipts, parayan, saved photos, profile with gotra/nakshatra) · donations with 6 campaigns, progress
bars and 501(c)(3) receipt generation.

**Cross-cutting** — global temple switcher (every timing follows it) · dark/light theme · 5 languages
for nav and key labels (EN/HI/TE/TA/MR) · daily panchang widget · announcement ticker · toasts ·
scroll reveals · `prefers-reduced-motion` respected · everything persisted to `localStorage`.

## 3b. How this build was verified

Driven in headless Chrome via `puppeteer-core`: all 18 public routes plus 6 dashboard routes loaded and
screenshotted, in dark mode, light mode and at 390 px. Checked on every page: console errors, failed
requests, broken images, horizontal overflow, and that an `h1` is present. Flows exercised end to end:
`/dashboard` → `/login` redirect, demo sign-in → dashboard, `/account` → `/dashboard`, and seva booking
(modal → basket → confirmation). Last run: no problems found.

---

## 4. Architecture

```
src/
  data/        temples · sevas · events · satcharitra · community · aarti+panchang · images
  lib/         types · store (Context + localStorage) · utils (tz-aware time) · i18n
  components/  Sacred (SVG art) · Photo · ui (design system) · Shell (header/footer) · AartiRing
  pages/       21 routes, lazy-loaded except Home; Dashboard holds its own nested routes
```

### Encoding warning for Windows

Source files are UTF-8 **without BOM** and contain Devanagari and typographic punctuation. Windows
PowerShell 5.1's `Get-Content -Raw` decodes them as ANSI, so a `Get-Content | Set-Content` round-trip
silently corrupts every non-ASCII character. Edit these files with an editor or Node, never with a
PowerShell read-modify-write.

State lives in one `AppProvider` (`src/lib/store.tsx`): selected temple, theme, language, seva basket,
bookings, donations, parayan progress, favourites, profile, toasts. All of it persists to
`localStorage` — nothing leaves the browser.

## 5. Replacing the mocks with a backend

1. `src/data/*.ts` are the API contracts — each exported array maps to one endpoint.
2. Swap the `localStorage` helpers in `store.tsx` for authenticated fetches.
3. Payments: wire `Checkout.tsx`, `Donate.tsx` and `Annadanam.tsx` to Stripe; they already produce
   booking IDs and receipt numbers in the right shape.
4. Live darshan: drop a real player into the placeholder in `Darshan.tsx`.
5. Panchang: replace `panchangFor()` with a real ephemeris (drik-panchang style) per temple lat/lng.

`vercel.json` already contains the SPA rewrite needed for client-side routing.

---

**Note on data.** Temple names, addresses, phone numbers, prices, counts and festival dates in this
build are illustrative placeholders modelled on real temples. Verify every figure with the respective
sansthan before anything goes live.

`ॐ साईं राम`
