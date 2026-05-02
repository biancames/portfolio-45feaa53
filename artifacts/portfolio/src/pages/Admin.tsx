import { useState, useEffect, useCallback } from "react";
import type {
  SiteSettings, Project, FilterCategory, Experience,
  Skill, ProcessStep, CarouselSlide, ContentData,
} from "@/data/defaults";

const API = "/api/content";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "bia2024";

// ── helpers ──────────────────────────────────────────────────────────────────
async function api(path: string, method = "GET", body?: unknown) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ── tiny UI atoms ─────────────────────────────────────────────────────────────
const C = {
  bg: "#1A1C14",
  sidebar: "#0F1109",
  card: "#252A18",
  border: "#3D4A1E",
  lime: "#A8CC2C",
  limeD: "#8AAD1A",
  parch: "#F5F0E8",
  muted: "rgba(245,240,232,0.55)",
  danger: "#C0392B",
};

const Inp = ({ value, onChange, placeholder, multiline }: { value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) => {
  const base: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: C.bg, border: `1px solid ${C.border}`,
    borderRadius: 8, padding: "10px 12px",
    color: C.parch, fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    outline: "none", resize: multiline ? "vertical" : "none",
  };
  return multiline
    ? <textarea rows={3} style={base} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    : <input style={base} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />;
};

const Btn = ({ onClick, children, variant = "primary", disabled }: { onClick: () => void; children: React.ReactNode; variant?: "primary" | "danger" | "ghost"; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: "8px 16px", borderRadius: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
    background: variant === "primary" ? C.lime : variant === "danger" ? C.danger : "transparent",
    color: variant === "primary" ? "#1A1C14" : C.parch,
    opacity: disabled ? 0.5 : 1,
    transition: "opacity 0.2s",
  }}>{children}</button>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{children as string}</div>
);

const Row = ({ children, gap }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: "flex", gap: gap ?? 12, alignItems: "flex-start" }}>{children}</div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 12 }}>{children}</div>
);

const StatusBadge = ({ msg, ok }: { msg: string; ok: boolean }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    background: ok ? C.lime : C.danger, color: ok ? "#1A1C14" : "#fff",
    padding: "10px 20px", borderRadius: 8, fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 600,
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  }}>{msg}</div>
);

// ── Login Gate ────────────────────────────────────────────────────────────────
function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  function submit() {
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 360, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 40, textAlign: "center" }}>
        <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 32, color: C.lime, marginBottom: 8 }}>bia.design</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 32 }}>PAINEL ADMIN</div>
        <Inp value={pw} onChange={setPw} placeholder="Senha" />
        {err && <div style={{ color: C.danger, fontSize: 13, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>Senha incorreta</div>}
        <button
          onClick={submit}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{ marginTop: 16, width: "100%", padding: "12px 0", background: C.lime, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A1C14" }}
        >Entrar</button>
      </div>
    </div>
  );
}

// ── SETTINGS TAB ──────────────────────────────────────────────────────────────
function SettingsTab({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setForm(settings); }, [settings]);

  const set = (k: keyof SiteSettings) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true);
    try {
      await api("/settings", "PUT", form);
      setToast({ msg: "Salvo!", ok: true });
    } catch {
      setToast({ msg: "Erro ao salvar", ok: false });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2500);
    }
  }

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <SectionTitle>Configurações do Site</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><Label>Nome (hero)</Label><Inp value={form.heroName} onChange={set("heroName")} /></div>
        <div><Label>Status de disponibilidade</Label><Inp value={form.availabilityStatus} onChange={set("availabilityStatus")} /></div>
        <div style={{ gridColumn: "1/-1" }}><Label>Texto hero</Label><Inp value={form.heroText} onChange={set("heroText")} multiline /></div>
        <div style={{ gridColumn: "1/-1" }}><Label>Bio (parágrafo 1)</Label><Inp value={form.bio} onChange={set("bio")} multiline /></div>
        <div style={{ gridColumn: "1/-1" }}><Label>Bio (parágrafo 2)</Label><Inp value={form.bioSecondary} onChange={set("bioSecondary")} multiline /></div>
        <div><Label>Email</Label><Inp value={form.email} onChange={set("email")} /></div>
        <div><Label>LinkedIn URL</Label><Inp value={form.linkedinUrl} onChange={set("linkedinUrl")} /></div>
        <div style={{ gridColumn: "1/-1" }}><Label>Behance URL</Label><Inp value={form.behanceUrl} onChange={set("behanceUrl")} /></div>
      </div>
      <div style={{ marginTop: 24 }}><Btn onClick={save} disabled={saving}>{saving ? "Salvando…" : "Salvar configurações"}</Btn></div>
    </div>
  );
}

