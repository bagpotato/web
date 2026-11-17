import { useEffect, useRef } from "react";
import { watchRendering } from "./watchRendering.js";

export function useCanvasLoop(init) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = init(ctx);
    let w = 0, h = 0, raf = 0, running = false, frame = 0, color = "#ededed";
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
      if (frame++ % 20 === 0) color = getComputedStyle(canvas).color;
      draw(now - t0, w, h, color);
    };

    // The loop only runs while the browser renders the canvas; off screen it stops entirely.
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
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
    const unwatch = watchRendering(canvas, (rendered) => (rendered ? start() : stop()));

    if (reduce) still();
    else start();

    return () => {
      stop();
      unwatch();
      ro.disconnect();
    };
  }, []);

  return ref;
}
