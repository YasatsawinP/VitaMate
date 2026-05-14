"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import GreetingSection from "./GreetingSection";
import HeroInputCard from "./HeroInputCard";
import VitaResponseCard from "./VitaResponseCard";
import VitalStrip from "./VitalStrip";
import { generateVitaResponse } from "@/lib/mock/vitaResponses";
import {
  isAIAvailable,
  activateCooldown,
  getRemainingCooldown,
} from "@/lib/ai/availability";
import { calculateTargets } from "@/lib/health/calculateTargets";
import type { UserProfile } from "@/lib/types/profile";
import type {
  VitaResponse,
  DashboardStatus,
  MealEntry,
  NutrientTotals,
} from "@/lib/types/vitamate";

// ── API response types ─────────────────────────────────────────────────────────

interface AnalyzeApiResponse {
  intent: "meal" | "chat" | "unknown";
  message: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function isAnalyzeApiResponse(v: unknown): v is AnalyzeApiResponse {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Record<string, unknown>;
  return (
    (r.intent === "meal" || r.intent === "chat" || r.intent === "unknown") &&
    typeof r.message === "string" &&
    typeof r.calories === "number" &&
    typeof r.protein === "number" &&
    typeof r.carbs === "number" &&
    typeof r.fat === "number"
  );
}

function apiResponseToVitaResponse(data: AnalyzeApiResponse): VitaResponse {
  return {
    intent: data.intent,
    quote: data.message,
    quoteEmphasis: "",
    macros: [
      { label: "พลังงาน", value: String(data.calories), unit: "แคล" },
      { label: "โปรตีน", value: String(data.protein), unit: "ก." },
      { label: "คาร์บ",  value: String(data.carbs),    unit: "ก." },
      { label: "ไขมัน",  value: String(data.fat),       unit: "ก." },
    ],
    nutrients: {
      calories: data.calories,
      protein:  data.protein,
      carbs:    data.carbs,
      fat:      data.fat,
    },
  };
}

// ── AI fetch with silent fallback ──────────────────────────────────────────────
//
// Never throws. All Gemini failures are handled here so handleSubmit stays clean
// and the console stays free of scary stack traces during expected outages.

const COOLDOWN_NOTE = " VitaMate กำลังพัก AI แป๊บนึง 😊";

function localFallback(text: string, showCooldownNote: boolean): VitaResponse {
  const base = generateVitaResponse(text);
  return showCooldownNote ? { ...base, quoteEmphasis: COOLDOWN_NOTE } : base;
}

interface FetchResult {
  response: VitaResponse;
  /** True only when this specific request triggered a new 429 cooldown. */
  rateLimited: boolean;
}

interface ProfileContext {
  name: string;
  age: number;
  weight: number;
  goal: string;
  targets: { calories: number; protein: number };
}

async function fetchAnalysis(text: string, ctx?: ProfileContext): Promise<FetchResult> {
  // Skip the network entirely while Gemini is cooling down.
  if (!isAIAvailable()) {
    return { response: localFallback(text, true), rateLimited: false };
  }

  let res: Response;
  try {
    res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, profile: ctx }),
    });
  } catch {
    console.warn("[VitaMate] Network error → using local fallback");
    return { response: localFallback(text, false), rateLimited: false };
  }

  if (!res.ok) {
    if (res.status === 429) {
      activateCooldown(); // logs once per cooldown window
      return { response: localFallback(text, true), rateLimited: true };
    }
    console.warn(`[VitaMate] API error (HTTP ${res.status}) → using local fallback`);
    return { response: localFallback(text, false), rateLimited: false };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    console.warn("[VitaMate] Malformed API response → using local fallback");
    return { response: localFallback(text, false), rateLimited: false };
  }

  if (!isAnalyzeApiResponse(data)) {
    console.warn("[VitaMate] Unexpected API response shape → using local fallback");
    return { response: localFallback(text, false), rateLimited: false };
  }

  return { response: apiResponseToVitaResponse(data), rateLimited: false };
}

// ── Dashboard constants ────────────────────────────────────────────────────────

const ZERO_TOTALS: NutrientTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
const MEALS_KEY = "vitamate_meals_v1";

// ── localStorage helpers ───────────────────────────────────────────────────────

