# Application Inventory — Beerla Ilaiah MLA Website

## 1. System Architecture
- **Framework**: Next.js 16.3.0 (App Router with Turbopack)
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS v4 + Global Custom CSS Design System (`src/app/globals.css`)
- **Animation**: Framer Motion 12.4
- **Icons**: Lucide React + Custom Inline SVG Vector Icons (`src/components/icons/SocialIcons.tsx`)
- **Form Validation**: Zod schema validation & client-side input sanitization

## 2. Page & Route Structure
| Route | Type | Description | Security / Render Mode |
|---|---|---|---|
| `/` | Client Component | Main homepage with Hero, Fact Strip, Biography Preview, Timeline Preview, Alair Map, Election Stats, Video Interviews, News, and Contact CTA | Static Prerendered |
| `/about` | Server Component | Full biographical profile, education, early political career, election victory, and source references | Static Prerendered + SEO Metadata |
| `/alair` | Server Component | Constituency profile, mandal breakdown, key landmarks, demographics, and agricultural economy | Static Prerendered + SEO Metadata |
| `/journey` | Client Component | Interactive timeline of political milestones from 1975 to present with category filtering and source confidence ratings | Static Prerendered |
| `/public-service` | Server Component | Verified public service activities by category (Education, Agriculture, Infrastructure, Housing, Tourism, Community) | Static Prerendered + SEO Metadata |
| `/election-2023` | Client Component | Detailed 2023 Assembly election report with animated stats, candidate breakdown, and ECI / ADR attributions | Static Prerendered |
| `/media` | Client Component | Media archive of video interviews with search-link fallbacks (Suman TV, Telangana Velugu, Signature Studios, iDream, KRTV, Mahaa News) | Static Prerendered |
| `/gallery` | Client Component | Masonry image gallery featuring Alair landmarks, farmlands, Yadadri temple, and interactive lightbox | Static Prerendered |
| `/news` | Server Component | News & public record archive with publication source labeling, date tags, and editorial disclaimers | Static Prerendered + SEO Metadata |
| `/contact` | Client Component | Contact form with Zod schema validation, input length bounds, and honest contact availability disclosures | Static Prerendered |

## 3. Data Consumption & Verification Model
- **Politician Profile**: `/src/content/politician.ts` (Sourced from ECI, PRS India, Wikipedia)
- **Constituency Facts**: `/src/content/constituency.ts` (Sourced from ECI, News18, Wikipedia)
- **Election Data**: `/src/content/election.ts` (Sourced from ECI, ADR India)
- **Timeline Milestones**: `/src/content/timeline.ts` (Sourced from Hans India, PRS India, Wikipedia)
- **Media Archive**: `/src/content/videos.ts` (Sourced from YouTube publisher listings)
- **Public Service**: `/src/content/publicService.ts` (Appropriately hedged constituency engagement descriptions)

## 4. Security Configuration
- **Security Headers**: HSTS, CSP, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy configured in `next.config.ts`.
- **Input Sanitization**: Zod schema validation on contact form fields with length caps (`name` <= 100, `email` <= 150, `message` <= 2000).
- **Client/Server Isolation**: Clear separation between Server Components (metadata & SSR) and Client Components (interactive UI states).
