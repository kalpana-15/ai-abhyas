import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
import coursesData from "@/data/courses.json";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "aiabhyas-fallback-secret-key-9f8d7e6c";
const secret = new TextEncoder().encode(JWT_SECRET_KEY);

export const SESSION_COOKIE_NAME = "ai_abhyas_session";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: { userId: string; email: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Valid for 7 days
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ userId: string; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as { userId: string; email: string; role: string };
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
      return null;
    }

    const payload = await verifyToken(sessionCookie);
    if (!payload || !payload.userId) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      include: {
        enrollments: {
          where: { status: "Active" },
          select: { courseId: true, course: { select: { title: true } } },
        },
        payments: {
          select: { courseId: true, courseTitle: true },
        },
      },
    });

    if (!user) {
      return null;
    }

    const rawEnrollmentIds = [
      ...user.enrollments.flatMap((e) => [e.courseId, e.course?.title]),
      ...user.payments.flatMap((p) => [p.courseId, p.courseTitle]),
    ].filter(Boolean) as string[];

    const expandedCourses = Array.from(
      new Set(
        rawEnrollmentIds.flatMap((idOrTitle) => {
          const matched = (coursesData as any[]).find(
            (c) => c.id === idOrTitle || c.title.toLowerCase() === idOrTitle.toLowerCase() || idOrTitle.toLowerCase().includes(c.title.toLowerCase())
          );
          return [idOrTitle, matched?.id, matched?.title].filter(Boolean) as string[];
        })
      )
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`,
      enrolledCourses: expandedCourses,
    };
  } catch (error) {
    console.error("Error checking current user session:", error);
    return null;
  }
}
