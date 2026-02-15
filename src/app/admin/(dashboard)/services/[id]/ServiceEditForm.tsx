"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Service, Category, Location } from "@prisma/client";

type ServiceWithRelations = Service & {
  category: Category;
  serviceLocations: { location: Location }[];
};

export function ServiceEditForm({
  service,
  categories,
  locations,
}: {
  service: ServiceWithRelations;
  categories: Category[];
  locations: Location[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(service.content);
  const [metaTitle, setMetaTitle] = useState(service.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(service.metaDescription ?? "");
  const [pricingJson, setPricingJson] = useState(
    () => JSON.stringify(service.pricing as object, null, 2)
  );
  const [faqsJson, setFaqsJson] = useState(
    () => JSON.stringify(service.faqs as object, null, 2)
  );
  const [processStepsJson, setProcessStepsJson] = useState(
    () =>
      JSON.stringify(
        (service as Service & { processSteps?: unknown }).processSteps ?? [],
        null,
        2
      )
  );
  const [documentsJson, setDocumentsJson] = useState(
    () =>
      JSON.stringify(
        (service as Service & { documentsRequired?: unknown }).documentsRequired ?? [],
        null,
        2
      )
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    let pricing: unknown = [];
    let faqs: unknown = [];
    let processSteps: unknown = [];
    let documentsRequired: unknown = [];
    try {
      pricing = JSON.parse(pricingJson);
    } catch {}
    try {
      faqs = JSON.parse(faqsJson);
    } catch {}
    try {
      processSteps = JSON.parse(processStepsJson);
    } catch {}
    try {
      documentsRequired = JSON.parse(documentsJson);
    } catch {}

    const res = await fetch(`/api/admin/services/${service.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        pricing,
        faqs,
        processSteps,
        documentsRequired,
      }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Failed to update");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <Label>Category</Label>
        <p className="mt-1 text-sm text-slate-600">{service.category.name}</p>
      </div>
      <div>
        <Label htmlFor="content">Content (intro)</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="pricing">Pricing (JSON)</Label>
        <Textarea
          id="pricing"
          value={pricingJson}
          onChange={(e) => setPricingJson(e.target.value)}
          rows={6}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="faqs">FAQs (JSON)</Label>
        <Textarea
          id="faqs"
          value={faqsJson}
          onChange={(e) => setFaqsJson(e.target.value)}
          rows={8}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="processSteps">Process steps (JSON array of strings)</Label>
        <Textarea
          id="processSteps"
          value={processStepsJson}
          onChange={(e) => setProcessStepsJson(e.target.value)}
          rows={4}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="documents">Documents required (JSON array of strings)</Label>
        <Textarea
          id="documents"
          value={documentsJson}
          onChange={(e) => setDocumentsJson(e.target.value)}
          rows={3}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={2}
          className="mt-1"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
