"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Signal, Star, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/CourseCard";
import coursesData from "@/data/courses.json";

export function PopularCourses() {
  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <Star className="w-4 h-4 fill-primary" />
            <span className="tracking-wide">TOP COURSES</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold md:font-extrabold mb-6 tracking-tight text-foreground"
          >
            Top Courses at <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">AI Abhyas</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Most loved courses by our learners to help you master AI skills and boost your career.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coursesData.slice(0, 4).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-muted/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-border/50 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm">
              High quality content, expert mentors and hands-on projects to help you become an AI professional.
            </p>
          </div>
          <Link href="/courses">
            <Button variant="outline" className="rounded-full border-border bg-background hover:bg-muted text-foreground px-6 py-5 h-auto font-semibold shrink-0 shadow-sm">
              View All Courses <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
