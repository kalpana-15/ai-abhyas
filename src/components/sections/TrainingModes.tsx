"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const modes = [
  {
    title: "Online Training",
    type: "online",
    description: "Learn from anywhere in the world with our interactive live sessions, recorded modules, and cloud-based labs.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    bgColorClass: "bg-primary/5 dark:bg-primary/10", // Primary tint
  },
  {
    title: "On-Campus Training",
    type: "offline",
    description: "Immersive, in-person bootcamps at our state-of-the-art facilities. Network with peers and get hands-on mentorship.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    bgColorClass: "bg-teal/5 dark:bg-teal/10", // Teal tint
  },
  {
    title: "Corporate Training",
    type: "corporate",
    description: "Customized upskilling programs for organizations. We deploy AI training tailored to your company's specific industry use-cases.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
    bgColorClass: "bg-gold/5 dark:bg-gold/10", // Gold tint
  },
];

export function TrainingModes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play feature
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % modes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % modes.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + modes.length) % modes.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="bg-muted/30 border-t border-border">
      
      {/* Split-Pane Carousel */}
      <div className="relative w-full h-[750px] md:h-[550px] lg:h-[600px] overflow-hidden bg-background border-y border-border/50">
        
        {/* Background/Carousel */}
        <AnimatePresence initial={false}>
          <motion.div 
            key={currentIndex}
            className={`absolute inset-0 w-full h-full flex flex-col-reverse md:flex-row z-0 ${modes[currentIndex].bgColorClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Text Pane (Left on Desktop, Bottom on Mobile) */}
            <div className="w-full md:w-1/2 h-[60%] md:h-full bg-transparent flex flex-col justify-center py-[12%] pr-[12%] pl-[5%] md:py-[16%] md:pr-[15%] md:pl-[6%] relative z-10 overflow-hidden">
              <motion.div 
                className="max-w-[600px] w-full mx-auto md:mx-0"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                
                {/* Main Section Heading */}
                <div className="mb-6 md:mb-10 border-b border-border/30 pb-6 flex flex-col items-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="tracking-wide">Learning Experience</span>
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold md:font-extrabold mb-4 tracking-tight leading-tight text-foreground">
                    <span className="whitespace-nowrap">Flexible Learning</span><br />
                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Modes</span>
                  </h2>
                </div>

                <div className="mb-3 md:mb-4">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-xs font-medium text-primary tracking-widest uppercase backdrop-blur-sm">
                    Mode 0{currentIndex + 1}
                  </div>
                </div>

                <div className="mb-4 md:mb-6">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-foreground leading-[1.2]">
                    {modes[currentIndex].title}
                  </h3>
                </div>
                
                <div className="mb-6 md:mb-8">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {modes[currentIndex].description}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 mt-8">
                  <Link 
                    href={`/courses?mode=${modes[currentIndex].type}`}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(139,92,246,0.3)] gap-2 group"
                  >
                    Explore Program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  {/* Navigation Arrows */}
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSlide}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border/50 text-foreground hover:bg-muted hover:border-border transition-colors shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border/50 text-foreground hover:bg-muted hover:border-border transition-colors shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
              </motion.div>
            </div>

            {/* Image Pane (Right on Desktop, Top on Mobile) */}
            <div className="w-full md:w-1/2 h-[40%] md:h-full bg-transparent relative flex items-center justify-center p-5 md:p-8 lg:p-12">
              
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#a855f7]/10 dark:bg-[#a855f7]/15 blur-[120px] dark:blur-[140px] rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] hidden dark:block bg-[#14b8a6]/15 blur-[140px] rounded-full pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, x: 40, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="w-full h-full relative z-10"
              >
                {/* Premium Image Container */}
                <div className="w-full h-full relative rounded-[24px] border border-border shadow-[0_20px_50px_rgba(17,24,39,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden group">
                  <Image
                    src={modes[currentIndex].image}
                    alt={modes[currentIndex].title}
                    fill
                    className="object-cover origin-bottom-right transition-transform duration-300 group-hover:scale-[1.02]"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,24,39,0.05)] to-transparent dark:from-[rgba(0,0,0,0.25)] dark:to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
