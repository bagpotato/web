import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const ITEMS = [['Proyectos', '#proyectos'], ['Sobre mí', '#sobre-mi'], ['Contacto', '#contacto']];
const BTN = 'grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg';

export default function Nav({ dark, toggle }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#inicio" className="font-medium tracking-tight">Juan David Morales</a>
        <nav className="hidden gap-10 text-sm md:flex">
          {ITEMS.map(([t, h]) => <a key={h} href={h} className="text-mute transition-colors hover:text-fg">{t}</a>)}
        </nav>
        <div className="flex gap-2">
          <button onClick={toggle} className={BTN} aria-label={dark ? 'Tema claro' : 'Tema oscuro'}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button onClick={() => setOpen(!open)} className={`${BTN} md:hidden`} aria-label="Menú" aria-expanded={open}>{open ? <X size={16} /> : <Menu size={16} />}</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-line bg-bg px-6 py-2 md:hidden">
          {ITEMS.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-line py-4 text-lg last:border-0">{t}</a>)}
        </nav>
      )}
    </header>
  );
}
