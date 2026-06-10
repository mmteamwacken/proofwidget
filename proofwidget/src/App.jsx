import { useState, useEffect } from "react";

const AMBER = "#F59E0B";
const SLATE_DARK = "#0F172A";
const SLATE_MID = "#1E293B";
const SLATE_CARD = "#1A2540";
const SLATE_BORDER = "#2D3F5E";
const TEXT_MAIN = "#F1F5F9";
const TEXT_MUTED = "#94A3B8";
const GREEN = "#10B981";
const RED = "#EF4444";

const STEPS = ["collect", "preview", "embed", "dashboard"];
const STEP_LABELS = ["1. Bewertung sammeln", "2. Widget-Vorschau", "3. Einbetten", "4. Dashboard"];

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: "Sandra K.",
    role: "Unternehmensberaterin",
    text: "Innerhalb von 3 Wochen hatte ich 12 neue Kundenanfragen. Der KI-Chatbot läuft rund um die Uhr und qualifiziert Leads, bevor ich überhaupt ans Telefon gehe.",
    rating: 5,
    avatar: "S",
    color: "#8B5CF6",
  },
  {
    id: 2,
    name: "Thomas M.",
    role: "Elektrobetrieb, 8 MA",
    text: "Kein verschwendeter Tag mehr für Angebote, die eh nichts werden. Das System filtert raus, wer wirklich kaufen will.",
    rating: 5,
    avatar: "T",
    color: "#0EA5E9",
  },
  {
    id: 3,
    name: "Maja R.",
    role: "Business Coach",
    text: "Meine Buchungsrate ist um 40% gestiegen. Ich hätte das früher haben sollen.",
    rating: 5,
    avatar: "M",
    color: "#F59E0B",
  },
];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          style={{
            cursor: onChange ? "pointer" : "default",
            fontSize: 24,
            color: s <= (hover || value) ? AMBER : SLATE_BORDER,
            transition: "color 0.15s",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ letter, color, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.4,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  );
}

