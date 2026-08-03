import type { NextConfig } from "next";

/**
 * Security headers applied to every route.
 *
 * CSP notes:
 *  - script-src 'self' 'unsafe-inline': Next.js injects inline scripts for
 *    hydration data (__NEXT_DATA__, RSC payloads). A stricter nonce-based CSP
 *    can be added in a future mission using Next.js middleware.
 *  - style-src 'self' 'unsafe-inline': Tailwind v4 injects critical CSS inline
 *    during SSR. The static CSS bundle is served from /_next/static/.
 *  - img-src 'self' data: https:: allows OG images and external images if needed.
 *  - font-src 'self': Geist fonts are self-hosted via next/font.
 *  - connect-src 'self': for Next.js HMR in dev and API routes.
 *  - frame-ancestors 'none': equivalent to X-Frame-Options DENY, belt-and-suspenders.
 */
const securityHeaders = [
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
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
