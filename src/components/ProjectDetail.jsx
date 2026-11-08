import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { WORK } from '../data/work.js';
import { LINKS } from '../data/links.js';
import { projectHref } from '../hooks/useProjectRoute.js';
import Magnetic from './Magnetic.jsx';
import ProjectArt from './ProjectArt.jsx';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const PRIMARY = 'items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-bg';
const SECONDARY = 'items-center gap-2 rounded-full border border-line px-6 py-3.5 transition-colors hover:bg-fg hover:text-bg';

function Neighbor({ project, label, end }) {
  const go = (e) => {
    e.preventDefault();
    window.location.replace(projectHref(project.slug));
  };

  return (
    <a href={projectHref(project.slug)} onClick={go} className={`group py-8 md:py-12 ${end ? 'border-l border-line pl-6 text-right md:pl-10' : 'pr-6 md:pr-10'}`}>
      <span className="block text-sm text-mute">{label}</span>
      <span className="mt-1 block text-xl font-medium leading-tight tracking-tight underline-offset-4 group-hover:underline md:text-3xl">{project.title}</span>
    </a>
  );
}

export default function ProjectDetail({ project, onClose }) {
  const dialog = useRef(null);
  const index = WORK.indexOf(project);
  const previous = WORK[(index - 1 + WORK.length) % WORK.length];
  const next = WORK[(index + 1) % WORK.length];
  const code = `${LINKS.github}/${project.repo}`;

  useLayoutEffect(() => {
    const el = dialog.current;
    const root = document.documentElement;
    el.showModal();
    root.style.overflow = 'hidden';
    return () => {
      el.close();
      root.style.overflow = '';
    };
  }, []);

  useLayoutEffect(() => {
    dialog.current.scrollTop = 0;
  }, [project]);

  return (
    <dialog ref={dialog} onClose={onClose} aria-labelledby="project-title" className="m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto bg-bg p-0 text-fg">
      <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <p className="text-sm text-mute">Project {index + 1} of {WORK.length}</p>
          <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg" aria-label="Close project"><X size={16} /></button>
        </div>
      </header>

      <article key={project.slug} className="panel-in mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 id="project-title" className="break-words pt-12 text-[clamp(2.8rem,8vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em] md:pt-20">{project.title}</h2>

        <div className="mt-12 grid items-start gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
          <div className="aspect-[5/3] overflow-hidden border border-line bg-card md:sticky md:top-24">
            <ProjectArt Art={project.Art} canvas={project.canvas} />
          </div>

          <div>
            <p className="max-w-2xl text-2xl leading-snug md:text-3xl">{project.summary}</p>
            <ul className="mt-12 divide-y divide-line border-y border-line">
              {project.points.map((point) => <li key={point} className="max-w-2xl py-5 text-lg leading-snug">{point}</li>)}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Built with">
              {project.stack.map((item) => <li key={item} className="border border-line px-2.5 py-1 text-xs">{item}</li>)}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              {project.demo && <Magnetic href={project.demo} {...external} className={PRIMARY}>Open live demo <ArrowUpRight size={18} /></Magnetic>}
              <Magnetic href={code} {...external} className={project.demo ? SECONDARY : PRIMARY}>View code on GitHub <ArrowUpRight size={18} /></Magnetic>
            </div>
          </div>
        </div>

        <nav aria-label="More projects" className="mt-20 grid grid-cols-2 border-t border-line md:mt-32">
          <Neighbor project={previous} label="Previous" />
          <Neighbor project={next} label="Next" end />
        </nav>
      </article>
    </dialog>
  );
}
