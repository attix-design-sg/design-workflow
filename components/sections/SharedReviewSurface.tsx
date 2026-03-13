"use client";

import { sharedReviewSurface } from "@/lib/content";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";

const mockSidebarItems = [
  { name: "DataTable", active: true },
  { name: "DetailPanel", active: false },
  { name: "FilterBar", active: false },
  { name: "StatusBadge", active: false },
  { name: "BulkActionsBar", active: false },
  { name: "InlineEditor", active: false },
];

const mockTabs = ["Props", "States", "Docs"];

export default function SharedReviewSurface() {
  return (
    <Section id="review-surface">
      <SectionHeading
        title={sharedReviewSurface.title}
        subtitle={sharedReviewSurface.subtitle}
      />

      {/* Description */}
      <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mb-8">
        {sharedReviewSurface.description}
      </p>

      {/* Requirements list */}
      <div className="space-y-4 mb-12">
        {sharedReviewSurface.requirements.map((req, i) => (
          <div key={i}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs text-emerald-500">
                &#10003;
              </span>
              <span className="text-sm font-medium text-zinc-200">
                {req.label}
              </span>
            </div>
            <p className="text-sm text-zinc-400 ml-8 mt-1">{req.detail}</p>
          </div>
        ))}
      </div>

      {/* Visual mock of the shared review surface */}
      <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/20 p-6">
        <div className="text-xs text-zinc-600 mb-4 uppercase tracking-wider">
          Shared review surface / Storybook
        </div>

        <div className="grid grid-cols-[140px_1fr_180px] gap-4 min-h-[280px]">
          {/* Sidebar */}
          <div className="border-r border-zinc-700/40 pr-4">
            <div className="text-xs text-zinc-600 uppercase tracking-wider mb-3">
              Components
            </div>
            <ul className="space-y-1">
              {mockSidebarItems.map((item) => (
                <li
                  key={item.name}
                  className={`text-xs px-2 py-1 rounded ${
                    item.active
                      ? "bg-zinc-700/40 text-zinc-200"
                      : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Main preview area */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-zinc-500">Preview:</span>
              <span className="text-xs text-zinc-300">DataTable</span>
              <span className="text-xs text-zinc-600 ml-auto">
                Viewport: Desktop
              </span>
            </div>

            <div className="flex-1 rounded-lg border border-zinc-700/30 bg-zinc-900/40 p-4 flex flex-col">
              {/* Mock table header */}
              <div className="flex gap-4 border-b border-zinc-700/30 pb-2 mb-2">
                <span className="text-xs text-zinc-600 w-6">&#9744;</span>
                <span className="text-xs text-zinc-500 flex-1">Order ID</span>
                <span className="text-xs text-zinc-500 flex-1">Customer</span>
                <span className="text-xs text-zinc-500 w-20">Status</span>
                <span className="text-xs text-zinc-500 w-16 text-right">
                  Amount
                </span>
              </div>

              {/* Mock table rows */}
              {[1, 2, 3, 4].map((row) => (
                <div
                  key={row}
                  className="flex gap-4 py-1.5 border-b border-zinc-800/40"
                >
                  <span className="text-xs text-zinc-700 w-6">&#9744;</span>
                  <span className="text-xs text-zinc-600 flex-1">
                    ORD-{7290 + row}
                  </span>
                  <span className="text-xs text-zinc-600 flex-1">
                    {
                      ["Sarah C.", "Marcus W.", "Aisha P.", "James L."][row - 1]
                    }
                  </span>
                  <span className="text-xs text-zinc-600 w-20">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] ${
                        row === 1
                          ? "bg-sky-500/10 text-sky-500"
                          : row === 2
                            ? "bg-amber-500/10 text-amber-500"
                            : row === 3
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-violet-500/10 text-violet-500"
                      }`}
                    >
                      {
                        ["Processing", "Shipped", "Delivered", "Processing"][
                          row - 1
                        ]
                      }
                    </span>
                  </span>
                  <span className="text-xs text-zinc-600 w-16 text-right">
                    ${[2450, 890, 3200, 1675][row - 1]}
                  </span>
                </div>
              ))}

              <div className="flex-1" />
              <div className="text-[10px] text-zinc-700 pt-2">
                4 of 8 rows visible, scroll to view more
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="border-l border-zinc-700/40 pl-4">
            <div className="flex gap-1 mb-4">
              {mockTabs.map((tab, i) => (
                <span
                  key={tab}
                  className={`text-xs px-2 py-1 rounded ${
                    i === 0
                      ? "bg-zinc-700/40 text-zinc-200"
                      : "text-zinc-600"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
                  Props
                </div>
                <div className="space-y-1">
                  {[
                    { name: "data", type: "Order[]" },
                    { name: "onSelect", type: "(ids) => void" },
                    { name: "sortable", type: "boolean" },
                    { name: "density", type: "compact | default" },
                  ].map((prop) => (
                    <div
                      key={prop.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-zinc-400">
                        {prop.name}
                      </span>
                      <span className="text-[10px] text-zinc-600 font-mono">
                        {prop.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-700/30 pt-2">
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
                  States
                </div>
                <div className="space-y-0.5">
                  {["Default", "Loading", "Empty", "Error", "With selection"].map(
                    (state) => (
                      <div key={state} className="text-xs text-zinc-600">
                        {state}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="border-t border-zinc-700/30 pt-2">
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
                  Accessibility
                </div>
                <div className="text-xs text-zinc-700">
                  Keyboard nav, ARIA grid role, focus management documented
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
