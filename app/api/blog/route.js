import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
const fs = require('fs');

//API ENDPOINT TO GET ALL BLOGS
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }
  else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}


//API ENDPOINT FOR UPLOADING BLOGS
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


export async function DELETE(request) {
  try {
    await ConnectDB();

    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    // Resolve correct image path
    const imagePath = path.join(process.cwd(), "public", blog.image.replace(/^\/+/, "")); // Remove leading slash if exists

    // Check if the file exists before trying to delete it
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath);
    }

    await BlogModel.findByIdAndDelete(id);
    console.log(`✅ Blog Deleted: ${id}`);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    return NextResponse.json(
      { success: false, msg: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
