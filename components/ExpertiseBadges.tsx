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
  {
    label: "GSAP",
    icon: Sparkles,
    hoverClass:
      "hover:text-green-400 hover:border-green-400/30 hover:shadow-[0_0_18px_rgba(74,222,128,0.22)]",
  },
  {
    label: "Three.js",
    icon: Globe,
    hoverClass:
      "hover:text-sky-400 hover:border-sky-400/30 hover:shadow-[0_0_18px_rgba(56,189,248,0.22)]",
  },
  {
    label: "Framer Motion",
    icon: Clapperboard,
    hoverClass:
      "hover:text-pink-400 hover:border-pink-400/30 hover:shadow-[0_0_18px_rgba(244,114,182,0.22)]",
  },
  {
    label: "Toast",
    icon: Bell,
    hoverClass:
      "hover:text-amber-400 hover:border-amber-400/30 hover:shadow-[0_0_18px_rgba(251,191,36,0.22)]",
  },
  {
    label: "React",
    icon: Atom,
    hoverClass:
      "hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-[0_0_18px_rgba(34,211,238,0.22)]",
  },
  {
    label: "TypeScript",
    icon: Code2,
    hoverClass:
      "hover:text-blue-400 hover:border-blue-400/30 hover:shadow-[0_0_18px_rgba(96,165,250,0.22)]",
  },
  {
    label: "Next.js",
    icon: Triangle,
    hoverClass:
      "hover:text-slate-100 hover:border-slate-200/20 hover:shadow-[0_0_18px_rgba(255,255,255,0.12)]",
  },
  {
    label: "Security",
    icon: Shield,
    hoverClass:
      "hover:text-yellow-400 hover:border-yellow-400/30 hover:shadow-[0_0_18px_rgba(250,204,21,0.22)]",
  },
];

export function ExpertiseBadges() {
  return (
    <div className="mx-auto flex max-w-md flex-wrap justify-center gap-2 sm:max-w-none sm:gap-2.5">
      {expertise.map((item) => {
        const Icon = item.icon;

        return (
          <span
            key={item.label}
            className={`inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-[10px] text-muted-foreground transition-all duration-200 sm:px-3 sm:py-1 sm:text-xs ${item.hoverClass}`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 transition-all duration-200" />
            <span className="whitespace-nowrap font-mono">{item.label}</span>
          </span>
        );
      })}
    </div>
  );
}
