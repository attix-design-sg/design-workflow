"use client";

import { useState } from "react";
import { WorkflowViewer } from "./WorkflowViewer";
import { workflows } from "@/lib/workflow-data";

export function WorkflowSelector() {
  const [activeId, setActiveId] = useState<"A" | "B">("A");
  const activeWorkflow = workflows.find((w) => w.id === activeId)!;

  return (
    <section id="workflows" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Workflow Options</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Start with Option A. Introduce Option B after running 3–5 features through it.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 rounded-xl border border-zinc-700 overflow-hidden w-fit">
        {workflows.map((w) => (
          <button
            key={w.id}
            onClick={() => setActiveId(w.id)}
            className={`px-6 py-3 text-sm font-medium transition-all duration-150 flex flex-col items-start
              ${activeId === w.id
                ? "bg-zinc-100 text-zinc-900"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
          >
            <span className="font-semibold">{w.name}</span>
            <span className={`text-xs mt-0.5 ${activeId === w.id ? "text-zinc-600" : "text-zinc-600"}`}>
              {w.tagline}
            </span>
          </button>
        ))}
      </div>

      {/* Recommendation banner */}
      {activeId === "B" && (
        <div className="flex items-start gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
          <svg className="flex-shrink-0 w-5 h-5 text-sky-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-sky-200/80">
            Option B's Complex path routes to Option A exactly. When triage says Complex, flip to the Option A tab.
          </p>
        </div>
      )}
      {activeId === "A" && (
        <div className="flex items-start gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
          <svg className="flex-shrink-0 w-5 h-5 text-sky-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-sky-200/80">
            <strong className="text-sky-300">Recommendation:</strong> Start here. Run 3–5 features through Option A before introducing Option B's triage gate.
          </p>
        </div>
      )}

      {/* Workflow detail */}
      <WorkflowViewer workflow={activeWorkflow} />
    </section>
  );
}
