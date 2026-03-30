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

  return (
    <div
      className={`relative rounded-xl border transition-all duration-300 ${
        isFocused ? "border-glow" : "border-border"
      }`}
    >
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-warning/60" />
            <div className="h-3 w-3 rounded-full bg-success/60" />
          </div>
          <span className="ml-3 font-mono text-xs text-muted-foreground">paste-your-code.tsx</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground">{lineCount} lines</span>
          <button
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="rounded-lg bg-primary px-4 py-1.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:glow-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Reviewing..." : "Review →"}
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="relative flex">
        {/* Line numbers */}
        <div className="select-none border-r border-border px-3 py-4 text-right font-mono text-xs leading-6 text-muted-foreground/40">
          {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="// Paste your code here...
// Supports React, Next.js, GSAP, Three.js, Framer Motion, and more

export default function App() {
  return <div>Hello World</div>;
}"
          spellCheck={false}
          className="min-h-[400px] flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-6 text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
        />
      </div>
    </div>
  );
}
