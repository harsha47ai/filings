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
    content,
    metaTitle,
    metaDescription,
    pricing,
    faqs,
    processSteps,
    documentsRequired,
  } = body;

  await prisma.service.update({
    where: { id },
    data: {
      ...(content !== undefined && { content }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(pricing !== undefined && { pricing: pricing ?? [] }),
      ...(faqs !== undefined && { faqs: faqs ?? [] }),
      ...(processSteps !== undefined && { processSteps: processSteps ?? [] }),
      ...(documentsRequired !== undefined && { documentsRequired: documentsRequired ?? [] }),
    },
  });

  return NextResponse.json({ success: true });
}
