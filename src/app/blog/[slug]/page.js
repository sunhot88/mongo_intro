import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 芒果生活誌`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <Link
          href="/blog"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
        >
          ← 回芒果生活誌
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-rust">
          {post.date} · {post.readTime}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
      </Reveal>

      <Reveal delay={100} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm border border-ink/10">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </Reveal>

      <div className="mt-12 space-y-10">
        {post.sections.map((section, i) => (
          <Reveal key={section.heading} delay={i * 80}>
            <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-base leading-relaxed text-ink/70">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 border-t border-ink/10 pt-8">
        <Link
          href="/#order"
          className="inline-flex items-center gap-2 rounded-full bg-rust px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
        >
          留下 Email，搶先掌握開賣通知
        </Link>
      </div>
    </article>
  );
}
