"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATION_SLUGS } from "@/lib/constants";

const locationNames: Record<string, string> = {
  hyderabad: "Hyderabad",
  bangalore: "Bangalore",
  mumbai: "Mumbai",
  delhi: "Delhi",
  chennai: "Chennai",
  pune: "Pune",
};

export function LocationSelector() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const maybeCategory = segments[0];
  const maybeService = segments[1];
  const currentCity = segments[2] && LOCATION_SLUGS.includes(segments[2] as typeof LOCATION_SLUGS[number])
    ? segments[2]
    : null;

  const handleValueChange = (value: string) => {
    if (maybeCategory && maybeService && value) {
      window.location.href = `/${maybeCategory}/${maybeService}/${value}`;
    }
  };

  return (
    <Select
      value={currentCity ?? "all"}
      onValueChange={(v) => v !== "all" && handleValueChange(v)}
    >
      <SelectTrigger className="w-[160px] border-slate-600 bg-slate-900/50 text-white focus:ring-slate-500">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All India</SelectItem>
        {LOCATION_SLUGS.map((slug) => (
          <SelectItem key={slug} value={slug}>
            {locationNames[slug]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
