import type { VitaResponse } from "@/lib/types/vitamate";

type Template = {
  keywords: string[];
  response: VitaResponse;
};

// ── Meal templates ─────────────────────────────────────────────────────────────

const MEAL_TEMPLATES: Template[] = [
  {
    keywords: ["โยเกิร์ต", "ยอร์ต", "กรีก", "yogurt"],
    response: {
      intent: "meal",
      quote: "เลือกได้น่ารักมากเลยค่ะ มื้อนี้โปรตีนกำลังพอดี",
      quoteEmphasis: " อยู่ท้องไปได้ถึงเที่ยงสบาย ๆ จิบน้ำอุ่นช่วยอีกแก้วจะดีมากเลยค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 320", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 18", unit: "ก." },
        { label: "คาร์บ", value: "≈ 30", unit: "ก." },
        { label: "ไขมัน", value: "≈ 12", unit: "ก." },
      ],
      nutrients: { calories: 320, protein: 18, carbs: 30, fat: 12 },
    },
  },
  {
    keywords: ["ไข่", "egg", "ออมเล็ต", "ต้มยุ่ง", "ดาว", "เจียว", "ลวก"],
    response: {
      intent: "meal",
      quote: "ไข่คือโปรตีนคุณภาพสูงเลยค่ะ มื้อเช้านี้เริ่มต้นได้ดีมาก",
      quoteEmphasis: " ถ้าทานคู่กับผักสักนิดจะช่วยให้สมดุลยิ่งขึ้นนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 220", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 14", unit: "ก." },
        { label: "คาร์บ", value: "≈ 4", unit: "ก." },
        { label: "ไขมัน", value: "≈ 16", unit: "ก." },
      ],
      nutrients: { calories: 220, protein: 14, carbs: 4, fat: 16 },
    },
  },
  {
    keywords: ["กะเพรา", "กระเพรา", "ผัดกะเพรา", "ผัดกระเพรา"],
    response: {
      intent: "meal",
      quote: "กะเพราคลาสสิกเลยค่ะ โปรตีนดีและได้กลิ่นหอมสมุนไพรด้วยนะคะ",
      quoteEmphasis: " ถ้าสั่งไข่ดาวด้วยก็จะได้โปรตีนเพิ่มอีกนิดค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 500", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 30", unit: "ก." },
        { label: "คาร์บ", value: "≈ 52", unit: "ก." },
        { label: "ไขมัน", value: "≈ 18", unit: "ก." },
      ],
      nutrients: { calories: 500, protein: 30, carbs: 52, fat: 18 },
    },
  },
  {
    keywords: ["ข้าวมันไก่", "ข้าวหมก"],
    response: {
      intent: "meal",
      quote: "ข้าวมันไก่ครบสูตรเลยค่ะ โปรตีนดี ข้าวหอม มื้อนี้สมดุลมาก",
      quoteEmphasis: " จิ้มน้ำจิ้มเยอะ ๆ ก็รสชาติดีขึ้นเยอะเลยนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 520", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 32", unit: "ก." },
        { label: "คาร์บ", value: "≈ 55", unit: "ก." },
        { label: "ไขมัน", value: "≈ 18", unit: "ก." },
      ],
      nutrients: { calories: 520, protein: 32, carbs: 55, fat: 18 },
    },
  },
  {
    keywords: ["ข้าว", "ข้าวต้ม", "ข้าวสวย", "ข้าวกล้อง", "ข้าวผัด", "ข้าวราดแกง"],
    response: {
      intent: "meal",
      quote: "ข้าวให้พลังงานที่ค่อย ๆ ปลดปล่อยนะคะ เหมาะกับมื้อนี้มาก",
      quoteEmphasis: " ลองเพิ่มโปรตีนสักนิดจะช่วยให้อิ่มนานขึ้นค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 350", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 8", unit: "ก." },
        { label: "คาร์บ", value: "≈ 68", unit: "ก." },
        { label: "ไขมัน", value: "≈ 3", unit: "ก." },
      ],
      nutrients: { calories: 350, protein: 8, carbs: 68, fat: 3 },
    },
  },
  {
    keywords: ["ต้มยำ", "ต้มข่า", "ต้มแซ่บ"],
    response: {
      intent: "meal",
      quote: "ต้มยำสมุนไพรช่วยระบบย่อยได้ดีมากเลยค่ะ ขิงและตะไคร้มีประโยชน์มาก",
      quoteEmphasis: " ถ้าใส่เนื้อสัตว์ด้วยก็ได้โปรตีนดีเลยนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 200", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 22", unit: "ก." },
        { label: "คาร์บ", value: "≈ 10", unit: "ก." },
        { label: "ไขมัน", value: "≈ 8", unit: "ก." },
      ],
      nutrients: { calories: 200, protein: 22, carbs: 10, fat: 8 },
    },
  },
  {
    keywords: ["ก๋วยเตี๋ยว", "ผัดไทย", "เส้น", "บะหมี่", "ราเมน", "โซบะ", "ก๋วยจั๊บ", "เส้นใหญ่", "เส้นเล็ก"],
    response: {
      intent: "meal",
      quote: "เส้นให้คาร์บที่ดีค่ะ มื้อนี้พลังงานกำลังพอดีสำหรับช่วงบ่าย",
      quoteEmphasis: " ถ้าน้ำซุปเค็มนิดหน่อยก็ดื่มน้ำตามเยอะ ๆ นะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 420", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 16", unit: "ก." },
        { label: "คาร์บ", value: "≈ 62", unit: "ก." },
        { label: "ไขมัน", value: "≈ 10", unit: "ก." },
      ],
      nutrients: { calories: 420, protein: 16, carbs: 62, fat: 10 },
    },
  },
  {
    keywords: ["ส้มตำ", "ลาบ", "น้ำตก", "ยำ"],
    response: {
      intent: "meal",
      quote: "ส้มตำและยำเป็นมื้อที่เบาและสดชื่นมากเลยค่ะ ไฟเบอร์ดีมาก",
      quoteEmphasis: " ถ้าใส่โปรตีนเพิ่มอีกนิดจะสมดุลขึ้นเยอะนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 180", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 8", unit: "ก." },
        { label: "คาร์บ", value: "≈ 28", unit: "ก." },
        { label: "ไขมัน", value: "≈ 5", unit: "ก." },
      ],
      nutrients: { calories: 180, protein: 8, carbs: 28, fat: 5 },
    },
  },
  {
    keywords: ["สลัด", "ผัก", "lettuce", "แตงกวา", "มะเขือเทศ", "กรีนสลัด"],
    response: {
      intent: "meal",
      quote: "สลัดวันนี้ดีมากเลยค่ะ ไฟเบอร์ช่วยให้ระบบย่อยทำงานสดชื่น",
      quoteEmphasis: " เติมโปรตีนนิดหน่อยจะทำให้อิ่มนานขึ้นได้นะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 140", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 5", unit: "ก." },
        { label: "คาร์บ", value: "≈ 18", unit: "ก." },
        { label: "ไขมัน", value: "≈ 6", unit: "ก." },
      ],
      nutrients: { calories: 140, protein: 5, carbs: 18, fat: 6 },
    },
  },
  {
    keywords: ["แกง", "แกงเขียว", "แกงแดง", "แกงมัสมั่น", "แกงกะหรี่", "แกงส้ม", "พะแนง"],
    response: {
      intent: "meal",
      quote: "แกงไทยให้สมุนไพรและไขมันดีจากกะทินะคะ มื้อนี้อิ่มและหอมมาก",
      quoteEmphasis: " ทานคู่กับข้าวกล้องสักนิดก็ได้ไฟเบอร์เพิ่มค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 450", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 24", unit: "ก." },
        { label: "คาร์บ", value: "≈ 38", unit: "ก." },
        { label: "ไขมัน", value: "≈ 26", unit: "ก." },
      ],
      nutrients: { calories: 450, protein: 24, carbs: 38, fat: 26 },
    },
  },
  {
    keywords: ["หมูย่าง", "ไก่ย่าง", "หมูกระทะ", "ย่าง", "บาร์บีคิว", "บีบีคิว"],
    response: {
      intent: "meal",
      quote: "ย่างแบบนี้โปรตีนดีมากเลยค่ะ ไขมันที่ได้ก็เป็นไขมันที่รับได้นะคะ",
      quoteEmphasis: " จิ้มน้ำจิ้มแซ่บสักนิดแล้วทานผักควบคู่ไปด้วยจะดีมากค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 380", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 35", unit: "ก." },
        { label: "คาร์บ", value: "≈ 12", unit: "ก." },
        { label: "ไขมัน", value: "≈ 20", unit: "ก." },
      ],
      nutrients: { calories: 380, protein: 35, carbs: 12, fat: 20 },
    },
  },
  {
    keywords: ["ปลา", "ปลาทอด", "ปลานึ่ง", "ปลาแซลมอน", "ทูน่า", "อาหารทะเล", "กุ้ง", "หอย", "ปลาหมึก"],
    response: {
      intent: "meal",
      quote: "อาหารทะเลดีมากเลยค่ะ โปรตีนสูงและโอเมก้า 3 ช่วยหัวใจและสมอง",
      quoteEmphasis: " ถ้าเป็นปลาทะเลตัวใหญ่ยิ่งได้โภชนาการดีเลยค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 300", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 30", unit: "ก." },
        { label: "คาร์บ", value: "≈ 10", unit: "ก." },
        { label: "ไขมัน", value: "≈ 14", unit: "ก." },
      ],
      nutrients: { calories: 300, protein: 30, carbs: 10, fat: 14 },
    },
  },
  {
    keywords: ["ผลไม้", "กล้วย", "แอปเปิ้ล", "ส้ม", "มะม่วง", "สตรอว์เบอร์รี", "บลูเบอร์รี", "ลำไย", "ทุเรียน", "เงาะ"],
    response: {
      intent: "meal",
      quote: "ผลไม้ให้วิตามินและน้ำตาลธรรมชาติที่ดีมากเลยค่ะ",
      quoteEmphasis: " ทานตอนเช้าช่วยให้ร่างกายตื่นตัวได้ดีนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 120", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 2", unit: "ก." },
        { label: "คาร์บ", value: "≈ 28", unit: "ก." },
        { label: "ไขมัน", value: "≈ 0.5", unit: "ก." },
      ],
      nutrients: { calories: 120, protein: 2, carbs: 28, fat: 1 },
    },
  },
  {
    keywords: ["นม", "โปรตีน", "เวย์", "whey", "shake", "สมูทตี้"],
    response: {
      intent: "meal",
      quote: "ดีมากเลยค่ะ โปรตีนหลังออกกำลังกายช่วยให้กล้ามเนื้อฟื้นตัวได้ดีขึ้น",
      quoteEmphasis: " ดื่มน้ำตามเยอะ ๆ ด้วยนะคะเพื่อให้ร่างกายดูดซึมได้ดี",
      macros: [
        { label: "พลังงาน", value: "≈ 160", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 20", unit: "ก." },
        { label: "คาร์บ", value: "≈ 15", unit: "ก." },
        { label: "ไขมัน", value: "≈ 4", unit: "ก." },
      ],
      nutrients: { calories: 160, protein: 20, carbs: 15, fat: 4 },
    },
  },
  {
    keywords: ["กาแฟ", "coffee", "ลาเต้", "อเมริกาโน", "แคปปูชิโน", "มอคค่า", "โอเลี้ยง"],
    response: {
      intent: "meal",
      quote: "กาแฟช่วยให้สดชื่นได้ค่ะ แต่อย่าลืมจิบน้ำเปล่าสลับด้วยนะคะ",
      quoteEmphasis: " ถ้าเป็นลาเต้ก็ได้แคลเซียมจากนมด้วยค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 80", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 4", unit: "ก." },
        { label: "คาร์บ", value: "≈ 8", unit: "ก." },
        { label: "ไขมัน", value: "≈ 3", unit: "ก." },
      ],
      nutrients: { calories: 80, protein: 4, carbs: 8, fat: 3 },
    },
  },
  {
    keywords: ["ชา", "ชาเขียว", "ชาไทย", "ชานม", "ชามะนาว", "เครื่องดื่ม"],
    response: {
      intent: "meal",
      quote: "ชาเขียวมีสารต้านอนุมูลอิสระที่ดีมากเลยค่ะ ดื่มสม่ำเสมอก็ดีนะคะ",
      quoteEmphasis: " ถ้าไม่ใส่น้ำตาลก็ยิ่งดีต่อสุขภาพค่ะ",
      macros: [
        { label: "พลังงาน", value: "≈ 60", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 1", unit: "ก." },
        { label: "คาร์บ", value: "≈ 14", unit: "ก." },
        { label: "ไขมัน", value: "≈ 1", unit: "ก." },
      ],
      nutrients: { calories: 60, protein: 1, carbs: 14, fat: 1 },
    },
  },
  {
    keywords: ["ขนมปัง", "แซนวิช", "โทสต์", "bread", "sandwich", "ครัวซองต์"],
    response: {
      intent: "meal",
      quote: "ขนมปังให้พลังงานไว — มื้อนี้เริ่มต้นวันได้ดีเลยค่ะ",
      quoteEmphasis: " ถ้าเป็นขนมปังโฮลวีตจะได้ไฟเบอร์เพิ่มนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 260", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 9", unit: "ก." },
        { label: "คาร์บ", value: "≈ 44", unit: "ก." },
        { label: "ไขมัน", value: "≈ 6", unit: "ก." },
      ],
      nutrients: { calories: 260, protein: 9, carbs: 44, fat: 6 },
    },
  },
  {
    keywords: ["โอ๊ต", "granola", "ซีเรียล", "muesli", "โอตมีล"],
    response: {
      intent: "meal",
      quote: "โอ๊ตดีมากเลยค่ะ ไฟเบอร์สูงและปลดปล่อยพลังงานช้า ๆ",
      quoteEmphasis: " อยู่ท้องได้นานจนถึงมื้อกลางวันสบาย ๆ นะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 300", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 10", unit: "ก." },
        { label: "คาร์บ", value: "≈ 50", unit: "ก." },
        { label: "ไขมัน", value: "≈ 7", unit: "ก." },
      ],
      nutrients: { calories: 300, protein: 10, carbs: 50, fat: 7 },
    },
  },
  {
    keywords: ["พิซซ่า", "pizza"],
    response: {
      intent: "meal",
      quote: "พิซซ่าอร่อยนะคะ ทานในปริมาณที่พอดีก็โอเคเลย ค่ะ",
      quoteEmphasis: " ดื่มน้ำตามเยอะ ๆ และทานผักเพิ่มในมื้อต่อไปนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 580", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 22", unit: "ก." },
        { label: "คาร์บ", value: "≈ 65", unit: "ก." },
        { label: "ไขมัน", value: "≈ 25", unit: "ก." },
      ],
      nutrients: { calories: 580, protein: 22, carbs: 65, fat: 25 },
    },
  },
  {
    keywords: ["เบอร์เกอร์", "burger", "แฮมเบอร์เกอร์"],
    response: {
      intent: "meal",
      quote: "เบอร์เกอร์ให้พลังงานและโปรตีนดีเลยค่ะ มื้อนี้อิ่มยาวแน่นอน",
      quoteEmphasis: " มื้อถัดไปลองเน้นผักและของเบาลงนิดนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 520", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 28", unit: "ก." },
        { label: "คาร์บ", value: "≈ 45", unit: "ก." },
        { label: "ไขมัน", value: "≈ 26", unit: "ก." },
      ],
      nutrients: { calories: 520, protein: 28, carbs: 45, fat: 26 },
    },
  },
  {
    keywords: ["เค้ก", "ขนม", "ไอศครีม", "ช็อกโกแลต", "คุกกี้", "มาการอง", "โดนัท", "วาฟเฟิล"],
    response: {
      intent: "meal",
      quote: "ของหวานบางทีก็จำเป็นสำหรับจิตใจนะคะ ทานแล้วมีความสุขก็โอเคค่ะ",
      quoteEmphasis: " แค่สังเกตว่าไม่ทานบ่อยเกินไปก็พอนะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 320", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 4", unit: "ก." },
        { label: "คาร์บ", value: "≈ 52", unit: "ก." },
        { label: "ไขมัน", value: "≈ 12", unit: "ก." },
      ],
      nutrients: { calories: 320, protein: 4, carbs: 52, fat: 12 },
    },
  },
  {
    keywords: ["สุกี้", "ชาบู", "หม้อไฟ"],
    response: {
      intent: "meal",
      quote: "สุกี้และหม้อไฟเป็นมื้อที่อบอุ่นและโปรตีนสูงมากเลยค่ะ",
      quoteEmphasis: " ลองเน้นผักและเนื้อสัตว์มากกว่าเส้นก็ได้นะคะ",
      macros: [
        { label: "พลังงาน", value: "≈ 420", unit: "แคล" },
        { label: "โปรตีน", value: "≈ 30", unit: "ก." },
        { label: "คาร์บ", value: "≈ 38", unit: "ก." },
        { label: "ไขมัน", value: "≈ 14", unit: "ก." },
      ],
      nutrients: { calories: 420, protein: 30, carbs: 38, fat: 14 },
    },
  },
];

