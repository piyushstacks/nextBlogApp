import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";

export async function POST(request) {
  try {
    await ConnectDB();
    console.log("Connected to database");

    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: false, msg: "Image is required" }, { status: 400 });
    }

    // Convert image to Buffer
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type || 'image/jpeg'; // Fallback if type is missing

    console.log("Uploading to Cloudinary with type:", mimeType);
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key_length: process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.length : 0
    });
    
    try {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        `data:${mimeType};base64,${Buffer.from(fileBuffer).toString("base64")}`,
        { folder: "blogs" }
      );

      if (!uploadedImage.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      console.log("Image uploaded successfully:", uploadedImage.secure_url);

      // Save blog details in MongoDB
      const blogData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        author: formData.get("author"),
        image: uploadedImage.secure_url,
        imagePublicId: uploadedImage.public_id,
        authorImg: formData.get("authorImg"),
      };

      const newBlog = await BlogModel.create(blogData);
      console.log("✅ Blog Saved:", newBlog._id);

      return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (cloudinaryError) {
      console.error("Cloudinary Error:", cloudinaryError);
      return NextResponse.json(
        { success: false, msg: "Image upload failed", error: cloudinaryError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ POST Error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to upload blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await ConnectDB();

    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });

  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB();

    const blogId = request.nextUrl.searchParams.get('id');
    if (!blogId) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (blog.imagePublicId) {
      await cloudinary.v2.uploader.destroy(blog.imagePublicId);
    }

    // Delete blog from MongoDB
    await BlogModel.findByIdAndDelete(blogId);
    console.log(`✅ Blog Deleted: ${blogId}`);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });

  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to delete blog", error: error.message },
      { status: 500 }
    );
  }
}