import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PORTRAIT = "https://cdn.poehali.dev/projects/2703d86c-3d15-497f-ad26-7263d50783e7/files/208a08fe-10af-419b-93d5-632c601a2722.jpg";
const OUTFIT_REF = "https://cdn.poehali.dev/projects/2703d86c-3d15-497f-ad26-7263d50783e7/files/3aeb5d2e-6e36-44ea-b557-c0d75d6fc521.jpg";

const STATS = [
  { label: "СИЛА", val: 94, color: "var(--neon-pink)" },
  { label: "ГРАЦИЯ", val: 98, color: "var(--neon-cyan)" },
  { label: "СКОРОСТЬ", val: 91, color: "var(--neon-yellow)" },
  { label: "СЛОЖНОСТЬ КОСПЛЕЯ", val: 72, color: "var(--neon-purple)" },
];

const MATERIALS = [
  { item: "Чёрное атласное платье", qty: "3 м", diff: "СРЕДНЕ" },
  { item: "Белый парик (короткий)", qty: "1 шт", diff: "ЛЕГКО" },
  { item: "Чёрная лента-повязка", qty: "1 шт", diff: "ЛЕГКО" },
  { item: "Пластиковый меч-катана", qty: "1 шт", diff: "СЛОЖНО" },
  { item: "Чёрные перчатки без пальцев", qty: "1 пара", diff: "ЛЕГКО" },
  { item: "Чулки в сеточку", qty: "1 пара", diff: "ЛЕГКО" },
];

const RECOMMENDED = [
  { name: "A2", series: "NieR Automata", type: "ИГРА", match: 96, diff: "★★★★☆" },
  { name: "9S", series: "NieR Automata", type: "ИГРА", match: 91, diff: "★★★☆☆" },
  { name: "Yorha Commander", series: "NieR Automata", type: "ИГРА", match: 87, diff: "★★★★☆" },
  { name: "Raiden", series: "Metal Gear Rising", type: "ИГРА", match: 79, diff: "★★★★★" },
];

const DIFF_COLORS: Record<string, string> = {
  ЛЕГКО: "var(--neon-cyan)",
  СРЕДНЕ: "var(--neon-yellow)",
  СЛОЖНО: "var(--neon-pink)",
};

