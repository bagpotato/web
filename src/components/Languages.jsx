import { LANGS, CEFR } from '../data/languages.js';
import { H } from '../data/styles.js';

export default function Languages() {
  return (
    <ul className="max-w-3xl border-t border-black">
      {LANGS.map(([name, level, k]) => (
        <li key={name} className="py-6 border-b border-black/20">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold" style={H}>{name}</span>
            <span className="font-mono">{level}</span>
          </div>
          <div className="mt-4 flex gap-1" role="img" aria-label={`${name}: ${level}`}>
            {CEFR.map((c, i) => (
              <div key={c} className="flex-1">
                <div className={`h-2 ${i < k ? 'bg-black' : 'bg-line'}`} />
                <p className="mt-1.5 font-mono text-[11px] text-steel">{c}</p>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
