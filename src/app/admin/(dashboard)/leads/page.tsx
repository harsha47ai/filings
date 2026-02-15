import { prisma } from "@/lib/db";
import { LeadsTable } from "./LeadsTable";

export const dynamic = "force-dynamic";
import { LeadFilters } from "./LeadFilters";

interface Props {
  searchParams: Promise<{ service?: string; location?: string; status?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  const params = await searchParams;
  const where: { serviceId?: string; locationId?: string; status?: "NEW" | "CONTACTED" | "CLOSED" } = {};
  if (params.service) where.serviceId = params.service;
  if (params.location) where.locationId = params.location;
  if (params.status) where.status = params.status as "NEW" | "CONTACTED" | "CLOSED";

  const [leads, services, locations] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        service: { select: { title: true } },
        location: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
    prisma.location.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
        <a
          href="/api/admin/leads/export"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Export CSV
        </a>
      </div>
      <LeadFilters services={services} locations={locations} current={params} />
      <LeadsTable leads={leads} />
    </div>
  );
}
