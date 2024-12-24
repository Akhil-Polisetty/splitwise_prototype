import susers from "@/models/susers";
import connectDB from "@/source/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name"); // Get the name from query parameters

    if (!name) {
      return NextResponse.json({ message: "Name parameter is required" }, { status: 400 });
    }

    await connectDB();

    // Find the user by name and select only the `history` field
    const user = await susers.findOne({ name }, "history");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ history: user.history }, { status: 200 });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ message: "Error fetching history" }, { status: 500 });
  }
}
