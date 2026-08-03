"use client";

import React from "react";
import Link from "next/link";
import { FileText, ClipboardList, AlertCircle } from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  FileText,
  ClipboardList,
};

export function PendingAssessments({ assessments }: { assessments: any[] }) {
  return (
    <div className="bg-white dark:bg-[#14182F] rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs p-3.5 sm:p-4 flex flex-col h-full min-w-0 transition-all">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E7E5F4] dark:border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 text-[#8B5CF6]" />
          <h2 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-white font-heading">
            Pending Assessments
          </h2>
        </div>
        <Link href="/dashboard/assessments" className="text-[11px] font-medium text-[#8B5CF6] hover:underline">
          View All &rarr;
        </Link>
      </div>

      <div className="space-y-2.5 flex-1">
        {assessments.map((item, idx) => {
          const IconComponent = IconMap[item.icon] || FileText;
          return (
            <div 
              key={idx} 
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#FAFAF7] dark:bg-white/[0.02] border border-[#E7E5F4]/70 dark:border-white/[0.05] hover:border-[#8B5CF6]/30 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0 text-[#8B5CF6] mt-0.5">
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#111827] dark:text-white truncate leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] truncate mt-0.5">
                  {item.course}
                </p>
                <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1">
                  Due: {item.due}
                </p>
              </div>
              
              <div className="shrink-0 pt-0.5">
                <button type="button" className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 text-[#7C3AED] dark:text-violet-300 transition-colors">
                  {item.status || "Start"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
