"use client";

import { useState } from "react";
import { triageQuestions, simpleExamples, complexExamples } from "@/lib/workflow-data";

type Answer = "yes" | "no" | null;

export function TriageTool() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showExamples, setShowExamples] = useState(false);

  const answered = Object.values(answers).filter((a) => a !== null).length;
  const anyYes = Object.values(answers).some((a) => a === "yes");
  const allNo = answered === triageQuestions.length && !anyYes;
  const hasResult = anyYes || allNo;

  const reset = () => setAnswers({});

  const setAnswer = (id: string, val: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  // Stop showing questions once we get a "yes"
  const firstYesIndex = triageQuestions.findIndex((q) => answers[q.id] === "yes");
  const visibleUpTo = anyYes ? firstYesIndex : answered;

  return (
    <section id="triage" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Option B — Triage Tool</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Answer these questions to route your feature to Simple or Complex path.
        </p>
      </div>

      {/* Examples toggle */}
      <button
        onClick={() => setShowExamples(!showExamples)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <svg className={`w-4 h-4 transition-transform duration-200 ${showExamples ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {showExamples ? "Hide" : "Show"} simple vs complex examples
      </button>

      {showExamples && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
            <p className="text-xs text-sky-400 uppercase tracking-wider font-medium mb-3">Simple — skip Figma</p>
            <ul className="space-y-1.5">
              {simpleExamples.map((e, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <p className="text-xs text-violet-400 uppercase tracking-wider font-medium mb-3">Complex — use Option A</p>
            <ul className="space-y-1.5">
              {complexExamples.map((e, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Question flow */}
      <div className="space-y-3">
        {triageQuestions.map((q, i) => {
          const answer = answers[q.id] ?? null;
          const isVisible = i <= visibleUpTo;
          const isActive = i === visibleUpTo && !anyYes;

          if (!isVisible) return null;

          return (
            <div
              key={q.id}
              className={`rounded-xl border p-4 transition-all duration-200
                ${answer === "yes" ? "border-violet-500/40 bg-violet-500/5" : ""}
                ${answer === "no" ? "border-zinc-700/40 bg-zinc-800/30 opacity-60" : ""}
                ${answer === null && isActive ? "border-zinc-600 bg-zinc-800/60" : ""}
                ${answer === null && !isActive ? "border-zinc-700/40 bg-zinc-800/20 opacity-40" : ""}
              `}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-400">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${answer === null ? "text-zinc-200" : "text-zinc-400"}`}>
                    {q.question}
                  </p>
                  {answer === null && isActive && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setAnswer(q.id, "yes")}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-500/20 transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setAnswer(q.id, "no")}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium bg-zinc-700/50 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition-colors"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
                {answer === "yes" && (
                  <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">Complex trigger</span>
                )}
                {answer === "no" && (
                  <svg className="flex-shrink-0 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Result */}
      {hasResult && (
        <div className={`rounded-xl border p-6 text-center ${
          anyYes
            ? "border-violet-500/40 bg-violet-500/5"
            : "border-sky-500/40 bg-sky-500/5"
        }`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
            anyYes ? "bg-violet-500/10" : "bg-sky-500/10"
          }`}>
            {anyYes ? (
              <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            )}
          </div>
          {anyYes ? (
            <>
              <p className="text-lg font-semibold text-violet-200 mb-1">Complex — use Option A</p>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Loop in your designer immediately. Start from the wireframe stage in Option A and run the full Figma-first flow.
              </p>
              <p className="text-xs text-zinc-500 mt-2">Document this decision in your Linear ticket.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-sky-200 mb-1">Simple — go straight to code</p>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                No Figma round-trip needed. Claude generates code directly from the brief using your production repo and COMPONENTS.md.
              </p>
              <p className="text-xs text-zinc-500 mt-2">Designer does a quick visual review before Carlos approval.</p>
            </>
          )}
          <button
            onClick={reset}
            className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
          >
            Reset triage
          </button>
        </div>
      )}
    </section>
  );
}
