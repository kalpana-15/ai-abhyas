"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import coursesData from "@/data/courses.json";
import { getCourseWorkspaceData } from "@/actions/lmsActions";
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Play, 
  CalendarPlus, 
  BellRing, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  X,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WorkspaceLiveSessionsPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "c1";
  const [course, setCourse] = useState<any>(coursesData.find((c) => c.id === courseId) || coursesData[0]);
  const [loadingDb, setLoadingDb] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [calendarAdded, setCalendarAdded] = useState<string[]>([]);
  const [activeStreamModal, setActiveStreamModal] = useState<any | null>(null);

  useEffect(() => {
    async function fetchCourseInfo() {
      try {
        setLoadingDb(true);
        const res = await getCourseWorkspaceData(courseId);
        if (res && res.success && res.course) {
          setCourse(res.course);
        }
      } catch (err) {
        console.error("Error retrieving live session context:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    fetchCourseInfo();
  }, [courseId]);

  const upcomingSessions = [
    {
      id: "live-1",
      title: `Live Studio: ${course.title} Office Hours & Debugging`,
      date: "August 2, 2026",
      time: "5:00 PM - 6:30 PM",
      timezone: "IST (GMT +5:30)",
      instructor: course.instructor?.name || "Dr. Sarah Chen",
      isImminent: true,
      countdown: "Starts in 20 min",
    },
    {
      id: "live-2",
      title: "Production Scaling: Guardrails & KV-Cache Optimization",
      date: "August 9, 2026",
      time: "5:00 PM - 6:30 PM",
      timezone: "IST (GMT +5:30)",
      instructor: course.instructor?.name || "Dr. Sarah Chen",
      isImminent: false,
      countdown: "In 7 days",
    },
  ];

  const pastRecordings = [
    {
      id: "rec-1",
      title: "Module 1 Replay: Token Vocabulary Spaces & Embedding Tuning",
      date: "July 26, 2026",
      duration: "1h 15m recording",
      instructor: course.instructor?.name || "Dr. Sarah Chen",
      views: "1.2k views",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "rec-2",
      title: "Mastering PyTorch Autograd & Transformer Multi-Head Math",
      date: "July 19, 2026",
      duration: "1h 40m recording",
      instructor: course.instructor?.name || "Dr. Sarah Chen",
      views: "2.4k views",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
  ];

  const handleAddToCalendar = (id: string, title: string) => {
    if (!calendarAdded.includes(id)) {
      setCalendarAdded((prev) => [...prev, id]);
    }
  };

  const handleOpenStream = (session: any) => {
    setActiveStreamModal(session);
  };

  if (loadingDb) {
    return (
      <div className="w-full min-h-[440px] bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] p-10 flex flex-col items-center justify-center text-center shadow-xl my-4 transition-colors">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <Sparkles className="w-5 h-5 text-[#DAA520] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h3 className="text-base font-extrabold font-heading text-[#111827] dark:text-white tracking-tight">
          Loading Live Studios & Classroom...
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-sm font-medium">
          Synchronizing upcoming masterclass dates and recorded video archives from PostgreSQL...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12 relative">
      {/* HEADER SECTION & TABS */}
      <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Live Sessions &amp; Classroom
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Engage with course instructors in real-time or catch up on high-definition recorded archives at your own convenience.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#FAFAF7] dark:bg-white/[0.04] p-1.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-2",
              activeTab === "upcoming"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <span>Upcoming Sessions</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md", activeTab === "upcoming" ? "bg-[#8B5CF6]/15 text-[#8B5CF6]" : "bg-[#E7E5F4]/50 dark:bg-white/[0.06]")}>
              {upcomingSessions.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-2",
              activeTab === "past"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <span>Past Recordings</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md", activeTab === "past" ? "bg-[#8B5CF6]/15 text-[#8B5CF6]" : "bg-[#E7E5F4]/50 dark:bg-white/[0.06]")}>
              {pastRecordings.length}
            </span>
          </button>
        </div>
      </div>

      {/* CONTENT LISTING */}
      {activeTab === "upcoming" ? (
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#14182F] rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {session.isImminent ? (
                    <span className="bg-[#DAA520] text-[#111827] text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm animate-pulse">
                      <BellRing className="w-3.5 h-3.5 fill-[#111827]" />
                      <span>{session.countdown}</span>
                    </span>
                  ) : (
                    <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-violet-300 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {session.countdown}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Instructor: {session.instructor}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight">
                  {session.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#374151] dark:text-[#E5E7EB] font-medium pt-1">
                  <span className="flex items-center gap-1.5 bg-[#FAFAF7] dark:bg-white/[0.04] px-2.5 py-1 rounded-md border border-[#E7E5F4] dark:border-white/[0.08]">
                    <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{session.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#FAFAF7] dark:bg-white/[0.04] px-2.5 py-1 rounded-md border border-[#E7E5F4] dark:border-white/[0.08]">
                    <Clock className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>{session.time}</span>
                    <strong className="text-[#8B5CF6] dark:text-violet-400 font-extrabold ml-0.5">
                      {session.timezone}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t border-[#E7E5F4] dark:border-white/[0.08] md:border-t-0">
                <button
                  type="button"
                  onClick={() => handleAddToCalendar(session.id, session.title)}
                  disabled={calendarAdded.includes(session.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-2xs border",
                    calendarAdded.includes(session.id)
                      ? "bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/30 cursor-default"
                      : "bg-[#FAFAF7] dark:bg-white/[0.04] hover:bg-[#E7E5F4]/50 dark:hover:bg-white/[0.08] text-[#374151] dark:text-[#E5E7EB] border-[#E7E5F4] dark:border-white/[0.15]"
                  )}
                >
                  {calendarAdded.includes(session.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Calendar</span>
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="w-4 h-4 text-[#8B5CF6]" />
                      <span>Add to Calendar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenStream(session)}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Video className="w-4 h-4 fill-current" />
                  <span>Join Classroom Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {pastRecordings.map((rec) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#14182F] rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div>
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-semibold">
                    Recorded on {rec.date} &bull; {rec.views}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight group-hover:text-[#8B5CF6] transition-colors">
                  {rec.title}
                </h3>
                
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{rec.duration} &bull; Presented by {rec.instructor}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenStream(rec)}
                className="px-5 py-2.5 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs shrink-0 w-full md:w-auto"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Recording</span>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* STREAMING VIDEO MODAL */}
      <AnimatePresence>
        {activeStreamModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStreamModal(null)}
              className="fixed inset-0 bg-[#060816]/80 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white font-heading">
                    {activeStreamModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStreamModal(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  className="w-full h-full object-cover"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B7280] dark:text-[#9CA3AF] pt-2">
                <span>Instructor: <strong>{activeStreamModal.instructor || "Dr. Sarah Chen"}</strong> &bull; Live Video Stream</span>
                <button
                  type="button"
                  onClick={() => setActiveStreamModal(null)}
                  className="px-5 py-2 rounded-xl bg-[#8B5CF6] text-white font-bold text-xs"
                >
                  Leave Studio Classroom
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
