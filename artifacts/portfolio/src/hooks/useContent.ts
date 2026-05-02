import { useState, useEffect } from "react";
import type { ContentData } from "@/data/defaults";
import {
  DEFAULT_SETTINGS,
  DEFAULT_PROJECTS,
  DEFAULT_FILTER_CATEGORIES,
  DEFAULT_EXPERIENCE,
  DEFAULT_SKILLS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_CAROUSEL_SLIDES,
} from "@/data/defaults";

const FALLBACK: ContentData = {
  settings: DEFAULT_SETTINGS,
  projects: DEFAULT_PROJECTS,
  filterCategories: DEFAULT_FILTER_CATEGORIES,
  experience: DEFAULT_EXPERIENCE,
  skills: DEFAULT_SKILLS,
  processSteps: DEFAULT_PROCESS_STEPS,
  carouselSlides: DEFAULT_CAROUSEL_SLIDES,
};

export function useContent() {
  const [data, setData] = useState<ContentData>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: ContentData) => {
        setData({
          settings: d.settings ?? DEFAULT_SETTINGS,
          projects: d.projects?.length ? d.projects : DEFAULT_PROJECTS,
          filterCategories: d.filterCategories?.length ? d.filterCategories : DEFAULT_FILTER_CATEGORIES,
          experience: d.experience?.length ? d.experience : DEFAULT_EXPERIENCE,
          skills: d.skills?.length ? d.skills : DEFAULT_SKILLS,
          processSteps: d.processSteps?.length ? d.processSteps : DEFAULT_PROCESS_STEPS,
          carouselSlides: d.carouselSlides?.length ? d.carouselSlides : DEFAULT_CAROUSEL_SLIDES,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { ...data, loading };
}
