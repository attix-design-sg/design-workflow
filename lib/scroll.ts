"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easings, durations, scrollTriggerDefaults } from "./animations";

// Register plugin once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Check for reduced motion preference ──

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ── useScrollReveal ──
// Fades element from opacity 0 → 1 when it enters the viewport.
// No translate — content stays in natural position.

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    gsap.set(ref.current, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: scrollTriggerDefaults.start,
      toggleActions: scrollTriggerDefaults.toggleActions,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          duration: durations.fadeIn,
          ease: easings.fadeIn,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return ref;
}

// ── useStaggerReveal ──
// Fades in children of a container one by one.

export function useStaggerReveal<T extends HTMLElement>(
  childSelector: string = ":scope > *"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const children = ref.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: scrollTriggerDefaults.start,
      toggleActions: scrollTriggerDefaults.toggleActions,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          duration: durations.fadeIn,
          ease: easings.fadeIn,
          stagger: durations.stagger,
        });
      },
    });

    return () => trigger.kill();
  }, [childSelector]);

  return ref;
}

// ── usePinSection ──
// Pins an element in the viewport for a specified scroll distance.

export function usePinSection<T extends HTMLElement>(scrollDistance: string = "+=100%") {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: scrollDistance,
      pin: true,
      pinSpacing: true,
    });

    return () => trigger.kill();
  }, [scrollDistance]);

  return ref;
}

// ── useScrollProgress ──
// Returns a 0–1 value representing page scroll progress.

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// ── useActiveSection ──
// Returns the ID of the section currently in view.

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeId;
}

// ── useTimelineBuild ──
// Animates children along a timeline tied to scroll position.
// Used for the workflow map and cost comparison timelines.

export function useTimelineBuild<T extends HTMLElement>(
  childSelector: string = ":scope > *"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const children = ref.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.5,
      },
    });

    children.forEach((child, i) => {
      tl.to(
        child,
        {
          opacity: 1,
          duration: durations.build,
          ease: easings.build,
        },
        i * 0.15
      );
    });

    return () => {
      tl.kill();
    };
  }, [childSelector]);

  return ref;
}
