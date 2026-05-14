import VitalChip from "./VitalChip";

interface VitalStripProps {
  calories: number;
  protein: number;
  calorieGoal: number;
  proteinGoal: number;
  waterGoal: number;    // ml — converted to glasses (÷250) internally
  sleepMin: number;
  sleepMax: number;
}

function fmt(n: number): string {
  return n >= 1000
    ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, "0")}`
    : String(n);
}

export default function VitalStrip({
  calories, protein, calorieGoal, proteinGoal, waterGoal, sleepMin, sleepMax,
}: VitalStripProps) {
  const calorieRing  = calorieGoal > 0 ? Math.min(calories / calorieGoal, 1) : 0;
  const waterGlasses = Math.round(waterGoal / 250);
  const waterDrank   = 5; // mocked — water tracking not implemented yet
  const waterRing    = waterGlasses > 0 ? Math.min(waterDrank / waterGlasses, 1) : 0.62;

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
          value={String(waterDrank)}
          unit={`จาก ${waterGlasses} แก้ว`}
          ringValue={waterRing}
          color="#8FB0C4"
          track="#E5EDF2"
        />
      </div>
      <div className="snap-start flex-none w-[220px] sm:flex-1 sm:w-auto">
        <VitalChip
          icon="moon"
          label="การนอนคืนที่ผ่านมา"
          value="7 ชม. 12 นาที"
          unit={`เป้า ${sleepMin}–${sleepMax} ชม.`}
          ringValue={7.2 / sleepMax}
          color="#9890B0"
          track="#ECE7F0"
        />
      </div>
    </div>
  );
}
