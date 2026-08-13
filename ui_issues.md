# UI Issues Log — Beerla Ilaiah MLA Website

### [UI-001]
- **Severity**: Major
- **Location**: Page Routes (`src/app/*/page.tsx`)
- **Problem Description**: Usage of legacy `<style jsx>` tags in Next.js Server Components caused build error `'styled-jsx' cannot be imported from a Server Component module`.
- **Root Cause**: Next.js 15/16 App Router pages are Server Components by default and cannot process client-side styled-jsx blocks.
- **Fix Applied**: Refactored grid layouts into clean CSS utility classes (`.grid-2-col`, `.grid-3-col`, `.grid-4-col`) in `src/app/globals.css` and removed `<style jsx>` from Server Components.
- **Validation Result**: Pass. Next.js build completed with 0 errors.
- **Status**: Verified

### [UI-002]
- **Severity**: Medium
- **Location**: Header & Footer Navigation
- **Problem Description**: Missing custom social brand icons in standard `lucide-react` package.
- **Root Cause**: `lucide-react` v1 does not include brand icons like Twitter/X, Instagram, or YouTube.
- **Fix Applied**: Built clean, accessible vector SVG components in `@/components/icons/SocialIcons.tsx` (`TwitterXIcon`, `InstagramIcon`, `YoutubeIcon`, `HandSymbolIcon`).
- **Validation Result**: Pass. All social icons render cleanly in header, footer, and contact cards.
- **Status**: Verified
