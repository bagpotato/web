import { EDU } from '../data/education.js';
import { H } from '../data/styles.js';

export default function Education() {
  return (
    <ol className="relative max-w-3xl border-l border-black ml-2">
      {EDU.map((e) => (
        <li key={e.title} className="relative pl-10 pb-12 last:pb-0">
          <span className={`absolute -left-[8px] top-2 h-3.5 w-3.5 rounded-full border border-black ${e.now ? 'bg-black' : 'bg-paper'}`} />
          <h3 className="text-2xl font-bold leading-snug" style={H}>{e.title}</h3>
          <p className="mt-1 text-steel">{e.place}, {e.meta}</p>
          {e.now && <span className="inline-block mt-3 bg-black text-paper font-mono text-xs px-2.5 py-1">en curso</span>}
        </li>
      ))}
    </ol>
  );
}
