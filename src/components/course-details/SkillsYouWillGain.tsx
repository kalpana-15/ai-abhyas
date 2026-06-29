"use client";

import { motion } from "framer-motion";

export function SkillsYouWillGain({ skills }: { skills: string[] }) {
  return (
    <section className="mb-0.5">
      <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 text-foreground">Skills you'll gain</h2>
      
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 bg-muted/30 border border-border/50 rounded-full text-sm font-semibold text-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 shadow-sm transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
