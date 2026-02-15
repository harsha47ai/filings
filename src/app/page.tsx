import { Hero } from "@/components/home/Hero";

export const dynamic = "force-dynamic";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LocationsSection } from "@/components/home/LocationsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="services" className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
            Our Services
          </h2>
          <CategoriesGrid />
        </div>
      </section>
      <WhyChooseUs />
      <LocationsSection />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </>
  );
}
