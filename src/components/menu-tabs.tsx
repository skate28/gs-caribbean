"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";

import type { MenuItem } from "@/content/types";
import { cn } from "@/lib/cn";
import type { CleanCategory } from "@/lib/menu";

import { Price } from "./price";
import { focusRing } from "./styles";

const TAG_LABEL: Record<string, string> = {
  signature: "Signature",
  popular: "Favorite",
  new: "New",
  spicy: "Spicy",
  vegetarian: "Vegetarian",
};

function ItemRow({ item }: { item: MenuItem }) {
  const tags = (item.tags ?? []).filter((t) => TAG_LABEL[t]);
  return (
    <li className="group py-4">
      <div className="flex items-baseline gap-3">
        <h4 className="font-display text-lg font-bold leading-tight tracking-tight text-white sm:text-xl">
          {item.name}
        </h4>
        {tags.length > 0 ? (
          <span className="hidden gap-1.5 sm:flex">
            {tags.map((t) => (
              <span
                key={t}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em]",
                  t === "signature" ? "bg-red text-white" : "bg-white/10 text-white/80",
                )}
              >
                {TAG_LABEL[t]}
              </span>
            ))}
          </span>
        ) : null}
        <span aria-hidden className="leader text-white" />
        <Price price={item.price} tone="light" />
      </div>
      {item.description?.trim() || tags.length > 0 ? (
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {item.description?.trim() ? (
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-white/55">{item.description}</p>
          ) : null}
          {tags.length > 0 ? (
            <span className="flex gap-1.5 sm:hidden">
              {tags.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.16em]",
                    t === "signature" ? "bg-red text-white" : "bg-white/10 text-white/80",
                  )}
                >
                  {TAG_LABEL[t]}
                </span>
              ))}
            </span>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

function ItemList({ items }: { items: MenuItem[] }) {
  const half = Math.ceil(items.length / 2);
  const columns = items.length > 6 ? [items.slice(0, half), items.slice(half)] : [items];
  return (
    <div className={cn("grid gap-x-14", columns.length > 1 && "lg:grid-cols-2")}>
      {columns.map((col, i) => (
        <ul key={i} className="divide-y divide-white/10">
          {col.map((item) => (
            <ItemRow key={item.id || item.name} item={item} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function MenuTabs({ categories }: { categories: CleanCategory[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const base = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = Math.min(active, categories.length - 1);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
    tabRefs.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") select((active + 1) % categories.length);
    else if (e.key === "ArrowLeft") select((active - 1 + categories.length) % categories.length);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(categories.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      {categories.length > 1 ? (
        <div className="sticky top-[4.25rem] z-20 -mx-5 bg-ink/90 px-5 py-3 backdrop-blur-xl sm:top-20 sm:mx-0 sm:rounded-full sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={onKey}
            className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-char p-1.5 sm:inline-flex sm:max-w-full"
          >
            {categories.map((c, i) => {
              const selected = i === active;
              return (
                <button
                  key={c.id || c.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${base}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${base}-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition sm:px-5",
                    selected ? "text-white" : "text-white/60 hover:text-white",
                    focusRing,
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={`${base}-pill`}
                      className="absolute inset-0 rounded-full bg-red shadow-[0_8px_24px_-10px_rgb(225_38_45/0.9)]"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {categories.map((category, index) => (
          <motion.div
            key={category.id || category.name}
            id={`${base}-panel-${index}`}
            role={categories.length > 1 ? "tabpanel" : undefined}
            aria-labelledby={categories.length > 1 ? `${base}-tab-${index}` : undefined}
            hidden={index !== current}
            initial={false}
            animate={index === current ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
            className="mt-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <h3 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">{category.name}</h3>
                {category.description?.trim() ? (
                  <p className="mt-2 max-w-2xl text-base text-white/65">{category.description}</p>
                ) : null}
              </div>
              {category.note?.trim() ? (
                <p className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-gold">{category.note}</p>
              ) : null}
            </div>

            {category.items.length > 0 ? (
              <div className="mt-2">
                <ItemList items={category.items} />
              </div>
            ) : null}

            {category.groups.length > 0 ? (
              <div className={cn("grid gap-5", category.items.length > 0 ? "mt-10" : "mt-8", category.groups.length > 1 && "md:grid-cols-2 xl:grid-cols-3")}>
                {category.groups.map((group) => (
                  <section
                    key={group.label}
                    className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-char p-6 sm:p-7"
                  >
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue via-red to-gold" />
                    <h4 className="font-display text-2xl font-extrabold tracking-tight text-white">{group.label}</h4>
                    {group.note?.trim() ? (
                      <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-gold">{group.note}</p>
                    ) : null}
                    <ul className="mt-3 divide-y divide-white/10">
                      {group.items.map((item) => (
                        <ItemRow key={item.id || item.name} item={item} />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}
          </motion.div>
      ))}
    </div>
  );
}
