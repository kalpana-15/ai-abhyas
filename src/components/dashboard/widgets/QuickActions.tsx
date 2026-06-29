"use client";

import React from "react";
import Link from "next/link";
import { Compass, Video, FolderOpen, CheckSquare, BarChart2, Award } from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  Compass,
  Video,
  FolderOpen,
  CheckSquare,
  BarChart2,
  Award,
};

export function QuickActions({ actions }: { actions: any[] }) {

  return (
    <div className="bg-card rounded-[24px] border border-border shadow-sm p-6 h-full">
      <h2 className="text-lg font-bold text-foreground font-heading mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <Link key={idx} href={action.href}>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-muted transition-colors border border-transparent hover:border-border group text-center gap-2 h-full cursor-pointer">
              <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {IconMap[action.icon] && React.createElement(IconMap[action.icon], { className: `w-5 h-5 ${action.color}` })}
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground leading-tight">
                {action.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
