export default function MonitorBar({ id }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 font-mono text-[11px] text-neutral-400">
      <span>{id}</span>
      <span className="flex items-center gap-2"><span className="dot" />en línea</span>
    </div>
  );
}
