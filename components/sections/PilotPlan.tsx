"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { pilotPlan, setupItems } from "@/lib/content";

export default function PilotPlan() {
  const [checkedSetup, setCheckedSetup] = useState<Set<string>>(new Set());

  const toggleSetup = (label: string) => {
    setCheckedSetup((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const setupProgress = Math.round(
    (checkedSetup.size / setupItems.length) * 100
  );

  return (
    <Section id="pilot">
      <SectionHeading title={pilotPlan.title} subtitle={pilotPlan.subtitle} />

      {/* Phased Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {pilotPlan.phases.map((phase, i) => (
          <div
            key={phase.phase}
            className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-zinc-600">{i + 1}</span>
              <h4 className="text-base font-medium text-zinc-200">
                {phase.phase}
              </h4>
              <span className="text-xs text-zinc-500 ml-auto">
                {phase.duration}
              </span>
            </div>
            <p className="text-sm text-emerald-400/80 mb-4">{phase.goal}</p>
            <div className="mb-4">
              <h5 className="text-xs uppercase tracking-wider text-zinc-600 mb-2">
                Activities
              </h5>
              <ul className="space-y-1.5">
                {phase.activities.map((activity) => (
                  <li
                    key={activity}
                    className="text-sm text-zinc-400 flex items-start gap-2"
                  >
                    <span className="text-zinc-600 mt-0.5 shrink-0">·</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-zinc-700/40 pt-3">
              <h5 className="text-xs uppercase tracking-wider text-zinc-600 mb-2">
                Success Criteria
              </h5>
              <ul className="space-y-1.5">
                {phase.successCriteria.map((criterion) => (
                  <li
                    key={criterion}
                    className="text-sm text-zinc-500 flex items-start gap-2"
                  >
                    <span className="text-emerald-500/60 mt-0.5 shrink-0">
                      ✓
                    </span>
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Setup Checklist */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
            Setup Requirements
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-24 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500/60 transition-all duration-300"
                style={{ width: `${setupProgress}%` }}
              />
            </div>
            <span className="text-xs text-zinc-600 font-mono">
              {checkedSetup.size}/{setupItems.length}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {setupItems.map((item) => {
            const isChecked = checkedSetup.has(item.label);
            return (
              <button
                key={item.label}
                onClick={() => toggleSetup(item.label)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors duration-150 ${
                  isChecked
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-zinc-700/40 bg-zinc-800/20 hover:bg-zinc-800/40"
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center text-xs transition-colors duration-150 ${
                    isChecked
                      ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-400"
                      : "border-zinc-600 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium transition-colors duration-150 ${
                        isChecked ? "text-zinc-500 line-through" : "text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.requiresCarlos && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400/80">
                        Carlos
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
