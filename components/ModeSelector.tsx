"use client";

import { cn } from "@/lib/utils";

import { modes } from "@/lib/modes";

interface ModeSelectorProps {
  selected: string;
  onSelect: (mode: string) => void;
}

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => (
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
          <span className="text-sm">{mode.icon}</span>
          <span className="font-medium">{mode.label}</span>
          <span className="absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-1 text-[10px] text-muted-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 border border-border">
            {mode.desc}
          </span>
        </button>
      ))}
    </div>
  );
}
