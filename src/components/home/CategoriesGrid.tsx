import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCategoriesWithServices } from "@/lib/queries";

export async function CategoriesGrid() {
  const categories = await getCategoriesWithServices();
  if (!categories.length) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "Business Registration", slug: "business-registration" },
          { name: "Tax Compliance", slug: "tax-compliance" },
          { name: "Intellectual Property", slug: "intellectual-property" },
        ].map((cat) => (
          <Link key={cat.slug} href={`/${cat.slug}`}>
            <Card className="h-full transition-shadow duration-300 hover:shadow-md">
              <CardHeader>
                <h3 className="text-xl font-semibold text-slate-900">{cat.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">View services</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((cat) => (
        <Link key={cat.id} href={`/${cat.slug}`}>
          <Card className="h-full transition-shadow duration-300 hover:shadow-md">
            <CardHeader>
              <h3 className="text-xl font-semibold text-slate-900">{cat.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                {cat.services.length} service{cat.services.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
