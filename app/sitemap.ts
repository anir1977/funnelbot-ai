import type { MetadataRoute } from "next";
import { demos } from "@/lib/demos";

const BASE = "https://www.funnelslibrary.com";

/**
 * The demo sites are the bulk of the crawlable surface and each targets a
 * sector search ("site web restaurant Maroc"), so they belong here rather than
 * being left for the crawler to stumble onto from the portfolio grid.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/demo`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...demos.map((d) => ({
      url: `${BASE}/demo/${d.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
