import type { MenuPrice } from "@/content/types";
import { cn } from "@/lib/cn";
import { priceView } from "@/lib/menu";

/** "$17.50" in bold, or a word such as "Variable" as a small outlined badge. */
export function Price({ price, tone = "dark", className }: { price?: MenuPrice; tone?: "dark" | "light"; className?: string }) {
  const view = priceView(price);
  if (!view) return null;
  if (view.kind === "money") {
    return (
      <span className={cn("shrink-0 font-display text-lg font-extrabold tabular-nums tracking-tight", tone === "light" ? "text-white" : "text-ink", className)}>
        {view.text}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em]",
        tone === "light" ? "border-gold/60 text-gold" : "border-red/50 text-red",
        className,
      )}
    >
      {view.text}
    </span>
  );
}
