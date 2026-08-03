"use client";

import React from "react";
import Link from "next/link";
import { Play, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ContinueLearning({ courseTitle }: { courseTitle: string }) {
  const progress = 68;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#14182F] rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs p-3.5 sm:p-4 flex flex-col min-w-0 transition-all"
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E7E5F4] dark:border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
          <h2 className="text-[11px] sm:text-xs font-semibold text-[#111827] dark:text-white font-heading uppercase tracking-wider">
            Continue Learning
          </h2>
        </div>
        <Link 
          href="/dashboard/courses" 
          className="text-[11px] font-medium text-[#8B5CF6] hover:underline"
        >
          My Courses &rarr;
        </Link>
      </div>

      {/* Main Lesson Module content */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
        
        {/* Compact Course Thumbnail / Graphic */}
        <div className="relative w-full sm:w-[110px] h-[75px] sm:h-[85px] rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[#0F1225] to-[#1E1B4B] border border-white/[0.08] flex items-center justify-center">
          <div className="w-10 h-10 text-[#8B5CF6] opacity-80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-black/60 text-white backdrop-blur-xs uppercase tracking-wider">
            Mod 8
          </span>
        </div>

        {/* Course Progress Information */}
        <div className="flex-1 min-w-0 w-full">
          <h3 className="text-xs sm:text-[13px] font-bold text-[#111827] dark:text-white truncate mb-0.5">
            {courseTitle}
          </h3>
          <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mb-2.5 truncate">
            Lesson 8 of 24 &bull; Advanced Prompt Engineering Techniques
          </p>
          
          {/* Compact Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] font-semibold mb-1">
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">Completion Progress</span>
              <span className="text-[#111827] dark:text-white">{progress}%</span>
            </div>
            <div className="w-full h-1 bg-[#E7E5F4] dark:bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              type="button" 
              className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white text-[11px] font-semibold py-1.5 px-3.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 shadow-sm shadow-[#8B5CF6]/20"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Resume Lesson</span>
            </button>
            
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#FAFAF7] dark:bg-white/[0.03] rounded-lg text-[10px] font-medium text-[#6B7280] dark:text-[#9CA3AF] border border-[#E7E5F4] dark:border-white/[0.06]">
              <Clock className="w-2.5 h-2.5 text-[#8B5CF6]" />
              <span>22 min remaining</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
