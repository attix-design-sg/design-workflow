// ─────────────────────────────────────────────
// Content data layer
// ─────────────────────────────────────────────

// ── Section 1: Opening Thesis ──

export const openingThesis = {
  headline: "Component-first design handoff",
  subline:
    "A workflow where Figma handles visual intent, code handles behavioral intent, and engineering decides what ships.",
  statement:
    "The best design-to-code workflow doesn't generate apps. It produces reviewable, documented components and leaves production decisions to the people who maintain production.",
};

// ── Section 2: Why Static Handoff Breaks Down ──

export interface PerspectiveItem {
  label: string;
  designerSees: string;
  developerReceives: string;
}

export const staticHandoffBreakdown = {
  title: "Why static handoff breaks down",
  intro:
    "Static mocks communicate visual composition well. They communicate responsive behavior, interaction sequencing, state transitions, and accessibility poorly. Sometimes not at all.",
  perspectives: [
    {
      label: "Responsive layout",
      designerSees: "Three breakpoint artboards showing different layouts",
      developerReceives:
        "Three snapshots with no spec for when or how transitions happen between them",
    },
    {
      label: "Interaction behavior",
      designerSees: "An annotation saying 'detail panel opens on row click'",
      developerReceives:
        "No spec for panel width, push vs. overlay, animation, or mobile equivalent",
    },
    {
      label: "State management",
      designerSees: "Separate frames for empty, loading, error, and populated states",
      developerReceives:
        "No spec for transitions between states, timing, or what triggers each",
    },
    {
      label: "Keyboard and focus",
      designerSees: "Not typically represented in static mocks",
      developerReceives:
        "Zero guidance on focus order, keyboard shortcuts, or screen reader behavior",
    },
    {
      label: "Conditional UI",
      designerSees:
        "A note saying 'show bulk actions when rows are selected'",
      developerReceives:
        "No spec for animation, positioning at different widths, or what happens when selection is cleared",
    },
  ] as PerspectiveItem[],
  unresolvedQuestions: [
    "Does the detail panel push content or overlay it?",
    "What's the mobile equivalent of hover-to-preview?",
    "Where does keyboard focus go after an inline edit is saved?",
    "Do selected rows persist when the user changes a filter?",
    "Which actions collapse into an overflow menu on tablet?",
    "How does the empty state transition to the populated state?",
    "What happens to the detail panel when the viewport shrinks below 768px?",
    "Is the sort indicator stateful across page navigation?",
  ],
};

// ── Section 3: Three approaches ──

export interface NarrativeColumn {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  characteristics: string[];
  assessment: string;
  assessmentTone: "neutral" | "negative" | "positive";
}

export const threeActNarrative = {
  title: "Three approaches to design-to-code",
  columns: [
    {
      id: "status-quo",
      label: "Where we are",
      sublabel: "Static-first handoff",
      description:
        "Designers produce mockups in Figma. Developers receive specs, links, and annotations. Implementation is interpretation. Feedback happens after the build.",
      characteristics: [
        "Familiar and established",
        "Designers work in their preferred tool",
        "Behavioral intent is implicit or missing",
        "Developers fill gaps with assumptions",
        "Correction loops happen late",
        "Works fine for simple, static UI",
      ],
      assessment:
        "Good for visual composition. Increasingly not enough for responsive, interactive, stateful product UI.",
      assessmentTone: "neutral" as const,
    },
    {
      id: "hype-approach",
      label: "What most AI-excited teams do",
      sublabel: "Full app generation",
      description:
        "An AI agent reads Figma files and generates complete pages or applications. The output is handed to developers as the starting point for production.",
      characteristics: [
        "Impressive first demos",
        "Generates code nobody wrote or reviewed",
        "Doesn't fit existing architecture",
        "Unfamiliar patterns and dependencies",
        "Hard to maintain or extend",
        "Developers rebuild rather than adopt",
        "Creates more work, not less",
      ],
      assessment:
        "This is what most 'let's implement AI' efforts default to. It fails because generated apps aren't production artifacts. They're demos that create tech debt on arrival.",
      assessmentTone: "negative" as const,
    },
    {
      id: "proposed",
      label: "What we propose",
      sublabel: "Component-first documented handoff",
      description:
        "Figma handles the visual system and composition. Coded prototypes handle behavioral intent. AI generates first-pass components and docs. Storybook becomes the shared review surface. Engineering adopts selectively.",
      characteristics: [
        "Design speed is preserved",
        "Behavioral intent is directly inspectable",
        "Output is components, not apps",
        "Every component has docs and states",
        "Engineering reviews before adoption",
        "Production code stays under dev control",
        "The prototype is disposable. The components aren't.",
      ],
      assessment:
        "Less downstream ambiguity because intent is legible before engineering starts work. Respects both design speed and engineering standards.",
      assessmentTone: "positive" as const,
    },
  ] as NarrativeColumn[],
};