// ── PROJECTS TAB ──────────────────────────────────────────────────────────────
function ProjectsTab({ projects, filterCategories }: { projects: Project[]; filterCategories: FilterCategory[] }) {
  const [list, setList] = useState(projects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setList(projects); }, [projects]);

  const catLabels = filterCategories.map(c => c.label).filter(l => l !== "Todos");

  const blank: Omit<Project, "id" | "sortOrder"> = {
    title: "", description: "", tags: [], imageUrl: null, href: "#",
    slug: "", filterCategories: [], featured: false, comingSoon: false, caseStudy: null,
  };

  const [form, setForm] = useState<Omit<Project, "id" | "sortOrder">>(blank);
  const [caseStudyJson, setCaseStudyJson] = useState("{}");
  const [jsonError, setJsonError] = useState(false);
  const set = (k: string) => (v: unknown) => setForm((f: typeof form) => ({ ...f, [k]: v }));

  function openEdit(p: Project) {
    setEditing(p);
    setForm({ title: p.title, description: p.description, tags: p.tags, imageUrl: p.imageUrl, href: p.href, slug: p.slug ?? "", filterCategories: p.filterCategories, featured: p.featured, comingSoon: p.comingSoon, caseStudy: p.caseStudy });
    setCaseStudyJson(p.caseStudy ? JSON.stringify(p.caseStudy, null, 2) : "{}");
    setJsonError(false);
    setAdding(false);
  }

  function openAdd() {
    setEditing(null);
    setForm(blank);
    setAdding(true);
  }

  async function save() {
    try {
      let parsedCaseStudy = null;
      try {
        const trimmed = caseStudyJson.trim();
        parsedCaseStudy = trimmed && trimmed !== "{}" ? JSON.parse(trimmed) : null;
        setJsonError(false);
      } catch {
        setJsonError(true);
        setToast({ msg: "JSON inválido no Case Study", ok: false });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const body = { ...form, tags: typeof form.tags === "string" ? (form.tags as string).split(",").map((s: string) => s.trim()) : form.tags, caseStudy: parsedCaseStudy };
      if (editing) {
        const updated = await api(`/projects/${editing.id}`, "PUT", body);
        setList(l => l.map(p => p.id === editing.id ? updated : p));
        setEditing(null);
      } else {
        const created = await api("/projects", "POST", body);
        setList(l => [...l, created]);
        setAdding(false);
      }
      setForm(blank);
      setToast({ msg: "Salvo!", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  async function del(id: number) {
    if (!confirm("Remover projeto?")) return;
    try {
      await api(`/projects/${id}`, "DELETE");
      setList(l => l.filter(p => p.id !== id));
      setToast({ msg: "Removido", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  const toggleCat = (cat: string) => {
    const cats = form.filterCategories.includes(cat)
      ? form.filterCategories.filter(c => c !== cat)
      : [...form.filterCategories, cat];
    set("filterCategories")(cats);
  };

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <Row>
        <SectionTitle>Projetos</SectionTitle>
        <Btn onClick={openAdd} variant="primary">+ Novo projeto</Btn>
      </Row>

      {(adding || editing) && (
        <Card>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.lime, marginBottom: 16, letterSpacing: "0.1em" }}>
            {editing ? `EDITANDO: ${editing.title}` : "NOVO PROJETO"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><Label>Título</Label><Inp value={form.title} onChange={set("title")} /></div>
            <div><Label>Slug (ex: sispat → /sispat)</Label><Inp value={form.slug ?? ""} onChange={set("slug")} placeholder="sispat" /></div>
            <div style={{ gridColumn: "1/-1" }}><Label>Descrição</Label><Inp value={form.description} onChange={set("description")} multiline /></div>
            <div><Label>Tags (separadas por vírgula)</Label><Inp value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags} onChange={v => set("tags")(v.split(",").map((s: string) => s.trim()))} /></div>
            <div><Label>URL da imagem</Label><Inp value={form.imageUrl ?? ""} onChange={v => set("imageUrl")(v || null)} /></div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Label>Case Study (JSON)</Label>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, marginBottom: 6 }}>
              Campos: caseNumber, headline, overview, problemStatement, metadata (setor, papel, plataforma, tipo, timeline, prototypeUrl), process [{"{"}number, title, content, imageUrl, imagePosition{"}"}], outcomes [{"{"}icon, value, label{"}"}], learnings [{"{"}color, text{"}"}], nextProjectSlug, nextProjectLabel
            </div>
            <textarea
              value={caseStudyJson}
              onChange={e => { setCaseStudyJson(e.target.value); setJsonError(false); }}
              rows={14}
              style={{
                width: "100%", boxSizing: "border-box",
                background: jsonError ? "rgba(200,50,50,0.1)" : "rgba(0,0,0,0.25)",
                border: `1px solid ${jsonError ? "#e05" : C.border}`,
                borderRadius: 8, padding: "10px 12px",
                color: C.parch, fontFamily: "'DM Mono', monospace", fontSize: 12,
                lineHeight: 1.6, resize: "vertical", outline: "none",
              }}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <Label>Categorias de filtro</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {catLabels.map(cat => (
                <button key={cat} onClick={() => toggleCat(cat)} style={{
                  padding: "4px 12px", borderRadius: 20, border: `1px solid ${C.border}`,
                  background: form.filterCategories.includes(cat) ? C.lime : "transparent",
                  color: form.filterCategories.includes(cat) ? "#1A1C14" : C.parch,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer",
                }}>{cat}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, color: C.parch, fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={form.featured} onChange={e => set("featured")(e.target.checked)} />
              Destaque (Home)
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, color: C.parch, fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={form.comingSoon} onChange={e => set("comingSoon")(e.target.checked)} />
              Em breve
            </label>
          </div>
          <Row gap={8} style={{ marginTop: 16 } as React.CSSProperties}>
            <Btn onClick={save}>Salvar</Btn>
            <Btn onClick={() => { setEditing(null); setAdding(false); }} variant="ghost">Cancelar</Btn>
          </Row>
        </Card>
      )}

      {list.map(p => (
        <Card key={p.id}>
          <Row>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 18, color: C.parch }}>
                {p.comingSoon ? "🔜 " : ""}{p.title}
                {p.featured && <span style={{ marginLeft: 8, fontSize: 10, fontFamily: "'DM Mono', monospace", background: C.lime, color: "#1A1C14", padding: "2px 6px", borderRadius: 4 }}>HOME</span>}
              </div>
              <div style={{ fontSize: 13, color: C.muted, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{p.description}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", background: C.border, color: C.lime, padding: "2px 8px", borderRadius: 4 }}>{t}</span>)}
                {p.filterCategories.map(c => <span key={c} style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", border: `1px solid ${C.border}`, color: C.muted, padding: "2px 8px", borderRadius: 4 }}>{c}</span>)}
              </div>
            </div>
            {p.imageUrl && <img src={p.imageUrl} alt="" style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 6 }} />}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Btn onClick={() => openEdit(p)} variant="ghost">Editar</Btn>
              <Btn onClick={() => del(p.id)} variant="danger">Remover</Btn>
            </div>
          </Row>
        </Card>
      ))}
    </div>
  );
}

// ── FILTER CATEGORIES TAB ─────────────────────────────────────────────────────
function FiltersTab({ filterCategories }: { filterCategories: FilterCategory[] }) {
  const [list, setList] = useState(filterCategories);
  const [newLabel, setNewLabel] = useState("");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setList(filterCategories); }, [filterCategories]);

  async function add() {
    if (!newLabel.trim()) return;
    try {
      const created = await api("/filter-categories", "POST", { label: newLabel.trim() });
      setList(l => [...l, created]);
      setNewLabel("");
      setToast({ msg: "Adicionado", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2000);
  }

  async function rename(id: number, label: string) {
    try {
      const updated = await api(`/filter-categories/${id}`, "PUT", { label });
      setList(l => l.map(c => c.id === id ? updated : c));
    } catch { }
  }

  async function del(id: number) {
    if (!confirm("Remover categoria?")) return;
    try {
      await api(`/filter-categories/${id}`, "DELETE");
      setList(l => l.filter(c => c.id !== id));
      setToast({ msg: "Removido", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2000);
  }

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <SectionTitle>Categorias de Filtro</SectionTitle>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 20 }}>
        Estas categorias aparecem como filtros na página de Projetos.
      </div>
      {list.map(cat => (
        <Card key={cat.id}>
          <Row>
            <div style={{ flex: 1 }}>
              <Inp value={cat.label} onChange={v => setList(l => l.map(c => c.id === cat.id ? { ...c, label: v } : c))} />
            </div>
            <Btn onClick={() => rename(cat.id, list.find(c => c.id === cat.id)!.label)} variant="ghost">Salvar</Btn>
            <Btn onClick={() => del(cat.id)} variant="danger">✕</Btn>
          </Row>
        </Card>
      ))}
      <Card>
        <Row>
          <div style={{ flex: 1 }}><Inp value={newLabel} onChange={setNewLabel} placeholder="Nova categoria…" /></div>
          <Btn onClick={add}>+ Adicionar</Btn>
        </Row>
      </Card>
    </div>
  );
}

// ── EXPERIENCE TAB ────────────────────────────────────────────────────────────
function ExperienceTab({ experience }: { experience: Experience[] }) {
  const [list, setList] = useState(experience);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [adding, setAdding] = useState(false);
  const blank = { role: "", company: "", period: "", current: false };
  const [form, setForm] = useState(blank);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setList(experience); }, [experience]);

  const set = (k: string) => (v: unknown) => setForm(f => ({ ...f, [k]: v }));

  function openEdit(e: Experience) {
    setEditing(e);
    setForm({ role: e.role, company: e.company, period: e.period, current: e.current });
    setAdding(false);
  }

  async function save() {
    try {
      if (editing) {
        const updated = await api(`/experience/${editing.id}`, "PUT", form);
        setList(l => l.map(e => e.id === editing.id ? updated : e));
        setEditing(null);
      } else {
        const created = await api("/experience", "POST", form);
        setList(l => [...l, created]);
        setAdding(false);
      }
      setForm(blank);
      setToast({ msg: "Salvo!", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  async function del(id: number) {
    if (!confirm("Remover experiência?")) return;
    try {
      await api(`/experience/${id}`, "DELETE");
      setList(l => l.filter(e => e.id !== id));
      setToast({ msg: "Removido", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <Row><SectionTitle>Experiência</SectionTitle><Btn onClick={() => { setAdding(true); setEditing(null); setForm(blank); }}>+ Adicionar</Btn></Row>

      {(adding || editing) && (
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><Label>Cargo</Label><Inp value={form.role} onChange={set("role")} /></div>
            <div><Label>Empresa</Label><Inp value={form.company} onChange={set("company")} /></div>
            <div><Label>Período</Label><Inp value={form.period} onChange={set("period")} placeholder="2024 — presente" /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 20 }}>
              <input type="checkbox" checked={form.current} onChange={e => set("current")(e.target.checked)} id="current" />
              <label htmlFor="current" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.parch, cursor: "pointer" }}>Emprego atual</label>
            </div>
          </div>
          <Row gap={8} style={{ marginTop: 16 } as React.CSSProperties}>
            <Btn onClick={save}>Salvar</Btn>
            <Btn onClick={() => { setEditing(null); setAdding(false); }} variant="ghost">Cancelar</Btn>
          </Row>
        </Card>
      )}

      {list.map(exp => (
        <Card key={exp.id}>
          <Row>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 17, color: C.parch }}>{exp.role}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, marginLeft: 10 }}>{exp.company}</span>
              {exp.current && <span style={{ marginLeft: 8, fontSize: 9, fontFamily: "'DM Mono', monospace", background: C.lime, color: "#1A1C14", padding: "2px 6px", borderRadius: 3 }}>agora</span>}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, marginTop: 4 }}>{exp.period}</div>
            </div>
            <Btn onClick={() => openEdit(exp)} variant="ghost">Editar</Btn>
            <Btn onClick={() => del(exp.id)} variant="danger">Remover</Btn>
          </Row>
        </Card>
      ))}
    </div>
  );
}

