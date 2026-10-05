import { facts } from "@/content/site";
import ui from "../ui.module.css";
import s from "./About.module.css";

export default function About() {
  return (
    <section id="about" data-scene="about" className={ui.section}>
      <div data-about-col className={`${ui.container} ${s.grid}`}>
        <div data-reveal="0" className={ui.eyebrow}>
          <span className={ui.num}>01</span>
          <span>/</span>
          <span>About</span>
        </div>
        <h2 data-reveal="1" className={`${ui.h2} ${s.h2}`}>
          Infrastructure and product, owned <span className={ui.accent}>end to end.</span>
        </h2>
        <p data-reveal="2" className={s.body}>
          Platform-focused Software Engineer with 3+ years of experience owning infrastructure and product features end to end.
          Currently on the <span className={ui.em}>Production Engineering team of Workday&apos;s Developer Platform</span>, building
          automation and tooling for production readiness. Previously ran Kubernetes-based microservices, CI/CD pipelines and
          secrets management alongside high-traffic product work. Shipped{" "}
          <span className={ui.em}>30+ open-source SaaS integrations</span> at Pipedream.
        </p>
        <dl data-reveal="3" className={s.facts}>
          {facts.map((f) => (
            <div key={f.k} className={s.fact}>
              <dt>{f.k}</dt>
              <dd className={f.accent ? s.loves : undefined}>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
