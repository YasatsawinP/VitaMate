"use client";

import { useState, useCallback } from "react";
import Logo from "@/components/Logo";
import { calculateTargets, GOAL_LABEL_TH } from "@/lib/health/calculateTargets";
import { saveProfile } from "@/lib/health/profileStorage";
import type { UserProfile, DailyTargets, Gender, ActivityLevel, HealthGoal } from "@/lib/types/profile";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

type PartialProfile = {
  name: string;
  age: string;
  gender: Gender | "";
  height: string;
  weight: string;
  activity: ActivityLevel | "";
  goal: HealthGoal | "";
};

// ── Constants ──────────────────────────────────────────────────────────────────

const TOTAL_INPUT_STEPS = 6; // steps 0-5 are input; step 6 is summary

const GENDER_OPTIONS: { value: Gender; emoji: string; label: string }[] = [
  { value: "female", emoji: "♀", label: "หญิง" },
  { value: "male",   emoji: "♂", label: "ชาย" },
  { value: "other",  emoji: "○", label: "ไม่ระบุ" },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; emoji: string; label: string; sub: string }[] = [
  { value: "sedentary", emoji: "🪑", label: "นั่งทำงานเป็นส่วนใหญ่",   sub: "ออฟฟิศ, เรียน, นั่งหน้าจอ" },
  { value: "light",     emoji: "🚶", label: "เคลื่อนไหวบ้าง",           sub: "เดินเล็กน้อย, ยืนบ้าง" },
  { value: "moderate",  emoji: "🏃", label: "ออกกำลังสม่ำเสมอ",         sub: "ออกกำลัง 3–4 วัน/สัปดาห์" },
  { value: "active",    emoji: "💪", label: "ออกกำลังหนักหรืองานที่เคลื่อนไหวมาก", sub: "ทุกวัน หรือเกือบทุกวัน" },
];

const GOAL_OPTIONS: { value: HealthGoal; emoji: string; label: string; sub: string }[] = [
  { value: "maintain",       emoji: "⚖️", label: "รักษาน้ำหนักเดิม",    sub: "คงรูปร่างปัจจุบัน" },
  { value: "lose_weight",    emoji: "📉", label: "ลดน้ำหนัก",           sub: "ลดไขมัน ลดพุง" },
  { value: "gain_muscle",    emoji: "💪", label: "เพิ่มกล้ามเนื้อ",     sub: "เพิ่มมวลกล้ามเนื้อ" },
  { value: "improve_health", emoji: "🌿", label: "ดูแลสุขภาพโดยรวม",   sub: "สุขภาพดี มีพลังงาน" },
];

// ── Shared sub-components ──────────────────────────────────────────────────────

function OptionCard<T extends string>({
  value, selected, emoji, label, sub, onSelect,
}: {
  value: T; selected: boolean; emoji: string; label: string; sub?: string;
  onSelect: (v: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[16px] text-left transition-all duration-200"
      style={{
        background: selected ? "#3D4F33" : "rgba(255,255,255,0.7)",
        border: selected ? "1.5px solid #3D4F33" : "1.5px solid rgba(31,42,27,0.08)",
        color: selected ? "#fff" : "#1F2A1B",
        backdropFilter: "blur(8px)",
        boxShadow: selected ? "0 4px 14px -6px rgba(61,79,51,0.40)" : "none",
      }}
    >
      <span className="text-[22px] flex-shrink-0 leading-none">{emoji}</span>
      <div className="min-w-0">
        <div className="text-[14px] font-medium leading-snug">{label}</div>
        {sub && (
          <div
            className="text-[12px] mt-0.5 leading-snug"
            style={{ color: selected ? "rgba(255,255,255,0.70)" : "#7A816F" }}
          >
            {sub}
          </div>
        )}
      </div>
      {selected && (
        <Check size={15} strokeWidth={2.5} className="ml-auto flex-shrink-0" style={{ color: "#C9DCB4" }} />
      )}
    </button>
  );
}

function NumberInput({
  value, onChange, placeholder, unit, min, max,
}: {
  value: string; onChange: (v: string) => void; placeholder: string;
  unit?: string; min?: number; max?: number;
}) {
  return (
    <div className="flex items-baseline gap-2 justify-center">
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="bg-transparent border-none outline-none text-center"
        style={{
          fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif",
          fontSize: 56,
          fontWeight: 300,
          color: "#3D4F33",
          width: "5ch",
          letterSpacing: "-1px",
          appearance: "textfield",
        }}
      />
      {unit && (
        <span
          className="text-[16px] font-light"
          style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}
        >
          {unit}
        </span>
      )}
    </div>
  );
}

