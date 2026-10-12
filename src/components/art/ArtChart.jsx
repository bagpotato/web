import { S } from '../../data/styles.js';

export default function ArtChart() {
  return (
    <g {...S}>
      <path d="M30 30 V200 H376" opacity=".5" />
      <path d="M30 96 H376" strokeDasharray="3 6" opacity=".45" />
      <path className="draw" pathLength="1" d="M34 150 L72 142 L110 152 L150 132 L190 146 L222 58 L254 140 L292 126 L332 138 L372 122" />
      <circle cx="222" cy="58" r="4" fill="currentColor" stroke="none" />
      <circle cx="222" cy="58" r="8">
        <animate attributeName="r" values="8;22;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}
