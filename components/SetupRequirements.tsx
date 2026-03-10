"use client";

import { useState } from "react";
import { setupItems } from "@/lib/workflow-data";

const categoryIcons: Record<string, React.ReactNode> = {
  "Git Access": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  Figma: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  Codebase: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  Vercel: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  QA: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

const categories = ["Git Access", "Figma", "Codebase", "Vercel", "QA"];

export function SetupRequirements() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const mustHaves = setupItems.filter((i) => i.priority === "must-have");
  const completed = mustHaves.filter((i) => checked.has(i.id)).length;

  return (
    <section id="setup" className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Setup Requirements</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Everything you need before running your first feature through the workflow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-200">{completed}/{mustHaves.length} must-haves</p>
            <p className="text-xs text-zinc-500">ready to go</p>
          </div>
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#27272a" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={completed === mustHaves.length ? "#22c55e" : "#3b82f6"}
                strokeWidth="3"
                strokeDasharray={`${(completed / mustHaves.length) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-zinc-200">
              {Math.round((completed / mustHaves.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {categories.map((cat) => {
        const items = setupItems.filter((i) => i.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat} className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-400">
              {categoryIcons[cat]}
              <span className="text-xs uppercase tracking-wider font-medium">{cat}</span>
            </div>
            {items.map((item) => {
              const isDone = checked.has(item.id);
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border transition-all duration-200
                    ${isDone ? "border-emerald-500/30 bg-emerald-500/5" : "border-zinc-700/60 bg-zinc-800/40"}
                  `}
                >
                  <div className="flex items-start gap-3 p-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggle(item.id)}
                      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                        ${isDone ? "bg-emerald-500 border-emerald-500" : "border-zinc-600 hover:border-zinc-400 bg-transparent"}`}
                    >
                      {isDone && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${isDone ? "text-zinc-400 line-through" : "text-zinc-100"}`}>
                          {item.label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          item.priority === "must-have"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-zinc-700/50 text-zinc-500 border-zinc-600/50"
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.description}</p>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="flex-shrink-0 text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-zinc-700/40">
                      <div className="mt-3 rounded-lg bg-zinc-900/60 border border-zinc-700/40 p-3">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">How to set it up</p>
                        <p className="text-sm text-zinc-300 leading-relaxed">{item.howTo}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
