import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostCreateForm } from "./PostCreateForm";

export default function AdminBlogNewPage() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/blog">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">New Post</h1>
      </div>
      <PostCreateForm />
    </div>
  );
}
