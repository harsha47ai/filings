"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LeadStatusSelect } from "./LeadStatusSelect";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  status: string;
  createdAt: Date;
  service: { title: string } | null;
  location: { name: string } | null;
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="text-slate-600">
                {new Date(lead.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.service?.title ?? "—"}</TableCell>
              <TableCell>{lead.location?.name ?? "—"}</TableCell>
              <TableCell>
                <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {leads.length === 0 && (
        <div className="py-12 text-center text-slate-500">No leads found.</div>
      )}
    </div>
  );
}
