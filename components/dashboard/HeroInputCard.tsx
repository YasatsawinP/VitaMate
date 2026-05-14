"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, Mic, Apple, ArrowRight, Sparkles, Loader2 } from "lucide-react";

const ACTION_CHIPS = [
  { icon: Camera, label: "ถ่ายรูปแทน" },
  { icon: Mic, label: "พูดได้นะ" },
  { icon: Apple, label: "มื้อก่อนหน้า" },
] as const;

interface HeroInputCardProps {
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
}

export default function HeroInputCard({ onSubmit, isSubmitting }: HeroInputCardProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEmpty = text.trim() === "";
  const canSubmit = !isEmpty && !isSubmitting;

  // Auto-resize: shrink first, then grow to content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    await onSubmit(text.trim());
  }, [canSubmit, onSubmit, text]);

  // Cmd/Ctrl+Enter submits; Enter alone is a newline (natural Thai flow)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !isComposing) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit, isComposing]
  );

  return (
    <div
      className="rounded-[22px] sm:rounded-[28px] px-5 sm:px-6 pt-4 sm:pt-5 pb-3.5"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: isFocused
          ? "1px solid rgba(110,137,97,0.40)"
          : "1px solid rgba(255,255,255,0.75)",
        boxShadow: isFocused
          ? "0 1px 0 rgba(31,42,27,0.03), 0 24px 60px -28px rgba(31,42,27,0.20), 0 60px 110px -60px rgba(61,79,51,0.22)"
          : "0 1px 0 rgba(31,42,27,0.03), 0 20px 50px -28px rgba(31,42,27,0.16), 0 50px 100px -60px rgba(61,79,51,0.18)",
        transition: "border-color 0.2s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #3D4F33, #6E8961)",
              boxShadow: "0 6px 14px -6px rgba(61,79,51,0.45)",
            }}
          >
            {isSubmitting ? (
              <Loader2 size={14} color="#fff" strokeWidth={2} className="animate-spin" />
            ) : (
              <Sparkles size={14} color="#fff" strokeWidth={1.6} />
            )}
          </div>
          <span
            className="text-[13px] font-medium transition-opacity duration-200"
            style={{ color: "#3D4A36" }}
          >
            {isSubmitting ? "Vita กำลังคิด…" : "เล่าให้ Vita ฟังหน่อย ว่าวันนี้ทานอะไร"}
          </span>
        </div>
        <span
          className="text-[12px] font-light hidden sm:block"
          style={{
            color: "#7A816F",
            opacity: isFocused ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          ไม่ต้องนับแคลอรี่ — แค่เล่าก็พอ
        </span>
      </div>

      {/* Controlled textarea — Thai IME-safe */}
      <textarea
        ref={textareaRef}
        value={text}
        rows={2}
        disabled={isSubmitting}
        placeholder="พิมพ์เล่ามื้ออาหารของคุณ…"
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="w-full resize-none bg-transparent border-none outline-none block"
        style={{
          fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif",
          fontSize: 19,
          fontWeight: 300,
          lineHeight: 1.55,
          color: "#1F2A1B",
          padding: "4px 2px",
          minHeight: 56,
          opacity: isSubmitting ? 0.45 : 1,
          transition: "opacity 0.2s ease",
          // Placeholder color via CSS, since Tailwind's placeholder: classes may not chain inline
        }}
      />

      {/* Placeholder color override */}
      <style>{`
        textarea::placeholder { color: #A8AC9D; }
      `}</style>

      {/* Tool row */}
      <div
        className="flex items-center gap-2 mt-2.5 pt-3"
        style={{ borderTop: "1px solid rgba(31,42,27,0.05)" }}
      >
        <div className="flex gap-1.5 flex-wrap flex-1">
          {ACTION_CHIPS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-normal"
              style={{
                background: "#FBF7EE",
                border: "1px solid rgba(31,42,27,0.05)",
                color: "#3D4A36",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.4 : 1,
                transition: "opacity 0.2s ease, background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = "#EEF2E5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#FBF7EE";
              }}
            >
              <Icon size={12} strokeWidth={1.6} />
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-medium flex-shrink-0"
          style={{
            background: canSubmit ? "#3D4F33" : "#C8CCBF",
            boxShadow: canSubmit ? "0 8px 18px -8px rgba(61,79,51,0.5)" : "none",
            cursor: canSubmit ? "pointer" : "not-allowed",
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          {isSubmitting ? (
            <>
              <span style={{ opacity: 0.85 }}>กำลังดู</span>
              <span className="flex items-center gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] h-[3px] rounded-full bg-white/75 animate-bounce"
                    style={{ animationDelay: `${i * 0.12}s`, animationDuration: "0.8s" }}
                  />
                ))}
              </span>
            </>
          ) : (
            <>
              ให้ Vita ช่วยดู
              <ArrowRight size={13} strokeWidth={2} />
            </>
          )}
        </button>
      </div>

      {/* Keyboard shortcut hint — appears when focused and non-empty */}
      <div
        className="text-right text-[11px] overflow-hidden"
        style={{
          color: "#A8AC9D",
          maxHeight: isFocused && !isEmpty && !isSubmitting ? 24 : 0,
          marginTop: isFocused && !isEmpty && !isSubmitting ? 6 : 0,
          opacity: isFocused && !isEmpty && !isSubmitting ? 1 : 0,
          transition: "max-height 0.2s ease, opacity 0.2s ease, margin-top 0.2s ease",
        }}
      >
        ⌘ Enter เพื่อส่ง
      </div>
    </div>
  );
}
