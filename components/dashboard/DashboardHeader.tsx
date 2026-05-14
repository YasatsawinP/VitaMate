"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import Logo from "@/components/Logo";

// ── Reset helpers ──────────────────────────────────────────────────────────────

const RESET_KEYS = [
  "vitamate_profile_v1",
  "vitamate_entries_v1",
  "vitamate_meals_v1",   // legacy
  "vitamate_water_v1",   // legacy
  "vitamate_sleep_v1",   // legacy
];

function clearDemoData(): void {
  for (const key of RESET_KEYS) {
    localStorage.removeItem(key);
  }
}

// ── Confirmation modal ─────────────────────────────────────────────────────────

function ConfirmResetModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(31,42,27,0.28)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      />

      {/* Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-5 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-[320px] rounded-[28px] px-6 py-7 flex flex-col items-center text-center"
          style={{
            background: "#FDFAF4",
            boxShadow: "0 24px 60px -20px rgba(31,42,27,0.22), 0 8px 20px -8px rgba(31,42,27,0.10)",
            animation: "vita-appear 0.25s ease-out both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] mb-4"
            style={{ background: "rgba(61,79,51,0.08)" }}
          >
            🗑
          </div>

          <h2
            className="text-[17px] font-medium mb-2.5"
            style={{
              fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', sans-serif",
              color: "#1F2A1B",
            }}
          >
            ล้างข้อมูลทดลอง
          </h2>

          <p
            className="text-[13px] leading-relaxed mb-6"
            style={{
              fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', sans-serif",
              color: "#7A816F",
            }}
          >
            ต้องการล้างข้อมูลทดลองทั้งหมดใช่ไหมคะ?
            <br />
            มื้ออาหาร น้ำดื่ม การนอน และโปรไฟล์
            <br />
            จะถูกลบออกทั้งหมดค่ะ
          </p>

          <div className="flex gap-2.5 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-full text-[13.5px] font-medium transition-colors duration-150"
              style={{
                background: "rgba(61,79,51,0.07)",
                color: "#3D4F33",
                fontFamily: "var(--font-prompt), sans-serif",
              }}
            >
              ยกเลิก
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-full text-[13.5px] font-medium text-white transition-opacity duration-150"
              style={{
                background: "#3D4F33",
                fontFamily: "var(--font-prompt), sans-serif",
                boxShadow: "0 4px 12px -6px rgba(61,79,51,0.45)",
              }}
            >
              ล้างข้อมูล
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Avatar menu ────────────────────────────────────────────────────────────────

function AvatarMenu({ initial }: { initial: string }) {
  const [open, setOpen]           = useState(false);
  const [confirming, setConfirming] = useState(false);

  function handleResetClick() {
    setOpen(false);
    setConfirming(true);
  }

  function handleConfirm() {
    clearDemoData();
    window.location.reload();
  }

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[14px] sm:text-[15px] font-medium transition-all duration-150"
        style={{
          background: open ? "#C8B58E" : "#D9C8A4",
          color: "#A86442",
          fontFamily: "var(--font-kanit), sans-serif",
          border: open
            ? "2px solid rgba(168,100,66,0.30)"
            : "2px solid rgba(255,255,255,0.85)",
          boxShadow: open ? "0 0 0 3px rgba(217,200,164,0.35)" : "none",
        }}
      >
        {initial}
      </button>

      {/* Dropdown backdrop (closes on outside click) */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Dropdown card */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-40 min-w-[188px] rounded-[16px] py-1.5 overflow-hidden"
          style={{
            background: "rgba(253,250,244,0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(61,79,51,0.08)",
            boxShadow: "0 12px 32px -12px rgba(31,42,27,0.18), 0 4px 10px -4px rgba(31,42,27,0.08)",
            animation: "vita-appear 0.18s ease-out both",
          }}
        >
          <button
            onClick={handleResetClick}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-[13px] transition-colors duration-100"
            style={{
              fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', sans-serif",
              color: "#7A816F",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(61,79,51,0.05)";
              (e.currentTarget as HTMLButtonElement).style.color = "#3D4F33";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#7A816F";
            }}
          >
            <span className="text-[14px]">🗑</span>
            รีเซ็ตข้อมูลทดลอง
          </button>
        </div>
      )}

      {/* Confirmation modal */}
      {confirming && (
        <ConfirmResetModal
          onCancel={() => setConfirming(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

// ── Tab types ──────────────────────────────────────────────────────────────────

type Tab = "today" | "journal";

interface DashboardHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  name: string;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "today",   label: "วันนี้" },
  { id: "journal", label: "สมุดบันทึก" },
];

// ── Header ─────────────────────────────────────────────────────────────────────

export default function DashboardHeader({ activeTab, onTabChange, name }: DashboardHeaderProps) {
  const initial = name.charAt(0) || "ม";

  return (
    <header className="flex items-center justify-between px-4 sm:px-14 py-4 sm:py-[22px]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <Logo size={26} color="#6E8961" />
        <span
          className="text-[19px] tracking-[-0.2px] font-normal"
          style={{ fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif", color: "#3D4F33" }}
        >
          VitaMate
        </span>
      </div>

      {/* Navigation pills */}
      <nav className="flex items-center gap-1.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-[13.5px] transition-all duration-200"
              style={{
                fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif",
                fontWeight: isActive ? 500 : 400,
                background: isActive ? "rgba(255,255,255,0.75)" : "transparent",
                color: isActive ? "#3D4F33" : "#7A816F",
                border: isActive ? "1px solid #E4ECDB" : "1px solid transparent",
                boxShadow: isActive ? "0 2px 8px -4px rgba(31,42,27,0.14)" : "none",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
        <button
          className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(31,42,27,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Bell size={15} strokeWidth={1.6} style={{ color: "#3D4A36" }} />
        </button>

        <AvatarMenu initial={initial} />
      </div>
    </header>
  );
}
