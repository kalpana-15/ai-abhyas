"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { enrollInCourse } from "@/actions/enrollmentActions";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay SDK instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TJPNtcp72kpA5G",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "jILN0EDB8mm1g3t2c4o3L4E0",
});

/**
 * Step 1: Create a secure banking order directly with Razorpay API
 */
export async function createRazorpayOrder({
  amount,
  courseId,
  courseTitle,
}: {
  amount: string;
  courseId: string;
  courseTitle: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "You must sign in to initialize payment." };
    }

    // Convert fee string like "₹4,999" or "₹4,999 / $65" into numerical Rupees
    const baseAmountStr = (amount.split("/")[0] || "").trim();
    const numericValue = parseInt(baseAmountStr.replace(/[^0-9]/g, ""), 10) || 4999;
    const amountInPaise = numericValue * 100; // Razorpay expects denomination in smallest currency unit (paise)

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${courseId}`.slice(0, 40),
      notes: {
        userId: user.id,
        courseId: courseId,
        courseTitle: courseTitle,
      },
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (error: any) {
    console.error("Error creating Razorpay API Order:", error);
    return {
      success: false,
      error: error?.message || "Failed to initiate transaction order with banking server.",
    };
  }
}

/**
 * Step 2: Cryptographically verify HMAC SHA-256 signature upon checkout completion
 */
export async function verifyRazorpayPayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  courseId,
  courseTitle,
  amount,
  method = "Razorpay Gateway (UPI/Card/NetBanking)",
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  courseId: string;
  courseTitle: string;
  amount: string;
  method?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Session expired during payment authentication." };
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "jILN0EDB8mm1g3t2c4o3L4E0";
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    
    // Generate expected cryptographic HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("Cryptographic signature verification mismatch!");
      return {
        success: false,
        error: "Security verification failed: Digital transaction signature did not match.",
      };
    }

    // Signature authenticated! Record the real invoice ID into PostgreSQL database
    if ((db as any).payment && typeof (db as any).payment.create === "function") {
      await (db as any).payment.create({
        data: {
          id: razorpayPaymentId, // Use Razorpay's verified payment transaction ID as primary key!
          userId: user.id,
          courseId,
          courseTitle,
          amount,
          method,
          status: "Paid",
        },
      });
    } else {
      // Dynamic SQL fallback if Windows file-lock prevented Prisma client regeneration
      const now = new Date();
      await db.$executeRaw`INSERT INTO "public"."Payment" ("id", "userId", "courseId", "courseTitle", "amount", "method", "status", "createdAt") VALUES (${razorpayPaymentId}, ${user.id}, ${courseId}, ${courseTitle}, ${amount}, ${method}, ${'Paid'}, ${now})`;
    }

    // Unlock the course in database for learner
    const enrollResult = await enrollInCourse(courseId || courseTitle);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/payments");
    revalidatePath("/dashboard/courses");
    revalidatePath("/courses");

    return {
      success: true,
      message: "Cryptographic signature verified! Course unlocked.",
      invoiceId: razorpayPaymentId,
      enrollResult,
    };
  } catch (error: any) {
    console.error("Error confirming Razorpay payment signature:", error);
    return {
      success: false,
      error: error?.message || "An unexpected server error occurred while finalizing enrollment.",
    };
  }
}

/**
 * Legacy direct simulated checkout fallback
 */
export async function processCoursePayment({
  courseId,
  courseTitle,
  amount,
  method = "Credit Card",
}: {
  courseId: string;
  courseTitle: string;
  amount: string;
  method?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "You must sign in to complete enrollment." };
    }

    let paymentId = "INV_" + Math.floor(100000 + Math.random() * 900000);
    if ((db as any).payment && typeof (db as any).payment.create === "function") {
      const payment = await (db as any).payment.create({
        data: { userId: user.id, courseId, courseTitle, amount, method, status: "Paid" },
      });
      paymentId = payment.id;
    } else {
      const cuid = "inv_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      const now = new Date();
      await db.$executeRaw`INSERT INTO "public"."Payment" ("id", "userId", "courseId", "courseTitle", "amount", "method", "status", "createdAt") VALUES (${cuid}, ${user.id}, ${courseId}, ${courseTitle}, ${amount}, ${method}, ${'Paid'}, ${now})`;
      paymentId = cuid;
    }

    const enrollResult = await enrollInCourse(courseTitle);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/payments");
    revalidatePath("/dashboard/courses");
    revalidatePath("/courses");

    return { success: true, message: "Course unlocked!", invoiceId: paymentId, enrollResult };
  } catch (error: any) {
    return { success: false, error: "An unexpected system error occurred." };
  }
}

export async function getUserPaymentHistory() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    if ((db as any).payment && typeof (db as any).payment.findMany === "function") {
      return await (db as any).payment.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return await db.$queryRaw`SELECT * FROM "public"."Payment" WHERE "userId" = ${user.id} ORDER BY "createdAt" DESC`;
    }
  } catch (error) {
    console.error("Error retrieving user payment history:", error);
    return [];
  }
}
