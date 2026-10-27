import { S } from '../../data/styles.js';

const NODES = [72, 172, 272];
const ROUTES = ['M200 120 V140 H100 V166', 'M200 120 V166', 'M200 120 V140 H300 V166'];

export default function ArtNet() {
  return (
    <g {...S}>
      <path d="M200 28 L238 42 V74 C238 96 222 110 200 120 C178 110 162 96 162 74 V42 Z" />
      <path className="draw" pathLength="1" d="M186 74 L197 85 L216 62" />
      <circle cx="200" cy="74" r="30" opacity="0">
        <animate attributeName="r" values="30;74" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".5;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <path className="flow" d={ROUTES.join(' ')} />
      {ROUTES.map((d, i) => (
        <circle key={d} r="3" fill="currentColor" stroke="none">
          <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
      {NODES.map((x, i) => (
        <g key={x}>
          <rect x={x} y="166" width="56" height="30" rx="3" />
          <circle className="led" style={{ animationDelay: i * 0.4 + 's' }} cx={x + 12} cy="181" r="2.5" fill="currentColor" stroke="none" />
          <path d={`M${x + 22} 181 H${x + 46}`} opacity=".5" />
        </g>
      ))}
      <rect x="56" y="150" width="288" height="1.5" rx=".75" fill="currentColor" stroke="none" opacity="0">
        <animate attributeName="y" values="150;204" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;.6;.6;0" keyTimes="0;.15;.85;1" dur="3s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}
