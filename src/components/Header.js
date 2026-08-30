"use client";

import { useState } from "react";
import Link from "next/link";

const ticker = ["台南玉井直送", "24hr 採收即出貨", "甜度18°up", "滿$1500免運"];

const navItems = [
  { href: "/#order", label: "商品規格" },
  { href: "/#story", label: "產地故事" },
  { href: "/blog", label: "芒果生活誌" },
  { href: "/game", label: "小遊戲" },
  { href: "/#faq", label: "訂購須知" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50">
      <div className="overflow-hidden bg-forest text-cream">
        <div className="flex animate-marquee py-1.5 text-[11px] font-medium tracking-[0.25em] uppercase">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="mx-6 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-ink/10 bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-2"
          >
            <span className="font-serif text-xl font-bold text-ink sm:text-2xl">
              日光芒果
            </span>
            <span className="hidden text-[10px] tracking-[0.3em] text-ink/40 sm:inline">
              SUNLIT MANGO · 台南玉井
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-medium tracking-[0.15em] text-ink/70 sm:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="group relative py-1">
                <span>{item.label}</span>
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            <Link
              href="/#order"
              className="rounded-full bg-rust px-5 py-2 text-cream transition-colors hover:bg-ink"
            >
              搶先預約
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-ink/10 px-4 py-4 text-sm font-medium text-ink/80 sm:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#order"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-rust px-5 py-2.5 text-center text-cream"
            >
              搶先預約
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
