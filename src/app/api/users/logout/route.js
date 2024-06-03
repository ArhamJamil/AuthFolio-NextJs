import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const response = NextResponse.json({ message: "Logged out successfully", status: true });

    response.cookies.set("authToken", "", {
      httpOnly: true,
      maxAge: 0, // Expire the cookie immediately

    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
