"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, BookOpen, Lightbulb, MonitorPlay, Briefcase, TrendingUp, Eye } from "lucide-react";

export const OurVision = () => {
  const slices = [
    {
      id: 1,
      title: "KNOWLEDGE",
      icon: BookOpen,
      colors: "#FFB703, #FB8500", // Yellow/Orange
      width: "w-[100%] max-w-[360px]",
      height: "h-[90px] md:h-[110px]",
      rounded: "[border-top-left-radius:50%_100%] [border-top-right-radius:50%_100%] rounded-b-[20px]",
      direction: -1, // Slides from left
    },
    {
      id: 2,
      title: "INNOVATION",
      icon: Lightbulb,
      colors: "#E63946, #D90429", // Red/Pink
      width: "w-[96%] max-w-[340px]",
      height: "h-[60px]",
      rounded: "rounded-[32px]",
      direction: 1, // Slides from right
    },
    {
      id: 3,
      title: "PRACTICAL LEARNING",
      icon: MonitorPlay,
      colors: "#7209B7, #560BAD", // Purple
      width: "w-[88%] max-w-[300px]",
      height: "h-[60px]",
      rounded: "rounded-[32px]",
      direction: -1,
    },
    {
      id: 4,
      title: "INDUSTRY SKILLS",
      icon: Briefcase,
      colors: "#4361EE, #3A0CA3", // Blue
      width: "w-[76%] max-w-[250px]",
      height: "h-[60px]",
      rounded: "rounded-[32px]",
      direction: 1,
    },
    {
      id: 5,
      title: "CAREER GROWTH",
      icon: TrendingUp,
      colors: "#4CC9F0, #00B4D8", // Cyan
      width: "w-[60%] max-w-[190px]",
      height: "h-[60px]",
      rounded: "rounded-[32px]",
      direction: -1,
      titleClass: "-ml-4 md:-ml-6", // Shift only the text left by ~1rem
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background border-t border-border">
      {/* Decorative Background Elements */}
      <div className="absolute top-[20%] left-[-5%] w-[30%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        


        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Vision Text & Card */}
          <div className="flex flex-col items-start text-left max-w-xl mx-auto lg:mx-0">

            {/* Header Content (Moved to left) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            >
              <Eye className="w-4 h-4" />
              <span className="tracking-wide uppercase">OUR VISION</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
            >
              Shaping the Future <br className="hidden md:block" /> <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">of AI Learning</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl mb-10"
            >
              To empower learners worldwide with practical Artificial Intelligence knowledge, enabling them to innovate, solve real-world challenges, and confidently contribute to an AI-driven future.
            </motion.p>

            {/* Our Focus Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card/40 backdrop-blur-md border border-primary/20 rounded-3xl p-6 shadow-xl flex items-center gap-6 w-full hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-1">Our Focus</h4>
                <p className="text-primary font-bold text-sm mb-1">Practical. Innovative. Impactful.</p>
                <p className="text-muted-foreground text-sm leading-tight">Building skills that create real change.</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Sliced Lightbulb Graphic */}
          <div className="relative w-full flex flex-col items-center justify-center pt-8">
            
            {/* Glowing background aura behind bulb */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[400px] h-[80%] bg-gradient-to-b from-yellow-300/20 via-primary/10 to-transparent rounded-full blur-[80px] pointer-events-none -z-10" />

            {/* The Bulb Slices Wrapper */}
            <div className="flex flex-col items-center w-full max-w-[360px] mx-auto gap-[3px] perspective-1000 overflow-visible relative">
              
              {slices.map((slice, index) => {
                const Icon = slice.icon;
                return (
                  <motion.div
                    key={slice.id}
                    initial={{ opacity: 0, x: slice.direction * 50, backgroundPosition: "0px 0px, 0px -150px" }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundPosition: ["0px 0px, 0px -150px", "0px 0px, 0px 300px"]
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      opacity: { duration: 0.5, delay: index * 0.15 },
                      x: { type: "spring", stiffness: 100, damping: 14, delay: index * 0.15 },
                      backgroundPosition: { duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 + index * 0.2 }
                    }}
                    className={`${slice.width} ${slice.height} ${slice.rounded} shadow-lg shadow-black/10 flex items-center px-4 md:px-8 overflow-hidden relative group border-x-[3px] border-transparent`}
                    style={{
                      background: `linear-gradient(to right, ${slice.colors}) padding-box, linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%) border-box`,
                      backgroundSize: '100% 100%, 100% 150px',
                      backgroundRepeat: 'no-repeat, no-repeat',
                    }}
                  >
                    {/* Inner highlight for 3D glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className={`flex items-center gap-3 md:gap-4 w-[160px] md:w-[190px] mx-auto h-full text-white relative z-10 ${slice.contentClass || ''}`}>
                      <div className="shrink-0 flex items-center justify-center">
                        <Icon className="w-7 h-7 md:w-8 md:h-8 opacity-95 drop-shadow-md" strokeWidth={2} />
                      </div>
                      <div className={`flex flex-col justify-center ${slice.titleClass || ''}`}>
                        <h3 className="font-extrabold text-[11px] md:text-[13px] tracking-wider drop-shadow-md whitespace-nowrap">{slice.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Lightbulb Screw Base */}
            <div className="flex flex-col items-center gap-1.5 mt-2 relative z-20">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.9 }}
                className="w-[140px] h-[22px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 rounded-full shadow-lg border-b border-gray-950" 
              />
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 1.0 }}
                className="w-[120px] h-[22px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 rounded-full shadow-lg border-b border-gray-950" 
              />
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 1.1 }}
                className="w-[100px] h-[22px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 rounded-full shadow-lg border-b border-gray-950" 
              />
              {/* Bottom Electrical Contact */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
                className="w-[50px] h-[18px] bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600 rounded-b-full shadow-md mt-0.5 border-b border-gray-900" 
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
