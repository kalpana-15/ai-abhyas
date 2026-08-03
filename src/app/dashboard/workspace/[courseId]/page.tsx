"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import coursesData from "@/data/courses.json";
import { getCourseWorkspaceData } from "@/actions/lmsActions";
import { 
  Play, 
  Video, 
  FileText, 
  CheckSquare, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  BookOpen,
  Loader2,
  ShieldAlert,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkspaceOverviewPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "c1";
  const courseFallback = coursesData.find((c) => c.id === courseId) || coursesData[0];

  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<any>(courseFallback);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [nextLesson, setNextLesson] = useState<{ title: string; duration: string; href: string }>({
    title: "Module 1, Lesson 1: Architecture & Core Paradigms",
    duration: "25 mins",
    href: `/dashboard/workspace/${courseId}/lessons?lesson=1`
  });
  const [milestones, setMilestones] = useState({
    assignmentStatus: "Assignments & Labs",
    assignmentSubtext: "Complete practical course exercises.",
    assessmentStatus: "Quizzes & Tests",
    assessmentSubtext: "Test your conceptual understanding.",
    hasCertificate: false
  });

  useEffect(() => {
    async function loadWorkspaceActivity() {
      try {
        setLoading(true);
        const res = await getCourseWorkspaceData(courseId);
        if (res && res.success && res.course) {
          const dbCourse = res.course;
          setCourseData(dbCourse);

          const completedSet = new Set(res.userProgress?.completedLessons || []);
          const allLessons: any[] = [];
          
          (dbCourse.modules || []).forEach((mod: any, mIdx: number) => {
            (mod.lessons || []).forEach((less: any, lIdx: number) => {
              allLessons.push({
                id: less.id,
                title: `${mod.title.split(":")[0] || `Mod ${mIdx + 1}`}: ${less.title}`,
                duration: less.duration || "25 mins",
                completed: completedSet.has(less.id),
                href: `/dashboard/workspace/${courseId}/lessons`
              });
            });
          });

          // Calculate genuine completion percentage from database activity
          const totalCount = allLessons.length || 1;
          const completedCount = completedSet.size;
          const calculatedPct = Math.min(100, Math.round((completedCount / totalCount) * 100));
          setProgressPct(calculatedPct);

          // Find genuine next incomplete lesson
          const firstIncomplete = allLessons.find(l => !l.completed);
          if (firstIncomplete) {
            setNextLesson({
              title: firstIncomplete.title,
              duration: firstIncomplete.duration,
              href: firstIncomplete.href
            });
          } else if (allLessons.length > 0) {
            setNextLesson({
              title: "Curriculum Mastered! All Lessons Completed",
              duration: "100% done",
              href: `/dashboard/workspace/${courseId}/certificate`
            });
          }

          // Evaluate real milestones from user database records
          const assignmentsList = res.userProgress?.assignments || [];
          const assessmentsList = res.userProgress?.assessments || [];
          const cert = res.userProgress?.certificate;

          setMilestones({
            assignmentStatus: assignmentsList.length > 0 
              ? `Assignments (${assignmentsList.length} submitted)`
              : "Assignments & Labs",
            assignmentSubtext: assignmentsList.length > 0
              ? `Latest score: ${assignmentsList[0].score}%`
              : "Complete practical course exercises.",
            assessmentStatus: assessmentsList.length > 0
              ? `Quizzes (${assessmentsList.length} completed)`
              : "Quizzes & Tests",
            assessmentSubtext: assessmentsList.length > 0
              ? `Latest score: ${assessmentsList[0].score}%`
              : "Test your conceptual understanding.",
            hasCertificate: !!cert
          });
        }
      } catch (err) {
        console.error("Error loading real workspace activity:", err);
      } finally {
        setLoading(false);
      }
    }
    loadWorkspaceActivity();
  }, [courseId]);

  if (loading) {
    return (
      <div className="w-full min-h-[420px] bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] p-10 flex flex-col items-center justify-center text-center shadow-xl my-4 transition-colors">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <Sparkles className="w-5 h-5 text-[#DAA520] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h3 className="text-base font-extrabold font-heading text-[#111827] dark:text-white tracking-tight">
          Loading Masterclass Workspace...
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-sm font-medium">
          Synchronizing your live course progress, video modules, and database milestones from PostgreSQL...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* ===================================================================== */}
      {/* COURSE HERO BANNER WITH SINGLE PRIMARY ACTION                         */}
      {/* ===================================================================== */}
      <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#111827] via-[#1A1F3C] to-[#14182F] text-white p-6 sm:p-8 lg:p-10 border border-[#E7E5F4] dark:border-white/[0.1] shadow-2xl">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-10 w-72 h-72 bg-[#DAA520]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-bold font-heading tracking-tight leading-tight">
              {courseData.title}
            </h1>
            
            {/* Live Course Progress Bar inside Hero */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold mb-2 text-[#E5E7EB]">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" /> Course Progress
                </span>
                <span className="text-[#DAA520] font-extrabold text-sm font-variant-numeric">{progressPct}% Completed</span>
              </div>
              <div className="w-full sm:max-w-md bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#DAA520] h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* THE PRIMARY ACTION CARD */}
          <div className="bg-white/10 dark:bg-[#060816]/70 backdrop-blur-md p-5 rounded-2xl border border-white/15 w-full max-w-md shrink-0 flex flex-col justify-between shadow-2xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-[#DAA520] tracking-wider block">
                  {progressPct === 100 ? "Completed" : "Next Lesson"}
                </span>
                {progressPct === 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                ) : (
                  <span className="text-[11px] font-bold text-white bg-[#8B5CF6] px-2 py-0.5 rounded-md">Active</span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-snug font-heading">
                {nextLesson.title}
              </h3>
              <p className="text-xs text-[#9CA3AF] font-medium flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>{nextLesson.duration}</span>
              </p>
            </div>

            <Link
              href={nextLesson.href}
              className="mt-5 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#8B5CF6]/25 transition-all active:scale-95 flex items-center justify-center gap-2.5 group"
            >
              {progressPct === 100 ? (
                <>
                  <Award className="w-4 h-4 text-white" />
                  <span>View Certificate</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Continue Learning</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* COURSE ACTIVITY                                                       */}
      {/* ===================================================================== */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] font-heading px-1">
          Course Activity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          
          {/* 1. Live Sessions */}
          <div className="bg-white dark:bg-[#14182F] rounded-2xl p-5 border border-[#E7E5F4] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group min-w-0">
            <div>
              <div className="mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#A855F7] flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight leading-snug">
                Live Sessions & QA
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Weekly instructor guidance</span>
              </p>
            </div>

            <Link
              href={`/dashboard/workspace/${courseId}/live`}
              className="mt-5 w-full py-2 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] hover:bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#A855F7] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 group/btn border border-[#E7E5F4] dark:border-white/[0.08]"
            >
              <span>Join Session</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* 2. Assignments */}
          <div className="bg-white dark:bg-[#14182F] rounded-2xl p-5 border border-[#E7E5F4] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group min-w-0 relative overflow-hidden">
            <div className={cn("absolute top-0 left-0 w-1 h-full", milestones.assignmentStatus.startsWith("Assignments (") ? "bg-[#14B8A6]" : "bg-[#DAA520]")} />
            <div>
              <div className="mb-3 pl-1">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", milestones.assignmentStatus.startsWith("Assignments (") ? "bg-[#14B8A6]/15 text-[#14B8A6]" : "bg-[#DAA520]/15 text-[#DAA520]")}>
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight leading-snug pl-1">
                {milestones.assignmentStatus}
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 font-medium pl-1 line-clamp-1">
                {milestones.assignmentSubtext}
              </p>
            </div>

            <Link
              href={`/dashboard/workspace/${courseId}/assignments`}
              className="mt-5 w-full py-2 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 group/btn shadow-xs"
            >
              <span>View Assignments</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* 3. Quizzes */}
          <div className="bg-white dark:bg-[#14182F] rounded-2xl p-5 border border-[#E7E5F4] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group min-w-0">
            <div>
              <div className="mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <CheckSquare className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight leading-snug">
                {milestones.assessmentStatus}
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 font-medium line-clamp-1">
                {milestones.assessmentSubtext}
              </p>
            </div>

            <Link
              href={`/dashboard/workspace/${courseId}/assessments`}
              className="mt-5 w-full py-2 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] hover:bg-[#14B8A6]/15 text-[#14B8A6] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 group/btn border border-[#E7E5F4] dark:border-white/[0.08]"
            >
              <span>View Quizzes</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
