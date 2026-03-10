"use client";

import { useState } from "react";
import { StageCard } from "./StageCard";
import type { Workflow } from "@/lib/workflow-data";

export function WorkflowViewer({ workflow }: { workflow: Workflow }) {
  const [activePath, setActivePath] = useState(workflow.paths[0].id);
  const currentPath = workflow.paths.find((p) => p.id === activePath) ?? workflow.paths[0];

  return (
    <div className="space-y-6">
      {/* Philosophy */}
      <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-5">
        <p className="text-zinc-300 text-sm leading-relaxed">{workflow.philosophy}</p>
        <p className="mt-3 text-xs text-zinc-500">
          <span className="text-zinc-400 font-medium">Best for: </span>
          {workflow.bestFor}
        </p>
      </div>

      {/* Pros / Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium mb-3">Strengths</p>
          <ul className="space-y-2">
            {workflow.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <svg className="flex-shrink-0 w-4 h-4 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-xs text-red-400 uppercase tracking-wider font-medium mb-3">Weaknesses</p>
          <ul className="space-y-2">
            {workflow.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <svg className="flex-shrink-0 w-4 h-4 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Path selector (Option C only) */}
      {workflow.paths.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {workflow.paths.map((path) => (
            <button
              key={path.id}
              onClick={() => setActivePath(path.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150
                ${activePath === path.id
                  ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                  : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300"
                }`}
            >
              {path.label}
            </button>
          ))}
        </div>
      )}

      {/* Complex path redirect */}
      {currentPath.id === "c-complex" ? (
        <div className="rounded-xl border border-zinc-600 bg-zinc-800/40 p-6 text-center">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <p className="text-zinc-200 font-medium mb-1">Complex features follow Option A exactly</p>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            When triage routes a feature as Complex, switch to the Option A tab above and run the full Figma-first workflow. Document the triage decision in your Linear ticket.
          </p>
        </div>
      ) : (
        /* Stage list */
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-zinc-700/50" />
          <div className="space-y-3">
            {currentPath.stages.map((stage, i) => (
              <StageCard key={stage.id} stage={stage} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
