import Reveal from "@/components/Reveal";
import MangoCatchGame from "@/components/MangoCatchGame";

export const metadata = {
  title: "接芒果小遊戲 | 日光芒果",
  description: "15 秒接芒果小遊戲，純娛樂放鬆一下。",
};

export default function GamePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rust">
          Just for Fun
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
          接芒果小遊戲
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
          等開賣等得有點無聊嗎？來玩 15 秒接芒果，純粹娛樂，看看你能接到幾顆！
        </p>
      </Reveal>

      <Reveal delay={100}>
        <MangoCatchGame />
      </Reveal>
    </section>
  );
}
