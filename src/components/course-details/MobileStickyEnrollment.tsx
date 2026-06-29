"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function MobileStickyEnrollment({ course }: { course: any }) {
  const { enroll, enrolledCourses } = useAuth();
  const isEnrolled = enrolledCourses.includes(course.title);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between">
      <div className="font-heading font-bold text-xl">{course.fee}</div>
      {isEnrolled ? (
        <Link href="/dashboard">
          <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-xl font-medium shadow-lg hover:scale-105 transition-transform">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        <button 
          onClick={() => enroll(course.title)}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium shadow-lg hover:scale-105 transition-transform"
        >
          Enroll Now
        </button>
      )}
    </div>
  );
}
