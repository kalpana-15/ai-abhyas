"use client";

import React from "react";
import Link from "next/link";
import { FileText, ClipboardList } from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  FileText,
  ClipboardList,
};

export function PendingAssessments({ assessments }: { assessments: any[] }) {

  return (
    <div className="bg-card rounded-[24px] border border-border shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground font-heading">Pending Assessments</h2>
        <Link href="/dashboard/assessments" className="text-sm font-medium text-primary hover:underline">
          View All &rarr;
        </Link>
      </div>

      <div className="space-y-4 flex-1">
        {assessments.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
              {IconMap[item.icon] ? React.createElement(IconMap[item.icon], { className: `w-5 h-5 ${item.iconColor}` }) : <FileText className={`w-5 h-5 ${item.iconColor}`} />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate">{item.title}</h4>
              <p className="text-xs text-muted-foreground truncate mb-1">{item.course}</p>
              <p className={`text-[10px] font-medium ${item.dueColor || 'text-muted-foreground'}`}>
                Due: {item.due}
              </p>
            </div>
            <div className="flex items-center shrink-0">
              <button className={`text-xs font-semibold px-4 py-1.5 rounded-lg border transition-colors ${item.statusColor}`}>
                {item.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
