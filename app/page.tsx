import { WorkflowSelector } from "@/components/WorkflowSelector";
import { SetupRequirements } from "@/components/SetupRequirements";
import { TriageTool } from "@/components/TriageTool";
import { HandoffPackage } from "@/components/HandoffPackage";
import { QADiff } from "@/components/QADiff";
import { WorkflowSpectrum } from "@/components/WorkflowSpectrum";

const navSections = [
  {
    href: "#overview",
    label: "Overview",
    sub: "Workflow spectrum 0–6",
  },
  {
    href: "#best-workflow",
    label: "Best Workflow to Adopt",
    sub: "Why Workflow 6",
  },
  {
    href: "#operationalisation",
    label: "Operationalisation",
    sub: "Options A & B · Setup · Triage · Handoff · QA",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between gap-8">
          {/* Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-100 whitespace-nowrap">
              Design <span className="text-zinc-500 mx-0.5">↔</span> Dev Workflow Enhancement with AI
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navSections.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2.5 px-4 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all duration-150"
              >
                <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-500">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16 space-y-28">

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div id="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-4">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/60 bg-zinc-800/40 text-xs text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Internal Discussion Document
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-zinc-50 leading-tight">
                Design <span className="text-zinc-500">↔</span> Dev<br />
                Workflow<br />
                Enhancement
              </h1>
              <p className="mt-2 text-2xl font-light text-zinc-400">with AI</p>
            </div>
            <p className="text-zinc-400 text-base leading-relaxed max-w-lg">
              A structured proposal for adopting AI across the design-to-development pipeline —
              from how we work today to a fully AI-augmented workflow, with a practical path to get there.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a href="#overview" className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors">
                View Overview
              </a>
              <a href="#best-workflow" className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-zinc-100 transition-colors">
                Jump to Recommendation
              </a>
            </div>
          </div>

          {/* Right — section map */}
          <div className="space-y-3 lg:pt-12">
            {[
              {
                num: "01",
                title: "Overview",
                desc: "The full spectrum of AI workflow options — from today's process (0) to the full pipeline (6). Compare what each level unlocks and what it requires.",
                href: "#overview",
                color: "border-zinc-700/60",
              },
              {
                num: "02",
                title: "Best Workflow to Adopt",
                desc: "The recommended workflow: Workflow 6. Full pros/cons, what Carlos sees, and why it's the right target for this organisation.",
                href: "#best-workflow",
                color: "border-sky-500/20",
              },
              {
                num: "03",
                title: "Operationalisation",
                desc: "How to actually run Workflow 6 — Options A & B, setup requirements, triage decisions, handoff packages, and QA diff process.",
                href: "#operationalisation",
                color: "border-emerald-500/20",
              },
            ].map((s) => (
              <a
                key={s.num}
                href={s.href}
                className={`block rounded-xl border ${s.color} bg-zinc-800/30 p-5 hover:bg-zinc-800/50 transition-all duration-150 group`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-mono font-bold text-zinc-700 group-hover:text-zinc-600 transition-colors leading-none mt-0.5">
                    {s.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 mb-1">{s.title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── SECTION 01: OVERVIEW ───────────────────────────────────────── */}
        <div className="space-y-3">
          <SectionHeader num="01" label="Overview" />
          <WorkflowSpectrum />
        </div>

        {/* ── SECTION 02: BEST WORKFLOW TO ADOPT ────────────────────────── */}
        <div id="best-workflow" className="space-y-10">
          <SectionHeader num="02" label="Best Workflow to Adopt" />

          {/* Workflow 6 headline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">06</span>
                <h3 className="text-2xl font-bold text-zinc-100">Full AI Workflow</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white">Recommended</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                Complete pipeline: Figma → Claude generates production-matched code → Vercel preview →
                Carlos approves on a live interactive URL → structured handoff → automated QA diff between prototype and live.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Options A & B", "Figma MCP", "Claude Code", "Vercel Sandbox", "Playwright QA"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Carlos approves</p>
                <p className="text-sm font-medium text-emerald-300">Live URL — production-matched code</p>
                <p className="text-xs text-zinc-500 mt-1">Not static frames. Not a throwaway build. A real coded prototype.</p>
              </div>
              <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Dev cooperation required</p>
                <p className="text-sm font-medium text-amber-300">Full — read access + fork setup</p>
                <p className="text-xs text-zinc-500 mt-1">One-time setup. Once done, designer runs every feature independently.</p>
              </div>
            </div>
          </div>

          {/* Pros / cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium mb-4">Why this workflow</p>
              <ul className="space-y-2.5">
                {[
                  "Claude generates code that matches production architecture exactly",
                  "Carlos approves a live interactive prototype — not frames, not a throwaway build",
                  "Dev implementation effort dramatically reduced — sandbox branch is the reference",
                  "Automated QA diff catches deviation between prototype and live",
                  "Figma ↔ code drift is visible and caught early — the system surfaces it",
                  "Full approval trail: Figma → Vercel URL → live",
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <svg className="flex-shrink-0 w-4 h-4 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
              <p className="text-xs text-amber-400 uppercase tracking-wider font-medium mb-4">What it requires</p>
              <ul className="space-y-2.5">
                {[
                  "Dev buy-in: read access to prod repo, fork setup, agreed branching convention",
                  "One-time setup overhead (all documented in the Operationalisation section)",
                  "Reliable Figma MCP connection",
                  "COMPONENTS.md kept current as the component library evolves",
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <svg className="flex-shrink-0 w-4 h-4 text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* If pushback */}
          <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-6">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">If the organisation pushes back on full adoption</p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Workflow 6 requires dev cooperation. If that&apos;s not immediately available, there is a clear progression of fallback options (Workflows 1–5) that each deliver meaningful value without requiring full buy-in. The recommendation is to start at Workflow 5 as a minimum viable alternative — it requires nothing from devs, still gets Carlos approving a live URL, and delivers the best handoff spec the dev team has ever received.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a href="#overview" className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors">
                See full spectrum comparison →
              </a>
              <span className="text-xs text-zinc-600">Start at Workflow 5. Use the results to negotiate for Workflow 6.</span>
            </div>
          </div>
        </div>

        {/* ── SECTION 03: OPERATIONALISATION ────────────────────────────── */}
        <div id="operationalisation" className="space-y-3">
          <SectionHeader num="03" label="Operationalisation" />
          <p className="text-zinc-500 text-sm max-w-2xl">
            Everything needed to run Workflow 6 day-to-day — the two workflow options, what to set up, how to triage features, how to package handoffs, and how to QA the result.
          </p>
        </div>

        {/* Approval chain */}
        <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4">Approval chain — every feature in Workflow 6</p>
          <div className="flex items-center gap-0 flex-wrap gap-y-3">
            {[
              { role: "Designer + PM", note: "Internal review" },
              { role: "Carlos", note: "Approves Vercel URL" },
              { role: "Dev", note: "Implements into prod" },
              { role: "QA Diff", note: "Claude verifies live" },
            ].map((step, i, arr) => (
              <div key={step.role} className="flex items-center">
                <div className="px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700/60 text-center min-w-32">
                  <p className="text-sm font-medium text-zinc-200">{step.role}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{step.note}</p>
                </div>
                {i < arr.length - 1 && (
                  <svg className="w-5 h-5 text-zinc-600 mx-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

        <footer className="border-t border-zinc-800 pt-8 pb-4 flex items-center justify-between">
          <p className="text-xs text-zinc-600">Design ↔ Dev Workflow Enhancement with AI</p>
          <p className="text-xs text-zinc-700">Built with Claude Code</p>
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 pb-2">
      <span className="text-4xl font-mono font-bold text-zinc-800">{num}</span>
      <div className="flex-1 h-px bg-zinc-800" />
      <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">{label}</span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}
