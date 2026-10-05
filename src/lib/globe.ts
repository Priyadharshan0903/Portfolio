import * as T from "three";
import { LAND } from "./land";

/** Camera framing for a scene: fx/fy = view offset (fraction of viewport), z = distance, op = opacity, all = "zoomed-out" mix. */
export type Key = { fx: number; fy: number; z: number; op: number; all: number };

export type FrameInput = {
  key: Key;
  /** Active section is Experience: globe focuses the city of the role in view. */
  experience: boolean;
  /** Which experience layer is lit (3 = newest). */
  lit: number;
  mx: number; // smoothed mouse, -1..1
  my: number;
  reduceMotion: boolean;
  contactTight: boolean;
};

// Accent tones for the globe (blue palette): dark theme uses the bright accent, light the deep one.
const ACCENT_DARK = 0x7fb8ff;
const ACCENT_LIGHT = 0x2462d6;

const R = 2;
const ll = (lat: number, lon: number, rr = R) => {
  const p = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new T.Vector3(-rr * Math.sin(p) * Math.cos(th), rr * Math.cos(p), rr * Math.sin(p) * Math.sin(th));
};
const angOf = (p: T.Vector3) => -Math.atan2(p.x, p.z);

type Arc = { m: T.ShaderMaterial; main: boolean; id?: string; ph: number; em: number; sp: number };
type Ring = { rg: T.Mesh; m: T.MeshBasicMaterial; lime: boolean; ph: number };
type Label = { p: T.Vector3; id: string; sm: T.SpriteMaterial; draw: () => void };

const LAYER_FOCUS: Record<number, string> = { 3: "pleasanton", 2: "chennai", 1: "berlin", 0: "chennai" };

export class Globe {
  private r: T.WebGLRenderer;
  private scene = new T.Scene();
  private cam = new T.PerspectiveCamera(30, 1, 0.1, 200);
  private tilt = new T.Group();
  private g = new T.Group();
  private U = { uOp: { value: 1 }, uFg: { value: new T.Color() }, uLime: { value: new T.Color() }, uLight: { value: 0 } };
  private occM = new T.MeshBasicMaterial({ transparent: true });
  private atmM: T.ShaderMaterial;
  private gratM = new T.LineBasicMaterial({ transparent: true, depthWrite: false });
  private limeM = new T.MeshBasicMaterial({ transparent: true });
  private dotM = new T.MeshBasicMaterial({ transparent: true });
  private beamM = new T.LineBasicMaterial({ transparent: true, depthWrite: false });
  private haloM: T.SpriteMaterial;
  private halo: T.Sprite;
  private arcs: Arc[] = [];
  private rings: Ring[] = [];
  private labels: Label[] = [];
  private focusAng: Record<string, number>;
  private rotY: number;
  private cur: Key;
  private W = 1;
  private H = 1;
  private v = new T.Vector3();
  private disposables: { dispose(): void }[] = [];

