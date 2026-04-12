import { useState } from "react";

const ROOM_TYPE_OPTIONS = [
  { id: "bedroom", label: "Bedroom" },
  { id: "bathroom", label: "Bathroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "living_room", label: "Living Room" },
  { id: "hallway", label: "Hallway" },
  { id: "terrace", label: "Terrace" },
  { id: "garage", label: "Garage" },
  { id: "basement", label: "Basement" },
];

const SERVICE_UNIT_OPTIONS = ["m²", "lm", "per point", "per fixture", "per unit", "per room", "per set"];

const MATERIAL_VARIANCE_OPTIONS = [
  { id: "fixed", label: "Fixed list per service", desc: "e.g. painting always uses paint + primer + masking tape" },
  { id: "varies", label: "Varies job to job", desc: "Materials are selected fresh for each project" },
  { id: "mixed", label: "Fixed base, with optional extras", desc: "Core materials fixed, extras added as needed" },
];

function SectionShell({ number, title, subtitle, open, onToggle, children, complete }) {
  const active = open || complete;
  return (
    <div
      style={{
        border: "1.5px solid",
        borderColor: active ? "#ff6b35" : "#2e2e2e",
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.3s ease",
        background: "#161616",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          gap: 18,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: active ? "#ff6b35" : "#555",
            letterSpacing: "0.12em",
            minWidth: 24,
            transition: "color 0.3s",
          }}
        >
          {complete && !open ? "✓" : `0${number}`}
        </span>
        <span style={{ flex: 1 }}>
          <span
            style={{
              display: "block",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              fontWeight: 600,
              color: active ? "#ffffff" : "#999",
              letterSpacing: "0.01em",
              lineHeight: 1.1,
              transition: "color 0.3s",
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span
              style={{
                display: "block",
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#555",
                marginTop: 4,
                letterSpacing: "0.06em",
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
        <span
          style={{
            color: "#555",
            fontSize: 18,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "block",
          }}
        >
          ↓
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? 2000 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ padding: "0 28px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 100,
        border: "1.5px solid",
        borderColor: selected ? "#ff6b35" : "#2e2e2e",
        background: selected ? "rgba(255,107,53,0.12)" : "transparent",
        color: selected ? "#ffffff" : "#555",
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        cursor: "pointer",
        letterSpacing: "0.06em",
        transition: "all 0.18s ease",
      }}
    >
      {label}
    </button>
  );
}

function ServiceRow({ service, onChange, onRemove }) {
  const [matOpen, setMatOpen] = useState(false);

  const updateMat = (mi, key, val) => {
    const mats = [...service.materials];
    mats[mi] = { ...mats[mi], [key]: val };
    onChange({ ...service, materials: mats });
  };

  return (
    <div
      style={{
        border: "1px solid #2a2a2a",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", gap: 10, padding: "14px 16px", alignItems: "center" }}>
        <input
          value={service.name}
          onChange={(e) => onChange({ ...service, name: e.target.value })}
          placeholder="Service name…"
          style={inputStyle({ flex: 2 })}
        />
        <select
          value={service.unit}
          onChange={(e) => onChange({ ...service, unit: e.target.value })}
          style={inputStyle({ flex: 1, cursor: "pointer" })}
        >
          <option value="">Unit…</option>
          {SERVICE_UNIT_OPTIONS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <input
          value={service.unit_price}
          onChange={(e) => onChange({ ...service, unit_price: e.target.value })}
          placeholder="Price / unit"
          type="number"
          min="0"
          style={inputStyle({ width: 110 })}
        />
        <button
          onClick={() => setMatOpen(!matOpen)}
          title="Add materials"
          style={{
            background: matOpen ? "rgba(255,107,53,0.12)" : "transparent",
            border: "1px solid",
            borderColor: matOpen ? "#ff6b35" : "#2e2e2e",
            borderRadius: 8,
            color: matOpen ? "#ff6b35" : "#555",
            cursor: "pointer",
            padding: "8px 12px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.05em",
            transition: "all 0.18s",
            whiteSpace: "nowrap",
          }}
        >
          {service.materials.length > 0 ? `${service.materials.length} mat.` : "+ mat."}
        </button>
        <button
          onClick={onRemove}
          style={{
            background: "transparent",
            border: "none",
            color: "#3a3a3a",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            padding: "4px 6px",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#c06060")}
          onMouseLeave={(e) => (e.target.style.color = "#3a3a3a")}
        >
          ×
        </button>
      </div>

      {/* Materials nested panel */}
      <div
        style={{
          maxHeight: matOpen ? 600 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: "#111",
          borderTop: matOpen ? "1px solid #222" : "none",
        }}
      >
        <div style={{ padding: "14px 16px 16px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: "0.1em", marginBottom: 10 }}>
            MATERIALS FOR {service.name.toUpperCase() || "THIS SERVICE"}
          </div>
          {service.materials.map((mat, mi) => (
            <div key={mi} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input
                value={mat.name}
                onChange={(e) => updateMat(mi, "name", e.target.value)}
                placeholder="Material name…"
                style={inputStyle({ flex: 2 })}
              />
              <input
                value={mat.unit}
                onChange={(e) => updateMat(mi, "unit", e.target.value)}
                placeholder="Unit (L, kg, roll…)"
                style={inputStyle({ flex: 1 })}
              />
              <input
                value={mat.qty_per_service_unit}
                onChange={(e) => updateMat(mi, "qty_per_service_unit", e.target.value)}
                placeholder="qty / service unit"
                type="number"
                min="0"
                step="0.001"
                style={inputStyle({ width: 140 })}
              />
              <button
                onClick={() => onChange({ ...service, materials: service.materials.filter((_, i) => i !== mi) })}
                style={{ background: "transparent", border: "none", color: "#3a3a3a", cursor: "pointer", fontSize: 16, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.target.style.color = "#c06060")}
                onMouseLeave={(e) => (e.target.style.color = "#3a3a3a")}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange({ ...service, materials: [...service.materials, { name: "", unit: "", qty_per_service_unit: "" }] })}
            style={ghostBtnStyle}
          >
            + add material
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = (extra = {}) => ({
  background: "#2d3936",
  border: "1px solid #2e2e2e",
  borderRadius: 8,
  color: "#e8f5f0",
  fontFamily: "'DM Mono', monospace",
  fontSize: 12,
  padding: "9px 12px",
  outline: "none",
  letterSpacing: "0.03em",
  transition: "border-color 0.15s",
  ...extra,
});

const ghostBtnStyle = {
  background: "transparent",
  border: "1px dashed #333",
  borderRadius: 8,
  color: "#555",
  fontFamily: "'DM Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.08em",
  padding: "8px 16px",
  cursor: "pointer",
  marginTop: 4,
  transition: "all 0.15s",
};

export default function ClientIntakeForm() {
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const [roomTypes, setRoomTypes] = useState(
    ROOM_TYPE_OPTIONS.reduce((acc, r) => ({ ...acc, [r.id]: false }), {})
  );
  const [customRoom, setCustomRoom] = useState("");
  const [customRooms, setCustomRooms] = useState([]);

  const [services, setServices] = useState([
    { id: 1, name: "", unit: "", unit_price: "", materials: [] },
  ]);

  const [materialMode, setMaterialMode] = useState("");
  const [materialNotes, setMaterialNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleSection = (n) => setOpenSection(openSection === n ? null : n);

  const selectedRoomCount = Object.values(roomTypes).filter(Boolean).length + customRooms.length;
  const servicesComplete = services.some((s) => s.name && s.unit);
  const isReady = !submitting && !!(email && selectedRoomCount > 0 && servicesComplete && materialMode);

  const handleAddCustomRoom = () => {
    const v = customRoom.trim();
    if (v && !customRooms.includes(v)) {
      setCustomRooms([...customRooms, v]);
      setCustomRoom("");
    }
  };

  const handleSubmit = async () => {
    if (!email) { alert("Please enter your email."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const payload = {
    email,
    room_types: [
      ...ROOM_TYPE_OPTIONS.filter((r) => roomTypes[r.id]).map((r) => r.id),
      ...customRooms,
    ],
    services: services.filter((s) => s.name),
    material_mode: materialMode,
    material_notes: materialNotes,
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace" }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#ffffff", marginBottom: 12 }}>Received</div>
          <div style={{ color: "#555", fontSize: 12, lineHeight: 1.8, marginBottom: 32 }}>
            We have everything we need to set up your estimator.
            <br />A confirmation will be sent to <span style={{ color: "#ff6b35" }}>{email}</span>.
          </div>
          <details style={{ textAlign: "left", background: "#161616", border: "1px solid #2e2e2e", borderRadius: 12, padding: 20 }}>
            <summary style={{ color: "#555", cursor: "pointer", fontSize: 11, letterSpacing: "0.08em" }}>VIEW SUBMITTED DATA</summary>
            <pre style={{ color: "#ff6b35", fontSize: 10, marginTop: 16, overflowX: "auto", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(payload, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.18em", marginBottom: 16 }}>
            CLIENT SETUP
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: "#ffffff", margin: 0, lineHeight: 1.05 }}>
            Hi Paweł, Tell us about<br /><em style={{ fontWeight: 400 }}>your work.</em>
          </h1>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#555", marginTop: 16, lineHeight: 1.8, maxWidth: 480 }}>
            Three questions. 10 minutes. Save 30 minutes per Angebot forever.
          </p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: "0.12em", display: "block", marginBottom: 8 }}>
            YOUR EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{
              ...inputStyle({ width: "100%", fontSize: 14, padding: "13px 16px" }),
              boxSizing: "border-box",
              borderColor: email ? "#ff6b35" : "#2e2e2e",
            }}
          />
        </div>

        <div style={{ height: 1, background: "#1e1e1e", margin: "32px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionShell
            number={1}
            title="Room types"
            subtitle="Which spaces do you typically work on?"
            open={openSection === 1}
            onToggle={() => toggleSection(1)}
            complete={selectedRoomCount > 0}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {ROOM_TYPE_OPTIONS.map((r) => (
                <Chip
                  key={r.id}
                  label={r.label}
                  selected={roomTypes[r.id]}
                  onClick={() => setRoomTypes({ ...roomTypes, [r.id]: !roomTypes[r.id] })}
                />
              ))}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.1em", marginBottom: 8 }}>
              ADD CUSTOM TYPE
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={customRoom}
                onChange={(e) => setCustomRoom(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomRoom()}
                placeholder="e.g. Loft, Utility room…"
                style={inputStyle({ flex: 1 })}
              />
              <button onClick={handleAddCustomRoom} style={{ ...inputStyle(), cursor: "pointer", color: "#ff6b35", paddingLeft: 20, paddingRight: 20 }}>
                Add
              </button>
            </div>
            {customRooms.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                {customRooms.map((cr) => (
                  <span
                    key={cr}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 100,
                      background: "rgba(255,107,53,0.08)",
                      border: "1px solid #ff6b35",
                      color: "#ff6b35",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {cr}
                    <button
                      onClick={() => setCustomRooms(customRooms.filter((x) => x !== cr))}
                      style={{ background: "none", border: "none", color: "#ff6b35", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {selectedRoomCount > 0 && (
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#ff6b35", marginTop: 16, letterSpacing: "0.08em" }}>
                {selectedRoomCount} room type{selectedRoomCount !== 1 ? "s" : ""} selected
              </div>
            )}
          </SectionShell>

          <SectionShell
            number={2}
            title="Services & pricing"
            subtitle="What do you offer, and at what unit?"
            open={openSection === 2}
            onToggle={() => toggleSection(2)}
            complete={servicesComplete}
          >
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.1em", marginBottom: 14, display: "grid", gridTemplateColumns: "2fr 1fr 110px auto auto", gap: 10, paddingRight: 6 }}>
              <span>SERVICE</span>
              <span>UNIT</span>
              <span>PRICE / UNIT (€)</span>
              <span>MATERIALS</span>
              <span />
            </div>

            {services.map((svc, i) => (
              <ServiceRow
                key={svc.id}
                service={svc}
                onChange={(updated) => {
                  const next = [...services];
                  next[i] = updated;
                  setServices(next);
                }}
                onRemove={() => setServices(services.filter((_, idx) => idx !== i))}
              />
            ))}

            <button
              onClick={() => setServices([...services, { id: Date.now(), name: "", unit: "", unit_price: "", materials: [] }])}
              style={{ ...ghostBtnStyle, width: "100%", marginTop: 6 }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#555"; e.target.style.color = "#aaa"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#333"; e.target.style.color = "#555"; }}
            >
              + add service
            </button>
          </SectionShell>

          <SectionShell
            number={3}
            title="Material lists"
            subtitle="How consistent are your materials across jobs?"
            open={openSection === 3}
            onToggle={() => toggleSection(3)}
            complete={!!materialMode}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MATERIAL_VARIANCE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMaterialMode(opt.id)}
                  style={{
                    background: materialMode === opt.id ? "rgba(255,107,53,0.08)" : "transparent",
                    border: "1.5px solid",
                    borderColor: materialMode === opt.id ? "#ff6b35" : "#2a2a2a",
                    borderRadius: 12,
                    padding: "16px 20px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                  }}
                >
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: materialMode === opt.id ? "#ffffff" : "#888", marginBottom: 4, transition: "color 0.18s" }}>
                    {opt.label}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.04em" }}>
                    {opt.desc}
                  </div>
                </button>
              ))}
              <div style={{ marginTop: 8 }}>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: "0.12em", display: "block", marginBottom: 8 }}>
                  ADDITIONAL INFO
                </label>
                <textarea
                  value={materialNotes}
                  onChange={(e) => setMaterialNotes(e.target.value)}
                  placeholder="Anything else about how you handle materials…"
                  rows={3}
                  style={{ ...inputStyle({ width: "100%", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }) }}
                />
              </div>
            </div>
          </SectionShell>
        </div>

        <div style={{ marginTop: 40, borderTop: "1px solid #1e1e1e", paddingTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#444" }}>
            {[email && "email ✓", selectedRoomCount > 0 && "rooms ✓", servicesComplete && "services ✓", materialMode && "materials ✓"]
              .filter(Boolean)
              .join("  ·  ") || "complete all sections to submit"}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isReady}
            style={{
              background: isReady ? "#ff6b35" : "#1e1e1e",
              border: "none",
              borderRadius: 100,
              color: isReady ? "#0f0f0f" : "#333",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.1em",
              padding: "14px 32px",
              cursor: isReady ? "pointer" : "not-allowed",
              transition: "all 0.25s ease",
            }}
          >
            {submitting ? "SENDING..." : "SUBMIT →"}
          </button>
        </div>
      </div>
    </div>
  );
}
