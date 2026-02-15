import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Simplifying Business Compliance Across India
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 md:text-lg">
          Register your company, manage GST, and protect your brand with expert-led
          compliance solutions.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-indigo-600 px-8 hover:bg-indigo-700"
          >
            <a href="#consultation">Get Free Consultation</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-slate-300 px-8"
          >
            <Link href="#services">Explore Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
