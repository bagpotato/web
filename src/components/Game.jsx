import { useState, useEffect } from 'react';
import { H } from '../data/styles.js';
import Dialog from './Dialog.jsx';

const TOTAL = 15;

export default function Game({ open, onClose }) {
  const [state, setState] = useState('idle');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(TOTAL);
  const [high, setHigh] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const move = () => setPos({ x: 9 + Math.random() * 82, y: 14 + Math.random() * 72 });
  const start = () => { setScore(0); setTime(TOTAL); move(); setState('playing'); };

  useEffect(() => {
    setState('idle'); setScore(0); setTime(TOTAL);
  }, [open]);

  useEffect(() => {
    if (state !== 'playing') return;
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (state === 'playing' && time <= 0) {
      setState('over');
      setHigh((h) => Math.max(h, score));
    }
  }, [time, state, score]);

  return (
    <Dialog open={open} onClose={onClose} label="Bug Hunter" focusKey={state} className="bg-black text-white w-[min(32rem,92vw)] border border-neutral-700">
      <header className="flex items-start justify-between p-5 border-b border-neutral-800">
        <div>
          <h2 className="text-2xl font-bold" style={H}>Bug Hunter</h2>
          <p className="text-sm text-neutral-400 mt-1">Elimina los bugs del sistema</p>
        </div>
        <button onClick={onClose} aria-label="Cerrar" className="h-9 w-9 grid place-items-center border border-neutral-600 hover:bg-white hover:text-black transition-colors"><i className="bi bi-x-lg" /></button>
      </header>
      <div className="p-5 md:p-6">
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[['Puntos', score], ['Tiempo', time + 's'], ['Récord', high]].map(([l, v], i) => (
            <div key={l} className={`px-4 py-3 border ${i === 1 ? 'bg-white text-black border-white' : 'border-neutral-700'}`}>
              <p className={`text-xs ${i === 1 ? 'text-neutral-600' : 'text-neutral-400'}`}>{l}</p>
              <p className="text-2xl font-bold" style={H}>{v}</p>
            </div>
          ))}
        </div>
        <div className="relative h-64 border border-neutral-700 bg-[#0b0b0b] overflow-hidden game-canvas">
          {state === 'idle' && (
            <div className="absolute inset-0 grid place-items-center bg-black/80">
              <button onClick={start} className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-neutral-300 transition-colors">Empezar</button>
            </div>
          )}
          {state === 'over' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90">
              <p className="text-3xl font-bold mb-1" style={H}>Tiempo agotado</p>
              <p className="text-neutral-400 text-sm mb-5">Puntuación: {score}</p>
              <button onClick={start} className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-neutral-300 transition-colors">Reintentar</button>
            </div>
          )}
          {state === 'playing' && (
            <button key={score} aria-label="Bug" onClick={() => { setScore((s) => s + 1); move(); }}
              style={{ left: `calc(${pos.x}% - 24px)`, top: `calc(${pos.y}% - 24px)` }}
              className="bug-pop absolute h-12 w-12 grid place-items-center bg-white text-black hover:bg-neutral-300">
              <i className="bi bi-bug-fill text-xl" />
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-neutral-400">Haz clic en el insecto lo más rápido posible.</p>
      </div>
    </Dialog>
  );
}
