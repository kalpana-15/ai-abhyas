"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";

const outcomes = [
  {
    title: "Faster Workflows",
    description: "Automate repetitive tasks and accelerate your daily productivity using AI agents.",
    image: "/Assets/animations/fatser workflows.svg",
  },
  {
    title: "Practical Skills",
    description: "Transition from theory to practice with portfolio-ready AI projects.",
    image: "/Assets/animations/practical skiils.svg",
  },
  {
    title: "Business Value",
    description: "Learn how to calculate and demonstrate the financial impact of AI initiatives.",
    image: "/Assets/animations/business valus.svg",
  },
  {
    title: "Accuracy",
    description: "Build robust AI systems that deliver highly accurate outputs for business needs.",
    image: "/Assets/animations/accuracy.svg",
  },
  {
    title: "Innovation",
    description: "Unlock new product capabilities by integrating LLMs into your applications.",
    image: "/Assets/animations/innovation.svg",
  },
  {
    title: "Integration",
    description: "Master connecting disparate tools and models into cohesive AI pipelines.",
    image: "/Assets/animations/integration.svg",
  },
];

const DURATION = 8000; // 8 seconds per row

export function Outcomes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % outcomes.length);
      setProgressKey((prev) => prev + 1);
    }, DURATION);

    return () => clearInterval(timer);
  }, [progressKey]); // Reset timer whenever progressKey changes (which happens on manual click)

  const handleManualClick = (index: number) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
    setProgressKey((prev) => prev + 1); // Resets the useEffect timer and the framer-motion progress bar
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="tracking-wide">Career Outcomes</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold md:font-extrabold mb-6 tracking-tight text-foreground"
          >
            Real-World <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Outcomes</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Discover how mastering AI opens up new career opportunities and transforms your professional trajectory.
          </motion.p>
        </div>

        <div className="border border-border/60 dark:border-border/40 rounded-[2.5rem] py-12 lg:py-16 px-4 md:px-10 lg:px-12 bg-muted/20 dark:bg-muted/10 shadow-sm relative overflow-hidden">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* Left Column (55%) - Text Rows (Banners) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-2">
            {outcomes.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleManualClick(index)}
                  className={`relative text-left p-2 lg:p-3 rounded-2xl border transition-all duration-500 overflow-hidden group ${
                    isActive 
                      ? 'bg-muted/40 shadow-md border-border dark:border-border/80' 
                      : 'hover:bg-muted/10 opacity-70 hover:opacity-100 border-border/70 dark:border-border/50 hover:border-border'
                  }`}
                >
                  <div className="relative z-10">
                    <h3 className={`text-[17px] font-heading font-bold mb-2 transition-colors duration-500 ${
                      isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/70'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-[13px] transition-colors duration-500 leading-relaxed ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Base track for the progress bar (visible only when active) */}
                  {isActive && (
                     <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary/20" />
                  )}

                  {/* Sliding Progress Bar (Timer) */}
                  {isActive && (
                    <motion.div
                      key={progressKey}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1.5 bg-primary z-20"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column (45%) - Active SVG */}
          <div className="w-full lg:w-[45%] sticky top-32 h-[400px] lg:h-[600px] rounded-3xl flex items-center justify-center relative overflow-hidden">
             
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: -20 }}
                 transition={{ duration: 0.4 }}
                 className="absolute inset-0 p-8 lg:px-16 lg:pt-4 lg:pb-24 flex items-center justify-center"
               >
                 <img 
                   src={outcomes[activeIndex].image} 
                   alt={outcomes[activeIndex].title}
                   className="w-full h-full object-contain drop-shadow-2xl"
                 />
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
