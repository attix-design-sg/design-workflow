"use client";

import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  ownershipMatrix,
  governanceRules,
  developerTrustChecklist,
} from "@/lib/content";

export default function Governance() {
  return (
    <Section id="governance">
      <SectionHeading
        title="Who Owns What"
        subtitle="Clear ownership prevents ambiguity. Every artifact has exactly one owner, and everyone else has a defined relationship to it."
      />

      {/* Ownership Matrix */}
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-700/60">
              <th className="text-left py-3 pr-6 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Role
              </th>
              <th className="text-left py-3 pr-6 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Owns
              </th>
              <th className="text-left py-3 pr-6 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Reviews
              </th>
              <th className="text-left py-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Consumes
              </th>
            </tr>
          </thead>
          <tbody>
            {ownershipMatrix.roles.map((role, i) => (
              <tr
                key={role.role}
                className={`border-b border-zinc-800/60 ${
                  i % 2 === 0 ? "bg-zinc-800/10" : ""
                }`}
              >
                <td className="py-3 pr-6 font-medium text-zinc-200 whitespace-nowrap">
                  {role.role}
                </td>
                <td className="py-3 pr-6 text-zinc-400">
                  {role.owns.length > 0 ? (
                    <ul className="space-y-0.5">
                      {role.owns.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="py-3 pr-6 text-zinc-400">
                  {role.reviews.length > 0 ? (
                    <ul className="space-y-0.5">
                      {role.reviews.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="py-3 text-zinc-400">
                  <ul className="space-y-0.5">
                    {role.consumes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Governance Rules */}
      <div className="mb-16">
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">
          Operating Rules
        </h3>
        <ol className="space-y-3">
          {governanceRules.map((rule, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
              <span className="text-sm text-zinc-300 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Developer Trust Checklist */}
      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">
          Developer Trust Checklist
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          What makes generated output credible enough to consider adopting.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {developerTrustChecklist.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-zinc-700/60 bg-zinc-800/30 p-4"
            >
              <h4 className="text-sm font-medium text-zinc-200">{item.label}</h4>
              <p className="text-xs text-zinc-500 mt-1 italic">{item.question}</p>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {item.credibleWhen}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
