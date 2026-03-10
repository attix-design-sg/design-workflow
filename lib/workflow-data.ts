export type StageOwner = "PM" | "Designer" | "Designer + PM" | "CEO" | "Dev" | "Claude" | "Designer / Claude";
export type StageStatus = "idle" | "active" | "gate" | "complete";

export interface Stage {
  id: string;
  name: string;
  owner: StageOwner;
  tools: string[];
  input: string;
  output: string;
  gate?: string;
  description: string;
  details?: string[];
}

export interface WorkflowPath {
  id: string;
  label: string;
  stages: Stage[];
}

export interface Workflow {
  id: "A" | "B";
  name: string;
  tagline: string;
  philosophy: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  paths: WorkflowPath[];
}

// ─── OPTION A ─────────────────────────────────────────────────────────────────

const optionAStages: Stage[] = [
  {
    id: "a-request",
    name: "Feature Request",
    owner: "PM",
    tools: ["Linear", "Slack"],
    input: "Business need / user feedback",
    output: "Written brief with goals and scope",
    description: "PM captures the feature request with enough context for Claude to begin.",
    details: [
      "Include: what problem it solves, who it's for, any visual references",
      "Link to any existing Figma files or related features",
      "Define success criteria upfront",
    ],
  },
  {
    id: "a-wireframe",
    name: "Draft Wireframe + Plan",
    owner: "Designer / Claude",
    tools: ["Claude Code"],
    input: "Brief doc + read access to production repo",
    output: "Low-fidelity wireframe in code + architecture plan",
    description: "Claude reads your production repo to match existing architecture, then generates a wireframe and implementation plan.",
    details: [
      "Claude reads COMPONENTS.md to identify reusable components",
      "Matches naming conventions and folder structure from prod repo",
      "Outputs a plan noting: new components needed, existing ones to reuse, state approach",
    ],
  },
  {
    id: "a-figma-push",
    name: "Push to Figma",
    owner: "Designer",
    tools: ["Figma MCP", "Claude Code"],
    input: "Code wireframe",
    output: "Figma frame ready for designer",
    description: "Use the Figma MCP to push the wireframe into Figma as a starting point for the designer.",
    details: [
      "Creates a new Figma frame in the project's design file",
      "Designer picks up from here — they don't start from scratch",
      "Label the frame clearly with feature name + date",
    ],
  },
  {
    id: "a-figma-refine",
    name: "Design Refinement in Figma",
    owner: "Designer + PM",
    tools: ["Figma"],
    input: "Figma wireframe frame",
    output: "Approved, annotated Figma design",
    gate: "PM signs off on design before it moves to code",
    description: "Designer refines the wireframe into a polished design. PM validates it matches the brief.",
    details: [
      "Designer uses existing Figma component library",
      "All states documented: default, hover, loading, empty, error",
      "Annotations added for interactions (e.g. 'opens modal on click')",
      "PM confirms scope hasn't changed from the brief",
    ],
  },
  {
    id: "a-generate-code",
    name: "Generate Code from Figma",
    owner: "Designer / Claude",
    tools: ["Figma MCP", "Claude Code"],
    input: "Approved Figma design + COMPONENTS.md + prod repo read access",
    output: "Feature branch with generated code",
    description: "Claude pulls the approved Figma design via MCP and generates code that matches your existing codebase. Production repo is read via sparse checkout — only the relevant folders are pulled, not the full codebase.",
    details: [
      "Claude reads COMPONENTS.md to map Figma components → code components",
      "Generates on a new feature branch: feature/<ticket>-<description> in the SANDBOX repo",
      "Sparse checkout: git clone --filter=blob:none --sparse <prod-repo> then git sparse-checkout set src/components src/styles src/types — pulls only what's needed, not the full repo",
      "Alternative: read individual files from prod via GitHub API (no clone needed) — ask CTO for a read-only token scoped to repo:read",
      "Shallow clone fallback: git clone --depth=1 pulls only the latest commit, no history — much faster on heavy repos",
      "Outputs TypeScript components with proper props matching prod patterns",
    ],
  },
  {
    id: "a-refine-code",
    name: "Refine Interactions in Code",
    owner: "Designer / Claude",
    tools: ["Claude Code"],
    input: "Generated feature branch",
    output: "Polished, interaction-complete feature branch",
    description: "Iterate in code to nail transitions, edge states, and micro-interactions that can't be captured in Figma.",
    details: [
      "Add loading states, skeleton screens, optimistic UI",
      "Handle error states and empty states",
      "Add animations if needed (Framer Motion patterns)",
      "No new Figma round-trips for code-level refinements",
    ],
  },
  {
    id: "a-vercel-deploy",
    name: "Deploy to Vercel Sandbox",
    owner: "Designer",
    tools: ["Vercel", "GitHub (sandbox repo)"],
    input: "Polished feature branch",
    output: "Shareable Vercel preview URL",
    description: "Push to the standalone sandbox GitHub repo. Vercel auto-deploys a preview URL.",
    details: [
      "Sandbox repo is separate from production — safe to deploy anything",
      "Each branch gets its own Vercel preview URL",
      "Share the URL — not the code — for approval",
      "Do NOT redeploy after approval is given",
    ],
  },
  {
    id: "a-internal-review",
    name: "Designer + PM Internal Review",
    owner: "Designer + PM",
    tools: ["Vercel preview URL"],
    input: "Vercel preview URL",
    output: "Feedback list or green light",
    gate: "Designer + PM must sign off before CEO sees it",
    description: "Designer and PM review the coded prototype against the approved Figma design.",
    details: [
      "Check: does the code match the approved Figma?",
      "Check: all states working (loading, empty, error)?",
      "Minor tweaks → iterate in code only, no Figma needed",
      "Major visual changes → back to Figma refinement stage",
    ],
  },
  {
    id: "a-ceo-approval",
    name: "CEO Approval",
    owner: "CEO",
    tools: ["Vercel preview URL"],
    input: "Vercel preview URL (post designer/PM review)",
    output: "Approved or iterate",
    gate: "CEO must approve before handoff is prepared",
    description: "CEO reviews the live prototype on Vercel and approves or requests changes.",
    details: [
      "Send the Vercel URL, not screenshots",
      "CEO should interact with it on their actual device",
      "Document the approved URL + timestamp",
      "If changes requested: back to 'Refine Interactions' stage (not Figma, unless visual)",
    ],
  },
  {
    id: "a-handoff",
    name: "Prepare Handoff Package",
    owner: "Designer",
    tools: ["GitHub", "Figma", "Notion / Linear"],
    input: "Approved Vercel preview + feature branch",
    output: "Handoff package (see details)",
    description: "Package everything the dev needs to implement this in production — no guessing required.",
    details: [
      "GitHub PR link (feature branch → production pattern)",
      "Figma frame link (approved, locked/annotated)",
      "Vercel preview URL (the approved version — do not redeploy)",
      "Component inventory: new components + modified ones with props",
      "New design tokens (colors, spacing, type — if any)",
      "All copy/strings finalized",
      "Edge states documented: loading, empty, error",
      "QA checklist generated by Claude (Vercel vs Live diff spec)",
    ],
  },
  {
    id: "a-dev-impl",
    name: "Dev Implements into Live",
    owner: "Dev",
    tools: ["Production repo", "IDE"],
    input: "Handoff package",
    output: "Feature live in production",
    description: "Dev uses the handoff package to implement the feature into the production codebase.",
    details: [
      "Dev creates a branch in the production repo",
      "References the sandbox feature branch for implementation reference",
      "Opens a PR to production main with the handoff checklist as the PR description",
      "Requires code review from at least one other dev",
    ],
  },
  {
    id: "a-qa-diff",
    name: "QA Diff: Vercel vs Live",
    owner: "Designer / Claude",
    tools: ["Claude", "Playwright MCP"],
    input: "Vercel preview URL + production URL",
    output: "Diff checklist — approved or issues found",
    gate: "Dev signs off on all checklist items",
    description: "Claude uses Playwright to screenshot both URLs and compares them, flagging regressions.",
    details: [
      "Claude screenshots the same routes on Vercel preview and production",
      "Checks: layout, colors, typography, spacing, component presence",
      "Checks: loading states, error states, empty states",
      "Outputs a structured checklist — dev confirms each item",
      "Any delta gets a bug ticket before feature is marked done",
    ],
  },
];

