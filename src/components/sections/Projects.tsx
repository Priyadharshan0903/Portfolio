import Image from "next/image";
import Link from "next/link";
import { projects, site } from "@/content/site";
import { asset } from "@/lib/asset";
import ui from "../ui.module.css";
import s from "./Projects.module.css";

export default function Projects() {
  const apps = projects.filter((project) => project.images.length > 0);
  const tools = projects.filter((project) => project.images.length === 0);

  return (
    <section id="projects" data-scene="projects" aria-labelledby="projects-title" className={ui.section}>
      <div className={ui.container}>
        <div className={s.intro}>
          <h2 id="projects-title" data-reveal="0" className={`${ui.h2} ${s.h2}`}>Things I’ve built.</h2>
          <p data-reveal="1">Tools I wanted in my own day, built to be useful in yours. Explore the apps, see how they work, and try them yourself.</p>
        </div>
        <div className={s.showcase}>
          {apps.map((project, index) => {
            const image = project.images[0];
            return (
              <article key={project.slug} data-reveal={index % 2} className={s.project}>
                <div className={s.copy}>
                  <h3><Link href={`/projects/${project.slug}/`}>{project.name}</Link></h3>
                  <p>{project.desc}</p>
                  <span className={s.platform}>{project.platform}</span>
                  <Link className={s.explore} href={`/projects/${project.slug}/`}>
                    Explore {project.name}<span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <Link href={`/projects/${project.slug}/`} className={s.preview} aria-label={`Explore ${project.name}`}>
                  <Image src={asset(`projects/${image.src}`)} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 65vw" className={s.image} />
                </Link>
              </article>
            );
          })}
        </div>
        <div className={s.tools}>
          <div className={s.toolsIntro}>
            <h3>Under the hood.</h3>
            <p>A workspace for local projects, a pair of account switchers, and a lab for breaking things on purpose.</p>
          </div>
          <div className={s.toolList}>
            {tools.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}/`} className={s.tool}>
                <h4>{project.name}</h4>
                <p>{project.desc}</p>
                <span className={s.toolAction}>Explore project <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
        <a className={s.github} href={site.github} target="_blank" rel="noopener noreferrer">More on GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
