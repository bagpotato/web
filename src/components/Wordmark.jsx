export default function Wordmark() {
  let i = 0;

  return (
    <h1 className="wordmark" aria-label="Juan David Morales Mendoza">
      {['Juan David', 'Morales', 'Mendoza'].map((w) => (
        <span key={w} className="wm-line" aria-hidden="true">
          {[...w].map((c, k) => {
            const idx = i++;
            return <span key={k} className="wm-ch" style={{ '--i': idx }}>{c === ' ' ? '\u00a0' : c}</span>;
          })}
        </span>
      ))}
    </h1>
  );
}