// ─── OPTION C ─────────────────────────────────────────────────────────────────

const optionCTriageStage: Stage = {
  id: "c-triage",
  name: "Triage: Simple or Complex?",
  owner: "PM",
  tools: ["Linear", "Slack"],
  input: "Feature brief",
  output: "Complexity decision: Simple or Complex",
  gate: "PM must commit to a complexity level",
  description: "PM evaluates the feature against the triage criteria and routes it to the Simple or Complex path.",
  details: [
    "Route to COMPLEX if: new UI pattern, first-impression screen, designer creative input needed, or >2 component files changed",
    "Route to SIMPLE if: copy change, color/variant tweak, show/hide existing component, form field addition, icon swap, minor spacing",
    "When in doubt → Complex. Under-triaging costs more than over-triaging.",
  ],
};

const optionCSimpleStages: Stage[] = [
  {
    id: "c-s-request",
    name: "Feature Request",
    owner: "PM",
    tools: ["Linear", "Slack"],
    input: "Business need",
    output: "Brief with complexity decision: Simple",
    description: "PM captures the request and declares it Simple in the triage step.",
    details: [
      "Simple features still need a clear brief",
      "Include: what changes, what it looks like today vs target",
    ],
  },
  {
    id: "c-s-generate",
    name: "Generate Code Directly",
    owner: "Designer / Claude",
    tools: ["Claude Code", "Prod repo read access", "COMPONENTS.md"],
    input: "Brief + production repo read access",
    output: "Feature branch with code",
    description: "Claude reads the production repo and COMPONENTS.md, then generates code directly — no Figma round-trip.",
    details: [
      "Claude matches existing patterns exactly from the prod repo",
      "Branch: feature/<ticket>-<description> in sandbox repo",
      "For style changes: Claude reads existing component CSS/Tailwind classes",
      "Output is TypeScript-first, matching prod stack",
    ],
  },
  {
    id: "c-s-vercel",
    name: "Deploy to Vercel Sandbox",
    owner: "Designer",
    tools: ["Vercel", "GitHub (sandbox)"],
    input: "Feature branch",
    output: "Vercel preview URL",
    description: "Push to sandbox repo, get a preview URL.",
    details: [
      "Each branch gets its own preview URL automatically",
      "Do NOT redeploy after approval is given",
    ],
  },
  {
    id: "c-s-designer-review",
    name: "Designer Visual Review",
    owner: "Designer",
    tools: ["Vercel preview URL"],
    input: "Vercel preview URL",
    output: "Visual approval or feedback",
    gate: "Designer must confirm visual quality before CEO sees it",
    description: "Designer quickly checks the coded prototype matches product visual standards.",
    details: [
      "Not a full design review — just a visual sanity check",
      "If minor: fix in code, no Figma",
      "If major visual issue found: escalate to Complex path (re-triage)",
    ],
  },
  {
    id: "c-s-ceo",
    name: "CEO Approval",
    owner: "CEO",
    tools: ["Vercel preview URL"],
    input: "Vercel preview URL",
    output: "Approved or iterate",
    gate: "CEO approves before handoff",
    description: "CEO reviews and approves the prototype.",
    details: [
      "Send the URL, not screenshots",
      "Document the approved URL + timestamp",
    ],
  },
  {
    id: "c-s-handoff",
    name: "Prepare Handoff Package",
    owner: "Designer",
    tools: ["GitHub", "Linear"],
    input: "Approved feature branch",
    output: "Lightweight handoff package",
    description: "Simpler handoff than Complex — no Figma link needed.",
    details: [
      "GitHub PR link (sandbox branch as reference)",
      "Vercel preview URL (approved version)",
      "List of changed files + component names",
      "All copy/strings finalized",
      "Claude-generated QA checklist",
    ],
  },
  {
    id: "c-s-dev",
    name: "Dev Implements into Live",
    owner: "Dev",
    tools: ["Production repo"],
    input: "Handoff package",
    output: "Feature live in production",
    description: "Dev implements using the sandbox branch as direct reference.",
    details: [
      "For Simple features, the sandbox code is often near-identical to what goes in prod",
      "Dev may be able to cherry-pick or directly adapt the branch",
    ],
  },
  {
    id: "c-s-qa",
    name: "QA Diff: Vercel vs Live",
    owner: "Designer / Claude",
    tools: ["Claude", "Playwright MCP"],
    input: "Vercel URL + production URL",
    output: "Diff checklist",
    gate: "Dev signs off",
    description: "Claude compares the approved Vercel preview to production and flags any differences.",
    details: [
      "Screenshot comparison at the same routes",
      "Flag: layout shifts, color differences, missing elements",
      "Structured checklist for dev to confirm",
    ],
  },
];