function TestimonialCard({ t, compact }) {
  return (
    <div
      style={{
        background: SLATE_CARD,
        border: `1px solid ${SLATE_BORDER}`,
        borderRadius: 12,
        padding: compact ? "14px 16px" : "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <StarRating value={t.rating} />
      <p style={{ color: TEXT_MAIN, fontSize: compact ? 13 : 15, margin: 0, lineHeight: 1.6 }}>
        „{t.text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
        <Avatar letter={t.avatar} color={t.color} size={compact ? 32 : 38} />
        <div>
          <div style={{ color: TEXT_MAIN, fontWeight: 600, fontSize: compact ? 12 : 14 }}>{t.name}</div>
          <div style={{ color: TEXT_MUTED, fontSize: compact ? 11 : 12 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function StepCollect({ onSubmit }) {
  const [form, setForm] = useState({ name: "", role: "", email: "", text: "", rating: 0, consent: false });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name && form.text.length > 10 && form.rating > 0 && form.consent;

  const handleSubmit = () => {
    if (!valid) return;
    setSent(true);
    onSubmit(form);
  };

  if (sent)
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ color: GREEN, margin: "0 0 8px" }}>Bewertung eingegangen</h3>
        <p style={{ color: TEXT_MUTED, fontSize: 14 }}>
          Eine Bestätigungs-E-Mail geht an dich raus. Deine Bewertung wird erst nach Freigabe veröffentlicht.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ name: "", role: "", email: "", text: "", rating: 0, consent: false }); }}
          style={btnStyle("ghost")}
        >
          Nochmal testen
        </button>
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ color: TEXT_MUTED, margin: "0 0 20px", fontSize: 14 }}>
          So sieht dein Kunde das Formular — direkt auf deiner Website oder als Link.
        </p>
        <div
          style={{
            background: SLATE_MID,
            border: `1px solid ${SLATE_BORDER}`,
            borderRadius: 12,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h3 style={{ color: TEXT_MAIN, margin: 0, fontSize: 18 }}>
            Wie war deine Erfahrung?
          </h3>

          <div>
            <label style={labelStyle}>Deine Bewertung *</label>
            <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
          </div>

          <div>
            <label style={labelStyle}>Dein Name *</label>
            <input
              value={form.name}
              onChange={set("name")}
              placeholder="Anna Müller"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Position / Unternehmen</label>
            <input
              value={form.role}
              onChange={set("role")}
              placeholder="Coach, Freelancer, ..."
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>E-Mail-Adresse * <span style={{ color: TEXT_MUTED, fontWeight: 400 }}>(für Widerrufsrecht, nicht veröffentlicht)</span></label>
            <input
              value={form.email}
              onChange={set("email")}
              placeholder="anna@beispiel.de"
              type="email"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Dein Feedback *</label>
            <textarea
              value={form.text}
              onChange={set("text")}
              placeholder="Was hat dir besonders geholfen?"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* DSGVO Einwilligung */}
          <div style={{
            background: "#0B1525",
            border: `1px solid ${SLATE_BORDER}`,
            borderRadius: 8,
            padding: "14px",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                onClick={() => setForm(f => ({ ...f, consent: !f.consent }))}
                style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                  border: `2px solid ${form.consent ? AMBER : SLATE_BORDER}`,
                  background: form.consent ? AMBER : "transparent",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {form.consent && <span style={{ color: SLATE_DARK, fontSize: 12, fontWeight: 900 }}>✓</span>}
              </div>
              <p style={{ color: TEXT_MUTED, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                Ich stimme zu, dass mein Name, meine Funktion und mein Feedback gespeichert und auf der Website von{" "}
                <span style={{ color: TEXT_MAIN }}>[Unternehmensname]</span> veröffentlicht werden darf.
                Diese Einwilligung kann ich jederzeit per E-Mail widerrufen (Art. 7 Abs. 3 DSGVO).{" "}
                <span style={{ color: AMBER, cursor: "pointer" }}>Datenschutzerklärung →</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!valid}
            style={btnStyle("primary", !valid)}
          >
            Bewertung abschicken
          </button>

          <p style={{ color: TEXT_MUTED, fontSize: 11, margin: 0, textAlign: "center" }}>
            Deine Bewertung wird erst nach manueller Freigabe veröffentlicht. E-Mail-Adresse wird nicht angezeigt.
          </p>
        </div>

        {/* DSGVO Hinweis für den App-Nutzer (Betreiber) */}
        <div style={{
          marginTop: 16,
          padding: "12px 14px",
          background: "#0F1F0F",
          border: `1px solid #1A4020`,
          borderRadius: 8,
          borderLeft: `3px solid ${GREEN}`,
        }}>
          <div style={{ color: GREEN, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
            DSGVO-CHECKLISTE FÜR BETREIBER
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              "✓ Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO dokumentiert",
              "✓ Widerrufsrecht (Art. 7 Abs. 3) kommuniziert",
              "✓ E-Mail für Löschanfragen hinterlegt (Art. 17 DSGVO)",
              "✓ Keine Veröffentlichung ohne manuelle Freigabe",
              "✓ Datenschutzerklärung verlinkt",
              "⚠ AVV mit ProofWidget als Auftragsverarbeiter abschließen (Art. 28)",
            ].map((item, i) => (
              <div key={i} style={{ color: i === 5 ? AMBER : TEXT_MUTED, fontSize: 12 }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PRESETS = [
  { name: "Minimal Dark", bg: "#0F172A", card: "#1E293B", accent: "#F59E0B", text: "#F1F5F9", muted: "#94A3B8", radius: 12, font: "Inter" },
  { name: "Clean White", bg: "#FFFFFF", card: "#F8FAFC", accent: "#6366F1", text: "#0F172A", muted: "#64748B", radius: 16, font: "Inter" },
  { name: "Warm Brand", bg: "#FFF8F0", card: "#FFFFFF", accent: "#EA580C", text: "#1C0A00", muted: "#78716C", radius: 8, font: "Georgia" },
  { name: "SaaS Blue", bg: "#EFF6FF", card: "#FFFFFF", accent: "#2563EB", text: "#1E3A5F", muted: "#64748B", radius: 12, font: "Inter" },
  { name: "Bold Dark", bg: "#09090B", card: "#18181B", accent: "#22D3EE", text: "#FAFAFA", muted: "#71717A", radius: 4, font: "monospace" },
];

function LiveWidget({ design, testimonials, layout }) {
  const all = [...MOCK_TESTIMONIALS, ...testimonials];
  const shown = layout === "single" ? [all[0]] : layout === "list" ? all.slice(0, 3) : all.slice(0, 4);

  const card = (t, i) => (
    <div key={i} style={{
      background: design.card,
      borderRadius: design.radius,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: design.bg === "#FFFFFF" || design.bg === "#FFF8F0" || design.bg === "#EFF6FF"
        ? "0 1px 6px rgba(0,0,0,0.08)"
        : "none",
      border: design.bg === design.card ? `1px solid ${design.muted}22` : "none",
    }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1,2,3,4,5].map(s => (
          <span key={s} style={{ color: s <= t.rating ? design.accent : design.muted + "44", fontSize: 16 }}>★</span>
        ))}
      </div>
      <p style={{ color: design.text, fontSize: 13, margin: 0, lineHeight: 1.65, fontFamily: design.font }}>
        „{t.text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: design.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 13, color: design.bg, flexShrink: 0
        }}>
          {t.avatar || t.name[0]}
        </div>
        <div>
          <div style={{ color: design.text, fontWeight: 600, fontSize: 13, fontFamily: design.font }}>{t.name}</div>
          {t.role && <div style={{ color: design.muted, fontSize: 11, fontFamily: design.font }}>{t.role}</div>}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: design.bg, borderRadius: design.radius, padding: "20px", transition: "all 0.2s" }}>
      {layout === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {shown.map(card)}
        </div>
      )}
      {layout === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {shown.map(card)}
        </div>
      )}
      {layout === "single" && (
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          {shown.map(card)}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <span style={{ color: design.muted, fontSize: 10 }}>powered by </span>
        <span style={{ color: design.accent, fontSize: 10, fontWeight: 700 }}>ProofWidget</span>
      </div>
    </div>
  );
}

function ColorSwatch({ value, onChange, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: value,
          border: `2px solid ${SLATE_BORDER}`, cursor: "pointer", overflow: "hidden"
        }}>
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer", width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <span style={{ color: TEXT_MUTED, fontSize: 10 }}>{label}</span>
    </div>
  );
}

function StepPreview({ testimonials }) {
  const [preset, setPreset] = useState(0);
  const [design, setDesign] = useState(PRESETS[0]);
  const [layout, setLayout] = useState("grid");

  const applyPreset = (i) => {
    setPreset(i);
    setDesign(PRESETS[i]);
  };

  const set = (k) => (v) => setDesign(d => ({ ...d, [k]: v }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: TEXT_MUTED, margin: 0, fontSize: 14 }}>
        Dein Kunde stellt hier sein Widget ein — passend zu seiner Website. Kein Code, keine Agentur nötig.
      </p>

      {/* Preset-Schnellwahl */}
      <div>
        <div style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 8, letterSpacing: 1 }}>SCHNELLSTART</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(i)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                border: `1px solid ${preset === i ? AMBER : SLATE_BORDER}`,
                background: preset === i ? AMBER + "22" : "transparent",
                color: preset === i ? AMBER : TEXT_MUTED,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.accent, display: "inline-block" }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: SLATE_MID,
        border: `1px solid ${SLATE_BORDER}`,
        borderRadius: 12,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}>
        {/* Farben */}
        <div>
          <div style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 10, letterSpacing: 1 }}>FARBEN</div>
          <div style={{ display: "flex", gap: 16 }}>
            <ColorSwatch value={design.bg} onChange={set("bg")} label="Hintergrund" />
            <ColorSwatch value={design.card} onChange={set("card")} label="Karte" />
            <ColorSwatch value={design.accent} onChange={set("accent")} label="Akzent" />
            <ColorSwatch value={design.text} onChange={set("text")} label="Text" />
            <ColorSwatch value={design.muted} onChange={set("muted")} label="Sekundär" />
          </div>
        </div>

        {/* Layout + Radius + Font */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>LAYOUT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[["grid","Raster"],["list","Liste"],["single","Einzeln"]].map(([v,l]) => (
                <button key={v} onClick={() => setLayout(v)} style={{
                  padding: "6px 10px", borderRadius: 6, border: `1px solid ${layout===v ? AMBER : SLATE_BORDER}`,
                  background: layout===v ? AMBER+"22" : "transparent", color: layout===v ? AMBER : TEXT_MUTED,
                  fontSize: 12, cursor: "pointer", textAlign: "left", fontFamily: "inherit"
                }}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>ECKEN</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[[0,"Eckig"],[8,"Mittel"],[16,"Rund"]].map(([v,l]) => (
                <button key={v} onClick={() => set("radius")(v)} style={{
                  padding: "6px 10px", borderRadius: 6, border: `1px solid ${design.radius===v ? AMBER : SLATE_BORDER}`,
                  background: design.radius===v ? AMBER+"22" : "transparent", color: design.radius===v ? AMBER : TEXT_MUTED,
                  fontSize: 12, cursor: "pointer", textAlign: "left", fontFamily: "inherit"
                }}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>SCHRIFT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[["Inter","Sans-serif"],["Georgia","Serif"],["monospace","Mono"]].map(([v,l]) => (
                <button key={v} onClick={() => set("font")(v)} style={{
                  padding: "6px 10px", borderRadius: 6, border: `1px solid ${design.font===v ? AMBER : SLATE_BORDER}`,
                  background: design.font===v ? AMBER+"22" : "transparent", color: design.font===v ? AMBER : TEXT_MUTED,
                  fontSize: 12, cursor: "pointer", textAlign: "left", fontFamily: v
                }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <div style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 8, letterSpacing: 1 }}>LIVE-VORSCHAU</div>
        <div style={{
          border: `1px solid ${SLATE_BORDER}`,
          borderRadius: 12,
          overflow: "hidden",
        }}>
          {/* Fake Browser Bar */}
          <div style={{
            background: SLATE_MID, padding: "8px 12px",
            display: "flex", alignItems: "center", gap: 6,
            borderBottom: `1px solid ${SLATE_BORDER}`
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: AMBER, display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
            <div style={{
              flex: 1, margin: "0 8px", background: SLATE_DARK,
              borderRadius: 4, padding: "3px 10px", color: TEXT_MUTED, fontSize: 11
            }}>
              www.deine-website.de
            </div>
          </div>

          {/* Fake Page Context */}
          <div style={{ background: design.bg, padding: "24px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: design.text, fontFamily: design.font }}>
                Was unsere Kunden sagen
              </div>
              <div style={{ color: design.muted, fontSize: 13, marginTop: 4, fontFamily: design.font }}>
                Echte Ergebnisse, keine Versprechen.
              </div>
            </div>
            <LiveWidget design={design} testimonials={testimonials} layout={layout} />
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 14px", background: "#0B1A2E", borderRadius: 8, border: `1px solid ${SLATE_BORDER}` }}>
        <span style={{ color: AMBER, fontSize: 12, fontWeight: 600 }}>💡 Wettbewerbsvorteil: </span>
        <span style={{ color: TEXT_MUTED, fontSize: 12 }}>
          Testimonial.to erlaubt kein Custom-Branding im Free/Starter-Plan. Hier ist es Standard — das ist dein USP.
        </span>
      </div>
    </div>
  );
}

function StepEmbed() {
  const [copied, setCopied] = useState(false);
  const [avvChecked, setAvvChecked] = useState(false);
  const snippet = `<script src="https://proofwidget.io/widget.js"
  data-id="dein-account-id"
  data-layout="grid">
</script>`;

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: TEXT_MUTED, margin: 0, fontSize: 14 }}>
        Einen Schnipsel Code kopieren, in deine Website einfügen — fertig. Kein technisches Wissen nötig.
      </p>

      {/* AVV-Pflichtblock — vor dem Code */}
      <div style={{
        background: avvChecked ? "#0F1F0F" : "#1A0F00",
        border: `1px solid ${avvChecked ? "#1A4020" : "#4A2000"}`,
        borderLeft: `3px solid ${avvChecked ? GREEN : RED}`,
        borderRadius: 8,
        padding: "14px",
      }}>
        <div style={{ color: avvChecked ? GREEN : RED, fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
          {avvChecked ? "✓ VORAUSSETZUNG ERFÜLLT" : "⚠ PFLICHT VOR LIVEGANG"}
        </div>
        <p style={{ color: TEXT_MAIN, fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>
          ProofWidget verarbeitet personenbezogene Daten (Namen, Bewertungstexte) deiner Kunden auf deinen Servern.
          Das macht ProofWidget zum <strong>Auftragsverarbeiter</strong> nach Art. 28 DSGVO.
          Ein AVV muss vor Aktivierung des Widgets abgeschlossen sein — sonst ist der Betrieb rechtswidrig.
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div
            onClick={() => setAvvChecked(v => !v)}
            style={{
              width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
              border: `2px solid ${avvChecked ? GREEN : RED}`,
              background: avvChecked ? GREEN : "transparent",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            {avvChecked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 900 }}>✓</span>}
          </div>
          <p style={{ color: TEXT_MUTED, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Ich bestätige, dass ich den{" "}
            <span style={{ color: AMBER, cursor: "pointer", textDecoration: "underline" }}>
              Auftragsverarbeitungsvertrag mit ProofWidget
            </span>{" "}
            unterzeichnet habe und eine aktuelle{" "}
            <span style={{ color: AMBER, cursor: "pointer", textDecoration: "underline" }}>
              Datenschutzerklärung
            </span>{" "}
            auf meiner Website vorhanden ist, die das Widget erwähnt.
          </p>
        </div>
      </div>

      {/* Embed-Code — ausgegraut bis AVV bestätigt */}
      <div style={{ opacity: avvChecked ? 1 : 0.4, transition: "opacity 0.2s", pointerEvents: avvChecked ? "all" : "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={{ ...labelStyle, margin: 0 }}>Dein Embed-Code</label>
          <button onClick={copy} style={btnStyle(copied ? "success" : "ghost")}>
            {copied ? "✓ Kopiert" : "Kopieren"}
          </button>
        </div>
        <pre
          style={{
            background: "#060D1A",
            border: `1px solid ${SLATE_BORDER}`,
            borderRadius: 8,
            padding: "16px",
            color: "#7DD3FC",
            fontSize: 13,
            overflow: "auto",
            margin: 0,
            fontFamily: "monospace",
            lineHeight: 1.7,
          }}
        >
          {snippet}
        </pre>
        {!avvChecked && (
          <p style={{ color: RED, fontSize: 12, margin: "6px 0 0", textAlign: "center" }}>
            AVV-Bestätigung oben erforderlich um den Code freizuschalten.
          </p>
        )}
      </div>

      {/* Plattformen */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { platform: "WordPress", icon: "🔷", note: "Plugin verfügbar" },
          { platform: "Wix / Squarespace", icon: "🟦", note: "HTML-Block einfügen" },
          { platform: "Webflow", icon: "🌊", note: "Embed-Element" },
          { platform: "Worldsoft WSW", icon: "⚙️", note: "HTML-Modul" },
        ].map((p) => (
          <div
            key={p.platform}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              background: SLATE_CARD,
              borderRadius: 8,
              border: `1px solid ${SLATE_BORDER}`,
            }}
          >
            <span style={{ fontSize: 18 }}>{p.icon}</span>
            <span style={{ color: TEXT_MAIN, fontSize: 14, flex: 1 }}>{p.platform}</span>
            <span style={{ color: TEXT_MUTED, fontSize: 12 }}>{p.note}</span>
          </div>
        ))}
      </div>

      {/* Datenschutz-Hinweis für Endnutzer */}
      <div style={{
        padding: "12px 14px",
        background: "#0B1525",
        border: `1px solid ${SLATE_BORDER}`,
        borderRadius: 8,
      }}>
        <div style={{ color: TEXT_MUTED, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
          WAS DAS WIDGET LÄDT
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            "✓ Kein Tracking, keine Cookies durch das Widget",
            "✓ Nur Abruf der freigegebenen Bewertungsdaten via API",
            "✓ Keine Weitergabe an Dritte",
            "⚠ IP-Adressen der Widget-Besucher werden serverseitig geloggt — in Datenschutzerklärung aufführen",
          ].map((item, i) => (
            <div key={i} style={{ color: i === 3 ? AMBER : TEXT_MUTED, fontSize: 12 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}


function StepDashboard({ testimonials }) {
  const all = [...MOCK_TESTIMONIALS, ...testimonials];
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { label: "Bewertungen", value: all.length, color: AMBER },
          { label: "Ø Sterne", value: "5.0", color: GREEN },
          { label: "Widget-Views", value: "1.2K", color: "#0EA5E9" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: SLATE_CARD,
              border: `1px solid ${SLATE_BORDER}`,
              borderRadius: 10,
              padding: "14px",
              textAlign: "center",
            }}
          >
            <div style={{ color: s.color, fontSize: 24, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: TEXT_MUTED, fontSize: 12 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ color: TEXT_MUTED, fontSize: 12, marginBottom: 8 }}>
          Klick auf eine Bewertung um sie zu verwalten
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {all.map((t, i) => (
            <div
              key={t.id || i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? SLATE_MID : SLATE_CARD,
                border: `1px solid ${selected === i ? AMBER : SLATE_BORDER}`,
                borderRadius: 8,
                padding: "12px 14px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar letter={t.avatar || t.name[0]} color={t.color || AMBER} size={28} />
                  <div>
                    <span style={{ color: TEXT_MAIN, fontSize: 13, fontWeight: 600 }}>{t.name}</span>
                    {t.role && <span style={{ color: TEXT_MUTED, fontSize: 12 }}> · {t.role}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <StarRating value={t.rating} />
                  <span style={{ color: selected === i ? AMBER : TEXT_MUTED, fontSize: 16, marginLeft: 6 }}>
                    {selected === i ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {selected === i && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${SLATE_BORDER}` }}>
                  <p style={{ color: TEXT_MAIN, fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>
                    „{t.text}"
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={btnStyle("primary")}>✓ Genehmigen</button>
                    <button style={btnStyle("ghost")}>Widget anzeigen</button>
                    <button style={{ ...btnStyle("ghost"), color: RED, borderColor: RED }}>Ablehnen</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#0F1A2E",
  border: `1px solid ${SLATE_BORDER}`,
  borderRadius: 8,
  color: TEXT_MAIN,
  padding: "10px 12px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  color: TEXT_MUTED,
  fontSize: 12,
  marginBottom: 6,
  fontWeight: 500,
  letterSpacing: 0.3,
};

function btnStyle(variant, disabled) {
  const base = {
    border: "1px solid",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
    opacity: disabled ? 0.4 : 1,
  };
  if (variant === "primary")
    return { ...base, background: AMBER, borderColor: AMBER, color: SLATE_DARK };
  if (variant === "success")
    return { ...base, background: GREEN, borderColor: GREEN, color: "#fff" };
  return { ...base, background: "transparent", borderColor: SLATE_BORDER, color: TEXT_MUTED };
}

// Simulierte gültige Tokens: Coach-Name + abgelaufenes Token zum Testen
const VALID_TOKENS = {
  "COACH-2024-ABC": { coach: "Sandra Meier Coaching", used: false, expires: "2025-12-31" },
  "MAKE-XYZ-789": { coach: "Thomas Müller GmbH", used: false, expires: "2025-12-31" },
  "ABGELAUFEN-001": { coach: "Test", used: false, expires: "2020-01-01" },
  "BENUTZT-002": { coach: "Test", used: true, expires: "2025-12-31" },
};

function TokenGate({ onValid }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      const entry = VALID_TOKENS[token.trim().toUpperCase()];
      if (!entry) {
        setError("Ungültiger Link. Bitte den Link aus deiner E-Mail verwenden.");
      } else if (new Date(entry.expires) < new Date()) {
        setError("Dieser Link ist abgelaufen. Bitte deinen Anbieter um einen neuen Link.");
      } else if (entry.used) {
        setError("Dieser Link wurde bereits verwendet und ist einmalig gültig.");
      } else {
        onValid(entry.coach);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: "100vh", background: SLATE_DARK, display: "flex",
      alignItems: "center", justifyContent: "center", padding: "24px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 420,
        background: SLATE_MID, border: `1px solid ${SLATE_BORDER}`,
        borderRadius: 16, padding: "32px 28px",
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, background: AMBER, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, margin: "0 auto 16px",
          }}>★</div>
          <h2 style={{ color: TEXT_MAIN, margin: "0 0 8px", fontSize: 20 }}>Bewertung abgeben</h2>
          <p style={{ color: TEXT_MUTED, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            Du hast einen persönlichen Link erhalten. Gib den Token aus deiner E-Mail ein um fortzufahren.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Dein persönlicher Token *</label>
          <input
            value={token}
            onChange={e => { setToken(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && validate()}
            placeholder="z.B. COACH-2024-ABC"
            style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: 1 }}
          />
          {error && (
            <p style={{ color: RED, fontSize: 12, margin: "6px 0 0" }}>{error}</p>
          )}
        </div>

        <button
          onClick={validate}
          disabled={!token.trim() || loading}
          style={btnStyle("primary", !token.trim() || loading)}
        >
          {loading ? "Prüfe Token…" : "Weiter →"}
        </button>

        <div style={{
          padding: "12px 14px", background: "#0B1525",
          border: `1px solid ${SLATE_BORDER}`, borderRadius: 8,
        }}>
          <div style={{ color: TEXT_MUTED, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
            DEMO — GÜLTIGE TEST-TOKENS
          </div>
          {[
            { token: "COACH-2024-ABC", desc: "gültig" },
            { token: "MAKE-XYZ-789", desc: "gültig" },
            { token: "ABGELAUFEN-001", desc: "abgelaufen" },
            { token: "BENUTZT-002", desc: "bereits verwendet" },
          ].map(t => (
            <div key={t.token} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span
                onClick={() => { setToken(t.token); setError(""); }}
                style={{ color: AMBER, fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}
              >
                {t.token}
              </span>
              <span style={{ color: TEXT_MUTED, fontSize: 11 }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("token"); // "token" | "app" | "dashboard"
  const [coachName, setCoachName] = useState("");
  const [step, setStep] = useState(0);
  const [userTestimonials, setUserTestimonials] = useState([]);

  const handleTokenValid = (coach) => {
    setCoachName(coach);
    setScreen("app");
    setStep(0);
  };

  const handleSubmit = (form) => {
    setUserTestimonials((prev) => [
      ...prev,
      {
        name: form.name,
        role: form.role,
        text: form.text,
        rating: form.rating,
        avatar: form.name[0]?.toUpperCase() || "?",
        color: ["#8B5CF6", "#0EA5E9", "#F59E0B", "#10B981", "#EF4444"][prev.length % 5],
      },
    ]);
  };

  if (screen === "token") return <TokenGate onValid={handleTokenValid} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: SLATE_DARK,
        color: TEXT_MAIN,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: "0 0 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: SLATE_MID,
          borderBottom: `1px solid ${SLATE_BORDER}`,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: AMBER, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>★</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: TEXT_MAIN }}>ProofWidget</span>
          <span style={{
            background: "#1A3A1A", color: GREEN, fontSize: 10,
            padding: "2px 6px", borderRadius: 4, fontWeight: 600,
          }}>TUTORIAL</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: TEXT_MUTED, fontSize: 12 }}>
            Eingeladen von <span style={{ color: AMBER }}>{coachName}</span>
          </span>
          <button
            onClick={() => setScreen("token")}
            style={{ ...btnStyle("ghost"), fontSize: 11, padding: "4px 10px" }}
          >
            ← Abmelden
          </button>
        </div>
      </div>

      {/* Intro */}
      <div style={{ padding: "28px 24px 0" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 20, color: TEXT_MAIN }}>
          So funktioniert ein Testimonial-Collector
        </h2>
        <p style={{ color: TEXT_MUTED, margin: "0 0 24px", fontSize: 14, lineHeight: 1.6 }}>
          Bewertungen sammeln, als Widget einbetten, Vertrauen aufbauen — ohne Code, in 5 Minuten.
        </p>

        {/* Step Tabs */}
        <div style={{
          display: "flex", gap: 4, background: SLATE_MID,
          padding: 4, borderRadius: 10, marginBottom: 24, overflowX: "auto",
        }}>
          {STEP_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              style={{
                flex: 1, padding: "8px 4px", borderRadius: 8, border: "none",
                background: step === i ? AMBER : "transparent",
                color: step === i ? SLATE_DARK : TEXT_MUTED,
                fontWeight: step === i ? 700 : 400,
                fontSize: 12, cursor: "pointer", transition: "all 0.15s",
                whiteSpace: "nowrap", fontFamily: "inherit", minWidth: 100,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {step === 0 && <StepCollect onSubmit={handleSubmit} />}
        {step === 1 && <StepPreview testimonials={userTestimonials} />}
        {step === 2 && <StepEmbed />}
        {step === 3 && <StepDashboard testimonials={userTestimonials} />}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={btnStyle("ghost", step === 0)}
          >
            ← Zurück
          </button>
          <button
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={step === STEPS.length - 1}
            style={btnStyle("primary", step === STEPS.length - 1)}
          >
            Weiter →
          </button>
        </div>

        <div style={{
          marginTop: 32, padding: "16px", background: "#0B1525",
          border: `1px solid ${SLATE_BORDER}`, borderRadius: 10,
          borderLeft: `3px solid ${AMBER}`,
        }}>
          <div style={{ color: AMBER, fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
            MICRO-SAAS KONTEXT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Vorbild Testimonial.to", value: "$2,4M ARR (2024)", color: GREEN },
              { label: "Vorbild Senja.io", value: "~$600K ARR, 2 Personen", color: GREEN },
              { label: "Zielgruppe", value: "Freelancer, Coaches, KMUs", color: "#0EA5E9" },
              { label: "Preispunkt", value: "$19–$79/Monat", color: AMBER },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: TEXT_MUTED }}>{r.label}</span>
                <span style={{ color: r.color, fontWeight: 600 }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
