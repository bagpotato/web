import { useEffect, useRef } from 'react';

export default function Dialog({ open, onClose, label, focusKey, className = '', children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') { closeRef.current(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const f = ref.current.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1], cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === ref.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (prev && prev.focus) prev.focus();
    };
  }, [open]);

  useEffect(() => {
    if (open && ref.current) ref.current.focus();
  }, [open, focusKey]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[100] flex items-center justify-center p-4 fade-in">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div ref={ref} tabIndex={-1} className={`relative outline-none max-h-[92vh] overflow-auto panel-in ${className}`}>
        {children}
      </div>
    </div>
  );
}
