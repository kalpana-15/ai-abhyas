"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { CourseCard } from "@/components/ui/CourseCard";
import coursesData from "@/data/courses.json";
import { DashboardHero } from "@/components/dashboard/widgets/DashboardHero";
import { StatsRow } from "@/components/dashboard/widgets/StatsRow";
import { ContinueLearning } from "@/components/dashboard/widgets/ContinueLearning";
import { ScheduleWidget } from "@/components/dashboard/widgets/ScheduleWidget";
import { QuickActions } from "@/components/dashboard/widgets/QuickActions";
import { PendingAssessments } from "@/components/dashboard/widgets/PendingAssessments";
import { RecentAnnouncements } from "@/components/dashboard/widgets/RecentAnnouncements";
import Link from "next/link";
import scheduleData from "@/data/dashboard-schedule.json";
import assessmentsData from "@/data/dashboard-assessments.json";
import announcementsData from "@/data/dashboard-announcements.json";
import actionsData from "@/data/dashboard-actions.json";

export default function DashboardPage() {
  const { user, enrolledCourses } = useAuth();

  if (!user) return null;

  // Actual course objects for enrolled courses
  const myCourses = coursesData.filter(course => enrolledCourses.includes(course.title));
  // Default to Generative AI Masterclass if not found for the hero widget
  const activeCourseTitle = myCourses.length > 0 ? myCourses[0].title : "Generative AI Masterclass";

  return (
    <>
      {/* Hero Section */}
      <DashboardHero />

      {/* Stats Row */}
      <StatsRow enrolledCount={myCourses.length} />

      {/* Main Widgets Grid */}
      {/* 3 Columns: 5/12, 4/12, 3/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1 (Left): Continue Learning & My Courses (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ContinueLearning courseTitle={activeCourseTitle} />
          
          {/* My Courses Widget */}
          <div className="bg-card rounded-[24px] border border-border shadow-sm p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground font-heading">My Courses</h2>
              <Link href="/dashboard/courses" className="text-sm font-medium text-primary hover:underline">
                View All &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myCourses.slice(0, 2).map(course => (
                <div key={course.id} className="scale-95 origin-top-left w-[105%]">
                  <CourseCard course={course} />
                </div>
              ))}
              {myCourses.length === 0 && (
                <p className="text-muted-foreground text-sm">No courses enrolled yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Column 2 (Middle): Schedule & Pending Assessments (4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 min-h-[350px]">
            <ScheduleWidget schedule={scheduleData} />
          </div>
          <div className="flex-1">
            <PendingAssessments assessments={assessmentsData} />
          </div>
        </div>

        {/* Column 3 (Right): Quick Actions & Recent Announcements (3/12) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div>
            <QuickActions actions={actionsData} />
          </div>
          <div className="flex-1">
            <RecentAnnouncements announcements={announcementsData} />
          </div>
        </div>

      </div>
    </>
  );
}
