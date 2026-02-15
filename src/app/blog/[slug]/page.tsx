import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/queries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto max-w-6xl px-4 py-16">
      <Link href="/blog" className="mb-6 inline-block text-sm text-indigo-600 hover:underline">
        ← Back to blog
      </Link>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900">
        {post.title}
      </h1>
      {post.publishedAt && (
        <p className="mb-8 text-sm text-slate-500">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      <div
        className="prose prose-slate max-w-none text-slate-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
