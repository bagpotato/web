import { EDU } from '../data/education.js';

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-16 border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-[1fr_2fr]">
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Sobre mí</h2>
        <div>
          <p className="max-w-2xl text-2xl leading-snug md:text-3xl">Estudio Sistemas Microinformáticos y Redes en el ITB, en Barcelona. Me interesa montar y asegurar infraestructura: Linux, redes, servidores web y automatización.</p>
          <p className="mt-6 max-w-2xl text-mute">Linux multidistro y seguridad IT, servidores web, networking y Cisco, Python, Bash y scripting.</p>
          <ul className="mt-16 divide-y divide-line border-y border-line">
            {EDU.map((e) => (
              <li key={e.title} className="grid gap-1 py-6 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <h3 className="text-lg font-medium">{e.title}</h3>
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
