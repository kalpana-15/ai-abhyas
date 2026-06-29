"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ShieldCheck, GraduationCap, Briefcase, Landmark, Users, BookOpen, Star, Building2, TrendingUp, Globe2, type LucideIcon } from "lucide-react";
import Image from "next/image";
import trustedByData from "@/data/trusted-by.json";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Landmark,
  Users,
  BookOpen,
  Star,
  Building2,
  TrendingUp,
  Globe2
};

function AnimatedCounter({ value }: { value: string }) {
  const match = value.match(/([\d.]+)(.*)/);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!match || !isInView || !ref.current) return;
    
    const num = parseFloat(match[1]);
    const isFloat = match[1].includes(".");
    const suffix = match[2] || "";
    
    const controls = animate(0, num, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(currentValue) {
        if (ref.current) {
          ref.current.textContent = (isFloat ? currentValue.toFixed(1) : Math.floor(currentValue)) + suffix;
        }
      }
    });
    
    return () => controls.stop();
  }, [isInView, match, value]);

  return <span ref={ref}>{value}</span>;
}

export function TrustedBy() {
  const { header, cards, logos } = trustedByData;
  
  return (
    <section className="py-24 bg-muted/30 border-y border-border overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="tracking-wide">{header.badge}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
          >
            {header.titlePart1}<br className="hidden md:block" />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"> {header.titleHighlight}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
          >
            {header.description}
          </motion.p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const CardIcon = iconMap[card.icon];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-card border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3 rounded-3xl overflow-hidden flex flex-col items-center relative group transition-all duration-300"
              >
                <div className="relative w-full h-40 md:h-48 overflow-hidden">
                  <Image 
                    src={card.image} 
                    fill 
                    alt={card.titleHighlight} 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                
                {CardIcon && (
                  <div className="absolute top-40 md:top-48 -translate-y-1/2 bg-primary text-primary-foreground p-2.5 rounded-full border-[6px] border-card z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <CardIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                )}
                
                <div className="pt-10 pb-6 px-4 md:px-5 text-center flex-grow flex flex-col w-full relative z-20">
                  <h3 className="text-lg md:text-xl font-bold mb-2 font-heading">
                    {card.titlePrefix} <span className="text-primary">{card.titleHighlight}</span>
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-1 md:gap-2 mt-auto border-t border-border/50 pt-5">
                    {card.stats.map((stat, i) => {
                      const StatIcon = iconMap[stat.icon];
                      
                      return (
                        <div key={i} className="flex flex-col items-center group/stat cursor-default">
                          {StatIcon && (
                            <div className="mb-2 p-1.5 md:p-2 rounded-full bg-primary/10 group-hover/stat:bg-primary/20 transition-colors">
                              <StatIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                            </div>
                          )}
                          <span className="font-bold text-sm md:text-base text-foreground">
                            <AnimatedCounter value={stat.value} />
                          </span>
                          <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mt-1 text-center leading-tight">
                            {stat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Logos Marquee Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 max-w-5xl mx-auto bg-card/50 backdrop-blur-md border border-border/50 rounded-full py-6 overflow-hidden relative shadow-sm"
        >
          <div 
            className="w-full overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
          >
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex flex-nowrap items-center gap-12 md:gap-16 min-w-max px-4 w-max"
            >
              {[...logos, ...logos].map((logo: { name: string, url: string }, index: number) => (
                <div 
                  key={index} 
                  className="relative h-6 md:h-8 w-24 md:w-28 flex-shrink-0 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
                  title={logo.name}
                >
                  <img 
                    src={logo.url} 
                    alt={`${logo.name} logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
