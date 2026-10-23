import { H } from '../data/styles.js';

const TEXT = ['Redes', 'Sistemas', 'Seguridad', 'Linux', 'Infraestructura'];

export default function Marquee() {
  return (
    <div className="marquee border-y border-black overflow-hidden" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {TEXT.map((t) => (
              <li key={t} className="flex items-center whitespace-nowrap py-5 pl-16 text-4xl md:text-6xl font-bold" style={H}>
                {t}
                <span className="ml-16 inline-block h-3 w-3 bg-black" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
