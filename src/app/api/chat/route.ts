// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TZ = "America/New_York";
const PATIENT_PORTAL_URL =
  process.env.NEXT_PUBLIC_PATIENT_PORTAL_URL ||
  "https://30779-1.portal.athenahealth.com/";

/* =========================
   TIME & HOURS HELPERS
   ========================= */
type ZonedNow = {
  weekday: number; // 0=Sun..6=Sat in ET
  hour: number;    // 0..23 ET
  minute: number;  // 0..59 ET
  label: string;   // e.g., Wed, 2:45 PM ET
};

function getZonedNow(): ZonedNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const wdShort = get("weekday"); // Sun..Sat
  const weekdayIndex = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(wdShort);

  let hour = parseInt(get("hour") || "0", 10);
  const minute = parseInt(get("minute") || "0", 10);
  const dayPeriod = get("dayPeriod"); // AM/PM

  if (dayPeriod.toLowerCase() === "pm" && hour !== 12) hour += 12;
  if (dayPeriod.toLowerCase() === "am" && hour === 12) hour = 0;

  const label = `${wdShort}, ${parts
    .filter((p) => p.type === "hour" || p.type === "minute" || p.type === "dayPeriod" || p.type === "literal")
    .map((p) => p.value)
    .join("")} ET`.replace(" ,", ",");

  return { weekday: weekdayIndex, hour, minute, label };
}

type OpenStatus = {
  isOpen: boolean;
  minutesToChange: number; // until close if open, or until open if closed
  nextChange: "closes" | "opens";
};

function getOpenStatus(now: ZonedNow): OpenStatus {
  // Office hours: Mon–Fri 09:00–17:00 ET
  const isWeekday = now.weekday >= 1 && now.weekday <= 5;
  const minutes = now.hour * 60 + now.minute;
  const openMin = 9 * 60;
  const closeMin = 17 * 60;

  if (isWeekday && minutes >= openMin && minutes < closeMin) {
    return { isOpen: true, minutesToChange: closeMin - minutes, nextChange: "closes" };
  }
  // closed → compute minutes to next weekday 09:00
  if (isWeekday && minutes < openMin) {
    return { isOpen: false, minutesToChange: openMin - minutes, nextChange: "opens" };
  }
  // find next Mon–Fri 09:00
  let d = now.weekday;
  let mins = minutes;
  let daysAhead = 1;
  let nextDay = (d + 1) % 7;
  while (!(nextDay >= 1 && nextDay <= 5)) {
    daysAhead++;
    nextDay = (nextDay + 1) % 7;
  }
  const minsToMidnight = 24 * 60 - mins;
  const minutesToNextOpen = minsToMidnight + (daysAhead - 1) * 24 * 60 + 9 * 60;
  return { isOpen: false, minutesToChange: minutesToNextOpen, nextChange: "opens" };
}

function formatDuration(totalMins: number) {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h > 0 && m > 0) return `${h} ${h === 1 ? "hour" : "hours"} ${m} ${m === 1 ? "minute" : "minutes"}`;
  if (h > 0) return `${h} ${h === 1 ? "hour" : "hours"}`;
  return `${m} ${m === 1 ? "minute" : "minutes"}`;
}
function formatDurationEs(totalMins: number) {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h > 0 && m > 0) return `${h} ${h === 1 ? "hora" : "horas"} y ${m} ${m === 1 ? "minuto" : "minutos"}`;
  if (h > 0) return `${h} ${h === 1 ? "hora" : "horas"}`;
  return `${m} ${m === 1 ? "minuto" : "minutos"}`;
}

/* =========================
   TOPIC DETECTORS
   ========================= */
function isWeightManagementQuery(text: string) {
  const t = text.toLowerCase();
  return [
    "weight loss","weight management","lose weight","obesity","bmi",
    "metabolic","metabolism","inbody","body composition","body fat",
    "nutrition","diet plan","semaglutide","ozempic","wegovy"
  ].some(k => t.includes(k));
}
function isOpenNowQuery(text: string) {
  const t = text.toLowerCase();
  const en = /(open|closed|close|closing|hours|today|now|are you open|are you closed)/i.test(t);
  const es = /(abierto|cerrado|horario|hoy|ahora|están abiertos|están cerrados)/i.test(t);
  return en || es;
}
function isProvidersQuery(text: string) {
  const t = text.toLowerCase();
  return /(providers?|doctors?|physicians?|clinicians?|who works|who are the doctors)/i.test(t)
      || /(proveedores|médicos|doctores|clínicos|quiénes son)/i.test(t);
}
function isInsuranceQuery(text: string) {
  const t = text.toLowerCase();
  return /(insurance|insurances|accept|in network|plan|medicare|medicaid|uhc|aetna|cigna|bcbs|carefirst|geha|priority partners|johns hopkins|amerigroup|wellpoint|umr)/i.test(t)
      || /(seguro|seguros|aseguranza|aceptan|red|medicare|medicaid|uhc|aetna|cigna|bcbs|carefirst|geha)/i.test(t);
}
function seemsSpanish(text: string) {
  const t = text.toLowerCase();
  return /(¿|¡|hola|buenos|gracias|por favor|abierto|cerrado|horario|hoy|ahora|están|aseguranza|seguro)/i.test(t);
}