function saveMeals(meals: MealEntry[]): void {
  try {
    localStorage.setItem(
      MEALS_KEY,
      JSON.stringify(meals.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })))
    );
  } catch {
    // Private browsing or quota exceeded — silently skip
  }
}

function loadMeals(): MealEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MEALS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((m: Record<string, unknown>) => ({
      ...m,
      timestamp: new Date(m.timestamp as string),
    })) as MealEntry[];
  } catch {
    return [];
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

interface DashboardClientProps {
  profile: UserProfile;
}

export default function DashboardClient({ profile }: DashboardClientProps) {
  const targets = useMemo(() => calculateTargets(profile), [profile]);

  const [status, setStatus] = useState<DashboardStatus>("idle");
  const [vitaResponse, setVitaResponse] = useState<VitaResponse | null>(null);
  const [responseKey, setResponseKey] = useState(0);
  const [lastSubmittedText, setLastSubmittedText] = useState("");
  const [meals, setMeals] = useState<MealEntry[]>(() => loadMeals());
  const [inputKey, setInputKey] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);

  useEffect(() => {
    saveMeals(meals);
  }, [meals]);

  const dailyTotals = useMemo<NutrientTotals>(
    () =>
      meals.reduce(
        (acc, meal) => ({
          calories: acc.calories + meal.response.nutrients.calories,
          protein:  acc.protein  + meal.response.nutrients.protein,
          carbs:    acc.carbs    + meal.response.nutrients.carbs,
          fat:      acc.fat      + meal.response.nutrients.fat,
        }),
        ZERO_TOTALS
      ),
    [meals]
  );

  const profileCtx: ProfileContext = useMemo(() => ({
    name:    profile.name,
    age:     profile.age,
    weight:  profile.weight,
    goal:    profile.goal,
    targets: { calories: targets.calories, protein: targets.protein },
  }), [profile, targets]);

  const handleSubmit = useCallback(async (text: string) => {
    setLastSubmittedText(text);
    setStatus("loading");

    const { response, rateLimited } = await fetchAnalysis(text, profileCtx);

    if (rateLimited) {
      setCooldownActive(true);
      setTimeout(() => setCooldownActive(false), getRemainingCooldown());
    }

    setVitaResponse(response);
    setResponseKey((k) => k + 1);
    setStatus("done");
  }, [profileCtx]);

  const handleConfirm = useCallback(() => {
    if (!vitaResponse) return;

    if (vitaResponse.intent === "meal" || vitaResponse.intent === undefined) {
      setMeals((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          rawText: lastSubmittedText,
          timestamp: new Date(),
          response: vitaResponse,
        },
      ]);
    }

    setTimeout(() => {
      setStatus("idle");
      setVitaResponse(null);
      setInputKey((k) => k + 1);
    }, 900);
  }, [vitaResponse, lastSubmittedText]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(1100px 600px at 85% -10%, #E4ECDB 0%, transparent 60%), " +
          "radial-gradient(800px 500px at -5% 110%, rgba(233,200,180,0.18) 0%, transparent 65%), " +
          "#F4EFE3",
      }}
    >
      <DashboardHeader />
      <main className="flex-1 flex justify-center px-4 sm:px-14 pb-6 sm:pb-9">
        <div className="w-full max-w-[880px] flex flex-col gap-5">
          <GreetingSection name={profile.name} />

          <HeroInputCard
            key={inputKey}
            onSubmit={handleSubmit}
            isSubmitting={status === "loading"}
          />

          {cooldownActive && (
            <p
              className="text-center text-[13px]"
              style={{
                color: "rgba(110,137,97,0.72)",
                fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif",
                animation: "vita-fade 0.4s ease-out both",
              }}
            >
              VitaMate กำลังคิดแบบออฟไลน์ 😊
            </p>
          )}

          {status !== "idle" && (
            <VitaResponseCard
              response={vitaResponse}
              status={status}
              responseKey={responseKey}
              onConfirm={handleConfirm}
            />
          )}

          <VitalStrip
            calories={dailyTotals.calories}
            protein={dailyTotals.protein}
            calorieGoal={targets.calories}
            proteinGoal={targets.protein}
            waterGoal={targets.water}
            sleepMin={targets.sleepMin}
            sleepMax={targets.sleepMax}
          />
        </div>
      </main>
    </div>
  );
}
