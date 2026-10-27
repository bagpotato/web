import { ArrowUpRight } from 'lucide-react';
import { WORK } from '../data/work.js';
import { LINKS } from '../data/links.js';

export default function Work() {
  return (
    <section id="projects" className="scroll-mt-16 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Projects</h2>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {WORK.map(({ repo, title, text, tags, Art, wide, canvas }) => (
            <li key={repo} className={wide ? 'md:col-span-2' : ''}>
              <a href={`${LINKS.github}/${repo}`} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden border border-line bg-card transition-colors duration-300 hover:border-fg">
                <div className={`overflow-hidden border-b border-line ${wide ? (canvas ? 'aspect-[5/3] md:aspect-[16/7]' : 'aspect-[16/7]') : 'aspect-[5/3]'}`}>
                  {canvas ? (
                    <Art className="transition-transform duration-700 ease-out group-hover:scale-105" />
                  ) : (
                    <svg viewBox="0 0 400 240" className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105" aria-hidden="true"><Art /></svg>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-medium tracking-tight">{title}</h3>
                    <ArrowUpRight size={22} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <p className="max-w-md text-mute">{text}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-3">
                    {tags.map((t) => <li key={t} className="border border-line px-2.5 py-1 text-xs">{t}</li>)}
                  </ul>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
