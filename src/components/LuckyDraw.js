"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sunlitMangoLuckyDraw";
const WIN_RATE = 0.1;

function generateCouponCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MANGO9-${code}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | drawing | won | lost
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) {
        setPhase(saved.won ? "won" : "lost");
        setCoupon(saved.coupon || "");
      }
    } catch {
      // ignore corrupted/unavailable storage
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleDraw() {
    setPhase("drawing");
    window.setTimeout(() => {
      const won = Math.random() < WIN_RATE;
      const code = won ? generateCouponCode() : "";
      setPhase(won ? "won" : "lost");
      setCoupon(code);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ won, coupon: code }));
      } catch {
        // ignore storage errors (e.g. private browsing)
      }
    }, 1200);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-rust px-5 py-3 text-sm font-semibold text-cream shadow-lg shadow-ink/20 transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      >
        🥭 抽優惠券
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm border border-ink/10 bg-cream p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉"
              className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink"
            >
              ✕
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
              Lucky Draw
            </p>
            <h2 className="mt-3 font-serif text-2xl text-ink">芒果優惠抽獎</h2>

            {phase === "idle" && (
              <>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  每人限抽一次，10% 機會抽中愛文芒果 9 折優惠券！
                </p>
                <div className="mt-8 text-6xl">🥭</div>
                <button
                  type="button"
                  onClick={handleDraw}
                  className="mt-8 w-full rounded-full bg-rust py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
                >
                  立即抽獎
                </button>
              </>
            )}

            {phase === "drawing" && (
              <>
                <p className="mt-4 text-sm text-ink/60">抽獎中，公布結果…</p>
                <div className="mt-8 animate-spin text-6xl">🥭</div>
              </>
            )}

            {phase === "won" && (
              <>
                <div className="mt-4 text-6xl">🎉</div>
                <p className="mt-4 font-serif text-xl text-ink">恭喜中獎！</p>
                <p className="mt-2 text-sm text-ink/60">
                  獲得愛文芒果 9 折優惠券，開賣時輸入代碼即可折抵：
                </p>
                <p className="mt-4 rounded-sm border border-dashed border-rust bg-rust/5 py-3 font-mono text-lg tracking-widest text-rust">
                  {coupon}
                </p>
                <p className="mt-4 text-xs text-ink/40">
                  請截圖保存此優惠碼，開賣時於訂購頁面出示即可折抵。
                </p>
                <button
                  type="button"
                  onClick={handleDraw}
                  className="mt-6 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  再抽一次
                </button>
              </>
            )}

            {phase === "lost" && (
              <>
                <div className="mt-4 text-6xl">🥭</div>
                <p className="mt-4 font-serif text-xl text-ink">差一點點！</p>
                <p className="mt-2 text-sm text-ink/60">
                  這次沒有抽中優惠券。留下 Email 訂閱開賣通知，之後還有更多優惠機會！
                </p>
                <button
                  type="button"
                  onClick={handleDraw}
                  className="mt-6 w-full rounded-full bg-rust py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
                >
                  再抽一次
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
