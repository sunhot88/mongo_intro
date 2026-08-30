"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sunlitMangoVisitorName";

export default function WelcomeGate() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      // ignore unavailable storage (e.g. private browsing)
    }

    if (saved) {
      setName(saved);
      setBannerVisible(true);
      setIsReturning(true);
    } else {
      setOpen(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setName(trimmed);
    setBannerVisible(true);
    setIsReturning(false);
    setOpen(false);

    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // ignore storage errors
    }
  }

  function handleSkip() {
    setOpen(false);
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 px-4">
          <div className="relative w-full max-w-sm border border-ink/10 bg-cream p-8 text-center shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
              Welcome
            </p>
            <h2 className="mt-3 font-serif text-2xl text-ink">歡迎光臨日光芒果</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              想怎麼稱呼您呢？讓我們跟您打聲招呼。
            </p>
            <form onSubmit={handleSubmit} className="mt-6">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="輸入您的稱呼"
                autoFocus
                className="w-full border border-ink/20 bg-cream px-5 py-3 text-center text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-rust py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
              >
                進站逛逛
              </button>
            </form>
            <button
              type="button"
              onClick={handleSkip}
              className="mt-4 text-xs text-ink/40 underline decoration-ink/20 underline-offset-4 hover:text-ink/70"
            >
              先隨便看看
            </button>
          </div>
        </div>
      )}

      {bannerVisible && (
        <div className="border-b border-ink/10 bg-mustard/15">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 text-sm text-ink sm:px-6">
            <span>
              {isReturning
                ? `歡迎回來，${name}！`
                : `嗨，${name}！歡迎來到日光芒果 🥭`}
            </span>
            <button
              type="button"
              onClick={() => setBannerVisible(false)}
              aria-label="關閉歡迎訊息"
              className="text-ink/40 transition-colors hover:text-ink"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
