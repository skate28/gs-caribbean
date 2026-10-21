import { cn } from "@/lib/cn";

/** Haitian blue over red, with a gold seam. Decorative. */
export function FlagStripe({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-2 w-full flex-col", className)}>
      <span className="h-1/2 bg-blue" />
      <span className="h-px bg-gold" />
      <span className="h-1/2 bg-red" />
    </div>
  );
}
