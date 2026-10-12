import { S } from '../../data/styles.js';

export default function ArtBackup() {
  return (
    <g {...S}>
      <ellipse cx="90" cy="76" rx="40" ry="12" />
      <path d="M50 76 V108 C50 115 68 120 90 120 C112 120 130 115 130 108 V76" />
      <path d="M50 108 V140 C50 147 68 152 90 152 C112 152 130 147 130 140 V108" />
      <path d="M50 140 V164 C50 171 68 176 90 176 C112 176 130 171 130 164 V140" />
      <path className="flow" d="M150 120 H250" />
      <circle r="4" fill="currentColor" stroke="none">
        <animateMotion dur="2s" repeatCount="indefinite" path="M150 120 H250" />
      </circle>
      <path d="M278 160 a24 24 0 0 1 2 -47 a36 36 0 0 1 68 6 a20 20 0 0 1 4 41 z" />
      <path d="M314 150 V122 M302 134 L314 122 L326 134" />
      <rect x="150" y="204" width="100" height="8" rx="1" opacity=".5" />
      <rect x="150" y="204" height="8" rx="1" fill="currentColor" stroke="none">
        <animate attributeName="width" values="0;100;100" keyTimes="0;0.7;1" dur="3.2s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}
