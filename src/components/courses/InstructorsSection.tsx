"use client";

import Image from "next/image";
import { Star, BookOpen, Clock } from "lucide-react";
import instructorsData from "@/data/instructors.json";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";

export function InstructorsSection() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-[1200px] w-full px-4 md:px-6">
        <SectionHeading
          badge="Expert Instructors"
          title={<>Learn from Industry <span className="text-primary">Professionals</span></>}
          subtitle="Get mentored by experts who have built and scaled AI systems at leading global companies."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {instructorsData.map((instructor, i) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-[40px] overflow-hidden group aspect-[3/4] shadow-sm cursor-pointer border-2 border-border/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50"
            >
              {/* Full background image */}
              <Image 
                src={instructor.avatar} 
                alt={instructor.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Base Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500" />
              
              {/* Hover Overlay for better reading visibility */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 flex flex-col justify-end z-10 max-h-full">
                
                {/* Name & Role (No truncation) */}
                <div className="flex flex-col gap-y-1 mb-2 shrink-0">
                  <h3 className="font-heading font-bold text-base lg:text-lg text-white leading-tight drop-shadow-md">
                    {instructor.name}
                  </h3>
                  <span className="text-primary text-[11px] lg:text-xs font-semibold drop-shadow-md">
                    {instructor.role}
                  </span>
                </div>

                {/* Details that swipe up on hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out min-h-0">
                  <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col">
                    
                    <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      <div className="flex justify-between items-start gap-2 mb-3 mt-1">
                        <p className="text-xs text-white leading-relaxed">
                          {instructor.expertise}
                        </p>
                        <a 
                          href={instructor.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="shrink-0 p-1.5 bg-primary/20 rounded-full hover:bg-[#0077b5] hover:text-white text-primary transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-[10px] lg:text-xs font-medium text-white border-t border-white/30 pt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" />
                          {instructor.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-primary" />
                          {instructor.coursesTaught}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
