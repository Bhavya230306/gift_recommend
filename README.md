# Gifted — Smart Gift Recommendation Web App

An AI-powered gift recommendation engine built with Next.js 14+, TypeScript, and a hybrid recommender system. Answer 5 quick questions and get curated, ranked gift suggestions with a "Perfect because…" rationale for every pick.

## Features

- 🎁 **5-Step Conversational Questionnaire** — Relationship, Occasion, Personality, Budget, Notes
- 🧠 **Hybrid Recommender System** — Rule-Based filtering + Content-Based scoring (Jaccard similarity) + Collaborative Filtering (scaffolded for V2)
- 💜 **Chromatic Liquid Glass UI** — Dark futuristic aesthetic with animated gradient orbs, frosted glassmorphic cards, and editorial typography
- 💾 **Wishlist with localStorage** — Save, remove with undo, and share via URL
- 📱 **Fully Responsive** — Desktop, tablet, and mobile layouts
- ♿ **Accessible** — WCAG 2.1 AA considerations, reduced-motion support, ARIA attributes, keyboard navigable

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + Custom CSS Variables + CSS @keyframes animations
- **State:** Zustand (quiz state, wishlist)
- **Animations:** Framer Motion + CSS animations
- **Icons:** Lucide React
- **Fonts:** Playfair Display, DM Sans, Space Mono (Google Fonts)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd gifted
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing/Hero page
│   ├── quiz/page.tsx      # 5-step questionnaire
│   ├── results/page.tsx   # Gift recommendations grid
│   ├── wishlist/page.tsx  # Saved gifts
│   └── api/recommend/     # RS API endpoint
├── components/            # React components
│   ├── layout/            # Navbar, Footer, BackgroundOrbs
│   ├── quiz/              # Step components
│   └── results/           # GiftCard
├── store/                 # Zustand stores
├── lib/                   # Utilities and recommender engine
│   └── recommender/       # RS modules (RB, CB, CF, rationale)
├── data/                  # Static JSON catalogue
└── types/                 # TypeScript types
```

## Recommender System

The hybrid RS pipeline:
1. **Rule-Based Filter** — Hard constraints on budget, occasion, relationship
2. **Content-Based Scorer** — Jaccard similarity on personality tags + notes boost
3. **Collaborative Filter** — Community signal (cold-start at MVP, weight = 0%)
4. **Weighted Aggregation** — `FinalScore = 0.60×CB + 0.00×CF + 0.40×RB`
5. **Rationale Generation** — Template engine with 22 templates across 3 signal types

---

Built with ❤️ by Gifted
