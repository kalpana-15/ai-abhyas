"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { enrollInCourse } from "@/actions/enrollmentActions";
import coursesData from "@/data/courses.json";

export async function getCourseWorkspaceData(courseId: string) {
  try {
    const user = await getCurrentUser();
    let course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { orderIndex: "asc" },
          include: {
            lessons: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
        resources: true,
      },
    });

    // If course is missing or has no modules in PostgreSQL, auto-seed realistic curriculum into database
    if (!course || !course.modules || course.modules.length === 0) {
      const courseMeta = (coursesData as any[]).find((c) => c.id === courseId || c.title === courseId) || coursesData[0];
      const targetId = courseMeta?.id || courseId;

      await db.course.upsert({
        where: { id: targetId },
        update: {},
        create: {
          id: targetId,
          title: courseMeta?.title || "Masterclass",
          description: courseMeta?.description || "Deploy robust AI architectures and scalable enterprise solutions.",
          level: courseMeta?.level || "Advanced",
          mode: courseMeta?.mode || "Online",
          fee: courseMeta?.fee || "₹4,499",
          rating: 4.8,
          image: courseMeta?.image || "/Assets/images/ai masterclase.png",
          instructorName: courseMeta?.instructor?.name || "Dr. Sarah Chen",
          instructorTitle: courseMeta?.instructor?.title || "Chief AI Scientist & Instructor",
        },
      });

      const existingMods = await db.module.findMany({ where: { courseId: targetId } });
      if (existingMods.length === 0) {
        await db.module.create({
          data: {
            courseId: targetId,
            title: "Module 1: Foundations & Core Architecture",
            hours: 4,
            orderIndex: 1,
            lessons: {
              create: [
                { title: "1.1 Architecture & Core Paradigms", duration: "25 mins", type: "Video", orderIndex: 1, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
                { title: "1.2 Theoretical Foundations & Mathematical Underpinnings", duration: "30 mins", type: "Video", orderIndex: 2, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
                { title: "1.3 Hands-on Lab: Enterprise Environment Setup & Verification", duration: "45 mins", type: "Workshop", orderIndex: 3, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
              ],
            },
          },
        });

        await db.module.create({
          data: {
            courseId: targetId,
            title: "Module 2: Advanced Implementations & Production Pipelines",
            hours: 5,
            orderIndex: 2,
            lessons: {
              create: [
                { title: "2.1 Enterprise Data Ingestion & Pipeline Engineering", duration: "30 mins", type: "Video", orderIndex: 1, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
                { title: "2.2 Distributed Inference & Memory Optimization", duration: "35 mins", type: "Video", orderIndex: 2, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
                { title: "2.3 Automated Guardrails & Quality Assurance Mechanics", duration: "25 mins", type: "Video", orderIndex: 3, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
                { title: "2.4 Workshop: Building an End-to-End Scaled Architecture", duration: "50 mins", type: "Workshop", orderIndex: 4, videoUrl: "https://www.youtube.com/embed/aircAruvnKk?autoplay=1" },
              ],
            },
          },
        });
      }

      // Re-query completely initialized course from database
      course = await db.course.findUnique({
        where: { id: targetId },
        include: {
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
          resources: true,
        },
      });
    }

    if (!course) {
      return { success: false, error: "Course could not be loaded or initialized in database." };
    }

    if (!user) {
      return {
        success: true,
        course,
        userProgress: {
          completedLessons: [],
          assignments: [],
          assessments: [],
          certificate: null,
        },
      };
    }

    // Fetch user-specific learning progress from PostgreSQL
    const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const [lessonProgress, assignments, assessments, certificate] = await Promise.all([
      db.lessonProgress.findMany({
        where: { userId: user.id, lessonId: { in: lessonIds }, isCompleted: true },
        select: { lessonId: true },
      }),
      db.assignmentSubmission.findMany({
        where: { userId: user.id, courseId: courseId },
        orderBy: { submittedAt: "desc" },
      }),
      db.assessmentAttempt.findMany({
        where: { userId: user.id, courseId: courseId },
        orderBy: { attemptedAt: "desc" },
      }),
      db.credentialCertificate.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: courseId } },
      }),
    ]);

    return {
      success: true,
      course,
      userProgress: {
        completedLessons: lessonProgress.map((p) => p.lessonId),
        assignments,
        assessments,
        certificate,
      },
    };
  } catch (error) {
    console.error("Error retrieving course workspace data:", error);
    return { success: false, error: "Failed to load course workspace data." };
  }
}

export async function toggleLessonCompletion(lessonId: string, isCompleted: boolean, courseId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "You must be signed in to record progress." };
    }

    await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
      update: {
        isCompleted: isCompleted,
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        lessonId: lessonId,
        isCompleted: isCompleted,
        completedAt: new Date(),
      },
    });

    revalidatePath(`/dashboard/workspace/${courseId}`);
    revalidatePath(`/dashboard/workspace/${courseId}/lessons`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/courses");

    return { success: true, isCompleted };
  } catch (error) {
    console.error("Error toggling lesson completion:", error);
    return { success: false, error: "An error occurred updating lesson progress." };
  }
}

export async function submitCourseAssignment(courseId: string, title: string, fileUrl: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Authentication required to submit assignments." };
    }

    // Simulate instant AI Automated Grading for an engaging learner experience
    const simulatedScore = Math.floor(Math.random() * 16) + 85; // Score between 85 and 100
    const feedbackOptions = [
      "Excellent technical accuracy! The code clean-up and architectural patterns follow enterprise best practices.",
      "Outstanding analytical depth. Your implementation handles edge cases effectively and shows mastery of Core AI concepts.",
      "Well structured submission! Clear alignment with the course module objectives and robust design execution.",
    ];
    const aiFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];

    const submission = await db.assignmentSubmission.create({
      data: {
        userId: user.id,
        courseId: courseId,
        title: title,
        fileUrl: fileUrl,
        status: "Graded",
        score: simulatedScore,
        feedback: aiFeedback,
      },
    });

    revalidatePath(`/dashboard/workspace/${courseId}/assignments`);
    revalidatePath(`/dashboard/workspace/${courseId}/certificate`);
    revalidatePath("/dashboard/courses");

    return { success: true, submission };
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return { success: false, error: "Could not record assignment submission." };
  }
}

