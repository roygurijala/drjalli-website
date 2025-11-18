// src/app/api/appointments/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      patientType, // "new" | "existing"
      providerName,
      preferredDate,
      preferredTimeOfDay,
      contactPhone,
    } = body;

    // TODO: Here is where you'd call the Athena API with these details.
    // For now, just pretend we accepted it and return a confirmation.

    return NextResponse.json(
      {
        status: "received",
        message:
          "Your appointment request has been received. Our staff will contact you to confirm.",
        echo: {
          patientType,
          providerName,
          preferredDate,
          preferredTimeOfDay,
          contactPhone,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Appointment API error:", error);
    return NextResponse.json(
      { error: "Could not process appointment request." },
      { status: 500 }
    );
  }
}
