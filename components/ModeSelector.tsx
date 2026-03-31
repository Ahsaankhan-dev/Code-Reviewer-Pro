import {
  BookOpen,
  Clapperboard,
  FileText,
  Rocket,
  Search,
  Shield,
  BriefcaseBusiness,
  Zap,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  {
    id: "full_review",
    label: "Full Review",
    shortLabel: "Review",
    prefix: null,
    icon: Search,
    desc: "Complete senior-level review",
    mobileDesc: "Deep scan",
    hoverCard: "hover:border-cyan-400/30 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.14)]",
    activeCard: "border-cyan-400/35 bg-cyan-400/8 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.14)]",
    hoverIcon: "group-hover:border-cyan-400/25 group-hover:bg-cyan-400/8 group-hover:text-cyan-300",
    activeIcon: "border-cyan-400/40 bg-cyan-400/14 text-cyan-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_62%)]",
    check: "border-cyan-400/35 bg-cyan-400/12 text-cyan-300",
  },
  {
    id: "quick_review",
    label: "Quick",
    shortLabel: "Quick",
    prefix: "QUICK:",
    icon: Zap,
    desc: "Critical issues + summary",
    mobileDesc: "Fast pass",
    hoverCard: "hover:border-yellow-400/30 hover:text-yellow-300 hover:shadow-[0_0_18px_rgba(250,204,21,0.14)]",
    activeCard: "border-yellow-400/35 bg-yellow-400/8 text-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.14)]",
    hoverIcon: "group-hover:border-yellow-400/25 group-hover:bg-yellow-400/8 group-hover:text-yellow-300",
    activeIcon: "border-yellow-400/40 bg-yellow-400/14 text-yellow-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.13),transparent_62%)]",
    check: "border-yellow-400/35 bg-yellow-400/12 text-yellow-300",
  },
  {
    id: "security_audit",
    label: "Security",
    shortLabel: "Secure",
    prefix: "SECURITY:",
    icon: Shield,
    desc: "OWASP Top 10 focused",
    mobileDesc: "OWASP",
    hoverCard: "hover:border-green-400/30 hover:text-green-300 hover:shadow-[0_0_18px_rgba(74,222,128,0.14)]",
    activeCard: "border-green-400/35 bg-green-400/8 text-green-300 shadow-[0_0_18px_rgba(74,222,128,0.14)]",
    hoverIcon: "group-hover:border-green-400/25 group-hover:bg-green-400/8 group-hover:text-green-300",
    activeIcon: "border-green-400/40 bg-green-400/14 text-green-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.12),transparent_62%)]",
    check: "border-green-400/35 bg-green-400/12 text-green-300",
  },
  {
    id: "performance",
    label: "Performance",
    shortLabel: "Perf",
    prefix: "PERF:",
    icon: Rocket,
    desc: "Speed & memory deep dive",
    mobileDesc: "Speed",
    hoverCard: "hover:border-orange-400/30 hover:text-orange-300 hover:shadow-[0_0_18px_rgba(251,146,60,0.14)]",
    activeCard: "border-orange-400/35 bg-orange-400/8 text-orange-300 shadow-[0_0_18px_rgba(251,146,60,0.14)]",
    hoverIcon: "group-hover:border-orange-400/25 group-hover:bg-orange-400/8 group-hover:text-orange-300",
    activeIcon: "border-orange-400/40 bg-orange-400/14 text-orange-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.12),transparent_62%)]",
    check: "border-orange-400/35 bg-orange-400/12 text-orange-300",
  },
  {
    id: "animation_audit",
    label: "Animation",
    shortLabel: "Motion",
    prefix: "ANIM:",
    icon: Clapperboard,
    desc: "GSAP / Three.js / Framer",
    mobileDesc: "GSAP",
    hoverCard: "hover:border-pink-400/30 hover:text-pink-300 hover:shadow-[0_0_18px_rgba(244,114,182,0.14)]",
    activeCard: "border-pink-400/35 bg-pink-400/8 text-pink-300 shadow-[0_0_18px_rgba(244,114,182,0.14)]",
    hoverIcon: "group-hover:border-pink-400/25 group-hover:bg-pink-400/8 group-hover:text-pink-300",
    activeIcon: "border-pink-400/40 bg-pink-400/14 text-pink-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.12),transparent_62%)]",
    check: "border-pink-400/35 bg-pink-400/12 text-pink-300",
  },
  {
    id: "junior_mode",
    label: "Junior",
    shortLabel: "Junior",
    prefix: "JUNIOR:",
    icon: BookOpen,
    desc: "Beginner-friendly",
    mobileDesc: "Easy",
    hoverCard: "hover:border-blue-400/30 hover:text-blue-300 hover:shadow-[0_0_18px_rgba(96,165,250,0.14)]",
    activeCard: "border-blue-400/35 bg-blue-400/8 text-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.14)]",
    hoverIcon: "group-hover:border-blue-400/25 group-hover:bg-blue-400/8 group-hover:text-blue-300",
    activeIcon: "border-blue-400/40 bg-blue-400/14 text-blue-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_62%)]",
    check: "border-blue-400/35 bg-blue-400/12 text-blue-300",
  },
  {
    id: "senior_mode",
    label: "Senior",
    shortLabel: "Senior",
    prefix: "SENIOR:",
    icon: BriefcaseBusiness,
    desc: "Architecture deep dive",
    mobileDesc: "Arch",
    hoverCard: "hover:border-violet-400/30 hover:text-violet-300 hover:shadow-[0_0_18px_rgba(167,139,250,0.14)]",
    activeCard: "border-violet-400/35 bg-violet-400/8 text-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.14)]",
    hoverIcon: "group-hover:border-violet-400/25 group-hover:bg-violet-400/8 group-hover:text-violet-300",
    activeIcon: "border-violet-400/40 bg-violet-400/14 text-violet-300",
    glow: "bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.12),transparent_62%)]",
    check: "border-violet-400/35 bg-violet-400/12 text-violet-300",
  },
  {
    id: "diff_review",
    label: "Diff",
    shortLabel: "Diff",
    prefix: "DIFF:",
    icon: FileText,
    desc: "Review changed lines only",
    mobileDesc: "Changes",
    hoverCard: "hover:border-slate-300/25 hover:text-slate-100 hover:shadow-[0_0_16px_rgba(226,232,240,0.10)]",
    activeCard: "border-slate-300/28 bg-slate-300/8 text-slate-100 shadow-[0_0_16px_rgba(226,232,240,0.10)]",
    hoverIcon: "group-hover:border-slate-300/25 group-hover:bg-slate-300/8 group-hover:text-slate-100",
    activeIcon: "border-slate-300/35 bg-slate-300/12 text-slate-100",
    glow: "bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.10),transparent_62%)]",
    check: "border-slate-300/30 bg-slate-300/12 text-slate-100",
  },
];

