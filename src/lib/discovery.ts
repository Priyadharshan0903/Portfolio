import { education, experience, facts, nav, openSource, posts, projects, site, skillGroups } from "@/content/site";

/** Absolute public URLs use the published site URL, including its GitHub Pages project path. */
export const publicUrl = (path = "") => new URL(path.replace(/^\/+/, ""), site.url).href;

/** Remove the portfolio's display-only rich-text markers from machine-readable copy. */
const plain = (text: string) => text.replace(/\{\{(.*?)\}\}/g, "$1").replace(/\*\*(.*?)\*\*/g, "$1");

export function getProfile() {
  return {
    schemaVersion: 1,
    name: site.name,
    url: publicUrl(),
    role: site.role,
    summary: site.description,
    location: facts.find((fact) => fact.k === "BASED")?.v ?? site.location,
    email: site.email,
    links: {
      github: site.github,
      linkedin: site.linkedin,
      journal: site.journal,
      resume: publicUrl(site.resume),
      llms: publicUrl("llms.txt"),
      sitemap: publicUrl("sitemap.xml"),
    },
    sections: nav.map(({ href, label }) => ({ name: label, url: publicUrl(href) })),
    experience: experience.map((job) => ({
      company: job.company,
      title: job.title,
      period: job.when,
      ...(job.bullets && { highlights: job.bullets.map(plain) }),
      ...(job.roles && {
        roles: job.roles.map((role) => ({
          title: role.title,
          period: role.dates,
          ...(role.summary && { summary: plain(role.summary) }),
          ...(role.bullets && { highlights: role.bullets.map(plain) }),
        })),
      }),
    })),
    skills: skillGroups.map(({ name, items }) => ({ category: name, technologies: items })),
    projects: projects.map((project) => ({
      slug: project.slug,
      name: project.name,
      category: project.tag,
      url: publicUrl(`projects/${project.slug}/`),
      description: project.desc,
      overview: project.overview,
      platform: project.platform,
      technologies: project.stack,
      repository: `${site.github}/${project.repo}`,
      action: project.action,
      highlights: project.highlights,
      setup: project.setup,
      images: project.images.map(({ src, alt, caption }) => ({ url: publicUrl(`projects/${src}`), alt, caption })),
    })),
    openSource: [
      { name: "Pipedream", url: openSource.pipedream.href, description: openSource.pipedream.blurb },
      {
        name: "Zed",
        url: openSource.zed.href,
        description: openSource.zed.blurb,
        contributions: openSource.zed.prs.map(({ id, title, desc }) => ({
          title,
          description: desc,
          url: `${openSource.zed.href}/pull/${id}`,
        })),
      },
    ],
    writing: posts.map(({ title, href, tag, date }) => ({ title, url: href, topic: tag, displayDate: date })),
    education,
  };
}

export function getLlmsText() {
  const skills = skillGroups.map(({ name, items }) => `${name}: ${items.join(", ")}.`).join("\n");
  return `# ${site.name}

> ${site.description}

Based in ${facts.find((fact) => fact.k === "BASED")?.v ?? site.location}. This portfolio covers professional experience, personal software projects, open-source contributions, and technical writing.
Content comes from the same source as the public portfolio and is regenerated on each build.

${skills}

## Profile and experience

- [Structured profile](${publicUrl("profile.json")}): JSON containing experience, skills, every project with technology stacks and repository links, contributions, writing, education, and contact details. Fetch and filter it to answer specific questions.
- [Experience](${publicUrl("#experience")}): Roles at ${experience.map(({ company }) => company).join(", ")}.
- [Resume](${publicUrl(site.resume)}): Downloadable PDF resume.

## Projects

${projects.map((project) => `- [${project.name}](${publicUrl(`projects/${project.slug}/`)}): ${project.desc} Built with ${project.stack.join(", ")}.`).join("\n")}

## Writing and contributions

- [Technical journal](${site.journal}): Engineering notes and lessons from building software.
- [Pipedream](${openSource.pipedream.href}): ${openSource.pipedream.blurb}
- [Zed](${openSource.zed.href}): ${openSource.zed.blurb}

## Contact

- [Email](mailto:${site.email}): ${site.email}
- [LinkedIn](${site.linkedin}): Professional profile.
- [GitHub](${site.github}): Project repositories and development activity.

## Optional

- [Sitemap](${publicUrl("sitemap.xml")}): Canonical portfolio and project page URLs.
`;
}
