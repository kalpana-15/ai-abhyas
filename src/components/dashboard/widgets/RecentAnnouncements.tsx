"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Info, AlertTriangle } from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  Sparkles,
  Info,
  AlertTriangle,
};

export function RecentAnnouncements({ announcements }: { announcements: any[] }) {

  return (
    <div className="bg-card rounded-[24px] border border-border shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground font-heading">Recent Announcements</h2>
        <Link href="/dashboard/announcements" className="text-sm font-medium text-primary hover:underline">
          View All &rarr;
        </Link>
      </div>

      <div className="space-y-5 flex-1">
        {announcements.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 relative`}>
              {IconMap[item.icon] ? React.createElement(IconMap[item.icon], { className: `w-5 h-5 ${item.iconColor}` }) : <Info className={`w-5 h-5 ${item.iconColor}`} />}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-2 mb-0.5">
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
                <h4 className="text-sm font-bold text-foreground truncate leading-none">{item.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground truncate mb-1">{item.desc}</p>
              <p className="text-[10px] font-medium text-muted-foreground/70">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
