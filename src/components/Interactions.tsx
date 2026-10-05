"use client";

import { useEffect } from "react";
import type { Globe, Key } from "@/lib/globe";
import { NET } from "@/lib/skillNet";

// Globe framing per section (see Globe.frame). Some are refined from layout in keyFor().
const KEYS: Record<string, Key> = {
  hero: { fx: 0.22, fy: 0, z: 12.5, op: 1, all: 0 },
  about: { fx: 0.27, fy: 0, z: 13.5, op: 1, all: 0 },
  experience: { fx: -0.27, fy: -0.06, z: 14, op: 1, all: 0 },
  projects: { fx: -0.27, fy: -0.06, z: 14, op: 0, all: 0 },
  opensource: { fx: -0.27, fy: -0.06, z: 14, op: 0, all: 0 },
  writing: { fx: -0.27, fy: -0.06, z: 14, op: 0, all: 0 },
  skills: { fx: -0.27, fy: -0.06, z: 14, op: 0, all: 0 },
  education: { fx: 0, fy: 0.2, z: 23, op: 0, all: 1 },
  contact: { fx: 0, fy: 0.2, z: 23, op: 1, all: 1 },
};

const TAN15 = Math.tan(Math.PI / 12);
const zFor = (H: number, rpx: number, min: number) => Math.max(min, Math.min(60, (1.18 * H) / (TAN15 * rpx)));

/**
 * Wires up every imperative effect of the page against server-rendered markup via data-attributes:
 * hero/scroll reveals, counters, custom cursor, magnetic buttons, card tilt, scroll progress,
 * experience timeline, skills network drift and the WebGL globe.
 */
