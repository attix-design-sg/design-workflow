"use client";

import { threeActNarrative, failureModes } from "@/lib/content";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";

const toneColors: Record<string, string> = {
  neutral: "text-zinc-400",
  negative: "text-amber-400/80",
  positive: "text-emerald-400/80",
};

export default function ThreeActReframe() {
  return (
    <Section id="three-approaches">
      <SectionHeading title={threeActNarrative.title} />

      {/* Three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {threeActNarrative.columns.map((col) => (
          <div
            key={col.id}
            className={`rounded-xl border bg-zinc-800/40 p-6 ${
              col.id === "proposed"
                ? "border-emerald-500/30"
                : "border-zinc-700/60"
            }`}
          >
            <h3 className="text-lg font-medium text-zinc-100">{col.label}</h3>
            <p className="text-sm text-zinc-500 mt-1">{col.sublabel}</p>
            <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
              {col.description}
            </p>

            <ul className="mt-4 space-y-1.5">
              {col.characteristics.map((item, i) => (
                <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                  <span className="text-zinc-600 mt-px">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Assessment */}
            <div className="border-t border-zinc-700/40 pt-4 mt-4">
              <p className={`text-sm leading-relaxed ${toneColors[col.assessmentTone]}`}>
                {col.assessment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Failure modes comparison table */}
      <div className="mt-16">
        <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
          {failureModes.title}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-700/60">
                <th className="py-3 pr-4 text-xs uppercase tracking-wider text-zinc-500">
                  Dimension
                </th>
                <th className="py-3 px-4 text-xs uppercase tracking-wider text-zinc-500">
                  Static Only
                </th>
                <th className="py-3 px-4 text-xs uppercase tracking-wider text-zinc-500">
                  Full Generation
                </th>
                <th className="py-3 pl-4 text-xs uppercase tracking-wider text-zinc-500">
                  Component-First
                </th>
              </tr>
            </thead>
            <tbody>
              {failureModes.dimensions.map((row, i) => (
                <tr
                  key={row.dimension}
                  className={`border-b border-zinc-800/40 ${
                    i % 2 === 1 ? "bg-zinc-800/20" : ""
                  }`}
                >
                  <td className="py-3 pr-4 text-sm font-medium text-zinc-300">
                    {row.dimension}
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-400">
                    {row.staticOnly}
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-400">
                    {row.fullGeneration}
                  </td>
                  <td className="py-3 pl-4 text-sm text-zinc-400">
                    {row.componentFirst}
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
