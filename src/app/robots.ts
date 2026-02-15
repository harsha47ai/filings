import { getBaseUrl } from "@/lib/constants";

export default function robots() {
  const base = getBaseUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
