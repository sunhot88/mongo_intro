import Image from "next/image";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import EmailSignupForm from "@/components/EmailSignupForm";

const stats = [
  { num: "台南玉井促銷大放送", label: "自家果園產地" },
  { num: "18°+", label: "甜度分級標準" },
  { num: "24hr", label: "採收即出貨" },
  { num: "$1500+", label: "免運門檻" },
];

const plans = [
  {
    name: "嚐鮮盒",
    weight: "3台斤",
    price: "680",
    desc: "小家庭剛好的份量，第一次購買的最佳選擇。",
    tag: null,
  },
  {
    name: "送禮箱",
    weight: "6台斤",
    price: "1,280",
    desc: "分裝禮盒包裝，送禮自用兩相宜，最受歡迎的規格。",
    tag: "最受期待",
  },
  {
    name: "團購箱",
    weight: "10台斤",
    price: "1,980",
    desc: "多戶合購、辦公室團購最划算的箱裝規格。",
    tag: null,
  },
];

const faqs = [
  {
    q: "出貨時間",
    a: "採預購制，訂單成立後依採收進度於 3–5 個工作天內出貨，出貨後隔日送達。",
  },
  {
    q: "付款方式",
    a: "支援線上刷卡、ATM 轉帳與貨到付款，訂購完成後將收到付款通知。",
  },
  {
    q: "保存方式",
    a: "常溫陰涼處存放，若尚未熟軟可靜置 1–2 天；冰藏可延緩熟成，食用前建議先退冰。",
  },
  {
    q: "配送範圍",
    a: "目前提供台灣本島宅配服務，離島地區請透過客服專線洽詢。",
  },
];

const orchardTags = ["自然熟成", "當日採收", "友善耕作", "產銷履歷"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
              Tainan Yujing · 2026 新季愛文芒果
            </p>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] text-ink sm:text-6xl sm:leading-[0.95] lg:text-7xl">
              日光養成
              <br />
              極致的夏日甘甜
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
              自家果園栽培愛文芒果，日曬熟成、當日採收即出貨，
              把台南玉井最當季的香甜，直送到你家餐桌。
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-ink/40">
                  3台斤禮盒
                </p>
                <p className="font-serif text-4xl text-ink">
                  NT$ 680
                  <span className="ml-1 font-sans text-base font-normal text-ink/40">
                    起
                  </span>
                </p>
              </div>
              <a
                href="#order"
                className="rounded-full bg-rust px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
              >
                搶先預約
              </a>
              <a
                href="#order"
                className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                查看規格
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/10">
              <Parallax speed={0.15} maxOffset={40} className="absolute inset-[-10%]">
                <Image
                  src="/images/mango-2.jpg"
                  alt="愛文芒果與葉片特寫"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Parallax>
            </div>
            <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-ink">
              Product of Taiwan
            </span>
          </div>
        </div>

        <div className="border-y border-ink/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-ink/10 px-6 sm:grid-cols-4 sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-6">
                <p className="font-serif text-2xl text-ink sm:text-3xl">
                  {s.num}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-ink/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 商品照片牆 */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[11rem]">
          <Reveal className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-sm sm:aspect-auto">
            <Parallax speed={0.12} maxOffset={28} className="absolute inset-[-14%]">
              <Image
                src="/images/mango-4.jpg"
                alt="成串的黃紅色芒果"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Parallax>
          </Reveal>
          <Reveal
            delay={100}
            className="relative col-span-2 aspect-video overflow-hidden rounded-sm sm:aspect-auto"
          >
            <Parallax speed={0.2} maxOffset={22} className="absolute inset-[-16%]">
              <Image
                src="/images/mango-1.jpg"
                alt="單顆與切半的芒果"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Parallax>
          </Reveal>
          <Reveal
            delay={200}
            className="relative col-span-2 aspect-video overflow-hidden rounded-sm sm:aspect-auto"
          >
            <Parallax speed={0.08} maxOffset={22} className="absolute inset-[-16%]">
              <Image
                src="/images/mango-3.jpg"
                alt="一盤新鮮芒果"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* 產地故事 */}
      <section id="story" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/10 lg:col-span-6">
            <Parallax speed={0.15} maxOffset={36} className="absolute inset-[-10%]">
              <Image
                src="/images/mango-5.jpg"
                alt="結實累累的芒果樹"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Parallax>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
              Our Orchard
            </p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              產地故事
            </h2>
            <p className="mt-6 border-l-2 border-mustard pl-6 font-serif text-xl leading-relaxed text-ink/80">
              台南玉井日照充足、日夜溫差大，是全台最適合種植愛文芒果的產區之一。
              我們堅持不搶收，讓果實在枝頭曬足陽光、自然轉紅，才是那一口濃郁香甜的關鍵。
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {orchardTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-xs text-ink/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 即將開賣 */}
      <section id="order" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
              Coming Soon
            </p>
            <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
              即將開賣
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
              日光芒果目前尚未開放購買，留下 Email
              搶先掌握開賣通知，第一時間嚐到今年最新一季的愛文芒果。
            </p>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.2em] text-ink/40 sm:block">
            Pre-Launch
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 120}
              className="relative flex flex-col bg-cream p-8"
            >
              {p.tag && (
                <span className="absolute right-6 top-6 rounded-full bg-mustard px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink">
                  {p.tag}
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.2em] text-ink/40">
                {p.weight}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink">{p.name}</h3>
              <p className="mt-4 font-serif text-4xl text-ink">
                NT$ {p.price}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/60">
                {p.desc}
              </p>
              <span className="mt-8 inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink/40">
                敬請期待
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360} className="mt-16 text-center">
          <p className="mb-6 font-serif text-lg text-ink/80">
            留下 Email，開賣的第一時間通知您
          </p>
          <EmailSignupForm />
        </Reveal>
      </section>

      {/* 訂購須知 */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Reveal className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
            Before You Order
          </p>
          <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
            訂購須知
          </h2>
        </Reveal>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => (
            <Reveal
              key={f.q}
              delay={i * 80}
              className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-2 py-6 sm:grid-cols-[3rem_10rem_1fr] sm:gap-x-8 sm:px-4"
            >
              <span className="font-serif text-sm text-ink/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-lg text-ink">{f.q}</h3>
              <p className="col-span-2 text-sm leading-relaxed text-ink/60 sm:col-span-1 sm:col-start-3">
                {f.a}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
