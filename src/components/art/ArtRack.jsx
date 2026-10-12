import { S } from '../../data/styles.js';

export default function ArtRack() {
  return (
    <g {...S}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="110" y={34 + i * 44} width="180" height="34" rx="3" />
          <path d={`M126 ${51 + i * 44} H190`} opacity=".5" />
          <circle className="led" style={{ animationDelay: i * 0.35 + 's' }} cx="262" cy={51 + i * 44} r="3" fill="currentColor" stroke="none" />
          <circle cx="274" cy={51 + i * 44} r="3" opacity=".4" />
        </g>
      ))}
      <path d="M90 214 H310" opacity=".4" />
    </g>
  );
}
