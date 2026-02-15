import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const leads = await prisma.lead.findMany({
    include: {
      service: { select: { title: true } },
      location: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = ["Date", "Name", "Email", "Phone", "Service", "City", "Status", "Message"];
  const rows = leads.map((l) => [
    new Date(l.createdAt).toISOString(),
    l.name,
    l.email,
    l.phone,
    l.service?.title ?? "",
    l.location?.name ?? "",
    l.status,
    (l.message ?? "").replace(/"/g, '""'),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.map((c) => `"${String(c)}"`).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  });
}
