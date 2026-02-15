import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCategoryBySlug } from "@/lib/queries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Category" };
  return {
    title: `${cat.name} – Services`,
    description: `Expert ${cat.name} services. Transparent pricing and compliance support.`,
  };
}

export async function generateStaticParams() {
  const { getAllCategorySlugs } = await import("@/lib/queries");
  return getAllCategorySlugs();
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-2 text-4xl font-semibold tracking-tight text-slate-900">
        {cat.name}
      </h1>
      <p className="mb-10 text-slate-600">
        Choose a service below for pricing, process, and documents required.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {cat.services.map((svc) => (
          <Link
            key={svc.id}
            href={`/${cat.slug}/${svc.slug}`}
          >
            <Card className="h-full transition-shadow duration-300 hover:shadow-md">
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">{svc.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">View pricing & process</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
