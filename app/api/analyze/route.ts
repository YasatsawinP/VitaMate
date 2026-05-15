import { generateJSON, ApiError, toErrorMessage } from "@/lib/ai/gemini";
import { GOAL_LABEL_TH } from "@/lib/health/calculateTargets";

// ── Types ──────────────────────────────────────────────────────────────────────

interface AnalyzeResponse {
  intent: "meal" | "chat" | "unknown";
  message: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface IncomingProfile {
  name: string;
  age: number;
  weight: number;
  goal: string;
  targets: { calories: number; protein: number };
  dailyCalories?: number;
  dailyProtein?: number;
  sleepMin?: number | null;
}

// ── Prompt builder ─────────────────────────────────────────────────────────────

function buildSystemInstruction(profile?: IncomingProfile): string {
  let personalContext = "";
  let dailyContext = "";
  let guidanceRules = "";

  if (profile) {
    personalContext = `\nข้อมูลผู้ใช้:\n- ชื่อ: ${profile.name}\n- อายุ: ${profile.age} ปี\n- น้ำหนัก: ${profile.weight} กก.\n- เป้าหมาย: ${GOAL_LABEL_TH[profile.goal] ?? profile.goal}\n- เป้าพลังงานต่อวัน: ${profile.targets.calories} แคล\n- เป้าโปรตีนต่อวัน: ${profile.targets.protein} ก.\n\nเรียกผู้ใช้ว่าคุณ${profile.name} เป็นครั้งคราว ให้คำแนะนำที่สอดคล้องกับเป้าหมายของเขา/เธอ`;

    const lines: string[] = [];

    if (profile.dailyCalories !== undefined) {
      const remaining = profile.targets.calories - profile.dailyCalories;
      const label = remaining >= 0
        ? `เหลืออีก ${remaining} แคล`
        : `เกินมา ${Math.abs(remaining)} แคล`;
      lines.push(`แคลลอรีที่ทานแล้ววันนี้: ${profile.dailyCalories} / ${profile.targets.calories} แคล (${label})`);
    }
    if (profile.dailyProtein !== undefined) {
      lines.push(`โปรตีนที่ทานแล้ววันนี้: ${profile.dailyProtein} / ${profile.targets.protein} ก.`);
    }
    if (profile.sleepMin != null) {
      const h = Math.floor(profile.sleepMin / 60);
      const m = profile.sleepMin % 60;
      lines.push(`นอนหลับเมื่อคืน: ${m > 0 ? `${h} ชม. ${m} นาที` : `${h} ชั่วโมง`}`);
    }

    if (lines.length > 0) {
      dailyContext = `\n\nสถานะวันนี้:\n${lines.map((l) => `- ${l}`).join("\n")}`;
    }

    if (profile.dailyCalories !== undefined) {
      const remaining = profile.targets.calories - profile.dailyCalories;
      guidanceRules += `\n\nแนวทางตอบเมื่อ intent เป็น "meal":
- ต่อท้าย message ด้วยคำแนะนำมื้อถัดไป 1 ประโยคเสมอ โดยดูจาก remaining calories:
  - เหลือ > 400 แคล → แนะนำทานมื้อต่อไปให้ครบ ระบุอาหารที่เหมาะสม เช่น โปรตีนหรือผัก
  - เกิน > 100 แคล → แนะนำมื้อต่อไปเบาลง เช่น สลัด ซุปใส ผักนึ่ง
  - ต่าง ≤ 100 แคล → ชมเชยว่าใกล้เป้าแล้ว แนะนำรักษาระดับ
- (remaining ปัจจุบัน = ${remaining} แคล)`;
    }

    if (profile.sleepMin != null) {
      guidanceRules += `\n\nแนวทางตอบเมื่อผู้ใช้พูดถึงการนอนหรือความเหนื่อยล้า:
- < 360 นาที (< 6 ชม.) → บอกว่านอนน้อยมาก แนะนำเข้านอนเร็วขึ้นคืนนี้
- 360–420 นาที (6–7 ชม.) → ใกล้เคียงแต่ยังขาด แนะนำเพิ่มอีก 30–60 นาที
- 420–540 นาที (7–9 ชม.) → ดีมาก ชม
- > 540 นาที (> 9 ชม.) → นอนมากไปนิด อาจทำให้เซื่องซึมได้ แนะนำปรับ
- (ข้อมูลการนอนล่าสุด = ${profile.sleepMin} นาที)`;
    }
  }

  return `คุณคือ VitaMate ผู้ช่วยสุขภาพ AI ภาษาไทย

หน้าที่:
- พูดคุยกับผู้ใช้แบบเป็นธรรมชาติ
- วิเคราะห์อาหารเมื่อผู้ใช้พูดถึงอาหาร
- ประเมินสารอาหารแบบคร่าว ๆ
- ให้คำแนะนำสุขภาพที่อบอุ่นและไม่กดดัน

บุคลิก:
- ใจดี
- เป็นกันเอง
- พูดเหมือนเพื่อนดูแลสุขภาพ
- ไม่ใช้ศัพท์วิชาการเยอะ
- ไม่ตัดสินผู้ใช้

กฎสำคัญ:
- ตอบเป็นภาษาไทยเท่านั้น
- ห้ามใช้ Markdown
- ห้ามใส่ \`\`\`json
- ห้ามตอบนอก JSON
- message ต้องสั้น อ่านง่าย อบอุ่น
- ถ้า intent เป็น "unknown" ให้ถามกลับอย่างสุภาพเพื่อขอข้อมูลเพิ่ม${personalContext}${dailyContext}${guidanceRules}

ตอบ JSON format นี้เท่านั้น:
{
  "intent": "chat | meal | unknown",
  "message": "ข้อความภาษาไทย",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number
}

ตัวอย่าง:
Input: สวัสดี
Output: {"intent":"chat","message":"สวัสดีค่ะ 😊 วันนี้กินอะไรมาบ้างหรือยัง?","calories":0,"protein":0,"carbs":0,"fat":0}

Input: ข้าวกะเพราไก่ไข่ดาว
Output: {"intent":"meal","message":"มื้อนี้ได้โปรตีนค่อนข้างดีเลยค่ะ ถ้าเพิ่มผักอีกนิดจะบาลานซ์มากขึ้น","calories":520,"protein":28,"carbs":55,"fat":18}

Input: อยากลดน้ำหนัก
Output: {"intent":"unknown","message":"อยากช่วยค่ะ แต่ขอถามก่อนนะคะ ตอนนี้ทานอาหารมื้อไหนอยู่คะ หรือมีอาหารที่อยากให้ช่วยวิเคราะห์ไหมคะ?","calories":0,"protein":0,"carbs":0,"fat":0}`;
}

// Default instruction (no profile)
const SYSTEM_INSTRUCTION = buildSystemInstruction();

// ── Validation helpers ─────────────────────────────────────────────────────────

function isValidBody(v: unknown): v is { text: string; profile?: IncomingProfile } {
  return (
    typeof v === "object" &&
    v !== null &&
    "text" in v &&
    typeof (v as Record<string, unknown>).text === "string"
  );
}

function isValidResponse(v: unknown): v is AnalyzeResponse {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Record<string, unknown>;
  return (
    (r.intent === "meal" || r.intent === "chat" || r.intent === "unknown") &&
    typeof r.message === "string" &&
    typeof r.calories === "number" &&
    typeof r.protein === "number" &&
    typeof r.carbs === "number" &&
    typeof r.fat === "number"
  );
}

const isDev = process.env.NODE_ENV === "development";

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // 1. Parse + validate body
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidBody(raw)) {
    return Response.json({ error: '"text" (string) is required' }, { status: 400 });
  }

  const text = raw.text.trim();
  if (!text) {
    return Response.json({ error: '"text" must not be empty' }, { status: 400 });
  }
  if (text.length > 600) {
    return Response.json({ error: '"text" must be 600 characters or fewer' }, { status: 400 });
  }

  // 2. Call Gemini (with automatic model fallback via lib/ai/gemini.ts)
  const systemInstruction = raw.profile
    ? buildSystemInstruction(raw.profile)
    : SYSTEM_INSTRUCTION;

  let geminiRaw: string;
  try {
    geminiRaw = await generateJSON(text, {
      systemInstruction,
      temperature: 0.5,
      maxOutputTokens: 512,
    });
  } catch (err) {
    if (err instanceof ApiError && err.status === 429) {
      console.warn("[analyze] rate limit hit");
      return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const msg = toErrorMessage(err);
    console.error("[analyze] Gemini error:", msg);
    return Response.json(
      { error: "Gemini API request failed", ...(isDev && { detail: msg }) },
      { status: 502 }
    );
  }

  // 3. Parse + validate JSON output
  let parsed: unknown;
  try {
    parsed = JSON.parse(geminiRaw);
  } catch (err) {
    const msg = toErrorMessage(err);
    console.error("[analyze] JSON parse failed. Raw:", geminiRaw, "Error:", msg);
    return Response.json(
      { error: "Unexpected response format from AI", ...(isDev && { detail: msg, raw: geminiRaw }) },
      { status: 502 }
    );
  }

  if (!isValidResponse(parsed)) {
    console.error("[analyze] Invalid response shape:", JSON.stringify(parsed));
    return Response.json(
      { error: "Incomplete response from AI", ...(isDev && { received: parsed }) },
      { status: 502 }
    );
  }

  // 4. Return
  return Response.json({
    intent: parsed.intent,
    message: parsed.message,
    calories: Math.round(parsed.calories),
    protein: Math.round(parsed.protein),
    carbs: Math.round(parsed.carbs),
    fat: Math.round(parsed.fat),
  } satisfies AnalyzeResponse);
}
