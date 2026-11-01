import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

const ROUTES = ["", "/demo", "/dashboard", "/workflow", "/simulation", "/use-cases", "/docs", "/about", "/roadmap", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${SITE.url}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }));
}
