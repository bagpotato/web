import { S } from '../../data/styles.js';

const OUTLINE = [
  [3.32, 42.32], [3.17, 42.43], [2.95, 42.46], [2.67, 42.4], [2.3, 42.4], [1.95, 42.45], [1.78, 42.48],
  [1.45, 42.45], [1.42, 42.6], [1.0, 42.72], [0.85, 42.8], [0.67, 42.87], [0.65, 42.78], [0.72, 42.65],
  [0.7, 42.55], [0.76, 42.4], [0.68, 42.25], [0.74, 42.1], [0.72, 41.95], [0.5, 41.9], [0.35, 41.65],
  [0.35, 41.45], [0.4, 41.35], [0.25, 41.15], [0.2, 41.0], [0.28, 40.75], [0.38, 40.68], [0.52, 40.52],
  [0.7, 40.6], [0.85, 40.66], [0.95, 40.75], [0.8, 40.82], [0.8, 40.9], [1.0, 41.0], [1.2, 41.08],
  [1.5, 41.2], [1.8, 41.27], [2.05, 41.3], [2.2, 41.4], [2.5, 41.55], [2.8, 41.67], [3.05, 41.78],
  [3.2, 41.9], [3.2, 42.1], [3.18, 42.25]
];

const px = (lon) => +(102 + (lon - 0.1) * 59).toFixed(1);
const py = (lat) => +(24 + (42.9 - lat) * 80).toFixed(1);
const pt = ([lon, lat]) => [px(lon), py(lat)];

const OUTLINE_D = 'M' + OUTLINE.map((p) => pt(p).join(' ')).join(' L') + ' Z';
const BCN = pt([2.17, 41.39]);
const CITIES = [pt([2.82, 41.98]), pt([0.62, 41.62]), pt([1.25, 41.12])];
const LINKS = CITIES.map((c) => `M${BCN.join(' ')} L${c.join(' ')}`);

export default function ArtWeb() {
  return (
    <g {...S}>
      <path d={OUTLINE_D} opacity=".35" />
      <path className="draw" pathLength="1" d={OUTLINE_D} />
      {LINKS.map((d, i) => (
        <g key={d}>
          <path className="flow" d={d} opacity=".6" />
          <circle r="2.5" fill="currentColor" stroke="none">
            <animateMotion dur="2.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {CITIES.map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill="currentColor" stroke="none" />)}
      <circle cx={BCN[0]} cy={BCN[1]} r="4.5" fill="currentColor" stroke="none" />
      <circle cx={BCN[0]} cy={BCN[1]} r="8">
        <animate attributeName="r" values="8;24;8" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".8;0;.8" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}
