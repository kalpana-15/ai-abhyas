"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap, Monitor, BookOpen, Laptop, ClipboardCheck, Award } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    title: "Enroll",
    description: "Choose the course that matches your goals.",
    icon: GraduationCap,
    color: "#8B5CF6", // Primary
  },
  {
    title: "Live Training",
    description: "Attend interactive live sessions with mentors.",
    icon: Monitor,
    color: "#DAA520", // Gold
  },
  {
    title: "Learning Resources",
    description: "Access notes, recordings, templates, and study material.",
    icon: BookOpen,
    color: "#14B8A6", // Teal
  },
  {
    title: "Projects & Practice",
    description: "Apply knowledge through real-world AI projects.",
    icon: Laptop,
    color: "#8B5CF6", // Primary
  },
  {
    title: "Assessment",
    description: "Evaluate your skills through\nquizzes & assignments.",
    icon: ClipboardCheck,
    color: "#DAA520", // Gold
  },
  {
    title: "Certification",
    description: "Receive a verifiable AI Abhyas certificate.",
    icon: Award,
    color: "#14B8A6", // Teal
  },
];

export function LearningJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [showNodes, setShowNodes] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowNodes(true);
    }
  }, [isInView]);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      
      <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="tracking-wide">Learning Journey</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-foreground"
        >
          Your AI Learning <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Journey</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
        >
          A structured pathway to learn, practice, and master real-world AI skills.
        </motion.p>
      </div>

      {/* Desktop Winding Timeline (Hidden on mobile) */}
      <div className="w-full overflow-x-auto py-24 px-0 scrollbar-hide relative z-10 hidden md:block" ref={containerRef}>
        <div className="relative w-full min-w-[1200px] max-w-full mx-auto aspect-[4/1]">
          
          {/* SVG Road Background */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="road-shadow" x="-20%" y="-30%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Outer border / Sidewalk */}
              <path 
                d="M -100 150 L 50 150 A 90 90 0 0 1 230 150 A 90 90 0 0 0 410 150 A 90 90 0 0 1 590 150 A 90 90 0 0 0 770 150 A 90 90 0 0 1 950 150 A 90 90 0 0 0 1130 150 L 1300 150"
                fill="none" 
                stroke="currentColor" 
                className="text-background dark:text-muted"
                strokeWidth="40" 
                strokeLinecap="round" 
                filter="url(#road-shadow)" 
              />

              {/* Main Road */}
              <path 
                d="M -100 150 L 50 150 A 90 90 0 0 1 230 150 A 90 90 0 0 0 410 150 A 90 90 0 0 1 590 150 A 90 90 0 0 0 770 150 A 90 90 0 0 1 950 150 A 90 90 0 0 0 1130 150 L 1300 150"
                fill="none" 
                className="stroke-border dark:stroke-[#33373b]" 
                strokeWidth="32" 
                strokeLinecap="round" 
              />

              {/* Moving Dashed Line (Traffic) */}
              <motion.path 
                d="M -100 150 L 50 150 A 90 90 0 0 1 230 150 A 90 90 0 0 0 410 150 A 90 90 0 0 1 590 150 A 90 90 0 0 0 770 150 A 90 90 0 0 1 950 150 A 90 90 0 0 0 1130 150 L 1300 150"
                fill="none" 
                className="stroke-primary dark:stroke-white" 
                strokeWidth="3" 
                strokeDasharray="10 12" 
                strokeLinecap="round"
                initial={{ strokeDashoffset: 44 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              />
            </svg>
          </div>

          {/* Nodes */}
          {steps.map((step, i) => {
            const isDown = i % 2 === 0; // i=0 is down, i=1 is up, etc.
            const xCenters = [140, 320, 500, 680, 860, 1040];
            const leftPercent = (xCenters[i] / 1200) * 100;
            
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.title}
                className="absolute z-10"
                style={{
                  left: `${leftPercent}%`,
                  top: `50%`,
                }}
                initial={{ opacity: 0, y: isDown ? "150px" : "-150px", x: "-50%" }}
                animate={showNodes ? { opacity: 1, y: "-50%", x: "-50%" } : {}}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.2, 0.8, 0.2, 1], 
                  delay: 0.2 + (i * 0.2) 
                }}
              >
                {/* Node Ball */}
                <div 
                  className="absolute w-[66px] h-[66px] rounded-full bg-background flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.4)] z-10 border border-solid"
                  style={{ top: '-33px', left: '-33px', borderColor: step.color }}
                >
                  <Icon className="w-8 h-8" style={{ color: step.color }} />
                </div>

                {/* Connector Line & Dot */}
                <div 
                  className="absolute w-[2px] bg-border dark:bg-muted" 
                  style={{
                    left: 0,
                    height: '70px',
                    ...(isDown ? { top: '33px' } : { bottom: '33px' })
                  }}
                >
                  <div 
                    className="absolute w-[10px] h-[10px] rounded-full bg-background border-[3px]"
                    style={{ 
                      borderColor: step.color,
                      left: '-4px', // 2px line, 10px dot -> offset is (10-2)/2 = 4px left
                      ...(isDown ? { bottom: '-4px' } : { top: '-4px' }) 
                    }}
                  />
                </div>

                {/* Content Box */}
                <div 
                  className="absolute w-[180px] text-center"
                  style={{
                    left: '-90px',
                    ...(isDown ? { top: '120px' } : { bottom: '120px' })
                  }}
                >
                  <h3 
                    className="text-base font-heading font-bold mb-2 uppercase tracking-widest"
                    style={{ color: step.color }}
                  >
                    Step 0{i + 1}
                  </h3>
                  <div className="font-heading font-bold text-foreground text-sm mb-1">{step.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="w-full relative z-10 md:hidden pb-12 pt-8 overflow-hidden">
        <div className="relative w-full max-w-[400px] mx-auto h-[1200px]">
          
          {/* Vertical Road SVG */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 300 1200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="mobile-road-shadow" x="-30%" y="-10%" width="160%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              <path 
                d="M 150 -100 L 150 50 A 90 90 0 0 1 150 230 A 90 90 0 0 0 150 410 A 90 90 0 0 1 150 590 A 90 90 0 0 0 150 770 A 90 90 0 0 1 150 950 A 90 90 0 0 0 150 1130 L 150 1300"
                fill="none" 
                stroke="currentColor" 
                className="text-background dark:text-muted"
                strokeWidth="40" 
                strokeLinecap="round" 
                filter="url(#mobile-road-shadow)" 
              />

              <path 
                d="M 150 -100 L 150 50 A 90 90 0 0 1 150 230 A 90 90 0 0 0 150 410 A 90 90 0 0 1 150 590 A 90 90 0 0 0 150 770 A 90 90 0 0 1 150 950 A 90 90 0 0 0 150 1130 L 150 1300"
                fill="none" 
                className="stroke-border dark:stroke-[#33373b]" 
                strokeWidth="32" 
                strokeLinecap="round" 
              />

              <motion.path 
                d="M 150 -100 L 150 50 A 90 90 0 0 1 150 230 A 90 90 0 0 0 150 410 A 90 90 0 0 1 150 590 A 90 90 0 0 0 150 770 A 90 90 0 0 1 150 950 A 90 90 0 0 0 150 1130 L 150 1300"
                fill="none" 
                className="stroke-primary dark:stroke-white" 
                strokeWidth="3" 
                strokeDasharray="10 12" 
                strokeLinecap="round"
                initial={{ strokeDashoffset: 44 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              />
            </svg>
          </div>
          
          {/* Nodes */}
          {steps.map((step, i) => {
            const isRightBulge = i % 2 === 0;
            const isLeftText = isRightBulge; 
            const yCenters = [140, 320, 500, 680, 860, 1040];
            const topPercent = (yCenters[i] / 1200) * 100;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                className="absolute z-10"
                style={{
                  top: `${topPercent}%`,
                  left: `50%`,
                }}
                initial={{ opacity: 0, x: isLeftText ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
              >
                {/* Node Ball */}
                <div 
                  className="absolute w-[36px] h-[36px] rounded-full bg-background flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.4)] border border-solid"
                  style={{ top: '-18px', left: '-18px', borderColor: step.color }}
                >
                  <Icon className="w-4 h-4" style={{ color: step.color }} />
                </div>

                {/* Connector */}
                <div 
                  className="absolute h-[2px] bg-border dark:bg-muted"
                  style={{
                    top: 0,
                    width: '20px',
                    ...(isLeftText ? { right: '18px' } : { left: '18px' })
                  }}
                >
                  <div 
                    className="absolute w-[6px] h-[6px] rounded-full bg-background border-[2px]"
                    style={{
                      borderColor: step.color,
                      top: '-2px',
                      ...(isLeftText ? { left: '-3px' } : { right: '-3px' })
                    }}
                  />
                </div>

                {/* Content Box */}
                <div 
                  className={`absolute w-[110px] sm:w-[130px] flex flex-col justify-center ${isLeftText ? 'items-end text-right' : 'items-start text-left'}`}
                  style={{
                    top: '0', 
                    transform: 'translateY(-50%)',
                    ...(isLeftText ? { right: '45px' } : { left: '45px' })
                  }}
                >
                  <h3 
                    className="text-[9px] font-heading font-bold mb-1 uppercase tracking-widest"
                    style={{ color: step.color }}
                  >
                    Step 0{i + 1}
                  </h3>
                  <div className="font-heading font-bold text-foreground text-xs leading-tight mb-1">{step.title}</div>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {step.description.replace('\n', ' ')}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
