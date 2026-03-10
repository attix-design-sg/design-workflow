import { WorkflowSelector } from "@/components/WorkflowSelector";
import { SetupRequirements } from "@/components/SetupRequirements";
import { TriageTool } from "@/components/TriageTool";
import { HandoffPackage } from "@/components/HandoffPackage";
import { QADiff } from "@/components/QADiff";

const navItems = [
  { href: "#workflows", label: "Workflows" },
  { href: "#setup", label: "Setup" },
  { href: "#triage", label: "Triage" },
  { href: "#handoff", label: "Handoff" },
  { href: "#qa", label: "QA Diff" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-100">Design Workflow</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/60 bg-zinc-800/40 text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Figma → Claude Code → Vercel → Live
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50">
            Design-to-Dev<br />Workflow
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            A structured process for going from feature request to approved Vercel prototype to production handoff — using Claude Code, Figma MCP, and Playwright for QA.
          </p>

          {/* Quick reference cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            {[
              {
                label: "Option A",
                sub: "Figma-First",
                desc: "Full design validation before any code. Best for new features and brand-sensitive work.",
                color: "border-violet-500/20 bg-violet-500/5",
                dot: "bg-violet-400",
              },
              {
                label: "Option B",
                sub: "Triage by Complexity",
                desc: "Simple features skip Figma. Complex features follow Option A. Faster for iterative work.",
                color: "border-sky-500/20 bg-sky-500/5",
                dot: "bg-sky-400",
              },
              {
                label: "Recommendation",
                sub: "Start with A",
                desc: "Run Option A for your first 3–5 features. Introduce Option B once the process is familiar.",
                color: "border-amber-500/20 bg-amber-500/5",
                dot: "bg-amber-400",
              },
            ].map((card) => (
              <div key={card.label} className={`rounded-xl border p-4 ${card.color}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2 h-2 rounded-full ${card.dot}`} />
                  <span className="text-xs font-semibold text-zinc-300">{card.label}</span>
                  <span className="text-xs text-zinc-500">{card.sub}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Approval chain */}
        <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Approval chain — every feature</p>
          <div className="flex items-center gap-0 flex-wrap gap-y-2">
            {[
              { role: "Designer + PM", note: "Internal review" },
              { role: "CEO", note: "Approves Vercel URL" },
              { role: "Dev", note: "Implements into prod" },
              { role: "QA Diff", note: "Claude verifies Live" },
            ].map((step, i, arr) => (
              <div key={step.role} className="flex items-center gap-0">
                <div className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700/60 text-center min-w-28">
                  <p className="text-xs font-medium text-zinc-200">{step.role}</p>
                  <p className="text-xs text-zinc-500">{step.note}</p>
                </div>
                {i < arr.length - 1 && (
                  <svg className="w-5 h-5 text-zinc-600 mx-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <WorkflowSelector />
        <div className="border-t border-zinc-800" />
        <SetupRequirements />
        <div className="border-t border-zinc-800" />
        <TriageTool />
        <div className="border-t border-zinc-800" />
        <HandoffPackage />
        <div className="border-t border-zinc-800" />
        <QADiff />

        <footer className="border-t border-zinc-800 pt-8 pb-4 text-center">
          <p className="text-xs text-zinc-600">Built with Claude Code · Design Workflow v1</p>
        </footer>
      </main>
    </div>
  );
}
