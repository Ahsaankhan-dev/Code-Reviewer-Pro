"use client";

import { useEffect, useRef, useState } from "react";

import { CodeInput } from "@/components/CodeInput";
import { ExpertiseBadges } from "@/components/ExpertiseBadges";
import { ModeSelector } from "@/components/ModeSelector";
import { ReviewDisplay } from "@/components/ReviewDisplay";
import { toast } from "@/hooks/use-toast";
import { ReviewData } from "@/lib/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isHighDemandError(response: Response | null, data: unknown, error: unknown) {
  const apiError =
    data && typeof data === "object" && "error" in data && typeof data.error === "string"
      ? data.error
      : "";

  const message = error instanceof Error ? error.message : "";
  const combined = `${apiError} ${message}`;

  return response?.status === 503 || /503|UNAVAILABLE|high demand|try again later/i.test(combined);
}

export function HomePage() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("full_review");
  const [review, setReview] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Analyzing code with Claude...");

  const loadingRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    setReview(null);
    setRetryCount(0);
    setStatusMessage("Analyzing code with Claude...");

    try {
      let retryAttempt = 0;

      while (true) {
        let response: Response | null = null;
        let data: unknown = null;

        try {
          response = await fetch("/api/review", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, mode }),
          });

          data = await response.json().catch(() => null);

          if (!response.ok) {
            const apiError =
              data && typeof data === "object" && "error" in data && typeof data.error === "string"
                ? data.error
                : `Review failed with status ${response.status}`;

            throw new Error(apiError);
          }

          if (!isMountedRef.current) return;

          const nextReview =
            data && typeof data === "object" && "review" in data ? (data.review as ReviewData) : null;

          setReview(nextReview);
          setRetryCount(0);
          setStatusMessage("Review complete.");
          break;
        } catch (error) {
          if (!isHighDemandError(response, data, error)) {
            throw error;
          }

          retryAttempt += 1;

          if (!isMountedRef.current) return;

          setRetryCount(retryAttempt);
          setStatusMessage("Model is busy. Retrying automatically...");

          const delay = Math.min(2000 + retryAttempt * 1000, 8000);
          await sleep(delay);

          if (!isMountedRef.current) return;
        }
      }
    } catch (error) {
      if (!isMountedRef.current) return;

      setReview(null);

      toast({
        title: "Review failed",
        description: error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (review) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isLoading, review]);

  return (
    <main
      className="relative min-h-[100dvh] overflow-x-hidden overflow-y-auto bg-background touch-pan-y"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-6 pb-10 sm:px-6 sm:py-12 sm:pb-16">
        <header className="mb-8 text-center sm:mb-12">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 sm:px-4">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="truncate font-mono text-[11px] text-primary sm:text-xs">
              Available for work
            </span>
          </div>

          <h1 className="mb-3 text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-gradient">Code Reviewer</span>{" "}
            <span className="text-foreground">Pro</span>
          </h1>

          <p className="mx-auto max-w-xl px-2 text-sm leading-7 text-muted-foreground sm:px-0 sm:text-base sm:leading-7">
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
          <CodeInput
            value={code}
            onChange={setCode}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <div ref={loadingRef} className="mt-4 scroll-mt-4 sm:scroll-mt-6">
            {isLoading && (
              <div className="flex min-h-[72px] items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-5 text-center">
                <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <div className="space-y-1">
                  <div className="font-mono text-sm text-primary">{statusMessage}</div>
                  {retryCount > 0 && (
                    <div className="font-mono text-[11px] text-muted-foreground">
                      Retry attempt: {retryCount}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {review && !isLoading && (
          <section
            ref={resultsRef}
            className="scroll-mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:scroll-mt-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="shrink-0 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-widest">
                Review Results
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <ReviewDisplay review={review} />
          </section>
        )}

        <footer className="mt-14 border-t border-border pt-6 text-center sm:mt-16">
          <p className="font-mono text-[11px] text-muted-foreground/50 sm:text-xs">
            Code Reviewer Pro — Next.js App Router + Anthropic Messages API
          </p>
        </footer>
      </div>
    </main>
  );
}
