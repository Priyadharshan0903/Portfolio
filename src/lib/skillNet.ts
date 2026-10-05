import { skillGroups } from "@/content/site";

export type NetNode = {
  i: number;
  hub: boolean;
  g: string;
  name: string;
  color: string;
  x: number;
  y: number;
};
export type NetEdge = { a: number; b: number; g: string; color: string; op: number; x1: number; y1: number; x2: number; y2: number };

// Hubs first (indices 0..3), then each group's items laid out on an ellipse around its hub.
export const NET = (() => {
  const nodes: NetNode[] = [];
  const edges: Omit<NetEdge, "x1" | "y1" | "x2" | "y2">[] = [];
  const idx: Record<string, number> = {};
  skillGroups.forEach((G, k) => nodes.push({ i: k, hub: true, g: G.g, name: G.name, color: G.color, x: G.x, y: G.y }));
  skillGroups.forEach((G, k) => {
    const n = G.items.length;
    const off = [-0.3, 0.4, -0.1, 0.2][k];
    G.items.forEach((name, j) => {
      const a = off + (j / n) * Math.PI * 2;
      const i = nodes.length;
      nodes.push({ i, hub: false, g: G.g, name, color: G.color, x: G.x + Math.cos(a) * 15.5, y: G.y + Math.sin(a) * 18 });
      idx[name] = i;
      edges.push({ a: k, b: i, g: G.g, color: G.color, op: 0.45 });
    });
  });
  [[0, 1], [1, 3], [3, 2], [2, 0]].forEach(([a, b]) => edges.push({ a, b, g: "x", color: "var(--dim)", op: 0.5 }));
  [["Golang", "Kubernetes"], ["Node.js", "RabbitMQ"], ["Docker", "PostgreSQL"], ["TypeScript", "React"]].forEach(([a, b]) =>
    edges.push({ a: idx[a], b: idx[b], g: "x", color: "var(--dim)", op: 0.25 }),
  );
  return {
    nodes,
    edges: edges.map((e): NetEdge => ({ ...e, x1: nodes[e.a].x, y1: nodes[e.a].y, x2: nodes[e.b].x, y2: nodes[e.b].y })),
  };
})();
