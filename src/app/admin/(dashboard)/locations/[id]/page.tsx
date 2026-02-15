import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { LocationEditForm } from "./LocationEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminLocationEditPage({ params }: Props) {
  const { id } = await params;
  const location = await prisma.location.findUnique({
    where: { id },
  });
  if (!location) notFound();

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/locations">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Edit Location</h1>
      </div>
      <LocationEditForm location={location} />
    </div>
  );
}
