"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationSelector } from "./LocationSelector";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeadFormModal } from "@/components/service/LeadFormModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/business-registration", label: "Business Registration" },
  { href: "/tax-compliance", label: "Tax Compliance" },
  { href: "/intellectual-property", label: "Intellectual Property" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/50 bg-slate-950/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          IndiaFilings
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocationSelector />
          <Button
            onClick={() => setLeadModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Get Consultation
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white">
            <nav className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-900 hover:text-indigo-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 border-t pt-4">
                <p className="mb-2 text-sm font-medium text-slate-600">City</p>
                <LocationSelector />
              </div>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  setLeadModalOpen(true);
                }}
                className="mt-4 w-full"
              >
                Get Consultation
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <LeadFormModal open={leadModalOpen} onOpenChange={setLeadModalOpen} />
    </header>
  );
}
