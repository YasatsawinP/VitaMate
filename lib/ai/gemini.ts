import { GoogleGenAI, ApiError } from "@google/genai";

// ── Stable model chain ─────────────────────────────────────────────────────────
//
// Both models are stable Gemini 2.x releases accessible through @google/genai v2
// (v1beta endpoint). gemini-1.5-* models are NOT reachable via this SDK path.

const MODEL_CHAIN = ["gemini-2.0-flash", "gemini-2.0-flash-lite"] as const;

// ── Startup validation (runs at module load, before any request) ───────────────

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "[gemini] GEMINI_API_KEY is not set — AI features will use the local mock fallback"
  );
} else {
  console.log(
    "[gemini] API key present. Model chain:",
    MODEL_CHAIN.join(" → ")
  );
}

// ── Client singleton ───────────────────────────────────────────────────────────

let _ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!_ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
}

// ── Error helpers ──────────────────────────────────────────────────────────────

function isModelNotFound(err: unknown): boolean {
  // SDK throws ApiError(404) for unknown models
  if (err instanceof ApiError && err.status === 404) return true;
  // Fallback: match the "not found for API version" message from the raw API
  const msg = err instanceof Error ? err.message : String(err);
  return /not found/i.test(msg) && (/model/i.test(msg) || /api version/i.test(msg));
}

export function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  return String(err);
}

// Re-export so route doesn't need to import from @google/genai directly
export { ApiError };

// ── Core generate function ─────────────────────────────────────────────────────

export interface GenerateJSONOptions {
  systemInstruction: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Call Gemini with JSON-mode output, walking the MODEL_CHAIN until one succeeds.
 * Throws on rate-limit (429) or other non-recoverable errors so the caller
 * can decide how to respond (return 429, fall back to mock, etc.).
 */
export async function generateJSON(
  contents: string,
  options: GenerateJSONOptions
): Promise<string> {
  const ai = getAI();
  let lastError: unknown;

  for (const model of MODEL_CHAIN) {
    try {
      console.log(`[gemini] trying model: ${model}`);

      const result = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: options.systemInstruction,
          responseMimeType: "application/json",
          temperature: options.temperature ?? 0.5,
          maxOutputTokens: options.maxOutputTokens ?? 512,
        },
      });

      const candidate = result.candidates?.[0];
      console.log(`[gemini] finishReason (${model}):`, candidate?.finishReason);

      if (result.promptFeedback?.blockReason) {
        console.error(`[gemini] prompt blocked (${model}):`, result.promptFeedback.blockReason);
      }

      const text = result.text;
      if (!text) {
        const reason = candidate?.finishReason ?? "unknown";
        throw new Error(`Empty response from ${model} (finishReason: ${reason})`);
      }

      console.log(`[gemini] success with model: ${model}`);
      return text.trim();
    } catch (err) {
      if (isModelNotFound(err)) {
        console.warn(`[gemini] model unavailable: ${model} — trying next in chain`);
        lastError = err;
        continue;
      }
      // Rate-limit, auth, network — re-throw so the route can handle it
      throw err;
    }
  }

  throw lastError ?? new Error("All models in the Gemini chain failed");
}
