import { Card, CardContent, CardHeader } from "@/components/ui/card";

const features = [
  {
    title: "Expert-led",
    description: "Our team of CAs and compliance experts guide you through every step.",
  },
  {
    title: "Transparent pricing",
    description: "No hidden fees. Clear packages and upfront quotes for all services.",
  },
  {
    title: "Fast turnaround",
    description: "Streamlined processes and dedicated support for quick completion.",
  },
  {
    title: "100% compliance",
    description: "Stay compliant with regulations and avoid penalties with our support.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Why Choose Us
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card
              key={f.title}
              className="transition-shadow duration-300 hover:shadow-md"
            >
              <CardHeader>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
