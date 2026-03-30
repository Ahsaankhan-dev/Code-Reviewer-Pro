import {
  Atom,
  Bell,
  Clapperboard,
  Code2,
  Globe,
  Shield,
  Sparkles,
  Triangle,
} from "lucide-react";

const expertise = [
  { label: "GSAP", icon: Sparkles },
  { label: "Three.js", icon: Globe },
  { label: "Framer Motion", icon: Clapperboard },
  { label: "Toast", icon: Bell },
  { label: "React", icon: Atom },
  { label: "TypeScript", icon: Code2 },
  { label: "Next.js", icon: Triangle },
  { label: "Security", icon: Shield },
];

export function ExpertiseBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {expertise.map((item) => {
        const Icon = item.icon;

        return (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            <Icon className="h-3.5 w-3.5" />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}