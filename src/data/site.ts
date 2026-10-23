// Canonical host is this GitHub Pages project site.
export const siteUrl = "https://abenjamin765.github.io/fifthwheel";

// Staff console and waitlist API stay on the existing Vercel app.
export const productionAppUrl = "https://www.5thwheel.app";

export const organization = {
  name: "Fifth Wheel",
  legalName: "Fifth Wheel Supper Club, LLC",
  email: "hello@5thwheel.app",
  city: "Atlanta",
  region: "GA",
  country: "US",
};

export const landingMeta = {
  title: "Fifth Wheel — One table. Five people.",
  description:
    "A curated night out in Atlanta for five single strangers. Drinks, dinner, dessert — three walkable stops in one neighborhood. Join the waitlist.",
  ogDescription:
    "A curated night out in Atlanta for five single strangers. Three walkable stops, one table, one private vote at dessert.",
  path: "/landing/",
};

export const termsMeta = {
  title: "Terms of Service — Fifth Wheel",
  description:
    "The agreement between you and Fifth Wheel — reservations, cancellations, conduct at the table, and how disputes are handled.",
  path: "/terms/",
};

export const privacyMeta = {
  title: "Privacy Policy — Fifth Wheel",
  description:
    "What Fifth Wheel collects, who sees it, how long we keep it, and the rights you have over it.",
  path: "/privacy/",
};

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`;
}

export function absoluteUrl(path: string): string {
  const origin = siteUrl.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${suffix}`;
}