// ── SKILLS TAB ────────────────────────────────────────────────────────────────
function SkillsTab({ skills }: { skills: Skill[] }) {
  const [list, setList] = useState(skills);
  const [newLabel, setNewLabel] = useState("");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setList(skills); }, [skills]);

  async function add() {
    if (!newLabel.trim()) return;
    try {
      const created = await api("/skills", "POST", { label: newLabel.trim() });
      setList(l => [...l, created]);
      setNewLabel("");
      setToast({ msg: "Adicionado", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2000);
  }

  async function del(id: number) {
    try {
      await api(`/skills/${id}`, "DELETE");
      setList(l => l.filter(s => s.id !== id));
    } catch { }
  }

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <SectionTitle>Skills</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        {list.map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, background: C.border, borderRadius: 20, padding: "6px 12px 6px 16px" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.parch }}>{s.label}</span>
            <button onClick={() => del(s.id)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        ))}
      </div>
      <Card>
        <Row>
          <div style={{ flex: 1 }}><Inp value={newLabel} onChange={setNewLabel} placeholder="Nova skill…" /></div>
          <Btn onClick={add}>+ Adicionar</Btn>
        </Row>
      </Card>
    </div>
  );
}

// ── PROCESS TAB ───────────────────────────────────────────────────────────────
function ProcessTab({ processSteps }: { processSteps: ProcessStep[] }) {
  const [list, setList] = useState(processSteps);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setList(processSteps); }, [processSteps]);

  async function save(step: ProcessStep) {
    try {
      const updated = await api(`/process/${step.id}`, "PUT", step);
      setList(l => l.map(s => s.id === step.id ? updated : s));
      setToast({ msg: "Salvo!", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2000);
  }

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <SectionTitle>Etapas do Processo</SectionTitle>
      {list.map(step => (
        <Card key={step.id}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 2fr auto", gap: 12, alignItems: "end" }}>
            <div>
              <Label>Nº</Label>
              <Inp value={step.number} onChange={v => setList(l => l.map(s => s.id === step.id ? { ...s, number: v } : s))} />
            </div>
            <div>
              <Label>Título</Label>
              <Inp value={step.title} onChange={v => setList(l => l.map(s => s.id === step.id ? { ...s, title: v } : s))} />
            </div>
            <div>
              <Label>Descrição</Label>
              <Inp value={step.description} onChange={v => setList(l => l.map(s => s.id === step.id ? { ...s, description: v } : s))} multiline />
            </div>
            <div style={{ paddingBottom: 2 }}>
              <Btn onClick={() => save(list.find(s => s.id === step.id)!)}>Salvar</Btn>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── CAROUSEL TAB ──────────────────────────────────────────────────────────────
function CarouselTab({ carouselSlides }: { carouselSlides: CarouselSlide[] }) {
  const [list, setList] = useState(carouselSlides);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<CarouselSlide | null>(null);
  const blank = { category: "", title: "", subtitle: "", imageUrl: null as string | null };
  const [form, setForm] = useState(blank);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => { setList(carouselSlides); }, [carouselSlides]);

  const set = (k: string) => (v: unknown) => setForm(f => ({ ...f, [k]: v }));

  function openEdit(s: CarouselSlide) {
    setEditing(s);
    setForm({ category: s.category, title: s.title, subtitle: s.subtitle, imageUrl: s.imageUrl });
    setAdding(false);
  }

  async function save() {
    const body = { ...form, imageUrl: form.imageUrl || null };
    try {
      if (editing) {
        const updated = await api(`/carousel/${editing.id}`, "PUT", body);
        setList(l => l.map(s => s.id === editing.id ? updated : s));
        setEditing(null);
      } else {
        const created = await api("/carousel", "POST", body);
        setList(l => [...l, created]);
        setAdding(false);
      }
      setForm(blank);
      setToast({ msg: "Salvo!", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  async function del(id: number) {
    if (!confirm("Remover slide?")) return;
    try {
      await api(`/carousel/${id}`, "DELETE");
      setList(l => l.filter(s => s.id !== id));
      setToast({ msg: "Removido", ok: true });
    } catch { setToast({ msg: "Erro", ok: false }); }
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div>
      {toast && <StatusBadge msg={toast.msg} ok={toast.ok} />}
      <Row><SectionTitle>Além do Trabalho — Carrossel</SectionTitle><Btn onClick={() => { setAdding(true); setEditing(null); setForm(blank); }}>+ Novo slide</Btn></Row>

      {(adding || editing) && (
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><Label>Categoria</Label><Inp value={form.category} onChange={set("category")} placeholder="livro favorito" /></div>
            <div><Label>Título</Label><Inp value={form.title} onChange={set("title")} /></div>
            <div><Label>Subtítulo / Autor</Label><Inp value={form.subtitle} onChange={set("subtitle")} /></div>
            <div><Label>URL da imagem</Label><Inp value={form.imageUrl ?? ""} onChange={v => set("imageUrl")(v || null)} /></div>
          </div>
          <Row gap={8} style={{ marginTop: 16 } as React.CSSProperties}>
            <Btn onClick={save}>Salvar</Btn>
            <Btn onClick={() => { setEditing(null); setAdding(false); }} variant="ghost">Cancelar</Btn>
          </Row>
        </Card>
      )}

      {list.map(s => (
        <Card key={s.id}>
          <Row>
            {s.imageUrl && <img src={s.imageUrl} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.lime, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.category}</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 17, color: C.parch, marginTop: 2 }}>{s.title}</div>
              {s.subtitle && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{s.subtitle}</div>}
            </div>
            <Btn onClick={() => openEdit(s)} variant="ghost">Editar</Btn>
            <Btn onClick={() => del(s.id)} variant="danger">Remover</Btn>
          </Row>
        </Card>
      ))}
    </div>
  );
}

// ── Section title ─────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 26, color: C.parch, marginBottom: 24, flex: 1 }}>
      {children}
    </div>
  );
}

// ── MAIN ADMIN PAGE ───────────────────────────────────────────────────────────
type Tab = "settings" | "projects" | "filters" | "experience" | "skills" | "process" | "carousel";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "settings", label: "Configurações", icon: "⚙" },
  { id: "projects", label: "Projetos", icon: "🗂" },
  { id: "filters", label: "Filtros", icon: "🏷" },
  { id: "experience", label: "Experiência", icon: "💼" },
  { id: "skills", label: "Skills", icon: "✦" },
  { id: "process", label: "Processo", icon: "📋" },
  { id: "carousel", label: "Carrossel", icon: "🎞" },
];

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_authed") === "1");
  const [tab, setTab] = useState<Tab>("settings");
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);

  const login = useCallback(() => {
    sessionStorage.setItem("admin_authed", "1");
    setAuthed(true);
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/content")
      .then(r => r.json())
      .then(setContent)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  async function seed() {
    setSeeding(true);
    try {
      const res = await fetch("/api/content/seed", { method: "POST" });
      const d = await res.json();
      setSeedStatus(d.seeded ? "Dados iniciais inseridos!" : "DB já tinha dados.");
      load();
    } catch { setSeedStatus("Erro ao popular DB"); }
    finally { setSeeding(false); setTimeout(() => setSeedStatus(null), 3000); }
  }

  if (!authed) return <LoginGate onLogin={login} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 24px 24px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: 20, color: C.lime }}>bia.design</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.14em", marginTop: 4 }}>PAINEL ADMIN</div>
        </div>
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "12px 24px", border: "none", background: tab === t.id ? C.border : "transparent",
              color: tab === t.id ? C.lime : C.muted, cursor: "pointer", textAlign: "left",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
              borderLeft: tab === t.id ? `3px solid ${C.lime}` : "3px solid transparent",
              transition: "all 0.15s",
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}` }}>
          <a href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.1em", textDecoration: "none" }}>← Ver site</a>
          <div style={{ marginTop: 12 }}>
            <button onClick={seed} disabled={seeding} style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", background: "none", border: `1px solid ${C.border}`, color: C.muted, padding: "6px 10px", borderRadius: 6, cursor: "pointer", width: "100%" }}>
              {seeding ? "Populando…" : "Seed inicial"}
            </button>
            {seedStatus && <div style={{ fontSize: 11, color: C.lime, marginTop: 6, fontFamily: "'DM Mono', monospace" }}>{seedStatus}</div>}
          </div>
          <button onClick={() => { sessionStorage.removeItem("admin_authed"); setAuthed(false); }} style={{ marginTop: 10, fontSize: 11, fontFamily: "'DM Mono', monospace", background: "none", border: "none", color: C.muted, cursor: "pointer", padding: 0 }}>Sair</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto", maxWidth: 900 }}>
        {loading ? (
          <div style={{ color: C.muted, fontFamily: "'DM Mono', monospace", fontSize: 14 }}>Carregando conteúdo…</div>
        ) : !content ? (
          <div>
            <div style={{ color: C.muted, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              API não encontrada. Inicie o servidor e clique em "Seed inicial" para popular o banco de dados.
            </div>
            <Btn onClick={seed} disabled={seeding}>{seeding ? "Populando…" : "Seed inicial"}</Btn>
          </div>
        ) : (
          <>
            {tab === "settings" && <SettingsTab settings={content.settings ?? { id: 0, heroName: "Bia", heroText: "", availabilityStatus: "Disponível para trabalho", email: "", linkedinUrl: "", behanceUrl: "", bio: "", bioSecondary: "" }} />}
            {tab === "projects" && <ProjectsTab projects={content.projects} filterCategories={content.filterCategories} />}
            {tab === "filters" && <FiltersTab filterCategories={content.filterCategories} />}
            {tab === "experience" && <ExperienceTab experience={content.experience} />}
            {tab === "skills" && <SkillsTab skills={content.skills} />}
            {tab === "process" && <ProcessTab processSteps={content.processSteps} />}
            {tab === "carousel" && <CarouselTab carouselSlides={content.carouselSlides} />}
          </>
        )}
      </main>
    </div>
  );
}
