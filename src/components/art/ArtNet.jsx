import { S } from '../../data/styles.js';

export default function ArtNet() {
  return (
    <g {...S}>
      <path d="M200 28 L238 42 V74 C238 96 222 110 200 120 C178 110 162 96 162 74 V42 Z" />
      <path d="M186 74 L197 85 L216 62" />
      <path className="flow" d="M200 120 V140 M200 140 H100 V166 M200 140 V166 M200 140 H300 V166" />
      {[72, 172, 272].map((x, i) => (
        <g key={x}>
          <rect x={x} y="166" width="56" height="30" rx="3" />
          <circle className="led" style={{ animationDelay: i * 0.4 + 's' }} cx={x + 12} cy="181" r="2.5" fill="currentColor" stroke="none" />
          <path d={`M${x + 22} 181 H${x + 46}`} opacity=".5" />
        </g>
      ))}
    </g>
  );
}
