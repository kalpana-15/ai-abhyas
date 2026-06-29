"use client";

import { motion } from "framer-motion";
import { UserPlus, Video, Library, Hammer, CheckSquare, Award, TrendingUp, Compass, Rocket } from "lucide-react";

export function LearningJourney() {
  const steps = [
    { title: "Enroll", desc: "Start your journey", icon: UserPlus },
    { title: "Live Sessions", desc: "Expert led classes", icon: Video },
    { title: "Resources", desc: "Premium materials", icon: Library },
    { title: "Projects", desc: "Real-world builds", icon: Hammer },
    { title: "Assessments", desc: "Test your skills", icon: CheckSquare },
    { title: "Certification", desc: "Get recognized", icon: Award },
    { title: "Career Growth", desc: "Land your dream job", icon: TrendingUp },
  ];

  return (
    <section className="mb-0.5">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
        >
          <Compass className="w-4 h-4" />
          <span className="tracking-wide">LEARNING JOURNEY</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
        >
          <Rocket className="w-8 h-8 md:w-10 md:h-10 text-primary inline-block mr-3 -mt-2" />
          Your AI <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Learning Journey</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
        >
          A structured pathway designed to help you learn, practice, assess, and demonstrate real-world AI skills.
        </motion.p>
      </div>

      <div className="relative">
        {/* Track Line (Background) */}
        <div className="hidden md:block absolute top-8 left-[4%] right-[4%] h-1 bg-muted rounded-full overflow-hidden z-0">
           {/* Animated Fill Line */}
           <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
             className="w-full h-full bg-gradient-to-r from-primary/50 via-primary to-primary/80 origin-left"
           />
        </div>
        
        {/* Mobile Vertical Track Line */}
        <div className="md:hidden absolute top-8 bottom-8 left-8 w-1 bg-muted rounded-full overflow-hidden z-0">
           {/* Animated Fill Line */}
           <motion.div 
             initial={{ scaleY: 0 }}
             whileInView={{ scaleY: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
             className="w-full h-full bg-gradient-to-b from-primary/50 via-primary to-primary/80 origin-top"
           />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + (index * 0.15), // Staggered to follow the line
                  type: "spring"
                }}
                className="flex md:flex-col items-center md:text-center gap-5 group cursor-default flex-1"
              >
                {/* Icon Node */}
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-16 h-16 shrink-0 rounded-full bg-card border-[3px] border-border group-hover:border-primary flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-500 relative z-10">
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">{step.title}</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground leading-tight hidden sm:block">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
