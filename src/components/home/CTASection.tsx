"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadFormModal } from "@/components/service/LeadFormModal";

export function CTASection() {
  const [open, setOpen] = useState(false);
  return (
    <section id="consultation" className="py-16 bg-indigo-600">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Ready to Get Started?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-indigo-100">
          Get a free consultation and let our experts help you with compliance.
        </p>
        <Button
          size="lg"
          onClick={() => setOpen(true)}
          className="mt-8 bg-white text-indigo-600 hover:bg-slate-100"
        >
          Get Free Consultation
        </Button>
      </div>
      <LeadFormModal open={open} onOpenChange={setOpen} />
    </section>
  );
}