// ── Chat templates (non-meal inputs) ──────────────────────────────────────────

const CHAT_TEMPLATES: Template[] = [
  {
    keywords: ["สวัสดี", "หวัดดี", "hello", "hi", "ดีจ้า", "ดีค่ะ"],
    response: {
      intent: "chat",
      quote: "สวัสดีค่ะ 😊 วันนี้เริ่มต้นวันได้ดีไหมคะ มีอะไรให้ Vita ช่วยดูแลบ้างคะ?",
      quoteEmphasis: "",
      macros: [
        { label: "พลังงาน", value: "–", unit: "แคล" },
        { label: "โปรตีน", value: "–", unit: "ก." },
        { label: "คาร์บ", value: "–", unit: "ก." },
        { label: "ไขมัน", value: "–", unit: "ก." },
      ],
      nutrients: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    },
  },
  {
    keywords: ["ขอบคุณ", "ขอบใจ", "thank", "ขอบพระคุณ"],
    response: {
      intent: "chat",
      quote: "ยินดีมากเลยค่ะ 😊 Vita ดีใจที่ได้ช่วยนะคะ มีอะไรอยากเล่าให้ฟังอีกไหมคะ?",
      quoteEmphasis: "",
      macros: [
        { label: "พลังงาน", value: "–", unit: "แคล" },
        { label: "โปรตีน", value: "–", unit: "ก." },
        { label: "คาร์บ", value: "–", unit: "ก." },
        { label: "ไขมัน", value: "–", unit: "ก." },
      ],
      nutrients: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    },
  },
  {
    keywords: ["ลดน้ำหนัก", "ลดความอ้วน", "ออกกำลังกาย", "ฟิต", "diet"],
    response: {
      intent: "chat",
      quote: "Vita พร้อมช่วยค่ะ 💪 เริ่มจากการบันทึกมื้ออาหารทุกวันก็ช่วยได้มากแล้วนะคะ",
      quoteEmphasis: " ลองเล่าให้ฟังหน่อยได้เลยว่าวันนี้ทานอะไรไปบ้างคะ?",
      macros: [
        { label: "พลังงาน", value: "–", unit: "แคล" },
        { label: "โปรตีน", value: "–", unit: "ก." },
        { label: "คาร์บ", value: "–", unit: "ก." },
        { label: "ไขมัน", value: "–", unit: "ก." },
      ],
      nutrients: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    },
  },
  {
    keywords: ["เหนื่อย", "เครียด", "อ่อนเพลีย", "ง่วง", "ไม่สบาย"],
    response: {
      intent: "chat",
      quote: "ฟังแล้วเป็นห่วงนะคะ 🫶 พักผ่อนให้เพียงพอและดื่มน้ำเยอะ ๆ ด้วยนะคะ",
      quoteEmphasis: " ถ้ารู้สึกดีขึ้นแล้ว อย่าลืมทานข้าวดี ๆ ด้วยนะคะ",
      macros: [
        { label: "พลังงาน", value: "–", unit: "แคล" },
        { label: "โปรตีน", value: "–", unit: "ก." },
        { label: "คาร์บ", value: "–", unit: "ก." },
        { label: "ไขมัน", value: "–", unit: "ก." },
      ],
      nutrients: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    },
  },
];

