export default function Screen({ Art }) {
  return (
    <div className="scan dots relative aspect-[5/3] bg-[#080808] overflow-hidden">
      <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full text-neutral-200" aria-hidden="true">
        <Art />
      </svg>
    </div>
  );
}
