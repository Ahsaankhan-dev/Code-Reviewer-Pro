import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Lightbulb,
  Star,
  TriangleAlert,
} from "lucide-react";

import { Scorecard } from "./Scorecard";

export interface ReviewData {
  overview: { description: string; rating: number; verdict: string };
  critical: Array<{ title: string; where: string; why: string; fix: string }>;
  warnings: Array<{ title: string; where: string; why: string; fix: string }>;
  suggestions: string[];
  positives: string[];
  scorecard: Record<string, { score: number; comment: string }>;
}

interface ReviewDisplayProps {
  review: ReviewData;
}

function IssueCard({
  issue,
  type,
}: {
  issue: { title: string; where: string; why: string; fix: string };
  type: "critical" | "warning";
}) {
  const colors = type === "critical" ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5";
  const Icon = type === "critical" ? TriangleAlert : AlertCircle;

  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${colors}`}>
      <div className="mb-2 flex items-start gap-2">
        <Icon className={type === "critical" ? "mt-0.5 h-4 w-4 shrink-0 text-destructive" : "mt-0.5 h-4 w-4 shrink-0 text-warning"} />
        <h4 className="font-display text-sm font-semibold text-foreground sm:text-base">{issue.title}</h4>
      </div>

      <div className="space-y-2 text-sm sm:ml-6">
        <p className="leading-6 text-muted-foreground">
          <span className="font-mono text-xs text-accent">WHERE:</span> {issue.where}
        </p>

        <p className="leading-6 text-muted-foreground">
          <span className="font-mono text-xs text-warning">WHY:</span> {issue.why}
        </p>

        <div className="mt-3 rounded-lg border border-border bg-background p-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-success">Fix:</p>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 text-foreground/80 sm:whitespace-pre-wrap">
            <code>{issue.fix}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={i < rating ? "h-5 w-5 fill-current text-warning" : "h-5 w-5 text-muted-foreground/20"}
        />
      ))}
    </div>
  );
}

export function ReviewDisplay({ review }: ReviewDisplayProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 shrink-0 text-primary" />
          <h3 className="font-display text-lg font-bold text-gradient">Overview</h3>
        </div>

        <p className="mb-3 text-sm leading-6 text-muted-foreground">{review.overview.description}</p>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <StarRating rating={review.overview.rating} />
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            {review.overview.verdict}
          </span>
        </div>
      </div>

      {review.critical.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 shrink-0 text-destructive" />
            <h3 className="font-display text-lg font-bold text-destructive">Critical Issues ({review.critical.length})</h3>
          </div>

          <div className="space-y-3">
            {review.critical.map((issue, i) => (
              <IssueCard key={i} issue={issue} type="critical" />
            ))}
          </div>
        </div>
      )}

      {review.warnings.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0 text-warning" />
            <h3 className="font-display text-lg font-bold text-warning">Warnings ({review.warnings.length})</h3>
          </div>

          <div className="space-y-3">
            {review.warnings.map((issue, i) => (
              <IssueCard key={i} issue={issue} type="warning" />
            ))}
          </div>
        </div>
      )}

      {review.suggestions.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 shrink-0 text-accent" />
            <h3 className="font-display text-lg font-bold text-accent">Suggestions</h3>
          </div>

          <ul className="space-y-2">
            {review.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <span className="mt-0.5 shrink-0 text-accent">›</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {review.positives.length > 0 && (
        <div className="rounded-xl border border-success/20 bg-success/5 p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            <h3 className="font-display text-lg font-bold text-success">What&apos;s Done Well</h3>
          </div>

          <ul className="space-y-2">
            {review.positives.map((positive, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-6 text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{positive}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Scorecard scores={review.scorecard} />
    </div>
  );
}
