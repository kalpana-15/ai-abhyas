"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import coursesData from "@/data/courses.json";

export async function enrollInCourse(courseIdOrTitle: string) {
  try {
    if (!courseIdOrTitle) {
      return { success: false, error: "Course ID or Title is required" };
    }

    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "You must sign in to your account to enroll in courses",
        unauthenticated: true,
      };
    }

    // 1. Resolve actual course ID and metadata from courses.json or database
    const courseFromJson = (coursesData as any[]).find(
      (c) => 
        c.id.toLowerCase() === courseIdOrTitle.toLowerCase() || 
        c.title.toLowerCase() === courseIdOrTitle.toLowerCase() ||
        courseIdOrTitle.toLowerCase().includes(c.title.toLowerCase()) ||
        c.title.toLowerCase().includes(courseIdOrTitle.toLowerCase())
    ) || coursesData[0];

    const resolvedCourseId = courseFromJson ? courseFromJson.id : (courseIdOrTitle.length <= 5 ? courseIdOrTitle : "c1");

    // 2. Ensure Course record exists in database to avoid Foreign Key constraint violations
    let existingCourse = await db.course.findUnique({
      where: { id: resolvedCourseId },
    });

    if (!existingCourse && courseFromJson) {
      existingCourse = await db.course.create({
        data: {
          id: courseFromJson.id,
          title: courseFromJson.title,
          description: courseFromJson.description || "",
          level: courseFromJson.level || "Intermediate",
          mode: courseFromJson.mode || "Online Interactive",
          status: courseFromJson.status || "Open",
          duration: courseFromJson.duration || "8 Weeks (120 hrs)",
          fee: courseFromJson.fee || "Free",
          eligibility: courseFromJson.eligibility || "",
          skills: courseFromJson.skills || [],
          highlights: courseFromJson.highlights || [],
          image: courseFromJson.image || "/Assets/images/ai masterclase.png",
          instructorName: courseFromJson.instructor?.name || "Nitish Singh",
          instructorTitle: courseFromJson.instructor?.designation || "Lead AI Architect",
          instructorBio: courseFromJson.instructor?.bio || "",
          instructorImage: courseFromJson.instructor?.image || "",
        },
      });
    }

    // 3. Check if enrollment already exists in database
    const existingEnrollment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        OR: [
          { courseId: resolvedCourseId },
          { courseId: courseIdOrTitle }
        ]
      },
    });

    if (existingEnrollment) {
      return {
        success: true,
        message: "You are already actively enrolled in this learning program!",
        alreadyEnrolled: true,
      };
    }

    // 4. Create persistent enrollment record in DB using the valid foreign key resolvedCourseId
    await db.enrollment.create({
      data: {
        userId: user.id,
        courseId: resolvedCourseId,
        status: "Active",
      },
    });

    // Revalidate relevant pages for instant frontend UI reactivity
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard/payments");
    revalidatePath("/enroll");
    revalidatePath("/courses");

    return {
      success: true,
      message: "Successfully registered! The course is now unlocked on your learning dashboard.",
    };
  } catch (error: any) {
    console.error("Error executing course enrollment server action:", error);
    return {
      success: false,
      error: "An unexpected system error occurred while processing your enrollment",
    };
  }
}

export async function getUserEnrollmentRecords() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return [];
    }

    const enrollments = await db.enrollment.findMany({
      where: {
        userId: user.id,
        status: "Active",
      },
      include: {
        course: true,
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });

    return enrollments;
  } catch (error) {
    console.error("Error retrieving user enrollments:", error);
    return [];
  }
}
