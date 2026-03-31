import { BarChart3 } from "lucide-react";

interface ScorecardProps {
  scores: Record<string, { score: number; comment: string }>;
}

function ScoreBar({ score }: { score: number }) {
  const percentage = (score / 10) * 100;
  const color = score >= 8 ? "bg-success" : score >= 5 ? "bg-warning" : "bg-destructive";

  return (
    <div className="h-2 w-full rounded-full bg-muted">
      <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: `${percentage}%` }} />
    </div>
  );
}

export function Scorecard({ scores }: ScorecardProps) {
  const entries = Object.entries(scores);
  const total = entries.reduce((sum, [, value]) => sum + value.score, 0);
  const maxTotal = entries.length * 10;

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 shrink-0 text-primary drop-shadow-[0_0_6px_rgba(34,211,238,0.25)]" />
          <h3 className="font-display text-lg font-bold text-gradient">Scorecard</h3>
        </div>

        <div className="flex items-baseline gap-1 sm:justify-end">
          <span className="font-mono text-xl font-bold text-primary sm:text-2xl">{total}</span>
          <span className="font-mono text-sm text-muted-foreground">/{maxTotal}</span>
        </div>
      </div>

      <div className="space-y-4">
        {entries.map(([dimension, { score, comment }]) => (
          <div key={dimension}>
            <div className="mb-1 flex items-start justify-between gap-3">
              <span className="min-w-0 flex-1 text-sm font-medium leading-6 text-foreground">{dimension}</span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{score}/10</span>
            </div>
            <ScoreBar score={score} />
            <p className="mt-1 text-xs leading-5 text-muted-foreground/70">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
