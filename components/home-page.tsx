"use client";

import { useState } from "react";

import { CodeInput } from "@/components/CodeInput";
import { ExpertiseBadges } from "@/components/ExpertiseBadges";
import { ModeSelector } from "@/components/ModeSelector";
import { ReviewDisplay } from "@/components/ReviewDisplay";
import type { ReviewData } from "@/lib/types";
import { sampleReview } from "@/lib/sampleReview";
import { toast } from "@/hooks/use-toast";

export function HomePage() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("full_review");
  const [review, setReview] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async () => {
  if (!code.trim()) return;

  setIsLoading(true);
  setReview(null);

  try {
    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, mode }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Review failed");
    }

    setReview(data.review);
  } catch (error) {
    setReview(null);

    toast({
      title: "Review failed",
      description:
        error instanceof Error ? error.message : "Something went wrong.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-12">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs text-primary">Next.js + Claude Ready</span>
          </div>

          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-gradient">Code Reviewer</span>{" "}
            <span className="text-foreground">Pro</span>
          </h1>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            Senior-level AI code review with deep expertise in animations, 3D, performance, and modern frameworks.
          </p>

          <div className="mt-6">
            <ExpertiseBadges />
          </div>
        </header>

        <section className="mb-6">
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Review Mode
          </label>
          <ModeSelector selected={mode} onSelect={setMode} />
        </section>

        <section className="mb-8">
          <CodeInput value={code} onChange={setCode} onSubmit={handleSubmit} isLoading={isLoading} />
        </section>

        {isLoading && (
          <div className="mb-8 flex items-center justify-center gap-3 py-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="font-mono text-sm text-primary">Analyzing code with Claude...</span>
          </div>
        )}

        {review && !isLoading && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Review Results</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <ReviewDisplay review={review} />
          </section>
        )}

        <footer className="mt-16 border-t border-border pt-6 text-center">
          <p className="font-mono text-xs text-muted-foreground/50">
            Code Reviewer Pro — Next.js App Router + Anthropic Messages API
          </p>
        </footer>
      </div>
    </div>
  );
}
