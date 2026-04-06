import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/2703d86c-3d15-497f-ad26-7263d50783e7/files/8257bec8-511f-4c00-9a51-e4c92b97f3ea.jpg";
const CHARS_IMG = "https://cdn.poehali.dev/projects/2703d86c-3d15-497f-ad26-7263d50783e7/files/4738b734-8046-49f2-b7b7-aaaa442868b2.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/2703d86c-3d15-497f-ad26-7263d50783e7/files/40fdbaf0-a3ac-4fe2-9bc6-35b745e14ffb.jpg";

const NAV_ITEMS = [
  { label: "СТАТЬИ", icon: "Newspaper" },
  { label: "ПЕРСОНАЖИ", icon: "Swords" },
  { label: "ГАЛЕРЕЯ", icon: "Image" },
  { label: "КОСПЛЕЙ", icon: "Star" },
];

const ARTICLES = [
  {
    id: 1,
    tag: "ОБЗОР",
    tagColor: "var(--neon-cyan)",
    title: "Топ-10 косплеев аниме 2024",
    desc: "Самые впечатляющие образы, которые покорили фестивали этого года — от One Piece до Demon Slayer.",
    xp: 1240,
    lvl: 7,
    reads: "12.4K",
    time: "8 мин",
    cornerClass: "",
  },
  {
    id: 2,
    tag: "ГАЙД",
    tagColor: "var(--neon-yellow)",
    title: "Как сделать доспехи из Elden Ring",
    desc: "Пошаговый мастер-класс по созданию костюма Tarnished из EVA-пены и термопластика.",
    xp: 2100,
    lvl: 12,
    reads: "8.7K",
    time: "15 мин",
    cornerClass: "pixel-corner-yellow",
  },
  {
    id: 3,
    tag: "НОВОСТЬ",
    tagColor: "var(--neon-pink)",
    title: "Genshin Impact: новые персонажи сезона",
    desc: "Разбор лора и косплей-потенциала персонажей 4.5 патча — гайд по образам для фанатов.",
    xp: 880,
    lvl: 5,
    reads: "19.1K",
    time: "5 мин",
    cornerClass: "pixel-corner-pink",
  },
];

const CHARACTERS = [
  { name: "Naruto Uzumaki", series: "Naruto Shippuden", diff: "★★★☆☆", type: "СЁНЭН", match: 94, hp: 88 },
  { name: "Jinx", series: "Arcane / LoL", diff: "★★★★☆", type: "ИГРА", match: 87, hp: 72 },
  { name: "Makima", series: "Chainsaw Man", diff: "★★☆☆☆", type: "СЭЙНЭН", match: 91, hp: 95 },
  { name: "Geralt", series: "Ведьмак", diff: "★★★★★", type: "ИГРА", match: 78, hp: 60 },
];

const GALLERY_ITEMS = [
  { title: "Cosplay Expo 2024", author: "@sakura_chan", likes: "2.4K", category: "АРТ" },
  { title: "Jinx from Arcane", author: "@neon_crafter", likes: "5.1K", category: "КОСПЛЕЙ" },
  { title: "Dragon Ball Fan Art", author: "@pixel_hero", likes: "3.8K", category: "АРТ" },
];

