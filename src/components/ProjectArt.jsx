export default function ProjectArt({ Art, canvas, className = '' }) {
  if (canvas) return <Art className={className} />;
  return <svg viewBox="0 0 400 240" className={`h-full w-full ${className}`} aria-hidden="true"><Art /></svg>;
}
