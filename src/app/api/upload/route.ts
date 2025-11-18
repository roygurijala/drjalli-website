// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    const fileName =
      (file as any).name || `uploaded-${Date.now()}`; // Next's Blob may have name

    // TODO: Stream this Blob to S3 / storage provider of your choice.
    // Example (pseudo-code):
    // const arrayBuffer = await file.arrayBuffer();
    // await uploadToS3(fileName, Buffer.from(arrayBuffer));

    console.log("Received file:", fileName, "size:", file.size);

    return NextResponse.json(
      {
        status: "ok",
        fileName,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}
