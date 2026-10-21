/** Circular Kreyòl stamp. Decorative. */
export function SpinBadge({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="relative size-full rounded-full bg-gold text-ink shadow-[0_18px_40px_-14px_rgb(0_0_0/0.7)]">
        <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-rays [animation-duration:24s]">
          <defs>
            <path id="badge-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
          </defs>
          <text className="fill-ink font-sans text-[10.5px] font-extrabold uppercase tracking-[0.2em]">
            <textPath href="#badge-circle">Bon gou · Manje lakay · Bon gou · Manje lakay ·</textPath>
          </text>
        </svg>
        <div className="absolute inset-[30%] grid place-items-center rounded-full bg-red text-white">
          <svg viewBox="0 0 24 24" className="size-1/2" fill="currentColor">
            <path d="M12 21s-7.5-4.6-9.5-9.2C1.1 8.4 3.3 5 6.7 5c2 0 3.6 1.1 4.3 2.6h2C13.7 6.1 15.3 5 17.3 5c3.4 0 5.6 3.4 4.2 6.8C19.5 16.4 12 21 12 21z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
