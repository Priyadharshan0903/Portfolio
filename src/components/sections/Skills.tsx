import type { CSSProperties } from "react";
import { skillGroups } from "@/content/site";
import { NET } from "@/lib/skillNet";
import ui from "../ui.module.css";
import s from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" data-scene="skills" className={ui.section}>
      <div className={ui.container}>
        <div data-reveal="0" className={ui.eyebrow}>
          <span className={ui.num}>06</span>
          <span>/</span>
          <span>Skills</span>
        </div>
        <div className={s.head}>
          <h2 data-reveal="1" className={ui.h2}>
            The stack, <span className={ui.accent}>wired together.</span>
          </h2>
          <p data-reveal="2" className={`${s.hint} ${ui.wideOnly}`}>
            hover a node to trace its cluster
          </p>
        </div>

        {/* Desktop: drifting network graph (animated by Interactions) */}
        <div data-net className={`${s.net} ${ui.wideOnly}`} aria-hidden>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={s.svg}>
            {NET.edges.map((e, k) => (
              <line
                key={k}
                data-edge
                data-a={e.a}
                data-b={e.b}
                data-group={e.g}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                style={{ stroke: e.color, opacity: e.op }}
              />
            ))}
          </svg>
          {NET.nodes.map((n) => (
            <span
              key={n.i}
              data-node={n.i}
              data-group={n.g}
              className={n.hub ? (n.i === 0 ? `${s.hub} ${s.hubPrimary}` : s.hub) : s.node}
              style={{ left: `${n.x}%`, top: `${n.y}%`, "--c": n.color } as CSSProperties}
            >
              {n.name}
            </span>
          ))}
        </div>

        {/* Mobile and screen readers: grouped lists */}
        <div className={s.groups}>
          {skillGroups.map((g) => (
            <div key={g.g} className={s.group}>
              <h3 className={s.groupName} style={{ color: g.color }}>
                {g.name}
              </h3>
              <ul className={s.items}>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
