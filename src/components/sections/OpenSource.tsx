import { openSource } from "@/content/site";
import ui from "../ui.module.css";
import s from "./OpenSource.module.css";

export default function OpenSource() {
  const { pipedream, zed } = openSource;
  return (
    <section id="opensource" data-scene="opensource" className={ui.sectionTight}>
      <div className={ui.container}>
        <div data-reveal="0" className={`${ui.eyebrow} ${s.eyebrow}`}>
          <span className={ui.num}>04</span>
          <span>/</span>
          <span>Open Source</span>
        </div>
        <div className={s.list}>
          <a data-reveal="0" href={pipedream.href} target="_blank" rel="noopener" className={`${s.item} ${s.link}`}>
            <span className={s.name}>Pipedream</span>
            <span className={s.blurbRow}>
              <span>{pipedream.blurb}</span>
              <span className={s.arrow} aria-hidden>
                ↗
              </span>
            </span>
          </a>
          <div data-reveal="1" className={s.item}>
            <a href={zed.href} target="_blank" rel="noopener" className={`${s.name} ${s.zed}`}>
              Zed
            </a>
            <div className={s.zedBody}>
              <span className={s.blurb}>{zed.blurb}</span>
              <div className={s.prs}>
                {zed.prs.map((pr) => (
                  <a key={pr.id} href={`${zed.href}/pull/${pr.id}`} target="_blank" rel="noopener" className={s.pr}>
                    <span className={s.prId}>#{pr.id}</span>
                    <span className={s.prText}>
                      <span className={s.prTitle}>{pr.title}</span>
                      <span className={s.prDesc}>{pr.desc}</span>
                    </span>
                    <span className={ui.num} aria-hidden>
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
