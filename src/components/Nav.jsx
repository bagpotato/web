import { Sun, Moon } from 'lucide-react';

export default function Nav({ dark, toggle }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#inicio" className="inline-flex min-h-11 items-center font-medium tracking-tight">Juan David Morales</a>
        <button onClick={toggle} className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg" aria-label={dark ? 'Light theme' : 'Dark theme'}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
      </div>
    </header>
  );
}
