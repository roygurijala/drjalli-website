"use client";

import { useState } from "react";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-brand-dark"
      >
        {open ? "Close chat" : "Questions about the clinic?"}
      </button>

      {open && (
        <div className="fixed bottom-16 right-4 z-40 w-80 max-w-[90vw] rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b px-3 py-2">
            <p className="text-xs font-semibold text-slate-900">
              Clinic Information Assistant
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              This chatbot can answer questions about hours, services, and
              logistics. For medical questions, please call the office or use
              the patient portal. Do not enter personal medical information.
            </p>
          </div>
          <div className="h-60 overflow-y-auto px-3 py-2 text-[11px] text-slate-700">
            <p>Coming soon: smart answers based on the clinic website.</p>
            <ul className="mt-2 list-disc pl-4">
              <li>“What are your office hours?”</li>
              <li>“Where are you located?”</li>
              <li>“What services do you provide?”</li>
              <li>“Do you accept my insurance?”</li>
            </ul>
          </div>
          <div className="border-t px-3 py-2">
            <p className="text-[10px] text-slate-500">
              This feature is for general practice information only and is not a
              substitute for professional medical advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
