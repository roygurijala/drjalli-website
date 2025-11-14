import {
    PRACTICE_NAME,
    PRACTICE_PHONE,
    PRACTICE_ADDRESS_LINE1,
    PRACTICE_CITY_STATE_ZIP,
  } from "@/lib/constants";
  
  export function Footer() {
    return (
      <footer className="border-t bg-white mt-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">{PRACTICE_NAME}</p>
            <p className="text-xs text-slate-600">
              {PRACTICE_ADDRESS_LINE1}, {PRACTICE_CITY_STATE_ZIP}
            </p>
            <p className="text-xs text-slate-600">
              Phone: {PRACTICE_PHONE}
            </p>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {PRACTICE_NAME}. All rights reserved.{" "}
            This website does not provide medical advice. For medical concerns,
            please call the office or use the patient portal.
          </p>
        </div>
      </footer>
    );
  }
  