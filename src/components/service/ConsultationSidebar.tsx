"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadFormModal } from "./LeadFormModal";

interface ConsultationSidebarProps {
  serviceId?: string;
  locationId?: string;
  serviceName?: string;
  cityName?: string;
}

export function ConsultationSidebar({
  serviceId,
  locationId,
  serviceName,
  cityName,
}: ConsultationSidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:sticky lg:top-24">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">Free Consultation</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Get expert guidance and a custom quote. We respond within 24 hours.
          </p>
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setOpen(true)}
          >
            Get Free Consultation
          </Button>
        </CardContent>
      </Card>
      <LeadFormModal
        open={open}
        onOpenChange={setOpen}
        serviceId={serviceId}
        locationId={locationId}
        serviceName={serviceName}
        cityName={cityName}
      />
    </div>
  );
}
