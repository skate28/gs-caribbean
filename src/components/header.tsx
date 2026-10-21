"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/nav";

import { buttonRed, container, focusRing } from "./styles";

type HeaderProps = {
  links: NavLink[];
  phone: { display: string; tel: string };
  wordmark: React.ReactNode;
};

export function Header({ links, phone, wordmark }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled ? "bg-ink/85 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.9)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className={cn(container, "flex h-[4.25rem] items-center justify-between gap-4 sm:h-20")}>
        <a href="#top" className={cn("rounded-xl", focusRing)} aria-label="Back to top">
          {wordmark}
        </a>
        {links.length > 0 ? (
          <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white",
                  focusRing,
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
        {phone.tel ? (
          <a href={phone.tel} className={cn(buttonRed, "min-h-11 px-4 text-sm sm:px-5")}>
            <Phone className="size-4 transition group-hover:rotate-12" aria-hidden strokeWidth={2.5} />
            <span className="hidden sm:inline">{phone.display}</span>
            <span className="sm:hidden">Call</span>
          </a>
        ) : null}
      </div>
    </header>
  );
}
