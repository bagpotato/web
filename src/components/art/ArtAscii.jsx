import blackhole from "../../assets/ascii-chill-blackhole.gif";

export default function ArtAscii({ className = "" }) {
  return (
    <img
      src={blackhole}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`block h-full w-full bg-[#0c0c0c] object-cover ${className}`}
    />
  );
}
