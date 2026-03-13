"use client";

import { useState, useCallback } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { caseStudyIntro } from "@/lib/content";
import type { CaseStudyTab, ViewportSize } from "@/lib/content";
import StaticMockView from "./StaticMockView";
import AnnotatedView from "./AnnotatedView";
import LiveCodedView from "./LiveCodedView";

const tabs: { id: CaseStudyTab; label: string }[] = [
  { id: "static", label: "Static Mock" },
  { id: "annotated", label: "Annotated Prototype" },
  { id: "live", label: "Live Coded" },
];

const viewports: { id: ViewportSize; label: string; width: string }[] = [
  { id: "desktop", label: "Desktop", width: "1280px" },
  { id: "tablet", label: "Tablet", width: "768px" },
  { id: "mobile", label: "Mobile", width: "375px" },
];

export default function CaseStudyDemo() {
  const [activeTab, setActiveTab] = useState<CaseStudyTab>("static");
  const [viewport, setViewport] = useState<ViewportSize>("desktop");

  // Shared state that persists across viewport changes
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const resetAll = useCallback(() => {
    setActiveTab("static");
    setViewport("desktop");
    setSelectedRows(new Set());
    setActiveOrderId(null);
  }, []);

  const containerMaxWidth =
    viewport === "desktop"
      ? "max-w-full"
      : viewport === "tablet"
        ? "max-w-[768px]"
        : "max-w-[375px]";

  return (
    <Section id="case-study">
      <SectionHeading title={caseStudyIntro.title} subtitle={caseStudyIntro.description} />

      {/* Controls */}
      <div className="space-y-4 mb-6">
        {/* Tab bar */}
        <div className="flex items-center border-b border-zinc-700/40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-zinc-100 border-b-2 border-emerald-500"
                  : "text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Viewport switcher + reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {viewports.map((vp) => (
              <button
                key={vp.id}
                onClick={() => setViewport(vp.id)}
                className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 ${
                  viewport === vp.id
                    ? "bg-zinc-700/60 text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {vp.label}
                <span className="ml-1 text-zinc-600">({vp.width})</span>
              </button>
            ))}
          </div>
          <button
            onClick={resetAll}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Demo container */}
      <div
        className={`${containerMaxWidth} ${
          viewport !== "desktop" ? "mx-auto" : "w-full"
        } transition-all duration-200 border border-zinc-700/40 rounded-xl overflow-hidden bg-zinc-900`}
      >
        {activeTab === "static" && <StaticMockView viewport={viewport} />}
        {activeTab === "annotated" && <AnnotatedView viewport={viewport} />}
        {activeTab === "live" && (
          <LiveCodedView
            viewport={viewport}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            activeOrderId={activeOrderId}
            setActiveOrderId={setActiveOrderId}
          />
        )}
      </div>
    </Section>
  );
}
