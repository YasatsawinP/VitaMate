export type MacroItem = {
  label: string;
  value: string; // display string, e.g. "≈ 320"
  unit: string;
};

// Numeric totals — separate from display strings so they can be summed
export type NutrientTotals = {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
};

export type VitaResponse = {
  quote: string;
  quoteEmphasis: string;
  macros: [MacroItem, MacroItem, MacroItem, MacroItem]; // display only
  nutrients: NutrientTotals; // used for aggregation
  intent?: "meal" | "chat" | "unknown";
};

export type DashboardStatus = "idle" | "loading" | "done";

// ── Unified journal entry (discriminated union) ────────────────────────────────

export type MealJournalEntry = {
  id: string;
  type: "meal";
  createdAt: number; // ms timestamp
  data: { rawText: string; response: VitaResponse };
};

export type WaterJournalEntry = {
  id: string;
  type: "water";
  createdAt: number;
  data: { amountMl: number };
};

export type SleepJournalEntry = {
  id: string;
  type: "sleep";
  createdAt: number;
  data: { durationMin: number };
};

export type JournalEntry = MealJournalEntry | WaterJournalEntry | SleepJournalEntry;

// Legacy alias — used only for localStorage migration
export type MealEntry = {
  id: string;
  rawText: string;
  timestamp: string; // ISO string in storage
  response: VitaResponse;
};
