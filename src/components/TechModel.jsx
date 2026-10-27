import { useEffect, useRef } from 'react';
import {
  WebGLRenderer, Scene, PerspectiveCamera, LineBasicMaterial, PointsMaterial,
  IcosahedronGeometry, WireframeGeometry, EdgesGeometry, BoxGeometry, Group, LineSegments, Points
} from 'three';

export default function TechModel({ className = '' }) {
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const canvas = renderer.domElement;
    canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
    el.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.z = 6;

    const lineMat = new LineBasicMaterial({ transparent: true, opacity: 0.5 });
    const coreMat = new LineBasicMaterial({ transparent: true, opacity: 0.9 });
    const dotMat = new PointsMaterial({ size: 0.07, sizeAttenuation: true });
    const setColor = () => {
      const c = getComputedStyle(el).color;
      lineMat.color.set(c);
      coreMat.color.set(c);
      dotMat.color.set(c);
    };
    setColor();

    const shellGeo = new IcosahedronGeometry(1.6, 1);
    const wireGeo = new WireframeGeometry(shellGeo);
    const coreGeo = new EdgesGeometry(new BoxGeometry(0.95, 0.95, 0.95));

    const group = new Group();
    const core = new LineSegments(coreGeo, coreMat);
    group.add(new LineSegments(wireGeo, lineMat));
    group.add(new Points(shellGeo, dotMat));
    group.add(core);
    group.rotation.set(0.3, 0.6, 0);
    scene.add(group);

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = Math.max(6, 5.6 / camera.aspect);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let dragging = false, px = 0, py = 0, vx = 0, vy = 0, raf = 0, visible = true, frame = 0;

    const down = (e) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const move = (e) => {
      if (!dragging) return;
      vx = (e.clientX - px) * 0.01;
      vy = (e.clientY - py) * 0.01;
      px = e.clientX;
      py = e.clientY;
      group.rotation.y += vx;
      group.rotation.x = Math.max(-1.2, Math.min(1.2, group.rotation.x + vy));
    };
    const up = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (frame++ % 30 === 0) setColor();
      if (!dragging) {
        group.rotation.y += vx + (reduce ? 0 : 0.004);
        vx *= 0.95;
        group.rotation.x += (0.3 - group.rotation.x) * 0.02;
      }
      if (!reduce) {
        core.rotation.y -= 0.012;
        core.rotation.x += 0.006;
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      shellGeo.dispose();
      wireGeo.dispose();
      coreGeo.dispose();
      lineMat.dispose();
      coreMat.dispose();
      dotMat.dispose();
      renderer.dispose();
      el.removeChild(canvas);
    };
  }, []);

  return <div ref={wrap} className={className} role="img" aria-label="Interactive 3D model" />;
}
