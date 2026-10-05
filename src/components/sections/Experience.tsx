import { experience } from "@/content/site";
import Rich from "../Rich";
import ui from "../ui.module.css";
import s from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" data-scene="experience" className={ui.section}>
      <div className={`${ui.container} ${s.grid}`}>
        <div data-exp-head className={s.head}>
          <div data-reveal="0" className={ui.eyebrow}>
            <span className={ui.num}>02</span>
            <span>/</span>
            <span>Experience</span>
          </div>
          <h2 data-reveal="1" className={`${ui.h2} ${s.h2}`}>
            A career, <span className={ui.accent}>well connected.</span>
          </h2>
          <p data-reveal="2" className={s.intro}>
            Chennai at the center. Scroll and each role lights up the route it opened.
          </p>
        </div>

        <div data-timeline className={s.timeline}>
          <div className={s.track} />
          <div data-tl-fill className={`${s.track} ${s.fill}`} />
          {experience.map((job) => (
            <article key={job.company} data-reveal="0" data-layer={job.layer} className={s.job}>
              <div data-tl-dot className={s.dot} />
              <div className={s.when}>{job.when}</div>
              <h3 className={s.company}>{job.company}</h3>
              <div className={s.title}>{job.title}</div>
              {job.roles && (
                <div className={s.roles}>
                  {job.roles.map((r) => (
                    <div key={r.title} className={s.role}>
                      <div className={s.roleHead}>
                        <span className={s.roleTitle}>{r.title}</span>
                        <span className={s.roleDates}>{r.dates}</span>
                      </div>
                      {r.summary && <p className={s.summary}>{r.summary}</p>}
                      {r.bullets && (
                        <ul className={`${ui.bullets} ${s.roleBullets}`}>
                          {r.bullets.map((b) => (
                            <li key={b}>
                              <span>
                                <Rich text={b} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {job.bullets && (
                <ul className={`${ui.bullets} ${s.jobBullets}`}>
                  {job.bullets.map((b) => (
                    <li key={b}>
                      <span>
                        <Rich text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
