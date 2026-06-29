"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star, Users, Clock, Award, Globe, Calendar, CheckCircle } from "lucide-react";

export function CourseHero({ course, instructor }: { course: any; instructor?: any }) {
  return (
    <div className="flex flex-col items-start text-left w-full pt-8 lg:pt-12 pb-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-foreground/80 font-medium mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
        <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
        <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">{course.title}</span>
      </nav>

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight text-foreground"
      >
        {course.title}
      </motion.h1>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg text-foreground/80 mb-6 max-w-2xl"
      >
        {course.description}
      </motion.p>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap gap-2 mb-4"
      >
        <span className="inline-flex items-center rounded-sm bg-teal-500/10 px-2.5 py-0.5 text-xs font-bold text-teal-600 dark:text-teal-400">
          {course.level}
        </span>
        <span className="inline-flex items-center rounded-sm bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {course.mode}
        </span>
        {course.certificateIncluded && (
          <span className="inline-flex items-center rounded-sm bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Award className="w-3.5 h-3.5 mr-1.5" /> Certificate Included
          </span>
        )}
      </motion.div>

      {/* Created By & Meta Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col gap-2 mb-10 text-sm text-foreground/80"
      >
        {instructor?.name && (
          <div>
            Created by <span className="text-primary underline cursor-pointer font-medium hover:text-primary/80 transition-colors">{instructor.name}</span>
          </div>
        )}
        <div className="flex items-center gap-4">
          {course.lastUpdated && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Last updated {course.lastUpdated}</span>
            </div>
          )}
          {course.language && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>{course.language}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Bottom Stats Banner (Udemy style) */}
      {(course.promoText || course.rating || course.students) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch bg-background border border-border rounded-xl overflow-hidden shadow-lg w-full max-w-3xl"
        >
          {/* Left premium section */}
          {course.isPremium && (
            <div className="bg-primary text-primary-foreground p-4 flex flex-col items-center justify-center min-w-[120px]">
              <CheckCircle className="w-6 h-6 mb-1" />
              <span className="font-bold text-sm tracking-wide">Premium</span>
            </div>
          )}
          
          {/* Middle text */}
          {course.promoText && (
            <div className="flex-1 p-5 flex items-center border-b sm:border-b-0 sm:border-r border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {course.promoText}
              </p>
            </div>
          )}

          {/* Right Stats */}
          <div className="flex items-center justify-around sm:justify-center gap-8 p-5 min-w-[200px]">
            {course.rating && (
              <div className="flex flex-col items-center text-center">
                <span className="text-xl font-bold font-heading text-foreground">{course.rating}</span>
                <div className="flex text-amber-500 my-1">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                </div>
                {course.totalRatings && (
                  <span className="text-xs text-muted-foreground underline cursor-pointer hover:text-primary transition-colors">{course.totalRatings} ratings</span>
                )}
              </div>
            )}
            
            {course.rating && course.students && (
              <div className="w-px h-12 bg-border hidden sm:block" />
            )}
            
            {course.students && (
              <div className="flex flex-col items-center text-center">
                <Users className="w-5 h-5 text-foreground mb-1" />
                <span className="text-base font-bold font-heading text-foreground">{course.students}</span>
                <span className="text-xs text-muted-foreground">learners</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
