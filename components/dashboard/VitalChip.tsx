import Ring from "@/components/Ring";
import { Flame, Droplets, Moon, LucideIcon } from "lucide-react";

interface VitalChipProps {
  icon: "flame" | "drop" | "moon";
  label: string;
  value: string;
  unit: string;
  ringValue: number;
  color: string;
  track: string;
  note?: string; // optional secondary line, e.g. protein total
}

const ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  drop: Droplets,
  moon: Moon,
};

export default function VitalChip({
  icon,
  label,
  value,
  unit,
  ringValue,
  color,
  track,
  note,
}: VitalChipProps) {
  const Icon = ICONS[icon];

  return (
    <div
      className="flex-1 flex items-center gap-4 rounded-[22px] px-5 py-[18px]"
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.75)",
        boxShadow: "0 10px 24px -18px rgba(31,42,27,0.12)",
      }}
    >
      <Ring size={46} strokeWidth={5} value={ringValue} color={color} track={track}>
        <Icon size={14} color={color} strokeWidth={1.6} />
      </Ring>
      <div className="min-w-0">
        <div
          className="text-[11.5px] font-medium mb-[3px]"
          style={{ color: "#7A816F", letterSpacing: "0.3px" }}
        >
          {label}
        </div>
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[22px] font-normal tracking-[-0.3px] leading-none"
            style={{
              fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif",
              color: "#1F2A1B",
            }}
          >
            {value}
          </span>
          <span
            className="text-[12px] font-light"
            style={{
              fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif",
              color: "#7A816F",
            }}
          >
            {unit}
          </span>
        </div>
        {note && (
          <div
            className="text-[11px] mt-[3px]"
            style={{
              fontFamily: "var(--font-prompt), 'IBM Plex Sans Thai', Inter, sans-serif",
              color: "#A8AC9D",
            }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
