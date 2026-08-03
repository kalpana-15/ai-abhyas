import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { verifyPassword, signToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user in PostgreSQL
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        enrollments: {
          where: { status: "Active" },
          select: { courseId: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: "No account found with this email address. Please click 'Create Account' below to sign up." 
        },
        { status: 401 }
      );
    }

    // Verify password hash against PostgreSQL database record
    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Incorrect password. Please verify your credentials and try again." 
        },
        { status: 401 }
      );
    }

    // Sign session token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.email)}`,
          enrolledCourses: user.enrollments.map((e) => e.courseId),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during sign in" },
      { status: 500 }
    );
  }
}
