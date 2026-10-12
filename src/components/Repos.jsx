import { REPOS } from '../data/repos.js';
import { LINKS } from '../data/links.js';
import { H } from '../data/styles.js';

export default function Repos() {
  return (
    <div>
      <ul className="border-t border-black">
        {REPOS.map((r) => (
          <li key={r.name} className="border-b border-line">
            <a href={`${LINKS.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="group grid md:grid-cols-[minmax(0,260px)_1fr_auto] gap-x-10 gap-y-1 items-baseline py-7 px-3 -mx-3 transition-colors duration-200 hover:bg-black hover:text-paper">
              <h3 className="text-2xl font-bold" style={H}>{r.name}</h3>
              <p className="text-steel group-hover:text-neutral-300 max-w-xl transition-colors">{r.text}</p>
              <span className="font-mono text-sm">{r.lang}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm underline underline-offset-4">
        <i className="bi bi-github" /> Ver todos en github.com/bagpotato
      </a>
    </div>
  );
}
