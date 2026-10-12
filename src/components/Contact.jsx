import { useState } from 'react';
import { LINKS } from '../data/links.js';
import { H } from '../data/styles.js';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.mail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = 'mailto:' + LINKS.mail;
    }
  };

  return (
    <div>
      <a href={`mailto:${LINKS.mail}`} className="mail block font-bold leading-[1.05] tracking-tight break-all" style={{ ...H, fontSize: 'clamp(1.5rem, 5.4vw, 4.75rem)' }}>{LINKS.mail}</a>
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={copy} className="flex items-center gap-2 border border-white px-5 py-3 text-sm hover:bg-white hover:text-black transition-colors">
          <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'}`} /> {copied ? 'Correo copiado' : 'Copiar correo'}
        </button>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white px-5 py-3 text-sm hover:bg-white hover:text-black transition-colors"><i className="bi bi-github" /> GitHub</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white px-5 py-3 text-sm hover:bg-white hover:text-black transition-colors"><i className="bi bi-linkedin" /> LinkedIn</a>
      </div>
    </div>
  );
}
