import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, slug, state } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  await prisma.location.create({
    data: {
      name,
      slug: slug ?? name.toLowerCase().replace(/\s+/g, "-"),
      state: state ?? "",
    },
  });

  return NextResponse.json({ success: true });
}
