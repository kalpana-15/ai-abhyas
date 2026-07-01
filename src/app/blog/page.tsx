"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { CategoryFloatingCards } from "@/components/blog/CategoryFloatingCards";
import { AnimatedBentoGrid } from "@/components/blog/AnimatedBentoGrid";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-20 bg-background overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative flex items-center pt-12 pb-2 md:pt-16 md:pb-4 overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/10 dark:from-primary/10 dark:to-secondary/5">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-10 gap-6 max-w-2xl lg:pl-[31px] pt-8 lg:pt-0 lg:-mt-24"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 shadow-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>AI Abhyas Resources</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground drop-shadow-sm leading-tight max-w-4xl">
                  Latest AI <br />
                  <span className="text-primary">Insights & News</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Explore tutorials, industry trends, and expert insights to accelerate your journey in Artificial Intelligence and Machine Learning.
                </p>
                
                {/* Search Bar Placeholder */}
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="Search articles, tutorials, case studies..."
                  />
                </div>
              </motion.div>

              {/* Right Content - Visuals & Animated Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative lg:ml-auto w-full flex justify-center lg:justify-end"
              >
                <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg lg:max-w-none">
                  <img
                    src="/Assets/images/blog.webp"
                    alt="AI Abhyas Blog"
                    className="w-full h-full object-contain object-center relative z-10"
                  />
                  <CategoryFloatingCards />
                </div>
              </motion.div>

            </div>
          </div>
          
          {/* Fade to background blend */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
        </section>
        
        {/* Latest Articles Bento Grid */}
        <section className="py-24 container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-[31px] gap-4">
            <h2 className="text-4xl font-heading font-bold tracking-tight md:text-5xl text-foreground">Featured Articles</h2>
            <p className="text-muted-foreground text-lg max-w-[800px]">Curated highlights from the forefront of AI.</p>
          </div>

          <div className="lg:px-[31px] w-full max-w-[1200px] mx-auto">
            <AnimatedBentoGrid articles={articles} />
          </div>
        </section>



      </main>
      <Footer />
    </>
  );
}
