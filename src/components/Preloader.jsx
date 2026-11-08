import { useEffect, useState } from 'react';

const ARM = 'M50 50C41 45 48 24 50 6C52 24 59 45 50 50Z';
const REVEAL_AT = 1000;
const GONE_AT = 1400;

export default function Preloader() {
  const [playing] = useState(() => document.documentElement.classList.contains('intro'));
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    const reveal = setTimeout(() => {
      document.documentElement.classList.remove('intro');
      setLeaving(true);
    }, REVEAL_AT);
    const remove = setTimeout(() => setGone(true), GONE_AT);
    return () => {
      clearTimeout(reveal);
      clearTimeout(remove);
    };
  }, [playing]);

  if (!playing || gone) return null;

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
