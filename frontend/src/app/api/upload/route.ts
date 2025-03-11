import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define file path in /public/uploads
    const filePath = path.join(process.cwd(), "public/uploads", file.name);
    console.log(filePath)
    // Save the file
    await writeFile(filePath, buffer);
    console.log(`File saved: ${filePath}`);

    // Generate the local file URL
    const imageUrl = `/uploads/${file.name}`;

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error handling upload:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
