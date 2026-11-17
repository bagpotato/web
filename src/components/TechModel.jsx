import { useEffect, useId, useRef, useState } from 'react';
import { BufferAttribute, BufferGeometry, Group, LineBasicMaterial, LineSegments, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { buildShapes, SEGMENTS, SHAPE_NAMES, TESSERACT, tesseract } from './techShapes.js';
import { watchRendering } from '../hooks/watchRendering.js';

const MORPH_MS = 1100;
const STAGGER = 0.35;
const AUTO_MS = 5000;
const TAP_PX = 6;
const REPEL_RADIUS = 1;
const REPEL_FORCE = 0.55;

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// The shape picker is a toolbar: one tab stop, arrow keys between buttons. Browsers with
// `focusgroup` do this natively; the others get a roving tabindex from the handlers below.
const NATIVE_FOCUSGROUP = typeof HTMLElement !== 'undefined' && 'focusGroup' in HTMLElement.prototype;

export default function TechModel({ className = '' }) {
  const host = useRef(null);
  const selectShape = useRef(null);
  const [active, setActive] = useState(0);
  const [tabStop, setTabStop] = useState(0);
  const modelId = useId();

  const onToolbarKey = (e) => {
    if (NATIVE_FOCUSGROUP) return;
    const items = [...e.currentTarget.querySelectorAll('button')];
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const steps = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    const i = items.indexOf(document.activeElement);
    let next;
    if (e.key in steps) next = (i + steps[e.key] + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    items[next].focus();
  };

  useEffect(() => {
    const el = host.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const canvas = renderer.domElement;
    canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
    el.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.z = 6;

    const material = new LineBasicMaterial({ transparent: true, opacity: 0.7 });
    const setColor = () => material.color.set(getComputedStyle(el).color);
    setColor();

    const shapes = buildShapes();
    const base = shapes[0].slice();
    const from = base.slice();
    let target = shapes[0];

    const geometry = new BufferGeometry();
    const position = new BufferAttribute(base.slice(), 3);
    geometry.setAttribute('position', position);

    const group = new Group();
    const lines = new LineSegments(geometry, material);
    lines.frustumCulled = false;
    group.add(lines);
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

    let index = 0;
    let morphStart = null;
    let lastChange = performance.now();
    let dragging = false, downX = 0, downY = 0, moved = false, px = 0, py = 0, vx = 0;
    let raf = 0, running = false, frame = 0;
    let hover = 0, hovering = false, cursorX = 0, cursorY = 0, displaced = false;

    const select = (next) => {
      if (next === index) return;
      index = next;
      target = shapes[next];
      lastChange = performance.now();
      setActive(next);
      if (reduce) {
        base.set(target);
        position.array.set(target);
        position.needsUpdate = true;
        renderer.render(scene, camera);
        return;
      }
      from.set(base);
      morphStart = lastChange;
      vx += 0.03;
    };
    selectShape.current = select;

    const stepMorph = (now) => {
      const progress = (now - morphStart) / MORPH_MS;
      for (let s = 0; s < SEGMENTS; s++) {
        const delay = (s / SEGMENTS) * STAGGER;
        const t = Math.min(1, Math.max(0, (progress - delay) / (1 - STAGGER)));
        const eased = easeInOut(t);
        const burst = 1 + Math.sin(Math.PI * t) * 0.18;
        for (let i = s * 6, end = i + 6; i < end; i++) {
          base[i] = (from[i] + (target[i] - from[i]) * eased) * burst;
        }
      }
      if (progress >= 1 + STAGGER) {
        base.set(target);
        morphStart = null;
      }
    };

    const writePositions = () => {
      const out = position.array;
      if (hover < 0.002) {
        out.set(base);
        displaced = false;
        return;
      }
      displaced = true;
      const m = group.matrixWorld.elements;
      for (let i = 0; i < base.length; i += 3) {
        let x = base[i], y = base[i + 1], z = base[i + 2];
        const dx = m[0] * x + m[4] * y + m[8] * z - cursorX;
        const dy = m[1] * x + m[5] * y + m[9] * z - cursorY;
        const distance = Math.hypot(dx, dy);
        if (distance > 0.001 && distance < REPEL_RADIUS) {
          const falloff = 1 - distance / REPEL_RADIUS;
          const push = falloff * falloff * REPEL_FORCE * hover / distance;
          const wx = dx * push, wy = dy * push;
          x += m[0] * wx + m[1] * wy;
          y += m[4] * wx + m[5] * wy;
          z += m[8] * wx + m[9] * wy;
        }
        out[i] = x;
        out[i + 1] = y;
        out[i + 2] = z;
      }
    };

    const trackCursor = (e) => {
      const r = canvas.getBoundingClientRect();
      const halfHeight = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      cursorX = (((e.clientX - r.left) / r.width) * 2 - 1) * halfHeight * camera.aspect;
      cursorY = (1 - ((e.clientY - r.top) / r.height) * 2) * halfHeight;
    };

    const down = (e) => {
      dragging = true;
      moved = false;
      downX = px = e.clientX;
      downY = py = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const move = (e) => {
      trackCursor(e);
      if (!dragging) return;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > TAP_PX) moved = true;
      vx = (e.clientX - px) * 0.01;
      group.rotation.y += vx;
      group.rotation.x = Math.max(-1.2, Math.min(1.2, group.rotation.x + (e.clientY - py) * 0.01));
      px = e.clientX;
      py = e.clientY;
    };
    const up = () => {
      if (dragging && !moved) select((index + 1) % shapes.length);
      dragging = false;
      canvas.style.cursor = 'grab';
    };
    const cancel = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
    };
    const enter = (e) => {
      if (e.pointerType !== 'mouse') return;
      trackCursor(e);
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', cancel);
    canvas.addEventListener('pointerenter', enter);
    canvas.addEventListener('pointerleave', leave);

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (frame++ % 30 === 0) setColor();

      if (!reduce && !hovering && !dragging && morphStart === null && now - lastChange > AUTO_MS) {
        select((index + 1) % shapes.length);
      }
      if (hovering || dragging) lastChange = Math.max(lastChange, now);

      if (!dragging) {
        group.rotation.y += vx + (reduce ? 0 : 0.004);
        vx *= 0.95;
        group.rotation.x += (0.3 - group.rotation.x) * 0.02;
      }
      group.updateMatrixWorld();

      // The tesseract keeps rotating in 4D while it is the current shape.
      const spin4d = index === TESSERACT && !reduce;
      if (spin4d) tesseract(0.5 + now * 0.0008, shapes[TESSERACT]);

      const morphing = morphStart !== null;
      if (morphing) stepMorph(now);
      else if (spin4d) base.set(target);
      hover += ((hovering && !dragging && !reduce ? 1 : 0) - hover) * 0.12;
      if (morphing || spin4d || hover >= 0.002 || displaced) {
        writePositions();
        position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    // Render only while the browser renders the model; off screen the loop stops entirely.
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const unwatch = watchRendering(el, (rendered) => (rendered ? start() : stop()));
    start();

    return () => {
      stop();
      unwatch();
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', cancel);
      canvas.removeEventListener('pointerenter', enter);
      canvas.removeEventListener('pointerleave', leave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      el.removeChild(canvas);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={host} id={modelId} className="h-full w-full" role="img" aria-label="Interactive 3D shape. Drag to spin it, click to change it." />
      {/* w-max keeps the row at its natural width instead of squeezing the buttons into the
          model's width; past the viewport it wraps (.shape-picker) rather than overflowing. */}
      <div role="toolbar" aria-label="Choose a 3D shape" aria-controls={modelId} focusgroup="toolbar wrap" onKeyDown={onToolbarKey} className="shape-picker absolute bottom-0 right-0 hidden w-max max-w-[calc(100vw-5rem)] justify-end gap-x-4 text-sm md:flex xl:left-1/2 xl:right-auto xl:-translate-x-1/2 xl:justify-center">
        {SHAPE_NAMES.map((name, i) => (
          <button key={name} type="button" aria-pressed={active === i} tabIndex={NATIVE_FOCUSGROUP ? undefined : i === tabStop ? 0 : -1} onFocus={() => setTabStop(i)} onClick={() => selectShape.current?.(i)} className="min-h-11 min-w-11 shrink-0 whitespace-nowrap text-mute underline-offset-4 transition-colors hover:text-fg aria-pressed:text-fg aria-pressed:underline">{name}</button>
        ))}
      </div>
    </div>
  );
}
