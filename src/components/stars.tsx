import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

export function Stars({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(Math.max(0, Math.min(5, value)));
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className={cn("size-4", i < rounded ? "fill-gold text-gold" : "fill-transparent text-current opacity-30")} />
      ))}
    </span>
  );
}
