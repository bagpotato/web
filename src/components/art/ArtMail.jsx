import { S } from '../../data/styles.js';

const ROWS = [84, 112, 140];

export default function ArtMail() {
  return (
    <g {...S}>
      <rect x="40" y="82" width="96" height="68" rx="4" />
      <path d="M40 90 L88 124 L136 90" />
      <path className="flow" d="M150 116 H250" />
      <circle r="4" fill="currentColor" stroke="none">
        <animateMotion dur="4s" repeatCount="indefinite" path="M150 116 H250" keyPoints="0;1;1" keyTimes="0;.4;1" calcMode="linear" />
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.4;.45;1" dur="4s" repeatCount="indefinite" />
      </circle>
      <rect x="264" y="60" width="96" height="112" rx="4" />
      {ROWS.map((y, i) => {
        const a = 0.4 + i * 0.13;
        return (
          <g key={y}>
            <rect x="276" y={y - 6} width="12" height="12" rx="2" />
            <path d={`M298 ${y} H${[342, 334, 322][i]}`} opacity=".55" />
            <path pathLength="1" strokeDasharray="1" strokeDashoffset="1" d={`M279 ${y} L282 ${y + 3} L286 ${y - 4}`}>
              <animate attributeName="stroke-dashoffset" values="1;1;0;0;1" keyTimes={`0;${a};${a + 0.1};.92;1`} dur="4s" repeatCount="indefinite" />
            </path>
          </g>
        );
      })}
    </g>
  );
}
