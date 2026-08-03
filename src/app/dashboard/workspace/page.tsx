"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function WorkspaceIndexRedirectPage() {
  const router = useRouter();
  const { enrolledCourses, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (enrolledCourses && enrolledCourses.length > 0) {
        // Navigate directly to the learner's primary enrolled course workspace
        const firstCourseId = enrolledCourses[0];
        router.replace(`/dashboard/workspace/${firstCourseId}`);
      } else {
        // Redirect to My Learning Hub where the professional empty state is displayed
        router.replace("/dashboard/courses");
      }
    }
  }, [enrolledCourses, loading, router]);

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] p-8">
      <Loader2 className="w-10 h-10 animate-spin text-[#8B5CF6] mb-4" />
      <h3 className="text-base font-extrabold font-heading text-[#111827] dark:text-white">
        Redirecting to your active learning workspace...
      </h3>
    </div>
  );
}