// ── Failure modes comparison ──

export interface FailureMode {
  dimension: string;
  staticOnly: string;
  fullGeneration: string;
  componentFirst: string;
}

export const failureModes = {
  title: "Failure modes by approach",
  dimensions: [
    {
      dimension: "Behavioral clarity",
      staticOnly: "Low. Intent is implicit.",
      fullGeneration: "Medium. Behaviors exist but may not match intent.",
      componentFirst: "High. Behaviors are directly inspectable.",
    },
    {
      dimension: "Developer trust",
      staticOnly: "N/A. Developers write their own code.",
      fullGeneration: "Low. Unfamiliar code, unknown quality.",
      componentFirst: "Medium-high. Reviewed components with docs.",
    },
    {
      dimension: "Maintenance burden",
      staticOnly: "Normal. Code is authored by the team.",
      fullGeneration: "High. Maintaining code nobody understands.",
      componentFirst: "Normal. Adopted code is owned by the team.",
    },
    {
      dimension: "Design speed",
      staticOnly: "High. Designers work in Figma only.",
      fullGeneration: "High. AI does the generation.",
      componentFirst: "High. Figma + coded prototype in parallel.",
    },
    {
      dimension: "Rework frequency",
      staticOnly: "High. Corrections after implementation.",
      fullGeneration: "Very high. Developers often rebuild from scratch.",
      componentFirst: "Low. Intent is clarified before integration.",
    },
    {
      dimension: "Stack compatibility",
      staticOnly: "N/A. Developers choose the implementation.",
      fullGeneration: "Low. Generated code brings its own patterns.",
      componentFirst: "High. Output must fit existing stack.",
    },
  ] as FailureMode[],
};

// ── Section 4: Case study data ──

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type ViewportSize = "desktop" | "tablet" | "mobile";
export type CaseStudyTab = "static" | "annotated" | "live";

export interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  amount: number;
  date: string;
  email: string;
  items: number;
  priority: "normal" | "high" | "urgent";
}

export const caseStudyOrders: Order[] = [
  { id: "ORD-7291", customer: "Sarah Chen", status: "Processing", amount: 2450.0, date: "2026-03-12", email: "s.chen@example.com", items: 3, priority: "high" },
  { id: "ORD-7290", customer: "Marcus Webb", status: "Shipped", amount: 890.5, date: "2026-03-12", email: "m.webb@example.com", items: 1, priority: "normal" },
  { id: "ORD-7289", customer: "Aisha Patel", status: "Delivered", amount: 3200.0, date: "2026-03-11", email: "a.patel@example.com", items: 5, priority: "normal" },
  { id: "ORD-7288", customer: "James Liu", status: "Processing", amount: 1675.25, date: "2026-03-11", email: "j.liu@example.com", items: 2, priority: "urgent" },
  { id: "ORD-7287", customer: "Elena Rossi", status: "Cancelled", amount: 445.0, date: "2026-03-10", email: "e.rossi@example.com", items: 1, priority: "normal" },
  { id: "ORD-7286", customer: "David Okafor", status: "Shipped", amount: 5100.0, date: "2026-03-10", email: "d.okafor@example.com", items: 8, priority: "high" },
  { id: "ORD-7285", customer: "Nina Kovač", status: "Delivered", amount: 720.0, date: "2026-03-09", email: "n.kovac@example.com", items: 2, priority: "normal" },
  { id: "ORD-7284", customer: "Tom Nakamura", status: "Processing", amount: 1890.75, date: "2026-03-09", email: "t.nakamura@example.com", items: 4, priority: "normal" },
];

