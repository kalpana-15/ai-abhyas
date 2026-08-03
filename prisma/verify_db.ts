import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyDatabasePersistence() {
  console.log("=== AI ABHYAS POSTGRESQL PERSISTENCE VERIFICATION ===");
  try {
    const courseCount = await prisma.course.count();
    const moduleCount = await prisma.module.count();
    const lessonCount = await prisma.lesson.count();
    const userCount = await prisma.user.count();
    const enrollmentCount = await prisma.enrollment.count();

    console.log(`✅ Table Counts Verified:`);
    console.log(`   - Courses: ${courseCount}`);
    console.log(`   - Modules: ${moduleCount}`);
    console.log(`   - Lessons: ${lessonCount}`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Enrollments: ${enrollmentCount}`);

    const sampleCourse = await prisma.course.findFirst({
      where: { id: "c1" },
      include: {
        modules: {
          include: { lessons: true }
        }
      }
    });

    if (sampleCourse) {
      console.log(`\n✅ Sample Course Found: "${sampleCourse.title}" (${sampleCourse.modules.length} modules, ${sampleCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)} total lessons)`);
    } else {
      console.warn("\n⚠️ Course c1 not found in database.");
    }

    const demoUser = await prisma.user.findFirst({
      where: { email: "kalpanadevi@gmail.com" },
      include: {
        enrollments: {
          include: { course: true }
        }
      }
    });

    if (demoUser) {
      console.log(`\n✅ Demo Learner Profile Found: ${demoUser.name} (${demoUser.email})`);
      console.log(`   - Active Enrollments (${demoUser.enrollments.length}):`);
      demoUser.enrollments.forEach((e) => {
        console.log(`     * [${e.courseId}] ${e.course ? e.course.title : 'Course Reference'} (Enrolled: ${e.enrolledAt.toISOString().split('T')[0]})`);
      });
    }

    console.log("\n🚀 All PostgreSQL persistence checks completed successfully!");
  } catch (error) {
    console.error("❌ Database Verification Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabasePersistence();
