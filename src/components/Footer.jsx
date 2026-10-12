export default function Footer() {
  return (
    <footer className="bg-black text-neutral-500 border-t border-neutral-800 text-sm">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between gap-3">
        <p>© {new Date().getFullYear()} Juan David Morales Mendoza</p>
        <p className="flex items-center gap-6">
          <span>Barcelona</span>
          <a href="#inicio" className="text-neutral-300 hover:text-white underline underline-offset-4">Volver arriba</a>
        </p>
      </div>
    </footer>
  );
}