export default function Interactions() {
  useEffect(() => {
    const root = document.documentElement;
    const $ = <E extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<E>(s)];
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window | Document | HTMLElement, ev: K | string, fn: (e: never) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn as EventListener, opts);
      cleanups.push(() => t.removeEventListener(ev, fn as EventListener, opts));
    };

    const state = { scene: "hero", lit: 3, contactTight: false };
    const mouse = { px: -9999, py: -9999, nx: 0, ny: 0, sx: 0, sy: 0 };

    // ---- reveals: CSS holds [data-hero]/[data-reveal] hidden while html.motion is set
    if (!rm) {
      requestAnimationFrame(() => requestAnimationFrame(() => $("[data-hero]").forEach((el) => el.setAttribute("data-shown", ""))));
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      $("[data-reveal]").forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ---- counters
    if (!rm) {
      const els = $("[data-count]");
      els.forEach((el) => (el.textContent = "0"));
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            const el = e.target as HTMLElement;
            const raw = el.dataset.count!, to = parseFloat(raw), dec = (raw.split(".")[1] || "").length;
            const t0 = performance.now() + 500, dur = 1800;
            const step = (now: number) => {
              const k = Math.max(0, Math.min(1, (now - t0) / dur));
              el.textContent = (to * (1 - Math.pow(1 - k, 4))).toFixed(dec);
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }),
        { threshold: 0.5 },
      );
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ---- custom cursor
    const [dot] = $("[data-cursor=dot]"), [ring] = $("[data-cursor=ring]");
    const cur = fine && dot && ring ? { x: innerWidth / 2, y: innerHeight / 2, hover: false } : null;
    if (cur) {
      root.classList.add("has-cursor");
      cleanups.push(() => root.classList.remove("has-cursor"));
      on(document, "mouseover", (e: MouseEvent) => {
        cur.hover = !!(e.target as Element).closest?.("a,button,[data-node]");
      });
    }
    on(window, "mousemove", (e: MouseEvent) => {
      mouse.px = e.clientX;
      mouse.py = e.clientY;
      mouse.nx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ny = (e.clientY / innerHeight) * 2 - 1;
      if (cur) {
        dot.style.opacity = "1";
        ring.style.opacity = ".8";
      }
    }, { passive: true });
    on(document, "mouseleave", () => {
      mouse.px = -9999;
      if (cur) dot.style.opacity = ring.style.opacity = "0";
    });

    // ---- magnetic buttons
    if (fine)
      $("[data-magnetic]").forEach((el) => {
        on(el, "mousemove", (e: MouseEvent) => {
          if (rm) return;
          const r = el.getBoundingClientRect();
          el.style.transition = "transform .2s ease-out";
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        });
        on(el, "mouseleave", () => {
          el.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1)";
          el.style.transform = "";
        });
      });

    // ---- project card tilt + pointer glow
    $("[data-tilt]").forEach((el) => {
      on(el, "mousemove", (e: MouseEvent) => {
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
        if (!rm) {
          el.style.transition = "transform .12s linear";
          el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg)`;
        }
      });
      on(el, "mouseleave", () => {
        el.style.transition = "transform .6s cubic-bezier(.2,.7,.2,1)";
        el.style.transform = "";
        el.style.setProperty("--my", "-30%");
      });
    });

    // ---- skills network: hover highlights a cluster, nodes drift
    let net: { nodes: HTMLElement[]; edges: { el: SVGLineElement; a: number; b: number; g: string; op: number }[]; pts: number[][]; visible: boolean } | null = null;
    const [wrap] = $("[data-net]");
    if (wrap) {
      const nodes = $("[data-node]").sort((a, b) => +a.dataset.node! - +b.dataset.node!);
      const edges = $<SVGLineElement>("[data-edge]").map((el) => ({ el, a: +el.dataset.a!, b: +el.dataset.b!, g: el.dataset.group!, op: +el.style.opacity || 0.4 }));
      net = { nodes, edges, pts: NET.nodes.map((n) => [n.x, n.y]), visible: false };
      const apply = (g: string | null) => {
        nodes.forEach((n) => (n.style.opacity = g && n.dataset.group !== g ? ".2" : "1"));
        edges.forEach((e) => (e.el.style.opacity = String(g ? (e.g === g ? 0.95 : 0.06) : e.op)));
      };
      on(wrap, "mouseover", (e: MouseEvent) => apply((e.target as Element).closest<HTMLElement>("[data-node]")?.dataset.group ?? null));
      on(wrap, "mouseleave", () => apply(null));
      const io = new IntersectionObserver((es) => net && (net.visible = es[0].isIntersecting));
      io.observe(wrap);
      cleanups.push(() => io.disconnect());
    }
    const renderNet = (t: number) => {
      if (!net || !net.visible || rm) return;
      NET.nodes.forEach((n, k) => {
        const amp = n.hub ? 0.3 : 0.6;
        const x = n.x + Math.sin(t * 0.5 + k * 1.7) * amp, y = n.y + Math.cos(t * 0.43 + k * 2.3) * amp * 1.4;
        net!.pts[k][0] = x;
        net!.pts[k][1] = y;
        const el = net!.nodes[k];
        if (el) {
          el.style.left = x.toFixed(2) + "%";
          el.style.top = y.toFixed(2) + "%";
        }
      });
      net.edges.forEach((e) => {
        const a = net!.pts[e.a], b = net!.pts[e.b];
        e.el.setAttribute("x1", a[0].toFixed(2));
        e.el.setAttribute("y1", a[1].toFixed(2));
        e.el.setAttribute("x2", b[0].toFixed(2));
        e.el.setAttribute("y2", b[1].toFixed(2));
      });
    };

    // ---- scroll: active scene, progress bar, timeline fill + dots
    const scenes = $("[data-scene]");
    const [progress] = $("[data-progress]"), [tl] = $("[data-timeline]"), [fill] = $("[data-tl-fill]");
    const tlDots = $("[data-tl-dot]"), layers = $("[data-layer]");
    const onScroll = () => {
      const vh = innerHeight;
      let act = "hero";
      scenes.forEach((s) => {
        if (s.getBoundingClientRect().top <= vh * 0.5) act = s.dataset.scene!;
      });
      state.scene = act;
      const max = root.scrollHeight - vh;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      const line = vh * 0.6;
      let lit = 3;
      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        fill.style.transform = `scaleY(${rm ? 1 : Math.max(0, Math.min(1, (line - r.top) / r.height))})`;
        tlDots.forEach((d) => d.toggleAttribute("data-on", rm || d.getBoundingClientRect().top < line));
        if (act === "experience")
          layers.forEach((a) => {
            if (a.getBoundingClientRect().top < line) lit = +a.dataset.layer!;
          });
      }
      state.lit = lit;
    };
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    // ---- globe framing, derived from where the copy sits so the globe fills empty space
    const keyFor = (name: string): Key => {
      const k = { ...(KEYS[name] || KEYS.hero) };
      const W = innerWidth, H = innerHeight;
      if (name === "contact" || name === "education") {
        const eb = document.querySelector("#contact [data-reveal]");
        if (eb) {
          const top = 70, ey = Math.min(H, eb.getBoundingClientRect().top), gap = Math.max(0, ey - top);
          state.contactTight = gap < 120;
          const rpx = Math.max(40, gap / 2 - 12), cy = top + gap / 2;
          k.fy = (H / 2 - cy) / H;
          k.z = zFor(H, rpx, 20);
        }
      }
      if (name === "hero" && W < 1100 && W >= 820) {
        k.fx = 0.33;
        k.z = 17;
      }
      if (name === "experience" && W >= 820) {
        const head = document.querySelector("[data-exp-head]"), tlEl = document.querySelector("[data-timeline]");
        if (head && tlEl) {
          const hb = head.getBoundingClientRect(), tb = tlEl.getBoundingClientRect();
          const left = Math.max(24, hb.left), right = tb.left - 48, top = Math.max(90, hb.bottom + 36), bottom = H - 36;
          const rpx = Math.min(right - left, bottom - top) / 2;
          if (rpx < 90) k.op = 0;
          else {
            k.z = zFor(H, rpx, 12);
            k.fx = (left + right) / 2 / W - 0.5;
            k.fy = (H / 2 - (top + bottom) / 2) / H;
          }
        }
      }
      if (name === "about" && W >= 820) {
        const col = document.querySelector("[data-about-col]");
        if (col) {
          let right = 0;
          [...col.children].forEach((c) => (right = Math.max(right, c.getBoundingClientRect().right)));
          const avail = W - right - 40 - 56;
          if (avail < 240) k.op = 0;
          else {
            const rpx = Math.min(avail / 2, H * 0.32);
            k.z = zFor(H, rpx, 12);
            k.fx = (right + 40 + rpx) / W - 0.5;
          }
        }
      }
      if (W < 820) {
        k.fx = 0;
        k.z *= 1.25;
        k.op *= name === "contact" ? 0.5 : 0;
      }
      return k;
    };

    // ---- globe (three.js loaded lazily so it never blocks first paint)
    let globe: Globe | null = null;
    let disposed = false;
    const isLight = () => root.dataset.theme === "light";
    const [canvas] = $<HTMLCanvasElement>("[data-gl]");
    if (canvas)
      import("@/lib/globe")
        .then(({ Globe }) => {
          if (disposed) return;
          try {
            globe = new Globe(canvas, keyFor(state.scene));
            globe.setTheme(isLight());
          } catch {
            // WebGL unavailable: the page works without the globe.
          }
        })
        .catch(() => {});
    const themeObs = new MutationObserver(() => globe?.setTheme(isLight()));
    themeObs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    cleanups.push(() => themeObs.disconnect());

    on(window, "resize", () => {
      globe?.resize();
      onScroll();
    });

    // ---- frame loop
    let raf = 0, last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      if (cur && mouse.px > -999) {
        cur.x += (mouse.px - cur.x) * 0.2;
        cur.y += (mouse.py - cur.y) * 0.2;
        dot.style.transform = `translate(${mouse.px}px,${mouse.py}px) translate(-50%,-50%)`;
        ring.style.transform = `translate(${cur.x}px,${cur.y}px) translate(-50%,-50%)`;
        ring.toggleAttribute("data-hover", cur.hover);
      }
      renderNet(now / 1000);
      if (globe) {
        const e = rm ? 1 : (1 - Math.pow(0.004, dt)) * 0.6;
        mouse.sx += (mouse.nx - mouse.sx) * e;
        mouse.sy += (mouse.ny - mouse.sy) * e;
        globe.frame(dt, now / 1000, {
          key: keyFor(state.scene),
          experience: state.scene === "experience",
          lit: state.lit,
          mx: mouse.sx,
          my: mouse.sy,
          reduceMotion: rm,
          contactTight: state.contactTight,
        });
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
      globe?.dispose();
    };
  }, []);

  return null;
}
