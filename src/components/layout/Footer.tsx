import Link from "next/link";

const categoryLinks = [
  { href: "/business-registration", label: "Business Registration" },
  { href: "/tax-compliance", label: "Tax Compliance" },
  { href: "/intellectual-property", label: "Intellectual Property" },
];

const serviceLinks = [
  { href: "/business-registration/private-limited-company", label: "Private Limited Company" },
  { href: "/business-registration/llp-registration", label: "LLP Registration" },
  { href: "/tax-compliance/gst-registration", label: "GST Registration" },
  { href: "/tax-compliance/gst-return-filing", label: "GST Return Filing" },
  { href: "/intellectual-property/trademark-registration", label: "Trademark Registration" },
  { href: "/intellectual-property/trademark-objection", label: "Trademark Objection" },
];

const locationSlugs = ["hyderabad", "bangalore", "mumbai", "delhi", "chennai", "pune"] as const;
const locationNames: Record<string, string> = {
  hyderabad: "Hyderabad",
  bangalore: "Bangalore",
  mumbai: "Mumbai",
  delhi: "Delhi",
  chennai: "Chennai",
  pune: "Pune",
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Services
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Popular Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Our Locations
            </h3>
            <ul className="space-y-2">
              {locationSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/business-registration/private-limited-company/${slug}`}
                    className="text-sm text-slate-600 hover:text-indigo-600"
                  >
                    {locationNames[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-slate-600 hover:text-indigo-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-slate-600 hover:text-indigo-600">
                  Explore Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} IndiaFilings. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
