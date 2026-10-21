import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Reveal } from "./reveal";
import { kicker, sectionTitle } from "./styles";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  tone = "dark",
  align = "left",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className={cn(kicker, tone === "light" ? "text-gold" : "text-red", align === "center" && "justify-center")}>
        <span aria-hidden className="h-0.5 w-8 rounded-full bg-current" />
        {eyebrow}
      </p>
      <h2 id={id} className={cn(sectionTitle, "mt-4", tone === "light" ? "text-white" : "text-ink")}>
        {title}
        {accent ? (
          <>
            {" "}
            <span className={cn("font-serif font-normal italic tracking-[-0.02em]", tone === "light" ? "text-gold" : "text-red")}>
              {accent}
            </span>
          </>
        ) : null}
      </h2>
      {intro ? (
        <div className={cn("mt-5 text-lg leading-relaxed", tone === "light" ? "text-white/70" : "text-ink/70")}>{intro}</div>
      ) : null}
    </Reveal>
  );
}
