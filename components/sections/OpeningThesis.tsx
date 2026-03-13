"use client";

import { openingThesis } from "@/lib/content";
import Section from "@/components/shared/Section";

export default function OpeningThesis() {
  return (
    <Section id="thesis">
      <div className="min-h-[70vh] flex items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-100">
            {openingThesis.headline}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mt-6">
            {openingThesis.subline}
          </p>
          <p className="text-lg text-zinc-500 max-w-2xl mt-8 border-l-2 border-emerald-500/40 pl-6">
            {openingThesis.statement}
          </p>
        </div>
      </div>
    </Section>
  );
}
