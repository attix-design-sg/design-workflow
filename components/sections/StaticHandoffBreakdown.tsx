"use client";

import { staticHandoffBreakdown } from "@/lib/content";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { useScrollReveal } from "@/lib/scroll";

export default function StaticHandoffBreakdown() {
  const tableRef = useScrollReveal<HTMLDivElement>();
  const questionsRef = useScrollReveal<HTMLDivElement>();

  return (
    <Section id="static-handoff">
      <SectionHeading
        title={staticHandoffBreakdown.title}
        subtitle={staticHandoffBreakdown.intro}
      />

      {/* Perspective switcher: designer vs developer */}
      <div ref={tableRef} className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-700/60">
              <th className="text-left py-3 pr-4 text-sm font-medium text-zinc-500 w-1/5">
                &nbsp;
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-sky-400 w-2/5">
                What the designer specified
              </th>
              <th className="text-left py-3 pl-4 text-sm font-medium text-amber-400 w-2/5">
                What the developer received
              </th>
            </tr>
          </thead>
          <tbody>
            {staticHandoffBreakdown.perspectives.map((item) => (
              <tr key={item.label} className="border-b border-zinc-800">
                <td className="py-4 pr-4 text-sm font-medium text-zinc-300 align-top">
                  {item.label}
                </td>
                <td className="py-4 px-4 text-sm text-zinc-400 align-top">
                  {item.designerSees}
                </td>
                <td className="py-4 pl-4 text-sm text-zinc-400 align-top">
                  {item.developerReceives}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unresolved questions */}
      <div ref={questionsRef} className="mt-12">
        <h3 className="text-sm uppercase tracking-widest text-amber-500/80 mb-4">
          Questions unresolved at handoff
        </h3>
        <ul className="space-y-2">
          {staticHandoffBreakdown.unresolvedQuestions.map((question, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                ?
              </span>
              <span>{question}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
