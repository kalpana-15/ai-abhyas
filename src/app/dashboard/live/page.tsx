"use client";

import React, { useState, useEffect } from "react";
import { getLiveSessions, registerForLiveSession } from "@/actions/dashboardActions";
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Loader2, 
  X, 
  Radio, 
  ShieldAlert 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LiveMasterclassesPage() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registeredList, setRegisteredList] = useState<string[]>([]);
  const [activeStreamModal, setActiveStreamModal] = useState<any | null>(null);

  useEffect(() => {
    async function fetchWebinars() {
      try {
        setLoading(true);
        const res = await getLiveSessions();
        if (res.success && res.sessions) {
          setSessions(res.sessions);
        }
      } catch (err) {
        console.error("Error loading live webinars:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWebinars();
  }, []);

  const handleRegister = async (sessionId: string) => {
    try {
      setRegisteringId(sessionId);
      const res = await registerForLiveSession(sessionId);
      if (res.success) {
        setRegisteredList((prev) => [...prev, sessionId]);
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, attendeeCount: s.attendeeCount + 1 } : s))
        );
      } else {
        alert(res?.error || "Could not register for session.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRegisteringId(null);
    }
  };

  const handleOpenStream = (session: any) => {
    setActiveStreamModal(session);
  };

  const upcomingSessions = sessions.filter((s) => s.status !== "Recorded");
  const recordedSessions = sessions.filter((s) => s.status === "Recorded");

  return (
    <div className="w-full space-y-8 pb-12">
      {/* HERO BANNER */}
      <div className="relative rounded-[22px] bg-gradient-to-r from-[#111827] via-[#1E293B] to-[#14182F] text-white p-6 sm:p-8 shadow-lg border border-white/[0.1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 mb-1">
            <Radio className="w-3 h-3 text-red-500 animate-pulse" />
            <span>Live Webclasses</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
            Live Studio &amp; Office Hours
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            Participate in real-time code reviews, Q&amp;A troubleshooting sessions, and watch archived workshop recordings.
          </p>
        </div>
        
        <div className="bg-white/[0.06] backdrop-blur-md px-5 py-4 rounded-2xl border border-white/[0.1] shrink-0 self-start md:self-center flex items-center gap-3.5 shadow-md">
          <Video className="w-7 h-7 text-[#DAA520]" />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">Scheduled Webinars</span>
            <span className="text-base font-extrabold text-white">{sessions.length} Scheduled Events</span>
          </div>
        </div>
      </div>

      {/* UPCOMING & LIVE SESSIONS */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#111827] dark:text-white font-heading tracking-tight flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#8B5CF6]" />
          <span>Upcoming Webclasses</span>
        </h2>

        {loading ? (
          <div className="py-12 flex items-center justify-center text-[#6B7280] gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#8B5CF6]" />
            <span className="text-xs font-semibold">Syncing schedule from database...</span>
          </div>
        ) : upcomingSessions.length === 0 ? (
          <div className="bg-white dark:bg-[#14182F] p-8 rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] text-center text-gray-500 text-xs font-medium">
            No upcoming live sessions currently scheduled. Please check back later or review archived recordings below.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {upcomingSessions.map((s) => {
              const isRegistered = registeredList.includes(s.id);
              const isWorking = registeringId === s.id;

              return (
                <div key={s.id} className="bg-white dark:bg-[#14182F] rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {s.status}
                      </span>
                      <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>{s.attendeeCount} Registered</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs font-medium text-[#374151] dark:text-gray-300">
                      <div className="flex items-center gap-1.5 font-semibold text-[#8B5CF6]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(s.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at 10:00 AM EST</span>
                      </div>
                      <span className="text-[11px] text-[#6B7280] block mt-0.5">Instructor: {s.instructor} &bull; {s.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isRegistered ? (
                        <button
                          type="button"
                          onClick={() => handleOpenStream(s)}
                          className="px-5 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold text-xs shadow-md flex items-center gap-2 active:scale-95"
                        >
                          <Video className="w-4 h-4 fill-white" />
                          <span>Enter Studio</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isWorking}
                          onClick={() => handleRegister(s.id)}
                          className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
                        >
                          {isWorking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                          <span>{isWorking ? "Saving..." : "Register & Save Seat"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ARCHIVED RECORDINGS SECTION */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-[#111827] dark:text-white font-heading tracking-tight flex items-center gap-2">
          <Play className="w-4 h-4 text-[#DAA520] fill-[#DAA520]" />
          <span>Archived Recordings</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recordedSessions.map((s) => (
            <div key={s.id} className="bg-white dark:bg-[#14182F] rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <span className="bg-[#DAA520]/15 text-[#DAA520] font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-md inline-block">
                  Recorded Replay &bull; {s.duration}
                </span>
                <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading line-clamp-2">
                  {s.title}
                </h3>
                <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2">
                  {s.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenStream(s)}
                className="w-full py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-[#8B5CF6]/15 hover:text-[#8B5CF6] dark:hover:text-violet-300 font-bold text-xs text-[#374151] dark:text-white transition-all flex items-center justify-center gap-2 border border-[#E7E5F4] dark:border-white/[0.1]"
              >
                <Play className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />
                <span>Watch HD Recording</span>
              </button>
            </div>
          ))}
        </div>
      </div>

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
                  <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase block">AI Abhyas Interactive Studio</span>
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
                  src={activeStreamModal.recordingUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B7280] dark:text-[#9CA3AF] pt-2">
                <span>Instructor: <strong>{activeStreamModal.instructor}</strong> &bull; {activeStreamModal.duration}</span>
                <button
                  type="button"
                  onClick={() => setActiveStreamModal(null)}
                  className="px-5 py-2 rounded-xl bg-[#8B5CF6] text-white font-bold text-xs"
                >
                  Close Studio Video
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
