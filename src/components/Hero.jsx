import { LINKS, PHOTO } from '../data/links.js';
import useClock from '../hooks/useClock.js';
import Wordmark from './Wordmark.jsx';
import MonitorBar from './MonitorBar.jsx';

export default function Hero() {
  const time = useClock();
  const rows = [['ubicación', 'Barcelona'], ['hora local', time], ['curso', '2º SMX, ITB'], ['enfoque', 'Infraestructura y sistemas']];

  return (
    <section id="inicio" className="pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Wordmark />
        <div className="mt-12 md:mt-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-end">
          <div className="ln" style={{ '--d': '900ms' }}>
            <p className="text-xl md:text-2xl leading-snug max-w-lg">Estudiante de 2º SMX en el ITB. Especialista en Infraestructura y Sistemas.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#proyectos" className="bg-black text-paper px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">Ver proyectos</a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-black px-5 py-3 text-sm hover:bg-black hover:text-paper transition-colors"><i className="bi bi-github" /> GitHub</a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-black px-5 py-3 text-sm hover:bg-black hover:text-paper transition-colors"><i className="bi bi-linkedin" /> LinkedIn</a>
            </div>
          </div>
          <div className="ln bg-black text-white font-mono text-sm w-full max-w-md md:ml-auto" style={{ '--d': '1150ms' }}>
            <MonitorBar id="NOC-00" />
            {PHOTO && <img src={PHOTO} alt="Juan David Morales Mendoza" className="w-full aspect-[4/3] object-cover grayscale border-b border-neutral-800" />}
            <dl className="px-4 divide-y divide-neutral-800">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3">
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
