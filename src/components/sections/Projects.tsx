import { projects, site } from "@/content/site";
import ui from "../ui.module.css";
import s from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" data-scene="projects" className={ui.section}>
      <div className={ui.container}>
        <div data-reveal="0" className={ui.eyebrow}>
          <span className={ui.num}>03</span>
          <span>/</span>
          <span>Projects</span>
        </div>
        <h2 data-reveal="1" className={`${ui.h2} ${s.h2}`}>
          Small tools that <span className={ui.accent}>remove friction.</span>
        </h2>
        <div className={s.grid}>
          {projects.map((p, i) => (
            <div key={p.repo} data-reveal={i % 3} className={s.cell}>
              <a href={p.liveUrl ?? `${site.github}/${p.repo}`} target="_blank" rel="noopener" data-tilt className={s.card}>
                <div className={s.meta}>
                  <span>P/{String(i + 1).padStart(2, "0")}</span>
                  <span className={ui.num}>{p.tag}</span>
                </div>
                <div>
                  <h3 className={s.name}>{p.name}</h3>
                  <p className={s.desc}>{p.desc}</p>
                </div>
                <div className={s.foot}>
                  <span>{p.liveUrl ? `Download ${p.name}` : p.repo}</span>
                  <span className={ui.num} aria-hidden>
                    ↗
                  </span>
                </div>
              </a>
            </div>
          ))}
          <div data-reveal={projects.length % 3} className={`${s.cell} ${s.more}`}>
            <a href={site.github} target="_blank" rel="noopener">
              More on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
