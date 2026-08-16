# 🏛️ Beerla Ilaiah MLA — Official Digital Platform & Public Website

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-f55036?style=flat-square)](https://groq.com/)
[![Status](https://img.shields.io/badge/Production-Ready-success?style=flat-square)]()

Official public website and digital administration portal for **Beerla Ilaiah**, Member of the Telangana Legislative Assembly representing **Alair Assembly Constituency (No. 97)**, Yadadri Bhuvanagiri District, Telangana.

- **Government Whip**, Telangana Legislative Assembly
- **President**, Yadadri Bhuvanagiri District Congress Committee (DCC)
- **Assembly Victory**: 122,140 votes (57.41% vote share) | 49,636 vote majority in 2023 Telangana Assembly Elections

---

## 🌟 Key Features

### 🗄️ Supabase Cloud & Resilient Storage Engine
- **Supabase Cloud Backend**: Connected to Supabase Postgres database (`messages`, `news_articles`, `media_videos`, `gallery_images`, `public_services`, `ticker_items`, `site_config`).
- **Resilient Hybrid Sync**: Automatically mirrors all updates to `localStorage` and Supabase. Contact form submissions are saved locally and synced to cloud, ensuring 100% message persistence.

### 🤖 Beerla's AI Assistant ("బీర్ల AI సహాయకుడు")
- **Groq LLaMA-3.3-70B Powered**: Live AI route `/api/chat` using Groq's high-speed inference engine.
- **Interactive Action Buttons**: Directly renders clickable social action chips (Instagram, Facebook, X, Call Office) inside contact responses.
- **Smart URL Formatting**: Automatically formats social handles (`@beerla_ilaiah_inc`, `@BeerIaIlaiahINCAlairIncharge`) and text wrapping to keep chat UI clean and readable.

### 🖼️ 4K Visuals, Auto-Pull YouTube Thumbnails & Translucent Blur Overlays
- **Yadadri & Kolanupaka Heritage**: High-resolution imagery for Yadadri Temple, Kolanupaka Jain Temple, Alair Farmlands, and MLA Beerla Ilaiah.
- **Translucent Frosted Blur Overlays**: Subtly blurred pill badges and title containers wrapping text tightly without obscuring underlying imagery.
- **Live YouTube Thumbnails**: Automatically extracts YouTube Video IDs and pulls crisp HD thumbnails with automatic fallback to `/images/alair-agriculture.jpg`.

### 🎛️ Full Admin Portal (`/admin`)
- **Protected Dashboard**: Supabase Auth (email + password); admin allowlist enforced by Row Level Security.
- **100% Editable Content**: Complete inline controls to add, edit, and delete Ticker items, News Articles (with outbound URLs), Media Videos, Photo Gallery items, Public Services, and Hero Banner settings.

### 🇮🇳 Dual Brand Theme Engine (Saffron & Congress Green `#138808`)
- **Congress Green Theme**: Dedicated `/green` route displaying the official Congress Green color code (`#138808`).
- **Live Theme Switcher**: Header toggle button allowing visitors and administrators to compare Saffron Orange (`#EE5A1C`) and Congress Green (`#138808`) themes side-by-side.

### 🌐 100% Bilingual Phrasing (English & Telugu)
- Full instant language switching (`English` / `తెలుగు`) with native `Noto Sans Telugu` typography support.

---

## 🗺️ Page Routes & Architecture

| Route | Description |
| :--- | :--- |
| `/` | **Main Homepage** (Hero carousel, fact strip, journey preview, election stats, news) |
| `/green` | **Congress Green Theme Route** (Dedicated `#138808` preview mode) |
| `/about` | **Biography & Values** (Early life in Saidapur, education, core philosophy) |
| `/journey` | **Political Timeline** (NSUI -> Sarpanch -> DCC President -> MLA) |
| `/alair` | **Constituency Profile** (8 Mandals, Yadadri Temple, agriculture, demographics) |
| `/public-service` | **Legislative Record & Work** (BC welfare, Assembly contributions, public works) |
| `/election-2023` | **2023 Election Breakdown** (122,140 votes, 49,636 margin, vote shares) |
| `/media` | **Speeches & Media Interviews** (HD YouTube video cards with auto-thumbnails & fallback) |
| `/gallery` | **Photo Gallery** (Translucent frosted blur text badges & lightbox modal) |
| `/news` | **News & Updates** (Press archive with verified external publication links) |
| `/contact` | **Public Office Grievance Form** & direct contact cards |
| `/admin` | **Admin Control Panel** — Supabase Auth required |

---

## 📱 Official Contact & Social Media

- **Facebook Page**: [Beerla Ilaiah INC](https://www.facebook.com/BeerIaIlaiahINCAlairIncharge/) (**43K Followers**)
- **Instagram Personal**: [@beerla_ilaiah_inc](https://www.instagram.com/beerla_ilaiah_inc/)
- **X (Twitter)**: [@IlaiahBeerla](https://twitter.com/IlaiahBeerla)
- **Mobile Phone**: `+91 99590 26888` / `+91 98666 52347`
- **Email Address**: `beerla.ilaiah.mla@gmail.com`
- **MLA Public Office**: Main Road, Alair Town, Yadadri Bhuvanagiri District, Telangana, India.

---

## ⚙️ Environment Variables (`.env.local`)

```env
# GROQ API KEY FOR AI ASSISTANT
GROQ_API_KEY=your_groq_api_key_here

# SUPABASE CLOUD DATABASE KEYS
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) Postgres & RLS Policies
- **AI Integration**: [Groq](https://groq.com/) (LLaMA-3.3-70B-versatile)
- **Styling**: Vanilla CSS Variables, Fluid Responsive Grid System
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React & Vector SVGs

---

© 2026 Beerla Ilaiah MLA, Alair Assembly Constituency. All rights reserved.
