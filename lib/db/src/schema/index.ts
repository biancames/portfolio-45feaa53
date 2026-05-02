import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  heroName: text("hero_name").notNull().default("Bia"),
  heroText: text("hero_text").notNull().default("que transforma necessidades dos usuários em experiências digitais claras e funcionais."),
  availabilityStatus: text("availability_status").notNull().default("Disponível para trabalho"),
  email: text("email").notNull().default("biadesign.contate@gmail.com"),
  linkedinUrl: text("linkedin_url").notNull().default("https://linkedin.com/in/biancames"),
  behanceUrl: text("behance_url").notNull().default("https://behance.net/biadesigns"),
  bio: text("bio").notNull().default("Tenho 25 anos, sou caiçara nascida e criada no litoral de SP e, fora das telas, você vai me encontrar entre a praia, cafés, corridas, livros, viagens e bons drinks."),
  bioSecondary: text("bio_secondary").notNull().default("Com base em UX e experiência em sistemas digitais complexos, especialmente nas áreas de logística, transporte e setor público, atuo de ponta a ponta — da pesquisa à entrega. Acredito que bons produtos nascem do entendimento real de quem usa."),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  tags: text("tags").array().notNull().default([]),
  imageUrl: text("image_url"),
  href: text("href").notNull().default("#"),
  filterCategories: text("filter_categories").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  comingSoon: boolean("coming_soon").notNull().default(false),
});

export type Project = typeof projects.$inferSelect;

export const filterCategories = pgTable("filter_categories", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type FilterCategory = typeof filterCategories.$inferSelect;

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  current: boolean("current").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Experience = typeof experience.$inferSelect;

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Skill = typeof skills.$inferSelect;

export const processSteps = pgTable("process_steps", {
  id: serial("id").primaryKey(),
  number: text("number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type ProcessStep = typeof processSteps.$inferSelect;

export const carouselSlides = pgTable("carousel_slides", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type CarouselSlide = typeof carouselSlides.$inferSelect;
