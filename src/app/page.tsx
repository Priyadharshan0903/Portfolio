import Header from "@/components/Header";
import Interactions from "@/components/Interactions";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import OpenSource from "@/components/sections/OpenSource";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Writing from "@/components/sections/Writing";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      <canvas data-gl className={styles.globe} aria-hidden />
      <div data-progress className={styles.progress} />
      <div data-cursor="dot" />
      <div data-cursor="ring" />
      <Header />
      <main className={styles.main}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Writing />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Interactions />
    </div>
  );
}
