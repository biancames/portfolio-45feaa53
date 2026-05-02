import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  siteSettings,
  projects,
  filterCategories,
  experience,
  skills,
  processSteps,
  carouselSlides,
} from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// ── SEED ──────────────────────────────────────────────────────────────────────
router.post("/content/seed", async (req, res) => {
  try {
    const existing = await db.select().from(siteSettings).limit(1);
    if (existing.length > 0) {
      res.json({ seeded: false, message: "Already seeded" });
      return;
    }

    await db.insert(siteSettings).values({});

    await db.insert(filterCategories).values([
      { label: "Todos", sortOrder: 0 },
      { label: "Product Design", sortOrder: 1 },
      { label: "UX/UI Design", sortOrder: 2 },
      { label: "Graphic Design", sortOrder: 3 },
    ]);

    await db.insert(projects).values([
      {
        title: "SisPat",
        description: "Sistema público de patrimônio imobiliário. Redesign completo com foco em acessibilidade e eficiência para servidores públicos.",
        tags: ["Redesign", "UX Research", "UX Design"],
        filterCategories: ["Product Design", "UX/UI Design"],
        imageUrl: "https://picsum.photos/seed/sispatbig/1200/700",
        featured: true,
        sortOrder: 0,
      },
      {
        title: "SGTran",
        description: "Sistema de gestão de transporte. Fluxos complexos simplificados com foco no operador logístico.",
        tags: ["Logística", "UX Design", "Sistema"],
        filterCategories: ["Product Design", "UX/UI Design"],
        imageUrl: "https://picsum.photos/seed/sgtran/800/500",
        featured: true,
        sortOrder: 1,
      },
      {
        title: "MundoLingo App",
        description: "App mobile de eventos e idiomas para comunidades de aprendizado ao redor do mundo.",
        tags: ["Mobile App", "Product Design", "Eventos"],
        filterCategories: ["Product Design", "UX/UI Design"],
        imageUrl: "https://picsum.photos/seed/mundolingo/800/500",
        featured: true,
        sortOrder: 2,
      },
      {
        title: "SisPat Visual Identity",
        description: "Identidade visual do sistema SisPat: logotipo, paleta de cores e guia de estilo para o produto público.",
        tags: ["Branding", "Visual Identity", "Identidade"],
        filterCategories: ["Graphic Design"],
        imageUrl: "https://picsum.photos/seed/sispatbrand/800/500",
        featured: false,
        sortOrder: 3,
      },
      {
        title: "Cartazes Culturais",
        description: "Série de cartazes para eventos culturais do litoral paulista. Mistura de tipografia editorial e fotografia.",
        tags: ["Poster Design", "Tipografia", "Editorial"],
        filterCategories: ["Graphic Design"],
        imageUrl: "https://picsum.photos/seed/posters/800/500",
        featured: false,
        sortOrder: 4,
      },
      {
        title: "Em breve",
        description: "",
        tags: [],
        filterCategories: ["Product Design", "UX/UI Design", "Graphic Design"],
        comingSoon: true,
        sortOrder: 5,
      },
    ]);

    await db.insert(experience).values([
      { role: "Product Designer", company: "Empresa atual", period: "2024 — presente", current: true, sortOrder: 0 },
      { role: "UX/UI Designer", company: "Empresa anterior", period: "2022 — 2024", current: false, sortOrder: 1 },
      { role: "Designer Jr.", company: "Primeira empresa", period: "2021 — 2022", current: false, sortOrder: 2 },
    ]);

    await db.insert(skills).values([
      { label: "UX Research", sortOrder: 0 },
      { label: "UX Design", sortOrder: 1 },
      { label: "Product Design", sortOrder: 2 },
      { label: "Interaction Design", sortOrder: 3 },
      { label: "Design System", sortOrder: 4 },
      { label: "Prototipação", sortOrder: 5 },
      { label: "Visual Design", sortOrder: 6 },
    ]);

    await db.insert(processSteps).values([
      { number: "01", title: "Descoberta", description: "Entender o problema, os usuários e o contexto antes de qualquer solução.", sortOrder: 0 },
      { number: "02", title: "Definição", description: "Sintetizar insights e alinhar os objetivos do produto com as necessidades reais.", sortOrder: 1 },
      { number: "03", title: "Ideação", description: "Explorar soluções diversas com criatividade antes de escolher o caminho.", sortOrder: 2 },
      { number: "04", title: "Prototipação", description: "Dar forma às melhores ideias com rapidez e testar hipóteses antes de construir.", sortOrder: 3 },
      { number: "05", title: "Entrega", description: "Testar, refinar e lançar com impacto real. Acompanhar e iterar continuamente.", sortOrder: 4 },
    ]);

    await db.insert(carouselSlides).values([
      { category: "livro favorito", title: "Um Estudo em Vermelho", subtitle: "Arthur Conan Doyle", sortOrder: 0 },
      { category: "música do momento", title: "Vienna", subtitle: "Billy Joel", sortOrder: 1 },
      { category: "viagem favorita", title: "Destino", subtitle: "troque pela sua foto", sortOrder: 2 },
      { category: "drink favorito", title: "Moscow Mule", subtitle: "", sortOrder: 3 },
      { category: "meu pet", title: "Nome do pet", subtitle: "troque pela sua foto", sortOrder: 4 },
    ]);

    res.json({ seeded: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Seed failed" });
  }
});

// ── GET ALL CONTENT ───────────────────────────────────────────────────────────
router.get("/content", async (req, res) => {
  try {
    const [settingsRows, projectRows, filterRows, expRows, skillRows, stepRows, slideRows] = await Promise.all([
      db.select().from(siteSettings).limit(1),
      db.select().from(projects).orderBy(projects.sortOrder),
      db.select().from(filterCategories).orderBy(filterCategories.sortOrder),
      db.select().from(experience).orderBy(experience.sortOrder),
      db.select().from(skills).orderBy(skills.sortOrder),
      db.select().from(processSteps).orderBy(processSteps.sortOrder),
      db.select().from(carouselSlides).orderBy(carouselSlides.sortOrder),
    ]);
    res.json({
      settings: settingsRows[0] ?? null,
      projects: projectRows,
      filterCategories: filterRows,
      experience: expRows,
      skills: skillRows,
      processSteps: stepRows,
      carouselSlides: slideRows,
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// ── SETTINGS ─────────────────────────────────────────────────────────────────
router.put("/content/settings", async (req, res) => {
  try {
    const rows = await db.select().from(siteSettings).limit(1);
    if (rows.length === 0) {
      const inserted = await db.insert(siteSettings).values(req.body).returning();
      res.json(inserted[0]);
    } else {
      const updated = await db.update(siteSettings).set({ ...req.body, updatedAt: new Date() }).where(eq(siteSettings.id, rows[0].id)).returning();
      res.json(updated[0]);
    }
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// ── PROJECTS ──────────────────────────────────────────────────────────────────
router.get("/content/projects", async (req, res) => {
  try {
    const rows = await db.select().from(projects).orderBy(projects.sortOrder);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/content/projects", async (req, res) => {
  try {
    const rows = await db.select().from(projects).orderBy(projects.sortOrder);
    const inserted = await db.insert(projects).values({ ...req.body, sortOrder: rows.length }).returning();
    res.json(inserted[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.put("/content/projects/:id", async (req, res) => {
  try {
    const updated = await db.update(projects).set(req.body).where(eq(projects.id, Number(req.params.id))).returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.delete("/content/projects/:id", async (req, res) => {
  try {
    await db.delete(projects).where(eq(projects.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── PROJECT BY SLUG ───────────────────────────────────────────────────────────
router.get("/content/projects/slug/:slug", async (req, res) => {
  try {
    const rows = await db.select().from(projects).where(eq(projects.slug, req.params.slug)).limit(1);
    if (rows.length === 0) { res.status(404).json({ error: "Not found" }); return; }
    res.json(rows[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── FILTER CATEGORIES ─────────────────────────────────────────────────────────
router.get("/content/filter-categories", async (req, res) => {
  try {
    const rows = await db.select().from(filterCategories).orderBy(filterCategories.sortOrder);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/content/filter-categories", async (req, res) => {
  try {
    const rows = await db.select().from(filterCategories);
    const inserted = await db.insert(filterCategories).values({ ...req.body, sortOrder: rows.length }).returning();
    res.json(inserted[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.put("/content/filter-categories/:id", async (req, res) => {
  try {
    const updated = await db.update(filterCategories).set(req.body).where(eq(filterCategories.id, Number(req.params.id))).returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.delete("/content/filter-categories/:id", async (req, res) => {
  try {
    await db.delete(filterCategories).where(eq(filterCategories.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
router.get("/content/experience", async (req, res) => {
  try {
    const rows = await db.select().from(experience).orderBy(experience.sortOrder);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/content/experience", async (req, res) => {
  try {
    const rows = await db.select().from(experience);
    const inserted = await db.insert(experience).values({ ...req.body, sortOrder: rows.length }).returning();
    res.json(inserted[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.put("/content/experience/:id", async (req, res) => {
  try {
    const updated = await db.update(experience).set(req.body).where(eq(experience.id, Number(req.params.id))).returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.delete("/content/experience/:id", async (req, res) => {
  try {
    await db.delete(experience).where(eq(experience.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── SKILLS ────────────────────────────────────────────────────────────────────
router.get("/content/skills", async (req, res) => {
  try {
    const rows = await db.select().from(skills).orderBy(skills.sortOrder);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/content/skills", async (req, res) => {
  try {
    const rows = await db.select().from(skills);
    const inserted = await db.insert(skills).values({ ...req.body, sortOrder: rows.length }).returning();
    res.json(inserted[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.put("/content/skills/:id", async (req, res) => {
  try {
    const updated = await db.update(skills).set(req.body).where(eq(skills.id, Number(req.params.id))).returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.delete("/content/skills/:id", async (req, res) => {
  try {
    await db.delete(skills).where(eq(skills.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
router.get("/content/process", async (req, res) => {
  try {
    const rows = await db.select().from(processSteps).orderBy(processSteps.sortOrder);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.put("/content/process/:id", async (req, res) => {
  try {
    const updated = await db.update(processSteps).set(req.body).where(eq(processSteps.id, Number(req.params.id))).returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── CAROUSEL SLIDES ───────────────────────────────────────────────────────────
router.get("/content/carousel", async (req, res) => {
  try {
    const rows = await db.select().from(carouselSlides).orderBy(carouselSlides.sortOrder);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/content/carousel", async (req, res) => {
  try {
    const rows = await db.select().from(carouselSlides);
    const inserted = await db.insert(carouselSlides).values({ ...req.body, sortOrder: rows.length }).returning();
    res.json(inserted[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.put("/content/carousel/:id", async (req, res) => {
  try {
    const updated = await db.update(carouselSlides).set(req.body).where(eq(carouselSlides.id, Number(req.params.id))).returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

router.delete("/content/carousel/:id", async (req, res) => {
  try {
    await db.delete(carouselSlides).where(eq(carouselSlides.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

export default router;
