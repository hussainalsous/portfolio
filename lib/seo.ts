/**
 * The site's canonical production URL. No production domain has been
 * configured anywhere in this project (no env var, README, or deployment
 * config references one), so this intentionally falls back to localhost
 * rather than fabricating a domain.
 *
 * Before deploying, set NEXT_PUBLIC_SITE_URL to the real production
 * domain (e.g. in Vercel's project environment variables, or a local
 * .env.local — see .env.example). Every canonical/OG/sitemap/robots URL
 * in this app reads from this single constant.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