export const caseStudyUnresolvedQuestions = [
  {
    id: "panel-behavior",
    question: "Does the detail panel dock, collapse, or become a drawer on tablet/mobile?",
    annotationAnswer: "Designer note: 'panel becomes bottom drawer on mobile'",
    stillUnresolved: "At what width? Does it animate? What height is the drawer?",
    liveResolution: "Switch to mobile view and click a row to see the drawer behavior directly.",
  },
  {
    id: "selection-persistence",
    question: "What stays selected when the layout changes?",
    annotationAnswer: null,
    stillUnresolved: "Completely unspecified. Developer has to decide.",
    liveResolution: "Select rows, then switch viewports. Selection persists across layout changes.",
  },
  {
    id: "action-overflow",
    question: "Which actions stay visible and which move to overflow?",
    annotationAnswer: "Designer note: 'prioritize status change and export'",
    stillUnresolved: "What about the rest? What does the overflow menu look like?",
    liveResolution: "Resize to tablet/mobile to see actions reorganize into contextual menus.",
  },
  {
    id: "hover-to-touch",
    question: "Does hover behavior become tap, long press, or explicit buttons?",
    annotationAnswer: null,
    stillUnresolved: "No guidance. Developer has to invent the mobile interaction.",
    liveResolution: "On mobile view, inline actions become visible by default instead of hover-revealed.",
  },
  {
    id: "focus-movement",
    question: "Where does keyboard focus go after an inline action?",
    annotationAnswer: null,
    stillUnresolved: "Keyboard behavior is never in static mocks.",
    liveResolution: "Tab through the table and perform actions to see focus management live.",
  },
  {
    id: "bulk-actions-mobile",
    question: "How are bulk actions exposed on smaller screens?",
    annotationAnswer: "Designer note: 'bulk bar at bottom on mobile'",
    stillUnresolved: "Does it push content? Overlay? What about scrolling while it's visible?",
    liveResolution: "Select multiple rows on mobile to see the bottom action bar appear.",
  },
];

export interface AnnotationPin {
  id: string;
  x: number;
  y: number;
  note: string;
}

export const caseStudyAnnotations: AnnotationPin[] = [
  { id: "1", x: 75, y: 15, note: "Detail panel opens on row click, push layout on desktop" },
  { id: "2", x: 50, y: 8, note: "Filter bar collapses to icon-only on tablet" },
  { id: "3", x: 10, y: 92, note: "Bulk actions bar at bottom on mobile" },
  { id: "4", x: 85, y: 50, note: "Panel becomes bottom drawer below 768px" },
  { id: "5", x: 30, y: 45, note: "Status badges are interactive, click to change" },
  { id: "6", x: 5, y: 45, note: "Checkbox column, select-all behavior TBD" },
];

export const caseStudyIntro = {
  title: "Some design intent can only be experienced",
  description:
    "The same feature, shown three ways. Switch between a static mock, an annotated prototype, and live coded behavior, then change the viewport. Notice what becomes ambiguous and what becomes clear.",
};

// ── Section 5: Proposed workflow ──

export interface WorkflowStage {
  id: string;
  label: string;
  owner: "design" | "ai" | "engineering" | "carlos" | "shared";
  description: string;
  inputs: string[];
  outputs: string[];
  tools: string[];
}

export const proposedWorkflow = {
  title: "The proposed workflow",
  subtitle: "From feature request to production. Who does what, when, and why.",
  stages: [
    {
      id: "request",
      label: "Feature request",
      owner: "shared",
      description: "Product defines the feature with context, constraints, and success criteria.",
      inputs: ["PRD or brief", "User research", "Business context"],
      outputs: ["Scoped feature definition"],
      tools: ["Linear", "Notion", "Google Docs"],
    },
    {
      id: "visual-design",
      label: "Visual design in Figma",
      owner: "design",
      description: "Designer creates the visual system, composition, and static design intent. This is where Figma is strongest: layout, spacing, color, type, component structure.",
      inputs: ["Feature definition", "Design system tokens"],
      outputs: ["Figma mockups", "Component specs", "Visual states"],
      tools: ["Figma", "Design system library"],
    },
    {
      id: "coded-prototype",
      label: "Coded prototype",
      owner: "ai",
      description: "An AI agent reads the Figma design and generates a coded prototype that expresses behavioral intent: responsive breakpoints, interaction patterns, motion, state transitions. This is not production code. It's a design artifact written in code.",
      inputs: ["Figma mockups", "Component specs", "Design tokens"],
      outputs: ["Interactive prototype", "Behavioral reference"],
      tools: ["Claude", "Figma MCP", "Code Connect"],
    },
    {
      id: "component-generation",
      label: "Component generation",
      owner: "ai",
      description: "AI generates first-pass components with documentation, prop interfaces, states, and Storybook stories. These are proposals, not production code.",
      inputs: ["Coded prototype", "Existing component library", "Stack conventions"],
      outputs: ["Draft components", "Storybook stories", "Documentation"],
      tools: ["Claude", "Storybook", "COMPONENTS.md"],
    },
    {
      id: "shared-review",
      label: "Shared review",
      owner: "shared",
      description: "Design and engineering review components together in Storybook. Design checks visual and behavioral fidelity. Engineering evaluates code quality, architecture fit, and maintainability.",
      inputs: ["Draft components", "Stories", "Documentation"],
      outputs: ["Review feedback", "Approved / needs revision / rejected"],
      tools: ["Storybook", "Vercel preview", "Code review"],
    },
    {
      id: "approval",
      label: "Carlos review",
      owner: "carlos",
      description: "Carlos reviews the workflow output and approves the approach before engineering integration begins.",
      inputs: ["Reviewed components", "Review feedback"],
      outputs: ["Approval to proceed"],
      tools: ["Vercel preview", "Storybook"],
    },
    {
      id: "engineering-adoption",
      label: "Engineering adoption",
      owner: "engineering",
      description: "Engineering decides how to adopt each component. Options range from 'use as-is' to 'reference only' to 'reject and rebuild'. Production code is always under engineering control.",
      inputs: ["Approved components", "Documentation", "Stories"],
      outputs: ["Production-ready components", "Integrated features"],
      tools: ["IDE", "Git", "CI/CD", "Testing framework"],
    },
    {
      id: "production",
      label: "Production integration",
      owner: "engineering",
      description: "Adopted components go into the production codebase. Pages are assembled from components. Engineering owns the final output.",
      inputs: ["Production-ready components"],
      outputs: ["Shipped feature"],
      tools: ["Git", "CI/CD", "Monitoring"],
    },
  ] as WorkflowStage[],
};

