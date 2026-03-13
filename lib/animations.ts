// ─────────────────────────────────────────────
// Animation configuration — shared easings, durations, and GSAP defaults
// ─────────────────────────────────────────────

export const easings = {
  /** Standard entrance — elements appearing in view */
  fadeIn: "power2.out",
  /** Workflow map connections drawing */
  draw: "power3.inOut",
  /** Timeline building progressively */
  build: "power2.inOut",
  /** Interactive state changes (tab switch, panel open) */
  interaction: "power2.out",
  /** Subtle hover/focus feedback */
  subtle: "power1.out",
} as const;

export const durations = {
  /** Standard fade-in on scroll entry */
  fadeIn: 0.6,
  /** Interactive element transitions (tabs, panels) */
  interaction: 0.2,
  /** Diagram/timeline build animations */
  build: 0.8,
  /** Stagger delay between children */
  stagger: 0.06,
  /** Workflow map connection draw */
  draw: 0.5,
} as const;

export const scrollTriggerDefaults = {
  /** How far into the viewport before triggering */
  start: "top 85%",
  /** Once triggered, stay visible */
  toggleActions: "play none none none",
} as const;