export default function Character2B() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ОБЗОР" | "КОСПЛЕЙ" | "МАТЕРИАЛЫ">("ОБЗОР");
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--dark-bg)", color: "#F0F0F0" }}>

      {/* STATUS BAR */}
      <div className="diagonal-strip border-b" style={{ borderColor: "rgba(0,255,237,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          <span className="font-mono-game text-xs" style={{ color: "var(--neon-cyan)" }}>
            ▶ CHARACTER DATABASE &nbsp;|&nbsp; ID: YoRHa-2B
          </span>
          <span className="font-mono-game text-xs" style={{ color: "var(--neon-yellow)" }}>
            ⚡ XP: 4,820
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b sticky top-0 z-50" style={{ borderColor: "rgba(0,255,237,0.15)", background: "rgba(10,12,20,0.97)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 border font-mono-game text-xs tracking-widest transition-all hover:scale-105"
            style={{ borderColor: "rgba(0,255,237,0.3)", color: "var(--neon-cyan)", background: "rgba(0,255,237,0.04)" }}
          >
            <Icon name="ChevronLeft" size={12} />
            НАЗАД
          </button>

          <div className="flex items-center gap-3">
            <div className="flicker" style={{ fontFamily: "'Russo One', sans-serif", fontSize: 20, letterSpacing: 4, color: "var(--neon-cyan)", textShadow: "0 0 10px var(--neon-cyan), 0 0 30px var(--neon-cyan)" }}>
              GEEK PULSE
            </div>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-2 px-4 py-2 border font-mono-game text-xs tracking-widest transition-all hover:scale-105"
            style={{
              borderColor: saved ? "var(--neon-pink)" : "rgba(255,255,255,0.15)",
              color: saved ? "var(--neon-pink)" : "rgba(255,255,255,0.4)",
              background: saved ? "rgba(255,45,155,0.08)" : "transparent",
            }}
          >
            <Icon name="Bookmark" size={12} />
            {saved ? "СОХРАНЕНО" : "СОХРАНИТЬ"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          <span style={{ color: "var(--neon-cyan)" }}>ПЕРСОНАЖИ</span>
          <span>›</span>
          <span>NieR Automata</span>
          <span>›</span>
          <span style={{ color: "#F0F0F0" }}>2B (YoRHa No.2 Type B)</span>
        </div>

        {/* HERO CARD */}
        <section className="animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            {/* Portrait */}
            <div className="md:col-span-2 relative border-2" style={{ borderColor: "var(--neon-cyan)" }}>
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4" style={{ borderColor: "var(--neon-cyan)" }} />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4" style={{ borderColor: "var(--neon-pink)" }} />
              <img src={PORTRAIT} alt="2B" className="w-full object-cover" style={{ minHeight: 400, display: "block" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 diagonal-strip">
                <div className="font-mono-game text-xs" style={{ color: "var(--neon-cyan)" }}>
                  ◈ ID: YoRHa No.2 Type B
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="md:col-span-3 space-y-5">
              {/* Title */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="tag-badge border-neon-cyan neon-cyan">ИГРА</span>
                  <span className="tag-badge border-neon-yellow neon-yellow">TOP PICK</span>
                  <span className="tag-badge" style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)" }}>СЛОЖНОСТЬ ★★★★☆</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-1 flicker" style={{ fontFamily: "'Russo One', sans-serif", lineHeight: 1.1 }}>
                  <span style={{ color: "#F0F0F0" }}>2B</span>
                </h1>
                <div className="font-mono-game text-sm" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>
                  NieR: Automata · Square Enix · 2017
                </div>
              </div>

              {/* Quote */}
              <div className="border-l-2 pl-4" style={{ borderColor: "var(--neon-cyan)" }}>
                <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Rubik', sans-serif" }}>
                  «Эмоции запрещены. Но они всё равно есть.»
                </p>
                <div className="font-mono-game text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>— YoRHa No.2 Type B</div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="font-mono-game text-xs tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  ◈ ХАРАКТЕРИСТИКИ ПЕРСОНАЖА
                </div>
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between font-mono-game text-xs mb-1">
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</span>
                      <span style={{ color: stat.color }}>{stat.val}/100</span>
                    </div>
                    <div className="h-2 relative" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${stat.val}%`,
                          background: `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`,
                          boxShadow: `0 0 10px ${stat.color}66`,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "ПРОСМОТРЫ", val: "42.7K", icon: "Eye" },
                  { label: "КОСПЛЕЕВ", val: "3,100+", icon: "Star" },
                  { label: "РЕЙТИНГ", val: "9.8 / 10", icon: "Trophy" },
                ].map((m) => (
                  <div key={m.label} className="border p-3 text-center" style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}>
                    <Icon name={m.icon} size={16} style={{ color: "var(--neon-cyan)", margin: "0 auto 4px" }} />
                    <div className="font-mono-game text-sm font-bold" style={{ color: "#F0F0F0" }}>{m.val}</div>
                    <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TABS */}
        <section className="animate-slide-up-delay-1">
          <div className="flex gap-1 mb-6">
            {(["ОБЗОР", "КОСПЛЕЙ", "МАТЕРИАЛЫ"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 font-mono-game text-xs tracking-widest transition-all duration-200"
                style={{
                  color: activeTab === tab ? "var(--dark-bg)" : "rgba(255,255,255,0.45)",
                  background: activeTab === tab ? "var(--neon-cyan)" : "var(--card-bg)",
                  border: `1px solid ${activeTab === tab ? "var(--neon-cyan)" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: activeTab === tab ? "0 0 20px rgba(0,255,237,0.3)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB: ОБЗОР */}
          {activeTab === "ОБЗОР" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              <div className="border p-6 space-y-4" style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}>
                <h3 className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-cyan)" }}>◈ ЛОРНАЯ СПРАВКА</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
                  2B — боевой андроид организации YoRHa, созданный для уничтожения машин в пост-апокалиптическом мире. Официально лишена права на эмоции, но борется с этим ограничением на протяжении всей игры.
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
                  Её образ сочетает элегантность и смертоносность: чёрное готическое платье, белые волосы, чёрная повязка — одни из самых узнаваемых в игровой культуре.
                </p>
                <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="grid grid-cols-2 gap-3 font-mono-game text-xs">
                    {[
                      ["СЕРИЯ", "NieR: Automata"],
                      ["РАЗРАБОТЧИК", "PlatinumGames"],
                      ["ТИП", "Android / YoRHa"],
                      ["ОРУЖИЕ", "Pod 042 + Virtuous Contract"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ color: "rgba(255,255,255,0.3)" }}>{k}</div>
                        <div className="mt-0.5" style={{ color: "#F0F0F0" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative border overflow-hidden" style={{ borderColor: "rgba(255,45,155,0.3)", minHeight: 300 }}>
                <img src={OUTFIT_REF} alt="Outfit reference" className="w-full h-full object-cover opacity-75" style={{ minHeight: 300 }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,12,20,0.85) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="tag-badge border-neon-pink neon-pink">REFERENCE</span>
                  <div className="font-mono-game text-xs mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>Визуальный референс для косплея</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: КОСПЛЕЙ */}
          {activeTab === "КОСПЛЕЙ" && (
            <div className="space-y-4 animate-slide-up">
              <div className="border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}>
                <h3 className="font-mono-game text-xs tracking-widest mb-4" style={{ color: "var(--neon-cyan)" }}>◈ ПОШАГОВЫЙ ПЛАН КОСПЛЕЯ</h3>
                <div className="space-y-3">
                  {[
                    { step: "01", title: "Платье", desc: "Пошив из чёрного атласа или покупка готового. Важно: юбка должна быть пышной, корсет — плотным.", time: "8–20 ч", diff: "СРЕДНЕ" },
                    { step: "02", title: "Парик", desc: "Белый боб-парик длиной до подбородка. Можно окрасить натуральные, если волосы светлые.", time: "1–2 ч", diff: "ЛЕГКО" },
                    { step: "03", title: "Повязка", desc: "Чёрная лента с золотой окантовкой. Шьётся из атласа или покупается в аниме-магазинах.", time: "1 ч", diff: "ЛЕГКО" },
                    { step: "04", title: "Меч Pod 042", desc: "Изготовление из EVA-пены: вырезать по шаблону, окрасить в серебро с чёрными деталями.", time: "10–15 ч", diff: "СЛОЖНО" },
                    { step: "05", title: "Детали образа", desc: "Белые перчатки выше локтя, чулки в сеточку, высокие каблуки — чёрные.", time: "2–4 ч", diff: "ЛЕГКО" },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4 border p-4" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                      <div className="font-mono-game text-2xl font-bold flex-shrink-0" style={{ color: "rgba(0,255,237,0.2)", lineHeight: 1, minWidth: 36 }}>
                        {s.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>{s.title}</div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{s.time}</span>
                            <span className="tag-badge" style={{ borderColor: DIFF_COLORS[s.diff], color: DIFF_COLORS[s.diff] }}>{s.diff}</span>
                          </div>
                        </div>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: МАТЕРИАЛЫ */}
          {activeTab === "МАТЕРИАЛЫ" && (
            <div className="animate-slide-up">
              <div className="border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}>
                <div className="p-4 border-b font-mono-game text-xs tracking-widest" style={{ borderColor: "rgba(255,255,255,0.06)", color: "var(--neon-cyan)" }}>
                  ◈ СПИСОК МАТЕРИАЛОВ — YoRHa No.2 Type B
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {MATERIALS.map((m, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="font-mono-game text-xs" style={{ color: "rgba(0,255,237,0.3)", minWidth: 24 }}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="text-sm" style={{ color: "#F0F0F0" }}>{m.item}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{m.qty}</div>
                        <span className="tag-badge" style={{ borderColor: DIFF_COLORS[m.diff], color: DIFF_COLORS[m.diff] }}>{m.diff}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t diagonal-strip" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between font-mono-game text-xs">
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>ИТОГО ПОЗИЦИЙ: {MATERIALS.length}</span>
                    <span style={{ color: "var(--neon-yellow)" }}>⚡ СЛОЖНОСТЬ СБОРКИ: СРЕДНЯЯ</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* RECOMMENDED */}
        <section className="animate-slide-up-delay-2">
          <div className="border-2 p-6 relative" style={{ borderColor: "rgba(191,95,255,0.4)", background: "rgba(191,95,255,0.05)" }}>
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: "var(--neon-purple)" }} />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: "var(--neon-purple)" }} />

            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: "var(--neon-purple)", color: "var(--neon-purple)" }}>
                <Icon name="Sparkles" size={16} />
              </div>
              <div>
                <h2 className="font-mono-game text-sm tracking-widest" style={{ color: "var(--neon-purple)" }}>ПОХОЖИЕ ПЕРСОНАЖИ</h2>
                <p className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Подобраны по стилю и сложности косплея</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {RECOMMENDED.map((char, i) => (
                <div
                  key={i}
                  className="game-card border p-4"
                  style={{ borderColor: "rgba(191,95,255,0.2)", background: "rgba(191,95,255,0.06)", cursor: "pointer" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag-badge" style={{ borderColor: "rgba(191,95,255,0.5)", color: "var(--neon-purple)" }}>{char.type}</span>
                    <span className="font-mono-game text-xs" style={{ color: "var(--neon-yellow)" }}>{char.match}%</span>
                  </div>
                  <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Russo One', sans-serif", color: "#F0F0F0" }}>{char.name}</div>
                  <div className="font-mono-game text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{char.series}</div>
                  <div className="h-1" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${char.match}%`,
                        background: "linear-gradient(90deg, var(--neon-purple), #ff2d9b)",
                        boxShadow: "0 0 6px rgba(191,95,255,0.5)",
                      }}
                    />
                  </div>
                  <div className="font-mono-game text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>{char.diff}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t py-6 mt-8" style={{ borderColor: "rgba(0,255,237,0.1)", background: "rgba(0,0,0,0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2024 GEEK PULSE — ЖУРНАЛ О ГИК-КУЛЬТУРЕ</div>
          <div className="font-mono-game text-xs" style={{ color: "rgba(0,255,237,0.3)" }}>POWERED BY GEEK_ENGINE v2.4</div>
        </div>
      </footer>
    </div>
  );
}
