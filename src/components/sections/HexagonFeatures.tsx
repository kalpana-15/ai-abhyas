"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, BookOpen, Compass, Layers, Target, Rocket, Users } from "lucide-react";

const features = [
  {
    id: "01",
    title: "Practical-First Learning",
    description: "Learn AI by building projects, solving real-world problems, and applying concepts through hands-on experience.",
    icon: Wrench,
    pos: { x: -130, y: -220 }, // Top-Left
  },
  {
    id: "02",
    title: "Industry-Relevant Curriculum",
    description: "Courses are designed around current AI technologies, tools, and workflows used by professionals and organizations.",
    icon: BookOpen,
    pos: { x: 130, y: -220 }, // Top-Right
  },
  {
    id: "03",
    title: "Expert-Led Guidance",
    description: "Learn from experienced mentors who simplify complex AI concepts into structured, easy-to-follow learning paths.",
    icon: Compass,
    pos: { x: -260, y: 0 }, // Middle-Left
  },
  {
    id: "04",
    title: "Project-Based Approach",
    description: "Every learner gains practical exposure through assignments, case studies, and portfolio-ready AI projects.",
    icon: Layers,
    pos: { x: 260, y: 0 }, // Middle-Right
  },
  {
    id: "05",
    title: "Career-Oriented Training",
    description: "Develop the technical and problem-solving skills needed for internships, higher education, and AI-driven careers.",
    icon: Rocket,
    pos: { x: -130, y: 220 }, // Bottom-Left
  },
  {
    id: "06",
    title: "Continuous Learning Community",
    description: "Be part of a collaborative environment where learners explore, innovate, and grow together.",
    icon: Users,
    pos: { x: 130, y: 220 }, // Bottom-Right
  }
];

const HexagonNode = ({ feature }: { feature: typeof features[0] }) => {
  const Icon = feature.icon;

  return (
    <div 
      className="absolute flip-card pointer-events-auto group"
      style={{
        width: "250px",
        height: "285px",
        left: `calc(50% + ${feature.pos.x}px)`,
        top: `calc(50% + ${feature.pos.y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-full h-full flip-inner cursor-pointer drop-shadow-xl hover:drop-shadow-2xl">
        
        {/* Front (Outlined Icon + Title) */}
        <div 
          className="absolute inset-0 flip-front bg-primary/40 flex flex-col items-center justify-center text-center shadow-inner"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          {/* Inner Hexagon to create Outline Effect */}
          <div 
            className="absolute inset-[2px] bg-gradient-to-br from-background via-primary/10 to-primary/30 dark:via-background dark:to-primary/20 backdrop-blur-sm flex flex-col items-center justify-center p-6"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <Icon className="w-16 h-16 text-primary mb-3" strokeWidth={1.5} />
            <h3 className="font-bold text-lg text-foreground leading-tight">{feature.title}</h3>
          </div>
        </div>

        {/* Back (Description - Shows on Hover) */}
        <div 
          className="absolute inset-0 flip-back bg-card border border-primary/30 flex flex-col items-center justify-center p-8 text-center"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-card via-primary/15 to-primary/40 dark:via-card dark:to-primary/25 -z-10" />
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mb-4 shadow-inner">
            {feature.id}
          </span>
          <p className="text-[14px] text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
        </div>

      </div>
    </div>
  );
};

export function HexagonFeatures() {
  return (
    <section className="py-24 bg-background overflow-hidden relative border-y border-border">
      {/* Abstract Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <Target className="w-4 h-4" />
            <span className="tracking-wide uppercase">OUR APPROACH</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
          >
            Why <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">AI Abhyas?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-xl mt-6 max-w-2xl mx-auto"
          >
            Hover to discover what sets AI Abhyas apart.
          </motion.p>
        </div>

        {/* Desktop View: Perfectly Packed Honeycomb */}
        <div className="hidden lg:block relative w-full h-[700px] max-w-[900px] mx-auto mt-12 scale-[0.80] xl:scale-90 origin-top">
          
          {/* Static Center Hexagon (Logo/Target - Outlined) */}
          <div 
            className="absolute z-10"
            style={{
              width: "250px",
              height: "285px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div 
              className="absolute inset-0 bg-primary/40 flex flex-col items-center justify-center text-center shadow-2xl"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              {/* Inner Hexagon Outline */}
              <div 
                className="absolute inset-[2px] bg-gradient-to-br from-background via-primary/10 to-primary/30 dark:via-background dark:to-primary/20 backdrop-blur-sm flex flex-col items-center justify-center p-6"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <Target className="w-20 h-20 text-primary mb-3" strokeWidth={1.5} />
                <h3 className="font-bold text-xl text-foreground">AI Abhyas</h3>
              </div>
            </div>
          </div>

          {/* 6 Surrounding Flipping Hexagons */}
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <HexagonNode feature={feature} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Vertical Stack of Flip Cards */}
        <div className="lg:hidden flex flex-col gap-8 items-center mt-12">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flip-card w-[250px] h-[285px] pointer-events-auto"
            >
              <div className="relative w-full h-full flip-inner cursor-pointer drop-shadow-xl">
                
                {/* Front (Outlined Icon + Title) */}
                <div 
                  className="absolute inset-0 flip-front bg-primary/40 flex flex-col items-center justify-center text-center shadow-inner"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  <div 
                    className="absolute inset-[2px] bg-gradient-to-br from-background via-primary/10 to-primary/30 dark:via-background dark:to-primary/20 backdrop-blur-sm flex flex-col items-center justify-center p-6"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    <feature.icon className="w-16 h-16 text-primary mb-3" strokeWidth={1.5} />
                    <h3 className="font-bold text-lg text-foreground leading-tight">{feature.title}</h3>
                  </div>
                </div>

                {/* Back (Description - Shows on Hover) */}
                <div 
                  className="absolute inset-0 flip-back bg-card border border-primary/30 flex flex-col items-center justify-center p-8 text-center"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-card via-primary/15 to-primary/40 dark:via-card dark:to-primary/25 -z-10" />
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mb-4 shadow-inner">
                    {feature.id}
                  </span>
                  <p className="text-[14px] text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Custom CSS to handle 3D flip robustly with clip-path */}
      <style dangerouslySetInnerHTML={{__html: `
        .flip-card { perspective: 1000px; -webkit-perspective: 1000px; }
        .flip-inner { 
          transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); 
          transform-style: preserve-3d; 
          -webkit-transform-style: preserve-3d;
        }
        .flip-card:hover .flip-inner { 
          transform: rotateY(180deg); 
          -webkit-transform: rotateY(180deg);
        }
        
        /* 
           Since clip-path breaks backface-visibility in WebKit/Safari, 
           we manually swap opacity at exactly halfway through the 0.6s rotation (0.3s)
        */
        .flip-front { 
          opacity: 1; 
          transition: opacity 0s linear 0.3s;
        }
        .flip-card:hover .flip-front { 
          opacity: 0; 
        }
        
        .flip-back { 
          opacity: 0; 
          transform: rotateY(180deg); 
          -webkit-transform: rotateY(180deg);
          transition: opacity 0s linear 0.3s;
        }
        .flip-card:hover .flip-back { 
          opacity: 1; 
        }
      `}} />
    </section>
  );
}