const optionCComplexNote: Stage = {
  id: "c-complex-note",
  name: "Complex Path → Follow Option A",
  owner: "PM",
  tools: ["See Option A"],
  input: "Triage decision: Complex",
  output: "Routed to Option A full workflow",
  description: "Complex features follow Option A exactly, starting from the wireframe stage.",
  details: [
    "All stages from Option A apply: wireframe → Figma → code → Vercel → approval → handoff",
    "The triage decision should be documented in the Linear ticket",
    "Designer must be looped in immediately when complexity is declared",
  ],
};

export const workflows: Workflow[] = [
  {
    id: "A",
    name: "Option A",
    tagline: "Figma-First",
    philosophy:
      "Design is the source of truth. Nothing gets coded until it's been blessed in Figma by the designer and PM. CEO approves the Vercel prototype.",
    pros: [
      "CEO always approves something polished and visual",
      "Figma stays in sync with production",
      "Designer owns quality before dev touches it",
      "Clear approval trail: Figma → Vercel → Live",
      "Reduces dev rework on large features",
      "Works for non-technical stakeholder review",
      "Any Figma ↔ code drift is visible and caught early — the system flags it rather than hiding it",
    ],
    cons: [
      "Slowest path — two review stages before code",
      "Requires reliable Figma MCP setup",
    ],
    bestFor:
      "New feature launches, anything customer-facing with brand sensitivity, or any time the CEO needs a polished prototype before commitments are made.",
    paths: [
      {
        id: "a-main",
        label: "Full Flow",
        stages: optionAStages,
      },
    ],
  },
  {
    id: "B",
    name: "Option B",
    tagline: "Triage by Complexity",
    philosophy:
      "Not every change needs a Figma round-trip. Route features at intake based on complexity. Simple = code fast. Complex = Option A.",
    pros: [
      "Fast for the 70% of work that's iterative",
      "Designer focus is protected for high-stakes work",
      "Figma stays the source of truth for complex features",
      "Same CEO approval gate regardless of path",
      "Scales naturally as product matures",
      "Prod read access makes code matching much tighter",
    ],
    cons: [
      "Requires a clear, enforced triage definition",
      "PM must make the triage call correctly",
      "Risk of under-triaging (skipping Figma when you shouldn't)",
      "Two different processes to train the team on",
      "Requires discipline to keep Figma in sync on Simple path features",
      "COMPONENTS.md must be kept current",
    ],
    bestFor:
      "Existing products in active development where most work is iteration, not net-new features. Best introduced after you've run Option A a few times.",
    paths: [
      {
        id: "c-triage",
        label: "Triage",
        stages: [optionCTriageStage],
      },
      {
        id: "c-simple",
        label: "Simple Path",
        stages: optionCSimpleStages,
      },
      {
        id: "c-complex",
        label: "Complex Path",
        stages: [optionCComplexNote],
      },
    ],
  },
];

