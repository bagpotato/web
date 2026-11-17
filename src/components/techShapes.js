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

// The 16 vertices of a 4D hypercube, and its 32 edges: vertex pairs that differ on one axis.
const HYPER = Array.from({ length: 16 }, (_, i) => [0, 1, 2, 3].map((b) => ((i >> b) & 1 ? 1 : -1)));
const HYPER_EDGES = [];
for (let i = 0; i < 16; i++) {
  for (let b = 0; b < 4; b++) if (!(i & (1 << b))) HYPER_EDGES.push([i, i | (1 << b)]);
}

// A tesseract rotated by `angle` in the XW plane, then projected from 4D to 3D with
// perspective, so the inner cube turns inside out as the angle grows. Writes into `out`
// when given, so it can run every frame without allocating.
export const tesseract = (angle, out) => {
  const c = Math.cos(angle), s = Math.sin(angle);
  const p = HYPER.map(([x, y, z, w]) => {
    const rx = x * c - w * s, rw = x * s + w * c;
    const f = (0.6 * 3) / (3 - rw);
    return [rx * f, y * f, z * f];
  });
  return normalize(HYPER_EDGES.flatMap(([a, b]) => [...p[a], ...p[b]]), out);
};

// Right-handed B-DNA. Each sugar-phosphate backbone is a ribbon (an outer and an inner
// helix, tied at every nucleotide). Base pairs are flat slabs split in the middle, where
// dashes stand for the hydrogen bonds: two for A–T, three for G–C. Pairs sit 36° apart
// (10 per turn) and the strands are 140° apart, which leaves a wide major groove and a
// narrow minor groove, as on real DNA.
const dna = (pairs = 18, height = 1.75, outer = 0.8, inner = 0.66) => {
  const twist = (Math.PI * 2) / 10;
  const groove = (140 * Math.PI) / 180;
  const rise = (height * 2) / (pairs - 1);
  const slab = 0.035;
  const at = (r, a, y) => [Math.cos(a) * r, y, -Math.sin(a) * r];
  const lift = ([x, y, z], dy) => [x, y + dy, z];
  const lines = [];
  const seg = (p, q) => lines.push(...p, ...q);

  for (const phase of [0, groove]) {
    const SUB = 4;
    for (let i = 0; i < (pairs - 1) * SUB; i++) {
      const k0 = i / SUB, k1 = (i + 1) / SUB;
      for (const r of [outer, inner]) {
        seg(at(r, phase + k0 * twist, k0 * rise - height), at(r, phase + k1 * twist, k1 * rise - height));
      }
    }
    for (let k = 0; k < pairs; k++) {
      seg(at(outer, phase + k * twist, k * rise - height), at(inner, phase + k * twist, k * rise - height));
    }
  }

  for (let k = 0; k < pairs; k++) {
    const y = k * rise - height;
    const a = at(inner, k * twist, y), b = at(inner, k * twist + groove, y);
    const mix = (u) => a.map((v, j) => v + (b[j] - v) * u);
    for (const [from, to] of [[0, 0.44], [1, 0.56]]) {
      const p = mix(from), q = mix(to);
      seg(lift(p, slab), lift(q, slab));
      seg(lift(p, -slab), lift(q, -slab));
      seg(lift(q, slab), lift(q, -slab));
    }
    const bonds = [0, 3, 4, 8, 11, 13, 16].includes(k) ? 3 : 2;
    for (let n = 0; n < bonds; n++) {
      const dy = (n - (bonds - 1) / 2) * 0.026;
      seg(lift(mix(0.465), dy), lift(mix(0.535), dy));
    }
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

function normalize(lines, out = new Float32Array(SEGMENTS * 6)) {
  const count = lines.length / 6;
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
export const SHAPE_NAMES = ['Sphere', 'Knot', 'Tesseract', 'DNA', 'Ring', 'Star'];
export const TESSERACT = SHAPE_NAMES.indexOf('Tesseract');

export function buildShapes() {
  return [
    wire(new IcosahedronGeometry(1.6, 1)),
    tube(new TorusKnotGeometry(0.95, 0.3, 72, 5), 72, 5),
    tesseract(0.5),
    dna(),
    tube(new TorusGeometry(1.2, 0.42, 10, 32), 10, 32),
    star()
  ].map((lines) => (lines instanceof Float32Array ? lines : normalize(lines)));
}
