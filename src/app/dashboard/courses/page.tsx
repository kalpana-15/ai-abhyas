"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { CourseCard } from "@/components/ui/CourseCard";
import coursesData from "@/data/courses.json";

export default function MyCoursesPage() {
  const { user, enrolledCourses } = useAuth();

  if (!user) return null;

  const myCourses = coursesData.filter(course => enrolledCourses.includes(course.title));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground">Continue learning and tracking your progress across all enrolled courses.</p>
      </div>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-12 text-center border border-border shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground font-heading">No Courses Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">You haven't enrolled in any courses yet. Browse our catalog to start your AI learning journey.</p>
          <a href="/courses" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Explore Courses
          </a>
        </div>
      )}
    </div>
  );
}
