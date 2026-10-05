import { site, stats } from "@/content/site";
import { asset } from "@/lib/asset";
import ui from "../ui.module.css";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" data-scene="hero" className={s.hero}>
      <div className={s.main}>
        <div className={s.copy}>
          <div data-hero="0" className={s.kicker}>
            <span className={s.square} />
            <span>{site.role}</span>
          </div>
          <h1 data-hero="1" className={s.title}>
            I build the <span className={ui.accent}>layers</span> other engineers stand on.
          </h1>
          <p data-hero="2" className={s.lede}>
            <span className={ui.em}>Platform Engineer, Software Engineer and Infra Enthusiast.</span> I build reliable platforms,
            integrations and developer tools, and own them end to end.
          </p>
          <div data-hero="3" className={s.ctas}>
            <a href="#projects" data-magnetic className={ui.btnPrimary}>
              View My Work <span aria-hidden>→</span>
            </a>
            <a href={asset(site.resume)} download data-magnetic className={ui.btnGhost}>
              Download Resume <span aria-hidden className={ui.num}>↓</span>
            </a>
            <a href="#contact" data-magnetic className={`${ui.underline} ${s.contactLink}`}>
              Contact Me
            </a>
          </div>
        </div>
        <div data-hero="4" className={`${s.location} ${ui.wideOnly}`}>
          {site.location}
        </div>
      </div>
      <div data-hero="5" className={s.stats}>
        {stats.map((st) => (
          <div key={st.label} className={s.stat}>
            <div className={s.value}>
              <span data-count={st.value}>{st.value}</span>
              {st.suffix}
            </div>
            <div className={s.label}>{st.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
