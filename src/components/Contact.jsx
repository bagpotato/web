import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '../data/links.js';
import Magnetic from './Magnetic.jsx';

export default function Contact() {
  return (
    <footer id="contacto" className="scroll-mt-16 border-t border-line px-6 pb-8 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-[clamp(2.8rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em]">¿Hablamos?</h2>
        <p className="mt-6 max-w-md text-mute">Si tienes un proyecto o una propuesta, escríbeme.</p>
        <Magnetic href={`mailto:${LINKS.mail}`} className="mt-10 items-center gap-3 rounded-full bg-fg px-6 py-4 text-base text-bg md:px-8 md:py-5 md:text-lg">
          {LINKS.mail}
          <ArrowUpRight size={20} />
        </Magnetic>
        <div className="mt-28 flex flex-col gap-4 border-t border-line pt-6 text-sm text-mute md:flex-row md:justify-between">
          <p>© 2026 Juan David Morales Mendoza</p>
          <ul className="flex gap-6">
            <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">GitHub</a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
