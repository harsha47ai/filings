import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Smooth company registration. The team was responsive and completed everything on time.",
    name: "Rahul S.",
    role: "Founder, Tech Startup",
  },
  {
    quote: "GST registration and filing made easy. Highly recommend for small businesses.",
    name: "Priya M.",
    role: "Director, Retail Business",
  },
  {
    quote: "Trademark registration was hassle-free. Professional and transparent pricing.",
    name: "Vikram K.",
    role: "Owner, Brand Agency",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="transition-shadow duration-300 hover:shadow-md">
              <CardContent className="pt-6">
                <p className="text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-medium text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
