import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
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

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title;
  if (slug !== undefined) data.slug = slug;
  if (excerpt !== undefined) data.excerpt = excerpt;
  if (content !== undefined) data.content = content;
  if (metaTitle !== undefined) data.metaTitle = metaTitle;
  if (metaDescription !== undefined) data.metaDescription = metaDescription;
  if (published !== undefined) {
    data.published = published;
    data.publishedAt = published ? new Date() : null;
  }

  await prisma.post.update({
    where: { id },
    data,
  });

  return NextResponse.json({ success: true });
}
