"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import type { VitaResponse, DashboardStatus } from "@/lib/types/vitamate";
import type { AdjustmentId } from "@/lib/mock/vitaResponses";

interface VitaResponseCardProps {
  response: VitaResponse | null;
  status: DashboardStatus;
  responseKey: number;
  onConfirm: () => void;
  onAdjust?: (adj: AdjustmentId) => Promise<void>;
}

/* ── Typing indicator ─────────────────────────────────────────────────────── */

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-[5px] ml-1.5" style={{ verticalAlign: "1px" }}>
      {[0, 0.28, 0.56].map((delay, i) => (
        <span
          key={i}
          className="block w-[4px] h-[4px] rounded-full"
          style={{
            background: "rgba(201,220,180,0.65)",
            animation: `vita-float 1.8s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

/* ── Skeleton while Vita thinks ───────────────────────────────────────────── */

function LoadingSkeleton() {
  return (
    <div>
      <div className="space-y-[11px] mb-5 pt-0.5">
        <div className="h-[21px] rounded-full vita-shimmer-line" style={{ width: "80%" }} />
        <div className="h-[21px] rounded-full vita-shimmer-line" style={{ width: "68%", animationDelay: "0.18s" }} />
        <div className="h-[21px] rounded-full vita-shimmer-line" style={{ width: "44%", animationDelay: "0.36s" }} />
      </div>
      <div className="flex gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {([56, 50, 54, 46] as const).map((w, i) => (
          <div key={i} className="flex-1 space-y-[7px]">
            <div className="h-[9px] rounded-full vita-shimmer-line" style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }} />
            <div className="h-[17px] rounded-full vita-shimmer-line" style={{ width: "62%", animationDelay: `${i * 0.1 + 0.1}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Adjustment chips panel ───────────────────────────────────────────────── */

const ADJUST_CHIPS: { id: AdjustmentId; emoji: string; label: string }[] = [
  { id: "lighter",      emoji: "🥗", label: "เบาลง" },
  { id: "more_protein", emoji: "💪", label: "โปรตีนเพิ่ม" },
  { id: "more_filling", emoji: "🌾", label: "อิ่มนานขึ้น" },
  { id: "less_carbs",   emoji: "✂️", label: "ลดแป้ง" },
  { id: "more_veggies", emoji: "🥦", label: "เพิ่มผัก" },
  { id: "healthier",    emoji: "✨", label: "เพื่อสุขภาพขึ้น" },
];

function AdjustPanel({ onSelect }: { onSelect: (adj: AdjustmentId) => void }) {
  const [selected, setSelected] = useState<AdjustmentId | null>(null);

  function pick(id: AdjustmentId) {
    if (selected) return;
    setSelected(id);
    onSelect(id);
  }

  return (
    <div
      className="mt-3.5 pt-3.5"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.12)",
        animation: "vita-appear 0.28s ease-out both",
      }}
    >
      <p
        className="text-[11px] mb-3 tracking-[0.3px] opacity-55"
        style={{ fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif" }}
      >
        อยากปรับยังไงดีคะ?
      </p>
      <div className="flex flex-wrap gap-2">
        {ADJUST_CHIPS.map((chip) => {
          const isSelected = selected === chip.id;
          const isDimmed = selected !== null && !isSelected;
          return (
            <button
              key={chip.id}
              onClick={() => pick(chip.id)}
              disabled={selected !== null}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12.5px] transition-all duration-200"
              style={{
                fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif",
                background: isSelected
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(255,255,255,0.11)",
                border: isSelected
                  ? "1px solid rgba(255,255,255,0.50)"
                  : "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.92)",
                opacity: isDimmed ? 0.38 : 1,
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                cursor: selected ? "default" : "pointer",
              }}
            >
              <span style={{ fontSize: "13px" }}>{chip.emoji}</span>
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Response content ─────────────────────────────────────────────────────── */

function ResponseContent({
  response,
  animKey,
  onConfirm,
  onAdjust,
}: {
  response: VitaResponse;
  animKey: number;
  onConfirm: () => void;
  onAdjust?: (adj: AdjustmentId) => Promise<void>;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);

  function handleConfirmClick() {
    if (confirmed) return;
    setConfirmed(true);
    setShowAdjust(false);
    onConfirm();
  }

  function handleAdjustSelect(adj: AdjustmentId) {
    setShowAdjust(false);
    onAdjust?.(adj);
  }

  return (
    <div key={animKey} style={{ animation: "vita-appear 0.5s ease-out both" }}>
      {/* Vita's quote */}
      <p
        className="font-light text-[20px] sm:text-[26px] leading-[1.45] tracking-[-0.2px] max-w-[720px] m-0"
        style={{ fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif" }}
      >
        {response.quote}
        <span className="opacity-[0.62]">{response.quoteEmphasis}</span>
      </p>

      {/* Macro row — shown only for meal responses */}
      {response.intent === "meal" && (
        <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {response.macros.map((m, i) => (
            <div
              key={m.label}
              className="flex-1"
              style={{
                paddingLeft: i ? 16 : 0,
                borderLeft: i ? "1px solid rgba(255,255,255,0.10)" : "none",
              }}
            >
              <div className="text-[11px] opacity-55 mb-1">{m.label}</div>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-[19px] font-light"
                  style={{ fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif" }}
                >
                  {m.value}
                </span>
                <span
                  className="text-[11px] opacity-55"
                  style={{ fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif" }}
                >
                  {m.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action row */}
      <div className="flex gap-2 mt-4 items-center">
        {/* Primary action */}
        <button
          onClick={handleConfirmClick}
          disabled={confirmed}
          className="flex items-center gap-1.5 px-[18px] py-2.5 rounded-full text-[13px] font-medium transition-all duration-300"
          style={{
            background: confirmed ? "rgba(255,255,255,0.15)" : "#fff",
            color: confirmed ? "rgba(255,255,255,0.90)" : "#3D4F33",
            border: confirmed ? "1px solid rgba(255,255,255,0.25)" : "none",
            cursor: confirmed ? "default" : "pointer",
          }}
        >
          <Check
            size={13}
            strokeWidth={2.2}
            style={{ color: confirmed ? "rgba(255,255,255,0.90)" : "#3D4F33" }}
          />
          {response.intent === "meal"
            ? (confirmed ? "บันทึกแล้ว" : "ใช่ ตามนี้เลย")
            : (confirmed ? "รับทราบแล้วค่ะ" : "รับทราบค่ะ")}
        </button>

        {/* Meal-only: adjust + continue */}
        {response.intent === "meal" && (
          <>
            <button
              disabled={confirmed}
              onClick={() => { if (!confirmed) setShowAdjust((s) => !s); }}
              className="px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200"
              style={{
                background: showAdjust ? "rgba(255,255,255,0.20)" : "transparent",
                color: showAdjust ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)",
                border: showAdjust
                  ? "1px solid rgba(255,255,255,0.42)"
                  : "1px solid rgba(255,255,255,0.22)",
                cursor: confirmed ? "default" : "pointer",
                opacity: confirmed ? 0.35 : 1,
              }}
            >
              ปรับนิดหน่อย
            </button>

            <button
              disabled={confirmed}
              className="flex items-center gap-1.5 ml-auto text-[13px] transition-opacity duration-300"
              style={{
                color: "rgba(255,255,255,0.7)",
                cursor: confirmed ? "default" : "pointer",
                opacity: confirmed ? 0.35 : 1,
              }}
            >
              คุยต่อ <ArrowRight size={12} strokeWidth={1.6} color="rgba(255,255,255,0.7)" />
            </button>
          </>
        )}
      </div>

      {/* Adjustment chip panel */}
      {showAdjust && !confirmed && (
        <AdjustPanel onSelect={handleAdjustSelect} />
      )}
    </div>
  );
}

/* ── Card shell ───────────────────────────────────────────────────────────── */

export default function VitaResponseCard({
  response,
  status,
  responseKey,
  onConfirm,
  onAdjust,
}: VitaResponseCardProps) {
  const isLoading = status === "loading";

  return (
    <div
      className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] px-5 py-5 sm:px-7 sm:py-6 text-white"
      style={{
        background: "linear-gradient(135deg, #3D4F33 0%, #6E8961 100%)",
        boxShadow: "0 22px 50px -22px rgba(61,79,51,0.45), 0 6px 16px -8px rgba(61,79,51,0.18)",
        animation: "vita-rise 0.45s ease-out both",
      }}
    >
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px 220px at 95% -10%, rgba(255,255,255,0.10), transparent 60%), " +
            "radial-gradient(360px 220px at -5% 110%, rgba(199,123,87,0.19), transparent 70%)",
        }}
      />
      <svg
        width="160" height="160"
        className="absolute pointer-events-none"
        style={{ right: -10, top: -10, opacity: 0.08 }}
        viewBox="0 0 160 160" fill="none"
      >
        <path d="M148 12C68 12 22 50 22 112c0 11 4 21 9 30" stroke="#fff" strokeWidth="1.4" />
        <path d="M148 12c0 76-40 120-100 120-9 0-17-1-25-4" stroke="#fff" strokeWidth="1.4" />
        <path d="M30 148l66-66" stroke="#fff" strokeWidth="1.4" />
      </svg>

      <div className="relative">
        {/* Status row */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: "#C9DCB4",
              animation: isLoading ? "vita-breathe 2.4s ease-in-out infinite" : "none",
              boxShadow: "0 0 0 3px rgba(201,220,180,0.20)",
            }}
          />
          <span className="text-[11.5px] tracking-[0.3px] font-medium opacity-[0.78]">
            {isLoading ? <>Vita กำลังคิด<TypingDots /></> : "Vita · ตอบเมื่อสักครู่"}
          </span>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : response ? (
          <ResponseContent
            response={response}
            animKey={responseKey}
            onConfirm={onConfirm}
            onAdjust={onAdjust}
          />
        ) : null}
      </div>
    </div>
  );
}
