import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPublishedPosts } from "@/lib/queries";

export async function BlogPreview() {
  const posts = await getPublishedPosts(3);
  if (posts.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
            Latest Compliance Updates
          </h2>
          <p className="text-center text-slate-600">No posts yet. Check back soon.</p>
          <p className="mt-2 text-center">
            <Link href="/blog" className="text-indigo-600 hover:underline">
              View blog
            </Link>
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Latest Compliance Updates
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-shadow duration-300 hover:shadow-md">
                <CardHeader>
                  <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {post.excerpt ?? ""}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-indigo-600 font-medium hover:underline"
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
