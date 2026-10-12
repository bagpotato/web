import { S } from '../../data/styles.js';

export default function ArtMail() {
  return (
    <g {...S}>
      <rect x="40" y="82" width="96" height="68" rx="4" />
      <path d="M40 90 L88 124 L136 90" />
      <path className="flow" d="M150 116 H250" />
      <circle r="4" fill="currentColor" stroke="none">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M150 116 H250" />
      </circle>
      <rect x="264" y="60" width="96" height="112" rx="4" />
      <path d="M278 84 H320 M278 108 H346 M278 132 H336 M278 156 H310" opacity=".55" />
    </g>
  );
}
