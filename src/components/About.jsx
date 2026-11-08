import { EDU } from '../data/education.js';
import { TOOLS } from '../data/tools.js';

const ROW = 'grid gap-1 py-6 md:grid-cols-[1fr_2fr] md:gap-8';

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-[1fr_2fr]">
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">About</h2>
        <div>
          <p className="max-w-2xl text-2xl leading-snug md:text-3xl">I build and secure infrastructure: Linux, networks and automation.</p>
          <p className="mt-8 max-w-2xl text-lg text-mute">I’m in my second year of Microcomputer Systems and Networks at ITB in Barcelona. Some projects start as coursework, like SecNet-Auditor, and others because I wanted the tool to exist. I prefer software I can read, run and switch off myself, which is why most of it runs locally.</p>

          <h3 className="mt-16 text-lg font-medium">What I work with</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {TOOLS.map(({ area, items }) => (
              <li key={area} className={ROW}>
                <p className="text-mute">{area}</p>
                <p>{items}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-16 text-lg font-medium">Education</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {EDU.map((e) => (
              <li key={e.title} className="grid gap-1 py-6 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <h4 className="text-lg font-medium">{e.title}</h4>
                  <p className="text-mute">{e.place}</p>
                </div>
                <p className="text-mute md:text-right">{e.meta}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
