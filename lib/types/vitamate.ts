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

export type MealEntry = {
  id: string;
  rawText: string;
  timestamp: Date;
  response: VitaResponse;
};
