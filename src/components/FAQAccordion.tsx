"use client";

import { FAQ } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Users, Code, Target, Edit3, Layers, Monitor, HelpCircle } from "lucide-react";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
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
      className="w-full mx-auto"
    >
      <Accordion className="w-full flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const Icon = getIconForQuestion(faq.question);
          return (
              <AccordionItem 
              key={faq.id} 
              value={`item-${index}`} 
              className="border border-border/60 rounded-2xl bg-card px-6 sm:px-8 py-2 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-[15px] md:text-[17px] hover:text-primary hover:no-underline transition-colors py-4 [&>svg]:text-primary [&>svg]:w-5 [&>svg]:h-5 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4 pt-4 border-t border-border mt-1">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}