/* =========================
   MAIN HANDLER
   ========================= */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const lastUserMsg =
      [...messages].reverse().find((m: any) => m.role === "user")?.content ?? "";
    const userEs = seemsSpanish(lastUserMsg);

    const systemMessage = {
      role: "system" as const,
      content: `
You are the friendly virtual assistant for "Dr. Jalli MD PC" in Rockville, Maryland.

RULES
- Provide general clinic information only (no medical advice, diagnosis, or treatment).
- For emergencies: instruct to call 911. For urgent/personal medical issues: call (301) 686-8554.
- Detect English vs. Spanish and respond in the SAME language.
- Use **Markdown**, short paragraphs, bold labels, and line breaks.

**Office Hours:**
**Monday–Friday:** 9:00 AM – 5:00 PM  
**Saturday & Sunday:** Closed  

**Address:**  
2401 Research Blvd, Suite 330  
Rockville, MD 20854  

**Phone:**  
(301) 686-8554  

**Patient Portal:**  
${PATIENT_PORTAL_URL}

**Our Providers:**

**Dr. Sireesha Jalli, MD, FACP**  
Primary Care Physician  
Board-Certified in Internal Medicine. Fellow of the American College of Physicians. Focus on preventative and relationship-based care.  

<br/>

**Dr. Mythili Vancha, MD**  
Primary Care Physician  
Board-Certified in Internal Medicine. Focus on evidence-based adult primary care.  

<br/>

**Ntoge Penda, CRNP**  
Nurse Practitioner  
Certified Registered Nurse Practitioner providing comprehensive primary care services.  

**Insurances Accepted:**  
Medicare  
CareFirst Medicare Advantage  
Aetna Medicare Advantage  
UHC Medicare Advantage  
BCBS — CareFirst  
Aetna  
Cigna  
United Healthcare  
UMR  
Medicaid  
CareFirst Community  
Maryland Physicians Care  
Wellpoint — Amerigroup  
Priority Partners  
Aetna Better Health (pending; previously enrolled)  
Johns Hopkins Health Plans  
GEHA  

WEIGHT MANAGEMENT (when relevant):
- Emphasize lifestyle & metabolic health (nutrition, movement, sleep, stress).
- Mention InBody body-composition testing (body fat %, skeletal muscle mass, segmental analysis, water balance) to track progress beyond weight.
- Invite them to call (301) 686-8554; established patients may use the Patient Portal.
- Do NOT prescribe or name specific medications; keep it general and supportive.
`.trim(),
    };

    // Primers based on the user's last message
    const primers: { role: "system"; content: string }[] = [];

    // Weight-management nudge
    if (isWeightManagementQuery(lastUserMsg)) {
      primers.push({
        role: "system",
        content:
          "User asks about weight management/metabolic health. Emphasize lifestyle-first care and InBody testing; invite to call (301) 686-8554 or use the Patient Portal. No medical advice.",
      });
    }

    // Providers nudge
    if (isProvidersQuery(lastUserMsg)) {
      primers.push({
        role: "system",
        content:
          "User asks about providers. List each provider in separate blocks with a blank line between, as in the system content.",
      });
    }

    // Insurances nudge
    if (isInsuranceQuery(lastUserMsg)) {
      primers.push({
        role: "system",
        content:
          "User asks about insurance. Provide the 'Insurances Accepted' list clearly, and suggest calling the office to verify coverage.",
      });
    }

    // OPEN/CLOSED real-time primer
    if (isOpenNowQuery(lastUserMsg)) {
      const now = getZonedNow();
      const status = getOpenStatus(now);
      const dur = userEs ? formatDurationEs(status.minutesToChange) : formatDuration(status.minutesToChange);

      const lineEn = status.isOpen
        ? `**Status:** We are **OPEN** right now (as of ${now.label}). We **${status.nextChange} in ${dur}**.`
        : `**Status:** We are **CLOSED** right now (as of ${now.label}). We **${status.nextChange} in ${dur}**.`;

      const lineEs = status.isOpen
        ? `**Estado:** Estamos **ABIERTOS** ahora (a las ${now.label}). **${status.nextChange === "closes" ? "Cerramos" : "Abrimos"} en ${dur}**.`
        : `**Estado:** Estamos **CERRADOS** ahora (a las ${now.label}). **${status.nextChange === "opens" ? "Abrimos" : "Cerramos"} en ${dur}**.`;

      primers.push({
        role: "system",
        content: userEs
          ? `${lineEs} Responde brevemente e incluye el horario (Lunes–Viernes 9:00 AM–5:00 PM) y sugiere llamar al (301) 686-8554 si necesitan ayuda.`
          : `${lineEn} Reply briefly and include weekday hours (Monday–Friday 9:00 AM–5:00 PM) and suggest calling (301) 686-8554 if they need help.`,
      });
    }

    // Call OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.3,
      max_tokens: 600,
      messages: [systemMessage, ...primers, ...messages],
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "I’m sorry, I couldn’t generate a response just now.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong processing your request." },
      { status: 500 }
    );
  }
}
