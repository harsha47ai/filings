import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalLeads, byStatus, byService, byLocation] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.lead.groupBy({
      by: ["serviceId"],
      _count: true,
    }),
    prisma.lead.groupBy({
      by: ["locationId"],
      _count: true,
      where: { locationId: { not: null } },
    }),
  ]);

  const serviceIds = Array.from(new Set(byService.map((s) => s.serviceId).filter((id): id is string => Boolean(id))));
  const locationIds = Array.from(new Set(byLocation.map((l) => l.locationId).filter((id): id is string => Boolean(id))));
  const [services, locations] = await Promise.all([
    serviceIds.length
      ? prisma.service.findMany({
          where: { id: { in: serviceIds } },
          select: { id: true, title: true },
        })
      : [],
    locationIds.length
      ? prisma.location.findMany({
          where: { id: { in: locationIds } },
          select: { id: true, name: true },
        })
      : [],
  ]);
  const serviceMap = Object.fromEntries(services.map((s) => [s.id, s.title]));
  const locationMap = Object.fromEntries(locations.map((l) => [l.id, l.name]));

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-slate-900">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-slate-600">Total Leads</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-900">{totalLeads}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-slate-600">By Status</h3>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            {byStatus.map((s) => (
              <p key={s.status}>
                <span className="font-medium">{s.status}:</span> {s._count}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-slate-900">Leads by Service</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {byService.map((s) => (
                <li key={s.serviceId ?? "none"}>
                  {s.serviceId ? (serviceMap[s.serviceId] ?? "—") : "General"}: {s._count}
                </li>
              ))}
              {byService.length === 0 && <li className="text-slate-500">No leads yet</li>}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-slate-900">Leads by City</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {byLocation.map((l) => (
                <li key={l.locationId!}>
                  {locationMap[l.locationId!] ?? "—"}: {l._count}
                </li>
              ))}
              {byLocation.length === 0 && <li className="text-slate-500">No leads yet</li>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
