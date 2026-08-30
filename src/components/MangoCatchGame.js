"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 15;
const SPAWN_INTERVAL = 0.65;
const CATCH_Y_MIN = 84;
const CATCH_Y_MAX = 97;
const CATCH_RADIUS = 9;
const BONUS_CHANCE = 0.15;

export default function MangoCatchGame() {
  const [status, setStatus] = useState("idle"); // idle | playing | over
  const [game, setGame] = useState({ items: [], score: 0 });
  const [bestScore, setBestScore] = useState(0);
  const [remaining, setRemaining] = useState(DURATION);
  const [basketX, setBasketX] = useState(50);

  const containerRef = useRef(null);
  const basketXRef = useRef(50);
  const idCounter = useRef(0);
  const elapsedRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  useEffect(() => {
    if (status === "over") {
      setBestScore((b) => Math.max(b, game.score));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;

    elapsedRef.current = 0;
    spawnTimerRef.current = 0;
    let lastTime = performance.now();

    function loop(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedRef.current += dt;

      if (elapsedRef.current >= DURATION) {
        setRemaining(0);
        setGame((prev) => ({ ...prev, items: [] }));
        setStatus("over");
        return;
      }

      const nextRemaining = DURATION - elapsedRef.current;
      setRemaining((prev) =>
        Math.ceil(nextRemaining) !== Math.ceil(prev) ? nextRemaining : prev
      );

      spawnTimerRef.current += dt;
      let spawnNew = null;
      if (spawnTimerRef.current > SPAWN_INTERVAL) {
        spawnTimerRef.current = 0;
        spawnNew = {
          id: idCounter.current++,
          x: 8 + Math.random() * 84,
          y: -5,
          speed: 26 + Math.random() * 16,
          bonus: Math.random() < BONUS_CHANCE,
        };
      }

      const basketX = basketXRef.current;

      setGame((prev) => {
        let gained = 0;
        let updated = prev.items
          .map((it) => ({ ...it, y: it.y + it.speed * dt }))
          .filter((it) => {
            const inY = it.y >= CATCH_Y_MIN && it.y <= CATCH_Y_MAX;
            const inX = Math.abs(it.x - basketX) <= CATCH_RADIUS;
            if (inY && inX) {
              gained += it.bonus ? 3 : 1;
              return false;
            }
            return it.y <= 100;
          });

        if (spawnNew) updated = [...updated, spawnNew];

        return { items: updated, score: prev.score + gained };
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setBasketX((x) => Math.max(6, x - 6));
      } else if (e.key === "ArrowRight") {
        setBasketX((x) => Math.min(94, x + 6));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status]);

  function handlePointerMove(e) {
    if (status !== "playing" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.min(94, Math.max(6, pct)));
  }

  function startGame() {
    setGame({ items: [], score: 0 });
    setRemaining(DURATION);
    setBasketX(50);
    setStatus("playing");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between text-sm font-semibold text-ink">
        <span>⏱ 剩餘秒數：{Math.ceil(remaining)}</span>
        <span>🥭 分數：{game.score}</span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        className="relative h-[420px] w-full touch-none select-none overflow-hidden rounded-sm border border-ink/10 bg-gradient-to-b from-sky-50 to-cream sm:h-[500px]"
      >
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-5xl">🥭</p>
            <h2 className="font-serif text-2xl text-ink">接芒果小遊戲</h2>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              移動滑鼠（手機請滑動手指）操控籃子，15 秒內盡量接住越多芒果越好！
              偶爾出現的金芒果 ✨ 可以拿到 3 分。
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-2 rounded-full bg-rust px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
            >
              開始遊戲
            </button>
          </div>
        )}

        {status === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-5xl">🎉</p>
            <h2 className="font-serif text-2xl text-ink">遊戲結束！</h2>
            <p className="text-lg text-ink">
              這次得分：
              <span className="font-serif text-3xl text-rust">{game.score}</span>
            </p>
            <p className="text-xs uppercase tracking-[0.15em] text-ink/40">
              最佳紀錄 {bestScore} 分
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-2 rounded-full bg-rust px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink"
            >
              再玩一次
            </button>
          </div>
        )}

        {status === "playing" &&
          game.items.map((it) => (
            <span
              key={it.id}
              className={`absolute text-4xl ${
                it.bonus ? "drop-shadow-[0_0_10px_rgba(205,154,60,0.9)]" : ""
              }`}
              style={{
                left: `${it.x}%`,
                top: `${it.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {it.bonus ? "✨🥭" : "🥭"}
            </span>
          ))}

        {status === "playing" && (
          <span
            className="absolute bottom-3 text-6xl"
            style={{ left: `${basketX}%`, transform: "translateX(-50%)" }}
          >
            🧺
          </span>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink/40">
        操作方式：滑鼠 / 觸控拖曳，或使用鍵盤左右方向鍵移動籃子。
      </p>
    </div>
  );
}
