"use client";

const expertise = [
  { label: "GSAP", icon: "✨" },
  { label: "Three.js", icon: "🌐" },
  { label: "Framer Motion", icon: "🎞️" },
  { label: "Toast", icon: "🔔" },
  { label: "React", icon: "⚛️" },
  { label: "TypeScript", icon: "📘" },
  { label: "Next.js", icon: "▲" },
  { label: "Security", icon: "🔒" },
];

export function ExpertiseBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {expertise.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <span>{item.icon}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}
