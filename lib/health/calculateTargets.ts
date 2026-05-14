import type { UserProfile, DailyTargets } from "@/lib/types/profile";

const ACTIVITY_MULTIPLIER: Record<string, number> = {
  sedentary: 1.2,
  light:     1.375,
  moderate:  1.55,
  active:    1.725,
};

const GOAL_DELTA: Record<string, number> = {
  lose_weight:     -400,
  gain_muscle:     +200,
  maintain:        0,
  improve_health:  0,
};

export function calculateTargets(p: UserProfile): DailyTargets {
  // Mifflin-St Jeor BMR
  const bmrMale   = 10 * p.weight + 6.25 * p.height - 5 * p.age + 5;
  const bmrFemale = 10 * p.weight + 6.25 * p.height - 5 * p.age - 161;
  const bmr =
    p.gender === "male"   ? bmrMale :
    p.gender === "female" ? bmrFemale :
    (bmrMale + bmrFemale) / 2;

  const tdee     = Math.round(bmr * (ACTIVITY_MULTIPLIER[p.activity] ?? 1.375));
  const calories = Math.max(1200, tdee + (GOAL_DELTA[p.goal] ?? 0));

  // Protein: g/kg scaled by activity and goal
  const proteinPerKg =
    p.goal === "gain_muscle" ? 2.0 :
    p.activity === "active"   ? 1.8 :
    p.activity === "moderate" ? 1.6 :
    p.activity === "light"    ? 1.4 : 1.2;
  const protein = Math.round(p.weight * proteinPerKg);

  // Water: 35 ml per kg
  const water = Math.round(p.weight * 35);

  // Sleep range by age
  const sleepMin = p.age < 18 ? 8 : 7;
  const sleepMax = p.age < 18 ? 10 : p.age >= 65 ? 8 : 9;

  return { calories, protein, water, sleepMin, sleepMax };
}

// ── Display helpers ────────────────────────────────────────────────────────────

export const GOAL_LABEL_TH: Record<string, string> = {
  maintain:       "รักษาน้ำหนักเดิม",
  lose_weight:    "ลดน้ำหนัก",
  gain_muscle:    "เพิ่มกล้ามเนื้อ",
  improve_health: "ดูแลสุขภาพโดยรวม",
};

export const ACTIVITY_LABEL_TH: Record<string, string> = {
  sedentary: "นั่งทำงานเป็นส่วนใหญ่",
  light:     "เคลื่อนไหวบ้าง",
  moderate:  "ออกกำลังสม่ำเสมอ",
  active:    "ออกกำลังหนัก",
};
