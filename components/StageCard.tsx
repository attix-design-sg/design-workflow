"use client";

import { useState } from "react";
import type { Stage } from "@/lib/workflow-data";

const ownerColors: Record<string, string> = {
  PM: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  Designer: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  "Designer + PM": "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
  CEO: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Dev: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  Claude: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  "Designer / Claude": "bg-pink-500/10 text-pink-300 border-pink-500/20",
};

const toolPill = (tool: string) => (
  <span
    key={tool}
    className="inline-block px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-zinc-400"
  >
    {tool}
  </span>
);

export function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const [open, setOpen] = useState(false);
  const ownerStyle = ownerColors[stage.owner] ?? "bg-zinc-700 text-zinc-300 border-zinc-600";
  const isGate = !!stage.gate;

  return (
    <div className="relative">
      {/* Connector line */}
      <div className="absolute left-6 top-0 -translate-x-px w-px h-4 bg-zinc-700" />

      <div
        className={`relative rounded-xl border transition-all duration-200 cursor-pointer
          ${open ? "border-zinc-500 bg-zinc-800/80" : "border-zinc-700/60 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60"}
          ${isGate ? "ring-1 ring-amber-500/20" : ""}
        `}
        onClick={() => setOpen(!open)}
      >
        {/* Gate indicator */}
        {isGate && (
          <div className="absolute -top-px left-4 right-4 h-px bg-amber-500/40" />
        )}

        <div className="flex items-start gap-3 p-4">
          {/* Step number */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-400 font-medium">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-zinc-100 text-sm">{stage.name}</span>
              {isGate && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Gate
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${ownerStyle}`}>
                {stage.owner}
              </span>
              <span className="text-xs text-zinc-500">{stage.description}</span>
            </div>
          </div>

          <svg
            className={`flex-shrink-0 w-4 h-4 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Expanded */}
        {open && (
          <div className="px-4 pb-4 space-y-4 border-t border-zinc-700/50 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Input</p>
                <p className="text-sm text-zinc-300">{stage.input}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Output</p>
                <p className="text-sm text-zinc-300">{stage.output}</p>
              </div>
            </div>

            {stage.tools.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Tools</p>
                <div className="flex flex-wrap gap-1.5">{stage.tools.map(toolPill)}</div>
              </div>
            )}

            {stage.gate && (
              <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
                <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Approval Gate</p>
                <p className="text-sm text-amber-200/80">{stage.gate}</p>
              </div>
            )}

            {stage.details && stage.details.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Details</p>
                <ul className="space-y-1.5">
                  {stage.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-zinc-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
