// ── Types ──────────────────────────────────────────────────────────────────────

export type ParsedHealth =
  | { type: "water"; amountMl: number }
  | { type: "sleep"; durationMin: number }
  | { type: "other" };

// ── Water parsing ──────────────────────────────────────────────────────────────

const WATER_PATTERNS: { pattern: RegExp; toMl: (n: number) => number }[] = [
  { pattern: /(\d+(?:\.\d+)?)\s*(?:ลิตร|litre|liter)/i, toMl: (n) => n * 1000 },
  { pattern: /(\d+(?:\.\d+)?)\s*ml/i,                    toMl: (n) => n },
  { pattern: /(\d+(?:\.\d+)?)\s*แก้ว/,                   toMl: (n) => n * 250 },
  { pattern: /(\d+(?:\.\d+)?)\s*ขวด/,                    toMl: (n) => n * 500 },
];

function tryParseWater(text: string): number | null {
  for (const { pattern, toMl } of WATER_PATTERNS) {
    const m = text.match(pattern);
    if (m) {
      const ml = Math.round(toMl(parseFloat(m[1])));
      if (ml > 0) return ml;
    }
  }
  return null;
}

// ── Sleep parsing ──────────────────────────────────────────────────────────────

const SLEEP_KEYWORDS = ["นอน", "หลับ", "นอนหลับ"];

function tryParseSleep(text: string): number | null {
  if (!SLEEP_KEYWORDS.some((k) => text.includes(k))) return null;

  let totalMin = 0;
  let found = false;

  const hoursMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:ชั่วโมง|ชม\.?)/);
  if (hoursMatch) {
    totalMin += parseFloat(hoursMatch[1]) * 60;
    found = true;
  }

  const minsMatch = text.match(/(\d+)\s*นาที/);
  if (minsMatch) {
    totalMin += parseInt(minsMatch[1], 10);
    found = true;
  }

  // "X ชั่วโมงครึ่ง" → add 30 min on top of the hours already parsed
  if (text.includes("ครึ่ง") && hoursMatch) totalMin += 30;

  if (!found) return null;
  return Math.round(totalMin);
}

// ── Main export ────────────────────────────────────────────────────────────────

export function parseHealthInput(text: string): ParsedHealth {
  const ml = tryParseWater(text);
  if (ml !== null) return { type: "water", amountMl: ml };

  const min = tryParseSleep(text);
  if (min !== null && min > 0) return { type: "sleep", durationMin: min };

  return { type: "other" };
}
