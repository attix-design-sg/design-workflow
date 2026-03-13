"use client";

import { useScrollProgress, useActiveSection } from "@/lib/scroll";
import { navSections } from "@/lib/content";

export default function ScrollProgress() {
  const progress = useScrollProgress();
  const sectionIds = navSections.map((s) => s.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-zinc-800/50">
        <div
          className="h-full bg-emerald-500/80 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Section dots — right side */}
      <nav
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 items-end"
        aria-label="Page sections"
      >
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
            aria-label={section.label}
          >
            <span
              className={`text-xs transition-opacity duration-200 ${
                activeId === section.id
                  ? "opacity-100 text-zinc-300"
                  : "opacity-0 group-hover:opacity-100 text-zinc-500"
              }`}
            >
              {section.shortLabel || section.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-200 ${
                activeId === section.id
                  ? "w-2.5 h-2.5 bg-emerald-500"
                  : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400"
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
