import { SKILLS, LEVEL } from '../data/skills.js';
import Meter from './Meter.jsx';

export default function Skills() {
  return (
    <ul className="grid md:grid-cols-2 md:gap-x-16 border-t border-black">
      {SKILLS.map(([name, lvl]) => (
        <li key={name} className="flex items-center justify-between gap-6 py-5 border-b border-black/20">
          <span className="font-semibold text-lg">{name}</span>
          <span className="flex items-center gap-4">
            <span className="text-sm text-steel">{LEVEL[lvl]}</span>
            <Meter n={lvl} total={3} />
          </span>
        </li>
      ))}
    </ul>
  );
}