const RECOMMENDED = [
  { title: "Лучшие персонажи для начинающих", tag: "ПЕРСОНАЖИ", match: 96 },
  { title: "Материалы для создания костюмов", tag: "ГАЙД", match: 88 },
  { title: "Конвенции 2024: расписание", tag: "СОБЫТИЯ", match: 82 },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("СТАТЬИ");
  const [searchVal, setSearchVal] = useState("");
  const [likedCards, setLikedCards] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedCards((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--dark-bg)", color: "#F0F0F0" }}>

      {/* TOP STATUS BAR */}
      <div className="diagonal-strip border-b" style={{ borderColor: "rgba(0,255,237,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          <span className="font-mono-game text-xs" style={{ color: "var(--neon-cyan)" }}>
            ▶ SYSTEM ONLINE &nbsp;|&nbsp; BUILD 2024.12
          </span>
          <div className="flex items-center gap-4">
            <span className="font-mono-game text-xs" style={{ color: "var(--neon-yellow)" }}>
              ⚡ XP: 4,820
            </span>
            <span className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              PLAYER_01<span className="blink">█</span>
            </span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b sticky top-0 z-50" style={{ borderColor: "rgba(0,255,237,0.15)", background: "rgba(10,12,20,0.97)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-10 h-10 flex items-center justify-center border-2 font-mono-game text-lg font-bold pulse-neon"
              style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", background: "rgba(0,255,237,0.07)" }}
            >
              GP
            </div>
            <div>
              <div className="flicker" style={{ fontFamily: "'Russo One', sans-serif", fontSize: 20, letterSpacing: 4, color: "var(--neon-cyan)", lineHeight: 1, textShadow: "0 0 10px var(--neon-cyan), 0 0 30px var(--neon-cyan)" }}>
                GEEK PULSE
              </div>
              <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "3px" }}>
                ЖУРНАЛ О ГИК-КУЛЬТУРЕ
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className="flex items-center gap-2 px-4 py-2 font-mono-game text-xs tracking-widest transition-all duration-200"
                style={{
                  color: activeNav === item.label ? "var(--dark-bg)" : "rgba(255,255,255,0.5)",
                  background: activeNav === item.label ? "var(--neon-cyan)" : "transparent",
                  border: `1px solid ${activeNav === item.label ? "var(--neon-cyan)" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: activeNav === item.label ? "0 0 15px rgba(0,255,237,0.4)" : "none",
                }}
              >
                <Icon name={item.icon} size={12} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 border px-3 py-2" style={{ borderColor: "rgba(0,255,237,0.3)", background: "rgba(0,255,237,0.04)" }}>
            <Icon name="Search" size={14} style={{ color: "var(--neon-cyan)" }} />
            <input
              type="text"
              placeholder="ПОИСК..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-transparent font-mono-game text-xs outline-none w-32"
              style={{ color: "var(--neon-cyan)", caretColor: "var(--neon-cyan)" }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">

        {/* HERO */}
        <section className="animate-slide-up">
          <div className="relative overflow-hidden border-2" style={{ borderColor: "var(--neon-cyan)" }}>
            <div className="absolute inset-0">
              <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,12,20,0.95) 0%, rgba(10,12,20,0.5) 60%, transparent 100%)" }} />
            </div>
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4" style={{ borderColor: "var(--neon-cyan)" }} />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4" style={{ borderColor: "var(--neon-pink)" }} />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4" style={{ borderColor: "var(--neon-pink)" }} />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4" style={{ borderColor: "var(--neon-cyan)" }} />

            <div className="relative z-10 p-10 md:p-16 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag-badge border-neon-yellow neon-yellow">HOT ISSUE #47</span>
                <span className="tag-badge border-neon-pink neon-pink">ЭКСКЛЮЗИВ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 flicker" style={{ fontFamily: "'Russo One', sans-serif", lineHeight: 1.1 }}>
                <span style={{ color: "var(--neon-cyan)", textShadow: "0 0 10px var(--neon-cyan), 0 0 30px var(--neon-cyan)" }}>КОСПЛЕЙ</span><br />
                <span style={{ color: "#F0F0F0" }}>НОВОГО ПОКОЛЕНИЯ</span>
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.7 }}>
                Погружайся в мир гик-культуры: каталоги персонажей, мастер-классы по косплею, аниме-арт и умные рекомендации — всё в одном месте.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="flex items-center gap-2 px-6 py-3 font-mono-game text-sm tracking-widest font-bold transition-all duration-200 hover:scale-105"
                  style={{ background: "var(--neon-cyan)", color: "var(--dark-bg)", boxShadow: "0 0 25px rgba(0,255,237,0.5)" }}
                >
                  <Icon name="Play" size={14} />
                  НАЧАТЬ ЧИТАТЬ
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 font-mono-game text-sm tracking-widest border transition-all duration-200 hover:scale-105"
                  style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", background: "rgba(255,45,155,0.07)" }}
                >
                  <Icon name="Swords" size={14} />
                  КАТАЛОГ
                </button>
              </div>
              <div className="flex gap-6 mt-8">
                {[{ val: "2.4K", label: "ПЕРСОНАЖЕЙ" }, { val: "18K", label: "КОСПЛЕЕРОВ" }, { val: "340+", label: "СТАТЕЙ" }].map((s) => (
                  <div key={s.label}>
                    <div className="font-mono-game text-xl font-bold" style={{ color: "var(--neon-cyan)", textShadow: "0 0 10px var(--neon-cyan)" }}>{s.val}</div>
                    <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "2px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="animate-slide-up-delay-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--neon-cyan), transparent)" }} />
            <h2 className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-cyan)" }}>◈ СВЕЖИЕ СТАТЬИ</h2>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan))" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTICLES.map((art, i) => (
              <div
                key={art.id}
                className={`game-card pixel-corner ${art.cornerClass} border`}
                style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)", animationDelay: `${i * 0.1}s` }}
                onClick={() => toggleLike(art.id)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag-badge" style={{ borderColor: art.tagColor, color: art.tagColor }}>{art.tag}</span>
                    <span className="font-mono-game text-xs" style={{ color: "var(--neon-yellow)" }}>LVL {art.lvl}</span>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: "'Russo One', sans-serif", color: "#F0F0F0" }}>{art.title}</h3>
                  <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{art.desc}</p>
                  <div className="mb-4">
                    <div className="flex justify-between font-mono-game text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <span>XP</span>
                      <span style={{ color: art.tagColor }}>{art.xp.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full xp-bar"
                        style={{
                          width: `${Math.min(100, (art.xp / 2500) * 100)}%`,
                          background: `linear-gradient(90deg, ${art.tagColor}, ${art.tagColor}aa)`,
                          boxShadow: `0 0 8px ${art.tagColor}88`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <span className="flex items-center gap-1"><Icon name="Eye" size={10} /> {art.reads}</span>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={10} /> {art.time}</span>
                    </div>
                    <button
                      className="flex items-center gap-1 font-mono-game text-xs transition-all"
                      style={{ color: likedCards.includes(art.id) ? "var(--neon-pink)" : "rgba(255,255,255,0.3)" }}
                    >
                      <Icon name="Heart" size={12} />
                      {likedCards.includes(art.id) ? "ЛАЙК!" : "ЛАЙК"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHARACTERS */}
        <section className="animate-slide-up-delay-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--neon-pink), transparent)" }} />
            <h2 className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-pink)" }}>⚔ КАТАЛОГ ПЕРСОНАЖЕЙ</h2>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--neon-pink))" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden border" style={{ borderColor: "rgba(255,45,155,0.3)", background: "var(--card-bg)", minHeight: 320 }}>
              <img src={CHARS_IMG} alt="Characters" className="w-full h-full object-cover opacity-70" style={{ minHeight: 320 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,12,20,0.95) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="tag-badge border-neon-pink neon-pink">FEATURED</span>
                <h3 className="text-xl font-bold mt-2" style={{ fontFamily: "'Russo One', sans-serif" }}>База персонажей</h3>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>2,400+ персонажей с рейтингом сложности</p>
              </div>
            </div>

            <div className="space-y-3">
              {CHARACTERS.map((char) => (
                <div
                  key={char.name}
                  className="game-card border px-4 py-3"
                  style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-bold text-sm" style={{ fontFamily: "'Russo One', sans-serif", color: "#F0F0F0" }}>{char.name}</div>
                      <div className="font-mono-game text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{char.series}</div>
                    </div>
                    <div className="text-right">
                      <span className="tag-badge" style={{ borderColor: "rgba(191,95,255,0.5)", color: "var(--neon-purple)" }}>{char.type}</span>
                      <div className="font-mono-game text-xs mt-1" style={{ color: "var(--neon-yellow)" }}>МАТЧ {char.match}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)", minWidth: 20 }}>HP</span>
                    <div className="flex-1 h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${char.hp}%`,
                          background: char.hp > 80
                            ? "linear-gradient(90deg, #00FFED, #00FFAAaa)"
                            : char.hp > 60
                            ? "linear-gradient(90deg, #FFD700, #FFA500aa)"
                            : "linear-gradient(90deg, #FF2D9B, #FF0000aa)",
                          boxShadow: `0 0 6px ${char.hp > 80 ? "#00FFED" : char.hp > 60 ? "#FFD700" : "#FF2D9B"}66`,
                        }}
                      />
                    </div>
                    <span className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{char.diff}</span>
                  </div>
                </div>
              ))}
              <button
                className="w-full py-3 border font-mono-game text-xs tracking-widest transition-all hover:scale-[1.01]"
                style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", background: "rgba(255,45,155,0.05)" }}
              >
                ▶ СМОТРЕТЬ ВСЕ ПЕРСОНАЖИ (2,400+)
              </button>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="animate-slide-up-delay-3">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--neon-yellow), transparent)" }} />
            <h2 className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-yellow)" }}>✦ ГАЛЕРЕЯ КОСПЛЕЕВ И АРТ</h2>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--neon-yellow))" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative overflow-hidden border game-card" style={{ borderColor: "rgba(255,215,0,0.3)", minHeight: 300 }}>
              <img src={GALLERY_IMG} alt="Gallery" className="w-full h-full object-cover opacity-60" style={{ minHeight: 300 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,12,20,0.9) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="tag-badge border-neon-yellow neon-yellow">FEATURED</span>
                <h3 className="text-lg font-bold mt-2" style={{ fontFamily: "'Russo One', sans-serif" }}>Лучшие работы недели</h3>
                <div className="flex items-center gap-3 mt-1 font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span className="flex items-center gap-1"><Icon name="Heart" size={10} /> 6.7K</span>
                  <span>@ghibli_fan</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {GALLERY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="game-card border px-4 py-3 flex items-center justify-between"
                  style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}
                >
                  <div>
                    <div className="text-sm font-bold" style={{ fontFamily: "'Russo One', sans-serif", color: "#F0F0F0" }}>{item.title}</div>
                    <div className="font-mono-game text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.author}</div>
                  </div>
                  <div className="text-right">
                    <span className="tag-badge" style={{ borderColor: "rgba(255,215,0,0.4)", color: "var(--neon-yellow)" }}>{item.category}</span>
                    <div className="font-mono-game text-xs mt-1 flex items-center justify-end gap-1" style={{ color: "var(--neon-pink)" }}>
                      <Icon name="Heart" size={9} /> {item.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECOMMENDATIONS */}
        <section className="animate-slide-up-delay-4">
          <div className="border-2 p-6 relative" style={{ borderColor: "rgba(191,95,255,0.4)", background: "rgba(191,95,255,0.05)" }}>
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: "var(--neon-purple)" }} />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: "var(--neon-purple)" }} />

            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: "var(--neon-purple)", color: "var(--neon-purple)" }}>
                <Icon name="Sparkles" size={16} />
              </div>
              <div>
                <h2 className="font-mono-game text-sm tracking-widest" style={{ color: "var(--neon-purple)" }}>СИСТЕМА РЕКОМЕНДАЦИЙ</h2>
                <p className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>ИИ анализирует твои интересы и подбирает контент</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RECOMMENDED.map((rec, i) => (
                <div key={i} className="game-card border p-4" style={{ borderColor: "rgba(191,95,255,0.25)", background: "rgba(191,95,255,0.07)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag-badge" style={{ borderColor: "rgba(191,95,255,0.5)", color: "var(--neon-purple)" }}>{rec.tag}</span>
                    <span className="font-mono-game text-xs" style={{ color: "var(--neon-yellow)" }}>{rec.match}% MATCH</span>
                  </div>
                  <div className="text-sm font-bold mb-3" style={{ fontFamily: "'Russo One', sans-serif", color: "#F0F0F0" }}>{rec.title}</div>
                  <div className="h-1" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${rec.match}%`,
                        background: "linear-gradient(90deg, var(--neon-purple), #ff2d9b)",
                        boxShadow: "0 0 8px rgba(191,95,255,0.6)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="animate-slide-up-delay-5 text-center pb-8">
          <div className="halftone-bg border p-10" style={{ borderColor: "rgba(0,255,237,0.15)" }}>
            <div className="font-mono-game text-xs tracking-widest mb-3" style={{ color: "var(--neon-cyan)" }}>◈ ПРИСОЕДИНЯЙСЯ К СООБЩЕСТВУ</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Russo One', sans-serif" }}>
              <span style={{ color: "var(--neon-pink)", textShadow: "0 0 10px var(--neon-pink), 0 0 30px var(--neon-pink)" }}>18,000+</span>{" "}
              <span style={{ color: "#F0F0F0" }}>ГИКОВ</span>
            </h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", maxWidth: 400, margin: "0 auto 1.5rem" }}>
              Создавай косплей, делись артом, открывай новых персонажей и находи единомышленников
            </p>
            <button
              className="px-8 py-4 font-mono-game text-sm tracking-widest font-bold transition-all hover:scale-105 pulse-neon"
              style={{ background: "var(--neon-cyan)", color: "var(--dark-bg)", boxShadow: "0 0 30px rgba(0,255,237,0.4)" }}
            >
              ▶ НАЧАТЬ БЕСПЛАТНО — НАЖМИ ЗДЕСЬ
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t py-6" style={{ borderColor: "rgba(0,255,237,0.1)", background: "rgba(0,0,0,0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2024 GEEK PULSE — ЖУРНАЛ О ГИК-КУЛЬТУРЕ</div>
          <div className="flex gap-4">
            {["О НАС", "КОНТАКТЫ", "РЕКЛАМА", "RSS"].map((link) => (
              <button key={link} className="font-mono-game text-xs hover:underline" style={{ color: "rgba(255,255,255,0.3)" }}>{link}</button>
            ))}
          </div>
          <div className="font-mono-game text-xs" style={{ color: "rgba(0,255,237,0.3)" }}>POWERED BY GEEK_ENGINE v2.4</div>
        </div>
      </footer>
    </div>
  );
}