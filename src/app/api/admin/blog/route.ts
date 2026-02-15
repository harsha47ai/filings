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
    excerpt,
    content,
    metaTitle,
    metaDescription,
    published,
  } = body;

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug: slug ?? title.toLowerCase().replace(/\s+/g, "-"),
      excerpt: excerpt ?? null,
      content: content ?? " ",
      metaTitle: metaTitle ?? null,
      metaDescription: metaDescription ?? null,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json({ id: post.id });
}
