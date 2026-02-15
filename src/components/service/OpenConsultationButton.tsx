"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadFormModal } from "./LeadFormModal";

interface OpenConsultationButtonProps {
  serviceId?: string;
  locationId?: string;
  serviceName?: string;
  cityName?: string;
  className?: string;
  children?: React.ReactNode;
}

export function OpenConsultationButton({
  serviceId,
  locationId,
  serviceName,
  cityName,
  className,
  children = "Get Free Consultation",
}: OpenConsultationButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <LeadFormModal
        open={open}
        onOpenChange={setOpen}
        serviceId={serviceId}
        locationId={locationId}
        serviceName={serviceName}
        cityName={cityName}
      />
    </>
  );
}
