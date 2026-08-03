"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function MobileStickyEnrollment({ course }: { course: any }) {
  const { user, enroll, enrolledCourses } = useAuth();
  const router = useRouter();
  const isEnrolled = enrolledCourses.includes(course.title);
  const isFree = course.fee === "Free" || course.fee === "₹0" || course.fee === "$0";

  const handleEnrollClick = () => {
    const enrollUrl = `/enroll?courseId=${course.id}&course=${encodeURIComponent(course.title)}&fee=${encodeURIComponent(isFree ? "Free" : course.fee)}&type=${isFree ? "free" : "paid"}`;
    router.push(enrollUrl);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border p-3.5 sm:p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2">
      <div className="font-heading font-bold text-base sm:text-lg text-foreground whitespace-nowrap truncate">{course.fee}</div>
      {isEnrolled ? (
        <Link href="/dashboard" className="shrink-0">
          <button className="bg-secondary text-secondary-foreground px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        <button 
          onClick={handleEnrollClick}
          className="bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:opacity-90 transition-opacity shrink-0"
        >
          Enroll Now
        </button>
      )}
    </div>
  );
}
