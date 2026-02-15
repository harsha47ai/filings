import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { ServiceEditForm } from "./ServiceEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminServiceEditPage({ params }: Props) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: { category: true, serviceLocations: { include: { location: true } } },
  });
  if (!service) notFound();

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const locations = await prisma.location.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/services">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Edit Service</h1>
      </div>
      <ServiceEditForm
        service={service}
        categories={categories}
        locations={locations}
      />
    </div>
  );
}
