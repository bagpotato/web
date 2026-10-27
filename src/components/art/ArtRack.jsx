import { S } from '../../data/styles.js';

const TUNNEL = 'M190 120 H290';
const DOTS = [0, 1, 2];

export default function ArtRack() {
  return (
    <g {...S}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="40" y={34 + i * 44} width="150" height="34" rx="3" />
          <path d={`M56 ${51 + i * 44} H110`} opacity=".5" />
          <circle className="led" style={{ animationDelay: i * 0.35 + 's' }} cx="162" cy={51 + i * 44} r="3" fill="currentColor" stroke="none" />
          <circle cx="174" cy={51 + i * 44} r="3" opacity=".4" />
        </g>
      ))}
      <path d="M30 214 H200" opacity=".4" />
      <path className="flow" d={TUNNEL} />
      {[0, 1].map((i) => (
        <circle key={i} r="3" fill="currentColor" stroke="none">
          <animateMotion dur="2.2s" begin={`${i * 1.1}s`} repeatCount="indefinite" path={TUNNEL} />
        </circle>
      ))}
      <rect x="230" y="112" width="20" height="16" rx="3" style={{ fill: 'rgb(var(--card))' }} />
      <path d="M234 112 V108 a6 6 0 0 1 12 0 V112" />
      <circle cx="240" cy="120" r="2" fill="currentColor" stroke="none" />
      <rect x="290" y="60" width="64" height="112" rx="8" />
      <path d="M312 68 H332" opacity=".5" />
      <rect x="318" y="82" width="28" height="14" rx="5" opacity=".55" />
      <rect x="298" y="102" width="48" height="26" rx="5" />
      <path d="M304 111 H334 M304 119 H326" opacity=".5" />
      {DOTS.map((i) => (
        <circle key={i} cx={304 + i * 10} cy="148" r="2.5" fill="currentColor" stroke="none">
          <animate attributeName="opacity" values=".2;1;.2" dur="1s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  );
}
