"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden antialiased">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center transform-gpu"
        >
          <img
            src="/Assets/animations/ai_animation_Flow_1.svg"
            alt="AI Animation Flow Background"
            className="w-full h-full object-contain opacity-[0.15] dark:opacity-40 dark:invert transition-opacity duration-1000"
          />
        </motion.div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/20 rounded-full blur-[128px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium">Master the AI Revolution</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 max-w-4xl"
        >
          Learn to Build the <br className="hidden sm:block" />
          <span className="text-primary">Future</span> with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Learn practical AI skills that create measurable impact in your career, organization, or business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <Link href="/courses" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base">
              Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base border-border bg-background/50 backdrop-blur-sm hover:bg-muted">
              Talk to an Advisor
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
