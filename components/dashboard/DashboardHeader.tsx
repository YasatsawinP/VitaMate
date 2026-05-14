import { Bell } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { label: "วันนี้", active: true },
  { label: "คุยกับ Vita", active: false },
  { label: "สมุดบันทึก", active: false },
];

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-14 py-4 sm:py-[22px]">
      <div className="flex items-center gap-2.5">
        <Logo size={26} color="#6E8961" />
        <span
          className="text-[19px] tracking-[-0.2px] font-normal"
          style={{ fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif", color: "#3D4F33" }}
        >
          VitaMate
        </span>
      </div>

      <nav className="hidden sm:flex items-center gap-1.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`px-4 py-2 rounded-full text-[13.5px] cursor-pointer transition-colors ${
              item.active
                ? "font-medium bg-white/70"
                : "font-normal bg-transparent"
            }`}
            style={{
              color: item.active ? "#3D4F33" : "#7A816F",
              border: item.active ? "1px solid #E4ECDB" : "1px solid transparent",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 sm:gap-3.5">
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
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[14px] sm:text-[15px] font-medium"
          style={{
            background: "#D9C8A4",
            color: "#A86442",
            fontFamily: "var(--font-kanit), sans-serif",
            border: "2px solid rgba(255,255,255,0.85)",
          }}
        >
          ม
        </div>
      </div>
    </header>
  );
}
