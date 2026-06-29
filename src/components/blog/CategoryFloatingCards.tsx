"use client";

import { motion } from "framer-motion";
import { 
  MessageSquareText, 
  Wrench, 
  Briefcase, 
  TrendingUp, 
  PlayCircle, 
  FileText,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Master Prompt Engineering",
    description: "Learn proven prompting techniques to generate accurate, reliable, and creative AI outputs across today's leading AI models.",
    icon: MessageSquareText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    delay: 0,
    xOffset: "left-[5%]"
  },
  {
    id: 2,
    title: "AI Tools & Workflows",
    description: "Explore practical AI tools, compare their capabilities, and learn how to integrate them into real-world workflows.",
    icon: Wrench,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    delay: 2,
    xOffset: "right-[5%]"
  },
  {
    id: 3,
    title: "Real-World AI Case Studies",
    description: "Discover how businesses, startups, and organizations are successfully applying AI to solve real-world challenges.",
    icon: Briefcase,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    delay: 4,
    xOffset: "left-[10%]"
  },
  {
    id: 4,
    title: "AI Industry Trends",
    description: "Stay informed with emerging technologies, breakthrough innovations, and market insights shaping the future of Artificial Intelligence.",
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    delay: 6,
    xOffset: "right-[10%]"
  },
  {
    id: 5,
    title: "Hands-On Tutorials",
    description: "Follow step-by-step practical guides to build AI applications, automate tasks, and develop real-world AI skills.",
    icon: PlayCircle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    delay: 8,
    xOffset: "left-[2%]"
  },
  {
    id: 6,
    title: "Research & Insights",
    description: "Access simplified summaries of influential AI research papers, technical breakthroughs, and innovations from leading institutions worldwide.",
    icon: FileText,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    delay: 10,
    xOffset: "right-[2%]"
  }
];

export function CategoryFloatingCards() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl hidden md:block">
      {categories.map((cat) => {
        const Icon = cat.icon;
        
        return (
          <motion.div
            key={cat.id}
            className={`absolute top-[35%] w-auto inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 shadow-xl ${cat.xOffset}`}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
            initial={{ y: 0, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: -250, 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.9]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: cat.delay,
              ease: "linear",
              times: [0, 0.1, 0.8, 1]
            }}
          >
            {/* Ambient Background Glow inside the badge */}
            <div className={`absolute inset-0 opacity-15 ${cat.bg} rounded-full`} />

            <div className="relative z-10 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${cat.bg} ${cat.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-medium text-foreground text-sm pr-2 whitespace-nowrap">
                {cat.title}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
