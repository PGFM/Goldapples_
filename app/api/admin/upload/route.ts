import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TOKEN,
  getCmsData,
  saveCmsData,
  type MediaItem,
} from "@/lib/insights-cms";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_TOKEN;
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name).toLowerCase();
    const allowedImageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
    const isPdf = ext === ".pdf";
    const isImage = allowedImageExts.includes(ext);

    if (!isImage && !isPdf) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload an image (.jpg, .png, .webp, .gif, .svg) or PDF (.pdf).",
        },
        { status: 400 },
      );
    }

    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    const fileName = `${Date.now()}-${baseName || "upload"}${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;
    const mediaItem: MediaItem = {
      id: `media-${Date.now()}`,
      name: file.name,
      url: publicUrl,
      type: isPdf ? "pdf" : "image",
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };

    const data = getCmsData();
    data.media.unshift(mediaItem);
    saveCmsData(data);

    return NextResponse.json({
      item: mediaItem,
      url: publicUrl,
      data,
    });
  } catch (err) {
    console.error("File upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: "Missing media id" }, { status: 400 });
    }

    const data = getCmsData();
    const target = data.media.find((m) => m.id === id);
    if (target && target.url.startsWith("/uploads/")) {
      const fullPath = path.join(process.cwd(), "public", target.url);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    data.media = data.media.filter((m) => m.id !== id);
    saveCmsData(data);

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete media item." },
      { status: 500 },
    );
  }
}
