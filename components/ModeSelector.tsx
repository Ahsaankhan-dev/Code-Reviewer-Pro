import {
  BookOpen,
  Clapperboard,
  FileText,
  Rocket,
  Search,
  Shield,
  BriefcaseBusiness,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  {
    id: "full_review",
    label: "Full Review",
    prefix: null,
    icon: Search,
    desc: "Complete senior-level review",
    hoverClass:
      "hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]",
  },
  {
    id: "quick_review",
    label: "Quick",
    prefix: "QUICK:",
    icon: Zap,
    desc: "Critical issues + summary",
    hoverClass:
      "hover:text-yellow-400 hover:border-yellow-400/30 hover:shadow-[0_0_18px_rgba(250,204,21,0.18)]",
  },
  {
    id: "security_audit",
    label: "Security",
    prefix: "SECURITY:",
    icon: Shield,
    desc: "OWASP Top 10 focused",
    hoverClass:
      "hover:text-green-400 hover:border-green-400/30 hover:shadow-[0_0_18px_rgba(74,222,128,0.18)]",
  },
  {
    id: "performance",
    label: "Performance",
    prefix: "PERF:",
    icon: Rocket,
    desc: "Speed & memory deep dive",
    hoverClass:
      "hover:text-orange-400 hover:border-orange-400/30 hover:shadow-[0_0_18px_rgba(251,146,60,0.18)]",
  },
  {
    id: "animation_audit",
    label: "Animation",
    prefix: "ANIM:",
    icon: Clapperboard,
    desc: "GSAP / Three.js / Framer",
    hoverClass:
      "hover:text-pink-400 hover:border-pink-400/30 hover:shadow-[0_0_18px_rgba(244,114,182,0.18)]",
  },
  {
    id: "junior_mode",
    label: "Junior",
    prefix: "JUNIOR:",
    icon: BookOpen,
    desc: "Beginner-friendly",
    hoverClass:
      "hover:text-blue-400 hover:border-blue-400/30 hover:shadow-[0_0_18px_rgba(96,165,250,0.18)]",
  },
  {
    id: "senior_mode",
    label: "Senior",
    prefix: "SENIOR:",
    icon: BriefcaseBusiness,
    desc: "Architecture deep dive",
    hoverClass:
      "hover:text-violet-400 hover:border-violet-400/30 hover:shadow-[0_0_18px_rgba(167,139,250,0.18)]",
  },
  {
    id: "diff_review",
    label: "Diff",
    prefix: "DIFF:",
    icon: FileText,
    desc: "Review changed lines only",
    hoverClass:
      "hover:text-slate-200 hover:border-slate-200/20 hover:shadow-[0_0_18px_rgba(226,232,240,0.12)]",
  },
];

interface ModeSelectorProps {
  selected: string;
  onSelect: (mode: string) => void;
}

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => {
        const Icon = mode.icon;

        return (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className={cn(
              "group relative flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-200",
              selected === mode.id
                ? "border-glow bg-primary/10 text-primary"
                : `border-border bg-card text-muted-foreground ${mode.hoverClass}`
            )}
          >
            <Icon className="h-4 w-4 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_currentColor]" />
            <span className="font-medium">{mode.label}</span>

            <span className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {mode.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}