import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/auth/me route:", error);
    return NextResponse.json(
      { authenticated: false, user: null, error: "Error checking authentication status" },
      { status: 500 }
    );
  }
}
