import VitalChip from "./VitalChip";

interface VitalStripProps {
  calories: number;
  protein: number;
  calorieGoal: number;
  proteinGoal: number;
  waterGoal: number;        // ml
  waterDrankMl: number;     // ml logged today
  sleepMin: number;         // hours
  sleepMax: number;         // hours
  sleepLoggedMin: number | null; // minutes logged, null = not yet recorded
}

function fmt(n: number): string {
  return n >= 1000
    ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, "0")}`
    : String(n);
}

function fmtSleep(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h} ชม. ${m}` : `${h} ชม.`;
}

export default function VitalStrip({
  calories, protein, calorieGoal, proteinGoal,
  waterGoal, waterDrankMl,
  sleepMin, sleepMax, sleepLoggedMin,
}: VitalStripProps) {
  const calorieRing   = calorieGoal > 0 ? Math.min(calories / calorieGoal, 1) : 0;

  const waterGlasses     = Math.round(waterGoal / 250);
  const waterDrankGlasses = Math.round(waterDrankMl / 250);
  const waterRing        = waterGoal > 0 ? Math.min(waterDrankMl / waterGoal, 1) : 0;
  const waterLiters      = waterGoal / 1000;
  const waterLiterStr    = Number.isInteger(waterLiters) ? String(waterLiters) : waterLiters.toFixed(1);

  const sleepRing = sleepLoggedMin !== null
    ? Math.min(sleepLoggedMin / (sleepMax * 60), 1)
    : 0;
  const sleepValue = sleepLoggedMin !== null ? fmtSleep(sleepLoggedMin) : "–";
  const sleepUnit  = sleepLoggedMin !== null ? "เมื่อคืน" : "ยังไม่ได้บันทึก";
  const sleepNote  = `เป้า ${sleepMin}–${sleepMax} ชม.`;

  const proteinNote =
    proteinGoal > 0
      ? protein > 0
        ? `โปรตีน ${protein}/${proteinGoal} ก.`
        : `เป้าโปรตีน ${proteinGoal} ก./วัน`
      : undefined;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-none">
      <div className="snap-start flex-none w-[220px] sm:flex-1 sm:w-auto">
        <VitalChip
          icon="flame"
          label="พลังงานวันนี้"
          value={fmt(calories)}
          unit={`จาก ${fmt(calorieGoal)}`}
          ringValue={calorieRing}
          color="#C77B57"
          track="#F2E3D6"
          note={proteinNote}
        />
      </div>
      <div className="snap-start flex-none w-[200px] sm:flex-1 sm:w-auto">
        <VitalChip
          icon="drop"
          label="น้ำดื่ม"
          value={String(waterDrankGlasses)}
          unit={`จาก ${waterGlasses} แก้ว`}
          ringValue={waterRing}
          color="#8FB0C4"
          track="#E5EDF2"
          note={`≈ ${waterLiterStr} ล./วัน`}
        />
      </div>
      <div className="snap-start flex-none w-[220px] sm:flex-1 sm:w-auto">
        <VitalChip
          icon="moon"
          label="การนอนคืนที่ผ่านมา"
          value={sleepValue}
          unit={sleepUnit}
          ringValue={sleepRing}
          color="#9890B0"
          track="#ECE7F0"
          note={sleepNote}
        />
      </div>
    </div>
  );
}
