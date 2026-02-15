import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  message: z.string().optional(),
  serviceId: z.string().optional(),
  locationId: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.errors.map((e) => e.message).join("; ");
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    const { name, email, phone, message, serviceId, locationId } = parsed.data;

    if (serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });
      if (!service) {
        return NextResponse.json(
          { error: "Invalid service" },
          { status: 400 }
        );
      }
    }
    if (locationId) {
      const location = await prisma.location.findUnique({
        where: { id: locationId },
      });
      if (!location) {
        return NextResponse.json(
          { error: "Invalid location" },
          { status: 400 }
        );
      }
    }

    await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message: message ?? null,
        serviceId: serviceId ?? null,
        locationId: locationId ?? null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error("Lead API error:", e);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
