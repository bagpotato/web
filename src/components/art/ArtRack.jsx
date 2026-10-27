import { S } from '../../data/styles.js';

const Y = [51, 95, 139, 183];
const LINK = 'M150 120 H208';

const GLYPHS = [
  (cy) => (
    <>
      <circle cx="336" cy={cy} r="7" />
      <ellipse cx="336" cy={cy} rx="3" ry="7" />
      <path d={`M329 ${cy} H343`} />
    </>
  ),
  (cy) => <path d={`M332 ${cy - 5} L326 ${cy} L332 ${cy + 5} M340 ${cy - 5} L346 ${cy} L340 ${cy + 5}`} />,
  (cy) => (
    <>
      <ellipse cx="336" cy={cy - 4} rx="8" ry="3" />
      <path d={`M328 ${cy - 4} V${cy + 4} C328 ${cy + 8} 344 ${cy + 8} 344 ${cy + 4} V${cy - 4}`} />
    </>
  ),
  (cy) => (
    <>
      <path d={`M326 ${cy} C331 ${cy - 7} 341 ${cy - 7} 346 ${cy} C341 ${cy + 7} 331 ${cy + 7} 326 ${cy} Z`} />
      <circle cx="336" cy={cy} r="2.5" />
    </>
  )
];

export default function ArtRack() {
  return (
    <g {...S}>
      {Y.map((y, i) => (
        <g key={y}>
          <rect x="40" y={y - 17} width="110" height="34" rx="3" />
          <path d={`M54 ${y} H92`} opacity=".5" />
          <circle className="led" style={{ animationDelay: i * 0.35 + 's' }} cx="122" cy={y} r="3" fill="currentColor" stroke="none" />
          <circle cx="134" cy={y} r="3" opacity=".4" />
        </g>
      ))}
      <path d="M30 214 H160" opacity=".4" />

      <path className="flow" d={LINK} />
      <circle r="3" fill="currentColor" stroke="none">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={LINK} />
      </circle>

      <circle cx="230" cy="120" r="22" />
      <circle cx="230" cy="120" r="7" fill="currentColor" stroke="none" />
      <circle cx="230" cy="120" r="22">
        <animate attributeName="r" values="22;36" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".6;0" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {Y.map((y, i) => {
        const d = `M252 120 H282 V${y} H312`;
        return (
          <g key={y}>
            <path className="flow" d={d} opacity=".7" />
            <circle r="3" fill="currentColor" stroke="none" opacity="0">
              <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} keyPoints="0;1;1" keyTimes="0;.375;1" calcMode="linear" />
              <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.375;.42;1" dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
            <rect x="312" y={y - 15} width="48" height="30" rx="3" />
            <g opacity=".45">
              {GLYPHS[i](y)}
              <animate attributeName="opacity" values=".45;.45;1;.45" keyTimes="0;.375;.45;1" dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </g>
          </g>
        );
      })}
    </g>
  );
}
