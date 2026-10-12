import { PROJECTS } from '../data/projects.js';
import { LINKS } from '../data/links.js';
import { H } from '../data/styles.js';
import Dialog from './Dialog.jsx';
import MonitorBar from './MonitorBar.jsx';
import Screen from './Screen.jsx';

export default function ProjectViewer({ index, onClose }) {
  const i = index == null ? 0 : index;
  const p = PROJECTS[i];

  return (
    <Dialog open={index != null} onClose={onClose} label={p.title} className="bg-black text-white w-[min(62rem,94vw)] border border-neutral-700">
      <div className="grid md:grid-cols-[1.35fr_1fr]">
        <div className="border-b md:border-b-0 md:border-r border-neutral-800">
          <MonitorBar id={`NOC-0${i + 1}`} />
          <Screen Art={p.Art} />
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold leading-tight" style={H}>{p.title}</h3>
            <button onClick={onClose} aria-label="Cerrar" className="h-9 w-9 shrink-0 grid place-items-center border border-neutral-600 hover:bg-white hover:text-black transition-colors"><i className="bi bi-x-lg" /></button>
          </div>
          <p className="mt-4 text-neutral-300 leading-relaxed">{p.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => <li key={t} className="font-mono text-xs border border-neutral-600 px-2.5 py-1">{t}</li>)}
          </ul>
          {p.repo && (
            <a href={`${LINKS.github}/${p.repo}`} target="_blank" rel="noopener noreferrer" className="mt-auto pt-8 inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-neutral-300">
              <i className="bi bi-github" /> Ver repositorio
            </a>
          )}
        </div>
      </div>
    </Dialog>
  );
}
