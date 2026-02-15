import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title,
    slug,
    categoryId,
    content,
    pricing,
    faqs,
    processSteps,
    documentsRequired,
    metaTitle,
    metaDescription,
  } = body;

  if (!title || !categoryId) {
    return NextResponse.json(
      { error: "Title and category are required" },
      { status: 400 }
    );
  }

  const service = await prisma.service.create({
    data: {
      title,
      slug: slug ?? title.toLowerCase().replace(/\s+/g, "-"),
      categoryId,
      content: content ?? " ",
      pricing: pricing ?? [],
      faqs: faqs ?? [],
      processSteps: processSteps ?? [],
      documentsRequired: documentsRequired ?? [],
      metaTitle: metaTitle ?? null,
      metaDescription: metaDescription ?? null,
    },
  });

  const locations = await prisma.location.findMany({ where: { active: true } });
  for (const loc of locations) {
    await prisma.serviceLocation.create({
      data: { serviceId: service.id, locationId: loc.id },
    });
  }

  return NextResponse.json({ id: service.id });
}
