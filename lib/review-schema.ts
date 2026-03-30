import type { ReviewData } from "@/lib/types";

export function normalizeReviewData(input: unknown): ReviewData | null {
  if (!input || typeof input !== "object") return null;

  const data = input as Partial<ReviewData>;

  if (!data.overview || !data.scorecard) return null;

  return {
    overview: {
      description: String(data.overview.description ?? ""),
      rating: Number(data.overview.rating ?? 0),
      verdict: String(data.overview.verdict ?? ""),
    },
    critical: Array.isArray(data.critical) ? data.critical.map((item) => ({
      title: String(item?.title ?? ""),
      where: String(item?.where ?? ""),
      why: String(item?.why ?? ""),
      fix: String(item?.fix ?? ""),
    })) : [],
    warnings: Array.isArray(data.warnings) ? data.warnings.map((item) => ({
      title: String(item?.title ?? ""),
      where: String(item?.where ?? ""),
      why: String(item?.why ?? ""),
      fix: String(item?.fix ?? ""),
    })) : [],
    suggestions: Array.isArray(data.suggestions) ? data.suggestions.map(String) : [],
    positives: Array.isArray(data.positives) ? data.positives.map(String) : [],
    scorecard: Object.fromEntries(
      Object.entries(data.scorecard ?? {}).map(([key, value]) => [
        key,
        {
          score: Number(value?.score ?? 0),
          comment: String(value?.comment ?? ""),
        },
      ]),
    ),
  };
}
