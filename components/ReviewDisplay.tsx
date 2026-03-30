import {
  CheckCircle2,
  FileText,
  Lightbulb,
  Star,
  TriangleAlert,
  AlertCircle,
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
  const colors =
    type === "critical"
      ? "border-destructive/30 bg-destructive/5"
      : "border-warning/30 bg-warning/5";

  const Icon = type === "critical" ? TriangleAlert : AlertCircle;

  return (
    <div className={`rounded-lg border p-4 ${colors}`}>
      <div className="mb-2 flex items-start gap-2">
        <Icon
          className={
            type === "critical"
              ? "mt-0.5 h-4 w-4 text-destructive"
              : "mt-0.5 h-4 w-4 text-warning"
          }
        />
        <h4 className="font-display font-semibold text-foreground">
          {issue.title}
        </h4>
      </div>

      <div className="ml-6 space-y-2 text-sm">
        <p className="text-muted-foreground">
          <span className="font-mono text-xs text-accent">WHERE:</span> {issue.where}
        </p>

        <p className="text-muted-foreground">
          <span className="font-mono text-xs text-warning">WHY:</span> {issue.why}
        </p>

        <div className="mt-3 rounded-lg border border-border bg-background p-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-success">
            Fix:
          </p>
          <pre className="overflow-x-auto font-mono text-xs text-foreground/80">
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
          className={
            i < rating
              ? "h-5 w-5 fill-current text-warning"
              : "h-5 w-5 text-muted-foreground/20"
          }
        />
      ))}
    </div>
  );
}

export function ReviewDisplay({ review }: ReviewDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-bold text-gradient">Overview</h3>
        </div>

        <p className="mb-3 text-sm text-muted-foreground">
          {review.overview.description}
        </p>

        <div className="flex items-center gap-4">
          <StarRating rating={review.overview.rating} />
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            {review.overview.verdict}
          </span>
        </div>
      </div>

      {review.critical.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-destructive" />
            <h3 className="font-display text-lg font-bold text-destructive">
              Critical Issues ({review.critical.length})
            </h3>
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
            <AlertCircle className="h-5 w-5 text-warning" />
            <h3 className="font-display text-lg font-bold text-warning">
              Warnings ({review.warnings.length})
            </h3>
          </div>

          <div className="space-y-3">
            {review.warnings.map((issue, i) => (
              <IssueCard key={i} issue={issue} type="warning" />
            ))}
          </div>
        </div>
      )}

      {review.suggestions.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h3 className="font-display text-lg font-bold text-accent">
              Suggestions
            </h3>
          </div>

          <ul className="space-y-2">
            {review.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-accent">›</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {review.positives.length > 0 && (
        <div className="rounded-xl border border-success/20 bg-success/5 p-6">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h3 className="font-display text-lg font-bold text-success">
              What&apos;s Done Well
            </h3>
          </div>

          <ul className="space-y-2">
            {review.positives.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Scorecard scores={review.scorecard} />
    </div>
  );
}