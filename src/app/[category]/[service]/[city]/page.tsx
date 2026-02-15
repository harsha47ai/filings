import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceByCategoryAndSlug, getServiceLocation } from "@/lib/queries";
import { ServicePageTemplate } from "@/components/service/ServicePageTemplate";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getBaseUrl } from "@/lib/constants";

interface Props {
  params: Promise<{ category: string; service: string; city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service: serviceSlug, city } = await params;
  const service = await getServiceByCategoryAndSlug(category, serviceSlug);
  if (!service) return { title: "Service" };
  const sl = await getServiceLocation(service.id, city);
  if (!sl) return { title: "Service" };
  const location = sl.location;
  const title =
    sl.metaTitleOverride ??
    service.metaTitle ??
    `${service.title} in ${location.name} – Fees & Process (2026)`;
  const description =
    sl.metaDescriptionOverride ??
    service.metaDescription ??
    `Get expert ${service.title} in ${location.name}. Transparent pricing, fast turnaround, and 100% compliance support.`;
  const base = getBaseUrl();
  const canonical = `${base}/${category}/${serviceSlug}/${city}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export async function generateStaticParams() {
  const { getSitemapServicesWithLocations } = await import("@/lib/queries");
  const services = await getSitemapServicesWithLocations();
  const params: { category: string; service: string; city: string }[] = [];
  for (const s of services) {
    for (const sl of s.serviceLocations) {
      params.push({
        category: s.category.slug,
        service: s.slug,
        city: sl.location.slug,
      });
    }
  }
  return params;
}

export const revalidate = 3600;

export default async function ServiceCityPage({ params }: Props) {
  const { category, service: serviceSlug, city } = await params;
  const service = await getServiceByCategoryAndSlug(category, serviceSlug);
  if (!service) notFound();

  const sl = await getServiceLocation(service.id, city);
  if (!sl) notFound();

  const faqList = Array.isArray(service.faqs)
    ? service.faqs
        .filter(
          (f): f is { question: string; answer: string } =>
            f !== null &&
            typeof f === "object" &&
            "question" in f &&
            "answer" in f &&
            typeof (f as { question: unknown }).question === "string" &&
            typeof (f as { answer: unknown }).answer === "string"
        )
        .map((f) => ({ question: f.question, answer: f.answer }))
    : [];

  return (
    <>
      {faqList.length > 0 && <FAQSchema items={faqList} />}
      <ServicePageTemplate
        service={{ ...service, category: service.category }}
        location={sl.location}
        serviceLocation={sl}
      />
    </>
  );
}
