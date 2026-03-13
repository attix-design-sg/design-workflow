"use client";

import Section from "@/components/shared/Section";
import { finalPrinciple } from "@/lib/content";

export default function FinalPrinciple() {
  return (
    <Section id="principle" className="min-h-[60vh] flex items-center">
      <div>
        <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 max-w-4xl leading-[1.2]">
          {finalPrinciple.statement}
        </p>
        <p className="mt-8 text-lg text-zinc-500 max-w-2xl">
          {finalPrinciple.subline}
        </p>
      </div>
    </Section>
  );
}
