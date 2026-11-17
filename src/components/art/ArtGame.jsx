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
      const sy = Math.floor(rows / 2);
      snake = [{ x: 4, y: sy }, { x: 3, y: sy }, { x: 2, y: sy }];
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
      // Everything scales with the space the card gives the canvas, which in the
      // projects wheel can be as short as ~140px, so the board always fits the window.
      const pad = Math.round(Math.min(16, h * 0.06, w * 0.05));
      const tw = Math.min(w - pad * 2, 460);
      const th = Math.min(h - pad * 2, 300);
      const x = Math.round((w - tw) / 2);
      const y = Math.round((h - th) / 2);
      const small = th < 160;
      const fs = small ? 9 : tw < 300 ? 10 : 12;
      const bar = small ? 16 : 22;
      const inset = small ? 8 : 12;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      const cw = ctx.measureText("M").width;
      const ch = fs + (small ? 2 : 4);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1;

      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.roundRect(x + 0.5, y + 0.5, tw - 1, th - 1, small ? 4 : 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + bar + 0.5);
      ctx.lineTo(x + tw, y + bar + 0.5);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x + (small ? 10 : 14) + i * (small ? 9 : 12), y + bar / 2, small ? 2.2 : 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      const typeEnd = CMD.length * 45;
      const typed = CMD.slice(0, Math.min(CMD.length, Math.floor(t / 45)));
      const cursor = Math.floor(t / 500) % 2 === 0 && t < typeEnd + 600 ? "_" : "";
      const lineY = y + bar + fs + (small ? 5 : 8);
      ctx.globalAlpha = 0.85;
      ctx.fillText(typed + cursor, x + inset, lineY);

      if (t < typeEnd + 500) {
        ctx.globalAlpha = 1;
        return;
      }

      // The score sits in the title bar, so the board gets the rest of the window.
      ctx.globalAlpha = 0.6;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`SCORE ${String(score).padStart(3, "0")}`, x + tw - inset, y + bar / 2 + 0.5);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      const gx = x + inset + 4;
      const gy = lineY + (small ? 6 : 10);
      const c = Math.max(8, Math.min(Math.floor((tw - inset * 2 - 8) / cw), 72));
      const r = Math.max(3, Math.min(Math.floor((y + th - (small ? 6 : 10) - gy - 4) / ch), 14));
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
        ctx.fillText(glyph, gx + cx * cw, gy + (cy + 1) * ch - (small ? 2 : 4));
      };
      for (let i = snake.length - 1; i >= 1; i--) cell(snake[i].x, snake[i].y, "#", 0.55);
      cell(snake[0].x, snake[0].y, "@", 1);
      cell(food.x, food.y, "*", Math.floor(t / 250) % 2 ? 1 : 0.5);
      ctx.globalAlpha = 1;
    };
  });

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
