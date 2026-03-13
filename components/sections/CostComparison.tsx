"use client";

import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { useTimelineBuild } from "@/lib/scroll";
import {
  traditionalTimeline,
  proposedTimeline,
  costComparisonMetrics,
} from "@/lib/content";
import type { TimelineStep } from "@/lib/content";

function TimelineColumn({
  title,
  steps,
  variant,
}: {
  title: string;
  steps: TimelineStep[];
  variant: "traditional" | "proposed";
}) {
  const ref = useTimelineBuild<HTMLDivElement>("[data-step]");
  const isTraditional = variant === "traditional";

  return (
    <div>
      <h3
        className={`text-sm uppercase tracking-widest font-medium mb-6 ${
          isTraditional ? "text-amber-500/80" : "text-emerald-500/80"
        }`}
      >
        {title}
      </h3>
      <div ref={ref} className="relative">
        {/* Vertical line */}
        <div
          className={`absolute left-[7px] top-2 bottom-2 w-px ${
            isTraditional ? "bg-amber-500/20" : "bg-emerald-500/20"
          }`}
        />

        <div className="space-y-4">
          {steps.map((step, i) => {
            const hasIssue =
              (step.unresolvedQuestions && step.unresolvedQuestions > 0) ||
              step.reworkRisk === "high" ||
              (step.clarificationLoops && step.clarificationLoops > 0);

            return (
              <div key={i} data-step className="relative pl-7">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                    hasIssue && isTraditional
                      ? "border-amber-500/60 bg-amber-500/10"
                      : !isTraditional && !hasIssue
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : "border-zinc-600 bg-zinc-800"
                  }`}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-200">{step.label}</span>
                    <span className="text-xs text-zinc-600">{step.owner}</span>
                  </div>

                  {step.note && (
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        hasIssue && isTraditional
                          ? "text-amber-400/70"
                          : "text-zinc-500"
                      }`}
                    >
                      {step.note}
                    </p>
                  )}

                  {/* Indicators */}
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {step.unresolvedQuestions !== undefined &&
                      step.unresolvedQuestions > 0 && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isTraditional
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-zinc-700/40 text-zinc-500"
                          }`}
                        >
                          {step.unresolvedQuestions} unresolved
                        </span>
                      )}
                    {step.clarificationLoops !== undefined &&
                      step.clarificationLoops > 0 && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isTraditional
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-zinc-700/40 text-zinc-500"
                          }`}
                        >
                          {step.clarificationLoops} loops
                        </span>
                      )}
                    {step.reworkRisk === "high" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                        rework risk
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CostComparison() {
  return (
    <Section id="cost">
      <SectionHeading
        title="The Cost of Ambiguity"
        subtitle="Comparing where time, clarification, and rework happen in each approach."
      />

      {/* Parallel Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <TimelineColumn
          title="Traditional Static-First"
          steps={traditionalTimeline}
          variant="traditional"
        />
        <TimelineColumn
          title="Component-First Workflow"
          steps={proposedTimeline}
          variant="proposed"
        />
      </div>

      {/* Operational Metrics */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">
          Operational Comparison
        </h3>
        <p className="text-xs text-zinc-600 mb-4">
          Based on the workflow&apos;s internal model, not measured production data.
          Presented as a projection for evaluation.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700/60">
                <th className="text-left py-3 pr-6 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                  Metric
                </th>
                <th className="text-left py-3 pr-6 text-xs uppercase tracking-wider text-amber-500/60 font-medium">
                  Traditional
                </th>
                <th className="text-left py-3 pr-6 text-xs uppercase tracking-wider text-emerald-500/60 font-medium">
                  Proposed
                </th>
                <th className="text-left py-3 text-xs uppercase tracking-wider text-zinc-600 font-medium hidden md:table-cell">
                  Why
                </th>
              </tr>
            </thead>
            <tbody>
              {costComparisonMetrics.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-zinc-800/60 ${
                    i % 2 === 0 ? "bg-zinc-800/10" : ""
                  }`}
                >
                  <td className="py-3 pr-6 text-zinc-300">{row.metric}</td>
                  <td className="py-3 pr-6 text-amber-400/80 font-mono text-xs">
                    {row.traditional}
                  </td>
                  <td className="py-3 pr-6 text-emerald-400/80 font-mono text-xs">
                    {row.proposed}
                  </td>
                  <td className="py-3 text-zinc-500 text-xs hidden md:table-cell">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
