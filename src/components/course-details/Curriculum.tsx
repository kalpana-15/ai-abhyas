"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, PlayCircle, FileText, Clock } from "lucide-react";

export function Curriculum({ curriculum }: { curriculum: any[] }) {
  const [openModule, setOpenModule] = useState<number | null>(1); // Open first by default

  const totalHours = curriculum.reduce((acc, curr) => acc + curr.hours, 0);
  const totalLessons = curriculum.reduce((acc, curr) => acc + curr.lessons, 0);

  return (
    <section className="mb-0.5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">Course Curriculum</h2>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive syllabus designed for practical mastery.</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-foreground">
          <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-primary" /> {curriculum.length} sections</span>
          <span className="flex items-center gap-1.5"><PlayCircle className="w-4 h-4 text-primary" /> {totalLessons} lectures</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {totalHours}h total length</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        {curriculum.map((mod, index) => {
          const isOpen = openModule === mod.id;
          const isLast = index === curriculum.length - 1;

          return (
            <div key={mod.id} className={!isLast ? "border-b border-border" : ""}>
              <button
                onClick={() => setOpenModule(isOpen ? null : mod.id)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-foreground shrink-0" />
                  )}
                  <h3 className="text-base font-bold text-foreground">{mod.title}</h3>
                </div>
                <div className="hidden sm:block text-xs font-medium text-muted-foreground shrink-0">
                  {mod.lessons} lectures • {mod.hours} min
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
                        {/* Mock Lessons since we don't have real lesson data */}
                        {Array.from({ length: mod.lessons || 3 }).map((_, i) => (
                          <li key={i} className="flex items-start justify-between p-3 px-4 sm:px-12 hover:bg-muted/20 transition-colors group cursor-pointer border-t border-border/50 first:border-0">
                            <div className="flex items-start gap-3">
                              <PlayCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {mod.title.split(' ')[0]} - Lesson {i + 1}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {(Math.random() * 10 + 5).toFixed(0)}:00
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
