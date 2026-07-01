"use client";

import Image from "next/image";
import { Clock, Laptop, UserCheck, CreditCard, Users, Star, Award, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course } from "@/types/course"; // Let's define the interface here if it doesn't exist, or inline it.

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
  certificateIncluded: boolean;
  image: string;
}

export function CourseCard({ course }: { course: CourseData }) {
  // Uniform colors per tag type
  const levelColor = "bg-primary text-white shadow-sm"; // Purple for Level
  const modeColor = "bg-zinc-900/90 text-[#14B8A6] shadow-sm backdrop-blur-md"; // Dark for Mode

  return (
    <div className="group relative flex flex-col bg-card rounded-[36px] border-2 border-primary/20 overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.12)] dark:hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.25)] h-full">
      
      {/* 1. Cover Image Block */}
      <div className="relative w-full h-[200px] md:h-[220px] shrink-0 overflow-hidden rounded-t-[36px] bg-muted/30">
        <Image 
          src={course.image}
          alt={course.title}
          fill
          className="object-cover object-[center_60%] transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
        
        {/* Badges overlaid on image */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap ${levelColor}`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border border-[#14B8A6]/20 whitespace-nowrap ${modeColor}`}>
            {course.mode}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        
        {/* Title & Description with Fixed Heights for Uniformity */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm md:text-base font-heading font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          {/* 
          <p className="text-[12px] md:text-[13px] text-muted-foreground line-clamp-2 leading-snug h-[34px]">
            {course.description}
          </p>
          */}
        </div>

        {/* Skills Chips - Fixed height to prevent uneven wrapping */}
        <div className="flex flex-wrap gap-1.5 h-[24px] overflow-hidden">
          {course.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 text-[9px] font-medium bg-muted text-foreground rounded-full whitespace-nowrap">
              {skill}
            </span>
          ))}
        </div>

        {/* 2x2 Information Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-3 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-medium truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Laptop className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-medium truncate">{course.mode}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <UserCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-medium truncate">{course.eligibility}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <CreditCard className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-medium truncate">{course.fee}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border/60 my-2" />

        {/* Footer Stats 
        <div className="flex flex-wrap items-center justify-between text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {course.students} Enrolled
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-foreground">{course.rating} <span className="text-muted-foreground text-[10px]">(1.2K)</span></span>
          </div>
        </div>
        */}

        {/* Primary CTA */}
        <Link href={`/courses/${course.id}`} className="w-full mt-1">
          <Button className="w-full h-10 text-xs font-semibold group/btn">
            View Details <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Link>

      </div>
    </div>
  );
}
