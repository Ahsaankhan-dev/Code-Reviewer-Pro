"use client";

import { useState } from "react";

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CodeInput({ value, onChange, onSubmit, isLoading }: CodeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const lineCount = value.split("\n").length;
  const lineLabel = `${lineCount} ${lineCount === 1 ? "line" : "lines"}`;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isFocused ? "border-glow" : "border-border"
      }`}
    >
      <div className="border-b border-border px-3 py-3 sm:px-4 sm:py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex shrink-0 gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
            </div>
            <span className="truncate font-mono text-[11px] text-muted-foreground sm:ml-3 sm:text-xs">
              paste-your-code.tsx
            </span>
          </div>

          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
            {lineLabel}
          </span>
        </div>

        <div className="mt-3 sm:mt-2 sm:flex sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="h-11 w-full touch-manipulation rounded-xl bg-primary px-4 font-mono text-xs font-semibold text-primary-foreground transition-all hover:glow-primary disabled:cursor-not-allowed disabled:opacity-40 sm:h-auto sm:w-auto sm:rounded-lg sm:py-2"
          >
            {isLoading ? "Reviewing..." : "Review →"}
          </button>
        </div>
      </div>

      <div className="relative flex min-w-0">
        <div className="hidden select-none border-r border-border px-3 py-4 text-right font-mono text-xs leading-6 text-muted-foreground/40 sm:block">
          {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={`// Paste your code here...
// Supports React, Next.js, GSAP,
// Three.js, Framer Motion, and more

export default function App() {
  return <div>Hello World</div>;
}`}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          className="min-h-[360px] w-full flex-1 resize-none bg-transparent p-4 font-mono text-base leading-7 text-foreground placeholder:text-muted-foreground/25 focus:outline-none sm:min-h-[400px] sm:p-4 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
