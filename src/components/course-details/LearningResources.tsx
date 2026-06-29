"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, CheckSquare, Video, Copy, Presentation, Terminal, HelpCircle, Library, Folder, Layers } from "lucide-react";

export function LearningResources() {
  const resources = [
    { title: "Study Notes", desc: "Comprehensive notes for all modules.", icon: BookOpen },
    { title: "Slide Decks", desc: "Downloadable presentation slides.", icon: Presentation },
    { title: "Cheat Sheets", desc: "Quick reference guides for key concepts.", icon: FileText },
    { title: "Practice Sets", desc: "Test your knowledge with exercises.", icon: CheckSquare },
    { title: "Video Recordings", desc: "Lifetime access to all session videos.", icon: Video },
    { title: "Assignments", desc: "Real-world tasks to build your portfolio.", icon: Copy },
    { title: "Prompt Library", desc: "Curated collection of highly effective AI prompts.", icon: Terminal },
    { title: "Practice Quizzes", desc: "Test your understanding with quick quizzes.", icon: HelpCircle },
  ];

  const R = 145; // Increased radius to give vertical breathing room
  const connectorEnd = 200; // Increased to ensure text boxes stay perfectly aligned but spaced out
  
  // Reordering to map to 8 vertices starting from right (0 degrees)
  const items = [
    resources[0], // Right
    resources[1], // Top Right
    resources[6], // Top (New Corner)
    resources[2], // Top Left
    resources[3], // Left
    resources[4], // Bottom Left
    resources[7], // Bottom (New Corner)
    resources[5], // Bottom Right
  ];

  return (
    <section className="mb-0.5 relative">
      {/* Standard Section Heading */}
      <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 text-foreground text-center md:text-left">Premium Learning Resources</h2>

      {/* MOBILE VIEW (Vertical List) */}
      <div className="flex flex-col gap-4 md:hidden">
         {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
         ))}
      </div>

      {/* DESKTOP VIEW (Infographic Octagon Layout) */}
      <div className="hidden md:flex relative w-full h-[800px] items-center justify-center overflow-visible">
        
        {/* Central Octagon Polygon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg width="340" height="340" viewBox="-170 -170 340 340">
            <polygon 
              points="145,0 102.5,-102.5 0,-145 -102.5,-102.5 -145,0 -102.5,102.5 0,145 102.5,102.5" 
              className="fill-card/50 stroke-primary/30"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Center Text Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute z-10 w-[200px] text-center flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-primary opacity-80">
            <Folder className="w-7 h-7" />
            <Library className="w-10 h-10 -mt-2" />
            <Layers className="w-7 h-7" />
          </div>
          <h2 className="text-base md:text-lg font-heading font-bold text-foreground uppercase tracking-widest">Resources</h2>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Premium materials included</p>
        </motion.div>

        {/* Nodes and Text Boxes */}
        {items.map((item, i) => {
          const angles = [0, -45, -90, -135, -180, -225, -270, -315];
          const rad = (angles[i] * Math.PI) / 180;
          const x = R * Math.cos(rad);
          const y = R * Math.sin(rad);

          const isTop = i === 2;
          const isBottom = i === 6;
          const isRight = x > 0;
          
          if (isTop || isBottom) {
            // Vertical Layout for Top and Bottom nodes
            return (
              <div 
                key={i} 
                className="absolute z-20"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              >
                 {/* Vertical Connector Line */}
                 <motion.div 
                   initial={{ height: 0 }}
                   whileInView={{ height: 60 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                   className="absolute bg-primary/40 z-10"
                   style={{ 
                     [isTop ? 'bottom' : 'top']: '0px',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     width: '2px'
                   }}
                 />

                 {/* Node Icon */}
                 <motion.div
                   initial={{ scale: 0 }}
                   whileInView={{ scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                   className="absolute -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-background border-[3px] border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.2)] z-30 hover:scale-110 transition-transform cursor-default"
                 >
                   <item.icon className="w-4 h-4 text-foreground" />
                 </motion.div>
                 
                 {/* Text Box */}
                 <motion.div
                   initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                   className="absolute -translate-x-1/2 z-20 flex justify-center"
                   style={{
                     [isTop ? 'bottom' : 'top']: '60px',
                     width: '210px'
                   }}
                 >
                   <div className="p-3 bg-card/60 backdrop-blur-md border border-primary/20 rounded-xl shadow-lg hover:border-primary/50 hover:bg-card/80 transition-all cursor-default text-center w-full">
                     <h3 className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">{item.title}</h3>
                     <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                   </div>
                 </motion.div>
              </div>
            )
          }

          // Horizontal Layout for side nodes
          let connectorWidth = isRight ? connectorEnd - x : connectorEnd + x;
          
          // Shifting specific diagonal corners closer to the center as per previous requests
          if (i === 1 || i === 3 || i === 5 || i === 7) {
             connectorWidth -= 20; 
          }
          
          return (
            <div 
              key={i} 
              className="absolute z-20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
               {/* Horizontal Connector Line */}
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: connectorWidth }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                 className="absolute top-0 h-[2px] bg-primary/40 -translate-y-1/2 z-10"
                 style={{
                   [isRight ? 'left' : 'right']: '0px',
                 }}
               />

               {/* Node Icon */}
               <motion.div
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                 className="absolute -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-background border-[3px] border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.2)] z-30 hover:scale-110 transition-transform cursor-default"
               >
                 <item.icon className="w-4 h-4 text-foreground" />
               </motion.div>
               
               {/* Text Box */}
               <motion.div
                 initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                 className="absolute -translate-y-1/2 z-20 flex flex-col justify-center"
                 style={{
                   [isRight ? 'left' : 'right']: `${connectorWidth}px`,
                   width: '210px',
                   textAlign: isRight ? 'left' : 'right'
                 }}
               >
                 <div className="p-3 bg-card/60 backdrop-blur-md border border-primary/20 rounded-xl shadow-lg hover:border-primary/50 hover:bg-card/80 transition-all cursor-default">
                   <h3 className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">{item.title}</h3>
                   <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                 </div>
               </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
