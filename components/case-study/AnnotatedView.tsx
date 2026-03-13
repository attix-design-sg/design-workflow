"use client";

import { useState } from "react";
import {
  caseStudyAnnotations,
  caseStudyUnresolvedQuestions,
} from "@/lib/content";
import type { ViewportSize } from "@/lib/content";
import UnresolvedQuestions from "./UnresolvedQuestions";

interface AnnotatedViewProps {
  viewport: ViewportSize;
}

export default function AnnotatedView({ viewport }: AnnotatedViewProps) {
  const [activePin, setActivePin] = useState<string | null>(null);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";

  return (
    <div>
      {/* Skeleton UI with annotation pins */}
      <div className="relative p-4 space-y-3">
        {/* Filter bar */}
        <div className="flex items-center gap-2">
          <div className="bg-zinc-800 rounded h-8 w-20" />
          <div className="bg-zinc-800 rounded h-8 w-16" />
          <div className="bg-zinc-800 rounded h-8 w-24" />
          {!isMobile && <div className="bg-zinc-800 rounded h-8 w-16" />}
          {!isMobile && !isTablet && <div className="bg-zinc-800 rounded h-8 w-20" />}
          <div className="flex-1" />
          <div className="bg-zinc-800 rounded h-8 w-8" />
        </div>

        {/* Table + Detail panel layout */}
        <div className="flex gap-3">
          {/* Table area */}
          <div className="flex-1 space-y-0">
            {/* Header row */}
            <div className="flex items-center gap-3 py-2 border-b border-zinc-700/40">
              <div className="rounded-sm w-4 h-4 bg-zinc-700/50 shrink-0" />
              <div className="bg-zinc-700/40 rounded h-3 w-16" />
              {!isMobile && <div className="bg-zinc-700/40 rounded h-3 w-24" />}
              <div className="bg-zinc-700/40 rounded h-3 w-16" />
              <div className="bg-zinc-700/40 rounded h-3 w-14" />
              {!isMobile && !isTablet && <div className="bg-zinc-700/40 rounded h-3 w-20" />}
            </div>

            {/* Data rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 border-b border-zinc-800/60"
              >
                <div className="rounded-sm w-4 h-4 bg-zinc-700/50 shrink-0" />
                <div
                  className="bg-zinc-800/80 rounded h-3"
                  style={{ width: `${50 + ((i * 17) % 30)}px` }}
                />
                {!isMobile && (
                  <div
                    className="bg-zinc-800/80 rounded h-3"
                    style={{ width: `${60 + ((i * 13) % 40)}px` }}
                  />
                )}
                <div className="bg-zinc-800/60 rounded-full h-5 w-16" />
                <div
                  className="bg-zinc-800/80 rounded h-3"
                  style={{ width: `${40 + ((i * 11) % 20)}px` }}
                />
                {!isMobile && !isTablet && (
                  <div className="bg-zinc-800/80 rounded h-3 w-20" />
                )}
              </div>
            ))}
          </div>

          {/* Detail panel (desktop/tablet only) */}
          {!isMobile && (
            <div
              className={`shrink-0 bg-zinc-800/60 rounded-lg border border-zinc-700/40 ${
                isTablet ? "w-48" : "w-72"
              }`}
            >
              <div className="p-4 space-y-3">
                <div className="bg-zinc-700/40 rounded h-4 w-24" />
                <div className="bg-zinc-700/30 rounded h-3 w-full" />
                <div className="bg-zinc-700/30 rounded h-3 w-3/4" />
                <div className="mt-4 bg-zinc-700/20 rounded h-20 w-full" />
                <div className="bg-zinc-700/30 rounded h-3 w-1/2" />
                <div className="bg-zinc-700/30 rounded h-3 w-2/3" />
              </div>
            </div>
          )}
        </div>

        {/* Annotation pins */}
        {caseStudyAnnotations.map((pin) => (
          <div
            key={pin.id}
            className="absolute"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <button
              onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center transition-all duration-200 shadow-lg ${
                activePin === pin.id
                  ? "bg-sky-400 scale-110"
                  : "bg-sky-500 hover:bg-sky-400 hover:scale-105"
              }`}
            >
              {pin.id}
            </button>
            {activePin === pin.id && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-300 w-56 shadow-xl">
                <p>{pin.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <UnresolvedQuestions questions={caseStudyUnresolvedQuestions} mode="partial" />
    </div>
  );
}
