<div align="center">

# VitaMate

**Your calm AI wellness companion — built for real people, not perfect ones.**

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini-2.0_Flash-8E75B2?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-6E8961?style=flat-square)

</div>

---

## Overview

VitaMate is a Thai-first wellness web application that uses conversational AI to help users understand their meals, meet daily health targets, and build mindful habits — without the pressure of rigid calorie counting.

Instead of demanding precise food logs, VitaMate lets users describe what they ate in natural Thai language and returns warm, contextual feedback alongside nutritional estimates. Daily targets for calories, protein, water, and sleep are calculated from a personalized onboarding profile using established nutritional science (Mifflin-St Jeor BMR).

The result is an app that feels more like a supportive friend than a fitness tracker.

---

## The Problem

Most health apps share the same fundamental flaws:

- **Generic goals** that ignore individual body composition, activity level, and lifestyle
- **Number overload** — dashboards full of data with no actionable guidance
- **Pressure-inducing UX** — red bars, missed streaks, and clinical language that makes users feel guilty
- **Fragmented tracking** — food, water, and sleep recorded in separate apps with no connection between them
- **English-first interfaces** that don't fit Thai conversational habits or food culture

---

## Solution

VitaMate reimagines wellness tracking around three principles:

1. **Conversation over forms** — tell Vita what you ate the way you'd tell a friend
2. **Personalization from day one** — a calm 7-step onboarding flow calculates targets specific to you
3. **Holistic view** — calories, protein, hydration, and sleep on one screen, connected

---

## Features

### Personalized Onboarding
A warm, step-by-step profile flow collects name, age, gender, height, weight, activity level, and health goal. Targets are calculated immediately using Mifflin-St Jeor BMR with goal-adjusted calorie offsets and personalized protein, water, and sleep recommendations.

### AI Meal Analysis
Users describe their meal in natural Thai — "ข้าวกะเพราไก่ไข่ดาว" — and Vita responds with a warm assessment, estimated macros, and a contextual tip. Gemini 2.0 Flash powers the responses; a rich keyword-based fallback system (25+ Thai meal templates) ensures the app always works, even when the API is rate-limited.

### Intelligent AI Cooldown
When Gemini returns a rate limit, VitaMate silently activates a 45-second cooldown, switches to local responses, logs exactly one console warning, and automatically resumes API calls when the window expires — no manual refresh required.

### Personalized AI Context
The Gemini system prompt is dynamically built from the user's profile — name, age, weight, goal, and daily targets. Responses reference the user's actual goals rather than generic advice.

### Daily Wellness Dashboard
A live dashboard shows calories consumed vs. personal goal, protein progress, daily water target (based on body weight), and sleep recommendation. All targets are derived from the user's profile — never arbitrary defaults.

### Responsive Mobile-First Design
Built for iPhone-sized screens first. The VitalStrip scrolls horizontally on mobile with snap points; all cards are touch-friendly with comfortable tap targets and glassmorphism aesthetics preserved at every breakpoint.

### Persistent Sessions
Meal history and the user profile are stored in `localStorage` so daily progress survives page refreshes. Meals serialize with ISO timestamps and restore correctly across sessions.

---

## Screenshots

<!-- Add onboarding flow screenshot here -->

<!-- Add dashboard overview screenshot here -->

<!-- Add meal analysis response card screenshot here -->

<!-- Add mobile layout screenshot here -->

---

## Tech Stack

VitaMate is built on a modern, lean stack chosen for rapid development, scalability, and a premium user experience — without unnecessary complexity at the MVP stage.

### Frontend
- **Next.js 16** — React framework powering the application with the App Router, server-side rendering, and built-in API routes
- **TypeScript 5** — Type-safe development across the entire codebase, reducing bugs and improving maintainability as the project grows
- **React 19** — UI rendering and component-based architecture

### UI / UX
- **Tailwind CSS v4** — Utility-first styling system for building responsive, consistent layouts quickly
- **shadcn/ui + Radix UI** — Accessible, unstyled component primitives customized to match VitaMate's wellness design language
- **Kanit & Prompt** — Google Fonts with full Thai script support, chosen for their clean and modern typographic feel
- **Custom keyframe animations** — Handcrafted CSS animations (`vita-rise`, `vita-appear`, `vita-breathe`) for a calm, premium motion language

### Backend
- **Next.js API Routes** — Serverless route handlers that process meal analysis requests and communicate with the Gemini API, keeping the backend lightweight and co-located with the frontend

### AI Integration
- **Google Gemini 2.0 Flash** — Large language model used for Thai-language meal analysis, nutritional estimation, and personalized wellness recommendations
- **Local fallback system** — 25+ keyword-matched Thai meal templates that activate automatically when the API is unavailable, ensuring the app always works
- **Intelligent cooldown manager** — Client-side rate-limit handling that silences repeated 429 errors, logs once, and resumes API calls automatically after a 45-second window

### State Management
- **React built-ins (`useState`, `useCallback`, `useMemo`)** — Lightweight state management without an external library; appropriate for the current feature scope
- **`localStorage`** — Persists the user profile and meal history across sessions with automatic Date serialization and silent failure handling for private browsing

### Database & Authentication
- **Supabase** *(planned)* — Postgres-backed database and authentication platform for cloud sync, user accounts, and multi-device support

### Deployment
- **Vercel** — Zero-configuration deployment platform with automatic preview environments, edge caching, and seamless Next.js integration

