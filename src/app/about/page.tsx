"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HexagonFeatures } from "@/components/sections/HexagonFeatures";
import { OurVision } from "@/components/sections/OurVision";
import { TrainingObjectives } from "@/components/sections/TrainingObjectives";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Target, Rocket, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* 1. Hero Section */}
        <section className="relative pt-4 pb-20 lg:pt-8 lg:pb-32 overflow-hidden">
          {/* Floating background gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Side: Content */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-10 gap-6 max-w-2xl lg:pl-[31px] pt-8 lg:pt-0 lg:-mt-8 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 shadow-sm"
                >
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span>About AI Abhyas</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground drop-shadow-sm leading-tight max-w-4xl"
                >
                  Learn & Master <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Practical AI</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-xl"
                >
                  AI Abhyas is dedicated to making AI education accessible, practical, and industry-focused through expert-led training, real-world projects, and continuous learning.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <Link href="/courses" className="w-full sm:w-auto">
                    <Button size="lg" className="h-14 px-8 text-base w-full font-bold shadow-xl hover:scale-[1.02] transition-transform">
                      Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto">
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right Side: Illustration */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-lg mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center order-1 lg:order-2"
              >
                 <img 
                   src="/Assets/animations/about us.svg" 
                   alt="AI Abhyas Mentor and Learner" 
                   className="w-full h-full object-contain drop-shadow-2xl" 
                 />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Who We Are (Hexagon Features) */}
        <HexagonFeatures />

        {/* 3. Vision Lightbulb Section */}
        <OurVision />

        {/* 3.5 Training Objectives */}
        <TrainingObjectives />

        {/* 4. Final Call to Action */}
        <FinalCTA />

      </main>

      <Footer />
    </div>
  );
}
