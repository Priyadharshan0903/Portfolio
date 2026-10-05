import { posts, site } from "@/content/site";
import ui from "../ui.module.css";
import s from "./Writing.module.css";

export default function Writing() {
  return (
    <section id="writing" data-scene="writing" className={ui.sectionTight}>
      <div className={ui.container}>
        <div data-reveal="0" className={ui.eyebrow}>
          <span className={ui.num}>05</span>
          <span>/</span>
          <span>Writing</span>
        </div>
        <div className={s.head}>
          <h2 data-reveal="1" className={`${ui.h2} ${s.h2}`}>
            Notes on the things that <span className={ui.accent}>broke first.</span>
          </h2>
          <a data-reveal="2" href={site.journal} target="_blank" rel="noopener" data-magnetic className={s.journal}>
            Open the journal ↗
          </a>
        </div>
        <div className={s.list}>
          {posts.map((p, i) => (
            <a key={p.href} data-reveal={i} href={p.href} target="_blank" rel="noopener" className={`${ui.row} ${s.post}`}>
              <span className={s.date}>{p.date}</span>
              <span className={s.title}>{p.title}</span>
              <span className={s.tag}>{p.tag} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
