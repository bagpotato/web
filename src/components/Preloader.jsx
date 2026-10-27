import { useEffect, useState } from 'react';

const ARM = 'M50 50C41 45 48 24 50 6C52 24 59 45 50 50Z';

export default function Preloader({ onReveal }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const a = setTimeout(() => {
      setLeaving(true);
      onReveal?.();
    }, 2400);
    const b = setTimeout(() => {
      document.body.style.overflow = '';
      setGone(true);
    }, 3100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`pl ${leaving ? 'pl--out' : ''}`} aria-hidden="true">
      <svg className="pl-star" viewBox="0 0 100 100">
        {[0, 90, 180, 270].map((deg) => (
          <path key={deg} className="pl-arm" pathLength="1" d={ARM} transform={`rotate(${deg} 50 50)`} />
        ))}
      </svg>
    </div>
  );
}