// ── Multiple defaults for variety ──────────────────────────────────────────────

const DEFAULTS: VitaResponse[] = [
  {
    intent: "meal",
    quote: "ฟังแล้วอยู่ท้องดีเลยค่ะ Vita ประมาณไว้ให้แล้วนะคะ",
    quoteEmphasis: " ถ้าอยากให้แม่นขึ้น เล่าให้ละเอียดอีกนิดได้เลยค่ะ",
    macros: [
      { label: "พลังงาน", value: "≈ 380", unit: "แคล" },
      { label: "โปรตีน", value: "≈ 15", unit: "ก." },
      { label: "คาร์บ", value: "≈ 48", unit: "ก." },
      { label: "ไขมัน", value: "≈ 12", unit: "ก." },
    ],
    nutrients: { calories: 380, protein: 15, carbs: 48, fat: 12 },
  },
  {
    intent: "meal",
    quote: "มื้อนี้ฟังดูสมดุลดีค่ะ Vita ประมาณค่าสารอาหารไว้ให้แล้วนะคะ",
    quoteEmphasis: " ดื่มน้ำตามด้วยนะคะเพื่อให้ร่างกายทำงานได้ดีค่ะ",
    macros: [
      { label: "พลังงาน", value: "≈ 420", unit: "แคล" },
      { label: "โปรตีน", value: "≈ 18", unit: "ก." },
      { label: "คาร์บ", value: "≈ 52", unit: "ก." },
      { label: "ไขมัน", value: "≈ 14", unit: "ก." },
    ],
    nutrients: { calories: 420, protein: 18, carbs: 52, fat: 14 },
  },
  {
    intent: "meal",
    quote: "ฟังดูอร่อยมากเลยค่ะ ของอร่อยบางทีก็คือยาที่ดีที่สุดนะคะ",
    quoteEmphasis: " Vita ประมาณสารอาหารคร่าว ๆ ไว้ให้แล้วค่ะ",
    macros: [
      { label: "พลังงาน", value: "≈ 350", unit: "แคล" },
      { label: "โปรตีน", value: "≈ 12", unit: "ก." },
      { label: "คาร์บ", value: "≈ 45", unit: "ก." },
      { label: "ไขมัน", value: "≈ 10", unit: "ก." },
    ],
    nutrients: { calories: 350, protein: 12, carbs: 45, fat: 10 },
  },
  {
    intent: "meal",
    quote: "ขอบคุณที่เล่าให้ฟังนะคะ มื้อนี้พลังงานกำลังดีเลยค่ะ",
    quoteEmphasis: " ทานช้า ๆ เคี้ยวดี ๆ ร่างกายจะดูดซึมได้ดีขึ้นค่ะ",
    macros: [
      { label: "พลังงาน", value: "≈ 400", unit: "แคล" },
      { label: "โปรตีน", value: "≈ 14", unit: "ก." },
      { label: "คาร์บ", value: "≈ 55", unit: "ก." },
      { label: "ไขมัน", value: "≈ 11", unit: "ก." },
    ],
    nutrients: { calories: 400, protein: 14, carbs: 55, fat: 11 },
  },
];

// ── Lookup ─────────────────────────────────────────────────────────────────────

export function generateVitaResponse(text: string): VitaResponse {
  const lower = text.toLowerCase();

  // Check chat patterns first (greetings, wellness questions)
  for (const t of CHAT_TEMPLATES) {
    if (t.keywords.some((k) => lower.includes(k))) return t.response;
  }

  // Check meal patterns
  for (const t of MEAL_TEMPLATES) {
    if (t.keywords.some((k) => lower.includes(k))) return t.response;
  }

  // Random default for variety
  return DEFAULTS[Math.floor(Math.random() * DEFAULTS.length)];
}
