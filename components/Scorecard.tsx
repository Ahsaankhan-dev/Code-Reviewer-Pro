"use client";

interface ScorecardProps {
  scores: Record<string, { score: number; comment: string }>;
}

function ScoreBar({ score }: { score: number }) {
  const percentage = (score / 10) * 100;
  const color =
    score >= 8 ? "bg-success" : score >= 5 ? "bg-warning" : "bg-destructive";

  return (
    <div className="h-2 w-full rounded-full bg-muted">
      <div
        className={`h-2 rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function Scorecard({ scores }: ScorecardProps) {
  const entries = Object.entries(scores);
  const total = entries.reduce((sum, [, v]) => sum + v.score, 0);
  const maxTotal = entries.length * 10;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-gradient">📊 Scorecard</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold text-primary">{total}</span>
          <span className="font-mono text-sm text-muted-foreground">/{maxTotal}</span>
        </div>
      </div>

      <div className="space-y-4">
        {entries.map(([dimension, { score, comment }]) => (
          <div key={dimension}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{dimension}</span>
              <span className="font-mono text-xs text-muted-foreground">{score}/10</span>
            </div>
            <ScoreBar score={score} />
            <p className="mt-1 text-xs text-muted-foreground/70">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
