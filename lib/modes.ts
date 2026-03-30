export const modes = [
  { id: "full_review", label: "Full Review", prefix: null, icon: "🔍", desc: "Complete senior-level review" },
  { id: "quick_review", label: "Quick", prefix: "QUICK:", icon: "⚡", desc: "Critical issues + summary" },
  { id: "security_audit", label: "Security", prefix: "SECURITY:", icon: "🔒", desc: "OWASP Top 10 focused" },
  { id: "performance", label: "Performance", prefix: "PERF:", icon: "🚀", desc: "Speed & memory deep dive" },
  { id: "animation_audit", label: "Animation", prefix: "ANIM:", icon: "🎞️", desc: "GSAP / Three.js / Framer" },
  { id: "junior_mode", label: "Junior", prefix: "JUNIOR:", icon: "📚", desc: "Beginner-friendly" },
  { id: "senior_mode", label: "Senior", prefix: "SENIOR:", icon: "🏗️", desc: "Architecture deep dive" },
  { id: "diff_review", label: "Diff", prefix: "DIFF:", icon: "📝", desc: "Review changed lines only" },
] as const;

export function getModePrefix(mode: string) {
  return modes.find((item) => item.id === mode)?.prefix ?? null;
}
