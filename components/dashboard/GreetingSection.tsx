"use client";

import { useMemo } from "react";

function getGreeting(hour: number): string {
  if (hour < 12) return "อรุณสวัสดิ์ค่ะ";
  if (hour < 17) return "สวัสดีตอนบ่ายค่ะ";
  return "สวัสดีตอนเย็นค่ะ";
}

export default function GreetingSection({ name }: { name: string }) {
  const { dateStr, timeStr, greeting } = useMemo(() => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const timeStr = now.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { dateStr, timeStr, greeting: getGreeting(now.getHours()) };
  }, []);

  return (
    <div className="text-center pt-1 sm:pt-1.5">
      <div
        className="text-[11.5px] sm:text-[12px] tracking-[0.4px] mb-2 font-normal"
        style={{ color: "#7A816F" }}
      >
        {dateStr} · {timeStr} น.
      </div>
      <h1
        className="m-0 font-light text-[26px] sm:text-[32px] tracking-[-0.4px] leading-[1.2]"
        style={{
          fontFamily: "var(--font-kanit), 'IBM Plex Sans Thai', Inter, sans-serif",
          color: "#3D4F33",
        }}
      >
        {greeting}{" "}
        <em className="not-italic font-normal" style={{ color: "#6E8961" }}>
          คุณ{name}
        </em>
      </h1>
    </div>
  );
}
