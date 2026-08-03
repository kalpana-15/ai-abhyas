"use client";

import React from "react";
import { TrendingUp, Flame, Clock, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function MyProgressWidget() {
  const completionPercent = 74;

  return (
    <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.1] shadow-xs p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7E5F4] dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-[#111827] dark:text-white font-heading">My Progress</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Active
        </span>
      </div>

      {/* Main Completion Meter */}
      <div className="flex items-center justify-between gap-4 mb-5 p-3.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.03] border border-[#E7E5F4] dark:border-white/[0.05]">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">
            <span>Curriculum goals</span>
            <span className="text-[#111827] dark:text-white font-bold">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#E5E7EB] dark:bg-zinc-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#10B981] rounded-full transition-all duration-1000" 
              style={{ width: `${completionPercent}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/15 text-orange-500 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <div>
            <span className="block text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">Daily streak</span>
            <span className="text-sm font-bold text-[#111827] dark:text-white">14 Days</span>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">Study time</span>
            <span className="text-sm font-bold text-[#111827] dark:text-white">38 Hours</span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-auto pt-2">
        <Link
          href="/dashboard/results"
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#8B5CF6] dark:text-[#A855F7] hover:bg-[#8B5CF6]/10 dark:hover:bg-[#8B5CF6]/20 transition-colors flex items-center justify-center gap-1 text-center border border-[#8B5CF6]/20"
        >
          <span>View detailed analytics</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
