import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
import { publicUrl } from "@/lib/discovery";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: publicUrl() },
    ...projects.map(({ slug }) => ({ url: publicUrl(`projects/${slug}/`) })),
  ];
}
