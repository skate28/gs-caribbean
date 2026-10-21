import Image from "next/image";

import { site } from "@/content";
import { cn } from "@/lib/cn";
import { logo as getLogo } from "@/lib/content";

function splitName(name: string): { mark: string; rest: string } {
  const [first, ...rest] = name.trim().split(/\s+/);
  return { mark: first ?? "", rest: rest.join(" ") };
}

/** Real logo when Leads supplies one, else a typographic wordmark. */
export function Wordmark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const logo = getLogo(site);
  if (logo) {
    return (
      <span className={cn("inline-flex items-center gap-3", className)}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width ?? 96}
          height={logo.height ?? 96}
          className="h-11 w-auto rounded-full object-contain sm:h-12"
          priority
        />
        <span className="sr-only">{site.name}</span>
      </span>
    );
  }

  const { mark, rest } = splitName(site.name);
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="relative grid size-10 place-items-center overflow-hidden rounded-[0.9rem] bg-red font-display text-[0.95rem] font-extrabold tracking-tight text-white shadow-[inset_0_-6px_0_rgb(0_0_0/0.18)] sm:size-11"
      >
        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue" />
        {mark.slice(0, 3)}
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.05rem] font-extrabold tracking-tight sm:text-lg", tone === "light" ? "text-white" : "text-ink")}>
          {mark}
          {rest ? <span className="text-red"> {rest.split(" ")[0]}</span> : null}
        </span>
        {rest.split(" ").length > 1 ? (
          <span className={cn("mt-1 text-[0.62rem] font-bold uppercase tracking-[0.32em]", tone === "light" ? "text-white/60" : "text-ink/60")}>
            {rest.split(" ").slice(1).join(" ")}
          </span>
        ) : null}
      </span>
    </span>
  );
}
