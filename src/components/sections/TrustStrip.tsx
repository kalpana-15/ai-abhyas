"use client";

import { Briefcase, GraduationCap, Building2, Globe, BookOpen, Landmark } from "lucide-react";
import { useEffect, useState } from "react";

const baseItems = [
  { icon: Briefcase, text: "Future Professionals" },
  { icon: GraduationCap, text: "NextGen Academics" },
  { icon: Building2, text: "Enterprise Solutions" },
  { icon: Globe, text: "Tech Global" },
  { icon: BookOpen, text: "EduCorp" },
  { icon: Landmark, text: "Innovate Institute" },
];

// Duplicate the items to comfortably fill the 360-degree circle
const items = [...baseItems, ...baseItems];

export function TrustStrip() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-[350px] md:h-[400px] overflow-hidden bg-background border-y border-border flex flex-col items-center justify-end pb-8 pt-8">
      
      {/* Background Gradients to fade the bottom seam */}
      <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-background via-background to-transparent z-10 pointer-events-none" />
      


      {/* Semicircle Arch container */}
      <div className="absolute top-[80px] md:top-[100px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] flex items-center justify-center pointer-events-none z-0">
        
        {/* The rotating track */}
        <div 
          className="absolute w-full h-full rounded-full border border-border/40"
          style={{ animation: "spin 60s linear infinite" }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            const totalItems = items.length;
            const angle = (360 / totalItems) * i;
            return (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{ 
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-500px)`,
                }}
              >
                {/* Responsive offset to push it out further on desktop (500px -> 700px radius) */}
                <div className="md:-translate-y-[200px]"> 
                  {/* Counter-rotating container to keep items perfectly upright */}
                  <div style={{ animation: "spin 60s linear infinite reverse" }}>
                    {/* Correcting the initial placement angle */}
                    <div 
                      className="flex flex-col items-center gap-3 w-40"
                      style={{ transform: `rotate(-${angle}deg)` }}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-card border border-border/50 rounded-2xl flex items-center justify-center shadow-lg text-foreground/80">
                        <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">
                        {item.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Inner decorative rings */}
        <div className="absolute w-[800px] h-[800px] md:w-[1150px] md:h-[1150px] rounded-full border border-border/20 border-dashed" />
        <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-border/10" />
        
        {/* Glowing center (horizon glow) */}
        <div className="absolute top-0 w-[80%] h-[200px] bg-primary/5 blur-[100px] rounded-[100%]" />
      </div>
    </section>
  );
}
