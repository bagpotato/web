import { useEffect, useRef } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { WORK } from '../data/work.js';
import { LINKS } from '../data/links.js';
import { projectHref } from '../hooks/useProjectRoute.js';
import ProjectArt from './ProjectArt.jsx';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const LINK = 'inline-flex h-11 items-center gap-1 text-mute transition-colors hover:text-fg';

// The wheel is pure CSS (see .fan in index.css): a scroll timeline drives --p from 0 to 1
// while the section is pinned. This effect only covers what CSS cannot do.
export default function Work() {
  const section = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    const el = section.current;
    // Same condition as the wheel's media query in index.css.
    const motion = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 600px)');
    const native = CSS.supports('animation-timeline: view()') && CSS.supports('animation-range: 0% 100%');

    // Where the page must be scrolled for card i to sit at the top of the wheel.
    const scrollFor = (i) => {
      const r = el.getBoundingClientRect();
      return window.scrollY + r.top + (i / (WORK.length - 1)) * (r.height - window.innerHeight);
    };

    // Older browsers without scroll-driven animations: set --p from a scroll listener.
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const max = r.height - window.innerHeight;
      stage.current.style.setProperty('--p', max > 0 ? Math.min(1, Math.max(0, -r.top / max)) : 0);
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    if (!native) {
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      update();
    }

    // Tabbing into a card that is rotated off screen spins the wheel to it. Wait a frame,
    // so this runs after the browser's own scroll-into-view for the focused element.
    const onFocus = (e) => {
      const card = motion.matches && e.target.closest('[data-i]');
      if (card) requestAnimationFrame(() => window.scrollTo({ top: scrollFor(Number(card.dataset.i)), behavior: 'instant' }));
    };
    el.addEventListener('focusin', onFocus);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      el.removeEventListener('focusin', onFocus);
    };
  }, []);

  return (
    <section id="projects" ref={section} aria-labelledby="projects-title" style={{ '--n': WORK.length }} className="fan scroll-mt-16">
      {WORK.map(({ repo }, i) => <span key={repo} className="fan-snap" style={{ '--i': i }} aria-hidden="true" />)}
      <div ref={stage} className="fan-stage">
        <div className="fan-head mx-auto flex max-w-[1400px] items-end justify-between gap-6">
          <h2 id="projects-title" className="text-4xl font-medium tracking-tight md:text-6xl">Projects</h2>
          <div className="fan-hint text-sm text-mute" aria-hidden="true">
            <span>Scroll to spin</span>
            <span className="fan-bar" />
          </div>
        </div>
        <ul className="fan-wheel mx-auto mt-14 grid max-w-[1400px] gap-4 md:grid-cols-3">
          {WORK.map(({ slug, repo, title, text, tags, Art, canvas, demo }, i) => (
            <li key={repo} data-i={i} className="fan-card" style={{ '--i': i }}>
              <article className="fan-face group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-300 hover:border-fg">
                <div className="fan-art aspect-[5/3] shrink-0 overflow-hidden border-b border-line">
                  <ProjectArt Art={Art} canvas={canvas} className="transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-2 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium leading-tight tracking-tight"><a href={projectHref(slug)} className="card-link">{title}</a></h3>
                    <Plus size={20} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                  <p className="fan-text text-sm text-mute">{text}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {tags.map((t) => <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs">{t}</li>)}
                  </ul>
                  <div className="relative z-10 -mb-3 flex gap-5 text-sm">
                    {demo && <a href={demo} {...external} aria-label={`Live demo of ${title}`} className={LINK}>Live demo <ArrowUpRight size={14} /></a>}
                    <a href={`${LINKS.github}/${repo}`} {...external} aria-label={`Code of ${title} on GitHub`} className={LINK}>Code <ArrowUpRight size={14} /></a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
