import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

const SYSTEM_PROMPT = `
You are a senior code reviewer.

Return ONLY valid JSON.
Do not wrap JSON in markdown.
Do not add any extra text.

Use this exact shape:
{
  "overview": {
    "description": "string",
    "rating": 1,
    "verdict": "string"
  },
  "critical": [
    {
      "title": "string",
      "where": "string",
      "why": "string",
      "fix": "string"
    }
  ],
  "warnings": [
    {
      "title": "string",
      "where": "string",
      "why": "string",
      "fix": "string"
    }
  ],
  "suggestions": ["string"],
  "positives": ["string"],
  "scorecard": {
    "Correctness": { "score": 1, "comment": "string" },
    "Security": { "score": 1, "comment": "string" },
    "Performance": { "score": 1, "comment": "string" },
    "Readability": { "score": 1, "comment": "string" },
    "Maintainability": { "score": 1, "comment": "string" },
    "Best Practices": { "score": 1, "comment": "string" }
  }
}

Rules:
- rating must be 1 to 5
- all score values must be 1 to 10
- keep fixes practical
- if no critical issues, return []
- if no warnings, return []
`;

function extractJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Model did not return valid JSON");
    }
    return JSON.parse(match[0]);
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const code = body?.code?.trim?.();
    const mode = body?.mode || "full_review";

    if (!code) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    const prompt = `
Review mode: ${mode}

Please review this code:

${code}
`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        { text: SYSTEM_PROMPT },
        { text: prompt },
      ],
    });

    const text = response.text || "";
    const review = extractJson(text);

    return NextResponse.json({ review });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gemini review failed";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}