import { S } from '../../data/styles.js';

export default function ArtWeb() {
  return (
    <g {...S}>
      <rect x="60" y="30" width="280" height="180" rx="4" />
      <path d="M60 62 H340" />
      <circle cx="80" cy="46" r="3" />
      <circle cx="94" cy="46" r="3" />
      <circle cx="108" cy="46" r="3" />
      <rect x="130" y="38" width="190" height="16" rx="8" opacity=".55" />
      <path d="M92 84 H170 M230 84 H308 M92 188 H308" opacity=".4" />
      <rect x="178" y="124" width="44" height="36" rx="4" />
      <path d="M186 124 V112 a14 14 0 0 1 28 0 V124" />
      <circle cx="200" cy="142" r="3" fill="currentColor" stroke="none" />
    </g>
  );
}
