import { IcosahedronGeometry, TorusGeometry, TorusKnotGeometry, WireframeGeometry } from 'three';

// Every shape is split into this many line segments so any two can morph vertex by vertex.
export const SEGMENTS = 720;

const wire = (geometry) => {
  const wireframe = new WireframeGeometry(geometry);
  const lines = Array.from(wireframe.attributes.position.array);
  geometry.dispose();
  wireframe.dispose();
  return lines;
};

// Three stores tube-like geometries as a grid of (rows + 1) x (cols + 1) vertices.
const tube = (geometry, rows, cols) => {
  const { array } = geometry.attributes.position;
  const at = (r, c) => {
    const i = (r * (cols + 1) + c) * 3;
    return [array[i], array[i + 1], array[i + 2]];
  };
  const lines = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      if (r < rows) lines.push(...at(r, c), ...at(r + 1, c));
      if (c < cols) lines.push(...at(r, c), ...at(r, c + 1));
    }
  }
  geometry.dispose();
  return lines;
};

const grid = (cells = 3, half = 1.05) => {
  const step = (half * 2) / cells;
  const lines = [];
  for (let a = 0; a <= cells; a++) {
    for (let b = 0; b <= cells; b++) {
      const u = -half + a * step;
      const v = -half + b * step;
      lines.push(-half, u, v, half, u, v);
      lines.push(u, -half, v, u, half, v);
      lines.push(u, v, -half, u, v, half);
    }
  }
  return lines;
};

const helix = (steps = 64, radius = 0.8, height = 1.7, turns = 2) => {
  const point = (i, offset) => {
    const a = (i / steps) * turns * Math.PI * 2 + offset;
    return [Math.cos(a) * radius, (i / steps) * height * 2 - height, Math.sin(a) * radius];
  };
  const lines = [];
  for (let i = 0; i < steps; i++) {
    lines.push(...point(i, 0), ...point(i + 1, 0));
    lines.push(...point(i, Math.PI), ...point(i + 1, Math.PI));
    if (i % 4 === 0) lines.push(...point(i, 0), ...point(i, Math.PI));
  }
  return lines;
};

const star = (reach = 1.8, core = 0.34) => {
  const lines = [];
  for (let axis = 0; axis < 3; axis++) {
    for (const sign of [1, -1]) {
      const vector = (along, u, v) => {
        const p = [0, 0, 0];
        p[axis] = along * sign;
        p[(axis + 1) % 3] = u;
        p[(axis + 2) % 3] = v;
        return p;
      };
      const base = [[core, core], [core, -core], [-core, -core], [-core, core]];
      base.forEach(([u, v], i) => {
        const [nu, nv] = base[(i + 1) % base.length];
        lines.push(...vector(reach, 0, 0), ...vector(core, u, v));
        lines.push(...vector(core, u, v), ...vector(core, nu, nv));
      });
    }
  }
  return lines;
};

function normalize(lines) {
  const count = lines.length / 6;
  const out = new Float32Array(SEGMENTS * 6);
  const lerp = (a, b, t) => a + (b - a) * t;
  let write = 0;

  for (let s = 0; s < count; s++) {
    const pieces = Math.floor(SEGMENTS / count) + (s < SEGMENTS % count ? 1 : 0);
    const r = s * 6;
    for (let p = 0; p < pieces; p++) {
      for (const t of [p / pieces, (p + 1) / pieces]) {
        for (let k = 0; k < 3; k++) out[write++] = lerp(lines[r + k], lines[r + 3 + k], t);
      }
    }
  }
  return out;
}

// In the same order as buildShapes.
export const SHAPE_NAMES = ['Sphere', 'Knot', 'Grid', 'Helix', 'Ring', 'Star'];

export function buildShapes() {
  return [
    wire(new IcosahedronGeometry(1.6, 1)),
    tube(new TorusKnotGeometry(0.95, 0.3, 72, 5), 72, 5),
    grid(),
    helix(),
    tube(new TorusGeometry(1.2, 0.42, 10, 32), 10, 32),
    star()
  ].map(normalize);
}