export const ownerColors: Record<WorkflowStage["owner"], string> = {
  design: "text-sky-400",
  ai: "text-violet-400",
  engineering: "text-emerald-400",
  carlos: "text-amber-400",
  shared: "text-zinc-300",
};

export const ownerBgColors: Record<WorkflowStage["owner"], string> = {
  design: "bg-sky-500/10 border-sky-500/20",
  ai: "bg-violet-500/10 border-violet-500/20",
  engineering: "bg-emerald-500/10 border-emerald-500/20",
  carlos: "bg-amber-500/10 border-amber-500/20",
  shared: "bg-zinc-500/10 border-zinc-500/20",
};

export const ownerLabels: Record<WorkflowStage["owner"], string> = {
  design: "Design",
  ai: "AI / Agent",
  engineering: "Engineering",
  carlos: "Carlos",
  shared: "Shared",
};

// ── Section 6: Artifact separation ──

export interface ArtifactType {
  id: string;
  label: string;
  purpose: string;
  description: string;
  characteristics: string[];
  isHandoff: boolean;
  lifespan: string;
}

export const artifactTypes: ArtifactType[] = [
  {
    id: "coded-prototype",
    label: "Coded prototype",
    purpose: "Express behavioral intent",
    description:
      "An app-like artifact that shows how the feature should feel: responsive behavior, interaction patterns, state transitions, motion. It can look like a real app without being one. It's a design tool, not a production artifact.",
    characteristics: [
      "Looks and feels like the real feature",
      "Shows breakpoints, transitions, interactions",
      "Built quickly by AI from Figma input",
      "Not reviewed for code quality",
      "Not intended for production",
      "Disposable once components are extracted",
    ],
    isHandoff: false,
    lifespan: "Temporary, discarded after review",
  },
  {
    id: "reference-implementation",
    label: "Reference implementation",
    purpose: "Component-level code with docs",
    description:
      "Individual components extracted from the prototype, cleaned up, documented, and presented in Storybook with all states, props, and usage examples. This is the actual handoff artifact.",
    characteristics: [
      "Individual components, not full pages",
      "Documented with props, states, and usage",
      "Storybook stories for every variant",
      "Aligned with design tokens",
      "Reviewed by both design and engineering",
      "Starting point for production adoption",
    ],
    isHandoff: true,
    lifespan: "Persists through review cycle",
  },
  {
    id: "production-component",
    label: "Production-ready component",
    purpose: "Ships to users",
    description:
      "The component as it exists in the production codebase after engineering adoption. Could be identical to the reference, substantially rewritten, or built from scratch using the reference as documentation only.",
    characteristics: [
      "Meets production code standards",
      "Fully tested and accessible",
      "Fits existing architecture",
      "Owned and maintained by engineering",
      "Engineering decides the implementation approach",
      "Source of truth for shipped UI",
    ],
    isHandoff: false,
    lifespan: "Permanent, part of the codebase",
  },
];

// ── Section 7: Shared review surface ──

export const sharedReviewSurface = {
  title: "The shared review surface",
  subtitle: "Storybook and documentation as the boundary where design and engineering meet.",
  description:
    "Instead of reviewing static mocks or arguing over generated app code, both sides review components in a live documentation environment. Designers check that the component matches their intent. Engineers evaluate whether the code is adoptable.",
  requirements: [
    {
      label: "Every component has a story",
      detail: "All visual states, interaction states, and edge cases are documented as Storybook stories.",
    },
    {
      label: "Props and variants are explicit",
      detail: "The component API is visible: what it accepts, what it renders, what it does.",
    },
    {
      label: "Responsive behavior is demonstrable",
      detail: "Viewport controls in Storybook let both sides inspect breakpoint behavior.",
    },
    {
      label: "Accessibility is testable",
      detail: "Keyboard navigation, screen reader output, and focus management are inspectable in the review environment.",
    },
    {
      label: "Token alignment is visible",
      detail: "The component uses the project's design tokens, not hardcoded values from the prototype.",
    },
  ],
};

