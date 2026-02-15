import Link from "next/link";
import { PricingTable } from "./PricingTable";
import { FAQAccordion, type FAQItem } from "./FAQAccordion";
import { ConsultationSidebar } from "./ConsultationSidebar";
import { OpenConsultationButton } from "./OpenConsultationButton";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "@/components/ui/button";
import type { Service, Location, ServiceLocation, Category } from "@prisma/client";

type ServiceWithCategory = Service & { category: Category };
type ServiceLocationWithLocation = ServiceLocation & { location: Location };

interface ServicePageTemplateProps {
  service: ServiceWithCategory;
  location?: Location | null;
  serviceLocation?: ServiceLocationWithLocation | null;
}

function parsePricing(pricing: unknown): { name: string; price: string; description?: string }[] {
  if (Array.isArray(pricing)) {
    return pricing.map((p) => ({
      name: typeof p?.name === "string" ? p.name : "—",
      price: typeof p?.price === "string" ? p.price : "—",
      description: typeof p?.description === "string" ? p.description : undefined,
    }));
  }
  return [];
}

function parseFaqs(faqs: unknown): FAQItem[] {
  if (Array.isArray(faqs)) {
    return faqs
      .filter((f) => f && typeof f.question === "string" && typeof f.answer === "string")
      .map((f) => ({ question: f.question, answer: f.answer }));
  }
  return [];
}

function parseStringArray(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val.filter((x) => typeof x === "string");
  }
  return [];
}

export function ServicePageTemplate({
  service,
  location,
  serviceLocation,
}: ServicePageTemplateProps) {
  const pricing = serviceLocation?.customPrice
    ? parsePricing(serviceLocation.customPrice)
    : parsePricing(service.pricing);
  const faqs = parseFaqs(service.faqs);
  const processSteps = parseStringArray(service.processSteps);
  const documentsRequired = parseStringArray(service.documentsRequired);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: service.category.name, href: `/${service.category.slug}` },
    { label: service.title, href: location ? `/${service.category.slug}/${service.slug}` : undefined },
    ...(location ? [{ label: location.name, href: undefined }] : []),
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <Breadcrumbs items={breadcrumbs} />

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900">
            {location ? `${service.title} in ${location.name}` : service.title}
          </h1>
          <p className="mb-8 text-base text-slate-600">{service.content}</p>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">Pricing</h2>
            <PricingTable rows={pricing} />
          </section>

          {processSteps.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Process
              </h2>
              <ol className="list-inside list-decimal space-y-2 text-slate-600">
                {processSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          {documentsRequired.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Documents Required
              </h2>
              <ul className="list-inside list-disc space-y-1 text-slate-600">
                {documentsRequired.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </section>

          {location && (
            <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-2 font-semibold text-slate-900">
                State-specific note
              </h3>
              <p className="text-sm text-slate-600">
                Services in {location.name} ({location.state}) follow state-level
                compliance requirements. Our team will guide you through any
                local requirements.
              </p>
            </section>
          )}

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Popular Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/business-registration/private-limited-company${location ? `/${location.slug}` : ""}`}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Private Limited Company{location ? ` in ${location.name}` : ""}
              </Link>
              <Link
                href={`/tax-compliance/gst-registration${location ? `/${location.slug}` : ""}`}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                GST Registration{location ? ` in ${location.name}` : ""}
              </Link>
              <Link
                href={`/intellectual-property/trademark-registration${location ? `/${location.slug}` : ""}`}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Trademark Registration{location ? ` in ${location.name}` : ""}
              </Link>
            </div>
          </section>

          <section className="rounded-2xl bg-indigo-50 p-8">
            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              Ready to get started?
            </h2>
            <p className="mb-4 text-slate-600">
              Get a free consultation and custom quote.
            </p>
            <OpenConsultationButton
              serviceId={service.id}
              locationId={location?.id}
              serviceName={service.title}
              cityName={location?.name}
              className="bg-indigo-600 hover:bg-indigo-700"
            />
          </section>
        </div>

        <aside className="hidden lg:block">
          <ConsultationSidebar
            serviceId={service.id}
            locationId={location?.id}
            serviceName={service.title}
            cityName={location?.name}
          />
        </aside>
      </div>
    </div>
  );
}
