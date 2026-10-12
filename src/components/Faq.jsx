import { useState } from 'react';
import { FAQ } from '../data/faq.js';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="max-w-3xl border-t border-black">
      {FAQ.map(([q, a], i) => {
        const o = open === i;
        return (
          <li key={q} className="border-b border-black/20">
            <h3>
              <button onClick={() => setOpen(o ? -1 : i)} aria-expanded={o} className="w-full flex items-center justify-between gap-6 py-6 text-left text-xl font-semibold">
                <span>{q}</span>
                <i className={`bi bi-plus-lg shrink-0 transition-transform duration-300 ${o ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ${o ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-6 text-steel max-w-xl">{a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
