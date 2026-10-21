export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gold";

const buttonBase = `group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 py-3 text-center font-display text-[0.95rem] font-bold leading-none tracking-tight transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 sm:text-base ${focusRing}`;

export const buttonRed = `${buttonBase} bg-red text-white shadow-[0_10px_30px_-10px_rgb(225_38_45/0.8)] hover:bg-[#f0333a] hover:shadow-[0_16px_36px_-10px_rgb(225_38_45/0.9)]`;

export const buttonWhite = `${buttonBase} bg-white text-ink shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] hover:bg-cream`;

export const buttonGhost = `${buttonBase} border border-white/25 bg-white/5 text-white backdrop-blur hover:border-white/50 hover:bg-white/10`;

export const buttonInk = `${buttonBase} bg-ink text-white hover:bg-char-2`;

export const buttonGold = `${buttonBase} bg-gold text-ink hover:bg-[#ffc83a]`;

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

export const kicker =
  "inline-flex items-center gap-2 font-sans text-[0.72rem] font-extrabold uppercase tracking-[0.28em] sm:text-xs";

export const sectionTitle =
  "font-display text-[clamp(2.4rem,8vw,5.25rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-balance";
