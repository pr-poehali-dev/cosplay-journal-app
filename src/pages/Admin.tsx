import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const GALLERY_URL = "https://functions.poehali.dev/7e10b8f2-78bb-4202-adbb-ca163ed4eb9e";

interface Photo {
  id: number;
  title: string;
  author: string;
  character_name: string;
  category: string;
  image_url: string;
  likes: number;
  created_at: string;
}

const CATEGORIES = ["КОСПЛЕЙ", "АРТ", "ФОТО", "СОБЫТИЕ"];

export default function Admin() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    character_name: "",
    category: "КОСПЛЕЙ",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadPhotos = async (pwd: string) => {
    setLoading(true);
    const res = await fetch(GALLERY_URL, {
      headers: { "X-Admin-Token": pwd },
    });
    const data = await res.json();
    setPhotos(data.photos || []);
    setLoading(false);
  };

  const handleLogin = async () => {
    setAuthError(false);
    try {
      const res = await fetch(GALLERY_URL, {
        headers: { "X-Admin-Token": password },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.photos)) {
          setAuthed(true);
          setPhotos(data.photos);
        } else {
          setAuthError(true);
        }
      } else {
        setAuthError(true);
      }
    } catch {
      setAuthError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!imageFile || !form.title || !form.author) {
      setUploadMsg({ type: "err", text: "Заполни название, автора и выбери фото" });
      return;
    }
    setUploading(true);
    setUploadMsg(null);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

        const res = await fetch(GALLERY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Token": password,
          },
          body: JSON.stringify({
            ...form,
            image_b64: base64,
            image_ext: ext,
          }),
        });

        if (res.ok) {
          setUploadMsg({ type: "ok", text: "Фото успешно загружено!" });
          setForm({ title: "", author: "", character_name: "", category: "КОСПЛЕЙ" });
          setImageFile(null);
          setImagePreview(null);
          if (fileRef.current) fileRef.current.value = "";
          await loadPhotos(password);
        } else {
          const err = await res.json();
          setUploadMsg({ type: "err", text: err.error || "Ошибка загрузки" });
        }
        setUploading(false);
      };
    } catch {
      setUploadMsg({ type: "err", text: "Ошибка соединения" });
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить фото?")) return;
    setDeletingId(id);
    await fetch(`${GALLERY_URL}?id=${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Token": password },
    });
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center" style={{ background: "var(--dark-bg)" }}>
        <div className="w-full max-w-sm">
          <div className="border-2 p-8 relative" style={{ borderColor: "var(--neon-cyan)", background: "var(--card-bg)" }}>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: "var(--neon-cyan)" }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: "var(--neon-cyan)" }} />

            <div className="text-center mb-8">
              <div className="w-14 h-14 border-2 flex items-center justify-center mx-auto mb-4 pulse-neon" style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}>
                <Icon name="Shield" size={24} />
              </div>
              <div className="font-mono-game text-xs tracking-widest mb-1" style={{ color: "var(--neon-cyan)" }}>
                ADMIN ACCESS
              </div>
              <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 20, color: "#F0F0F0" }}>
                GEEK PULSE
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-mono-game text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>ПАРОЛЬ</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 font-mono-game text-sm outline-none border"
                  style={{
                    background: "rgba(0,255,237,0.04)",
                    borderColor: authError ? "var(--neon-pink)" : "rgba(0,255,237,0.3)",
                    color: "var(--neon-cyan)",
                    caretColor: "var(--neon-cyan)",
                  }}
                />
                {authError && (
                  <div className="font-mono-game text-xs mt-2" style={{ color: "var(--neon-pink)" }}>
                    ✗ НЕВЕРНЫЙ ПАРОЛЬ
                  </div>
                )}
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-3 font-mono-game text-sm tracking-widest font-bold transition-all hover:scale-105"
                style={{ background: "var(--neon-cyan)", color: "var(--dark-bg)", boxShadow: "0 0 20px rgba(0,255,237,0.3)" }}
              >
                ВОЙТИ
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-2 font-mono-game text-xs tracking-widest border transition-all"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}
              >
                ← ВЕРНУТЬСЯ НА САЙТ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN PANEL
  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--dark-bg)", color: "#F0F0F0" }}>

      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ borderColor: "rgba(0,255,237,0.15)", background: "rgba(10,12,20,0.97)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}>
              <Icon name="Shield" size={14} />
            </div>
            <div>
              <div className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-cyan)" }}>ADMIN PANEL</div>
              <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 16, color: "#F0F0F0" }}>GEEK PULSE</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              ФОТО В БД: <span style={{ color: "var(--neon-yellow)" }}>{photos.length}</span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-3 py-2 border font-mono-game text-xs transition-all hover:scale-105"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}
            >
              <Icon name="ExternalLink" size={11} />
              НА САЙТ
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(""); }}
              className="flex items-center gap-2 px-3 py-2 border font-mono-game text-xs transition-all hover:scale-105"
              style={{ borderColor: "rgba(255,45,155,0.3)", color: "var(--neon-pink)" }}
            >
              <Icon name="LogOut" size={11} />
              ВЫЙТИ
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* UPLOAD FORM */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--neon-cyan), transparent)" }} />
            <h2 className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-cyan)" }}>◈ ДОБАВИТЬ ФОТО</h2>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan))" }} />
          </div>

          <div className="border p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ borderColor: "rgba(0,255,237,0.2)", background: "var(--card-bg)" }}>

            {/* Image upload */}
            <div>
              <div
                className="border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:border-opacity-80 relative overflow-hidden"
                style={{
                  borderColor: imagePreview ? "var(--neon-cyan)" : "rgba(255,255,255,0.15)",
                  minHeight: 260,
                  background: imagePreview ? "transparent" : "rgba(0,255,237,0.02)",
                }}
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover absolute inset-0" style={{ minHeight: 260 }} />
                ) : (
                  <div className="text-center p-6">
                    <div style={{ color: "rgba(0,255,237,0.4)" }} className="mb-3">
                      <Icon name="Upload" size={36} />
                    </div>
                    <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      НАЖМИ ЧТОБЫ ВЫБРАТЬ ФОТО
                    </div>
                    <div className="font-mono-game text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                      JPG, PNG, WEBP
                    </div>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              {imageFile && (
                <div className="font-mono-game text-xs mt-2 flex items-center justify-between" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span>{imageFile.name}</span>
                  <button onClick={() => { setImageFile(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = ""; }} style={{ color: "var(--neon-pink)" }}>✕</button>
                </div>
              )}
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {[
                { key: "title", label: "НАЗВАНИЕ *", placeholder: "Косплей 2B из NieR" },
                { key: "author", label: "АВТОР / КОСПЛЕЕР *", placeholder: "@username" },
                { key: "character_name", label: "ПЕРСОНАЖ", placeholder: "2B (NieR: Automata)" },
              ].map((f) => (
                <div key={f.key}>
                  <div className="font-mono-game text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{f.label}</div>
                  <input
                    type="text"
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 font-mono-game text-sm outline-none border"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "#F0F0F0",
                      caretColor: "var(--neon-cyan)",
                    }}
                  />
                </div>
              ))}

              <div>
                <div className="font-mono-game text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>КАТЕГОРИЯ</div>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setForm((prev) => ({ ...prev, category: cat }))}
                      className="tag-badge transition-all"
                      style={{
                        borderColor: form.category === cat ? "var(--neon-cyan)" : "rgba(255,255,255,0.15)",
                        color: form.category === cat ? "var(--neon-cyan)" : "rgba(255,255,255,0.4)",
                        background: form.category === cat ? "rgba(0,255,237,0.08)" : "transparent",
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {uploadMsg && (
                <div
                  className="font-mono-game text-xs px-3 py-2 border"
                  style={{
                    borderColor: uploadMsg.type === "ok" ? "var(--neon-cyan)" : "var(--neon-pink)",
                    color: uploadMsg.type === "ok" ? "var(--neon-cyan)" : "var(--neon-pink)",
                    background: uploadMsg.type === "ok" ? "rgba(0,255,237,0.06)" : "rgba(255,45,155,0.06)",
                  }}
                >
                  {uploadMsg.type === "ok" ? "✓ " : "✗ "}{uploadMsg.text}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-3 font-mono-game text-sm tracking-widest font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "var(--neon-cyan)", color: "var(--dark-bg)", boxShadow: "0 0 20px rgba(0,255,237,0.25)" }}
              >
                {uploading ? "⏳ ЗАГРУЖАЮ..." : "▶ ЗАГРУЗИТЬ ФОТО"}
              </button>
            </div>
          </div>
        </section>

        {/* PHOTOS LIST */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--neon-pink), transparent)" }} />
            <h2 className="font-mono-game text-xs tracking-widest" style={{ color: "var(--neon-pink)" }}>
              ⚔ ЗАГРУЖЕННЫЕ ФОТО ({photos.length})
            </h2>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--neon-pink))" }} />
          </div>

          {loading ? (
            <div className="text-center py-12 font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              ЗАГРУЗКА...<span className="blink">█</span>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12 border" style={{ borderColor: "rgba(255,255,255,0.06)", background: "var(--card-bg)" }}>
              <div style={{ color: "rgba(255,255,255,0.15)" }} className="mb-3"><Icon name="Image" size={40} /></div>
              <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>ФОТОГРАФИЙ ЕЩЁ НЕТ</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="border relative overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--card-bg)" }}>
                  <div className="relative" style={{ height: 200 }}>
                    <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,12,20,0.8) 0%, transparent 50%)" }} />
                    <span
                      className="absolute top-2 right-2 tag-badge"
                      style={{ borderColor: "rgba(0,255,237,0.5)", color: "var(--neon-cyan)", background: "rgba(10,12,20,0.8)" }}
                    >
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-sm mb-0.5" style={{ fontFamily: "'Russo One', sans-serif", color: "#F0F0F0" }}>
                      {photo.title}
                    </div>
                    <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{photo.author}</div>
                    {photo.character_name && (
                      <div className="font-mono-game text-xs mt-0.5" style={{ color: "var(--neon-purple)" }}>{photo.character_name}</div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="font-mono-game text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        {new Date(photo.created_at).toLocaleDateString("ru-RU")}
                      </div>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        disabled={deletingId === photo.id}
                        className="flex items-center gap-1 px-2 py-1 font-mono-game text-xs border transition-all hover:scale-105 disabled:opacity-50"
                        style={{ borderColor: "rgba(255,45,155,0.3)", color: "var(--neon-pink)" }}
                      >
                        <Icon name="Trash2" size={10} />
                        {deletingId === photo.id ? "..." : "УДАЛИТЬ"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
