"use client";

import React from "react";
import Link from "next/link";
import { Video, FileText, MessageCircle } from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  Video,
  FileText,
  MessageCircle,
};

export function ScheduleWidget({ schedule }: { schedule: any[] }) {

  return (
    <div className="bg-card rounded-[24px] border border-border shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground font-heading">Today's Schedule</h2>
        <Link href="/dashboard/calendar" className="text-sm font-medium text-primary hover:underline">
          View Calendar &rarr;
        </Link>
      </div>

      <div className="flex-1 relative">
        {/* Vertical Line */}
        <div className="absolute left-[88px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-6">
          {schedule.map((item, idx) => (
            <div key={idx} className="flex gap-4 relative z-10">
              {/* Time */}
              <div className="w-16 text-right pt-0.5">
                <span className="text-xs font-medium text-muted-foreground">{item.time}</span>
              </div>
              
              {/* Timeline Dot */}
              <div className="relative mt-1">
                <div className={`w-3 h-3 rounded-full border-2 ${item.dotColor} bg-card`} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-1.5 mb-1">
                  {IconMap[item.icon] && React.createElement(IconMap[item.icon], { className: `w-3.5 h-3.5 ${item.typeColor}` })}
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${item.typeColor}`}>
                    {item.type}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground mb-0.5">{item.title}</h4>
                {item.subtitle && <p className="text-xs text-muted-foreground mb-2">{item.subtitle}</p>}
                
                {item.action && (
                  <button className={`mt-1 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors ${item.actionStyle}`}>
                    {item.action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
