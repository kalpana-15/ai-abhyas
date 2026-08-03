"use server";

import { db } from "@/lib/db";

export async function submitInquiry(formData: FormData) {
  try {
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    if (!name.trim() || !email.trim() || !message.trim()) {
      return {
        success: false,
        error: "Name, email address, and message description are required fields",
      };
    }

    // Insert inquiry into PostgreSQL database
    const inquiry = await db.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        message: message.trim(),
        status: "Unread",
      },
    });

    console.log(`✅ [New Database Inquiry Logged] ID: ${inquiry.id} from ${inquiry.email}`);

    return {
      success: true,
      message: "Thank you for getting in touch! Your message has been received, and an academic advisor will respond to you shortly.",
    };
  } catch (error) {
    console.error("Error executing submitInquiry server action:", error);
    return {
      success: false,
      error: "We encountered an unexpected error saving your message. Please try again or email us directly.",
    };
  }
}
