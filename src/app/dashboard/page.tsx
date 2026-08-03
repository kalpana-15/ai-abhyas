"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getDashboardOverviewData } from "@/actions/dashboardActions";
import { getUserLearningHubProgress } from "@/actions/lmsActions";
import coursesData from "@/data/courses.json";
import { StatsRow } from "@/components/dashboard/widgets/StatsRow";
import { 
  Play, 
  Video, 
  FileText, 
  CheckSquare, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Calendar,
  Clock,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return "Good Morning 👋";
  if (hour >= 12 && hour < 17) return "Good Afternoon 👋";
  if (hour >= 17 && hour < 21) return "Good Evening 👋";
  return "Good Night 🌙";
}

export default function DashboardPage() {
  const { user, enrolledCourses } = useAuth();
  const [greeting, setGreeting] = useState("Hello");
  const [dbOverview, setDbOverview] = useState<any>(null);
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, { progress: number; lastAccessed: string }>>({});

  useEffect(() => {
    setGreeting(getGreeting());
    async function loadStats() {
      try {
        const [res, progressRes] = await Promise.all([
          getDashboardOverviewData(),
          getUserLearningHubProgress(),
        ]);
        if (res && res.success) {
          setDbOverview(res.stats);
        }
        if (progressRes && progressRes.success && progressRes.enrolledCourses) {
          const pMap: Record<string, { progress: number; lastAccessed: string }> = {};
          progressRes.enrolledCourses.forEach((c: any) => {
            pMap[c.id] = {
              progress: c.progress || 0,
              lastAccessed: (c.progress && c.progress > 0) ? "Active recently" : "Ready to start",
            };
            if (c.title) {
              pMap[c.title] = pMap[c.id];
            }
          });
          setCourseProgressMap(pMap);
        }
      } catch (err) {
        console.error("Failed loading dashboard overview metrics:", err);
      }
    }
    loadStats();
  }, []);

  if (!user) return null;

  // Evaluate actual course enrollment & completion states
  const realMyCourses = coursesData.filter((course) => 
    enrolledCourses.includes(course.title) || enrolledCourses.includes(course.id)
  );
  
  const displayedCourses = realMyCourses;
  const isZeroCourses = displayedCourses.length === 0;
  const isAllCompleted = !isZeroCourses && (dbOverview?.certificatesCount >= displayedCourses.length && dbOverview?.certificatesCount > 0);
  const hasTasks = !isZeroCourses && !isAllCompleted;

  const primaryCourse = displayedCourses[0] || coursesData[0];
  const primaryProgress = courseProgressMap[primaryCourse.id]?.progress || 0;
  const primaryLessonUrl = `/dashboard/workspace/${primaryCourse.id}/lessons`;

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* WELCOME HERO BANNER */}
      <div className="relative overflow-hidden bg-white dark:bg-[#14182F] text-[#111827] dark:text-white rounded-[22px] p-6 sm:p-8 lg:p-10 border border-[#E7E5F4] dark:border-white/[0.08] shadow-xs">
        <div className="relative z-10 max-w-3xl flex flex-col justify-between items-start gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[11px] font-bold tracking-wider uppercase text-[#8B5CF6] mb-4">
              <Sparkles className="w-3.5 h-3.5 fill-[#8B5CF6]" />
              <span>AI Abhyas Learning Hub &bull; Active Learner Pass</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold font-heading tracking-tight mb-1.5">
              {greeting}, {user.name.split(" ")[0]}
            </h1>
            
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-normal leading-relaxed max-w-2xl">
              {isZeroCourses ? (
                "Welcome to your professional generative AI development ecosystem. You haven't enrolled in any masterclass courses yet. Explore our cutting-edge curriculum and launch your engineering journey today."
              ) : isAllCompleted ? (
                "Incredible dedication! You have successfully completed all your active masterclass modules and verified your technical competencies."
              ) : (
                <>
                  Your AI learning ecosystem is primed and ready. You are active in <strong className="text-[#111827] dark:text-white font-bold">{primaryCourse.title}</strong>. Keep your momentum going today.
                </>
              )}
            </p>
          </div>

          {/* Primary Call to Action */}
          {isZeroCourses ? (
            <Link
              href="/courses"
              className="inline-flex items-center gap-2.5 bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 group"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Masterclass Programs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : isAllCompleted ? (
            <Link
              href="/dashboard/certificates"
              className="inline-flex items-center gap-2.5 bg-[#14B8A6] hover:bg-[#0D9488] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 group"
            >
              <Award className="w-4 h-4" />
              <span>View Verified Diplomas</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href={primaryLessonUrl}
              className="inline-flex items-center gap-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 group"
            >
              <span>{primaryProgress > 0 ? "Continue Learning" : "Start Learning"}</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>

      {/* PROGRESS STATS ROW */}
      <StatsRow 
        enrolledCount={dbOverview ? dbOverview.activeCoursesCount : displayedCourses.length} 
        studyHoursToday={dbOverview ? (dbOverview.studyHoursToday || 0) : 0}
        completedLessonsCount={dbOverview ? (dbOverview.completedLessonsCount || 0) : 0}
        currentStreak={dbOverview ? (dbOverview.currentStreak || 0) : 0}
      />

      {/* ACTIVITY & COURSE OVERVIEW GRID */}
      {isZeroCourses ? (
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-8 sm:p-14 text-center shadow-xs max-w-4xl mx-auto my-8 flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-4 border border-[#8B5CF6]/20">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white font-heading mb-1.5">
            No Active Masterclasses Enrolled
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-md leading-relaxed mb-6">
            Your dashboard is ready. Enroll in our flagship Generative AI masterclasses to start gaining hands-on experience with LLMs, RAG architectures, and autonomous agent pipelines.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Browse AI Masterclass Catalog</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CONTINUE LEARNING SECTION (8 / 12 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
              <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
                <span>Enrolled Masterclasses</span>
                <span className="text-[10px] font-extrabold text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-full">
                  {isAllCompleted ? "Completed" : "In Progress"}
                </span>
              </h2>
              <Link
                href="/dashboard/courses"
                className="text-xs font-bold text-[#8B5CF6] hover:underline flex items-center gap-1"
              >
                <span>View My Learning Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isAllCompleted ? (
              <div className="bg-white dark:bg-[#14182F] rounded-[20px] p-8 border border-[#E7E5F4] dark:border-white/[0.08] text-center flex flex-col items-center shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white">All Active Cohorts Completed!</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-sm">
                  Congratulations on mastering your current course curriculum. You can view your verified academic transcripts or enroll in additional specialized programs.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link href="/dashboard/certificates" className="bg-[#14B8A6] hover:bg-[#0D9488] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
                    View Earned Diplomas
                  </Link>
                  <Link href="/courses" className="bg-[#FAFAF7] dark:bg-white/[0.05] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/[0.1] transition-all">
                    Explore More Courses
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedCourses.slice(0, 4).map((course) => {
                  const pData = courseProgressMap[course.id] || courseProgressMap[course.title] || { progress: 0, lastAccessed: "Ready to start" };
                  const progressPct = pData.progress;
                  const lastOpened = pData.lastAccessed;

                  return (
                    <div
                      key={course.id}
                      className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div className="relative h-36 bg-[#1F2937] overflow-hidden">
                        <img 
                          src={course.image || "/Assets/images/ai masterclase.png"} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-[10px] font-semibold opacity-90 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3 text-[#DAA520]" />
                            <span>{lastOpened}</span>
                          </span>
                          <span className="text-[11px] font-extrabold text-[#DAA520]">{progressPct}%</span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#6B7280] dark:text-[#9CA3AF]">
                            Instructor: {course.instructor?.name || "Dr. Sarah Chen"}
                          </span>
                          <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight line-clamp-1">
                            {course.title}
                          </h3>

                          <div className="w-full bg-[#FAFAF7] dark:bg-white/[0.08] h-1.5 rounded-full mt-2.5 overflow-hidden border border-[#E7E5F4]/50 dark:border-white/[0.05]">
                            <div 
                              className="bg-[#8B5CF6] h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>

                        <Link
                          href={`/dashboard/workspace/${course.id}`}
                          className="w-full py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-[#8B5CF6] hover:text-white text-[#111827] dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-[#E7E5F4] dark:border-white/[0.1] hover:border-transparent group/btn cursor-pointer"
                        >
                          <span>{progressPct > 0 ? "Continue Learning" : "Start Learning"}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* UPCOMING TASKS (4 / 12 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
              <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
                <span>Action Required</span>
                <span className="text-[10px] font-extrabold text-[#DAA520] bg-[#DAA520]/10 px-2 py-0.5 rounded-md">
                  Tasks ({hasTasks ? "3" : "0"})
                </span>
              </h2>
            </div>

            {!hasTasks ? (
              <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-8 text-center shadow-2xs flex flex-col items-center justify-center my-2">
                <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center mb-2.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wide">All Caught Up!</h4>
                <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] max-w-[220px] mt-1 leading-relaxed">
                  You have no pending assignments, quizzes, or immediate webinar sessions scheduled.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                
                {/* 1. NEXT LIVE SESSION */}
                <div className="bg-white dark:bg-[#14182F] rounded-[18px] p-4 border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs hover:border-[#8B5CF6]/50 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-wider bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-md truncate max-w-[180px]">
                      {primaryCourse.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#6B7280]">Live Studio</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827] dark:text-white leading-tight">
                        LLM Agent Architectures &amp; Tool Calling
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#E7E5F4] dark:border-white/[0.06] text-xs">
                    <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Tomorrow &bull; 5:00 PM IST</span>
                    </span>
                    <Link
                      href={`/dashboard/workspace/${primaryCourse.id}/live`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#8B5CF6] text-white font-bold text-[11px] hover:bg-[#7C3AED] transition-all shadow-xs"
                    >
                      Join Studio
                    </Link>
                  </div>
                </div>

                {/* 2. PENDING ASSIGNMENT */}
                <div className="bg-white dark:bg-[#14182F] rounded-[18px] p-4 border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs hover:border-[#DAA520]/50 transition-all space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#DAA520]" />
                  <div className="flex items-center justify-between pl-1">
                    <span className="text-[10px] font-extrabold text-[#DAA520] uppercase tracking-wider bg-[#DAA520]/10 px-2.5 py-0.5 rounded-md truncate max-w-[180px]">
                      {primaryCourse.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#6B7280]">Assignment</span>
                  </div>
                  <div className="flex items-center gap-2.5 pl-1">
                    <div className="w-8 h-8 rounded-xl bg-[#DAA520]/15 text-[#DAA520] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827] dark:text-white leading-tight">
                        Module 2: Advanced Engineering Lab
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#E7E5F4] dark:border-white/[0.06] text-xs pl-1">
                    <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-semibold">
                      Due in 2 days
                    </span>
                    <Link
                      href={`/dashboard/workspace/${primaryCourse.id}/assignments`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-bold text-[11px] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white transition-all shadow-xs"
                    >
                      Submit Lab
                    </Link>
                  </div>
                </div>

                {/* 3. UPCOMING ASSESSMENT */}
                <div className="bg-white dark:bg-[#14182F] rounded-[18px] p-4 border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs hover:border-[#14B8A6]/50 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#14B8A6] uppercase tracking-wider bg-[#14B8A6]/10 px-2.5 py-0.5 rounded-md truncate max-w-[180px]">
                      {primaryCourse.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#6B7280]">Assessment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827] dark:text-white leading-tight">
                        Module 1: Foundations Quiz
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#E7E5F4] dark:border-white/[0.06] text-xs">
                    <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-semibold">
                      30 mins &bull; 10 Questions
                    </span>
                    <Link
                      href={`/dashboard/workspace/${primaryCourse.id}/assessments`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAFAF7] dark:bg-white/[0.06] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1] font-bold text-[11px] hover:bg-[#14B8A6] hover:text-white hover:border-transparent transition-all shadow-2xs"
                    >
                      Attempt Quiz
                    </Link>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
