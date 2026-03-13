import ScrollProgress from "@/components/shared/ScrollProgress";
import OpeningThesis from "@/components/sections/OpeningThesis";
import StaticHandoffBreakdown from "@/components/sections/StaticHandoffBreakdown";
import ThreeActReframe from "@/components/sections/ThreeActReframe";
import CaseStudyDemo from "@/components/case-study/CaseStudyDemo";
import ProposedWorkflow from "@/components/sections/ProposedWorkflow";
import ArtifactSeparation from "@/components/sections/ArtifactSeparation";
import SharedReviewSurface from "@/components/sections/SharedReviewSurface";
import Governance from "@/components/sections/Governance";
import EngineeringAdoption from "@/components/sections/EngineeringAdoption";
import CostComparison from "@/components/sections/CostComparison";
import PilotPlan from "@/components/sections/PilotPlan";
import DetailedExample from "@/components/sections/DetailedExample";
import FinalPrinciple from "@/components/sections/FinalPrinciple";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <ScrollProgress />

      <main>
        <OpeningThesis />
        <StaticHandoffBreakdown />
        <ThreeActReframe />
        <CaseStudyDemo />
        <ProposedWorkflow />
        <ArtifactSeparation />
        <SharedReviewSurface />
        <Governance />
        <EngineeringAdoption />
        <CostComparison />
        <PilotPlan />
        <DetailedExample />
        <FinalPrinciple />
      </main>

      <footer className="max-w-5xl mx-auto px-6 md:px-8 py-12 border-t border-zinc-800/60">
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-600">Component-First Design Handoff</p>
          <p className="text-xs text-zinc-700">Built with Claude Code</p>
        </div>
      </footer>
    </div>
  );
}