  constructor(canvas: HTMLCanvasElement, initial: Key) {
    // Match the original (three r149) look: shaders write raw colors, no sRGB conversion.
    T.ColorManagement.enabled = false;
    this.r = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.r.outputColorSpace = T.LinearSRGBColorSpace;
    const mobile = innerWidth < 820;
    this.r.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.5 : 2));
    this.r.setClearColor(0, 0);
    this.tilt.add(this.g);
    this.scene.add(this.tilt);
    const g = this.g;
    const pr = this.r.getPixelRatio();
    const home = ll(13.08, 80.27);
    const homeN = home.clone().normalize();
    const U = this.U;

    // occluder: hides back-facing dots and arcs
    const occ = new T.Mesh(new T.SphereGeometry(R * 0.992, 64, 64), this.occM);
    occ.renderOrder = -1;
    g.add(occ);

    // atmosphere
    this.atmM = new T.ShaderMaterial({
      uniforms: { uOp: U.uOp, uC: U.uLime, uLight: U.uLight },
      side: T.BackSide,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      vertexShader: "varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
      fragmentShader:
        "uniform float uOp; uniform vec3 uC; uniform float uLight; varying vec3 vN; void main(){ float i=pow(clamp(.72+dot(vN,vec3(0.,0.,1.)),0.,1.),3.5); gl_FragColor=vec4(uC, i*uOp*mix(.55,.35,uLight)); }",
    });
    this.tilt.add(new T.Mesh(new T.SphereGeometry(R * 1.18, 64, 64), this.atmM));

    // graticule
    const gp: T.Vector3[] = [];
    for (let la = -60; la <= 60; la += 30) for (let lo = 0; lo < 360; lo += 3) gp.push(ll(la, lo, R * 1.001), ll(la, lo + 3, R * 1.001));
    for (let lo = 0; lo < 360; lo += 30) for (let la = -87; la < 87; la += 3) gp.push(ll(la, lo, R * 1.001), ll(la + 3, lo, R * 1.001));
    g.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(gp), this.gratM));

    // land dots: fibonacci sphere sampled against the land bitmask, glowing near home
    const dotsMat = new T.ShaderMaterial({
      uniforms: { ...U, uPR: { value: pr }, uSize: { value: mobile ? 2.6 : 2.2 } },
      transparent: true,
      depthWrite: false,
      vertexShader:
        "attribute float aG; uniform float uPR; uniform float uSize; varying float vG; varying float vF; void main(){ vG=aG; vec3 n=normalize(normalMatrix*position); vF=n.z; vec4 mv=modelViewMatrix*vec4(position,1.); gl_PointSize=uSize*uPR*(12./-mv.z)*(1.+aG*.6); gl_Position=projectionMatrix*mv; }",
      fragmentShader:
        "uniform float uOp; uniform vec3 uFg; uniform vec3 uLime; varying float vG; varying float vF; void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard; vec3 c=mix(uFg,uLime,vG); float a=(.22+.6*smoothstep(-.05,.7,vF)+vG*.3)*uOp*(1.-smoothstep(.3,.5,d)); gl_FragColor=vec4(c,a); }",
    });
    {
      const W = 360, H = 180, raw = atob(LAND), N = mobile ? 14000 : 26000;
      const pos: number[] = [], glow: number[] = [];
      const isLand = (u: number, v: number) => (raw.charCodeAt((v * W + u) >> 3) >> ((v * W + u) & 7)) & 1;
      for (let i = 0; i < N; i++) {
        const y = 1 - ((i + 0.5) / N) * 2, rr = Math.sqrt(1 - y * y), th = i * Math.PI * (3 - Math.sqrt(5));
        const x = Math.cos(th) * rr, z = Math.sin(th) * rr;
        const lat = (Math.asin(y) * 180) / Math.PI;
        const lon = (((Math.atan2(z, -x) * 180) / Math.PI + 360) % 360) - 180;
        const u = Math.min(W - 1, Math.floor(((lon + 180) / 360) * W)), v = Math.min(H - 1, Math.floor(((90 - lat) / 180) * H));
        if (!isLand(u, v)) continue;
        const p = new T.Vector3(x, y, z);
        pos.push(p.x * R * 1.003, p.y * R * 1.003, p.z * R * 1.003);
        glow.push(Math.pow(Math.max(0, 1 - p.distanceTo(homeN) / 0.55), 2));
      }
      const geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
      geo.setAttribute("aG", new T.Float32BufferAttribute(glow, 1));
      g.add(new T.Points(geo, dotsMat));
    }

    // arcs from home, with a travelling bright head
    const arcVS = "attribute float aT; varying float vT; void main(){ vT=aT; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }";
    const arcFS =
      "uniform float uHead; uniform float uOp; uniform float uBase; uniform vec3 uC; varying float vT; void main(){ float tr=smoothstep(uHead-.45,uHead,vT)*step(vT,uHead); float hd=smoothstep(uHead-.04,uHead,vT)*step(vT,uHead); gl_FragColor=vec4(mix(uC,vec3(1.),hd*.6),(uBase+tr*.9)*uOp); }";
    const mkArc = (p: T.Vector3, main: boolean, id?: string) => {
      const mid = home.clone().add(p).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(R + home.distanceTo(p) * (main ? 0.42 : 0.3));
      const c = new T.QuadraticBezierCurve3(home.clone().multiplyScalar(1.004), mid, p.clone().multiplyScalar(1.004));
      const m = new T.ShaderMaterial({
        uniforms: { uHead: { value: 0 }, uOp: { value: 1 }, uBase: { value: main ? 0.14 : 0.05 }, uC: { value: new T.Color() } },
        vertexShader: arcVS,
        fragmentShader: arcFS,
        transparent: true,
        depthWrite: false,
      });
      if (main) {
        const geo = new T.TubeGeometry(c, 160, 0.009, 6, false);
        const uv = geo.attributes.uv, at = new Float32Array(uv.count);
        for (let i = 0; i < uv.count; i++) at[i] = uv.getX(i);
        geo.setAttribute("aT", new T.BufferAttribute(at, 1));
        g.add(new T.Mesh(geo, m));
      } else {
        const pts = c.getPoints(100);
        const geo = new T.BufferGeometry().setFromPoints(pts);
        geo.setAttribute("aT", new T.Float32BufferAttribute(pts.map((_, i) => i / 100), 1));
        g.add(new T.Line(geo, m));
      }
      this.arcs.push({ m, main, id, ph: Math.random(), em: 1, sp: main ? 0.22 : 0.12 + Math.random() * 0.06 });
    };

    const sph = new T.SphereGeometry(1, 16, 16);
    const dot = (p: T.Vector3, m: T.Material, s: number) => {
      const d = new T.Mesh(sph, m);
      d.position.copy(p);
      d.scale.setScalar(s);
      g.add(d);
    };
    const mkRing = (p: T.Vector3, lime: boolean) => {
      const m = new T.MeshBasicMaterial({ transparent: true, side: T.DoubleSide, depthWrite: false });
      const rg = new T.Mesh(new T.RingGeometry(0.1, 0.115, 48), m);
      rg.position.copy(p.clone().multiplyScalar(1.004));
      rg.lookAt(p.clone().multiplyScalar(2));
      g.add(rg);
      this.rings.push({ rg, m, lime, ph: Math.random() });
    };
    const beam = (p: T.Vector3) =>
      g.add(new T.Line(new T.BufferGeometry().setFromPoints([p.clone().multiplyScalar(1.004), p.clone().multiplyScalar(1.12)]), this.beamM));

    dot(home, this.limeM, 0.05);
    mkRing(home, true);
    beam(home);
    const MAIN: [string, string, number, number][] = [
      ["berlin", "Berlin", 52.52, 13.4],
      ["sf", "San Francisco", 37.77, -122.42],
      ["pleasanton", "Pleasanton", 37.66, -121.87],
      ["dublin", "Dublin", 53.35, -6.26],
    ];
    const cities = MAIN.map(([id, name, la, lo]) => {
      const p = ll(la, lo);
      dot(p, this.dotM, 0.035);
      mkRing(p, false);
      beam(p);
      mkArc(p, true, id);
      return { id, name, p };
    });
    [[1.35, 103.82], [51.5, -0.12], [40.71, -74], [35.68, 139.69], [-33.87, 151.2], [25.2, 55.27], [-23.55, -46.63], [12.97, 77.59], [19.07, 72.88]].forEach(
      ([la, lo]) => {
        const p = ll(la, lo);
        dot(p, this.dotM, 0.018);
        mkArc(p, false);
      },
    );

    // halo over home
    const hc = document.createElement("canvas");
    hc.width = hc.height = 128;
    const hx = hc.getContext("2d")!;
    const gr = hx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, "rgba(255,255,255,.9)");
    gr.addColorStop(0.25, "rgba(255,255,255,.35)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    hx.fillStyle = gr;
    hx.fillRect(0, 0, 128, 128);
    const haloTex = new T.CanvasTexture(hc);
    this.haloM = new T.SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false });
    this.halo = new T.Sprite(this.haloM);
    this.halo.position.copy(home.clone().multiplyScalar(1.03));
    g.add(this.halo);
    this.disposables.push(haloTex);

    // city labels (canvas textures, redrawn once webfonts load)
    const mkLabel = (text: string, p: T.Vector3, id: string): Label => {
      const c2 = document.createElement("canvas");
      c2.width = 512;
      c2.height = 80;
      const tex = new T.CanvasTexture(c2);
      const sm = new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false });
      const s = new T.Sprite(sm);
      const draw = () => {
        const x = c2.getContext("2d")!;
        x.clearRect(0, 0, 512, 80);
        const mono = getComputedStyle(document.documentElement).getPropertyValue("--mono").trim() || "ui-monospace, monospace";
        x.font = `500 34px ${mono}`;
        x.fillStyle = "#fff";
        x.textBaseline = "middle";
        x.fillText(text, 8, 40);
        tex.needsUpdate = true;
      };
      draw();
      s.center.set(0, 0.5);
      s.scale.set(2.2, 0.34, 1);
      const dy = id === "pleasanton" ? -0.2 : id === "sf" ? 0.12 : id === "dublin" ? 0.18 : id === "berlin" ? -0.14 : 0.02;
      s.position.copy(p.clone().multiplyScalar(1.13)).add(new T.Vector3(0.06, dy, 0));
      g.add(s);
      this.disposables.push(tex);
      return { p, id, sm, draw };
    };
    this.labels = [mkLabel("Chennai", home, "chennai"), ...cities.map((c) => mkLabel(c.name, c.p, c.id))];
    document.fonts?.ready.then(() => this.labels.forEach((l) => l.draw()));

    this.focusAng = { chennai: angOf(home), ...Object.fromEntries(cities.map((c) => [c.id, angOf(c.p)])) };
    this.rotY = angOf(home) + 0.5;
    this.cur = { ...initial };
    this.resize();
  }

  setTheme(light: boolean) {
    const lime = new T.Color(light ? ACCENT_LIGHT : ACCENT_DARK);
    const fg = new T.Color(light ? 0x141412 : 0xecebe6);
    const bg = new T.Color(light ? 0xf1f0ea : 0x0f0f0d);
    this.U.uFg.value.copy(fg);
    this.U.uLime.value.copy(lime);
    this.U.uLight.value = light ? 1 : 0;
    this.occM.color.copy(bg);
    this.gratM.color.copy(fg);
    this.limeM.color.copy(lime);
    this.dotM.color.copy(fg);
    this.beamM.color.copy(lime);
    this.haloM.color.copy(lime);
    this.rings.forEach((o) => o.m.color.copy(o.lime ? lime : fg));
    this.arcs.forEach((A) => A.m.uniforms.uC.value.copy(A.main ? lime : fg));
    this.labels.forEach((l) => l.sm.color.copy(l.id === "chennai" ? lime : fg));
    // Additive blending vanishes on a light background.
    const bl = light ? T.NormalBlending : T.AdditiveBlending;
    for (const m of [this.atmM, this.haloM, ...this.arcs.map((a) => a.m)]) {
      m.blending = bl;
      m.needsUpdate = true;
    }
  }

  resize() {
    this.W = innerWidth;
    this.H = innerHeight;
    this.r.setSize(this.W, this.H, false);
    this.cam.aspect = this.W / this.H;
    this.cam.updateProjectionMatrix();
  }

  frame(dt: number, t: number, f: FrameInput) {
    const { key, reduceMotion: rm } = f;
    const cur = this.cur;
    const e = rm ? 1 : 1 - Math.pow(0.004, dt);
    // Large framing jumps fade out, snap, then fade back in rather than sweeping across the page.
    const far = Math.abs(key.fx - cur.fx) > 0.25 || Math.abs(key.fy - cur.fy) > 0.2;
    if (key.op < 0.02 || (far && cur.op >= 0.03)) cur.op += (0 - cur.op) * Math.min(1, e * 2.5);
    else if (cur.op < 0.03) {
      Object.assign(cur, key);
      cur.op = 0.03;
    } else for (const k of Object.keys(key) as (keyof Key)[]) cur[k] += (key[k] - cur[k]) * e;
    if (key.op >= 0.02 && !far) cur.op += (key.op - cur.op) * e * 0.2;

    const { W, H } = this;
    const { op, all } = cur;
    this.cam.position.set(0, 0, cur.z);
    this.cam.lookAt(0, 0, 0);
    this.cam.setViewOffset(W, H, -cur.fx * W, cur.fy * H, W, H);

    const focus = f.experience ? LAYER_FOCUS[f.lit] : all > 0.5 ? "chennai" : null;
    if (focus) {
      let d = this.focusAng[focus] - this.rotY;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      this.rotY += d * (rm ? 1 : e * 0.6);
    } else if (!rm) this.rotY += dt * 0.07;
    this.g.rotation.y = this.rotY + f.mx * 0.2;
    this.tilt.rotation.x = 0.3 + f.my * 0.08;

    const body = op * (1 - all * (f.contactTight ? 0.85 : 0.35));
    this.U.uOp.value = body;
    this.occM.opacity = body;
    this.gratM.opacity = 0.07 * body;
    this.atmM.uniforms.uOp.value = body;
    this.limeM.opacity = op;
    this.dotM.opacity = body;
    this.beamM.opacity = body * 0.8;
    for (const A of this.arcs) {
      const target = A.main ? (f.experience ? (A.id === focus ? 1 : 0.3) : 1) : 0.55;
      A.em += (target - A.em) * (rm ? 1 : e * 0.6);
      A.m.uniforms.uHead.value = rm ? 1.2 : (t * A.sp + A.ph) % 1.5;
      A.m.uniforms.uOp.value = op * A.em;
    }
    for (const o of this.rings) {
      const rp = rm ? 0 : (t * (o.lime ? 0.7 : 0.5) + o.ph) % 1;
      o.rg.scale.setScalar(1 + rp * (o.lime ? 1.8 + all * 0.6 : 1.4));
      o.m.opacity = op * (1 - rp) * (o.lime ? 1 : 0.6);
    }
    this.halo.scale.setScalar(0.55 + all * 0.35 + (rm ? 0 : Math.sin(t * 2) * 0.05));
    this.haloM.opacity = op * (0.3 + all * 0.35);
    this.scene.updateMatrixWorld();
    for (const l of this.labels) {
      this.v.copy(l.p).applyMatrix4(this.g.matrixWorld);
      l.sm.opacity = op * Math.max(0, Math.min(1, (this.v.z / R + 0.1) * 2.2));
    }
    this.tilt.visible = op > 0.02;
    this.r.render(this.scene, this.cam);
  }

  dispose() {
    this.scene.traverse((o) => {
      const m = o as T.Mesh;
      m.geometry?.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    this.disposables.forEach((d) => d.dispose());
    this.r.dispose();
  }
}
