"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      
      {/* Abstract background glow shapes for colorful highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4 z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />

      <div className="mx-auto max-w-[1200px] w-full relative px-4 md:px-6 z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            >
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wide">Ready To Start?</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 max-w-2xl leading-tight tracking-tight"
            >
              Ready to Accelerate Your Career with <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">AI?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl"
            >
              Join thousands of learners building practical AI skills through industry-focused training, projects, assessments, and certifications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/courses" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-base w-full font-bold shadow-xl">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full">
                  Talk to an Advisor
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-lg mx-auto lg:mx-0 lg:ml-auto"
          >
             <img 
               src="/Assets/animations/cta.svg" 
               alt="AI Abhyas Call to Action Animation" 
               className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" 
             />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
