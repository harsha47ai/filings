import { getBaseUrl } from "@/lib/constants";
import {
  getAllCategorySlugs,
  getSitemapServicesWithLocations,
  getSitemapPosts,
} from "@/lib/queries";

export default async function sitemap() {
  const base = getBaseUrl();

  const staticUrls = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  let categories: { category: string }[] = [];
  let services: Awaited<ReturnType<typeof getSitemapServicesWithLocations>> = [];
  let posts: { slug: string }[] = [];
  try {
    [categories, services, posts] = await Promise.all([
      getAllCategorySlugs(),
      getSitemapServicesWithLocations(),
      getSitemapPosts(),
    ]);
  } catch {
    // DB unavailable at build time
  }

  const categoryUrls = categories.map(({ category }) => ({
    url: `${base}/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const serviceUrls: { url: string; lastModified: Date; changeFrequency: "weekly"; priority: number }[] = [];
  for (const s of services) {
    serviceUrls.push({
      url: `${base}/${s.category.slug}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const sl of s.serviceLocations) {
      serviceUrls.push({
        url: `${base}/${s.category.slug}/${s.slug}/${sl.location.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const postUrls = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...categoryUrls, ...serviceUrls, ...postUrls];
}
