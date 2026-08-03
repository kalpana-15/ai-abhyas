"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, PlayCircle, FileText, Clock } from "lucide-react";

export function Curriculum({ curriculum = [] }: { curriculum?: any[] }) {
  const [openModule, setOpenModule] = useState<number | null>(1); // Open first by default

  const safeCurriculum = curriculum || [];
  const totalHours = safeCurriculum.reduce((acc, curr) => acc + (curr.hours || 0), 0);
  const totalLessons = safeCurriculum.reduce((acc, curr) => acc + (curr.lessons || 0), 0);

  // Deterministic calculation for accurate lesson time display
  const getLessonDurationLabel = (totalHours: number, totalLessons: number, index: number) => {
    const totalMinutes = (totalHours || 1) * 60;
    const count = totalLessons || 1;
    const baseMinutes = Math.floor(totalMinutes / count);
    const lessonMinutes = index === 0 ? baseMinutes + (totalMinutes % count) : baseMinutes;

    const hours = Math.floor(lessonMinutes / 60);
    const minutes = lessonMinutes % 60;

    if (hours > 0 && minutes === 0) return `${hours}h 00m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes} mins`;
  };

  return (
    <section className="mb-0.5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">Course Curriculum</h2>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive syllabus designed for practical mastery.</p>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" /> {safeCurriculum.length} modules</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" /> {totalLessons} lectures</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" /> {totalHours}h total</span>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-card shadow-xs">
        {safeCurriculum.map((mod, index) => {
          const isOpen = openModule === mod.id;
          const isLast = index === safeCurriculum.length - 1;
          const lessonCount = mod.lessons || 1;
          const moduleHours = mod.hours || 1;
          const cleanTitle = mod.title.includes(":") ? mod.title.split(":")[1].trim() : mod.title;

          return (
            <div key={mod.id} className={!isLast ? "border-b border-border" : ""}>
              <button
                type="button"
                onClick={() => setOpenModule(isOpen ? null : mod.id)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3 pr-4">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <h3 className="text-sm sm:text-base font-bold text-foreground font-heading">{mod.title}</h3>
                </div>
                <div className="text-xs font-semibold text-muted-foreground shrink-0 bg-background px-2.5 py-1 rounded-full border border-border">
                  {lessonCount} {lessonCount === 1 ? "lecture" : "lectures"} • {moduleHours} {moduleHours === 1 ? "hr" : "hrs"}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-card">
                      <ul className="flex flex-col">
                        {Array.from({ length: lessonCount }).map((_, i) => (
                          <li key={i} className="flex items-center justify-between py-3 px-4 sm:px-12 hover:bg-muted/30 transition-colors group cursor-pointer border-t border-border/40 first:border-0">
                            <div className="flex items-center gap-3 min-w-0 pr-4">
                              <PlayCircle className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
                              <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                {lessonCount === 1 ? `Lecture: ${cleanTitle}` : `Lecture ${i + 1}: ${cleanTitle} (Part ${i + 1})`}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-md shrink-0">
                              {getLessonDurationLabel(moduleHours, lessonCount, i)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
