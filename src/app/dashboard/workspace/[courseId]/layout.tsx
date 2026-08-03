"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import coursesData from "@/data/courses.json";
import { CourseWorkspaceSidebar } from "@/components/dashboard/workspace/CourseWorkspaceSidebar";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function CourseWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const courseId = (params?.courseId as string) || "c1";

  // Match active course or fallback to default Generative AI Masterclass
  const activeCourse = coursesData.find((c) => c.id === courseId) || coursesData[0];

  if (!activeCourse) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-bold">Course not found in catalog</h2>
        <Link href="/dashboard/courses" className="text-violet-500 underline mt-2 block">
          Return to My Learning Hub
        </Link>
      </div>
    );
  }

  const courseProps = {
    id: activeCourse.id,
    title: activeCourse.title,
    image: activeCourse.image || "/Assets/images/ai masterclase.png",
    instructor: activeCourse.instructor || { name: "Dr. Sarah Chen" },
  };

  return (
    <div className="flex flex-1 min-h-0 relative w-full items-start gap-6 lg:gap-7">
      {/* Secondary Course Workspace Sidebar */}
      <CourseWorkspaceSidebar course={courseProps} />

      {/* Main Workspace Content Area */}
      <div className="flex-1 min-w-0 w-full pb-20 lg:pb-6">
        {children}
      </div>
    </div>
  );
}
