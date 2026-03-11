"use client";

import { useState } from "react";
import {
  spectrumLevels,
  approvalFormatLabels,
  devCooperationLabels,
  type SpectrumLevel,
} from "@/lib/workflow-data";

const cooperationColor: Record<string, string> = {
  none: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  minimal: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  full: "text-red-400 bg-red-500/10 border-red-500/20",
};

const approvalColor: Record<string, string> = {
  "static-figma": "text-zinc-400 bg-zinc-700/40 border-zinc-600/40",
  "live-url-low": "text-sky-400 bg-sky-500/10 border-sky-500/20",
  "live-url-high": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "live-url-coded": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

function LevelCard({
  level,
  isActive,
  onClick,
}: {
  level: SpectrumLevel;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 w-48 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer
        ${level.isTarget
          ? isActive
            ? "border-emerald-400/60 bg-emerald-500/10 ring-2 ring-emerald-500/30"
            : "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/50 hover:bg-emerald-500/10"
          : isActive
            ? "border-zinc-400/60 bg-zinc-700/60"
            : "border-zinc-700/60 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60"
        }`}
    >
      {level.isTarget && (
        <div className="absolute -top-2.5 left-3">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500 text-white">
            Target
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2 mt-1">
        <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded
          ${level.isTarget ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-700 text-zinc-400"}`}>
          {level.level}
        </span>
        <span className="text-xs font-semibold text-zinc-200 truncate">{level.name}</span>
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{level.description}</p>

      <div className="mt-3 space-y-1.5">
        <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${cooperationColor[level.devCooperation]}`}>
          {devCooperationLabels[level.devCooperation]}
        </span>
      </div>
    </button>
  );
}

function DetailPanel({ level }: { level: SpectrumLevel }) {
  return (
    <div className={`rounded-xl border p-6 space-y-5 transition-all duration-200
      ${level.isTarget ? "border-emerald-500/30 bg-emerald-500/5" : "border-zinc-700/60 bg-zinc-800/30"}`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-mono font-bold px-2 py-0.5 rounded
              ${level.isTarget ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-700 text-zinc-400"}`}>
              {level.level}
            </span>
            <h3 className="text-lg font-semibold text-zinc-100">{level.name}</h3>
            {level.isTarget && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500 text-white">Target workflow</span>
            )}
          </div>
          <p className="text-sm text-zinc-400">{level.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full border ${cooperationColor[level.devCooperation]}`}>
            Dev: {devCooperationLabels[level.devCooperation]}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full border ${approvalColor[level.carlosApproves]}`}>
            Carlos sees: {approvalFormatLabels[level.carlosApproves]}
          </span>
        </div>
      </div>

      <p className="text-sm text-zinc-300 leading-relaxed">{level.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium mb-2.5">Strengths</p>
          <ul className="space-y-1.5">
            {level.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <svg className="flex-shrink-0 w-3.5 h-3.5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-xs text-red-400 uppercase tracking-wider font-medium mb-2.5">Limitations</p>
          <ul className="space-y-1.5">
            {level.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <svg className="flex-shrink-0 w-3.5 h-3.5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`rounded-lg p-3 border ${level.isTarget ? "border-emerald-500/20 bg-emerald-500/5" : "border-zinc-700/40 bg-zinc-900/40"}`}>
        <span className="text-xs text-zinc-500 uppercase tracking-wider">Unlocks → </span>
        <span className={`text-sm font-medium ${level.isTarget ? "text-emerald-300" : "text-zinc-300"}`}>{level.unlocks}</span>
      </div>
    </div>
  );
}

export function WorkflowSpectrum() {
  const [activeLevel, setActiveLevel] = useState(6);
  const active = spectrumLevels.find((l) => l.level === activeLevel)!;

  return (
    <section id="spectrum" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">AI Workflow Spectrum</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Seven levels of AI integration in the design-to-dev process — from today's workflow to the full pipeline.
          Click any level to compare.
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1">
        {spectrumLevels.map((l) => (
          <button
            key={l.level}
            onClick={() => setActiveLevel(l.level)}
            className="relative flex-1 group"
          >
            <div className={`h-1.5 rounded-full transition-all duration-200
              ${l.level <= activeLevel
                ? l.isTarget ? "bg-emerald-500" : "bg-zinc-400"
                : "bg-zinc-700 group-hover:bg-zinc-600"
              }`}
            />
            <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono
              ${l.level === activeLevel ? (l.isTarget ? "text-emerald-400" : "text-zinc-300") : "text-zinc-600"}`}>
              {l.level}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll row */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-6 -mx-1 px-1 scrollbar-hide">
        {spectrumLevels.map((l) => (
          <LevelCard
            key={l.level}
            level={l}
            isActive={l.level === activeLevel}
            onClick={() => setActiveLevel(l.level)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <DetailPanel level={active} />

      {/* Comparison table */}
      <div className="rounded-xl border border-zinc-700/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-700/60 bg-zinc-800/40">
          <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Full comparison</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-700/60">
                <th className="text-left px-4 py-2.5 text-zinc-500 font-medium w-8">#</th>
                <th className="text-left px-4 py-2.5 text-zinc-500 font-medium">Workflow</th>
                <th className="text-left px-4 py-2.5 text-zinc-500 font-medium whitespace-nowrap">Dev cooperation</th>
                <th className="text-left px-4 py-2.5 text-zinc-500 font-medium whitespace-nowrap">Carlos approves</th>
                <th className="text-left px-4 py-2.5 text-zinc-500 font-medium">Unlocks</th>
              </tr>
            </thead>
            <tbody>
              {spectrumLevels.map((l) => (
                <tr
                  key={l.level}
                  onClick={() => setActiveLevel(l.level)}
                  className={`border-b border-zinc-700/40 cursor-pointer transition-colors
                    ${l.level === activeLevel
                      ? l.isTarget ? "bg-emerald-500/10" : "bg-zinc-700/40"
                      : "hover:bg-zinc-800/40"
                    }`}
                >
                  <td className="px-4 py-2.5">
                    <span className={`font-mono font-bold ${l.isTarget ? "text-emerald-400" : "text-zinc-500"}`}>{l.level}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`font-medium ${l.isTarget ? "text-emerald-300" : "text-zinc-200"}`}>{l.name}</span>
                    {l.isTarget && <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-emerald-500 text-white">target</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full border ${cooperationColor[l.devCooperation]}`}>
                      {devCooperationLabels[l.devCooperation]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full border ${approvalColor[l.carlosApproves]}`}>
                      {approvalFormatLabels[l.carlosApproves]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-400">{l.unlocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
