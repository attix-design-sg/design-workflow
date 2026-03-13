"use client";

import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import ObjectionAccordion from "@/components/shared/ObjectionAccordion";
import { adoptionModes, skepticalObjections } from "@/lib/content";

export default function EngineeringAdoption() {
  return (
    <Section id="adoption">
      <SectionHeading
        title="Engineering Adoption Modes"
        subtitle="Engineering decides how, and whether, to adopt each generated component. Every mode is valid."
      />

      {/* Adoption Spectrum */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {adoptionModes.map((mode, i) => {
          const intensityClasses = [
            "border-emerald-500/30 bg-emerald-500/5",
            "border-emerald-500/20 bg-emerald-500/3",
            "border-zinc-700/60 bg-zinc-800/30",
            "border-zinc-700/60 bg-zinc-800/20",
          ];
          return (
            <div
              key={mode.label}
              className={`rounded-lg border p-5 ${intensityClasses[i]}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-zinc-500 font-mono">{i + 1}</span>
                <h4 className="text-sm font-medium text-zinc-200">{mode.label}</h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{mode.description}</p>
              <p className="text-xs text-zinc-500 mt-3 border-t border-zinc-700/40 pt-3">
                <span className="text-zinc-600">When:</span> {mode.when}
              </p>
            </div>
          );
        })}
      </div>

      {/* Key point */}
      <div className="border-l-2 border-emerald-500/40 pl-6 mb-16">
        <p className="text-base text-zinc-400">
          Rejection is a normal outcome. If engineering rebuilds a component from scratch
          using only the documentation as a spec, the workflow still delivered value.
          The spec was clearer than a static mock.
        </p>
      </div>

      {/* Skeptical Objections */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">
          Addressing skepticism
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Common objections from experienced developers, with direct answers.
        </p>
        <ObjectionAccordion objections={skepticalObjections} />
      </div>
    </Section>
  );
}
