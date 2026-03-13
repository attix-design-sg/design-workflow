"use client";

import { useState } from "react";
import {
  proposedWorkflow,
  ownerColors,
  ownerBgColors,
  ownerLabels,
  WorkflowStage,
} from "@/lib/content";
import { useTimelineBuild } from "@/lib/scroll";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";

const ownerDotColors: Record<WorkflowStage["owner"], string> = {
  design: "bg-sky-400 border-sky-500/40",
  ai: "bg-violet-400 border-violet-500/40",
  engineering: "bg-emerald-400 border-emerald-500/40",
  carlos: "bg-amber-400 border-amber-500/40",
  shared: "bg-zinc-400 border-zinc-500/40",
};

const legendItems: { owner: WorkflowStage["owner"]; label: string; color: string }[] = [
  { owner: "design", label: "Design", color: "bg-sky-400" },
  { owner: "ai", label: "AI / Agent", color: "bg-violet-400" },
  { owner: "engineering", label: "Engineering", color: "bg-emerald-400" },
  { owner: "carlos", label: "Carlos", color: "bg-amber-400" },
  { owner: "shared", label: "Shared", color: "bg-zinc-400" },
];

export default function ProposedWorkflow() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const timelineRef = useTimelineBuild<HTMLDivElement>("[data-stage]");

  return (
    <Section id="workflow">
      <SectionHeading
        title={proposedWorkflow.title}
        subtitle={proposedWorkflow.subtitle}
      />

      {/* Vertical timeline */}
      <div ref={timelineRef} className="relative ml-4 md:ml-8">
        {proposedWorkflow.stages.map((stage, i) => {
          const isLast = i === proposedWorkflow.stages.length - 1;
          const isHovered = hoveredStage === stage.id;

          return (
            <div
              key={stage.id}
              data-stage
              className="relative pl-8 pb-8"
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {/* Connecting line */}
              {!isLast && (
                <div className="absolute left-[5px] top-3 bottom-0 w-px bg-zinc-700" />
              )}

              {/* Stage dot */}
              <div
                className={`absolute left-0 top-[6px] w-3 h-3 rounded-full border ${ownerDotColors[stage.owner]}`}
              />

              {/* Card */}
              <div className="group">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-base font-medium text-zinc-200">
                    {stage.label}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${ownerBgColors[stage.owner]} ${ownerColors[stage.owner]}`}
                  >
                    {ownerLabels[stage.owner]}
                  </span>
                </div>

                <p className="text-sm text-zinc-400">{stage.description}</p>

                {/* Expandable detail on hover */}
                <div
                  className={`grid transition-all duration-200 ${
                    isHovered ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3 pb-1 space-y-3">
                      {/* Inputs */}
                      <div>
                        <span className="text-xs uppercase tracking-wider text-zinc-500">
                          Inputs:
                        </span>
                        <ul className="mt-1 space-y-0.5">
                          {stage.inputs.map((input, j) => (
                            <li
                              key={j}
                              className="text-sm text-zinc-400 flex items-start gap-2"
                            >
                              <span className="text-zinc-600 mt-px">&middot;</span>
                              <span>{input}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outputs */}
                      <div>
                        <span className="text-xs uppercase tracking-wider text-zinc-500">
                          Outputs:
                        </span>
                        <ul className="mt-1 space-y-0.5">
                          {stage.outputs.map((output, j) => (
                            <li
                              key={j}
                              className="text-sm text-zinc-400 flex items-start gap-2"
                            >
                              <span className="text-zinc-600 mt-px">&middot;</span>
                              <span>{output}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1.5">
                        {stage.tools.map((tool, j) => (
                          <span
                            key={j}
                            className="inline-flex items-center rounded-full bg-zinc-800 border border-zinc-700/60 px-2 py-0.5 text-xs text-zinc-400"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-12 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
        {legendItems.map((item) => (
          <div key={item.owner} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
