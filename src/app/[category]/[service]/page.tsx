import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceByCategoryAndSlug } from "@/lib/queries";
import { ServicePageTemplate } from "@/components/service/ServicePageTemplate";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getBaseUrl } from "@/lib/constants";

interface Props {
  params: Promise<{ category: string; service: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service: serviceSlug } = await params;
  const service = await getServiceByCategoryAndSlug(category, serviceSlug);
  if (!service) return { title: "Service" };
  const title = service.metaTitle ?? `${service.title} – Fees & Process (2026)`;
  const description =
    service.metaDescription ??
    `Get expert ${service.title}. Transparent pricing, fast turnaround, and 100% compliance support.`;
  const base = getBaseUrl();
  const canonical = `${base}/${category}/${serviceSlug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

export async function generateStaticParams() {
  const { getAllServiceSlugs } = await import("@/lib/queries");
  return getAllServiceSlugs();
}

export const revalidate = 3600;

export default async function ServicePage({ params }: Props) {
  const { category, service: serviceSlug } = await params;
  const service = await getServiceByCategoryAndSlug(category, serviceSlug);
  if (!service) notFound();

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
      <ServicePageTemplate service={service} />
    </>
  );
}