// ── Section 8: Governance ──

export interface OwnershipCell {
  role: string;
  owns: string[];
  reviews: string[];
  consumes: string[];
}

export const ownershipMatrix = {
  title: "Who owns what",
  roles: [
    {
      role: "Design",
      owns: ["Visual system and tokens", "Component specs", "Interaction intent"],
      reviews: ["Generated components (visual and behavioral fidelity)"],
      consumes: ["Production component status"],
    },
    {
      role: "AI / Agent",
      owns: [],
      reviews: [],
      consumes: ["Figma mockups", "Design tokens", "Stack conventions"],
      generates: ["Coded prototypes", "Draft components", "Documentation", "Storybook stories"],
    },
    {
      role: "Engineering",
      owns: ["Production code", "Architecture decisions", "Adoption decisions", "Testing and CI"],
      reviews: ["Generated components (code quality, architecture fit, maintainability)"],
      consumes: ["Reference implementations", "Documentation", "Stories"],
    },
    {
      role: "Carlos",
      owns: ["Workflow approval", "Process gates"],
      reviews: ["Overall approach and output quality"],
      consumes: ["Vercel previews", "Review summaries"],
    },
  ],
};

export const governanceRules = [
  "Code is the source of truth for shipped UI.",
  "Every adopted component must have documentation and documented states.",
  "AI proposes, humans review. Nothing merges without engineering approval.",
  "Pages are downstream of components, not the other way around.",
  "Generated output must fit the existing stack and standards.",
  "The coded prototype can be app-like without being the handoff artifact.",
  "Engineering can reject, rewrite, or partially adopt any generated output.",
  "Design validates intent. Engineering validates implementation.",
];

export interface TrustChecklistItem {
  label: string;
  question: string;
  credibleWhen: string;
}

export const developerTrustChecklist: TrustChecklistItem[] = [
  {
    label: "Documentation",
    question: "Can I understand this component without reading the source?",
    credibleWhen: "Props, usage examples, and behavioral notes are complete and accurate.",
  },
  {
    label: "States",
    question: "Are all visual and interaction states covered?",
    credibleWhen: "Empty, loading, error, populated, disabled, hover, focus, and active are all documented.",
  },
  {
    label: "Accessibility",
    question: "Does this meet WCAG standards?",
    credibleWhen: "Keyboard navigation, screen reader labels, focus management, and contrast ratios are handled.",
  },
  {
    label: "Token alignment",
    question: "Does this use our design tokens?",
    credibleWhen: "Colors, spacing, type, and shadows reference the token system. No hardcoded values.",
  },
  {
    label: "Testability",
    question: "Can I write tests for this without refactoring?",
    credibleWhen: "Clear inputs/outputs, testable interactions, no hidden dependencies.",
  },
  {
    label: "Composability",
    question: "Can I use this alongside our existing components?",
    credibleWhen: "Follows existing patterns for props, events, slots, and composition.",
  },
  {
    label: "Stack fit",
    question: "Does this match our architecture?",
    credibleWhen: "Framework, styling approach, state management, and file structure match the project.",
  },
  {
    label: "Ease of rejection",
    question: "Can I say no without wasting everyone's time?",
    credibleWhen: "The workflow treats rejection as a normal outcome, not a failure. The docs remain useful even if the code is discarded.",
  },
];

// ── Section 9: Engineering adoption modes ──

export interface AdoptionMode {
  label: string;
  description: string;
  when: string;
}

export const adoptionModes: AdoptionMode[] = [
  {
    label: "Adopt as-is",
    description:
      "The generated component meets production standards. Engineering imports it directly with minimal changes.",
    when: "Simple, well-documented components that match existing patterns exactly.",
  },
  {
    label: "Adopt with modifications",
    description:
      "The component is a solid foundation but needs adjustments: refactoring, perf improvements, or architectural alignment.",
    when: "Most components. The generated code saves 60-80% of implementation time.",
  },
  {
    label: "Reference only",
    description:
      "Engineering uses the generated component and docs as a spec, then builds their own implementation from scratch.",
    when: "Complex components where architecture decisions matter more than initial code.",
  },
  {
    label: "Reject",
    description:
      "The generated output doesn't fit. Engineering builds the feature using only the original design specs. The docs may still be useful.",
    when: "Generated approach conflicts with production architecture or adds unacceptable complexity.",
  },
];

