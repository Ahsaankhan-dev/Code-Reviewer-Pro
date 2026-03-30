export interface ReviewData {
  overview: { description: string; rating: number; verdict: string };
  critical: Array<{ title: string; where: string; why: string; fix: string }>;
  warnings: Array<{ title: string; where: string; why: string; fix: string }>;
  suggestions: string[];
  positives: string[];
  scorecard: Record<string, { score: number; comment: string }>;
}
