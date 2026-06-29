"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Building2, Lightbulb } from "lucide-react";

export function WhoShouldEnroll() {
  const audiences = [
    {
      title: "Students",
      description: "College students looking to jumpstart their career with in-demand AI skills and build a standout portfolio.",
      icon: GraduationCap,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      borderHover: "hover:border-blue-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    },
    {
      title: "Professionals",
      description: "Working professionals aiming to transition into AI roles or leverage AI to automate their current workflows.",
      icon: Briefcase,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      borderHover: "hover:border-purple-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
    },
    {
      title: "Entrepreneurs",
      description: "Founders and indie-hackers looking to build AI-powered products or optimize business operations.",
      icon: Lightbulb,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      borderHover: "hover:border-amber-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
    },
    {
      title: "Organizations",
      description: "Teams seeking structured upskilling to implement enterprise-grade AI solutions internally.",
      icon: Building2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      borderHover: "hover:border-emerald-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    }
  ];

  return (
    <section className="mb-0.5">
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground text-center md:text-left">Who Should Enroll?</h2>
        <p className="text-muted-foreground mt-2 text-center md:text-left">Tailored learning paths ensuring maximum value for different career stages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {audiences.map((audience, index) => {
          const Icon = audience.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`group relative p-5 rounded-3xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 ${audience.borderHover} ${audience.shadowHover} overflow-hidden`}
            >
              {/* Background Glow Effect on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-${audience.color.split('-')[1]}-500/5 pointer-events-none`} />
              
              <div className={`w-12 h-12 rounded-xl ${audience.bg} ${audience.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-sm font-bold font-heading text-foreground mb-1.5 relative z-10">{audience.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{audience.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