export interface Objection {
  question: string;
  rebuttal: string;
}

export const skepticalObjections: Objection[] = [
  {
    question: "Isn't this just adding a middleman between Figma and the codebase?",
    rebuttal:
      "The middleman already exists. It's the developer interpreting static mocks and filling behavioral gaps with assumptions. This workflow makes that interpretation step explicit and reviewable instead of implicit and error-prone.",
  },
  {
    question: "I don't trust AI-generated code. I'll spend more time reviewing than writing.",
    rebuttal:
      "That's why the workflow doesn't ask you to trust it. You review components in Storybook with full documentation. If the review takes longer than writing from scratch, reject the output and use the docs as a spec. The workflow accounts for that.",
  },
  {
    question: "This sounds like it creates more process, not less.",
    rebuttal:
      "Compare it: currently you interpret a mock, build it, get design feedback, correct it, repeat. This front-loads intent clarity so there's less to correct. The total effort shifts earlier, where changes are cheaper.",
  },
  {
    question: "What if the generated code uses patterns we don't use?",
    rebuttal:
      "A governance rule: generated output must fit the existing stack and standards. If it doesn't, that's a generation quality issue to fix, not a reason to adopt bad code. The checklist includes 'stack fit' as an explicit review criterion.",
  },
  {
    question: "Design shouldn't be writing code or reviewing code.",
    rebuttal:
      "Design isn't reviewing code. They're reviewing components in Storybook, which is a visual environment. The coded prototype is produced by an agent, not by the designer. Designers still work in Figma. They also get to validate behavioral intent in a live environment.",
  },
  {
    question: "This will slow us down.",
    rebuttal:
      "It shifts where time is spent. Less time interpreting ambiguous specs, fewer correction loops after implementation, less rework after design review. The net time is similar or lower, but rework drops significantly.",
  },
];

// ── Section 10: Cost comparison ──

export interface TimelineStep {
  label: string;
  owner: string;
  unresolvedQuestions?: number;
  clarificationLoops?: number;
  reworkRisk?: "low" | "medium" | "high";
  note?: string;
}

export const traditionalTimeline: TimelineStep[] = [
  { label: "Feature request", owner: "Product", unresolvedQuestions: 0 },
  { label: "Static mockup in Figma", owner: "Design", unresolvedQuestions: 0, note: "Visual intent is clear" },
  {
    label: "Handoff to engineering",
    owner: "Design to Engineering",
    unresolvedQuestions: 8,
    note: "~8 behavioral questions unresolved",
  },
  {
    label: "Developer interprets intent",
    owner: "Engineering",
    unresolvedQuestions: 8,
    clarificationLoops: 2,
    note: "Asks 2-3 questions, fills remaining gaps with assumptions",
  },
  {
    label: "Implementation",
    owner: "Engineering",
    unresolvedQuestions: 4,
    reworkRisk: "high",
    note: "~4 assumptions that may not match designer intent",
  },
  {
    label: "Design review",
    owner: "Design",
    clarificationLoops: 2,
    reworkRisk: "high",
    note: "Finds behavioral mismatches, 2 correction loops",
  },
  {
    label: "Corrections and rework",
    owner: "Engineering",
    reworkRisk: "medium",
    note: "Late-cycle rework on interaction and responsive behavior",
  },
  { label: "Ship", owner: "Engineering", reworkRisk: "low" },
];

export const proposedTimeline: TimelineStep[] = [
  { label: "Feature request", owner: "Product", unresolvedQuestions: 0 },
  { label: "Static mockup in Figma", owner: "Design", unresolvedQuestions: 0, note: "Visual intent is clear" },
  {
    label: "Coded prototype generated",
    owner: "AI / Agent",
    unresolvedQuestions: 2,
    note: "Behavioral intent expressed in code, most questions resolved",
  },
  {
    label: "Component generation + docs",
    owner: "AI / Agent",
    unresolvedQuestions: 2,
    note: "Components, stories, and documentation produced",
  },
  {
    label: "Shared review in Storybook",
    owner: "Design + Engineering",
    unresolvedQuestions: 0,
    clarificationLoops: 1,
    note: "Both sides review together, remaining questions resolved",
  },
  {
    label: "Carlos approval",
    owner: "Carlos",
    unresolvedQuestions: 0,
  },
  {
    label: "Engineering adoption",
    owner: "Engineering",
    reworkRisk: "low",
    note: "Intent is clear, adoption mode chosen based on quality",
  },
  { label: "Ship", owner: "Engineering", reworkRisk: "low" },
];

