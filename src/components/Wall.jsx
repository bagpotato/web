import { PROJECTS } from '../data/projects.js';
import MonitorBar from './MonitorBar.jsx';
import Screen from './Screen.jsx';

export default function Wall({ onOpen }) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
      {PROJECTS.map((p, i) => (
        <li key={p.title} className="bg-black">
          <button onClick={() => onOpen(i)} className="block w-full text-left hover:bg-neutral-950 transition-colors" aria-label={`Ver detalle de ${p.title}`}>
            <MonitorBar id={`NOC-0${i + 1}`} />
            <Screen Art={p.Art} />
            <div className="px-4 py-4 border-t border-neutral-800">
              <h3 className="font-semibold text-lg leading-snug">{p.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{p.tags.join(', ')}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
