import { prisma } from "./db";

export async function getCategoriesWithServices() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      services: {
        orderBy: { title: "asc" },
        select: { id: true, title: true, slug: true },
      },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      services: { orderBy: { title: "asc" } },
    },
  });
}

export async function getServiceByCategoryAndSlug(categorySlug: string, serviceSlug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    select: { id: true },
  });
  if (!category) return null;
  return prisma.service.findUnique({
    where: {
      categoryId_slug: { categoryId: category.id, slug: serviceSlug },
    },
    include: { category: true, serviceLocations: { include: { location: true } } },
  });
}

export async function getLocationBySlug(slug: string) {
  return prisma.location.findUnique({
    where: { slug, active: true },
  });
}

export async function getServiceLocation(serviceId: string, locationSlug: string) {
  const location = await prisma.location.findUnique({
    where: { slug: locationSlug, active: true },
  });
  if (!location) return null;
  return prisma.serviceLocation.findUnique({
    where: {
      serviceId_locationId: { serviceId, locationId: location.id },
    },
    include: { service: { include: { category: true } }, location: true },
  });
}

export async function getAllLocations() {
  return prisma.location.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });
}

export async function getPublishedPosts(limit = 5) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
  });
}

export async function getAllCategorySlugs() {
  try {
    const cats = await prisma.category.findMany({ select: { slug: true } });
    return cats.map((c) => ({ category: c.slug }));
  } catch {
    return [];
  }
}

export async function getAllServiceSlugs() {
  try {
    const services = await prisma.service.findMany({
      select: { slug: true, category: { select: { slug: true } } },
    });
    return services.map((s) => ({ category: s.category.slug, service: s.slug }));
  } catch {
    return [];
  }
}

export async function getAllLocationSlugs() {
  const locs = await prisma.location.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return locs.map((l) => ({ city: l.slug }));
}

export async function getSitemapServicesWithLocations() {
  try {
    const services = await prisma.service.findMany({
      select: {
        slug: true,
        category: { select: { slug: true } },
        serviceLocations: { select: { location: { select: { slug: true } } } },
      },
    });
    return services;
  } catch {
    return [];
  }
}

export async function getSitemapPosts() {
  try {
    return prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
  } catch {
    return [];
  }
}
