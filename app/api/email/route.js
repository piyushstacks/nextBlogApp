import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";

export async function POST(request) {
  try {
    await ConnectDB();
    
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, msg: "Invalid email format" }, { status: 400 });
    }

    await EmailModel.create({ email });

    return NextResponse.json({ success: true, msg: "Email Subscribed" }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ success: false, msg: "Failed to fetch emails" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB();
    
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, msg: "Email ID required" }, { status: 400 });
    }

    const deletedEmail = await EmailModel.findByIdAndDelete(id);
    if (!deletedEmail) {
      return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Email Deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE API Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}
