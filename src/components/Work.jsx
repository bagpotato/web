import { ArrowUpRight, Plus } from 'lucide-react';
import { WORK } from '../data/work.js';
import { LINKS } from '../data/links.js';
import { projectHref } from '../hooks/useProjectRoute.js';
import ProjectArt from './ProjectArt.jsx';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const LINK = 'inline-flex h-11 items-center gap-1 text-mute transition-colors hover:text-fg';

export default function Work() {
  return (
    <section id="projects" className="scroll-mt-16 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Projects</h2>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {WORK.map(({ slug, repo, title, text, tags, Art, wide, canvas, demo }) => (
            <li key={repo} className={`group relative flex flex-col overflow-hidden border border-line bg-card transition-colors duration-300 hover:border-fg ${wide ? 'md:col-span-2' : ''}`}>
              <div className={`overflow-hidden border-b border-line ${wide ? (canvas ? 'aspect-[5/3] md:aspect-[16/7]' : 'aspect-[16/7]') : 'aspect-[5/3]'}`}>
                <ProjectArt Art={Art} canvas={canvas} className="transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-tight"><a href={projectHref(slug)} className="card-link">{title}</a></h3>
                  <Plus size={22} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:rotate-90" />
                </div>
                <p className="max-w-md text-mute">{text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-3">
                  {tags.map((t) => <li key={t} className="border border-line px-2.5 py-1 text-xs">{t}</li>)}
                </ul>
                <div className="relative z-10 -mb-3 flex gap-5 text-sm">
                  {demo && <a href={demo} {...external} aria-label={`Live demo of ${title}`} className={LINK}>Live demo <ArrowUpRight size={14} /></a>}
                  <a href={`${LINKS.github}/${repo}`} {...external} aria-label={`Code of ${title} on GitHub`} className={LINK}>Code <ArrowUpRight size={14} /></a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
