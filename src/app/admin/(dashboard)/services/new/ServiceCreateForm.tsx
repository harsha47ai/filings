"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, Location } from "@prisma/client";

export function ServiceCreateForm({
  categories,
  locations,
}: {
  categories: Category[];
  locations: Location[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [pricingJson, setPricingJson] = useState(
    '[\n  { "name": "Basic", "price": "₹4,999", "description": "" },\n  { "name": "Standard", "price": "₹9,999", "description": "" }\n]'
  );
  const [faqsJson, setFaqsJson] = useState(
    '[\n  { "question": "", "answer": "" }\n]'
  );
  const [processStepsJson, setProcessStepsJson] = useState('[\n  ""\n]');
  const [documentsJson, setDocumentsJson] = useState('[\n  ""\n]');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) {
      alert("Select a category");
      return;
    }
    setLoading(true);
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

    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        categoryId,
        content: content || " ",
        pricing,
        faqs,
        processSteps,
        documentsRequired,
        metaTitle: `${title} – Fees & Process (2026)`,
        metaDescription: `Get expert ${title}. Transparent pricing and compliance support.`,
      }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/services/${data.id}`);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Failed to create");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <Label htmlFor="categoryId">Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId} required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
          }}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1"
        />
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
          rows={6}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="processSteps">Process steps (JSON array)</Label>
        <Textarea
          id="processSteps"
          value={processStepsJson}
          onChange={(e) => setProcessStepsJson(e.target.value)}
          rows={3}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="documents">Documents required (JSON array)</Label>
        <Textarea
          id="documents"
          value={documentsJson}
          onChange={(e) => setDocumentsJson(e.target.value)}
          rows={3}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Service"}
      </Button>
    </form>
  );
}
