import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/menu`,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
