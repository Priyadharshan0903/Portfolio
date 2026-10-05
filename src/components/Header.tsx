import { nav, site } from "@/content/site";
import styles from "./Header.module.css";
import ui from "./ui.module.css";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.brand}>
        {site.name}
      </a>
      <div className={styles.right}>
        <nav className={`${styles.nav} ${ui.wideOnly}`} aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
