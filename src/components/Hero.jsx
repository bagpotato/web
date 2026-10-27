import { lazy, Suspense } from 'react';
import { Mail } from 'lucide-react';
import { LINKS } from '../data/links.js';
import Magnetic from './Magnetic.jsx';

const TechModel = lazy(() => import('./TechModel.jsx'));

const SOCIAL = [
  ['GitHub', LINKS.github, <i key="g" className="bi bi-github" />],
  ['LinkedIn', LINKS.linkedin, <i key="l" className="bi bi-linkedin" />],
  ['Email', `mailto:${LINKS.mail}`, <Mail key="m" size={18} />]
];

export default function Hero() {
  return (
    <section id="inicio" className="flex min-h-[100svh] flex-col justify-end px-6 pb-12 pt-32 md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="relative">
          <Suspense fallback={null}>
            <TechModel className="rise mb-8 ml-auto h-40 w-40 sm:h-52 sm:w-52 md:absolute md:bottom-0 md:right-0 md:mb-0 md:h-[min(72svh,46rem)] md:w-[36%] md:max-w-[34rem]" />
          </Suspense>
          <h1 className="rise w-fit text-[clamp(3.2rem,11.5vw,11rem)] font-medium leading-[0.92] tracking-[-0.045em]">Juan David<br />Morales</h1>
        </div>
        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="rise max-w-xl text-xl leading-snug md:text-2xl" style={{ '--i': 2 }}>Infrastructure, systems and security. 2nd-year SMX student at ITB, Barcelona.</p>
          <ul className="rise flex gap-3" style={{ '--i': 3 }}>
            {SOCIAL.map(([label, href, icon]) => (
              <li key={label}>
                <Magnetic href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label} className="h-12 w-12 items-center justify-center rounded-full border border-line text-lg transition-colors hover:bg-fg hover:text-bg">{icon}</Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
