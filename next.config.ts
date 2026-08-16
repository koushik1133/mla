import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://upload.wikimedia.org https://commons.wikimedia.org https://img.youtube.com https://*.supabase.co;
  connect-src 'self' https://*.supabase.co https://fonts.googleapis.com https://fonts.gstatic.com;
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // The legacy XSS auditor has itself been an XSS vector; modern guidance is 0.
    key: "X-XSS-Protection",
    value: "0",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    key: "Permissions-Policy",
    value: "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), screen-wake-lock=(), serial=(), usb=(), xr-spatial-tracking=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Nothing from console.* reaches production DevTools. console.error is kept
  // so genuine crashes are still reportable.
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  // Never emit browser source maps in production — they hand attackers the
  // original source and comments.
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves qualities listed here; 80 is used by the hero slides.
    qualities: [75, 80],
  },
  // Allow reviewing the dev server from another device on the LAN
  // (e.g. a phone at http://192.168.29.24:3000). Dev-only; ignored in prod.
  allowedDevOrigins: ["192.168.29.24"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
