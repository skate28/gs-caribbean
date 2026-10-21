"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { SiteImage } from "@/content/types";

/** Crossfades up to three real hero photos. */
export function HeroPhotos({ images }: { images: SiteImage[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 5500);
    return () => window.clearInterval(id);
  }, [images.length, reduce]);

  const image = images[index];
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={image.src}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="kenburns object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}
