import { useCanvasLoop } from "../../hooks/useCanvasLoop.js";

// A 2D brain icon in profile, facing left: a lobed outline, thick folds and a brainstem.
// Shapes are Bézier chains: a start point, then segments that are either a cubic
// (c1x, c1y, c2x, c2y, x, y) or a lobe (x, y, bulge) that bows outwards from the last point.
const chain = (x, y, ...segs) => {
  const d = [x, y];
  for (const s of segs) {
    const [px, py] = d.slice(-2);
    if (s.length === 6) {
      d.push(...s);
      continue;
    }
    const [qx, qy, b] = s;
    const dx = qx - px, dy = qy - py, len = Math.hypot(dx, dy);
    const nx = (dy / len) * b * 1.33, ny = (-dx / len) * b * 1.33;
    d.push(px + dx * 0.08 + nx, py + dy * 0.08 + ny, px + dx * 0.92 + nx, py + dy * 0.92 + ny, qx, qy);
  }
  return d;
};

// Clockwise from the notch between the frontal and temporal lobes.
const OUTLINE = chain(
  128, 196,
  [60, 178, 15],
  [62, 114, 21],
  [110, 72, 19],
  [172, 46, 18],
  [236, 52, 18],
  [292, 86, 18],
  [322, 146, 18],
  [302, 214, 20],
  [298, 232, 288, 242, 284, 256],
  [281, 268, 300, 274, 294, 286],
  [288, 296, 266, 288, 260, 274],
  [254, 260, 246, 246, 232, 238],
  [152, 226, 15],
  [128, 196, 9]
);

const FOLDS = [
  // Sylvian fissure: the top edge of the temporal lobe.
  chain(128, 196, [128, 170, 160, 150, 198, 150], [228, 150, 250, 162, 256, 182]),
  // Temporal lobe groove and the fold above the brainstem.
  chain(170, 204, [186, 192, 210, 194, 224, 206]),
  chain(262, 206, [274, 216, 288, 214, 298, 200]),
  // Frontal lobe.
  chain(110, 72, [122, 98, 112, 120, 124, 142]),
  chain(98, 116, [80, 126, 78, 150, 96, 162]),
  chain(76, 92, [90, 92, 100, 100, 100, 108]),
  // Parietal and occipital folds.
  chain(150, 82, [140, 96, 148, 114, 168, 116]),
  chain(204, 66, [218, 76, 220, 98, 204, 110]),
  chain(170, 132, [186, 124, 204, 124, 216, 134]),
  chain(246, 88, [260, 96, 266, 112, 256, 128]),
  chain(236, 52, [238, 66, 232, 76, 224, 82]),
  chain(292, 86, [284, 96, 284, 104, 290, 112]),
  chain(282, 128, [298, 136, 302, 156, 290, 170])
];

// Bounding box of the drawing, used to fit it in the canvas.
const BOX = { x: 40, y: 30, w: 296, h: 266 };

const toPath = (d, close) => {
  const p = new Path2D();
  p.moveTo(d[0], d[1]);
  for (let i = 2; i < d.length; i += 6) p.bezierCurveTo(d[i], d[i + 1], d[i + 2], d[i + 3], d[i + 4], d[i + 5]);
  if (close) p.closePath();
  return p;
};

// Resample a Bézier chain into points one design unit apart, so signals move at a steady speed.
const sample = (d) => {
  const dense = [[d[0], d[1]]];
  for (let i = 2; i < d.length; i += 6) {
    const [x0, y0] = dense[dense.length - 1];
    for (let k = 1; k <= 40; k++) {
      const t = k / 40, u = 1 - t;
      const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
      dense.push([a * x0 + b * d[i] + c * d[i + 2] + e * d[i + 4], a * y0 + b * d[i + 1] + c * d[i + 3] + e * d[i + 5]]);
    }
  }
  const out = [dense[0]];
  let carry = 0;
  for (let i = 1; i < dense.length; i++) {
    const [ax, ay] = dense[i - 1], [bx, by] = dense[i];
    const len = Math.hypot(bx - ax, by - ay);
    let s = 1 - carry;
    while (s <= len) {
      out.push([ax + ((bx - ax) * s) / len, ay + ((by - ay) * s) / len]);
      s += 1;
    }
    carry = len - (s - 1);
  }
  return out;
};

