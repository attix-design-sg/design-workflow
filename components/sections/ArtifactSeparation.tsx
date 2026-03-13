"use client";

import { artifactTypes } from "@/lib/content";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ArtifactSeparation() {
  return (
    <Section id="artifacts">
      <SectionHeading
        title="Artifact Separation"
        subtitle="Three distinct outputs with different purposes, lifespans, and expectations."
      />

      {/* Artifact cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {artifactTypes.map((artifact) => (
          <div
            key={artifact.id}
            className={`rounded-xl border p-6 ${
              artifact.isHandoff
                ? "border-emerald-500/30"
                : "border-zinc-700/60"
            }`}
          >
            {artifact.isHandoff && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-400 mb-3">
                Handoff artifact
              </span>
            )}

            <h3 className="text-lg font-medium text-zinc-100">
              {artifact.label}
            </h3>
            <p
              className={`text-sm mt-1 ${
                artifact.isHandoff ? "text-emerald-400" : "text-zinc-400"
              }`}
            >
              {artifact.purpose}
            </p>

            <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
              {artifact.description}
            </p>

            <ul className="mt-4 space-y-1.5">
              {artifact.characteristics.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-500 flex items-start gap-2"
                >
                  <span className="text-zinc-600 mt-px">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-zinc-700/40 pt-3 mt-4">
              <p className="text-xs text-zinc-500">
                <span className="text-zinc-600">Lifespan:</span>{" "}
                {artifact.lifespan}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Key statement */}
      <blockquote className="mt-12 border-l-2 border-emerald-500/40 pl-6">
        <p className="text-base text-zinc-400 italic">
          The coded prototype can look and feel like a real app. That doesn&apos;t
          make it a production artifact. The handoff unit is the documented
          component, not the generated application.
        </p>
      </blockquote>
    </Section>
  );
}
