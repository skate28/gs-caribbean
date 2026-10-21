/** Illustrated sunset over the Caribbean, framed in an arch. Shown until real photos arrive. */

function frond(length: number, angle: number, key: string) {
  const l = length;
  const d = `M0 0 Q ${l * 0.45} ${-l * 0.32} ${l} ${l * 0.12} Q ${l * 0.55} ${-l * 0.08} 0 0 Z`;
  return <path key={key} d={d} transform={`rotate(${angle})`} />;
}

function Palm({ x, y, scale, flip = false }: { x: number; y: number; scale: number; flip?: boolean }) {
  const angles = [-172, -148, -122, -96, -64, -36, -10, 18];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <g className="animate-sway" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path d="M-6 260 C 6 180, 18 90, 4 0 L 12 0 C 28 90, 18 180, 8 260 Z" />
      <g>
        {angles.map((a, i) => frond(i % 2 ? 92 : 108, a, `f${i}`))}
        <circle cx="6" cy="6" r="7" />
        <circle cx="16" cy="12" r="6" />
      </g>
      </g>
    </g>
  );
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label="Illustrated Caribbean sunset with palm trees">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc93a" />
          <stop offset="0.38" stopColor="#ff7a24" />
          <stop offset="0.66" stopColor="#e1262d" />
          <stop offset="1" stopColor="#7d0d14" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.55" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#ffb347" />
        </radialGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a46cf" />
          <stop offset="1" stopColor="#081650" />
        </linearGradient>
        <clipPath id="arch">
          <path d="M0 500 V200 A200 200 0 0 1 400 200 V500 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#arch)">
        <rect width="400" height="500" fill="url(#sky)" />
        <g className="origin-[200px_300px] animate-rays" opacity="0.22" fill="#fff4cf">
          {Array.from({ length: 18 }, (_, i) => (
            <path key={i} d="M200 300 L190 -60 L210 -60 Z" transform={`rotate(${i * 20} 200 300)`} />
          ))}
        </g>
        <circle cx="200" cy="300" r="96" fill="url(#sun)" className="origin-[200px_300px] animate-glow" />
        <g stroke="#7d0d14" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.55">
          <path d="M96 128 q9 -8 18 0 q9 -8 18 0" />
          <path d="M150 96 q6 -6 12 0 q6 -6 12 0" />
          <path d="M282 142 q7 -6 14 0 q7 -6 14 0" />
        </g>
        <rect y="332" width="400" height="168" fill="url(#sea)" />
        <g fill="#ffd25a">
          <rect x="140" y="340" width="120" height="5" rx="2.5" opacity="0.9" />
          <rect x="156" y="356" width="88" height="4" rx="2" opacity="0.75" />
          <rect x="172" y="372" width="56" height="4" rx="2" opacity="0.6" />
          <rect x="184" y="388" width="32" height="3" rx="1.5" opacity="0.45" />
        </g>
        <g fill="#fff" opacity="0.18">
          <rect x="30" y="364" width="60" height="2" rx="1" />
          <rect x="300" y="352" width="70" height="2" rx="1" />
          <rect x="60" y="410" width="90" height="2" rx="1" />
          <rect x="268" y="430" width="80" height="2" rx="1" />
        </g>
        <path d="M0 470 C 90 440, 170 452, 250 470 S 380 480, 400 462 V500 H0 Z" fill="#151517" />
        <g fill="#151517">
          <Palm x={74} y={232} scale={1} />
          <Palm x={338} y={298} scale={0.68} flip />
        </g>
      </g>
    </svg>
  );
}
