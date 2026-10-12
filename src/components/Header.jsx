import { useState, useEffect } from 'react';
import { NAV } from '../data/nav.js';
import { H } from '../data/styles.js';
import useActive from '../hooks/useActive.js';

export default function Header({ onPlay }) {
  const active = useActive(['inicio', ...NAV.map((n) => n[0])]);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? 'bg-paper/90 backdrop-blur border-b border-line' : 'border-b border-transparent'}`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-bold text-lg tracking-tight" style={H}>Juan David Morales</a>
        <nav aria-label="Secciones" className="hidden lg:flex items-center gap-8">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="relative text-sm py-1">
              {label}
              <span className={`absolute left-0 -bottom-0.5 h-px bg-black transition-all duration-300 ${active === id ? 'w-full' : 'w-0'}`} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onPlay} className="hidden sm:flex items-center gap-2 border border-black px-4 py-2 text-sm hover:bg-black hover:text-paper transition-colors">
            <i className="bi bi-controller" /> ¿Play Game?
          </button>
          <button className="lg:hidden h-10 w-10 grid place-items-center border border-black" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
            <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'} text-lg`} />
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Secciones" className="lg:hidden border-t border-line px-6 py-4 fade-in">
          <ul className="flex flex-col">
            {NAV.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 border-b border-line">{label}</a></li>
            ))}
            <li className="pt-4">
              <button onClick={() => { setOpen(false); onPlay(); }} className="flex items-center gap-2 border border-black px-4 py-2.5 text-sm">
                <i className="bi bi-controller" /> ¿Play Game?
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
