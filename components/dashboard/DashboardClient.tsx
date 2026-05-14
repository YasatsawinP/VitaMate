"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import GreetingSection from "./GreetingSection";
import HeroInputCard from "./HeroInputCard";
import VitaResponseCard from "./VitaResponseCard";
import VitalStrip from "./VitalStrip";
import JournalView from "./JournalView";
import {
  generateVitaResponse,
  generateAdjustedResponse,
  generateWaterResponse,
  generateSleepResponse,
  ADJUSTMENT_PROMPTS,
  type AdjustmentId,
} from "@/lib/mock/vitaResponses";
import { parseHealthInput } from "@/lib/parsers/healthInputParser";
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
  JournalEntry,
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

async function fetchAnalysis(
  text: string,
  ctx?: ProfileContext,
  fallbackOverride?: VitaResponse,
): Promise<FetchResult> {
  const fallback = (showNote: boolean) =>
    fallbackOverride ?? localFallback(text, showNote);

  // Skip the network entirely while Gemini is cooling down.
  if (!isAIAvailable()) {
    return { response: fallback(true), rateLimited: false };
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
    return { response: fallback(false), rateLimited: false };
  }

  if (!res.ok) {
    if (res.status === 429) {
      activateCooldown(); // logs once per cooldown window
      return { response: fallback(true), rateLimited: true };
    }
    console.warn(`[VitaMate] API error (HTTP ${res.status}) → using local fallback`);
    return { response: fallback(false), rateLimited: false };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    console.warn("[VitaMate] Malformed API response → using local fallback");
    return { response: fallback(false), rateLimited: false };
  }

  if (!isAnalyzeApiResponse(data)) {
    console.warn("[VitaMate] Unexpected API response shape → using local fallback");
    return { response: fallback(false), rateLimited: false };
  }

  return { response: apiResponseToVitaResponse(data), rateLimited: false };
}

// ── Dashboard constants ────────────────────────────────────────────────────────

const ZERO_TOTALS: NutrientTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
const ENTRIES_KEY = "vitamate_entries_v1";

function todayStartMs(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

// ── localStorage helpers ───────────────────────────────────────────────────────

function saveEntries(entries: JournalEntry[]): void {
  try {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  } catch { /* private browsing / quota */ }
}

function loadEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    // New unified format
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as JournalEntry[]) : [];
    }
    // Migrate old meal-only format
    const oldRaw = localStorage.getItem("vitamate_meals_v1");
    if (!oldRaw) return [];
    const oldParsed: unknown = JSON.parse(oldRaw);
    if (!Array.isArray(oldParsed)) return [];
    return (oldParsed as MealEntry[]).map((m) => ({
      id: m.id,
      type: "meal" as const,
      createdAt: new Date(m.timestamp).getTime(),
      data: { rawText: m.rawText, response: m.response },
    }));
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
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntries());
  const [inputKey, setInputKey] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "journal">("today");

  useEffect(() => { saveEntries(entries); }, [entries]);

  // Derive today's aggregate values from the unified entries array
  const dailyTotals = useMemo<NutrientTotals>(() => {
    const start = todayStartMs();
    return entries
      .filter((e): e is Extract<JournalEntry, { type: "meal" }> =>
        e.type === "meal" && e.createdAt >= start)
      .reduce(
        (acc, e) => ({
          calories: acc.calories + e.data.response.nutrients.calories,
          protein:  acc.protein  + e.data.response.nutrients.protein,
          carbs:    acc.carbs    + e.data.response.nutrients.carbs,
          fat:      acc.fat      + e.data.response.nutrients.fat,
        }),
        ZERO_TOTALS
      );
  }, [entries]);

  const waterDrankMl = useMemo(() => {
    const start = todayStartMs();
    return entries
      .filter((e): e is Extract<JournalEntry, { type: "water" }> =>
        e.type === "water" && e.createdAt >= start)
      .reduce((sum, e) => sum + e.data.amountMl, 0);
  }, [entries]);

  const sleepLoggedMin = useMemo<number | null>(() => {
    const start = todayStartMs();
    const todaySleep = entries.filter(
      (e): e is Extract<JournalEntry, { type: "sleep" }> =>
        e.type === "sleep" && e.createdAt >= start
    );
    return todaySleep.length > 0
      ? todaySleep[todaySleep.length - 1].data.durationMin
      : null;
  }, [entries]);

  const profileCtx: ProfileContext = useMemo(() => ({
    name:    profile.name,
    age:     profile.age,
    weight:  profile.weight,
    goal:    profile.goal,
    targets: { calories: targets.calories, protein: targets.protein },
  }), [profile, targets]);

  const handleSubmit = useCallback(async (text: string) => {
    setLastSubmittedText(text);

    // Local parsing — water and sleep are handled instantly without an API call
    const parsed = parseHealthInput(text);

    if (parsed.type === "water") {
      setEntries((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: "water", createdAt: Date.now(), data: { amountMl: parsed.amountMl } },
      ]);
      setVitaResponse(generateWaterResponse(parsed.amountMl));
      setResponseKey((k) => k + 1);
      setStatus("done");
      return;
    }

    if (parsed.type === "sleep") {
      setEntries((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: "sleep", createdAt: Date.now(), data: { durationMin: parsed.durationMin } },
      ]);
      setVitaResponse(generateSleepResponse(parsed.durationMin));
      setResponseKey((k) => k + 1);
      setStatus("done");
      return;
    }

    // Regular meal / chat — call AI
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
      setEntries((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "meal" as const,
          createdAt: Date.now(),
          data: { rawText: lastSubmittedText, response: vitaResponse },
        },
      ]);
    }

    setTimeout(() => {
      setStatus("idle");
      setVitaResponse(null);
      setInputKey((k) => k + 1);
    }, 900);
  }, [vitaResponse, lastSubmittedText]);

  const handleAdjust = useCallback(async (adj: AdjustmentId) => {
    if (!vitaResponse) return;

    setStatus("loading");

    const localAdjusted = generateAdjustedResponse(vitaResponse, adj);
    const adjustedText = `${lastSubmittedText} — ${ADJUSTMENT_PROMPTS[adj]}`;

    const { response, rateLimited } = await fetchAnalysis(
      adjustedText,
      profileCtx,
      localAdjusted,
    );

    if (rateLimited) {
      setCooldownActive(true);
      setTimeout(() => setCooldownActive(false), getRemainingCooldown());
    }

    setVitaResponse(response);
    setResponseKey((k) => k + 1);
    setStatus("done");
  }, [vitaResponse, lastSubmittedText, profileCtx]);

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
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        name={profile.name}
      />
      <main className="flex-1 flex justify-center px-4 sm:px-14 pb-6 sm:pb-9">
        <div className="w-full max-w-[880px] flex flex-col gap-5">

          {activeTab === "today" && (
            <>
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
                  onAdjust={handleAdjust}
                />
              )}

              <VitalStrip
                calories={dailyTotals.calories}
                protein={dailyTotals.protein}
                calorieGoal={targets.calories}
                proteinGoal={targets.protein}
                waterGoal={targets.water}
                waterDrankMl={waterDrankMl}
                sleepMin={targets.sleepMin}
                sleepMax={targets.sleepMax}
                sleepLoggedMin={sleepLoggedMin}
              />
            </>
          )}

          {activeTab === "journal" && (
            <JournalView
              entries={entries}
              targets={targets}
              onGoToToday={() => setActiveTab("today")}
            />
          )}

        </div>
      </main>
    </div>
  );
}
