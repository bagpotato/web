// Tells an animation loop when to run: onChange(false) when the browser stops rendering
// `el` because it is far off screen, onChange(true) just before it renders it again, so
// the next frame is ready when the element scrolls into view.
// content-visibility: auto drives this where the browser fires its state-change event;
// elsewhere an IntersectionObserver with a margin approximates it.
export function watchRendering(el, onChange) {
  if ('contentVisibility' in el.style && 'ContentVisibilityAutoStateChangeEvent' in window) {
    el.style.contentVisibility = 'auto';
    const handle = (e) => onChange(!e.skipped);
    el.addEventListener('contentvisibilityautostatechange', handle);
    return () => el.removeEventListener('contentvisibilityautostatechange', handle);
  }
  const io = new IntersectionObserver(([e]) => onChange(e.isIntersecting), { rootMargin: '200px' });
  io.observe(el);
  return () => io.disconnect();
}
