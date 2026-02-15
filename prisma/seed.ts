import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Business Registration", slug: "business-registration" },
  { name: "Tax Compliance", slug: "tax-compliance" },
  { name: "Intellectual Property", slug: "intellectual-property" },
];

const servicesByCategory: Record<string, { title: string; slug: string }[]> = {
  "business-registration": [
    { title: "Private Limited Company", slug: "private-limited-company" },
    { title: "LLP Registration", slug: "llp-registration" },
  ],
  "tax-compliance": [
    { title: "GST Registration", slug: "gst-registration" },
    { title: "GST Return Filing", slug: "gst-return-filing" },
  ],
  "intellectual-property": [
    { title: "Trademark Registration", slug: "trademark-registration" },
    { title: "Trademark Objection", slug: "trademark-objection" },
  ],
};

const locations = [
  { name: "Hyderabad", slug: "hyderabad", state: "Telangana" },
  { name: "Bangalore", slug: "bangalore", state: "Karnataka" },
  { name: "Mumbai", slug: "mumbai", state: "Maharashtra" },
  { name: "Delhi", slug: "delhi", state: "Delhi" },
  { name: "Chennai", slug: "chennai", state: "Tamil Nadu" },
  { name: "Pune", slug: "pune", state: "Maharashtra" },
];

const defaultPricing = [
  { name: "Basic", price: "₹4,999", description: "Essential package" },
  { name: "Standard", price: "₹9,999", description: "Most popular" },
  { name: "Premium", price: "₹14,999", description: "Full support" },
];

const defaultFaqs = [
  { question: "What documents are required?", answer: "PAN, Aadhaar, and proof of address are typically required. We will provide a complete checklist." },
  { question: "How long does it take?", answer: "Processing time varies by service, usually 7-15 business days for most registrations." },
  { question: "Do you offer support after registration?", answer: "Yes, we provide post-registration compliance support and annual filing assistance." },
];

async function main() {
  const createdCategories: { id: string; slug: string }[] = [];
  const createdServices: { id: string; categoryId: string }[] = [];
  const createdLocations: { id: string; slug: string }[] = [];

  for (const cat of categories) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push({ id: c.id, slug: c.slug });
  }

  for (const cat of createdCategories) {
    const serviceList = servicesByCategory[cat.slug] ?? [];
    for (const svc of serviceList) {
      const s = await prisma.service.upsert({
        where: {
          categoryId_slug: { categoryId: cat.id, slug: svc.slug },
        },
        update: {},
        create: {
          title: svc.title,
          slug: svc.slug,
          categoryId: cat.id,
          content: `Expert ${svc.title} services with transparent pricing and 100% compliance support. Get started today with our streamlined process.`,
          pricing: defaultPricing,
          faqs: defaultFaqs,
          processSteps: [
            "Submit your details and documents",
            "Our team verifies and prepares application",
            "We file with the relevant authority",
            "You receive completion certificate",
          ],
          documentsRequired: ["PAN card", "Aadhaar", "Proof of address", "Passport-size photos"],
          metaTitle: `${svc.title} – Fees & Process (2026)`,
          metaDescription: `Get expert ${svc.title}. Transparent pricing, fast turnaround, and 100% compliance support.`,
        },
      });
      createdServices.push({ id: s.id, categoryId: cat.id });
    }
  }

  for (const loc of locations) {
    const l = await prisma.location.upsert({
      where: { slug: loc.slug },
      update: {},
      create: loc,
    });
    createdLocations.push({ id: l.id, slug: l.slug });
  }

  const allServices = await prisma.service.findMany({ select: { id: true } });
  const allLocations = await prisma.location.findMany({ select: { id: true } });

  for (const service of allServices) {
    for (const location of allLocations) {
      await prisma.serviceLocation.upsert({
        where: {
          serviceId_locationId: {
            serviceId: service.id,
            locationId: location.id,
          },
        },
        update: {},
        create: {
          serviceId: service.id,
          locationId: location.id,
        },
      });
    }
  }

  console.log("Seed completed: categories, services, locations, service-locations.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
