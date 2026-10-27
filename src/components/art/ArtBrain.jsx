import { useCanvasLoop } from "../../hooks/useCanvasLoop.js";

export default function ArtBrain({ className = "" }) {
  const ref = useCanvasLoop((ctx) => {
    const N = 120;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const yy = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(1 - yy * yy);
      const th = i * 2.399963;
      const k = 1 + (Math.random() - 0.5) * 0.18;
      let x = Math.cos(th) * r * 1.15 * k;
      let y = yy * 0.78 * k;
      let z = Math.sin(th) * r * 0.85 * k;
      if (y < -0.4) y = -0.4 + (y + 0.4) * 0.5;
      z += Math.sign(z || 1) * 0.07;
      pts.push({ x, y, z });
    }

    const adj = pts.map(() => []);
    const edges = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = pts[i], b = pts[j];
        if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 0.46) {
          edges.push([i, j]);
          adj[i].push(j);
          adj[j].push(i);
        }
      }
    }

    const proj = pts.map(() => ({ x: 0, y: 0, d: 0 }));
    const glow = new Float32Array(N);
    let pulses = [];
    let last = 0;

    const spawn = (from) => {
      const n = adj[from];
      if (!n.length || pulses.length >= 14) return;
      pulses.push({ a: from, b: n[(Math.random() * n.length) | 0], p: 0 });
    };
    for (let i = 0; i < 6; i++) spawn((Math.random() * N) | 0);

    return (t, w, h, color) => {
      const dt = Math.min(t - last, 50);
      last = t;
      ctx.clearRect(0, 0, w, h);

      const a = t * 0.00035;
      const ca = Math.cos(a), sa = Math.sin(a);
      const tilt = 0.3, ct = Math.cos(tilt), st = Math.sin(tilt);
      const s = Math.min(w, h * 1.25) * 0.34;

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x1 = p.x * ca + p.z * sa;
        const z1 = -p.x * sa + p.z * ca;
        const y2 = p.y * ct - z1 * st;
        const z2 = p.y * st + z1 * ct;
        const f = 3.4 / (3.4 - z2);
        const o = proj[i];
        o.x = w / 2 + x1 * s * f;
        o.y = h / 2 - y2 * s * f;
        o.d = Math.min(1, Math.max(0, (z2 + 1.2) / 2.4));
      }

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 0.6;
      for (const [i, j] of edges) {
        const pa = proj[i], pb = proj[j];
        ctx.globalAlpha = 0.05 + 0.22 * ((pa.d + pb.d) / 2);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const o = proj[i];
        glow[i] = Math.max(0, glow[i] - dt * 0.002);
        const r = 0.9 + 1.5 * o.d + glow[i] * 2.5;
        ctx.globalAlpha = Math.min(1, 0.35 + 0.55 * o.d + glow[i] * 0.4);
        ctx.beginPath();
        ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const alive = [];
      for (const p of pulses) {
        p.p += dt * 0.0016;
        if (p.p >= 1) {
          glow[p.b] = 1;
          if (Math.random() < 0.75) spawn(p.b);
          continue;
        }
        const pa = proj[p.a], pb = proj[p.b];
        const x = pa.x + (pb.x - pa.x) * p.p;
        const y = pa.y + (pb.y - pa.y) * p.p;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        alive.push(p);
      }
      pulses = alive;
      while (pulses.length < 5) spawn((Math.random() * N) | 0);
      ctx.globalAlpha = 1;
    };
  });

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
