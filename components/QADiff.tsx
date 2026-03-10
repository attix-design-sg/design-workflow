"use client";

import { useState } from "react";

const checklistItems = [
  { id: "q-layout", category: "Layout", label: "Page layout matches — no unexpected shifts or reflows" },
  { id: "q-spacing", category: "Layout", label: "Spacing and padding match between prototype and live" },
  { id: "q-responsive", category: "Layout", label: "Responsive breakpoints behave identically" },
  { id: "q-colors", category: "Visual", label: "Colors match exactly — no token mismatches" },
  { id: "q-typography", category: "Visual", label: "Typography: font, size, weight, and line-height match" },
  { id: "q-icons", category: "Visual", label: "Icons and images all present and correct size" },
  { id: "q-borders", category: "Visual", label: "Borders, shadows, and radii match" },
  { id: "q-loading", category: "States", label: "Loading state is present and matches prototype" },
  { id: "q-empty", category: "States", label: "Empty state is present and matches prototype" },
  { id: "q-error", category: "States", label: "Error state is present and matches prototype" },
  { id: "q-hover", category: "Interaction", label: "Hover and focus states work as expected" },
  { id: "q-click", category: "Interaction", label: "All click targets / CTAs are functional" },
  { id: "q-mobile", category: "Interaction", label: "Mobile touch targets are correct size" },
  { id: "q-copy", category: "Content", label: "All copy matches the approved version exactly" },
  { id: "q-links", category: "Content", label: "No broken links or 404s" },
  { id: "q-perf", category: "Performance", label: "No significant layout shift (CLS) on load" },
];

const categories = ["Layout", "Visual", "States", "Interaction", "Content", "Performance"];

export function QADiff() {
  const [vercelUrl, setVercelUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const toggle = (id: string) =>
    setChecked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const done = checklistItems.filter((i) => checked.has(i.id)).length;
  const total = checklistItems.length;
  const allDone = done === total;
  const hasUrls = vercelUrl.trim() && liveUrl.trim();

  const claudePrompt = hasUrls
    ? `Compare these two URLs for visual and functional regressions:\n\nVercel Preview: ${vercelUrl}\nProduction: ${liveUrl}\n\nUsing Playwright, screenshot both at desktop (1440px) and mobile (375px). For each screenshot pair, check:\n- Layout and spacing differences\n- Color or typography mismatches\n- Missing components or elements\n- Loading / empty / error state differences\n- Broken interactions\n\nOutput a structured checklist with: item, status (match/diff/missing), and notes for any diff.`
    : `Compare these two URLs for visual and functional regressions:\n\nVercel Preview: [paste URL]\nProduction: [paste URL]\n\nUsing Playwright, screenshot both at desktop (1440px) and mobile (375px). For each screenshot pair, check:\n- Layout and spacing differences\n- Color or typography mismatches\n- Missing components or elements\n- Loading / empty / error state differences\n- Broken interactions\n\nOutput a structured checklist with: item, status (match/diff/missing), and notes for any diff.`;

  return (
    <section id="qa" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">QA Diff — Vercel vs Live</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Use Claude + Playwright to compare the approved prototype against production. Sign off every item before closing the feature.
        </p>
      </div>

      {/* URL inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Vercel Preview URL</label>
          <input
            type="url"
            value={vercelUrl}
            onChange={(e) => setVercelUrl(e.target.value)}
            placeholder="https://acme-sandbox-git-feature-xyz.vercel.app"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Production URL</label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://app.yourproduct.com/the-route"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>
      </div>

      {/* Claude prompt */}
      <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Claude prompt — paste this into Claude Code</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(claudePrompt)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-700/50"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            Copy
          </button>
        </div>
        <pre className="p-4 text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
          {claudePrompt}
        </pre>
      </div>

      {/* Manual checklist */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-zinc-300">Manual sign-off checklist</p>
          <span className="text-xs text-zinc-500">{done}/{total} confirmed</span>
        </div>

        <div className="flex-1 h-1.5 rounded-full bg-zinc-700 overflow-hidden mb-5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${allDone ? "bg-emerald-500" : "bg-blue-500"}`}
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>

        <div className="space-y-5">
          {categories.map((cat) => {
            const items = checklistItems.filter((i) => i.category === cat);
            return (
              <div key={cat}>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{cat}</p>
                <div className="space-y-1.5">
                  {items.map((item) => {
                    const isDone = checked.has(item.id);
                    const hasNote = notes[item.id];
                    const noteOpen = expandedNote === item.id;
                    return (
                      <div key={item.id} className={`rounded-lg border transition-all duration-150
                        ${isDone ? "border-emerald-500/25 bg-emerald-500/5" : "border-zinc-700/50 bg-zinc-800/30"}`}>
                        <div className="flex items-center gap-3 p-3">
                          <button
                            onClick={() => toggle(item.id)}
                            className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                              ${isDone ? "bg-emerald-500 border-emerald-500" : "border-zinc-600 hover:border-zinc-400"}`}
                          >
                            {isDone && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                          <span className={`flex-1 text-sm ${isDone ? "text-zinc-500 line-through" : "text-zinc-300"}`}>
                            {item.label}
                          </span>
                          <button
                            onClick={() => setExpandedNote(noteOpen ? null : item.id)}
                            className={`text-xs px-2 py-0.5 rounded transition-colors flex items-center gap-1
                              ${hasNote ? "text-amber-400 bg-amber-500/10" : "text-zinc-600 hover:text-zinc-400"}`}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                            </svg>
                            {hasNote ? "note" : "add note"}
                          </button>
                        </div>
                        {noteOpen && (
                          <div className="px-3 pb-3">
                            <textarea
                              value={notes[item.id] ?? ""}
                              onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                              placeholder="Describe the issue or diff..."
                              rows={2}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 resize-none"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {allDone && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-center">
          <svg className="w-8 h-8 text-emerald-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-emerald-300 font-semibold">QA complete — feature is ready to close</p>
          <p className="text-zinc-400 text-sm mt-1">All items confirmed. Mark the feature done in Linear.</p>
        </div>
      )}
    </section>
  );
}
