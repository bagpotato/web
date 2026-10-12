import { useState, useEffect, useRef } from 'react';

export default function useClock() {
  const fmt = useRef(new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [t, setT] = useState(() => fmt.current.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setT(fmt.current.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return t;
}
