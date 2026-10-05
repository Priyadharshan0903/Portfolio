import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import CopyEmail from "../CopyEmail";
import ui from "../ui.module.css";
import s from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" data-scene="contact" className={s.contact}>
      <div className={s.inner}>
        <div data-reveal="0" className={s.eyebrow}>
          <span className={ui.num}>08</span> / Contact
        </div>
        <h2 data-reveal="1" className={s.title}>
          Let&apos;s make a <span className={ui.accent}>new connection.</span>
        </h2>
        <div data-reveal="2" className={s.actions}>
          <a href={`mailto:${site.email}`} data-magnetic className={`${ui.btnPrimary} ${s.email}`}>
            {site.email}
          </a>
          <CopyEmail email={site.email} className={s.copy} />
        </div>
        <div data-reveal="3" className={s.links}>
          <a href={site.github} target="_blank" rel="noopener" className={ui.underline}>
            GitHub
          </a>
          <a href={site.journal} target="_blank" rel="noopener" className={ui.underline}>
            Blog
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener" className={ui.underline}>
            LinkedIn
          </a>
          <a href={asset(site.resume)} download className={ui.underline}>
            Resume
          </a>
        </div>
      </div>
      <footer className={s.footer}>
        <span>Built with curiosity in Chennai.</span>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </footer>
    </section>
  );
}