// ─── SETUP REQUIREMENTS ───────────────────────────────────────────────────────

export interface SetupItem {
  id: string;
  category: string;
  label: string;
  description: string;
  howTo: string;
  steps?: string[];
  codeBlock?: { lang: string; code: string };
  priority: "must-have" | "nice-to-have";
  requiresCTO: boolean;
}

export const setupItems: SetupItem[] = [
  {
    id: "prod-git-read",
    category: "Git Access",
    label: "Read access to production repo",
    description:
      "Claude needs to read your production codebase to match architecture, reuse components, and run QA diffs. Read-only is sufficient.",
    howTo:
      "Ask your CTO for a read-only deploy key (SSH) or a GitHub personal access token scoped to repo:read on the production repo.",
    priority: "must-have",
    requiresCTO: true,
  },
  {
    id: "sandbox-repo",
    category: "Git Access",
    label: "Sandbox repo — fork of production, auto-synced",
    description:
      "Fork the production repo once. This gives you a full copy that stays in sync with prod. Each feature gets its own branch off that fork — no separate repo to maintain, and the fork can be kept current automatically via GitHub Actions.",
    howTo:
      "Fork the prod repo on GitHub (e.g. acme-sandbox). Connect it to Vercel. Add the GitHub Action below to auto-sync the fork's main branch with prod every weekday morning — so you're always branching from something current.",
    steps: [
      "Fork prod repo on GitHub → name it [product]-sandbox",
      "Connect the fork to a Vercel project (New Project → import fork)",
      "Add the sync GitHub Action below to .github/workflows/sync-fork.yml",
      "For each new feature: pull latest fork main → create feature/<ticket>-<desc> branch",
      "Use sparse checkout per feature: paste PRD + git ls-tree output into Claude → Claude identifies the relevant paths → run its output (see 'PRD as context' in the self-setup list below)",
      "Work and deploy. At handoff, the branch diff shows only what changed.",
    ],
    requiresCTO: true,
    codeBlock: {
      lang: "yaml",
      code: `# .github/workflows/sync-fork.yml
# Keeps sandbox fork in sync with prod main automatically

name: Sync fork with upstream

on:
  schedule:
    - cron: '0 9 * * 1-5'   # weekdays at 9am
  workflow_dispatch:           # also triggerable manually

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: \${{ secrets.GITHUB_TOKEN }}

      - name: Add upstream + sync
        run: |
          git remote add upstream https://github.com/YOUR_ORG/YOUR_PROD_REPO.git
          git fetch upstream
          git checkout main
          git merge upstream/main --no-edit
          git push origin main

---
# Sparse checkout — run once per feature branch to keep working tree light
# Only materializes the folders you specify; everything else stays in git but off disk

git clone --filter=blob:none --sparse git@github.com:YOUR_ORG/YOUR_SANDBOX.git
cd YOUR_SANDBOX
git sparse-checkout set src/components src/pages/[feature] src/styles src/types
git checkout feature/LIN-42-onboarding-redesign`,
    },
    priority: "must-have",
  },
  {
    id: "branch-strategy",
    category: "Git Access",
    label: "Agreed branching convention",
    description:
      "A consistent naming pattern for feature branches so PRs and handoff packages are easy to track.",
    howTo:
      "Agree on: feature/<ticket-id>-<short-description>. Example: feature/LIN-42-onboarding-redesign. Apply in both the sandbox and production repos.",
    priority: "must-have",
    requiresCTO: true,
  },
  {
    id: "tech-stack-doc",
    category: "Codebase",
    label: "Tech stack details",
    description:
      "Claude needs your exact stack to generate matching code — framework version, CSS approach, state management, TypeScript config. Without this, generated code may not match your codebase.",
    howTo:
      "Ask your CTO for: Framework + version (e.g. Next.js 15 App Router), CSS approach (Tailwind version + any component library like shadcn/Radix), state management library, and the tsconfig.json + ESLint + Prettier config files. Drop these into the sandbox repo root.",
    priority: "must-have",
    requiresCTO: true,
  },
  {
    id: "prd-context",
    category: "Codebase",
    label: "PRD as context for Claude — no folder map needed",
    description:
      "Instead of asking your CTO to maintain a folder map, give Claude your PRD and the repo's folder tree. Claude brainstorms which paths are relevant to the feature and generates the sparse checkout command for you — zero CTO overhead.",
    howTo:
      "Before starting a feature: run git ls-tree to get the folder structure (no files downloaded), then paste the PRD + folder tree into Claude and ask it to identify the relevant paths. Claude outputs the exact sparse-checkout command to run.",
    steps: [
      "Sparse-clone the sandbox (no files yet): git clone --filter=blob:none --sparse git@github.com:YOUR_ORG/YOUR_SANDBOX.git",
      "Get the folder tree without downloading anything: git ls-tree -r HEAD --name-only src/ | head -80",
      "Open Claude Code and paste: the feature PRD + the ls-tree output",
      "Ask Claude: 'Based on this feature brief and folder structure, which paths should I sparse-checkout? Output the exact git sparse-checkout set command.'",
      "Run Claude's output — working tree now contains only relevant files",
      "Proceed with code generation on your feature branch",
    ],
    codeBlock: {
      lang: "shell",
      code: `# Step 1 — sparse clone (empty working tree, full git index)
git clone --filter=blob:none --sparse git@github.com:YOUR_ORG/YOUR_SANDBOX.git
cd YOUR_SANDBOX

# Step 2 — get folder structure without downloading files
git ls-tree -r HEAD --name-only src/ | head -80

# Step 3 — paste PRD + above output into Claude and ask:
# "Which of these paths are relevant to this feature? Give me the sparse-checkout command."

# Step 4 — run Claude's output, e.g.:
git sparse-checkout set src/features/onboarding src/components/forms src/components/ui src/types/user src/styles`,
    },
    priority: "must-have",
    requiresCTO: false,
  },
  {
    id: "figma-access",
    category: "Figma",
    label: "Figma MCP connected + write access to design file",
    description:
      "Claude needs write access to push wireframes into Figma and read access to pull approved designs.",
    howTo:
      "Run the command below in your terminal to connect the Figma MCP server in Claude Code. Then ensure your Figma account has Editor access to the project design file.",
    codeBlock: {
      lang: "shell",
      code: `claude mcp add --scope user --transport http figma-remote https://mcp.figma.com/mcp`,
    },
    priority: "must-have",
    requiresCTO: false,
  },
  {
    id: "components-md",
    category: "Codebase",
    label: "COMPONENTS.md — Figma-to-code component map",
    description:
      "A file that maps your Figma component names to their code file paths. This is what makes Claude reuse existing components instead of generating duplicates.",
    howTo:
      "Create COMPONENTS.md in the sandbox repo root. You can start it yourself with the components you know from Figma, then ask your CTO or a dev to fill in the code paths. Format: | Figma Name | Code Path | Props |",
    codeBlock: {
      lang: "markdown",
      code: `# COMPONENTS.md

| Figma Name       | Code Path                          | Key Props                        |
|------------------|------------------------------------|----------------------------------|
| Button/Primary   | src/components/ui/Button.tsx       | variant, size, onClick, disabled |
| Input/Text       | src/components/ui/Input.tsx        | label, placeholder, error        |
| Modal            | src/components/ui/Modal.tsx        | isOpen, onClose, title           |
| Card             | src/components/ui/Card.tsx         | padding, shadow, children        |
| Nav/TopBar       | src/components/layout/TopBar.tsx   | user, onMenuClick                |`,
    },
    priority: "must-have",
    requiresCTO: false,
  },
  {
    id: "vercel-team",
    category: "Vercel",
    label: "Vercel project connected to sandbox repo",
    description:
      "Vercel needs to be linked to your sandbox GitHub repo so every branch push creates a preview URL automatically.",
    howTo:
      "Go to vercel.com → New Project → Import the sandbox GitHub repo. Enable Preview Deployments. Share the Vercel team access with anyone who needs to view prototypes.",
    priority: "must-have",
    requiresCTO: false,
  },
  {
    id: "playwright-mcp",
    category: "QA",
    label: "Playwright MCP connected",
    description:
      "Required for the QA diff step — Claude uses Playwright to screenshot both Vercel and production URLs for comparison.",
    howTo:
      "Run the command below in your terminal.",
    codeBlock: {
      lang: "shell",
      code: `claude mcp add --scope user playwright npx @playwright/mcp@latest`,
    },
    priority: "must-have",
    requiresCTO: false,
  },
  {
    id: "code-connect",
    category: "Figma",
    label: "Code Connect (optional upgrade)",
    description:
      "Automatically maps Figma components to your codebase in MCP responses — more precise than COMPONENTS.md. Requires Figma Organization plan. Skip for now; COMPONENTS.md covers 80% of the benefit for free.",
    howTo:
      "If you upgrade to Figma Organization: run npx @figma/code-connect in your codebase and annotate components. Discuss the plan cost with your CTO before considering this.",
    priority: "nice-to-have",
    requiresCTO: true,
  },
];

