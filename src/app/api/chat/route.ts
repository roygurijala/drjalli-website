// src/app/api/chat/route.ts
// General clinic Q&A only. Production HIPAA compliance for PHI requires appropriate
// vendor agreements (e.g., OpenAI Business Associate Agreement where applicable), policies, and safeguards.
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { MAPS_DIRECTIONS_URL, PRACTICE_PHONE_TEL } from "@/lib/constants";
import { appendChatAnalyticsEvent, type ChatIntent } from "@/lib/chat-analytics";

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

function seemsMentalHealthCrisis(text: string) {
  const t = text.toLowerCase();
  return /\b(suicid|kill myself|end my life|want to die|self[- ]harm|hurt myself)\b/i.test(t);
}

/** Possible acute emergency — prioritize 911 / ER (avoid matching generic “stroke” in FAQ-style questions) */
function seemsAcuteEmergencyQuery(text: string) {
  const t = text.toLowerCase();
  return (
    /\b(i('m| am) having|having)\s+(chest pain|crushing chest|trouble breathing|severe shortness of breath)\b/i.test(t) ||
    /\b(can't breathe|cannot breathe|heart attack)\b/i.test(t) ||
    /\b(having a stroke|symptoms of a stroke|think i'm having a stroke)\b/i.test(t) ||
    /\b(sudden|severe)\s+(face drooping|weakness on one side|slurred speech)\b/i.test(t)
  );
}

/** User may be asking for individualized medical guidance — steer to phone/portal, not chat */
function seemsPersonalMedicalQuery(text: string) {
  if (seemsMentalHealthCrisis(text) || seemsAcuteEmergencyQuery(text)) return false;
  const t = text.toLowerCase();
  return (
    /\b(my (chart|record|labs?|results?|test results?|diagnosis|symptoms?|medications?|meds|prescription|condition|appointment|mri|x-?ray|ct scan))\b/i.test(
      t
    ) || /\b(should i (take|stop|increase|decrease|skip)|is it safe to|what dose|side effect)\b/i.test(t)
  );
}

const MAX_USER_MSG_CHARS = 6000;
const MAX_MESSAGES_IN_REQUEST = 40;

type SuggestedAction = {
  label: string;
  href: string;
  kind: "call" | "portal" | "directions" | "link";
};

function detectIntent(text: string): ChatIntent {
  const t = text.toLowerCase();
  if (seemsMentalHealthCrisis(t)) return "mental-health-crisis";
  if (seemsAcuteEmergencyQuery(t)) return "emergency";
  if (seemsPersonalMedicalQuery(t)) return "personal-medical";
  if (isOpenNowQuery(t)) return "office-hours";
  if (isInsuranceQuery(t)) return "insurance";
  if (isProvidersQuery(t)) return "providers";
  if (isWeightManagementQuery(t)) return "weight-management";
  if (/(location|address|parking|directions|where are you)/i.test(t)) return "location";
  if (/(new patient|first visit|become a patient|new appointment)/i.test(t)) return "new-patient";
  if (/(existing patient|follow up|follow-up|reschedule|refill)/i.test(t)) return "existing-patient";
  return "general";
}

function buildSuggestedActions(intent: ChatIntent): SuggestedAction[] {
  const phoneHref = `tel:+1${PRACTICE_PHONE_TEL}`;
  const callAction: SuggestedAction = { label: "Call Office", href: phoneHref, kind: "call" };
  const portalAction: SuggestedAction = { label: "Open Patient Portal", href: PATIENT_PORTAL_URL, kind: "portal" };
  const directionsAction: SuggestedAction = { label: "Get Directions", href: MAPS_DIRECTIONS_URL, kind: "directions" };

  switch (intent) {
    case "mental-health-crisis":
      return [
        { label: "Call 988", href: "tel:988", kind: "call" },
        { label: "Call 911", href: "tel:911", kind: "call" },
      ];
    case "emergency":
      return [{ label: "Call 911", href: "tel:911", kind: "call" }];
    case "personal-medical":
      return [callAction, portalAction];
    case "office-hours":
      return [callAction, directionsAction];
    case "insurance":
      return [callAction];
    case "providers":
      return [callAction];
    case "new-patient":
      return [callAction, directionsAction];
    case "existing-patient":
      return [portalAction, callAction];
    case "location":
      return [directionsAction, callAction];
    case "weight-management":
      return [callAction, portalAction];
    default:
      return [callAction];
  }
}

function buildFollowUpPrompts(intent: ChatIntent): string[] {
  switch (intent) {
    case "new-patient":
      return [
        "What should I bring to my first visit?",
        "What are your office hours this week?",
      ];
    case "insurance":
      return [
        "Do you accept my insurance plan?",
        "How can I verify coverage before booking?",
      ];
    case "office-hours":
      return [
        "What is your exact address?",
        "How do I schedule an appointment?",
      ];
    case "weight-management":
      return [
        "Tell me about your InBody body composition test.",
        "How do I book a weight management consultation?",
      ];
    case "location":
      return [
        "Where should I park?",
        "What are your office hours?",
      ];
    default:
      return [
        "How do I schedule as a new patient?",
        "What insurances do you accept?",
      ];
  }
}

function sanitizeChatMessages(raw: unknown): { role: "user" | "assistant"; content: string }[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of raw.slice(-MAX_MESSAGES_IN_REQUEST)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: string }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim().slice(0, MAX_USER_MSG_CHARS);
    if (!trimmed) continue;
    out.push({ role, content: trimmed });
  }
  return out.length ? out : null;
}

/* =========================
   MAIN HANDLER
   ========================= */
export async function POST(req: NextRequest) {
  let source = "unknown";
  let intent: ChatIntent = "general";
  try {
    const body = await req.json();
    source = typeof body.source === "string" ? body.source : "unknown";
    const messages = sanitizeChatMessages(body.messages);
    if (!messages) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const userEs = seemsSpanish(lastUserMsg);
    intent = detectIntent(lastUserMsg);

    const systemMessage = {
      role: "system" as const,
      content: `
You are the friendly virtual assistant for "Dr. Jalli MD PC" in Rockville, Maryland.

SCOPE (stay within this)
- Answer questions about the practice: hours, location, parking, providers, services offered in general terms, insurance lists (remind callers to verify with the office), how to become a patient, and how to reach the office or patient portal.
- You may give high-level, non-personal wellness education (e.g., why body composition or preventive visits matter) without tailoring advice to an individual.

STRICTLY OUT OF SCOPE — do not do any of the following
- No medical advice, diagnosis, treatment plans, medication instructions, or interpretation of symptoms, labs, imaging, or vitals for any individual.
- Do not confirm or deny whether someone is a patient, whether they have an appointment, balances, or anything from a medical record.
- Do not ask users to share, and do not encourage sharing of: Social Security numbers, insurance member/plan ID numbers, medical record numbers, full date of birth, detailed symptoms for triage, lab or imaging results, photos of ID or insurance cards, or copies of medical records. If the user pastes such information, do NOT repeat it back in full; briefly acknowledge and tell them to call (301) 686-8554 or use the official patient portal for private matters, and do not store or analyze it.
- Do not claim this chat is private, encrypted, or HIPAA-compliant; it is a general information assistant only.

EMERGENCIES AND URGENT SITUATIONS
- Life-threatening emergency (chest pain, trouble breathing, stroke symptoms, severe bleeding, etc.): tell them to call **911** or go to the nearest ER immediately.
- Mental health crisis or thoughts of self-harm: in the U.S., **988** (Suicide & Crisis Lifeline) or **911** for immediate danger; encourage reaching emergency services — you cannot provide crisis counseling.
- Non-emergency but personal medical questions: direct to **(301) 686-8554** or the patient portal for account-specific help.

LANGUAGE AND FORMAT
- Detect English vs. Spanish and respond in the SAME language as the user’s latest message when reasonable.
- Use **Markdown**, short paragraphs, bold labels, and line breaks.

**Office Hours:**
**Monday–Friday:** 9:00 AM – 5:00 PM  
**Saturday & Sunday:** Closed  

**Address:**  
2401 Research Blvd, Suite 330  
Rockville, MD 20850  

**Phone:**  
(301) 686-8554  

**Patient Portal:**  
${PATIENT_PORTAL_URL}

**Our Providers:**

**Dr. Sireesha Jalli, MD, FACP**  
Primary Care Physician  
Board-Certified in Internal Medicine. Fellow of the American College of Physicians. Focus on preventative and relationship-based care.  

<br/>

**Dr. Mythily Vancha, MD**  
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

IN-OFFICE SERVICES (when relevant):
- The practice offers InBody body composition analysis, ABI (ankle–brachial index) testing for leg circulation/PAD screening when appropriate, allergy testing when clinically indicated, nutrition counseling tied to medical goals, and at-home sleep study kits for qualified patients when clinically appropriate (not everyone is eligible).
- Direct users to call (301) 686-8554 for scheduling; do not give test results or medical advice.

WEIGHT MANAGEMENT (when relevant):
- Emphasize lifestyle & metabolic health (nutrition, movement, sleep, stress).
- Mention InBody body-composition testing (body fat %, skeletal muscle mass, segmental analysis, water balance) to track progress beyond weight.
- Invite them to call (301) 686-8554; established patients may use the Patient Portal.
- Do NOT prescribe or name specific medications; keep it general and supportive.
`.trim(),
    };

    // Primers based on the user's last message (safety and scope first)
    const primers: { role: "system"; content: string }[] = [];

    if (seemsMentalHealthCrisis(lastUserMsg)) {
      primers.push({
        role: "system",
        content:
          "The user may be in psychological crisis. Reply briefly and compassionately with U.S. resources: call or text **988** (Suicide & Crisis Lifeline) or **911** if in immediate danger, or go to the nearest emergency department. Do not provide therapy. Mention (301) 686-8554 only for routine scheduling, not crisis care.",
      });
    } else if (seemsAcuteEmergencyQuery(lastUserMsg)) {
      primers.push({
        role: "system",
        content:
          "The user may describe a possible medical emergency. Tell them to call **911** or go to the nearest emergency room now. Do not give medical instructions. Keep the reply very short.",
      });
    } else if (seemsPersonalMedicalQuery(lastUserMsg)) {
      primers.push({
        role: "system",
        content:
          "The user appears to seek personal medical guidance or account-specific help. Do NOT give individualized medical advice or discuss their chart, appointments, or results. State that this tool only provides general clinic information; direct them to call (301) 686-8554 or use the patient portal for private matters. For emergencies, 911.",
      });
    }

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

    const suggestedActions = buildSuggestedActions(intent);
    const suggestedPrompts = buildFollowUpPrompts(intent);
    const usedFallbackReply = !completion.choices[0]?.message?.content;
    console.info(`[chat-intent] source=${source} intent=${intent}`);
    await appendChatAnalyticsEvent({
      ts: new Date().toISOString(),
      source,
      intent,
      status: "ok",
      usedFallbackReply,
    });

    return NextResponse.json({ reply, intent, suggestedActions, suggestedPrompts });
  } catch (err) {
    console.error(
      "Chat API error:",
      err instanceof Error ? err.message : "unknown"
    );
    await appendChatAnalyticsEvent({
      ts: new Date().toISOString(),
      source,
      intent,
      status: "error",
      usedFallbackReply: true,
    });
    return NextResponse.json(
      { error: "Something went wrong processing your request." },
      { status: 500 }
    );
  }
}
