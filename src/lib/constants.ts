export const CATEGORY_SLUGS = [
  "business-registration",
  "tax-compliance",
  "intellectual-property",
] as const;

export const LOCATION_SLUGS = [
  "hyderabad",
  "bangalore",
  "mumbai",
  "delhi",
  "chennai",
  "pune",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];

export function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_APP_URL === "string" && process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (typeof process.env.VERCEL_URL === "string") {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