export default function ArtBrain({ className = "" }) {
  const ref = useCanvasLoop((ctx) => {
    const outline = toPath(OUTLINE, true);
    const folds = FOLDS.map((d) => toPath(d));
    const tracks = [OUTLINE, ...FOLDS].map(sample);

    // Point-in-brain test in design units, on a context with no transform.
    const probe = document.createElement("canvas").getContext("2d");
    const inside = (x, y) => probe.isPointInPath(outline, x, y);

    // Dots drifting inside the brain, linked to their near neighbours.
    const dots = [];
    while (dots.length < 46) {
      const x = BOX.x + Math.random() * BOX.w, y = BOX.y + Math.random() * 200;
      if (!inside(x, y)) continue;
      const a = Math.random() * Math.PI * 2, v = 6 + Math.random() * 12;
      dots.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v });
    }

    // Signals: bright dots running along the outline and the folds.
    const signals = [];
    const spawn = () => {
      const track = tracks[(Math.random() * tracks.length) | 0];
      signals.push({ track, d: 0, back: Math.random() < 0.5, speed: 60 + Math.random() * 50 });
    };
    for (let i = 0; i < 7; i++) {
      spawn();
      signals[i].d = Math.random() * signals[i].track.length * 0.8;
    }

    let last = 0;
    const LINK = 34;
    const TRAIL = 30;

    return (t, w, h, color) => {
      // The first rAF timestamp can predate the loop's start, so never step backwards.
      const dt = Math.max(0, Math.min(t - last, 50)) / 1000;
      last = t;
      ctx.clearRect(0, 0, w, h);

      const s = Math.min(w / (BOX.w * 1.12), h / (BOX.h * 1.12));
      ctx.save();
      ctx.translate(w / 2 - (BOX.x + BOX.w / 2) * s, h / 2 - (BOX.y + BOX.h / 2) * s);
      ctx.scale(s, s);
      const px = 1 / s;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // The icon: thick, rounded strokes.
      ctx.globalAlpha = 0.05;
      ctx.fill(outline);
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 9;
      ctx.stroke(outline);
      for (const p of folds) ctx.stroke(p);

      // Dots drift, turn a little at random and bounce off the outline.
      for (const n of dots) {
        const turn = (Math.random() - 0.5) * 1.4 * dt;
        const c = Math.cos(turn), sn = Math.sin(turn);
        [n.vx, n.vy] = [n.vx * c - n.vy * sn, n.vx * sn + n.vy * c];
        const nx = n.x + n.vx * dt, ny = n.y + n.vy * dt;
        if (inside(nx, ny)) {
          n.x = nx;
          n.y = ny;
        } else {
          n.vx = -n.vx;
          n.vy = -n.vy;
        }
      }
      ctx.lineWidth = Math.max(1.2, 0.8 * px);
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK) continue;
          ctx.globalAlpha = (1 - dist / LINK) * 0.3;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.8;
      for (const n of dots) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(2.4, 1.4 * px), 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals along the strokes, with a fading trail.
      for (let i = signals.length - 1; i >= 0; i--) {
        const sg = signals[i];
        sg.d += sg.speed * dt;
        const len = sg.track.length - 1;
        if (sg.d >= len + TRAIL) {
          signals.splice(i, 1);
          spawn();
          continue;
        }
        const at = (d) => sg.track[Math.min(len, Math.max(0, Math.round(sg.back ? len - d : d)))];
        for (let k = TRAIL; k >= 2; k -= 2) {
          const d = sg.d - k;
          if (d < 0 || d > len) continue;
          const [x, y] = at(d);
          ctx.globalAlpha = (1 - k / TRAIL) * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, 1.5 + 3 * (1 - k / TRAIL), 0, Math.PI * 2);
          ctx.fill();
        }
        if (sg.d <= len) {
          const [x, y] = at(sg.d);
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(x, y, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    };
  });

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
