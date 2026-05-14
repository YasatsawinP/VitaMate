# Handoff: VitaMate

AI-powered Thai wellness companion. Conversational nutrition logging via natural language, with calorie/protein/water/sleep tracking.

---

## About the design files

The files in this bundle are **design references created in HTML/React (Babel-in-browser)** — prototypes showing intended look, copy, and behavior. They are **not production code**.

Your task is to **recreate these designs in the target codebase's environment**:
- The intended target stack is **Next.js + Tailwind CSS + shadcn/ui** (per original brief).
- Use the codebase's existing component primitives, design tokens, and patterns where they exist.
- If no codebase exists yet, scaffold Next.js + Tailwind + shadcn/ui from scratch.

Do not copy the inline-style React from the prototypes verbatim — translate it to Tailwind utility classes and shadcn primitives (Card, Button, Input, Tabs, Sheet/Dialog, Avatar, Progress, Tooltip, ScrollArea, etc.).

---

## Fidelity

**High-fidelity.** Pixel-perfect mockups with final colors, typography, spacing, copy, and interaction affordances. Recreate the UI faithfully using the codebase's libraries. Spacing, radii, shadows, and the sage/earth palette are intentional — preserve them.

---

## Brand & Voice

- **Brand name:** VitaMate. AI character is **Vita**.
- **Tone:** Calm, friendly, non-judgmental, emotionally supportive. Never use guilt, streaks, or competitive framing.
- **Locale:** Thai (`lang="th"`). All UI copy is Thai; brand and AI character names stay in Latin (VitaMate, Vita).
- **Voice examples (Thai):**
  - "อรุณสวัสดิ์ค่ะ คุณมายา"
  - "เล่าให้ Vita ฟังหน่อย ว่าวันนี้ทานอะไร"
  - "ไม่ต้องนับแคลอรี่ — แค่เล่าก็พอ"
  - "เลือกได้น่ารักมากเลยค่ะ มื้อนี้โปรตีนกำลังพอดี"
  - "วันนี้ไม่บันทึกก็ได้นะคะ"

---

## Design tokens

### Color palette (sage + earth)

| Token            | Hex        | Use |
|------------------|------------|-----|
| `--bg-outer`     | `#EDE6D6`  | Page canvas behind app |
| `--bg`           | `#F6F1E6`  | App background (warm off-white) |
| `--bg-warm`      | `#EFE6D2`  | Toasted cream sections |
| `--page-bg`      | `#F4EFE3`  | Dashboard surface bg |
| `--card`         | `#FFFFFF`  | Solid cards |
| `--card-soft`    | `#FBF7EE`  | Subtle inner panels |
| **Sage scale**   |            | Primary brand |
| `--sage-50`      | `#EEF2E5`  | Lightest tint |
| `--sage-mist`    | `#E4ECDB`  | Accent fill |
| `--sage-100`     | `#DBE4C9`  | |
| `--sage-hush`    | `#CFDBC0`  | |
| `--sage-200`     | `#BFCFA8`  | |
| `--sage-soft`    | `#A7BB99`  | Soft accent, sparklines |
| `--sage-300`     | `#9DB585`  | |
| `--sage-400`     | `#7A9A6A`  | |
| `--sage-500`     | `#5E7F50`  | Primary mid |
| `--sage-600`     | `#48663C`  | Primary actions |
| `--sage-deep`    | `#6E8961`  | Soft primary text/accents (current refined) |
| `--sage-700`     | `#344B2C`  | |
| `--sage-ink`     | `#3D4F33`  | Deep brand text, dark cards gradient start |
| `--sage-900`     | `#1E2C19`  | Almost-black sage |
| **Earth**        |            | Warm accents |
| `--clay`         | `#C77B57`  | Calorie ring, warm accent |
| `--clay-light`   | `#E9C8B4`  | |
| `--sand`         | `#D9C8A4`  | Avatar bg |
| `--oat`          | `#E8DFC9`  | Insight card bg |
| `--honey`        | `#D9A85C`  | |
| `--rose`         | `#C58A8A`  | |
| `--rust`         | `#A86442`  | Earth-tone CTA |
| **Vital accents**|            | One per metric |
| Water            | `#8FB0C4` / `#E5EDF2` accent | |
| Sleep            | `#9890B0` / `#ECE7F0` accent | |
| **Text & lines** |            | |
| `--ink`          | `#1F2A1B`  | Body text |
| `--ink-soft`     | `#3D4A36`  | Secondary text |
| `--mute`         | `#7A816F`  | Muted/meta |
| `--mute-soft`    | `#A8AC9D`  | Disabled |
| `--line`         | `rgba(31,42,27,0.08)` | Hairline borders |
| `--line-soft`    | `rgba(31,42,27,0.05)` | Internal dividers |
| Glass surface    | `rgba(255,255,255,0.55–0.78)` over the page bg | |
| Glass border     | `rgba(255,255,255,0.75)` | |

