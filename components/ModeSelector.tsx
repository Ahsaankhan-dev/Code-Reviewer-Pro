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
  { id: "full_review", label: "Full Review", prefix: null, icon: Search, desc: "Complete senior-level review" },
  { id: "quick_review", label: "Quick", prefix: "QUICK:", icon: Zap, desc: "Critical issues + summary" },
  { id: "security_audit", label: "Security", prefix: "SECURITY:", icon: Shield, desc: "OWASP Top 10 focused" },
  { id: "performance", label: "Performance", prefix: "PERF:", icon: Rocket, desc: "Speed & memory deep dive" },
  { id: "animation_audit", label: "Animation", prefix: "ANIM:", icon: Clapperboard, desc: "GSAP / Three.js / Framer" },
  { id: "junior_mode", label: "Junior", prefix: "JUNIOR:", icon: BookOpen, desc: "Beginner-friendly" },
  { id: "senior_mode", label: "Senior", prefix: "SENIOR:", icon: BriefcaseBusiness, desc: "Architecture deep dive" },
  { id: "diff_review", label: "Diff", prefix: "DIFF:", icon: FileText, desc: "Review changed lines only" },
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
              "group relative flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-200",
              selected === mode.id
                ? "border-glow bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{mode.label}</span>

            <span className="absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {mode.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}