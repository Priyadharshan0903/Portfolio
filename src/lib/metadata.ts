import type { Metadata } from "next";
import { projects, site, skillGroups, education, experience } from "@/content/site";
import type { Project } from "@/content/site";
import { publicUrl } from "./discovery";

export function pageMetadata(title: string, description: string, path = "", images: { url: string; alt: string }[] = []): Metadata {
  const url = publicUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, siteName: `${site.name} · Portfolio`, locale: "en_US", images },
    twitter: { card: images.length ? "summary_large_image" : "summary", title, description, images },
  };
}

export function profileStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": publicUrl("#profile"),
    url: publicUrl(),
    name: `${site.name} · Portfolio`,
    description: site.description,
    mainEntity: {
      "@type": "Person",
      "@id": publicUrl("#person"),
      name: site.name,
      url: publicUrl(),
      jobTitle: site.role,
      description: site.description,
      email: `mailto:${site.email}`,
      sameAs: [site.github, site.linkedin],
      worksFor: { "@type": "Organization", name: experience[0].company },
      alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
      knowsAbout: [...new Set(skillGroups.flatMap(({ items }) => items))],
      subjectOf: projects.map((project) => ({ "@type": "WebPage", name: project.name, url: publicUrl(`projects/${project.slug}/`) })),
    },
  };
}

export function projectStructuredData(project: Project) {
  const url = publicUrl(`projects/${project.slug}/`);
  const base = {
    "@context": "https://schema.org",
    "@id": `${url}#software`,
    name: project.name,
    url,
    description: project.desc,
    author: { "@type": "Person", "@id": publicUrl("#person"), name: site.name, url: publicUrl() },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: project.stack.join(", "),
    image: project.images.map(({ src }) => publicUrl(`projects/${src}`)),
  };
  if (project.tag === "Learning project") {
    return { ...base, "@type": "SoftwareSourceCode", codeRepository: `${site.github}/${project.repo}` };
  }
  return {
    ...base,
    "@type": "SoftwareApplication",
    applicationCategory: project.tag,
    softwareRequirements: project.platform,
    featureList: project.highlights.map(({ title, desc }) => `${title}: ${desc}`),
    sameAs: `${site.github}/${project.repo}`,
  };
}

/** Keep JSON-LD as data even if future content contains HTML-like text. */
export const serializeStructuredData = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
