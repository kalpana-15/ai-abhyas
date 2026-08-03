"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import coursesData from "@/data/courses.json";
import { getUserLearningHubProgress } from "@/actions/lmsActions";
import { useAuth } from "@/context/AuthContext";
import { 
  BookOpen, 
  CheckCircle2, 
  Play, 
  Award, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Loader2,
  Sparkles,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "in-progress" | "not-started" | "completed";
type SortOption = "last-accessed" | "progress" | "alphabetical";

interface EnrolledCourseItem {
  id: string;
  title: string;
  description: string;
  instructor: { name: string; designation?: string; image?: string };
  image: string;
  status: "in-progress" | "completed" | "not-started";
  progress: number;
  lastAccessed: string;
  updatedAt?: number;
}

export default function MyCoursesPage() {
  const { user, enrolledCourses } = useAuth();
  const [filter, setFilter] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<SortOption>("last-accessed");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Derive catalog based strictly on actual enrolled programs or verified active courses
  const [catalog, setCatalog] = useState<EnrolledCourseItem[]>(() => {
    const matched = coursesData.filter(c => enrolledCourses.includes(c.id) || enrolledCourses.includes(c.title));
    const activeList = matched;
    
    return activeList.map((course, idx) => ({
      id: course.id,
      title: course.title,
      description: course.description || "Master transformative AI architectures and deploy autonomous LLM agents.",
      instructor: course.instructor || { name: "Nitish Singh" },
      image: course.image || "/Assets/images/ai masterclase.png",
      status: "not-started",
      progress: 0,
      lastAccessed: "Ready to start",
      updatedAt: Date.now() - idx * 100000
    }));
  });

  useEffect(() => {
    async function fetchLiveProgress() {
      try {
        setLoading(true);
        const res = await getUserLearningHubProgress();
        if (res && res.success && res.enrolledCourses && res.enrolledCourses.length > 0) {
          const remoteCourses: EnrolledCourseItem[] = res.enrolledCourses.map((c: any, idx: number) => {
            const status: "in-progress" | "completed" | "not-started" = 
              c.progress === 100 || c.hasCertificate ? "completed" : c.progress > 0 ? "in-progress" : "not-started";
            
            const original = coursesData.find((orig) => orig.id === c.id) || coursesData[0];
            return {
              id: c.id,
              title: c.title || original.title,
              description: original.description || "Master generative AI frameworks through practical engineering assignments.",
              instructor: original.instructor || { name: "Nitish Singh" },
              image: c.image || original.image || "/Assets/images/ai masterclase.png",
              status,
              progress: c.progress || 0,
              lastAccessed: c.progress > 0 ? "Active recently" : "Ready to start",
              updatedAt: c.progress > 0 ? Date.now() - idx * 50000 : Date.now() - 1000000 - idx * 50000,
            };
          });
          setCatalog(remoteCourses);
        }
      } catch (error) {
        console.error("Error retrieving learner course progress:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveProgress();
  }, []);

  // Filter and sort courses
  const filteredCourses = catalog
    .filter((course) => {
      if (filter === "completed") return course.status === "completed";
      if (filter === "in-progress") return course.status === "in-progress";
      if (filter === "not-started") return course.status === "not-started";
      return true;
    })
    .filter((course) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.instructor.name.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "progress") {
        return b.progress - a.progress;
      }
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      // default: last-accessed (in-progress sorted by updatedAt/progress, then completed, then not started)
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });

  const isZeroCatalog = catalog.length === 0 || (enrolledCourses && enrolledCourses.length === 0);

  return (
    <div className="w-full space-y-6 pb-12">
      
      {/* PROFESSIONAL MINIMALIST TOP BANNER */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-xs flex flex-col justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8B5CF6] mb-1">
              <Sparkles className="w-3 h-3 fill-[#8B5CF6]" />
              <span>Learning Hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
              My Courses
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
              Track your progress across enrolled AI masterclasses, access interactive engineering workspaces, and verify earned diplomas.
            </p>
          </div>
          
          {!isZeroCatalog && (
            <div className="flex items-center gap-2 self-start md:self-auto w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2 bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] rounded-xl px-3 py-2 w-full sm:w-auto">
                <span className="text-[11px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase shrink-0">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs font-bold text-[#111827] dark:text-white focus:outline-hidden cursor-pointer capitalize"
                >
                  <option value="last-accessed">Last Accessed</option>
                  <option value="progress">Progress (High to Low)</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Segmented filter controls & sleek inline search */}
        {!isZeroCatalog && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.06]">
            <div className="bg-[#FAFAF7] dark:bg-white/[0.04] p-1.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center overflow-x-auto gap-1">
              {[
                { id: "all", label: "All Enrolled", count: catalog.length, icon: Layers },
                { id: "in-progress", label: "In Progress", count: catalog.filter(c => c.status === "in-progress").length, icon: Play },
                { id: "not-started", label: "Not Started", count: catalog.filter(c => c.status === "not-started").length, icon: Clock },
                { id: "completed", label: "Completed", count: catalog.filter(c => c.status === "completed").length, icon: CheckCircle2 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id as FilterTab)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap",
                      filter === tab.id
                        ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                        : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5", filter === tab.id ? "text-[#8B5CF6]" : "text-gray-400")} />
                    <span>{tab.label} ({tab.count})</span>
                  </button>
                );
              })}
            </div>

            {catalog.length > 2 && (
              <div className="relative shrink-0 sm:w-[240px]">
                <input
                  type="text"
                  placeholder="Search enrolled courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-medium text-[#111827] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] focus:outline-hidden focus:border-[#8B5CF6] transition-colors"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* DYNAMIC CONTENT STATE ENGINE */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
          <span className="text-xs font-bold">Synchronizing your learning progress...</span>
        </div>
      ) : isZeroCatalog ? (
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-10 sm:p-16 text-center shadow-xs max-w-3xl mx-auto my-8 flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-4 border border-[#8B5CF6]/20">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-[#111827] dark:text-white font-heading mb-1">
            No Active Masterclasses Found
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-md leading-relaxed mb-5">
            You currently do not have active course enrollments in your workspace. Discover our premier training programs in generative AI and agent development.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <span>Explore Catalog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white dark:bg-[#14182F] rounded-2xl border border-dashed border-[#E7E5F4] dark:border-white/[0.1] p-12 text-center my-6">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#111827] dark:text-white">No courses match this view</h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-sm mx-auto mb-4">
            There are no enrolled masterclasses currently in this completion status category.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold transition-all shadow-xs"
          >
            View All Enrolled Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course) => {
              const isCompleted = course.status === "completed";
              const isNotStarted = course.status === "not-started";
              const targetUrl = isCompleted 
                ? `/dashboard/workspace/${course.id}/certificate` 
                : `/dashboard/workspace/${course.id}`;

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group min-w-0"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative h-44 sm:h-48 bg-[#1F2937] overflow-hidden shrink-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      {isCompleted ? (
                        <span className="bg-[#14B8A6] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : isNotStarted ? (
                        <span className="bg-black/70 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full backdrop-blur-md border border-white/15">
                          Not Started
                        </span>
                      ) : (
                        <span className="bg-[#8B5CF6] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm">
                          In Progress
                        </span>
                      )}
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px]">
                      <span className="flex items-center gap-1 text-[#DAA520] font-semibold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
                        <Clock className="w-3 h-3" />
                        <span>{course.lastAccessed}</span>
                      </span>
                      {!isNotStarted && (
                        <span className="font-extrabold text-[#DAA520]">{course.progress}% Complete</span>
                      )}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                        <span>Instructor: {course.instructor.name}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight group-hover:text-[#8B5CF6] dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                        {course.title}
                      </h3>

                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed font-normal">
                        {course.description}
                      </p>

                      {!isNotStarted && (
                        <div className="w-full bg-[#FAFAF7] dark:bg-white/[0.08] h-1.5 rounded-full mt-4 overflow-hidden border border-[#E7E5F4]/50 dark:border-white/[0.05]">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isCompleted ? "bg-[#14B8A6]" : "bg-[#8B5CF6]"
                            )}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      href={targetUrl}
                      className={cn(
                        "w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs group/btn border",
                        isCompleted
                          ? "bg-[#14B8A6]/15 hover:bg-[#14B8A6] text-[#14B8A6] hover:text-white border-[#14B8A6]/30 hover:border-transparent"
                          : isNotStarted
                          ? "bg-[#111827] hover:bg-[#8B5CF6] dark:bg-white dark:text-[#111827] dark:hover:bg-[#8B5CF6] dark:hover:text-white text-white border-transparent"
                          : "bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-[#8B5CF6] hover:text-white text-[#111827] dark:text-white border-[#E7E5F4] dark:border-white/[0.1] hover:border-transparent"
                      )}
                    >
                      {isCompleted ? (
                        <>
                          <Award className="w-4 h-4 text-[#DAA520] group-hover/btn:text-white transition-colors" />
                          <span>View Verified Diploma</span>
                        </>
                      ) : isNotStarted ? (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Launch Masterclass</span>
                        </>
                      ) : (
                        <>
                          <span>Resume Workspace</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* EXPLORE CATALOG LINK FOOTER */}
      {!isZeroCatalog && (
        <div className="flex justify-center pt-4">
          <Link
            href="/courses"
            className="text-xs font-bold text-[#8B5CF6] hover:text-[#7C3AED] dark:hover:text-violet-400 flex items-center gap-1.5 hover:underline"
          >
            <span>Explore Additional Specialized Masterclasses in Our Catalog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

    </div>
  );
}
