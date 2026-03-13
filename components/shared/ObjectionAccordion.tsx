"use client";

import { useState } from "react";
import type { Objection } from "@/lib/content";

interface ObjectionAccordionProps {
  objections: Objection[];
}

export default function ObjectionAccordion({ objections }: ObjectionAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {objections.map((obj, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border border-zinc-700/60 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-zinc-800/40 transition-colors duration-150"
              aria-expanded={isOpen}
            >
              <span className="text-sm text-zinc-200 font-medium leading-relaxed">
                &ldquo;{obj.question}&rdquo;
              </span>
              <span
                className={`text-zinc-500 text-lg leading-none shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">
                  {obj.rebuttal}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
