"use client";

import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { useTimelineBuild } from "@/lib/scroll";
import { detailedExample } from "@/lib/content";
import { ownerColors } from "@/lib/content";

const stageOwnerMap: Record<string, keyof typeof ownerColors> = {
  "Feature Request": "shared",
  "Visual Design in Figma": "design",
  "Coded Prototype": "ai",
  "Component Generation": "ai",
  "Shared Review": "shared",
  "Engineering Adoption": "engineering",
  "Production": "engineering",
};

export default function DetailedExample() {
  const ref = useTimelineBuild<HTMLDivElement>("[data-example-stage]");

  return (
    <Section id="example">
      <SectionHeading
        title={detailedExample.title}
        subtitle={detailedExample.subtitle}
      />

      <p className="text-sm text-zinc-400 leading-relaxed mb-12 max-w-3xl">
        {detailedExample.feature}
      </p>

      <div ref={ref} className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-zinc-700/40" />

        <div className="space-y-8">
          {detailedExample.stages.map((stage, i) => {
            const ownerKey = stageOwnerMap[stage.stage] || "shared";
            const colorClass = ownerColors[ownerKey];

            return (
              <div
                key={stage.stage}
                data-example-stage
                className="relative pl-10"
              >
                {/* Stage number circle */}
                <div className="absolute left-0 top-0 w-[31px] h-[31px] rounded-full border border-zinc-700/60 bg-zinc-900 flex items-center justify-center">
                  <span className="text-xs font-mono text-zinc-500">{i + 1}</span>
                </div>

                <div className="rounded-lg border border-zinc-700/40 bg-zinc-800/20 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-sm font-medium text-zinc-200">
                      {stage.stage}
                    </h4>
                    <span className={`text-xs ${colorClass}`}>
                      {ownerKey === "ai"
                        ? "AI / Agent"
                        : ownerKey.charAt(0).toUpperCase() + ownerKey.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {stage.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-zinc-600">Artifact:</span>
                    <span className="text-xs text-zinc-400 font-mono bg-zinc-800/60 px-2 py-0.5 rounded">
                      {stage.artifact}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-zinc-600">Key decisions:</span>
                    <ul className="mt-1.5 space-y-1">
                      {stage.keyDecisions.map((decision) => (
                        <li
                          key={decision}
                          className="text-xs text-zinc-500 flex items-start gap-2"
                        >
                          <span className="text-zinc-600 mt-0.5 shrink-0">·</span>
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