export const costComparisonMetrics = [
  {
    metric: "Unresolved behavioral questions at handoff",
    traditional: "~8",
    proposed: "~2",
    note: "Coded prototype resolves most behavioral ambiguity before engineering sees it.",
  },
  {
    metric: "Design-engineering clarification loops",
    traditional: "3-4 rounds",
    proposed: "0-1 rounds",
    note: "Shared review in Storybook replaces async back-and-forth.",
  },
  {
    metric: "Assumptions made during implementation",
    traditional: "4-6 per feature",
    proposed: "0-1 per feature",
    note: "Behavioral intent is inspectable, not inferred.",
  },
  {
    metric: "Post-implementation design corrections",
    traditional: "Common (2-3 per feature)",
    proposed: "Rare",
    note: "Intent alignment happens before the build, not after.",
  },
  {
    metric: "Late-cycle rework",
    traditional: "Frequent, usually responsive and interaction behavior",
    proposed: "Infrequent, only edge cases missed in review",
    note: "Rework shifts from expensive (post-build) to cheap (pre-build).",
  },
  {
    metric: "Behavioral intent inspectable before integration",
    traditional: "No",
    proposed: "Yes, in coded prototype and Storybook",
    note: "The core shift: intent becomes legible earlier.",
  },
];

// ── Section 11: Pilot plan ──

export interface PilotPhase {
  phase: string;
  duration: string;
  goal: string;
  activities: string[];
  successCriteria: string[];
}

export const pilotPlan = {
  title: "Pilot plan",
  subtitle:
    "Start small. Prove the workflow on one real feature. Expand based on results, not conviction.",
  phases: [
    {
      phase: "Setup",
      duration: "1 week",
      goal: "Technical prerequisites in place",
      activities: [
        "Configure Figma MCP and Code Connect",
        "Set up sandbox repo with project stack",
        "Configure Storybook with design tokens",
        "Create COMPONENTS.md template",
        "Brief the pilot team on the workflow",
      ],
      successCriteria: [
        "Agent can read Figma files and generate components",
        "Storybook runs with project tokens",
        "Team understands the workflow stages",
      ],
    },
    {
      phase: "First feature",
      duration: "2 weeks",
      goal: "Run the full workflow on one real feature",
      activities: [
        "Pick a medium-complexity feature with behavioral nuance",
        "Design produces Figma mockups",
        "Agent generates coded prototype",
        "Agent generates components and documentation",
        "Design + engineering review in Storybook",
        "Carlos reviews and approves",
        "Engineering adopts components using chosen mode",
        "Ship the feature",
      ],
      successCriteria: [
        "Feature ships on schedule",
        "Fewer design-engineering clarification loops than typical",
        "Engineering reports the handoff was clearer than usual",
        "At least one component was adopted (any mode)",
      ],
    },
    {
      phase: "Retrospective",
      duration: "1 week",
      goal: "Evaluate and decide on expansion",
      activities: [
        "Compare actual clarification loops vs. typical",
        "Survey design and engineering satisfaction",
        "Document what worked and what didn't",
        "Identify workflow adjustments",
        "Decide: expand, adjust, or stop",
      ],
      successCriteria: [
        "Both design and engineering see value",
        "Honest assessment of time and quality tradeoffs",
        "Clear recommendation on next steps",
      ],
    },
  ] as PilotPhase[],
};

export const setupItems = [
  {
    label: "Git read access for agent",
    requiresCarlos: true,
    description: "Agent needs read access to the production repo to understand existing patterns.",
  },
  {
    label: "Sandbox repository",
    requiresCarlos: true,
    description: "A fork or branch where generated code lives before engineering review.",
  },
  {
    label: "Figma MCP configuration",
    requiresCarlos: true,
    description: "Connect the AI agent to Figma for reading design files.",
  },
  {
    label: "Code Connect setup",
    requiresCarlos: true,
    description: "Map Figma components to codebase components for accurate generation.",
  },
  {
    label: "Storybook with design tokens",
    requiresCarlos: false,
    description: "Storybook configured with the project's token system for accurate preview.",
  },
  {
    label: "COMPONENTS.md template",
    requiresCarlos: false,
    description: "Documentation template that defines what 'documented' means for a component.",
  },
  {
    label: "PRD as context document",
    requiresCarlos: false,
    description: "Feature requirements formatted for agent consumption.",
  },
  {
    label: "Vercel preview deployment",
    requiresCarlos: false,
    description: "Preview URLs for reviewing generated output in a real browser.",
  },
];

// ── Section 12: Detailed example ──

export interface ExampleStage {
  stage: string;
  description: string;
  artifact: string;
  keyDecisions: string[];
}

