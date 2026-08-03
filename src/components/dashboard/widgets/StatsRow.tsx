"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Flame, Clock } from "lucide-react";

export interface StatsRowProps {
  enrolledCount?: number;
  studyHoursToday?: number;
  completedLessonsCount?: number;
  currentStreak?: number;
}

export function StatsRow({ 
  enrolledCount = 0, 
  studyHoursToday = 0,
  completedLessonsCount = 0,
  currentStreak = 0
}: StatsRowProps) {
  const stats = [
    {
      title: "Enrolled Courses",
      value: enrolledCount,
      subtitle: `${enrolledCount} active AI program${enrolledCount !== 1 ? "s" : ""}`,
      icon: BookOpen,
      color: "text-[#8B5CF6] dark:text-[#A855F7]",
      bg: "bg-[#8B5CF6]/10",
    },
    {
      title: "Learning Time Today",
      value: `${studyHoursToday}h`,
      subtitle: "Real-time study duration today",
      icon: Clock,
      color: "text-[#10B981]",
      bg: "bg-[#10B981]/10",
    },
    {
      title: "Lessons Completed",
      value: completedLessonsCount.toString(),
      subtitle: "Verified curriculum milestones",
      icon: CheckCircle2,
      color: "text-[#14B8A6]",
      bg: "bg-[#14B8A6]/10",
    },
    {
      title: "Current Learning Streak",
      value: `${currentStreak} Day${currentStreak !== 1 ? "s" : ""}`,
      subtitle: "Daily active learning momentum",
      icon: Flame,
      color: "text-[#DAA520]",
      bg: "bg-[#DAA520]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 my-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * idx, duration: 0.25 }}
            className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md rounded-[14px] p-4 border border-[#E7E5F4] dark:border-white/[0.08] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full min-w-0 group"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] block leading-tight">
                  {stat.title}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white tracking-tight leading-none mt-1.5 font-mono">
                  {stat.value}
                </h3>
              </div>
              <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-normal pt-2 border-t border-[#E7E5F4] dark:border-white/[0.06]">
              {stat.subtitle}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
