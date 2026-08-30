import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          <div>
            <p className="font-serif text-2xl">日光芒果</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/55">
              台南玉井自家果園栽培愛文芒果，日曬熟成、當日採收即出貨，
              把最當季的甘甜直送到你家餐桌。
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cream/40">
              Sitemap
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#order" className="transition-colors hover:text-mustard">
                  商品規格
                </Link>
              </li>
              <li>
                <Link href="/#story" className="transition-colors hover:text-mustard">
                  產地故事
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-mustard">
                  芒果生活誌
                </Link>
              </li>
              <li>
                <Link href="/game" className="transition-colors hover:text-mustard">
                  接芒果小遊戲
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-mustard">
                  訂購須知
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cream/40">
              聯絡訂購
            </p>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>客服專線・0800-888-168</li>
              <li>LINE 官方帳號・@sunlitmango</li>
              <li>出貨地區・台灣本島（離島請洽客服）</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 日光芒果 Sunlit Mango</span>
          <span>台南玉井直送・當季限定</span>
        </div>
      </div>
    </footer>
  );
}
