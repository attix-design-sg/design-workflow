"use client";

import { useState } from "react";
import { setupItems } from "@/lib/workflow-data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function ItemCard({
  item,
  checked,
  onToggle,
}: {
  item: (typeof setupItems)[number];
  checked: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-xl border transition-all duration-200 ${checked ? "border-emerald-500/30 bg-emerald-500/5" : "border-zinc-700/60 bg-zinc-800/40"}`}>
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all
            ${checked ? "bg-emerald-500 border-emerald-500" : "border-zinc-600 hover:border-zinc-400 bg-transparent"}`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-medium ${checked ? "text-zinc-400 line-through" : "text-zinc-100"}`}>
              {item.label}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700/50 text-zinc-500 border border-zinc-600/50">
              {item.category}
            </span>
            {item.priority === "nice-to-have" && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700/30 text-zinc-600 border border-zinc-700/50">
                optional
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.description}</p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-zinc-700/40 space-y-3">
          <div className="mt-3 rounded-lg bg-zinc-900/60 border border-zinc-700/40 p-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">How to set it up</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{item.howTo}</p>
          </div>

          {item.steps && item.steps.length > 0 && (
            <div className="rounded-lg bg-zinc-900/60 border border-zinc-700/40 p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Steps</p>
              <ol className="space-y-2">
                {item.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-mono mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {item.codeBlock && (
            <div className="rounded-lg bg-zinc-950 border border-zinc-700/60 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-700/60">
                <span className="text-xs text-zinc-500 font-mono">{item.codeBlock.lang}</span>
                <CopyButton text={item.codeBlock.code} />
              </div>
              <pre className="p-3 text-xs text-zinc-300 font-mono overflow-x-auto leading-relaxed whitespace-pre">
                {item.codeBlock.code}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SetupRequirements() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const ctoItems = setupItems.filter((i) => i.requiresCTO);
  const selfItems = setupItems.filter((i) => !i.requiresCTO);
  const mustHaves = setupItems.filter((i) => i.priority === "must-have");
  const completed = mustHaves.filter((i) => checked.has(i.id)).length;

  return (
    <section id="setup" className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Setup Requirements</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Everything needed before running your first feature. Clear the CTO list first.
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

      {/* CTO list */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
            <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Clear with your CTO first</span>
          </div>
          <span className="text-xs text-zinc-600">{ctoItems.filter(i => checked.has(i.id)).length}/{ctoItems.length} done</span>
        </div>
        <p className="text-xs text-zinc-500">These require access, decisions, or files that only your CTO or dev team can provide.</p>
        <div className="space-y-2">
          {ctoItems.map((item) => (
            <ItemCard key={item.id} item={item} checked={checked.has(item.id)} onToggle={() => toggle(item.id)} />
          ))}
        </div>
      </div>

      {/* Self list */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
            <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="text-xs font-medium text-sky-300 uppercase tracking-wider">You can set up independently</span>
          </div>
          <span className="text-xs text-zinc-600">{selfItems.filter(i => checked.has(i.id)).length}/{selfItems.length} done</span>
        </div>
        <p className="text-xs text-zinc-500">These are in your hands — no CTO needed.</p>
        <div className="space-y-2">
          {selfItems.map((item) => (
            <ItemCard key={item.id} item={item} checked={checked.has(item.id)} onToggle={() => toggle(item.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
