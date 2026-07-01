"use client";

import { useState, useEffect } from "react";
import { FAQ } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Code, Target, Edit3, Layers, Monitor, HelpCircle, ArrowRight } from "lucide-react";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  // Use exactly 5 questions
  const displayFaqs = faqs.slice(0, 5);
  const [activeId, setActiveId] = useState<string>("");

  // Collapse all when category changes
  useEffect(() => {
    setActiveId("");
  }, [faqs]);

  const getIconForQuestion = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes("join") || q.includes("who")) return Users;
    if (q.includes("coding") || q.includes("code") || q.includes("programming")) return Code;
    if (q.includes("choose") || q.includes("right")) return Target;
    if (q.includes("enroll") || q.includes("register")) return Edit3;
    if (q.includes("more") || q.includes("multiple") || q.includes("can i")) return Layers;
    if (q.includes("system") || q.includes("requirements") || q.includes("computer")) return Monitor;
    return HelpCircle;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto flex flex-col gap-4"
    >
      <div className="flex flex-col gap-3">
        {displayFaqs.map((faq) => {
          const Icon = getIconForQuestion(faq.question);
          const isActive = faq.id === activeId;
          
          return (
            <div 
              key={faq.id} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isActive 
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                  : "border-border/60 bg-card hover:border-border"
              }`}
            >
              <button
                onClick={() => setActiveId(isActive ? "" : faq.id)}
                className="w-full flex items-center justify-between text-left px-6 py-4 transition-colors"
              >
                <div className="flex items-center gap-4 pr-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? "bg-primary text-white shadow-sm" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-heading font-semibold text-[15px] md:text-[16px] leading-tight ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary transition-colors"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 transition-transform duration-300 ${isActive ? "rotate-90 text-primary" : "text-muted-foreground"}`}>
                  <ArrowRight className="w-5 h-5 opacity-70" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-1 pl-[72px]">
                      <div className="border-l-2 border-primary/20 pl-4">
                        <p className="text-muted-foreground text-[15px] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
