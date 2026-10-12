import { H } from '../data/styles.js';

export default function Section({ id, title, intro, tone = 'paper', children }) {
  const bg = { paper: '', mist: 'bg-mist', dark: 'bg-black text-white' }[tone];

  return (
    <section id={id} className={`scroll-mt-16 py-24 md:py-32 ${bg}`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <h2 className="font-bold tracking-tight text-4xl md:text-6xl leading-[1.02] max-w-3xl" style={H}>{title}</h2>
        {intro && <p className={`mt-4 max-w-xl ${tone === 'dark' ? 'text-neutral-400' : 'text-steel'}`}>{intro}</p>}
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
