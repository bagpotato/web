import { useCanvasLoop } from "../../hooks/useCanvasLoop.js";

const CMD = "$ python games.py --play snake";
const DIRS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export default function ArtGame({ className = "" }) {
  const ref = useCanvasLoop((ctx) => {
    let cols = 0, rows = 0, snake = [], dir = DIRS[0], food = { x: 0, y: 0 }, score = 0, lastStep = 0;

    const place = () => {
      do {
        food = { x: (Math.random() * cols) | 0, y: (Math.random() * rows) | 0 };
      } while (snake.some((s) => s.x === food.x && s.y === food.y));
    };

    const reset = () => {
      snake = [{ x: 4, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 3 }];
      dir = DIRS[0];
      score = 0;
      place();
    };

    const step = () => {
      const head = snake[0];
      const opts = DIRS.filter((d) => !(d.x === -dir.x && d.y === -dir.y))
        .map((d) => ({ d, x: head.x + d.x, y: head.y + d.y }))
        .filter(
          (n) =>
            n.x >= 0 && n.y >= 0 && n.x < cols && n.y < rows &&
            !snake.slice(0, -1).some((s) => s.x === n.x && s.y === n.y)
        );
      if (!opts.length) return reset();
      opts.sort(
        (a, b) =>
          Math.abs(a.x - food.x) + Math.abs(a.y - food.y) -
          (Math.abs(b.x - food.x) + Math.abs(b.y - food.y))
      );
      const n = opts[0];
      dir = n.d;
      snake.unshift({ x: n.x, y: n.y });
      if (n.x === food.x && n.y === food.y) {
        score++;
        place();
      } else snake.pop();
    };

    return (t, w, h, color) => {
      const tw = Math.min(w - 32, 460);
      const th = Math.min(h - 32, 280);
      const x = (w - tw) / 2;
      const y = (h - th) / 2;
      const fs = tw < 300 ? 10 : 12;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      const cw = ctx.measureText("M").width;
      const ch = fs + 4;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1;

      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.roundRect(x + 0.5, y + 0.5, tw - 1, th - 1, 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + 22.5);
      ctx.lineTo(x + tw, y + 22.5);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x + 14 + i * 12, y + 11, 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      const typeEnd = CMD.length * 45;
      const typed = CMD.slice(0, Math.min(CMD.length, Math.floor(t / 45)));
      const cursor = Math.floor(t / 500) % 2 === 0 && t < typeEnd + 600 ? "_" : "";
      ctx.globalAlpha = 0.85;
      ctx.fillText(typed + cursor, x + 12, y + 40);

      if (t < typeEnd + 500) {
        ctx.globalAlpha = 1;
        return;
      }

      const gx = x + 12;
      const gy = y + 52;
      const c = Math.max(8, Math.min(Math.floor((tw - 24) / cw), 40));
      const r = Math.max(5, Math.min(Math.floor((th - 52 - 28) / ch), 14));
      if (c !== cols || r !== rows) {
        cols = c;
        rows = r;
        reset();
      }
      if (t - lastStep > 110) {
        lastStep = t;
        step();
      }

      ctx.globalAlpha = 0.25;
      ctx.strokeRect(gx - 4.5, gy - 2.5, cols * cw + 8, rows * ch + 4);

      const cell = (cx, cy, glyph, alpha) => {
        ctx.globalAlpha = alpha;
        ctx.fillText(glyph, gx + cx * cw, gy + (cy + 1) * ch - 4);
      };
      for (let i = snake.length - 1; i >= 1; i--) cell(snake[i].x, snake[i].y, "#", 0.55);
      cell(snake[0].x, snake[0].y, "@", 1);
      cell(food.x, food.y, "*", Math.floor(t / 250) % 2 ? 1 : 0.5);

      ctx.globalAlpha = 0.6;
      ctx.fillText(`SCORE ${String(score).padStart(3, "0")}`, x + 12, y + th - 10);
      ctx.globalAlpha = 1;
    };
  });

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
