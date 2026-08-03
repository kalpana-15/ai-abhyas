"use client";

import Image from "next/image";
import { Clock, Laptop, UserCheck, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export interface CourseData {
  id: string;
  title: string;
  description: string;
  level: string;
  mode: string;
  status: string;
  duration: string;
  fee: string;
  eligibility: string;
  skills: string[];
  highlights: string[];
  students: string;
  rating: number;
  certificateIncluded?: boolean;
  image: string;
  [key: string]: any;
}

export function CourseCard({ course }: { course: CourseData }) {
  const levelColor = "bg-[#8B5CF6] text-white shadow-xs";
  const modeColor = "bg-zinc-900/80 text-[#14B8A6] shadow-xs backdrop-blur-md";

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#14182F] rounded-[32px] border border-[#E7E5F4] dark:border-white/[0.1] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/50 hover:shadow-xl hover:shadow-[#8B5CF6]/10 h-full">
      
      {/* Cover Image Block */}
      <div className="relative w-full h-[200px] md:h-[220px] shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image 
          src={course.image}
          alt={course.title}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide rounded-full ${levelColor}`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide rounded-full border border-[#14B8A6]/20 ${modeColor}`}>
            {course.mode}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        
        {/* Title & Description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white line-clamp-1 group-hover:text-[#8B5CF6] transition-colors font-heading">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5">
          {course.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium bg-[#FAFAF7] dark:bg-white/[0.05] text-[#374151] dark:text-zinc-300 rounded-md border border-[#E7E5F4] dark:border-white/[0.08]">
              {skill}
            </span>
          ))}
        </div>

        {/* 2x2 Information Grid */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-1.5 mt-auto text-xs font-medium text-[#374151] dark:text-zinc-300">
          <div className="flex items-center gap-2 truncate">
            <Clock className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <span className="truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Laptop className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <span className="truncate">{course.mode}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <UserCheck className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <span className="truncate">{course.eligibility}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <CreditCard className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <span className="truncate">{course.fee}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E7E5F4] dark:bg-white/[0.08] my-0.5" />

        {/* Primary CTA */}
        <Link href={`/courses/${course.id}`} className="w-full mt-auto">
          <Button className="w-full h-10 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-colors group/btn shadow-sm">
            <span>View Details</span> 
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>

      </div>
    </div>
  );
}
