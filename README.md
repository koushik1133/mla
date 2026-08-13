# 🏛️ Beerla Ilaiah MLA — Official Digital Platform & Public Website

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Production-Ready-success?style=flat-square)]()
[![Party](https://img.shields.io/badge/Party-Indian_National_Congress-138808?style=flat-square)](https://inc.in)

Official public website and digital administration portal for **Beerla Ilaiah**, Member of the Telangana Legislative Assembly representing **Alair Assembly Constituency (No. 97)**, Yadadri Bhuvanagiri District, Telangana.

- **Government Whip**, Telangana Legislative Assembly
- **President**, Yadadri Bhuvanagiri District Congress Committee (DCC)
- **Assembly Victory**: 122,140 votes (57.41% vote share) | 49,636 vote majority in 2023 Telangana Assembly Elections

---

## 🌟 Key Features

### 🇮🇳 Dual Brand Theme Engine (Saffron & Congress Green `#138808`)
- **Congress Green Theme**: Dedicated `/green` route displaying the official Congress Green color code (`#138808`).
- **Live Theme Switcher**: Header toggle button allowing visitors and administrators to compare Saffron Orange (`#EE5A1C`) and Congress Green (`#138808`) themes side-by-side.
- **Admin Visibility Toggle**: Option in the Admin Portal to hide or show the theme dropdown button on demand.

### 🖼️ Auto-Scrolling Hero Background Carousel
- Smooth auto-advancing slideshow (every 5.5s) featuring high-impact graphics including:
  - `hero2.png` (*Stand With The People of #ALAIR - Hon'ble Beerla Ilaiah MLA*)
  - `hero-bg.jpg` (*Alair Agricultural Landscape*)
  - `alair-agriculture.jpg` (*Farming & Irrigation Progress*)
  - `yadadri-temple.jpg` (*Yadadri Sri Lakshmi Narasimha Swamy Temple Heritage*)
- Includes manual left/right chevron navigation controls and interactive slide indicator dots.

### 🤖 Beerla's AI Assistant ("బీర్ల AI సహాయకుడు")
- Floating bilingual interactive AI assistant powered by a RAG knowledge engine trained on:
  - Biography, birth in Saidapur, NSUI student leadership, Sarpanch tenure (2006), DCC President appointment (2025).
  - 2023 Alair election victory data (122,140 votes, 8 mandals, 2.27 lakh voters).
  - Key welfare initiatives, BC reservation policy, Yadadri temple development.
  - Verified contact information: **Facebook (43K Followers)**, Phone `+91 98666 52347`, Email `beerlailaiah@gmail.com`, Instagram (`@beerla_foundation`).

### 🔐 Secure Admin Control Portal (`/admin`)
- Protected admin dashboard requiring PIN authorization (**Default PIN: `0000`**).
- **Marquee Ticker Manager**: Add, toggle live/pause status, or delete breaking updates.
- **Hero Studio**: Dynamic background image URL, side portrait image, alignment selector, and live preview card.
- **Security & Settings**: Change passcode and toggle header theme switcher visibility.

### 📰 Infinite Marquee News Ticker
- Animated marquee banner docked above the header displaying real-time constituency announcements and legislative updates.

### 🌐 100% Bilingual Phrasing (English & Telugu)
- Full instant language switching (`English` / `తెలుగు`) with native `Noto Sans Telugu` typography support.

---

## 🗺️ Page Routes & Site Architecture

| Route | Description |
| :--- | :--- |
| `/` | **Main Homepage** (Hero carousel, fact strip, journey preview, election stats, news) |
| `/green` | **Congress Green Theme Route** (Dedicated `#138808` preview mode) |
| `/about` | **Biography & Values** (Early life in Saidapur, education, core philosophy) |
| `/journey` | **Political Timeline** (NSUI -> Sarpanch -> DCC President -> MLA) |
| `/alair` | **Constituency Profile** (8 Mandals, Yadadri Temple, agriculture, demographics) |
| `/public-service` | **Legislative Record & Work** (BC welfare, Assembly contributions, public works) |
| `/election-2023` | **2023 Election Breakdown** (122,140 votes, 49,636 margin, vote shares) |
| `/media` | **Speeches & Press Releases** (Assembly speeches, video archives, downloads) |
| `/gallery` | **Photo Gallery** (High-resolution public service photo gallery) |
| `/news` | **News & Updates** (Full archive with clickable external news links) |
| `/contact` | **Public Office Grievance Form** & direct contact cards |
| `/admin` | **Secure Admin Portal** (PIN: `0000`) |

---

## 📱 Official Contact & Social Media

- **Facebook Page**: [Beerla Ilaiah INC](https://www.facebook.com/BeerIaIlaiahINCAlairIncharge/) (**43K Followers**)
- **Facebook Reels**: [Beerla Ilaiah Reels](https://www.facebook.com/BeerIaIlaiahINCAlairIncharge/reels/)
- **Mobile Phone**: `+91 98666 52347`
- **Email Address**: `beerlailaiah@gmail.com`
- **Instagram Foundation**: [@beerla_foundation](https://www.instagram.com/beerla_foundation/)
- **Instagram Personal**: [@beerla_ilaiah_inc](https://www.instagram.com/beerla_ilaiah_inc)
- **X (Twitter)**: [@IlaiahBeerla](https://twitter.com/IlaiahBeerla)
- **MLA Public Office**: Main Road, Alair Town, Yadadri Bhuvanagiri District, Telangana, India.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Variables, Fluid Responsive Grid System, TailwindCSS v4
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React & Inline Vector SVGs
- **Typography**: Manrope, Inter, Noto Sans Telugu (Google Fonts)

---

## 💻 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/koushik1133/mla.git
   cd mla
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

© 2026 Beerla Ilaiah MLA, Alair Assembly Constituency. All rights reserved.