### Typography

Load Google Fonts: **Prompt**, **Kanit**, **Inter**, **IBM Plex Sans Thai**.

| Role     | Family stack |
|----------|--------------|
| Display  | `Kanit, "IBM Plex Sans Thai", "Inter", sans-serif` |
| Sub/quote| `Prompt, "IBM Plex Sans Thai", "Inter", sans-serif` |
| UI/body  | `Prompt, "IBM Plex Sans Thai", "Inter", system-ui, sans-serif` |

**Display sizing (Kanit, weight 200/300/400):**
- Hero landing: 68–76 / line-height 1.1 / tracking -1.2
- Page heading: 32–46 / 1.05–1.2 / -0.4 to -1
- AI quote in dark card: 26–34 / 1.3–1.45 / -0.3
- Metric value: 22–30 / 1 / -0.3 to -0.5
- Balance score (XL number): 56 / 1 / -1

**Body (Prompt, 300/400/500):**
- Lead: 17 / 1.6–1.7 (display weight 300)
- Body: 14–15 / 1.5
- Small: 12–13 / 1.5
- Microlabel: 11–11.5 (often UPPERCASE, letter-spacing 0.4–0.6, weight 600)

### Radii

`12 · 14 · 16 · 18 · 22 · 24 · 26 · 28 · 32` (px) — generous, never sharp. Pills/round buttons use `999`.

### Shadows (soft, never harsh)

- Card: `0 1px 0 rgba(31,42,27,0.03), 0 10px 30px -18px rgba(31,42,27,0.10), 0 40px 80px -50px rgba(31,42,27,0.10)`
- AI hero (dark sage): `0 22px 50px -22px rgba(61,79,51,0.45), 0 6px 16px -8px rgba(61,79,51,0.18)`
- Floating tab bar: `0 10px 30px -10px rgba(31,42,27,0.18), 0 4px 12px -8px rgba(31,42,27,0.10)`
- Primary button glow: `0 8px–12px 18–28px -10px rgba(61,79,51,0.5)`

### Glassmorphism

- `background: rgba(255,255,255,0.55–0.78)`
- `backdrop-filter: blur(14–18px)` (+ `-webkit-backdrop-filter`)
- `border: 1px solid rgba(255,255,255,0.75)`

### Background gradient (app bg)

```
radial-gradient(1100px 600px at 85% -10%, #E4ECDB 0%, transparent 60%),
radial-gradient(800px 500px at -5% 110%, rgba(233,200,180,0.18) 0%, transparent 65%),
#F4EFE3
```

---

## Screens

> All copy below is the **canonical Thai copy** — preserve it verbatim.

### 1. Landing page (`Landing.jsx`)

**Purpose:** Marketing landing for first-time visitors.

**Layout (1280×900):**
- Top nav (28px/64px padding): Logo + brand · nav links (วิธีใช้งาน / เบื้องหลัง / เรื่องเล่าผู้ใช้ / แพ็กเกจ) · sign-in + "เริ่มต้นฟรี" button.
- Hero split (1.05fr / 1fr, gap 56):
  - Left: small pill ("ใหม่ · AI ที่ปรับตามจังหวะของคุณ"), 68px display headline "ดูแลร่างกาย / *อย่างใจเย็น*", lead paragraph, primary CTA "ทดลอง 14 วันแรก" + secondary "ดูตัวอย่างใน 1 นาที", press strip (The Cloud, a day, The Standard, Mango Zero).
  - Right (560px tall): floating mock dashboard card showing the natural-language input pattern, a sage chat bubble ("VITA · เพื่อนคู่ใจ"), and a small "สรุปประจำสัปดาห์" insight card.
- Features section (4-column grid): โภชนาการแบบใจเย็น / น้ำดื่มที่ไม่ขัดจังหวะ / การนอนที่เข้าใจ / AI ที่ตั้งใจฟัง.

### 2. Main dashboard (`Dashboard.jsx`) — primary interaction

**Purpose:** Today's home. The single interaction is **natural-language meal input**. Numbers are supporting context.

