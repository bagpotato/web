import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '../data/links.js';
import Birds from './Birds.jsx';
import Magnetic from './Magnetic.jsx';

const HILL = 'M0 180V120C200 90 340 140 560 118S900 70 1100 108S1340 120 1440 96V180Z';
// x, tree top, base, half width. Bases sit just inside the hill.
const PINES = [[120, 58, 118, 17], [160, 74, 120, 13], [192, 64, 124, 15], [520, 74, 128, 15], [556, 88, 126, 11], [900, 30, 96, 18], [945, 46, 94, 14], [985, 38, 100, 16], [1290, 66, 122, 15], [1330, 78, 122, 12]];

const pine = ([x, top, base, w]) => {
  const h = base - top;
  const side = (s) => `L${x + s * w * 0.5} ${top + h * 0.38}H${x + s * w * 0.25}L${x + s * w * 0.75} ${top + h * 0.7}H${x + s * w * 0.4}L${x + s * w} ${base}`;
  const left = `H${x - w}L${x - w * 0.4} ${top + h * 0.7}H${x - w * 0.75}L${x - w * 0.25} ${top + h * 0.38}H${x - w * 0.5}Z`;
  return `M${x} ${top}${side(1)}${left}`;
};

const FOOT_LINK = 'inline-flex min-h-11 min-w-11 items-center underline-offset-4 hover:underline';

export default function Contact() {
  const ground = useRef(null);
  const end = useRef(null);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      setFlying(true);
    }, { threshold: 1 });
    io.observe(end.current);
    return () => io.disconnect();
  }, []);

  return (
    <footer id="contact" className="scroll-mt-16 border-t border-line pt-28 md:pt-40">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-[clamp(2.8rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em]">Let’s talk</h2>
          <p className="mt-6 max-w-md text-mute">Got a project or an idea? Write to me.</p>
          <Magnetic href={`mailto:${LINKS.mail}`} className="mt-10 items-center gap-3 rounded-full bg-fg px-6 py-4 text-base text-bg md:px-8 md:py-5 md:text-lg">
            {LINKS.mail}
            <ArrowUpRight size={20} />
          </Magnetic>
        </div>
      </div>

      <div ref={ground} className="mt-16 md:mt-24">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="xMidYMax slice" className="-mb-px block w-full text-ground" style={{ height: 'clamp(110px, 14vw, 200px)' }} aria-hidden="true">
          <path fill="currentColor" d={`${HILL}${PINES.map(pine).join('')}`} />
        </svg>
        <div className="bg-ground px-6 pb-6 pt-2 text-sm text-onground md:px-10">
          <div ref={end} className="mx-auto flex max-w-[1400px] flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Juan David Morales Mendoza</p>
            <ul className="flex gap-6">
              <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer" className={FOOT_LINK}>GitHub</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={FOOT_LINK}>LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      {flying && <Birds origin={ground} onDone={() => setFlying(false)} />}
    </footer>
  );
}
