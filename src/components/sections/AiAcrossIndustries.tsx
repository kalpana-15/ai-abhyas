"use client";

import { motion } from "framer-motion";
import { GraduationCap, HeartPulse, Landmark, Megaphone, ShoppingBag, Factory, Users, Settings, Globe2 } from "lucide-react";

const industries = [
  { name: "Education", icon: GraduationCap },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Finance", icon: Landmark },
  { name: "Marketing", icon: Megaphone },
  { name: "Retail", icon: ShoppingBag },
  { name: "Manufacturing", icon: Factory },
  { name: "Human Resources", icon: Users },
  { name: "Operations", icon: Settings },
];

export function AiAcrossIndustries() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <Globe2 className="w-4 h-4" />
            <span className="tracking-wide uppercase">INDUSTRY APPLICATIONS</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
          >
            AI Across <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Industries</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
          >
            Our training applies to virtually every sector. See how AI is transforming your specific industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-card border border-border hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-heading text-center group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
