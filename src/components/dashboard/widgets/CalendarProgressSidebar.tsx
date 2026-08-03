"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  FileText, 
  MessageCircle, 
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const IconMap: Record<string, React.ElementType> = {
  Video,
  FileText,
  MessageCircle,
};

export function CalendarProgressSidebar({ schedule }: { schedule: any[] }) {
  const [currentMonth, setCurrentMonth] = useState("July 2026");
  const [selectedDay, setSelectedDay] = useState(31);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  
  const calendarDays = [
    27, 28, 29, 30, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
  ];

  const activeDaysJuly = [2, 3, 5, 7, 8, 9, 11, 12, 14, 15, 16, 18, 19, 21, 22, 24, 25, 26, 28, 29, 30, 31];

  const isDayActive = (day: number, isOtherMonth: boolean) => {
    if (isOtherMonth) return false;
    return activeDaysJuly.includes(day);
  };

  const getDayActivities = (day: number) => {
    if (day === 31) return schedule || [];
    if (activeDaysJuly.includes(day)) {
      return [
        {
          time: "11:00 AM",
          type: "Course Lab",
          title: "Completed Module & Practice Exercises",
          subtitle: "100% score recorded",
          action: "Review",
          icon: "FileText",
        },
      ];
    }
    return [];
  };

  const selectedDayIsActive = activeDaysJuly.includes(selectedDay);
  const selectedDayActivities = getDayActivities(selectedDay);

  return (
    <div className="bg-white dark:bg-[#14182F] rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xs p-3 sm:p-3.5 flex flex-col transition-all min-w-0">
      
      {/* Single-Row Header without wrapping */}
      <div className="flex flex-row items-center justify-between pb-2.5 mb-2.5 border-b border-[#E7E5F4] dark:border-white/[0.06] gap-1.5">
        <h3 className="font-bold text-[10px] sm:text-[11px] text-[#111827] dark:text-white uppercase tracking-wider font-heading whitespace-nowrap truncate pr-1">
          Learning Schedule
        </h3>
        
        <div className="flex items-center text-[10px] font-semibold text-[#374151] dark:text-zinc-300 bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">
          <button 
            type="button" 
            onClick={() => setCurrentMonth(currentMonth === "July 2026" ? "June 2026" : "July 2026")}
            className="hover:text-[#8B5CF6] p-0.5 transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <span className="min-w-[58px] text-center px-1">{currentMonth}</span>
          <button 
            type="button" 
            onClick={() => setCurrentMonth(currentMonth === "July 2026" ? "August 2026" : "July 2026")}
            className="hover:text-[#8B5CF6] p-0.5 transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Date Grid */}
      <div className="mb-3">
        <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[8px] font-bold uppercase text-[#6B7280] dark:text-[#9CA3AF] py-0.5">
              {day}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {calendarDays.map((day, idx) => {
            const isOtherMonth = idx < 4 || (idx >= 35);
            const active = isDayActive(day, isOtherMonth);
            const isSelected = day === selectedDay && !isOtherMonth;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isOtherMonth && setSelectedDay(day)}
                className={cn(
                  "h-6 sm:h-6.5 rounded-md text-[10px] sm:text-[11px] relative flex flex-col items-center justify-center transition-all duration-150 select-none",
                  isOtherMonth ? "text-zinc-300 dark:text-zinc-700 opacity-35 cursor-default" : "cursor-pointer",
                  !isOtherMonth && active && !isSelected && "bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-violet-300 font-bold hover:bg-[#8B5CF6]/20",
                  !isOtherMonth && !active && !isSelected && "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/[0.04] text-[#6B7280] dark:text-zinc-400 font-normal",
                  isSelected && "bg-[#8B5CF6] text-white font-bold shadow-2xs"
                )}
              >
                <span>{day}</span>
                {!isOtherMonth && active && !isSelected && (
                  <span className="w-0.5 h-0.5 rounded-full bg-[#8B5CF6] absolute bottom-0.5" />
                )}
                {!isOtherMonth && isSelected && active && (
                  <span className="w-0.5 h-0.5 rounded-full bg-white absolute bottom-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda */}
      <div className="pt-2.5 border-t border-[#E7E5F4] dark:border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#111827] dark:text-white uppercase tracking-wider">
            July {selectedDay} Agenda
          </span>
          {selectedDayIsActive ? (
            <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> Active
            </span>
          ) : (
            <span className="text-[8px] text-zinc-400 font-medium uppercase tracking-wider">Inactive</span>
          )}
        </div>

        {selectedDayIsActive && selectedDayActivities.length > 0 ? (
          <div className="space-y-1.5">
            {selectedDayActivities.map((item: any, idx: number) => {
              const IconComponent = IconMap[item.icon] || Video;
              return (
                <div 
                  key={idx} 
                  className="p-2 rounded-lg bg-[#FAFAF7] dark:bg-white/[0.02] border border-[#E7E5F4]/70 dark:border-white/[0.05] flex items-start justify-between gap-2 hover:border-[#8B5CF6]/30 transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[8px] font-bold text-[#8B5CF6] dark:text-violet-300 uppercase tracking-wider mb-0.5">
                      <IconComponent className="w-2.5 h-2.5 shrink-0" /> 
                      <span className="truncate">{item.type} &bull; {item.time}</span>
                    </div>
                    <h4 className="text-[10px] font-bold text-[#111827] dark:text-white truncate leading-tight">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-[9px] text-[#6B7280] dark:text-[#9CA3AF] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  {item.action && (
                    <button type="button" className="shrink-0 mt-0.5 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-all">
                      {item.action}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-2.5 rounded-lg bg-[#FAFAF7] dark:bg-white/[0.02] border border-dashed border-[#E7E5F4] dark:border-white/[0.06] text-center">
            <p className="text-[10px] font-semibold text-[#374151] dark:text-zinc-300 mb-0.5">
              No Activities Recorded
            </p>
            <p className="text-[9px] text-[#6B7280] dark:text-[#9CA3AF]">
              No classes or labs completed today.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
