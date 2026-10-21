import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { logo as getLogo } from "@/lib/content";

function splitName(name: string): { mark: string; rest: string } {
  const [first, ...rest] = name.trim().split(/\s+/);
  return { mark: first ?? "", rest: rest.join(" ") };
}

/** Real logo (with the name beside it) when Leads supplies one, else a typographic wordmark. */
export function Wordmark({ className, tone = "light", size = "md" }: { className?: string; tone?: "light" | "dark"; size?: "md" | "lg" }) {
  const logo = getLogo(site);
  const { mark, rest } = splitName(site.name);
  const restWords = rest.split(" ").filter(Boolean);

  const text = (
    <span className="flex flex-col leading-none">
      <span className={cn("font-display font-extrabold tracking-tight", size === "lg" ? "text-2xl" : "text-[1.05rem] sm:text-lg", tone === "light" ? "text-white" : "text-ink")}>
        {mark}
        {restWords[0] ? <span className="text-red"> {restWords[0]}</span> : null}
      </span>
      {restWords.length > 1 ? (
        <span className={cn("mt-1 font-bold uppercase tracking-[0.32em]", size === "lg" ? "text-xs" : "text-[0.62rem]", tone === "light" ? "text-white/60" : "text-ink/60")}>
          {restWords.slice(1).join(" ")}
        </span>
      ) : null}
    </span>
  );

  if (logo) {
    return (
      <span className={cn("inline-flex items-center gap-3", className)}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width ?? 800}
          height={logo.height ?? 800}
          sizes={size === "lg" ? "112px" : "56px"}
          quality={90}
          className={cn(
            "shrink-0 rounded-full object-contain shadow-[0_6px_18px_-6px_rgb(0_0_0/0.7)] ring-2 ring-white/10",
            size === "lg" ? "size-24 sm:size-28" : "size-12 sm:size-14",
          )}
          priority={size !== "lg"}
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="relative grid size-10 place-items-center overflow-hidden rounded-[0.9rem] bg-red font-display text-[0.95rem] font-extrabold tracking-tight text-white shadow-[inset_0_-6px_0_rgb(0_0_0/0.18)] sm:size-11"
      >
        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue" />
        {mark.slice(0, 3)}
      </span>
      {text}
    </span>
  );
}