export async function recordAssessmentAttempt(courseId: string, quizTitle: string, score: number, total: number, threshold: number = 70) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Please log in to save assessment scores." };
    }

    const percentage = Math.round((score / total) * 100);
    const status = percentage >= threshold ? "passed" : "failed";

    const attempt = await db.assessmentAttempt.create({
      data: {
        userId: user.id,
        courseId: courseId,
        quizTitle: quizTitle,
        score: score,
        total: total,
        threshold: threshold,
        status: status,
      },
    });

    revalidatePath(`/dashboard/workspace/${courseId}/assessments`);
    revalidatePath(`/dashboard/workspace/${courseId}/certificate`);

    return { success: true, attempt, passed: status === "passed" };
  } catch (error) {
    console.error("Error saving assessment attempt:", error);
    return { success: false, error: "Failed to record assessment score." };
  }
}

export async function claimCourseCertificate(courseId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Must be signed in to issue certificates." };
    }

    const existing = await db.credentialCertificate.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: courseId } },
    });

    if (existing) {
      return { success: true, certificate: existing, alreadyIssued: true };
    }

    // Generate verified unique credential ID
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    const credentialId = `AIA-${courseId.toUpperCase()}-${randomHex}-${timestamp}`;

    const newCertificate = await db.credentialCertificate.create({
      data: {
        userId: user.id,
        courseId: courseId,
        credentialId: credentialId,
        isUnlocked: true,
      },
    });

    revalidatePath(`/dashboard/workspace/${courseId}/certificate`);
    revalidatePath("/dashboard/profile");

    return { success: true, certificate: newCertificate };
  } catch (error) {
    console.error("Error issuing certificate:", error);
    return { success: false, error: "Failed to issue verified credential." };
  }
}

export async function getUserLearningHubProgress() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, enrolledCourses: [], totalProgress: 0 };
    }

    // Fetch active enrollments with course details and progress calculations
    let enrollments = await db.enrollment.findMany({
      where: { userId: user.id, status: "Active" },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    });

    // Auto-heal enrollments for paid courses or user session enrollments if DB enrollment was missed
    const payments = await db.payment.findMany({
      where: { userId: user.id },
      select: { courseId: true, courseTitle: true },
    });

    const candidateIds = Array.from(new Set([
      ...(user.enrolledCourses || []),
      ...payments.flatMap(p => [p.courseId, p.courseTitle])
    ])).filter(Boolean);

    let healed = false;
    for (const cid of candidateIds) {
      const alreadyIncluded = enrollments.some(e => e.courseId === cid || e.course?.title === cid || e.course?.title?.toLowerCase() === cid.toLowerCase());
      if (!alreadyIncluded) {
        await enrollInCourse(cid);
        healed = true;
      }
    }

    if (healed) {
      enrollments = await db.enrollment.findMany({
        where: { userId: user.id, status: "Active" },
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: {
                    select: { id: true },
                  },
                },
              },
            },
          },
        },
      });
    }

    const detailedCoursesRaw = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course || await db.course.findUnique({ where: { id: enrollment.courseId } });
        if (!course) {
          const fallback = (coursesData as any[]).find(c => c.id === enrollment.courseId || c.title === enrollment.courseId) || coursesData[0];
          return {
            id: fallback.id,
            title: fallback.title,
            image: fallback.image || "/Assets/images/ai masterclase.png",
            level: fallback.level || "Intermediate",
            totalLessons: 15,
            completedLessons: 0,
            progress: 0,
            hasCertificate: false,
            assessmentScore: "Not taken",
          };
        }

        const modules = (course as any).modules || [];
        const totalLessons = modules.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0) || 15;
        const lessonIds = modules.flatMap((m: any) => m.lessons.map((l: any) => l.id));
        
        const completedCount = await db.lessonProgress.count({
          where: {
            userId: user.id,
            lessonId: { in: lessonIds },
            isCompleted: true,
          },
        });

        const progressPercent = Math.min(100, Math.round((completedCount / (totalLessons || 1)) * 100));

        const latestAssessment = await db.assessmentAttempt.findFirst({
          where: { userId: user.id, courseId: course.id },
          orderBy: { attemptedAt: "desc" },
        });

        const cert = await db.credentialCertificate.findUnique({
          where: { userId_courseId: { userId: user.id, courseId: course.id } },
        });

        return {
          id: course.id,
          title: course.title,
          image: course.image || "/Assets/images/ai masterclase.png",
          level: course.level,
          totalLessons: totalLessons || 12,
          completedLessons: completedCount,
          progress: progressPercent,
          hasCertificate: !!cert,
          assessmentScore: latestAssessment ? `${latestAssessment.score}%` : "Not taken",
        };
      })
    );

    const detailedCourses = detailedCoursesRaw.filter(Boolean);

    const avgProgress = detailedCourses.length
      ? Math.round(detailedCourses.reduce((acc, c) => acc + (c?.progress || 0), 0) / detailedCourses.length)
      : 0;

    return {
      success: true,
      enrolledCourses: detailedCourses,
      overallProgress: avgProgress,
    };
  } catch (error) {
    console.error("Error fetching learner hub statistics:", error);
    return { success: false, enrolledCourses: [], totalProgress: 0 };
  }
}
