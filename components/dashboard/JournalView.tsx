"use client";

import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import type { JournalEntry, MealJournalEntry, WaterJournalEntry, SleepJournalEntry } from "@/lib/types/vitamate";
import type { DailyTargets } from "@/lib/types/profile";

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
}

function formatDateLabel(ts: number): string {
  const date  = new Date(ts);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return "วันนี้";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "เมื่อวาน";
  return date.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "short" });
}

function fmtNum(n: number): string {
  return n >= 1000 ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, "0")}` : String(n);
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max).trimEnd() + "…" : str;
}

// ── Empty state ────────────────────────────────────────────────────────────────

function EmptyState({ onGoToToday }: { onGoToToday: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-3xl"
        style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.80)" }}
      >
        📖
      </div>
      <h2
        className="text-[18px] font-light mb-2"
        style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}
      >
        ยังไม่มีบันทึกสุขภาพนะคะ
      </h2>
      <p
        className="text-[13.5px] mb-6 leading-relaxed"
        style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}
      >
        เล่าให้ Vita ฟังว่าทานอะไร ดื่มน้ำเท่าไหร่ หรือนอนกี่ชั่วโมง
        <br />
        ทุกอย่างจะถูกบันทึกไว้ที่นี่ค่ะ
      </p>
      <button
        onClick={onGoToToday}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-medium text-white"
        style={{
          background: "#3D4F33",
          boxShadow: "0 6px 16px -8px rgba(61,79,51,0.45)",
          fontFamily: "var(--font-prompt), sans-serif",
        }}
      >
        เริ่มบันทึก
        <ArrowRight size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

// ── Meal card ──────────────────────────────────────────────────────────────────

function MacroPill({ emoji, value, unit }: { emoji: string; value: string | number; unit: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[12px]"
      style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}
    >
      <span>{emoji}</span>
      <span style={{ color: "#3D4A36", fontWeight: 500 }}>{fmtNum(Number(value))}</span>
      <span>{unit}</span>
    </span>
  );
}

function MealCard({ entry }: { entry: MealJournalEntry }) {
  const { data, createdAt } = entry;
  const hasNutrients = data.response.nutrients.calories > 0;

  return (
    <div
      className="rounded-[20px] px-5 py-4"
      style={{
        background: "rgba(255,255,255,0.70)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.80)",
        boxShadow: "0 4px 16px -10px rgba(31,42,27,0.10)",
        animation: "vita-appear 0.35s ease-out both",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[15px] flex-shrink-0">🍽</span>
          <p
            className="text-[14.5px] font-medium leading-snug truncate"
            style={{ color: "#1F2A1B", fontFamily: "var(--font-prompt), sans-serif" }}
          >
            {truncate(data.rawText, 48)}
          </p>
        </div>
        <span
          className="text-[11.5px] flex-shrink-0 mt-0.5"
          style={{ color: "#A8AC9D", fontFamily: "var(--font-prompt), sans-serif" }}
        >
          {formatTime(createdAt)} น.
        </span>
      </div>

      <p
        className="text-[13px] leading-relaxed mb-3 pl-[23px]"
        style={{ color: "#5A6650", fontFamily: "var(--font-prompt), sans-serif" }}
      >
        {truncate(data.response.quote, 68)}
      </p>

      {hasNutrients && (
        <div
          className="flex items-center gap-3.5 pt-2.5 pl-[23px]"
          style={{ borderTop: "1px solid rgba(31,42,27,0.06)" }}
        >
          <MacroPill emoji="🔥" value={data.response.nutrients.calories} unit="แคล" />
          <MacroPill emoji="💪" value={data.response.nutrients.protein}  unit="ก. โปรตีน" />
          <MacroPill emoji="🍞" value={data.response.nutrients.carbs}    unit="ก. คาร์บ" />
        </div>
      )}
    </div>
  );
}

// ── Water card ─────────────────────────────────────────────────────────────────

function WaterCard({ entry }: { entry: WaterJournalEntry }) {
  const ml = entry.data.amountMl;
  const glasses = Math.max(1, Math.round(ml / 250));
  const liters  = (ml / 1000).toFixed(1).replace(/\.0$/, "");
  const primary = ml >= 1000 ? `${liters} ลิตร` : `${glasses} แก้ว`;
  const secondary = ml >= 1000 ? `≈ ${glasses} แก้ว` : `≈ ${liters} ล.`;

  return (
    <div
      className="rounded-[20px] px-5 py-4"
      style={{
        background: "rgba(143,176,196,0.13)",
        border: "1px solid rgba(143,176,196,0.32)",
        animation: "vita-appear 0.35s ease-out both",
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[15px]">💧</span>
          <span
            className="text-[12px] font-medium"
            style={{ color: "#5F8FA8", fontFamily: "var(--font-prompt), sans-serif" }}
          >
            น้ำดื่ม
          </span>
        </div>
        <span
          className="text-[11.5px]"
          style={{ color: "#A8AC9D", fontFamily: "var(--font-prompt), sans-serif" }}
        >
          {formatTime(entry.createdAt)} น.
        </span>
      </div>
      <p
        className="text-[14.5px] font-medium pl-[23px]"
        style={{ color: "#1F2A1B", fontFamily: "var(--font-prompt), sans-serif" }}
      >
        เติมน้ำ {primary}
        <span
          className="text-[12.5px] font-normal ml-2"
          style={{ color: "#7A816F" }}
        >
          {secondary}
        </span>
      </p>
    </div>
  );
}

// ── Sleep card ─────────────────────────────────────────────────────────────────

function SleepCard({ entry }: { entry: SleepJournalEntry }) {
  const min  = entry.data.durationMin;
  const h    = Math.floor(min / 60);
  const m    = min % 60;
  const display = m > 0 ? `${h} ชม. ${m} นาที` : `${h} ชั่วโมง`;
  const note = min >= 7 * 60 ? "ดีมากค่ะ 🌿" : min >= 6 * 60 ? "ใกล้เป้าแล้วนะคะ" : "น้อยไปนิดนะคะ";

  return (
    <div
      className="rounded-[20px] px-5 py-4"
      style={{
        background: "rgba(152,144,176,0.11)",
        border: "1px solid rgba(152,144,176,0.26)",
        animation: "vita-appear 0.35s ease-out both",
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[15px]">🌙</span>
          <span
            className="text-[12px] font-medium"
            style={{ color: "#7B71A8", fontFamily: "var(--font-prompt), sans-serif" }}
          >
            การนอน
          </span>
        </div>
        <span
          className="text-[11.5px]"
          style={{ color: "#A8AC9D", fontFamily: "var(--font-prompt), sans-serif" }}
        >
          {formatTime(entry.createdAt)} น.
        </span>
      </div>
      <p
        className="text-[14.5px] font-medium pl-[23px]"
        style={{ color: "#1F2A1B", fontFamily: "var(--font-prompt), sans-serif" }}
      >
        พักผ่อน {display}
        <span
          className="text-[12.5px] font-normal ml-2"
          style={{ color: "#7A816F" }}
        >
          {note}
        </span>
      </p>
    </div>
  );
}

// ── Entry router ───────────────────────────────────────────────────────────────

function EntryCard({ entry }: { entry: JournalEntry }) {
  if (entry.type === "meal")  return <MealCard  entry={entry} />;
  if (entry.type === "water") return <WaterCard entry={entry} />;
  if (entry.type === "sleep") return <SleepCard entry={entry} />;
  return null;
}

// ── Daily summary card ─────────────────────────────────────────────────────────

function DailySummaryCard({
  entries,
  targets,
}: {
  entries: JournalEntry[];
  targets: DailyTargets;
}) {
  const mealEntries  = entries.filter((e): e is MealJournalEntry  => e.type === "meal");
  const waterEntries = entries.filter((e): e is WaterJournalEntry => e.type === "water");
  const sleepEntries = entries.filter((e): e is SleepJournalEntry => e.type === "sleep");

  const calories = mealEntries.reduce((s, e) => s + e.data.response.nutrients.calories, 0);
  const protein  = mealEntries.reduce((s, e) => s + e.data.response.nutrients.protein,  0);
  const waterMl  = waterEntries.reduce((s, e) => s + e.data.amountMl, 0);
  const lastSleep = sleepEntries.length > 0
    ? sleepEntries[sleepEntries.length - 1].data.durationMin
    : null;

  const calorieProgress = targets.calories > 0 ? Math.min(calories / targets.calories, 1) : 0;

  function fmtLiters(ml: number) {
    const l = ml / 1000;
    return Number.isInteger(l) ? String(l) : l.toFixed(1);
  }

  return (
    <div
      className="rounded-[22px] px-6 py-5"
      style={{
        background: "linear-gradient(135deg, #3D4F33 0%, #5E7A50 100%)",
        boxShadow: "0 12px 32px -16px rgba(61,79,51,0.40)",
      }}
    >
      <p
        className="text-[11.5px] font-medium tracking-[0.35px] mb-3 opacity-70 text-white uppercase"
        style={{ fontFamily: "var(--font-prompt), sans-serif" }}
      >
        สรุปวันนี้ · {mealEntries.length} มื้อ
      </p>

      {/* Calorie bar */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1.5">
          <span
            className="text-[24px] font-light text-white"
            style={{ fontFamily: "var(--font-kanit), sans-serif", letterSpacing: "-0.5px" }}
          >
            {fmtNum(calories)}
          </span>
          <span className="text-[12px] text-white/60" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
            จาก {fmtNum(targets.calories)} แคล
          </span>
        </div>
        <div className="w-full h-[5px] rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${calorieProgress * 100}%`, background: "#C9DCB4" }}
          />
        </div>
      </div>

      {/* Protein */}
      <p className="text-[12.5px] text-white/65" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        โปรตีน{" "}
        <span className="text-white font-medium">{protein} ก.</span>
        {targets.protein > 0 && <span> จาก {targets.protein} ก.</span>}
      </p>

      {/* Water */}
      {waterMl > 0 && (
        <p className="text-[12.5px] text-white/65 mt-1" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
          💧 น้ำดื่ม{" "}
          <span className="text-white font-medium">{fmtLiters(waterMl)} ล.</span>
          {targets.water > 0 && <span> จาก {fmtLiters(targets.water)} ล.</span>}
        </p>
      )}

      {/* Sleep */}
      {lastSleep !== null && (
        <p className="text-[12.5px] text-white/65 mt-1" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
          🌙 การนอน{" "}
          <span className="text-white font-medium">
            {lastSleep < 60 ? `${lastSleep} นาที` : `${Math.floor(lastSleep / 60)} ชม.`}
          </span>
        </p>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface JournalViewProps {
  entries: JournalEntry[];
  targets: DailyTargets;
  onGoToToday: () => void;
}

export default function JournalView({ entries, targets, onGoToToday }: JournalViewProps) {
  const todayStr = new Date().toDateString();

  const groups = useMemo(() => {
    const sorted = [...entries].sort((a, b) => b.createdAt - a.createdAt);
    const map = new Map<string, { label: string; entries: JournalEntry[] }>();
    for (const entry of sorted) {
      const key = new Date(entry.createdAt).toDateString();
      if (!map.has(key)) map.set(key, { label: formatDateLabel(entry.createdAt), entries: [] });
      map.get(key)!.entries.push(entry);
    }
    return Array.from(map.values());
  }, [entries]);

  const todayEntries = useMemo(
    () => entries.filter((e) => new Date(e.createdAt).toDateString() === todayStr),
    [entries, todayStr]
  );

  if (entries.length === 0) {
    return <EmptyState onGoToToday={onGoToToday} />;
  }

  return (
    <div className="flex flex-col gap-5">
      {todayEntries.length > 0 && (
        <DailySummaryCard entries={todayEntries} targets={targets} />
      )}

      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-3">
          <h3
            className="text-[11.5px] font-medium tracking-[0.35px] px-1 uppercase"
            style={{ color: "#A8AC9D", fontFamily: "var(--font-prompt), sans-serif" }}
          >
            {group.label}
          </h3>
          {group.entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
}
