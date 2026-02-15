import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { ServiceCreateForm } from "./ServiceCreateForm";

export default async function AdminServiceNewPage() {
  const [categories, locations] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.location.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/services">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Add Service</h1>
      </div>
      <ServiceCreateForm categories={categories} locations={locations} />
    </div>
  );
}