// ─── TRIAGE QUESTIONS ─────────────────────────────────────────────────────────

export interface TriageQuestion {
  id: string;
  question: string;
  ifYes: "complex";
}

export const triageQuestions: TriageQuestion[] = [
  {
    id: "t1",
    question: "Does this introduce a UI pattern that doesn't exist in the codebase?",
    ifYes: "complex",
  },
  {
    id: "t2",
    question: "Will this be visible to new users on their first impression of the product?",
    ifYes: "complex",
  },
  {
    id: "t3",
    question: "Does the designer need to make a creative decision (not just approve)?",
    ifYes: "complex",
  },
  {
    id: "t4",
    question: "Will this require more than 2 component files to be changed?",
    ifYes: "complex",
  },
  {
    id: "t5",
    question: "Is this for a new page, section, or major layout change?",
    ifYes: "complex",
  },
  {
    id: "t6",
    question: "Does the CEO or a stakeholder care about the visual design specifically?",
    ifYes: "complex",
  },
];

export const simpleExamples = [
  "Copy / text changes",
  "Button color or variant swap",
  "Show/hide an existing component",
  "Add a form field to an existing form",
  "Icon swap",
  "Minor spacing or padding adjustment",
  "Error or empty state update",
  "Tooltip or label text update",
];

export const complexExamples = [
  "New page or major section",
  "New component that doesn't exist yet",
  "Navigation or layout restructure",
  "Onboarding or flow redesign",
  "Any feature with custom animation",
  "First time a UI pattern is established",
  "Anything customer-facing on first impression",
];
