"use client";

import { useScrollReveal } from "@/lib/scroll";
import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed sections skip the max-width container */
  fullBleed?: boolean;
}

export default function Section({ id, children, className = "", fullBleed = false }: SectionProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={`py-24 md:py-32 ${fullBleed ? "" : "max-w-5xl mx-auto px-6 md:px-8"} ${className}`}
    >
      {children}
    </section>
  );
}
