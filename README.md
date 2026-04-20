# wego

**wego** is a mobile-first web app that connects exchange students with partner schools and host families abroad.

This project is a **thesis demo** — all features are fully functional at a mock level (no real backend, no real authentication).

---

## Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with design tokens extracted from Figma
- **UI**: custom components + shadcn/ui primitives + `lucide-react` icons
- **State**: Zustand (with `persist` on `localStorage`)
- **Forms**: `react-hook-form` + `zod`
- **Animations**: `framer-motion`
- **Mock backend**: Next.js API routes serving Zustand-backed in-memory data
- **Fonts**: Quicksand (Google Fonts)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Because the app is designed for mobile, the desktop view renders inside a 393 × dvh mobile frame (iPhone 16 viewport) centered on the page. On mobile devices the frame expands to full screen.

### Build & preview

```bash
npm run build
npm start
```

---

## User roles

The app supports three roles, selectable from the welcome screen:

1. **Student** — browses partner schools and applies to mobility programs.
2. **Host family** — browses exchange students and starts conversations.
3. **Both** — a parent who is both sending a child abroad AND hosting. A toggle in the Profile page switches between the two experiences without logging out.

### Demo accounts

Any email/password combination logs you in as the role selected on the welcome screen. After onboarding, a demo student (`Giorgia`) or demo family (`Rath family`) is loaded.

---

## Main flows

### Authentication & onboarding
- Welcome screen → Role selector → Signup wizard (4 steps: name, ID upload, email/password, account ready)
- **Student onboarding** (9 steps): birthday, city, languages, lifestyle, hobbies, bio, pictures, video, done
- **Family onboarding** (6 steps): home type, members, pets, bio, photo, done
- All uploads are mocked with a fake progress animation

### Student app (`/student/*`)
- **Discover schools** — filterable list (language, duration, orientation, etc.)
- **School detail** — gallery, mobility options, highlights accordion, coordinator, testimonials, pricing
- **Apply** — report card upload, duration, motivation letter, confirmation modal
- **Applications** — list + detail with status timeline + demo "school accepted you" action
- **Chat** — conversations with scripted bot replies
- **Profile** — personal info + view toggle (if role === Both)

### Family app (`/family/*`)
- **Discover students** — filterable grid (gender, duration, nationality)
- **Student detail** — bio, lifestyle tabs, hobbies, "Send a message"
- **Connections** — wishlisted students
- **Chat** — same shared chat components as the student side
- **Profile** — family info + view toggle

---

## Project structure

```
src/
├── app/
│   ├── (auth)/            # Welcome, login, role-select, signup wizard, onboarding
│   ├── student/           # Authenticated student routes
│   ├── family/            # Authenticated family routes
│   └── api/               # Mock REST endpoints (schools, students, families)
├── components/
│   ├── brand/             # wego logo, airplane progress bar, decorative SVGs
│   ├── ui/                # Button, IconButton (class-variance-authority)
│   ├── auth/              # WizardShell, TextInput, UploadBox
│   ├── student/           # SchoolCard, FilterSheet, ApplicationCard
│   ├── family/            # StudentCard, FilterSheet
│   └── shared/            # BottomNav, BottomSheet, ConfirmModal, ChatList, etc.
├── lib/
│   ├── mock/              # Seed data (schools, students, families, threads)
│   ├── store/             # Zustand stores (auth, signup, applications, ...)
│   ├── types.ts
│   └── utils.ts
└── styles/globals.css     # @theme design tokens (Figma colors, radii)
```

---

## Design tokens

All colors, radii and typography are taken 1:1 from the Figma file (`Tesi-UI`). They live as CSS custom properties inside `@theme` in `src/app/globals.css`, so you can reference them via Tailwind utilities (`bg-bg-card`, `text-student`, `rounded-card`, …).

Dark palette (authenticated app):
- `bg-primary` `#050821` · `bg-card` `#12184d` · `bg-nav` `#101544`

Brand colors:
- `student` `#6475e9` · `family` `#ff7834` · `both` `#520f33`

Light palette (auth / onboarding):
- `bg-light` `#f5f5f5` · `text-dark` `#17191f` · `placeholder` `#9d9d9d`

---

## Mock data

All entities (users, schools, students, families, applications, chat threads) live in `src/lib/mock/`. Images are served from Unsplash to avoid Figma CDN link expiration.

State mutations (submitting applications, chatting, toggling wishlist) are persisted to `localStorage` via Zustand's `persist` middleware, so refreshing the page keeps the demo state.

---

## Deploy on Vercel

```bash
npm i -g vercel
vercel
```

No environment variables are required — everything runs on mock data.

---

## Notes for the thesis demo

- This app is **not** production-ready. Security, real auth, payments, GDPR-compliant file storage and accessibility polish are intentionally out of scope.
- The goal is to prove UX & feasibility of the product concept, strictly following the Figma design without creative variations.
