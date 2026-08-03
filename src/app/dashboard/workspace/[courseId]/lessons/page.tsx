"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import coursesData from "@/data/courses.json";
import { getCourseWorkspaceData, toggleLessonCompletion } from "@/actions/lmsActions";
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  Sparkles,
  RotateCcw,
  Loader2,
  Check,
  PlayCircle,
  Film,
  Award,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LessonItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  status: "completed" | "active" | "not-started";
  videoUrl?: string;
  dbId?: string;
}

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  lessons: LessonItem[];
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

export default function WorkspaceLessonsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const initialLessonParam = searchParams?.get("lesson") || "1";

  const courseId = (params?.courseId as string) || "c1";
  const course = coursesData.find((c) => c.id === courseId) || coursesData[0];

  // Default structure initialized strictly to 0% completed until database verification
  const initialDefaultModules: ModuleItem[] = [
    {
      id: "mod-1",
      title: "Module 1: Foundations of Generative AI & Large Models",
      description: "Understand probabilistic modeling, token vocabulary spaces, and evolution from RNNs to Transformers.",
      lessons: [
        { id: "l-1", number: "1.1", title: "Evolution of Language Models & N-Grams", duration: "18 mins", status: "not-started" },
        { id: "l-2", number: "1.2", title: "Token Embeddings & Byte-Pair Encoding (BPE)", duration: "24 mins", status: "not-started" },
        { id: "l-3", number: "1.3", title: "Hands-on Lab: Inspecting Vocab Embeddings in PyTorch", duration: "35 mins", status: "not-started" },
      ],
    },
    {
      id: "mod-2",
      title: "Module 2: Transformer Architectures & Self-Attention",
      description: "Deep dive into Scaled Dot-Product Attention, Multi-Head projections, and Positional Encodings.",
      lessons: [
        { id: "l-4", number: "2.1", title: "Self-Attention Mechanics ($Q$, $K$, and $V$ matrices)", duration: "28 mins", status: "not-started" },
        { id: "l-5", number: "2.2", title: "Multi-Head Projections & Parallel Feed-Forward Blocks", duration: "32 mins", status: "not-started" },
        { id: "l-6", number: "2.3", title: "Rotary & Sinusoidal Positional Embeddings (RoPE)", duration: "25 mins", status: "not-started" },
        { id: "l-7", number: "2.4", title: "Workshop: Building a Miniature Transformer Scratch Block", duration: "45 mins", status: "not-started" },
      ],
    }
  ];

  const [modules, setModules] = useState<ModuleItem[]>(initialDefaultModules);
  const [openModules, setOpenModules] = useState<string[]>(["mod-1", "mod-2"]);
  const [activeLesson, setActiveLesson] = useState<LessonItem>(initialDefaultModules[0].lessons[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loadingDb, setLoadingDb] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDatabaseModules() {
      try {
        setLoadingDb(true);
        const res = await getCourseWorkspaceData(courseId);
        if (res && res.success && res.course && res.course.modules && res.course.modules.length > 0) {
          const completedSet = new Set(res.userProgress?.completedLessons || []);
          
          const dbMods: ModuleItem[] = res.course.modules.map((m: any, mIndex: number) => {
            return {
              id: m.id,
              title: m.title || `Module ${mIndex + 1}`,
              description: m.description || "",
              lessons: (m.lessons || []).map((l: any, lIndex: number) => {
                const isDone = completedSet.has(l.id);
                return {
                  id: l.id,
                  dbId: l.id,
                  number: `${mIndex + 1}.${lIndex + 1}`,
                  title: l.title || `Lesson ${lIndex + 1}`,
                  duration: l.duration || "25 mins",
                  status: isDone ? "completed" : "not-started",
                  videoUrl: l.videoUrl || "https://www.youtube.com/embed/aircAruvnKk?autoplay=1",
                };
              }),
            };
          });

          setModules(dbMods);
          if (dbMods.length > 0 && dbMods[0].lessons.length > 0) {
            const allLess = dbMods.flatMap((mod) => mod.lessons);
            const targetLesson = allLess.find(l => l.number === initialLessonParam || l.id === initialLessonParam) 
                              || allLess.find((l) => l.status !== "completed") 
                              || dbMods[0].lessons[0];
            setActiveLesson(targetLesson);
            const parentMod = dbMods.find((mod) => mod.lessons.some((l) => l.id === targetLesson.id));
            if (parentMod && !openModules.includes(parentMod.id)) {
              setOpenModules(prev => Array.from(new Set([...prev, parentMod.id])));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching lesson modules:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    fetchDatabaseModules();
  }, [courseId, initialLessonParam]);

  const toggleModule = (id: string) => {
    setOpenModules((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectLesson = (lesson: LessonItem, modId: string) => {
    setActiveLesson(lesson);
    setIsPlaying(true);
    if (!openModules.includes(modId)) {
      setOpenModules((prev) => [...prev, modId]);
    }
    // Scroll player smoothly into view on mobile
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const handleToggleLessonCompletion = async (lesson: LessonItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (togglingId) return;

    const currentCompleted = lesson.status === "completed";
    const nextCompleted = !currentCompleted;
    const nextStatus = nextCompleted ? "completed" : "not-started";

    setTogglingId(lesson.id);
    setModules((prev) =>
      prev.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((l) => (l.id === lesson.id ? { ...l, status: nextStatus as any } : l)),
      }))
    );
    if (activeLesson.id === lesson.id) {
      setActiveLesson((prev) => ({ ...prev, status: nextStatus as any }));
    }

    try {
      await toggleLessonCompletion(lesson.dbId || lesson.id, nextCompleted, courseId);
    } catch (error) {
      console.error("Error updating PostgreSQL lesson progress:", error);
    } finally {
      setTogglingId(null);
    }
  };

  // Calculate overall course stats
  const allLessons = modules.flatMap(m => m.lessons);
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = allLessons.filter(l => l.status === "completed").length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  if (loadingDb) {
    return (
      <div className="w-full min-h-[450px] bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] p-12 flex flex-col items-center justify-center text-center shadow-sm my-2 transition-colors">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-3 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <Sparkles className="w-5 h-5 text-[#DAA520] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h3 className="text-base font-bold font-heading text-[#111827] dark:text-white tracking-tight">
          Synchronizing Masterclass Studio...
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-sm font-medium">
          Loading HD curriculum streams and verifying your completed milestones from PostgreSQL...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* ===================================================================== */}
      {/* ACTIVE LESSON STUDIO & VIDEO PLAYER                                    */}
      {/* ===================================================================== */}
      <div className="bg-white dark:bg-[#14182F] rounded-[28px] border border-[#E7E5F4] dark:border-white/[0.08] p-5 sm:p-7 shadow-lg transition-all">
        
        {/* Studio Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E7E5F4] dark:border-white/[0.08]">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wide">
                Lesson {activeLesson.number}
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-extrabold text-[#111827] dark:text-white font-heading tracking-tight truncate">
              {activeLesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            {/* Mark Complete Action Toggle */}
            <button
              type="button"
              onClick={(e) => handleToggleLessonCompletion(activeLesson, e)}
              disabled={!!togglingId}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs active:scale-95",
                activeLesson.status === "completed"
                  ? "bg-[#14B8A6]/15 text-[#14B8A6] hover:bg-[#14B8A6]/25 border border-[#14B8A6]/30"
                  : "bg-[#FAFAF7] dark:bg-white/[0.06] text-[#374151] dark:text-zinc-200 hover:text-[#8B5CF6] dark:hover:text-white border border-[#E7E5F4] dark:border-white/[0.12]"
              )}
            >
              {togglingId === activeLesson.id ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />
              ) : activeLesson.status === "completed" ? (
                <>
                  <div className="w-4 h-4 rounded-full bg-[#14B8A6] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-zinc-400 dark:border-zinc-500" />
                  <span>Mark as Done</span>
                </>
              )}
            </button>

            {/* Duration Tag */}
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 text-[#6B7280] dark:text-[#9CA3AF] text-xs font-semibold border border-[#E7E5F4] dark:border-white/[0.08]">
              <Clock className="w-4 h-4 text-[#8B5CF6]" />
              <span>{activeLesson.duration}</span>
            </div>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full rounded-[22px] overflow-hidden bg-[#060816] border border-black/40 dark:border-white/[0.1] shadow-2xl group select-none">
          {isPlaying ? (
            <div className="w-full h-full relative bg-black flex flex-col items-center justify-center">
              {(() => {
                const ytEmbed = getYouTubeEmbedUrl(activeLesson.videoUrl);
                if (ytEmbed) {
                  return (
                    <iframe
                      key={activeLesson.id}
                      src={ytEmbed}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0 aspect-video"
                    />
                  );
                }
                return (
                  <video 
                    key={activeLesson.id}
                    src={activeLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                );
              })()}
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md border border-white/20 z-10 shadow-xl active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Close Player</span>
              </button>
            </div>
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center overflow-hidden group/thumb"
            >
              {/* Thumbnail Background with cinema zoom effect */}
              <img 
                src={course.image || "/Assets/images/ai masterclase.png"} 
                alt="Lesson Thumbnail" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/thumb:scale-105 group-hover/thumb:opacity-75 transition-all duration-700 ease-out" 
              />
              
              {/* Atmospheric Dark & Purple Gradient Masks */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-[#060816]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 opacity-80" />

              {/* Dead-Center Luxury Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <motion.div 
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#8B5CF6]/30 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.6)] group-hover/thumb:scale-110 group-hover/thumb:border-white/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white flex items-center justify-center shadow-lg group-hover/thumb:shadow-[0_0_30px_rgba(139,92,246,0.9)] transition-all">
                    {/* Translate 2px right to visually center triangle in circle */}
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-[2px]" />
                  </div>
                </motion.div>
                <span className="mt-4 text-xs font-semibold tracking-wide text-zinc-300 opacity-90 group-hover/thumb:opacity-100 group-hover/thumb:text-white transition-opacity drop-shadow-md">
                  Click to launch interactive video session
                </span>
              </div>

              {/* Bottom Information Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 bg-gradient-to-t from-[#060816] via-[#060816]/80 to-transparent z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
                <div className="max-w-2xl">
                  <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight drop-shadow-md line-clamp-1 font-heading">
                    Lesson {activeLesson.number}: {activeLesson.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shrink-0">
                  <PlayCircle className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Watch Stream ({activeLesson.duration})</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* ===================================================================== */}
      {/* CURRICULUM MODULES ACCORDION                                          */}
      {/* ===================================================================== */}
      <div className="space-y-5">
        
        {/* Section Header with Overall Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h2 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
              <span>Curriculum & Lessons</span>
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
              Select any lesson to play its video or track your milestone progress.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-[#14182F] px-4 py-2.5 rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs shrink-0">
            <Award className="w-5 h-5 text-[#14B8A6]" />
            <div className="text-left">
              <div className="text-[10px] font-extrabold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                Course Progress
              </div>
              <div className="text-xs font-extrabold text-[#111827] dark:text-white">
                {completedLessonsCount} of {totalLessonsCount} Lessons ({progressPercent}%)
              </div>
            </div>
            {/* Tiny progress bar */}
            <div className="w-16 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden ml-2 hidden sm:block">
              <div className="h-full bg-[#14B8A6] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.map((mod, modIdx) => {
            const isOpen = openModules.includes(mod.id);
            const completedCount = mod.lessons.filter((l) => l.status === "completed").length;
            const isAllCompleted = mod.lessons.length > 0 && completedCount === mod.lessons.length;

            return (
              <div 
                key={mod.id}
                className={cn(
                  "bg-white dark:bg-[#14182F] rounded-[22px] border transition-all duration-300 overflow-hidden",
                  isOpen 
                    ? "border-[#8B5CF6]/40 dark:border-[#8B5CF6]/30 shadow-md" 
                    : "border-[#E7E5F4] dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                {/* Accordion Module Header Button */}
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className={cn(
                    "w-full px-6 py-5 flex items-center justify-between text-left transition-colors focus:outline-none gap-4",
                    isOpen ? "bg-[#FAFAF7]/80 dark:bg-white/[0.03]" : "hover:bg-[#FAFAF7]/50 dark:hover:bg-white/[0.015]"
                  )}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8B5CF6]">
                        Module {modIdx + 1}
                      </span>
                      {isAllCompleted && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/30 flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight leading-snug">
                      {mod.title.replace(`Module ${modIdx + 1}: `, "")}
                    </h3>
                    {!!mod.description && (
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-normal line-clamp-1">
                        {mod.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden md:block">
                      <span className="text-xs font-bold text-[#111827] dark:text-white block">
                        {completedCount} / {mod.lessons.length} Done
                      </span>
                      <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                        {mod.lessons.length} Video Lessons
                      </span>
                    </div>
                    <div 
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border",
                        isOpen 
                          ? "bg-[#8B5CF6] text-white border-[#8B5CF6] rotate-180 shadow-xs" 
                          : "bg-[#FAFAF7] dark:bg-white/[0.05] text-[#6B7280] dark:text-[#9CA3AF] border-[#E7E5F4] dark:border-white/[0.08]"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Lessons List */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="border-t border-[#E7E5F4] dark:border-white/[0.08] divide-y divide-[#E7E5F4] dark:divide-white/[0.05] bg-white dark:bg-[#0A0D1D]/50 overflow-hidden"
                    >
                      {mod.lessons.map((lesson) => {
                        const isSelected = activeLesson.id === lesson.id;
                        const isCompleted = lesson.status === "completed";
                        const isToggling = togglingId === lesson.id;

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson, mod.id)}
                            className={cn(
                              "px-6 py-4 flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-[#FAFAF7]/80 dark:hover:bg-white/[0.04] group",
                              isSelected 
                                ? "bg-[#8B5CF6]/[0.08] dark:bg-[#8B5CF6]/[0.12] border-l-[4px] border-l-[#8B5CF6]" 
                                : "border-l-[4px] border-l-transparent"
                            )}
                          >
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                              
                              {/* Clean Circle Checkbox Toggle */}
                              <button
                                type="button"
                                title={isCompleted ? "Mark as uncompleted" : "Mark lesson completed"}
                                disabled={isToggling}
                                onClick={(e) => handleToggleLessonCompletion(lesson, e)}
                                className="shrink-0 focus:outline-none group/btn p-1 -m-1"
                              >
                                {isToggling ? (
                                  <Loader2 className="w-5 h-5 animate-spin text-[#8B5CF6]" />
                                ) : isCompleted ? (
                                  <div className="w-6 h-6 rounded-full bg-[#14B8A6] text-white flex items-center justify-center shadow-xs transition-transform group-hover/btn:scale-110">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center transition-all group-hover/btn:border-[#8B5CF6] group-hover/btn:scale-110">
                                    <Check className="w-3 h-3 text-transparent group-hover/btn:text-[#8B5CF6]/40 transition-colors stroke-[3]" />
                                  </div>
                                )}
                              </button>

                              {/* Lesson Title & Specs */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-extrabold text-[#6B7280] dark:text-[#9CA3AF] shrink-0">
                                    {lesson.number}
                                  </span>
                                  <h4 
                                    className={cn(
                                      "text-xs font-semibold tracking-tight truncate transition-colors group-hover:text-[#8B5CF6] dark:group-hover:text-[#A855F7]",
                                      isSelected ? "text-[#8B5CF6] dark:text-violet-300 font-bold" : "text-[#111827] dark:text-zinc-200"
                                    )}
                                  >
                                    {lesson.title}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1 font-medium">
                                  <Clock className="w-3 h-3 text-[#8B5CF6]" />
                                  <span>{lesson.duration}</span>
                                  {isCompleted && (
                                    <span className="text-[#14B8A6] font-bold inline-flex items-center gap-1">
                                      &bull; Done
                                    </span>
                                  )}
                                  {isSelected && (
                                    <span className="text-[#8B5CF6] font-extrabold inline-flex items-center gap-1 animate-pulse">
                                      &bull; Streaming Now
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Row Action Badge / Play CTA */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectLesson(lesson, mod.id);
                              }}
                              className={cn(
                                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-2xs",
                                isSelected
                                  ? "bg-[#8B5CF6] text-white shadow-xs"
                                  : "bg-transparent sm:bg-white sm:dark:bg-[#14182F] text-[#6B7280] dark:text-zinc-300 sm:border sm:border-[#E7E5F4] sm:dark:border-white/[0.1] group-hover:text-[#8B5CF6] sm:group-hover:border-[#8B5CF6]"
                              )}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span className="hidden sm:inline">
                                {isSelected ? "Playing" : "Watch"}
                              </span>
                            </button>

                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
