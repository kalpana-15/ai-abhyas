"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Lightbulb, Building, Palette, LucideIcon, ArrowRight } from "lucide-react";
import audiencesData from "@/data/audiences.json";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  User,
  Briefcase,
  Lightbulb,
  Building,
  Palette
};

const audiences = audiencesData.map(item => ({
  ...item,
  icon: iconMap[item.icon] || User
}));

export function WhoWeTrain() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <User className="w-4 h-4" />
            <span className="tracking-wide">Target Audience</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-foreground"
          >
            Who We <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Train</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Find the perfect AI learning path, from beginner to pro.
          </motion.p>
        </div>

        {/* Expandable Image Accordion */}
        <div className="flex flex-col md:flex-row h-[800px] md:h-[500px] gap-4 w-full max-w-[1200px] mx-auto px-4 md:px-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const isActive = activeIndex === index;

            // Uniform border styling for dark and light mode
            const borderClass = isActive 
              ? "border-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
              : "border-primary/20 hover:border-primary/50";

            return (
              <motion.div
                key={audience.title}
                onMouseEnter={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ opacity: { duration: 0.5, delay: index * 0.1 } }}
                className={`relative overflow-hidden rounded-[36px] cursor-pointer group bg-card border-2 transition-all duration-700 ease-out min-h-[100px] ${borderClass} ${
                  isActive ? "flex-[10]" : "flex-[1]"
                }`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url('${audience.image}')` }}
                />
                
                <div 
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive 
                      ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent" 
                      : "bg-black/30 group-hover:bg-black/20"
                  }`} 
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  
                  {/* Closed State: Only Icon at Bottom */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-white/20"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Open State: Text and Heading */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex flex-col"
                      >
                        <div className="flex flex-row flex-nowrap items-center justify-between gap-2 md:gap-4 w-full">
                          <h3 className="text-base md:text-2xl font-heading font-bold truncate pr-2">
                            {audience.title}
                          </h3>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Link 
                              href="/courses" 
                              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Explore Courses
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </motion.div>
                        </div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-white/80 mt-3 text-xs md:text-base leading-relaxed"
                        >
                          {audience.shortDesc}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
