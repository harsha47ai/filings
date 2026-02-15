import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Compliance Updates – Blog",
  description: "Stay updated with compliance news and guides.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true },
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-2 text-4xl font-semibold tracking-tight text-slate-900">
        Latest Compliance Updates
      </h1>
      <p className="mb-10 text-slate-600">
        News, guides, and updates on business compliance in India.
      </p>
      {posts.length === 0 ? (
        <p className="text-slate-600">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-shadow duration-300 hover:shadow-md">
                <CardHeader>
                  <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {post.excerpt ?? ""}
                  </p>
                  {post.publishedAt && (
                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