**Layout (1280×900):**
- Slim top bar (22/56): logo + brand · 3 nav pills (วันนี้ / คุยกับ Vita / สมุดบันทึก) · bell + circular avatar.
- Centered column (max-width 880, gap 20):
  1. **Greeting** (centered): meta date "วันอังคารที่ 14 พฤษภาคม · 9:42 น." + display "อรุณสวัสดิ์ค่ะ *คุณมายา*".
  2. **Hero input card** (glass, radius 28): header row with Vita icon + "เล่าให้ Vita ฟังหน่อย ว่าวันนี้ทานอะไร" + "ไม่ต้องนับแคลอรี่ — แค่เล่าก็พอ"; large multi-line text area showing the user's draft sentence with a sage cursor; tool row with chips (ถ่ายรูปแทน / พูดได้นะ / มื้อก่อนหน้า) + primary button "ให้ Vita ช่วยดู".
  3. **AI response card** (dark sage gradient #3D4F33→#6E8961, radius 28): a status dot + "Vita · ตอบเมื่อสักครู่"; **large Kanit quote** as the hero (26/1.45, weight 300) — Vita's friendly note; under a hairline divider, a quiet 4-column macro row (พลังงาน / โปรตีน / คาร์บ / ไขมัน, "≈ value" + small unit); action row with "ใช่ ตามนี้เลย" (white) + "ปรับนิดหน่อย" (ghost) + "คุยต่อ" link on right.
  4. **Vital strip** (3 chips, gap 14): each is a glass card with a 46px ring + label + value (พลังงานวันนี้ 1,740 จาก 1,900 / น้ำดื่ม 5 จาก 8 แก้ว / การนอนคืนที่ผ่านมา 7 ชม. 12 นาที หลับสนิทดี).

**Interaction states (implement these):**
- Empty input → placeholder "พิมพ์เล่ามื้ออาหารของคุณ…"
- User typing → live counter NOT shown; just the soft cursor.
- Submit (Enter or button) → call AI; while pending, replace the response card body with skeleton lines + "Vita กำลังคิด…" pulsing dot.
- AI response arrives → fade-in. Confidence badge is informational only (no error UI for low confidence — instead, Vita's note asks a clarifying question).
- "ปรับนิดหน่อย" → opens an inline editor over the macro row so user can nudge values.
- "ใช่ ตามนี้เลย" → saves to journal, updates vitals.

### 3. AI conversation (`Recommendations.jsx`) — "Vita"

**Purpose:** Open-ended chat with Vita. Includes mood check-in chips and contextual recommendation cards.

**Layout (1280×900):**
- Left sidebar (240): logo, nav (วันนี้ / แนวโน้ม / Vita / สมุดบันทึก / ตั้งค่า) — active = "Vita".
- Center conversation column (flex 1, padding 28/36):
  - Header: 52px gradient sage tile with sparkle, "Vita" title, "กำลังฟังอยู่ค่ะ · ปรับให้ตามที่คุณรู้สึก" subtitle. Pills on right: "อารมณ์สัปดาห์นี้: นิ่ง ๆ ดี", "โหมด: ค่อย ๆ ปรับ".
  - Day divider "วันนี้ · 8:14 น."
  - Vita message → "อรุณสวัสดิ์ค่ะคุณมายา เมื่อคืนหลับไป 7 ชั่วโมง 12 นาที — ช่วงหลับลึกที่สุดอยู่ก่อน 5 โมงเช้านิดหน่อยค่ะ วันนี้ร่างกายเป็นยังไงบ้างคะ?"
  - Mood chip row (5 options): สบายดี / **เพลียนิดหน่อย** (selected) / สดชื่น / ปวดเมื่อย / กังวลใจ.
  - User reply → "เพลียนิดหน่อยค่ะ เมื่อวานยาวนิดหนึ่ง" (sage-600 bubble, right-aligned, asymmetric radius).
  - Vita reply intro.
  - **2×2 recommendation card grid** (cards radius 16, accent-tinted icon tile + tag + title + description + "เพิ่มลงวันนี้" / "ไว้ก่อน" buttons):
    - มื้อเช้า · "โอ๊ตอุ่น ๆ ราดเนยอัลมอนด์กับเบอร์รี" · ~380 แคล · โปรตีน 14 ก. · ค่อย ๆ ปลดปล่อยพลังงาน
    - น้ำดื่ม · "น้ำอุ่นบีบมะนาวสักแก้ว" · วันที่เพลีย คุณมักลืมจิบน้ำตอนเช้า
    - ขยับตัว · "เดินเล่น 12 นาที ช่วงสาย ๆ" · แสงแดดอ่อน ๆ ช่วยปรับวงจรร่างกาย
    - ก่อนนอน · "หรี่ไฟลงตอน 4 ทุ่ม 15 น." · คุณจะหลับเร็วขึ้นประมาณ 18 นาที
  - Closing Vita message + 🌱.
  - Composer at bottom (radius 20): + (attach) · text input "พิมพ์บอก Vita ว่ารู้สึกยังไง หรือทานอะไรไป…" · mic · send (sage-600).
- Right rail (300): "สิ่งที่ Vita สังเกตได้" header + 3 cards:
  - Pattern: "วันที่คุณทานข้าวเย็นก่อน 2 ทุ่ม คุณหลับนานขึ้นเฉลี่ย 42 นาที"
  - Focus (oat bg): "เช้าค่อย ๆ บ่ายเบา ๆ" + 2/5 progress
  - Connections: Apple Health (on) / Oura Ring (on) / MyFitnessPal (off) — toggle switches.

### 4. Daily input modal (`Modal.jsx`)

**Purpose:** Quick check-in sheet over a dimmed dashboard.

**Layout (1280×900, modal 560×~580 centered):**
- Backdrop: blurred dashboard mock + `rgba(31,42,27,0.32)` scrim with 6px blur.
- Modal card: glass white (0.96), radius 28.
- Header: meta date · h2 "วันนี้เป็นยังไงบ้าง *คุณมายา?*" · subtitle · close X (top right).
- 4 tab pills (active = อาหาร): อาหาร / น้ำดื่ม / การนอน / อารมณ์.
- Body:
  - "วันนี้ทานอะไรไปบ้าง?" + search-style input "พิมพ์หรือพูดบอก เช่น 'โจ๊กไก่ กาแฟดำ ส้มลูกหนึ่ง…'" + mic button.
  - Recent chip row (selected first two): โยเกิร์ตกรีก + เบอร์รี ✓ / กาแฟดำ ✓ / อัลมอนด์ / ข้าวต้มหมู / นมถั่วเหลือง.
  - "ตอนนี้รู้สึกยังไง?" + 5-cell mood ribbon (emoji + label): หนัก ๆ 🫧 / งง ๆ 🌤 / **นิ่ง ๆ ดี 🌱** (selected) / อบอุ่น ☀️ / สดใส 🌿.
  - Vita preview banner (sage/oat gradient): "ดีมากค่ะ มื้อเช้านี้โปรตีนเริ่มต้นได้ดีแล้ว Vita จะชวนคุณทานเย็นเบา ๆ ราว ๆ 1 ทุ่มเพื่อให้หลับสบายคืนนี้"
- Footer: "วันนี้ไม่บันทึก" (text) · "บันทึก & ปิด" (ghost) · "บันทึก & ถาม Vita" (primary sage).

### 5. Mobile dashboard (`DashboardMobile.jsx`)

**Frame:** iPhone (402×874 inside a 460×920 artboard). At runtime, this is the responsive view at ≤640px.

**Layout (top→bottom, scrollable):**
- iOS status bar area (54px safe padding top).
- Header (12/22): date + greeting "อรุณสวัสดิ์ค่ะ / *คุณมายา*" left; bell + avatar right.
- **Mini food-input card** (glass, radius 22): "เล่าให้ Vita ฟัง ว่ามื้อนี้ทานอะไร" + draft sentence + chips (ถ่ายรูป / พูดได้) + primary button "ให้ Vita ดู".
- **Vita response card** (dark sage gradient, radius 24): status dot + "Vita · เมื่อสักครู่"; 19px Kanit quote (~2 lines); hairline divider; 3-column quiet macros (พลังงาน / โปรตีน / คาร์บ); two buttons row: "ใช่ ตามนี้" + "ปรับ".
- "วันนี้ค่อย ๆ ไป" section: 3-column compact metric grid (พลังงาน / น้ำดื่ม / การนอน) — each is a glass card with a 36px ring at top-right.
- Pattern card (glass): "วันที่คุณเดินเล่นก่อน 6 โมงเย็น คุณหลับนานขึ้น *42 นาที*".
- **Floating glass tab bar** (radius 999, absolute bottom): วันนี้ / แนวโน้ม / [primary + FAB] / Vita / บันทึก.

---

## Interactions & states

- **Default page motion:** keep things still. Avoid animated rings on page load; use subtle fades for AI responses only.
- **AI response loading state:** 3 pulsing skeleton lines in the dark card body. Vita avatar dot stays animated.
- **Mic input:** when active, animate the mic icon and show a soft waveform; transcript fills the input live.
- **Card hover (desktop):** lift `translateY(-2px)` and slightly deepen shadow. No color shift.
- **Tab pill switch:** instant, no slide animation.
- **Mood chip selection:** background fills sage-50, border sage-200, weight 500 → 600.
- **Composer send:** input clears, optimistic user bubble appears immediately, Vita pulse appears below, response replaces pulse on resolve.

---

## State management (suggested)

- `today`: `{ meals: Meal[], water: number, sleep: { hours, minutes, restfulness }, mood: string|null }`
- `meals: Meal[]` where `Meal = { id, rawText, vita: { calories, protein, carbs, fat, tags[], note, confidence }, status: 'pending'|'confirmed'|'editing', timestamp }`
- `chat: Message[]` for Vita conversation
- `insights: { weeklyPatterns[], focus, connections[] }`
- Use server actions / Route Handlers (Next.js) for AI calls; stream the response token-by-token if possible — the design's calm tone benefits from incremental reveal.

---

## Responsive behavior

- ≥1024 → desktop layouts as drawn.
- 640–1023 → collapse sidebar to a top icon row; center column max-width stays 720; right rail moves below conversation.
- <640 → mobile layout (`DashboardMobile`). Sidebar becomes the floating glass tab bar. Modal becomes a bottom sheet (`Sheet` from shadcn).

---

## Assets / icons

- All icons are inline SVG strokes (1.6–2.2px, rounded). Replace with **lucide-react** equivalents in the implementation:
  - flame → `Flame`
  - drop → `Droplet`
  - moon → `Moon`
  - spark → `Sparkles`
  - protein → `Hexagon` (or custom)
  - walk → `Footprints`
  - bowl → `UtensilsCrossed`
  - chat → `MessageCircle`
  - chart → `LineChart`
  - home → `Home`
  - journal → `BookOpen`
  - gear → `Settings`
  - bell → `Bell`
  - mic → `Mic`
  - send → `Send`
  - check → `Check`
  - close → `X`
  - search → `Search`
  - sun → `Sun`
  - apple → `Apple`
  - arrow → `ArrowRight`
  - arrowUp → `ArrowUp`
  - trend → `TrendingUp`
- Brand logo: a leaf-in-circle SVG. See `Tokens.jsx → Logo` for the path; reproduce in `components/Logo.tsx`.

---

## Files in this bundle

| Path | What it is |
|------|-----------|
| `VitaMate.html` | Single entry; mounts a design canvas with all 5 artboards. |
| `design-canvas.jsx` | Canvas chrome (pan/zoom/focus) — **dev tool, not part of the product**. |
| `ios-frame.jsx` | iPhone bezel for the mobile artboard — **not part of the product**. |
| `screens/Tokens.jsx` | Colors, fonts, icon set, `Logo`, `Ring`, `Card`, `Pill` atoms. |
| `screens/Landing.jsx` | Landing page (Thai). |
| `screens/Dashboard.jsx` | Desktop dashboard (Thai, natural-language input is primary). |
| `screens/Recommendations.jsx` | Vita conversation page (Thai). |
| `screens/Modal.jsx` | Daily check-in modal (Thai). |
| `screens/DashboardMobile.jsx` | Mobile dashboard (Thai). |

Older versions are preserved in this bundle under `*_v1_en.jsx` / `*_v2.jsx` / `*_v3.jsx` / `*_v4_en.jsx` filenames — **ignore these unless the team wants the English version or earlier iteration for comparison.**

---

## Implementation checklist for Claude Code

1. Scaffold Next.js (App Router) + Tailwind + shadcn/ui. Add fonts via `next/font/google` (Prompt + Kanit + Inter; IBM Plex Sans Thai as Thai fallback).
2. Set `<html lang="th">` and Prompt as the default body font.
3. Encode the color tokens in `tailwind.config.ts` (extend `colors.sage`, `colors.earth`, etc.).
4. Build the atoms first: `Logo`, `Ring` (use SVG, not Progress), `GlassCard` wrapper, `Pill`/`Chip`, `VitaAvatar`.
5. Build screens in this order: Dashboard → Recommendations → Modal → Mobile → Landing.
6. Wire AI calls — natural-language meal parsing is the core flow. Stream Vita's response.
7. Persist `today` state. Vital chips read from it.
8. Add gentle empty/loading states everywhere (see "Interactions & states").

If you need exact pixel measurements, open the relevant `screens/*.jsx` — every padding, gap, font-size, and color is in there.
