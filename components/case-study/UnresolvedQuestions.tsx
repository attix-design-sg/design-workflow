"use client";

import { caseStudyUnresolvedQuestions } from "@/lib/content";

type QuestionMode = "all-unresolved" | "partial" | "resolved";

interface UnresolvedQuestionsProps {
  questions: typeof caseStudyUnresolvedQuestions;
  mode: QuestionMode;
}

const headings: Record<QuestionMode, { text: string; color: string }> = {
  "all-unresolved": { text: "What still must be guessed", color: "text-amber-400" },
  partial: { text: "What\u2019s been clarified \u2014 and what hasn\u2019t", color: "text-zinc-200" },
  resolved: { text: "What\u2019s now directly observable", color: "text-emerald-400" },
};

export default function UnresolvedQuestions({ questions, mode }: UnresolvedQuestionsProps) {
  const heading = headings[mode];

  return (
    <div className="mt-6 bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/40">
      <h4 className={`text-sm font-medium mb-3 ${heading.color}`}>{heading.text}</h4>
      <div className="space-y-2">
        {questions.map((q) => {
          if (mode === "all-unresolved") {
            return (
              <div key={q.id} className="flex items-start gap-2 text-sm">
                <span className="text-amber-400 mt-0.5 shrink-0">?</span>
                <span className="text-zinc-400">{q.question}</span>
              </div>
            );
          }

          if (mode === "partial") {
            const hasAnnotation = q.annotationAnswer !== null;
            return (
              <div key={q.id} className="flex flex-col gap-1 text-sm">
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 shrink-0 ${hasAnnotation ? "text-sky-400" : "text-amber-400"}`}>
                    {hasAnnotation ? "\u2713" : "?"}
                  </span>
                  <span className="text-zinc-400">{q.question}</span>
                </div>
                {hasAnnotation && (
                  <div className="ml-6 space-y-1">
                    <p className="text-sky-400 text-xs">{q.annotationAnswer}</p>
                    <p className="text-amber-400 text-xs">{q.stillUnresolved}</p>
                  </div>
                )}
                {!hasAnnotation && (
                  <p className="ml-6 text-amber-400 text-xs">{q.stillUnresolved}</p>
                )}
              </div>
            );
          }

          // resolved
          return (
            <div key={q.id} className="flex items-start gap-2 text-sm">
              <span className="text-emerald-400 mt-0.5 shrink-0">{"\u2713"}</span>
              <div>
                <span className="text-zinc-400">{q.question}</span>
                <p className="text-emerald-400/80 text-xs mt-0.5">{q.liveResolution}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
