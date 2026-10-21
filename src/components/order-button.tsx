import { ArrowUpRight, Bike, Phone, ShoppingBag } from "lucide-react";

import type { OrderingLink } from "@/content/types";
import { cn } from "@/lib/cn";

import { buttonGold, buttonInk, buttonWhite } from "./styles";

const VARIANT = { white: buttonWhite, ink: buttonInk, gold: buttonGold } as const;

function Icon({ platform }: { platform: OrderingLink["platform"] }) {
  if (platform === "phone") return <Phone className="size-4" aria-hidden strokeWidth={2.5} />;
  if (platform === "online") return <ShoppingBag className="size-4" aria-hidden strokeWidth={2.5} />;
  return <Bike className="size-4" aria-hidden strokeWidth={2.5} />;
}

export function OrderButton({
  link,
  variant = "white",
  className,
}: {
  link: OrderingLink;
  variant?: keyof typeof VARIANT;
  className?: string;
}) {
  const external = /^https?:/i.test(link.url);
  return (
    <a
      href={link.url}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(VARIANT[variant], className)}
    >
      <Icon platform={link.platform} />
      {link.label}
      {external ? <ArrowUpRight className="size-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /> : null}
    </a>
  );
}
