import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/blog-posts";

export const metadata = {
  title: "芒果生活誌 | 日光芒果",
  description: "關於愛文芒果的挑選方法、產地故事與生活提案。",
};

export default function BlogIndex() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
          Journal
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
          芒果生活誌
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          從挑選方法、產地故事到餐桌上的芒果料理，記錄我們在果園裡學到的大小事。
        </p>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-3">
        {blogPosts.map((post, i) => (
          <Reveal
            key={post.slug}
            delay={i * 120}
            className="group flex flex-col border border-ink/10 bg-cream"
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] uppercase tracking-[0.15em] text-ink/40">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-rust">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  閱讀全文
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
