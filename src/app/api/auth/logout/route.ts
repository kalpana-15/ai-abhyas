import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);

    return NextResponse.json({ success: true, message: "Successfully logged out" }, { status: 200 });
  } catch (error) {
    console.error("Error in logout route:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while logging out" },
      { status: 500 }
    );
  }
}
