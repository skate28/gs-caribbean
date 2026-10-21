import Link from "next/link";

import { buttonRed } from "@/components/styles";
import { site } from "@/content";

export default function NotFound() {
  return (
    <main id="content" className="grid min-h-[80vh] place-items-center bg-ink px-6 pt-24 text-center text-white">
      <div>
        <p className="font-display text-8xl font-extrabold tracking-tighter text-red">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold">This page isn&apos;t on the menu.</h1>
        <Link href="/" className={`${buttonRed} mt-8`}>
          Back to {site.name}
        </Link>
      </div>
    </main>
  );
}
