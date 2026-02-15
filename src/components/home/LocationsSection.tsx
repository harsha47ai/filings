import Link from "next/link";
import { getAllLocations } from "@/lib/queries";

export async function LocationsSection() {
  const locations = await getAllLocations();
  const slugs = locations.length
    ? locations.map((l) => l.slug)
    : ["hyderabad", "bangalore", "mumbai", "delhi", "chennai", "pune"];
  const names: Record<string, string> = locations.length
    ? Object.fromEntries(locations.map((l) => [l.slug, l.name]))
    : {
        hyderabad: "Hyderabad",
        bangalore: "Bangalore",
        mumbai: "Mumbai",
        delhi: "Delhi",
        chennai: "Chennai",
        pune: "Pune",
      };

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Our Locations
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {slugs.map((slug) => (
            <Link
              key={slug}
              href={`/business-registration/private-limited-company/${slug}`}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200"
            >
              {names[slug] ?? slug}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
