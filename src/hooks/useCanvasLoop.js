import { useEffect, useRef } from "react";

export function useCanvasLoop(init) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = init(ctx);
    let w = 0, h = 0, raf = 0, visible = true, frame = 0, color = "#ededed";
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = { width: canvas.clientWidth, height: canvas.clientHeight };
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (frame++ % 20 === 0) color = getComputedStyle(canvas).color;
      draw(now - t0, w, h, color);
    };

    const still = () => {
      color = getComputedStyle(canvas).color;
      draw(4000, w, h, color);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) still();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    if (reduce) still();
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return ref;
}
