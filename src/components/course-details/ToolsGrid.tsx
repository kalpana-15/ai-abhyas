"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cloud, Blocks, Box, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ToolsGrid({ tools }: { tools: string[] }) {
  // A helper array of nice tech icons
  const icons = [Terminal, Database, Cloud, Blocks, Box, Code2];

  // We'll limit tools to 8 just so the circle doesn't get ridiculously crowded, 
  // but usually there are 4-6 tools per course.
  const displayTools = tools.slice(0, 8);
  const radius = 180; // Increased radius for wider scatter

  return (
    <section className="mb-0.5">
      <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 text-foreground text-center md:text-left">Tools & Technologies</h2>
      
      {/* Relative container for the radial explosion */}
      <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
        
        {/* The Central Button */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute z-20"
        >
          <Button variant="default" size="lg" className="rounded-full shadow-lg font-bold font-heading px-6 hover:scale-105 transition-transform cursor-default">
            Be handy on all tools
          </Button>
        </motion.div>

        {/* The radially scattered tools container, which spins */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 1 }} // Starts spinning after 1s
        >
          {displayTools.map((tool, index) => {
            const Icon = icons[index % icons.length];
            const angle = (index / displayTools.length) * 2 * Math.PI;
            
            const targetX = radius * Math.cos(angle);
            const targetY = radius * Math.sin(angle);
            
            return (
              <motion.div
                key={index}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                whileInView={{ x: targetX, y: targetY, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.8, 
                  delay: 0.1 + (index * 0.1) 
                }}
                className="absolute z-10 w-24"
              >
                {/* Counter-spin so the text and icon stay upright */}
                <motion.div
                  className="flex flex-col items-center justify-center gap-2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm hover:scale-110 hover:bg-primary hover:text-primary-foreground transition-all cursor-default">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-foreground text-center leading-tight">
                    {tool}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