### Developer Tools
- **ESLint** — Code linting to enforce consistent style and catch issues early
- **TypeScript strict mode** — Stronger type guarantees across the codebase

---

> **Why this stack for an MVP?**
> Every technology here was chosen to maximize development speed without sacrificing quality. Next.js eliminates the need for a separate backend server. Tailwind and shadcn/ui make polished UI fast to build. Gemini's free tier means AI features are available from day one. And Vercel makes deployment a single command. The result is a production-quality prototype built and iterated on by a solo developer — a stack that scales naturally from hackathon to startup.

---

## Project Structure

```
vitamate/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # POST /api/analyze — Gemini integration
│   ├── globals.css                # Tailwind config + VitaMate keyframe animations
│   ├── layout.tsx                 # Root layout with Thai fonts
│   └── page.tsx                   # Entry point → AppShell
│
├── components/
│   ├── dashboard/
│   │   ├── DashboardClient.tsx    # Main dashboard state orchestrator
│   │   ├── DashboardHeader.tsx    # Navigation bar
│   │   ├── GreetingSection.tsx    # Time-aware Thai greeting
│   │   ├── HeroInputCard.tsx      # Meal input textarea + submit
│   │   ├── VitalChip.tsx          # Single metric card with SVG ring
│   │   ├── VitalStrip.tsx         # Row of VitalChips (calories, water, sleep)
│   │   └── VitaResponseCard.tsx   # AI response + loading skeleton + actions
│   ├── onboarding/
│   │   └── OnboardingFlow.tsx     # 7-step personalized onboarding card
│   ├── AppShell.tsx               # Profile-check router (onboarding ↔ dashboard)
│   ├── Logo.tsx
│   └── Ring.tsx                   # SVG progress ring component
│
├── lib/
│   ├── ai/
│   │   ├── availability.ts        # Cooldown manager (isAIAvailable, activateCooldown)
│   │   └── gemini.ts              # Gemini client with model-chain fallback
│   ├── health/
│   │   ├── calculateTargets.ts    # BMR → TDEE → personalized daily targets
│   │   └── profileStorage.ts      # localStorage helpers for UserProfile
│   ├── mock/
│   │   └── vitaResponses.ts       # 25+ keyword-matched Thai meal templates
│   └── types/
│       ├── profile.ts             # UserProfile, DailyTargets, Gender, etc.
│       └── vitamate.ts            # VitaResponse, MealEntry, DashboardStatus
│
├── .env.local                     # API keys (not committed)
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A [Google AI Studio](https://aistudio.google.com) API key (free tier is sufficient)

### Installation

```bash
git clone https://github.com/your-username/vitamate.git
cd vitamate
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required — Google Gemini API
GEMINI_API_KEY=

# Planned — Supabase (leave empty for local development)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

> **Note:** The app runs fully without a Gemini key. The local fallback system handles all responses using keyword-matched Thai meal templates and randomized defaults, so the complete UI experience is available offline.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The onboarding flow appears on first load. Complete it once and the dashboard is available on every subsequent visit.

---

## Personalization Engine

Daily targets are calculated from the user's onboarding profile using established nutritional formulas.

**BMR — Mifflin-St Jeor**

```
Male:   BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5
Female: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161
```

**TDEE = BMR × Activity Multiplier**

| Activity Level | Multiplier |
|---|---|
| Sedentary (desk work) | 1.20 |
| Light (some movement) | 1.375 |
| Moderate (3–4 days/week) | 1.55 |
| Active (daily training) | 1.725 |

**Goal Adjustments**

| Goal | Calorie Delta |
|---|---|
| Maintain weight | ±0 kcal |
| Lose weight | −400 kcal |
| Gain muscle | +200 kcal |
| Improve overall health | ±0 kcal |

**Other Targets**

| Target | Formula |
|---|---|
| Protein | 1.2–2.0 g/kg (scaled by activity and goal) |
| Water | 35 ml/kg body weight |
| Sleep | 7–9 h (adults) · 8–10 h (under 18) · 7–8 h (65+) |

---

## Roadmap

### Near-term
- [ ] Supabase authentication and cloud sync across devices
- [ ] Meal history with date-grouped journal view
- [ ] Water intake tracking — tap to log glasses consumed
- [ ] Streak and consistency tracking

### AI Enhancements
- [ ] Gemini response streaming for real-time typing effect
- [ ] AI memory — Vita recalls past meals and weekly patterns
- [ ] Weekly wellness insights generated from meal history
- [ ] Voice input for hands-free meal logging

### Detection
- [ ] Camera-based food detection (Gemini multimodal)
- [ ] Barcode scanning for packaged food
- [ ] Automatic meal time categorization (breakfast, lunch, dinner)

### Platform
- [ ] Progressive Web App (PWA) with offline-first architecture
- [ ] Push notifications for water reminders and meal check-ins
- [ ] Health data export as PDF report
- [ ] Thai recipe suggestions based on remaining daily macros

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes following the existing code style
4. Open a pull request with a clear description of the change

Please keep pull requests focused — one feature or fix per PR.

---

## Contributors

| Name | Role |
|---|---|
| Yasatsawin P. | Creator & Lead Developer |

---

## License

MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Built with care · Chiang Mai University · 2026

*VitaMate — ดูแลตัวเองดี ๆ นะคะ*

</div>