interface ModeSelectorProps {
  selected: string;
  onSelect: (mode: string) => void;
}

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:hidden">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = selected === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              aria-pressed={isActive}
              className={cn(
                "group relative flex min-h-[76px] flex-col items-center justify-center gap-1 overflow-hidden rounded-[18px] border px-1 py-2 text-center transition-all duration-200",
                isActive
                  ? mode.activeCard
                  : cn("border-border bg-card text-muted-foreground", mode.hoverCard),
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-200",
                  isActive ? mode.activeIcon : mode.hoverIcon,
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>

              <div className="space-y-0.5">
                <div className="font-mono text-[9px] font-semibold leading-none">
                  {mode.shortLabel}
                </div>
                <div className="font-mono text-[8px] leading-none text-muted-foreground/75 group-hover:text-current/80">
                  {mode.mobileDesc}
                </div>
              </div>

              {isActive && (
                <>
                  <div className={cn("absolute inset-0", mode.glow)} />
                  <div className={cn("absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border", mode.check)}>
                    <Check className="h-2 w-2" />
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden sm:grid sm:grid-cols-4 sm:gap-2 md:grid-cols-4 md:gap-2 lg:flex lg:flex-wrap lg:gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = selected === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              className={cn(
                "group relative overflow-hidden border font-mono text-xs transition-all duration-200 sm:flex sm:min-h-[80px] sm:flex-col sm:items-center sm:justify-center sm:gap-1 sm:rounded-[16px] sm:px-2 sm:py-2 sm:text-center lg:min-h-0 lg:flex-row lg:items-center lg:justify-start lg:rounded-lg lg:px-3 lg:py-2",
                isActive
                  ? mode.activeCard
                  : cn("border-border bg-card text-muted-foreground", mode.hoverCard),
              )}
            >
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-200 sm:h-8 sm:w-8 lg:h-auto lg:w-auto lg:border-0 lg:bg-transparent",
                  isActive ? mode.activeIcon : mode.hoverIcon,
                )}
              >
                <Icon className="h-3.5 w-3.5 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_currentColor]" />
              </div>

              <div className="sm:space-y-0.5 sm:text-center lg:text-left">
                <div className="font-semibold sm:text-[9px] sm:leading-none lg:font-medium lg:text-xs">
                  <span className="lg:hidden">{mode.shortLabel}</span>
                  <span className="hidden lg:inline">{mode.label}</span>
                </div>
                <div className="sm:block sm:text-[8px] sm:leading-none sm:text-muted-foreground/70 lg:hidden">
                  {mode.mobileDesc}
                </div>
              </div>

              <span className="pointer-events-none absolute -bottom-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
                {mode.desc}
              </span>

              {/* Active glow — sm/md only */}
              {isActive && (
                <div className={cn("pointer-events-none absolute inset-0 lg:hidden", mode.glow)} />
              )}

              {/* Active check badge — sm/md only */}
              {isActive && (
                <div className={cn("absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border lg:hidden", mode.check)}>
                  <Check className="h-2 w-2" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}