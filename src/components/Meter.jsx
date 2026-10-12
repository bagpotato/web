import { LEVEL } from '../data/skills.js';

export default function Meter({ n, total }) {
  return (
    <span className="flex gap-1" role="img" aria-label={`${LEVEL[n]}`}>
      {Array.from({ length: total }, (_, i) => <span key={i} className={`h-2 w-6 ${i < n ? 'bg-black' : 'bg-line'}`} />)}
    </span>
  );
}
