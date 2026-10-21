"use client";

import { useEffect, useState } from "react";

import type { ShopClockInput } from "@/lib/hours";
import { statusLabel } from "@/lib/hours";
import { cn } from "@/lib/cn";

/** Live open/closed pill in the restaurant's timezone. Renders nothing until hours exist and the clock runs. */
export function OpenStatus({ input, className }: { input: ShopClockInput; className?: string }) {
  const [state, setState] = useState<ReturnType<typeof statusLabel> | null>(null);

  useEffect(() => {
    const tick = () => setState(statusLabel(new Date(), input));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [input]);

  if (!state || !state.label) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold",
        state.tone === "open" && "bg-palm/20 text-[#7ee2a8]",
        state.tone === "closed" && "bg-red/20 text-[#ff9a9e]",
        state.tone === "neutral" && "bg-white/10 text-white/80",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          state.tone === "open" ? "bg-[#3ddc84] shadow-[0_0_0_4px_rgb(61_220_132/0.25)]" : state.tone === "closed" ? "bg-red" : "bg-gold",
        )}
      />
      {state.label}
    </span>
  );
}
