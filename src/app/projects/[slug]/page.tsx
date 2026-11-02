import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCommand from "@/components/ProjectCommand";
import ProjectGallery from "@/components/ProjectGallery";
import ThemeToggle from "@/components/ThemeToggle";
import { projects, site } from "@/content/site";
import s from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: `${project.name} · ${site.name}`, description: project.desc };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const repoUrl = `${site.github}/${project.repo}`;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div className={s.page}>
      <a href="#project-content" className={s.skip}>Skip to project</a>
      <header className={s.header}>
        <Link className={s.brand} href="/">Priyadharshan.</Link>
        <nav aria-label="Project navigation" className={s.nav}>
          <Link href="/#projects">All projects</Link>
          <ThemeToggle />
        </nav>
      </header>
      <main id="project-content" className={s.main}>
        <nav aria-label="Breadcrumb" className={s.breadcrumb}>
          <Link href="/#projects">Projects</Link><span aria-hidden="true">/</span><span aria-current="page">{project.name}</span>
        </nav>
        <section className={s.hero} aria-labelledby="project-title">
          <h1 id="project-title">{project.headline}</h1>
          <p className={s.description}>{project.desc}</p>
          <div className={s.actions}>
            <a className={s.primary} href={project.action.href} target="_blank" rel="noopener noreferrer">{project.action.label} <span aria-hidden="true">↗</span></a>
            <a className={s.source} href={repoUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
          <p className={s.platform}>{project.platform}</p>
        </section>
        <div className={s.media}>
          {project.images.length > 0 ? (
            <ProjectGallery name={project.name} images={project.images} />
          ) : project.setup.command ? (
            <ProjectCommand command={project.setup.command} />
          ) : null}
        </div>
        <section className={s.about} aria-labelledby="about-project">
          <h2 id="about-project">Why {project.name}?</h2>
          <div>
            <p>{project.overview}</p>
            <dl className={s.stack}><dt>Built with</dt><dd>{project.stack.join(", ")}</dd></dl>
          </div>
        </section>
        <section className={s.features} aria-labelledby="features-title">
          <h2 id="features-title">What’s inside.</h2>
          <div className={s.featureList}>
            {project.highlights.map((highlight) => (
              <article className={s.feature} key={highlight.title}>
                <h3>{highlight.title}</h3>
                <p>{highlight.desc}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={s.setup} aria-labelledby="get-started">
          <div>
            <h2 id="get-started">{project.setup.title}</h2>
            <p>{project.setup.desc}</p>
            <a className={s.primary} href={project.action.href} target="_blank" rel="noopener noreferrer">{project.action.label} <span aria-hidden="true">↗</span></a>
          </div>
          {project.images.length > 0 && project.setup.command ? (
            <ProjectCommand command={project.setup.command} />
          ) : (
            <a className={s.documentation} href={repoUrl} target="_blank" rel="noopener noreferrer">
              <span>{project.name} on GitHub</span>
              <p>Read the documentation, follow development, or report an issue.</p>
              <span>Open repository <span aria-hidden="true">↗</span></span>
            </a>
          )}
        </section>
        <footer className={s.footer}>
          <Link href="/#projects">Back to all projects</Link>
          <Link href={`/projects/${next.slug}/`}>Next: {next.name} <span aria-hidden="true">→</span></Link>
        </footer>
      </main>
    </div>
  );
}
