"use client";

import React from "react";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function ContinueLearning({ courseTitle }: { courseTitle: string }) {
  // We'll use a dummy progress of 68% for the visual
  const progress = 68;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-[24px] border border-border shadow-sm p-6 flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground font-heading">Continue Learning</h2>
        <Link href="/dashboard/courses" className="text-sm font-medium text-primary hover:underline">
          View My Courses &rarr;
        </Link>
      </div>

      <div className="flex gap-5 flex-1 items-center">
        {/* Course Thumbnail */}
        <div className="relative w-[140px] h-[140px] rounded-[16px] overflow-hidden shrink-0 bg-blue-900 border border-blue-800">
           {/* Placeholder for AI Brain image */}
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-blue-900 flex items-center justify-center">
             <div className="w-20 h-20 opacity-70">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan-400 w-full h-full" strokeWidth="1">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
             </div>
           </div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Course Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-foreground mb-1">{courseTitle}</h3>
          <p className="text-xs text-muted-foreground mb-5">Lesson 8 of 24 &nbsp;|&nbsp; Prompt Engineering Techniques</p>
          
          <div className="mb-5">
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-colors">
              <Play className="w-4 h-4 fill-primary-foreground" /> Continue Learning
            </button>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-muted rounded-lg text-xs font-medium text-muted-foreground border border-border">
              <Clock className="w-3.5 h-3.5" /> 22 min left
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
