import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { PostEditForm } from "./PostEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/blog">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Edit Post</h1>
      </div>
      <PostEditForm post={post} />
    </div>
  );
}
