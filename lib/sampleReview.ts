import type { ReviewData } from "@/components/ReviewDisplay";

export const sampleReview: ReviewData = {
  overview: {
    description:
      "A React component using GSAP ScrollTrigger for scroll-based animations. The code sets up a timeline with pinned sections and parallax effects.",
    rating: 3,
    verdict: "Solid foundation, but GSAP cleanup is missing — will cause memory leaks",
  },
  critical: [
    {
      title: "Missing gsap.context() cleanup",
      where: "useEffect hook, line 12",
      why: "Without ctx.revert(), animations re-run on every re-render causing memory leaks and visual glitches in React strict mode.",
      fix: `useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo('.hero', { opacity: 0 }, { opacity: 1 });
  }, containerRef);
  return () => ctx.revert(); // ← REQUIRED
}, []);`,
    },
    {
      title: "ScrollTrigger not killed on unmount",
      where: "useEffect hook, line 18",
      why: "Orphaned ScrollTrigger instances accumulate on route changes, causing scroll jank and incorrect trigger positions.",
      fix: `// ctx.revert() automatically kills ScrollTriggers
// when using gsap.context()`,
    },
  ],
  warnings: [
    {
      title: "Animating layout-triggering properties",
      where: "gsap.to('.card', { width: '100%' }), line 25",
      why: "Animating 'width' causes layout reflow every frame. Use transform: scaleX instead for 60fps performance.",
      fix: `gsap.to('.card', { scaleX: 1, transformOrigin: 'left center' });`,
    },
  ],
  suggestions: [
    "Use timeline defaults to avoid repeating ease and duration on every tween",
    "Add will-change: transform to animated elements in CSS",
    "Consider using gsap.matchMedia() for responsive animations instead of manual breakpoint checks",
  ],
  positives: [
    "Good use of ScrollTrigger scrub for smooth scroll-linked animation",
    "Timeline structure is well-organized with clear sequencing",
    "Plugin registration is done correctly at the top level",
  ],
  scorecard: {
    Correctness: { score: 5, comment: "Works but will break on re-render" },
    Security: { score: 9, comment: "No security concerns in animation code" },
    Performance: { score: 4, comment: "Layout-triggering animations + missing cleanup" },
    Readability: { score: 7, comment: "Clean structure, could use more comments" },
    Maintainability: { score: 6, comment: "Hardcoded selectors, no scoped refs" },
    "Best Practices": { score: 4, comment: "Missing React lifecycle patterns for GSAP" },
  },
};
