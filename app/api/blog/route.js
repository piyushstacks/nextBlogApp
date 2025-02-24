import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  return NextResponse.json({ msg: "API WORKING!" });
}

export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) {
      return NextResponse.json({ success: false, msg: "Image is required" }, { status: 400 });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const publicDir = path.join(process.cwd(), "public");
    await mkdir(publicDir, { recursive: true }); // Ensure 'public' exists
    const imagePath = path.join(publicDir, `${timestamp}_${image.name}`);
    await writeFile(imagePath, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    const newBlog = await BlogModel.create(blogData);
    console.log("✅ Blog Saved:", newBlog._id);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { success: false, msg: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
