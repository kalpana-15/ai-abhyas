"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code, Brain, Lightbulb, Briefcase, TrendingUp, Users, Rocket } from "lucide-react";

const objectivesLeft = [
  {
    id: "01",
    title: "Strong AI Foundation",
    description: "Build a solid understanding of Artificial Intelligence concepts, technologies, and tools.",
    icon: GraduationCap,
  },
  {
    id: "02",
    title: "Hands-on Learning",
    description: "Learn through hands-on projects, real-world case studies, and practical implementation.",
    icon: Code,
  },
  {
    id: "03",
    title: "Industry-Ready Skills",
    description: "Develop technical, analytical, and problem-solving skills aligned with industry requirements.",
    icon: Brain,
  }
];

const objectivesRight = [
  {
    id: "04",
    title: "Innovation & Ethics",
    description: "Encourage creativity, innovation, and the ethical use of AI for positive impact.",
    icon: Lightbulb,
  },
  {
    id: "05",
    title: "Career Preparation",
    description: "Prepare for internships, higher education, and AI-driven careers with confidence.",
    icon: Briefcase,
  },
  {
    id: "06",
    title: "Continuous Growth",
    description: "Foster lifelong learning, adaptability, and curiosity in the rapidly evolving AI landscape.",
    icon: TrendingUp,
  }
];

export function TrainingObjectives() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4"
        >
          <Rocket className="w-4 h-4 text-primary" />
          <span>Training Objectives</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4"
        >
          Building Skills That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Drive Success</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Our training is designed with clear objectives that help learners grow, apply, and succeed in the real world.
        </motion.p>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 max-w-7xl relative">
        
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4 relative z-10">
          
          {/* Decorative Dotted Connecting Lines (Desktop Only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none -z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
               <path d="M 320 100 L 400 120 L 500 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/30" />
               <path d="M 320 300 L 500 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/30" />
               <path d="M 320 500 L 400 480 L 500 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/30" />
               
               <path d="M 680 100 L 600 120 L 500 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/30" />
               <path d="M 680 300 L 500 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/30" />
               <path d="M 680 500 L 600 480 L 500 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/30" />
            </svg>
          </div>

          {/* Left Column (01, 02, 03) */}
          <div className="flex flex-col gap-6 w-full lg:w-[32%]">
            {objectivesLeft.map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <motion.div 
                  key={obj.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-card flex items-stretch rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-shadow group overflow-hidden"
                >
                  <div className="w-12 md:w-14 shrink-0 bg-gradient-to-b from-primary/80 to-purple-600/80 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    {obj.id}
                  </div>
                  <div className="p-4 md:p-5 flex items-start gap-4 flex-grow">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{obj.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Center Column: Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="w-full lg:w-[30%] flex justify-center items-center py-8 lg:py-0 relative"
          >
            {/* Dashed outer ring */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center bg-primary/5 p-4 md:p-6 animate-[spin_30s_linear_infinite]">
              {/* Solid inner wrapper to stop spinning on image */}
              <div className="w-full h-full rounded-full bg-white dark:bg-card shadow-2xl flex items-center justify-center p-6 animate-[spin_30s_linear_infinite_reverse]">
                <img 
                  src="/Assets/animations/mission.svg" 
                  alt="Training Objective Mission" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              
              {/* decorative nodes on the ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-purple-500" />
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500" />
            </div>
          </motion.div>

          {/* Right Column (04, 05, 06) */}
          <div className="flex flex-col gap-6 w-full lg:w-[32%]">
            {objectivesRight.map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <motion.div 
                  key={obj.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-card flex items-stretch rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-shadow group overflow-hidden"
                >
                  <div className="p-4 md:p-5 flex items-start gap-4 flex-grow">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{obj.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                  <div className="w-12 md:w-14 shrink-0 bg-gradient-to-b from-purple-500/80 to-blue-500/80 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    {obj.id}
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>

        {/* Bottom Card: Our Commitment */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
            <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-xl font-bold text-foreground mb-2">Our Commitment</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to empowering every learner with practical AI skills, helping them innovate, solve real-world problems, and create a better future.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
