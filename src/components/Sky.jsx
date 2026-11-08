import { useEffect, useRef } from 'react';

// Each band is the slice of page progress over which one sky layer fades in.
const BANDS = [[0, 0.3], [0.3, 0.62], [0.62, 0.95]];

export default function Sky() {
  const layers = useRef([]);

  useEffect(() => {
    let raf = 0;

    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      BANDS.forEach(([from, to], i) => {
        const opacity = Math.min(1, Math.max(0, (progress - from) / (to - from)));
        layers.current[i].style.opacity = opacity;
      });
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    paint();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  return (
    <div className="sky" aria-hidden="true">
      {BANDS.map((_, i) => <div key={i} ref={(el) => { layers.current[i] = el; }} className={`sky-layer sky-${i + 1}`} />)}
    </div>
  );
}
