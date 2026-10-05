import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

const PAGES = [
  { path: "", priority: 1 },
  { path: "/solutions", priority: 0.8 },
  { path: "/realisations", priority: 0.8 },
  { path: "/offres", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${SITE.url}${p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