export const detailedExample = {
  title: "Example: order management workspace",
  subtitle:
    "A dense, interaction-heavy feature moving from concept to production through the proposed workflow.",
  feature:
    "A sortable, filterable order table with row selection, bulk actions, inline status editing, and a detail panel. Different layouts and interaction patterns across desktop, tablet, and mobile.",
  stages: [
    {
      stage: "Feature request",
      description:
        "Product defines the order management workspace: dense data table with list-detail behavior, bulk operations, and mobile support.",
      artifact: "PRD with requirements and user stories",
      keyDecisions: [
        "Must support 3 breakpoints with meaningfully different layouts",
        "Bulk actions are a core workflow, not a power-user feature",
        "Inline editing for status changes to reduce context switching",
      ],
    },
    {
      stage: "Visual design in Figma",
      description:
        "Designer creates desktop, tablet, and mobile artboards showing the table, detail panel, filter bar, and bulk action states.",
      artifact: "Figma file with 3 breakpoints × 4 states = 12 frames",
      keyDecisions: [
        "Desktop: side panel for detail view",
        "Table density and information hierarchy",
        "Color system for status badges",
      ],
    },
    {
      stage: "Coded prototype",
      description:
        "AI generates an interactive prototype from the Figma designs. Shows how the detail panel transitions from a side panel to a bottom drawer, how bulk actions reposition, how interactions change across viewports.",
      artifact: "Interactive prototype deployed to Vercel preview",
      keyDecisions: [
        "Panel transition behavior at each breakpoint",
        "Hover-to-tap conversion for mobile",
        "Focus management during inline edits",
        "State persistence across viewport changes",
      ],
    },
    {
      stage: "Component generation",
      description:
        "AI extracts individual components: DataTable, DetailPanel, BulkActionsBar, FilterBar, StatusBadge, InlineEditor. Each has docs, prop types, and Storybook stories.",
      artifact: "6 components with stories and docs in Storybook",
      keyDecisions: [
        "Component boundaries and composition patterns",
        "Prop interfaces that match existing conventions",
        "Token usage for all visual properties",
      ],
    },
    {
      stage: "Shared review",
      description:
        "Design checks visual fidelity and behavioral intent in Storybook. Engineering evaluates code quality, architecture fit, and test coverage. One clarification loop on the InlineEditor.",
      artifact: "Review feedback and approved component list",
      keyDecisions: [
        "InlineEditor needs keyboard trap fix",
        "DataTable row virtualization for performance",
        "DetailPanel animation timing adjustment",
      ],
    },
    {
      stage: "Engineering adoption",
      description:
        "Engineering adopts DataTable and StatusBadge as-is. Modifies DetailPanel and BulkActionsBar for architecture fit. Uses FilterBar as reference only. Rebuilds InlineEditor from scratch for accessibility.",
      artifact: "Production-ready components in the codebase",
      keyDecisions: [
        "InlineEditor: rebuild (accessibility concerns)",
        "DetailPanel: modify (animation approach differs from project standard)",
        "FilterBar: reference only (existing filter system is sufficient)",
      ],
    },
    {
      stage: "Production",
      description:
        "The order management workspace ships with all components integrated, tested, and documented. Coded prototype is archived. Production components are the source of truth.",
      artifact: "Shipped feature in production",
      keyDecisions: [
        "All components have production tests",
        "Documentation updated in component library",
        "Coded prototype archived, not maintained",
      ],
    },
  ] as ExampleStage[],
};

// ── Section 13: Final operating principle ──

export const finalPrinciple = {
  statement:
    "The prototype is disposable. The components are reviewable. The production code is yours.",
  subline:
    "A workflow that respects what designers are good at, what AI is useful for, and what engineering must control.",
};

// ── Scroll progress / navigation ──

export interface NavSection {
  id: string;
  label: string;
  shortLabel?: string;
}

export const navSections: NavSection[] = [
  { id: "thesis", label: "Thesis" },
  { id: "static-handoff", label: "Static handoff", shortLabel: "Handoff" },
  { id: "three-approaches", label: "Three approaches", shortLabel: "Approaches" },
  { id: "case-study", label: "Code as design medium", shortLabel: "Case study" },
  { id: "workflow", label: "Proposed workflow", shortLabel: "Workflow" },
  { id: "artifacts", label: "Artifact separation", shortLabel: "Artifacts" },
  { id: "review-surface", label: "Shared review surface", shortLabel: "Review" },
  { id: "governance", label: "Governance" },
  { id: "adoption", label: "Engineering adoption", shortLabel: "Adoption" },
  { id: "cost", label: "Cost comparison", shortLabel: "Cost" },
  { id: "pilot", label: "Pilot plan", shortLabel: "Pilot" },
  { id: "example", label: "Detailed example", shortLabel: "Example" },
  { id: "principle", label: "Operating principle", shortLabel: "Principle" },
];
