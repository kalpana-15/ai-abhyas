"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function StickyEnrollment({ course }: { course: any }) {
  const { enroll, enrolledCourses } = useAuth();
  const isEnrolled = enrolledCourses.includes(course.title);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl w-full max-w-sm ml-auto"
    >
      
      {/* Course Image */}
      <div className="relative w-full aspect-[2/1] bg-muted border-b border-border">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 p-5">
        
        {/* Pricing */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Course Fee</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-heading font-medium text-muted-foreground line-through">
              {course.fee.replace(/[0-9,]+/, (match: string) => {
                const num = parseInt(match.replace(/,/g, ''));
                return (num * 1.5).toLocaleString();
              })}
            </span>
            <h3 className="text-2xl font-heading font-bold text-foreground">{course.fee}</h3>
          </div>
        </div>

        <div className="w-full h-px bg-border/50" />

        {/* Quick Info (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground leading-none mb-1">{course.level}</p>
              <p className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider">Difficulty</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground leading-none mb-1">{course.mode}</p>
              <p className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider">Training</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground leading-none mb-1">Projects</p>
              <p className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider">Included</p>
            </div>
          </div>
          {course.certificateIncluded && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground leading-none mb-1">Certificate</p>
                <p className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider">Official</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-border/50" />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {isEnrolled ? (
            <Link href="/dashboard" className="w-full">
              <Button size="lg" variant="secondary" className="w-full h-10 font-bold text-xs">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Button onClick={() => enroll(course.title)} size="lg" className="w-full h-10 font-bold text-xs shadow-lg shadow-primary/20">
              Enroll Now
            </Button>
          )}
          <Button size="lg" variant="outline" className="w-full h-10 font-medium text-xs border-border">
            <Download className="w-3.5 h-3.5 mr-2" /> Download Brochure
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
