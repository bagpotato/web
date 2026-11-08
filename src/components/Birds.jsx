import { useEffect, useRef } from 'react';

const MAX_SECONDS = 9;
const rand = (min, max) => min + Math.random() * (max - min);

function drawBird(ctx, bird) {
  const size = bird.size * Math.min(1, 0.55 + bird.age * 0.5);
  const flap = Math.sin(bird.phase);

  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.rotate((bird.angle + Math.PI / 2) * 0.35);
  ctx.beginPath();
  ctx.moveTo(-size, -flap * size * 0.75);
  ctx.quadraticCurveTo(-size * 0.5, -(flap * 0.2 + 0.35) * size, 0, 0);
  ctx.quadraticCurveTo(size * 0.5, -(flap * 0.2 + 0.35) * size, size, -flap * size * 0.75);
  ctx.stroke();
  ctx.restore();
}

export default function Birds({ origin, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.strokeStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 1.75;
    ctx.lineCap = 'round';

    const top = origin.current.getBoundingClientRect().top;
    const pace = Math.max(width, height) / 1200;
    const birds = Array.from({ length: width < 768 ? 16 : 28 }, () => ({
      x: rand(width * 0.2, width * 0.85),
      y: top + rand(10, 70),
      delay: rand(0, 1.1),
      angle: rand(-1.5, -0.9),
      turn: rand(0.12, 0.3),
      speed: rand(260, 360) * pace,
      size: rand(7, 13),
      phase: rand(0, Math.PI * 2),
      rate: rand(13, 18),
      age: 0
    }));

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      ctx.clearRect(0, 0, width, height);

      let flying = false;
      birds.forEach((bird) => {
        if (bird.gone) return;
        flying = true;
        if (elapsed < bird.delay) return;

        bird.age += dt;
        bird.angle += bird.turn * dt;
        bird.phase += bird.rate * dt;
        const speed = bird.speed * Math.min(1, 0.35 + bird.age * 0.9);
        bird.x += Math.cos(bird.angle) * speed * dt;
        bird.y += Math.sin(bird.angle) * speed * dt;
        if (bird.y < -40 || bird.x > width + 40 || bird.x < -40) bird.gone = true;
        else drawBird(ctx, bird);
      });

      if (flying && elapsed < MAX_SECONDS) raf = requestAnimationFrame(loop);
      else onDone();
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-30 h-full w-full text-fg" aria-hidden="true" />;
}