function MetricCard({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-1 rounded-[18px] px-3 py-4"
      style={{
        background: "rgba(255,255,255,0.65)",
        border: "1px solid rgba(255,255,255,0.80)",
        boxShadow: "0 4px 16px -10px rgba(31,42,27,0.12)",
      }}
    >
      <span className="text-[22px] leading-none">{emoji}</span>
      <span
        className="text-[20px] font-normal leading-none mt-0.5"
        style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#1F2A1B" }}
      >
        {value}
      </span>
      <span className="text-[11px] text-center leading-snug" style={{ color: "#7A816F" }}>
        {label}
      </span>
    </div>
  );
}

// ── Main flow ──────────────────────────────────────────────────────────────────

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);
  const [error, setError] = useState("");

  const [data, setData] = useState<PartialProfile>({
    name: "", age: "", gender: "", height: "", weight: "", activity: "", goal: "",
  });

  function update<K extends keyof PartialProfile>(key: K, value: PartialProfile[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setError("");
  }

  function advance(delta: 1 | -1) {
    setDirection(delta === 1 ? "forward" : "back");
    setAnimKey((k) => k + 1);
    setStep((s) => s + delta);
    setError("");
  }

  const validate = useCallback((): boolean => {
    switch (step) {
      case 0:
        if (!data.name.trim()) { setError("กรุณากรอกชื่อของคุณค่ะ"); return false; }
        break;
      case 1: {
        const age = Number(data.age);
        if (!data.age || age < 10 || age > 100) { setError("กรุณากรอกอายุระหว่าง 10–100 ปีค่ะ"); return false; }
        break;
      }
      case 2:
        if (!data.gender) { setError("กรุณาเลือกเพศค่ะ"); return false; }
        break;
      case 3: {
        const h = Number(data.height), w = Number(data.weight);
        if (!data.height || h < 100 || h > 250) { setError("กรุณากรอกส่วนสูงระหว่าง 100–250 ซม.ค่ะ"); return false; }
        if (!data.weight || w < 30 || w > 300)  { setError("กรุณากรอกน้ำหนักระหว่าง 30–300 กก.ค่ะ"); return false; }
        break;
      }
      case 4:
        if (!data.activity) { setError("กรุณาเลือกระดับกิจกรรมค่ะ"); return false; }
        break;
      case 5:
        if (!data.goal) { setError("กรุณาเลือกเป้าหมายของคุณค่ะ"); return false; }
        break;
    }
    return true;
  }, [step, data]);

  function handleNext() {
    if (!validate()) return;
    if (step < TOTAL_INPUT_STEPS) advance(1);
  }

  function handleFinish() {
    const profile: UserProfile = {
      name:     data.name.trim(),
      age:      Number(data.age),
      gender:   data.gender as Gender,
      height:   Number(data.height),
      weight:   Number(data.weight),
      activity: data.activity as ActivityLevel,
      goal:     data.goal as HealthGoal,
    };
    saveProfile(profile);
    onComplete(profile);
  }

  // Targets computed only when on summary step
  const targets: DailyTargets | null =
    step === TOTAL_INPUT_STEPS && data.gender && data.activity && data.goal
      ? calculateTargets({
          name:     data.name.trim(),
          age:      Number(data.age),
          gender:   data.gender as Gender,
          height:   Number(data.height),
          weight:   Number(data.weight),
          activity: data.activity as ActivityLevel,
          goal:     data.goal as HealthGoal,
        })
      : null;

  const progress = Math.min(step + 1, TOTAL_INPUT_STEPS) / TOTAL_INPUT_STEPS;
  const name = data.name.trim() || "คุณ";

  // ── Step renderers ───────────────────────────────────────────────────────────

  function renderStep() {
    switch (step) {
      // Step 0: Name
      case 0:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                สวัสดีค่ะ! 👋
              </p>
              <p className="text-[14px] mt-1.5" style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}>
                ยินดีต้อนรับสู่ VitaMate นะคะ{"\n"}ขอรู้จักคุณสักนิดก่อนเริ่มต้นเลยค่ะ
              </p>
            </div>
            <div>
              <label className="text-[13px] font-medium mb-2 block" style={{ color: "#3D4A36" }}>
                คุณชื่อว่าอะไรคะ?
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                placeholder="เช่น มายา, อปป้า, มาร์ค…"
                autoFocus
                className="w-full rounded-[14px] px-4 py-3.5 text-[16px] font-light border outline-none transition-all duration-200"
                style={{
                  fontFamily: "var(--font-prompt), sans-serif",
                  background: "rgba(255,255,255,0.7)",
                  border: "1.5px solid rgba(110,137,97,0.25)",
                  color: "#1F2A1B",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(110,137,97,0.55)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(110,137,97,0.25)"; }}
              />
            </div>
          </div>
        );

      // Step 1: Age
      case 1:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                ยินดีที่รู้จักค่ะ{"\n"}คุณ{name}! 🌿
              </p>
              <p className="text-[14px] mt-1.5" style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}>
                ขอทราบอายุสักนิดนะคะ เพื่อคำนวณค่าพลังงานที่เหมาะกับคุณ
              </p>
            </div>
            <div className="py-2">
              <NumberInput
                value={data.age}
                onChange={(v) => update("age", v)}
                placeholder="25"
                unit="ปี"
                min={10}
                max={100}
              />
            </div>
          </div>
        );

      // Step 2: Gender
      case 2:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                เพศของคุณ{name}คะ?
              </p>
              <p className="text-[14px] mt-1.5" style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}>
                ช่วยให้ Vita คำนวณได้แม่นยำขึ้นนะคะ
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {GENDER_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  selected={data.gender === opt.value}
                  emoji={opt.emoji}
                  label={opt.label}
                  onSelect={(v) => { update("gender", v); }}
                />
              ))}
            </div>
          </div>
        );

      // Step 3: Height + Weight
      case 3:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                ส่วนสูงและ{"\n"}น้ำหนักของคุณค่ะ
              </p>
              <p className="text-[13px] mt-1.5" style={{ color: "#A8AC9D", fontFamily: "var(--font-prompt), sans-serif" }}>
                ข้อมูลนี้เป็นส่วนตัวและเก็บไว้เฉพาะในอุปกรณ์ของคุณเท่านั้นค่ะ
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {/* Height */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-[16px]"
                style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(110,137,97,0.20)" }}
              >
                <span className="text-[14px] font-medium" style={{ color: "#3D4A36" }}>ส่วนสูง</span>
                <div className="flex items-baseline gap-1.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={data.height}
                    onChange={(e) => update("height", e.target.value)}
                    placeholder="165"
                    min={100}
                    max={250}
                    className="bg-transparent border-none outline-none text-right"
                    style={{
                      fontFamily: "var(--font-kanit), sans-serif",
                      fontSize: 28,
                      fontWeight: 300,
                      color: "#3D4F33",
                      width: "4ch",
                    }}
                  />
                  <span className="text-[13px]" style={{ color: "#7A816F" }}>ซม.</span>
                </div>
              </div>
              {/* Weight */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-[16px]"
                style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(110,137,97,0.20)" }}
              >
                <span className="text-[14px] font-medium" style={{ color: "#3D4A36" }}>น้ำหนัก</span>
                <div className="flex items-baseline gap-1.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={data.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    placeholder="60"
                    min={30}
                    max={300}
                    className="bg-transparent border-none outline-none text-right"
                    style={{
                      fontFamily: "var(--font-kanit), sans-serif",
                      fontSize: 28,
                      fontWeight: 300,
                      color: "#3D4F33",
                      width: "4ch",
                    }}
                  />
                  <span className="text-[13px]" style={{ color: "#7A816F" }}>กก.</span>
                </div>
              </div>
            </div>
          </div>
        );

      // Step 4: Activity
      case 4:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                ชีวิตประจำวันของ{"\n"}คุณ{name}เป็นยังไงบ้างคะ?
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {ACTIVITY_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  selected={data.activity === opt.value}
                  emoji={opt.emoji}
                  label={opt.label}
                  sub={opt.sub}
                  onSelect={(v) => update("activity", v)}
                />
              ))}
            </div>
          </div>
        );

      // Step 5: Goal
      case 5:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                เป้าหมายหลักของ{"\n"}คุณ{name}คืออะไรคะ?
              </p>
              <p className="text-[13.5px] mt-1.5" style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}>
                ไม่ต้องกดดันตัวเองนะคะ เลือกที่ตรงกับตอนนี้มากที่สุดเลยค่ะ
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {GOAL_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  selected={data.goal === opt.value}
                  emoji={opt.emoji}
                  label={opt.label}
                  sub={opt.sub}
                  onSelect={(v) => update("goal", v)}
                />
              ))}
            </div>
          </div>
        );

      // Step 6: Summary
      case 6:
        return (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[28px] font-light leading-tight" style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}>
                ยอดเยี่ยมมากเลยค่ะ! ✨
              </p>
              <p className="text-[13.5px] mt-1" style={{ color: "#7A816F", fontFamily: "var(--font-prompt), sans-serif" }}>
                Vita คำนวณเป้าหมายส่วนตัวสำหรับคุณ{name}แล้วค่ะ
              </p>
            </div>

            {/* Profile summary */}
            <div
              className="rounded-[16px] px-4 py-3"
              style={{ background: "rgba(61,79,51,0.06)", border: "1px solid rgba(61,79,51,0.09)" }}
            >
              <p className="text-[13px]" style={{ color: "#3D4A36", fontFamily: "var(--font-prompt), sans-serif" }}>
                {data.name} · {data.age} ปี · {data.height} ซม. · {data.weight} กก.
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: "#7A816F" }}>
                {GOAL_LABEL_TH[data.goal] ?? data.goal}
              </p>
            </div>

            {/* Target metrics */}
            {targets && (
              <div className="grid grid-cols-2 gap-2.5">
                <MetricCard emoji="🔥" value={targets.calories.toLocaleString()} label="แคล/วัน" />
                <MetricCard emoji="💪" value={`${targets.protein} ก.`} label="โปรตีน/วัน" />
                <MetricCard emoji="💧" value={`${Math.round(targets.water / 250)} แก้ว`} label="น้ำ/วัน" />
                <MetricCard emoji="🌙" value={`${targets.sleepMin}–${targets.sleepMax} ชม.`} label="การนอน/คืน" />
              </div>
            )}

            <button
              type="button"
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-[16px] text-[15px] font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #3D4F33, #6E8961)",
                boxShadow: "0 8px 24px -10px rgba(61,79,51,0.55)",
              }}
            >
              เริ่มต้นกับ VitaMate เลยค่ะ!
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        );

      default:
        return null;
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background:
          "radial-gradient(1100px 600px at 85% -10%, #E4ECDB 0%, transparent 60%), " +
          "radial-gradient(800px 500px at -5% 110%, rgba(233,200,180,0.18) 0%, transparent 65%), " +
          "#F4EFE3",
      }}
    >
      <div
        className="w-full max-w-[420px] rounded-[28px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.80)",
          boxShadow:
            "0 1px 0 rgba(31,42,27,0.03), 0 24px 60px -20px rgba(31,42,27,0.18), 0 60px 120px -60px rgba(61,79,51,0.18)",
        }}
      >
        {/* Card header */}
        <div className="px-7 pt-6 pb-0">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Logo size={22} color="#6E8961" />
              <span
                className="text-[17px] tracking-[-0.2px] font-normal"
                style={{ fontFamily: "var(--font-kanit), sans-serif", color: "#3D4F33" }}
              >
                VitaMate
              </span>
            </div>
            {step < TOTAL_INPUT_STEPS && (
              <span className="text-[12px]" style={{ color: "#A8AC9D" }}>
                {step + 1}/{TOTAL_INPUT_STEPS}
              </span>
            )}
          </div>

          {/* Progress bar */}
          {step < TOTAL_INPUT_STEPS && (
            <div className="w-full h-[3px] rounded-full mb-5" style={{ background: "rgba(31,42,27,0.07)" }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress * 100}%`, background: "#6E8961" }}
              />
            </div>
          )}
        </div>

        {/* Step content — key change triggers animation */}
        <div className="px-7 pb-2 overflow-hidden">
          <div
            key={animKey}
            style={{
              animation:
                direction === "forward"
                  ? "vita-onboard-right 0.28s ease-out both"
                  : "vita-onboard-left 0.28s ease-out both",
            }}
          >
            {renderStep()}
          </div>
        </div>

        {/* Navigation */}
        {step < TOTAL_INPUT_STEPS && (
          <div className="px-7 pb-6 pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => step > 0 && advance(-1)}
              className="flex items-center gap-1.5 text-[13.5px] transition-opacity duration-200"
              style={{
                color: "#7A816F",
                opacity: step === 0 ? 0 : 1,
                pointerEvents: step === 0 ? "none" : "auto",
                fontFamily: "var(--font-prompt), sans-serif",
              }}
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              กลับ
            </button>

            {/* Error */}
            <p
              className="text-[12px] text-center flex-1 px-2"
              style={{
                color: "#C77B57",
                fontFamily: "var(--font-prompt), sans-serif",
                opacity: error ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              {error || " "}
            </p>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13.5px] font-medium"
              style={{
                background: "#3D4F33",
                boxShadow: "0 6px 16px -8px rgba(61,79,51,0.50)",
                fontFamily: "var(--font-prompt), sans-serif",
              }}
            >
              ต่อไป
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Bottom padding for summary step */}
        {step === TOTAL_INPUT_STEPS && <div className="pb-7" />}
      </div>
    </div>
  );
}
