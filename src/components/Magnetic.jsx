import { useRef } from 'react';

export default function Magnetic({ as: Tag = 'a', className = '', children, ...props }) {
  const ref = useRef(null);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => { ref.current.style.transform = ''; };

  return (
    <Tag ref={ref} onMouseMove={move} onMouseLeave={reset} className={`inline-flex transition-transform duration-200 ease-out ${className}`} {...props}>
      {children}
    </Tag>
  );
}
