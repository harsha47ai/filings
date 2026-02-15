import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LocationCreateForm } from "./LocationCreateForm";

export default function AdminLocationNewPage() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/locations">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Add Location</h1>
      </div>
      <LocationCreateForm />
    </div>
  );
}
