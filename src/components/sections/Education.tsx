import { education } from "@/content/site";
import ui from "../ui.module.css";
import s from "./Education.module.css";

export default function Education() {
  return (
    <section id="education" data-scene="education" className={ui.sectionTight}>
      <div className={ui.container}>
        <div data-reveal="0" className={`${ui.eyebrow} ${s.eyebrow}`}>
          <span className={ui.num}>07</span>
          <span>/</span>
          <span>Education</span>
        </div>
        <div data-reveal="1" className={s.card}>
          <div>
            <div className={s.years}>{education.years}</div>
            <h3 className={s.degree}>{education.degree}</h3>
            <div className={s.school}>{education.school}</div>
          </div>
          <div className={s.score}>
            <div className={s.cgpa}>
              <span data-count={education.cgpa}>{education.cgpa}</span>
              <span className={s.outOf}>/10</span>
            </div>
            <div className={s.label}>CGPA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
