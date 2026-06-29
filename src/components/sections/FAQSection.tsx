"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQAccordion } from "@/components/FAQAccordion";
import faqData from "@/data/faq.json";
import { FAQ } from "@/types";
import { GraduationCap, MonitorPlay, BookOpen, Award, CreditCard, Building2, HelpCircle, PhoneCall, ArrowRight, Headset, Mail, MessageSquare, Rocket, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CATEGORIES = [
  { id: "Getting Started", icon: Rocket },
  { id: "Courses", icon: BookOpen },
  { id: "Learning", icon: GraduationCap },
  { id: "Certifications", icon: Award },
  { id: "Payments", icon: CreditCard },
  { id: "Corporate", icon: Building2 },
  { id: "Support", icon: Headset },
];

export function FAQSection() {
  const faqs: FAQ[] = faqData;
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  // Fallback to activeCategory if faq has no category or filter by category
  const filteredFaqs = faqs.filter(faq => (faq.category || "Getting Started") === activeCategory);

  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-[10%] hidden lg:block opacity-70 dark:opacity-20 pointer-events-none z-0">
           <div className="relative">
             <div className="absolute -top-6 -right-10 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
             <div className="absolute top-10 -left-12 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
             <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm shadow-xl absolute rotate-6 -right-4 top-4">
               <HelpCircle className="w-8 h-8" />
             </div>
             <div className="bg-primary/20 backdrop-blur-sm text-primary p-3 rounded-2xl rounded-bl-sm shadow-lg absolute -rotate-12 -left-8 -top-2">
               <ShieldCheck className="w-6 h-6" />
             </div>
           </div>
        </div>

        {/* Top Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <Headset className="w-4 h-4" />
            <span className="tracking-wide">Support Center</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold md:font-extrabold mb-6 tracking-tight text-foreground"
          >
            Frequently Asked <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Questions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Everything you need to know before joining AI Abhyas.
          </motion.p>
        </div>

        {/* Top Separator Line */}
        <div className="w-full h-px bg-border/40 mb-12" />

        {/* Split Layout bordered container */}
        <div className="grid lg:grid-cols-[28%_72%] bg-card rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-border/50 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border/50 relative z-10">
          
          {/* Left Column: Categories Sidebar */}
          <div className="flex flex-col justify-between gap-8 p-6 lg:p-8 bg-muted/10">
            <div>
              <h3 className="font-heading font-bold mb-6 text-lg tracking-wide text-foreground">
                Browse by Category
              </h3>
              <ul className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 text-left ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20" 
                            : "bg-transparent text-muted-foreground hover:bg-muted/80 hover:text-foreground font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          {cat.id}
                        </div>
                        {!isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Need Help Box */}
            <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex flex-col gap-3 relative overflow-hidden">
              <h4 className="font-bold font-heading text-foreground z-10">Need Help?</h4>
              <p className="text-xs text-muted-foreground z-10 max-w-[70%]">Can't find the answer you're looking for?</p>
              <Button className="w-fit group bg-primary hover:bg-primary/90 text-white rounded-lg mt-2 z-10 text-xs px-4 h-9">
                Talk to Advisor
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="absolute -bottom-2 -right-4 w-28 h-28 opacity-90">
                <Image src="/Assets/images/robo_white_.png" alt="Robot" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="p-8 lg:p-10 w-full overflow-hidden">
            <h3 className="font-heading font-bold mb-6 text-lg tracking-wide text-foreground">
              Most Asked Questions
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredFaqs.length > 0 ? (
                  <FAQAccordion faqs={filteredFaqs} />
                ) : (
                  <div className="p-8 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-border border-dashed">
                    No questions found for this category yet.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] items-center gap-6 md:gap-8 bg-muted/30 border border-border/50 rounded-[20px] p-6 lg:py-6 lg:px-8 shadow-sm">
          {/* Support Text */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex flex-shrink-0 items-center justify-center shadow-sm shadow-primary/20">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-foreground leading-tight">Still have questions?</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Our support team is here to help you.</p>
            </div>
          </div>
          
          {/* Email Us */}
          <div className="hidden lg:flex items-center gap-4 border-l border-border/60 pl-8">
            <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border shadow-sm">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground mb-0.5">Email Us</p>
              <p className="text-xs text-primary font-medium hover:underline cursor-pointer">support@aiabhyas.com</p>
            </div>
          </div>

          {/* Live Chat */}
          <div className="hidden lg:flex items-center gap-4 border-l border-border/60 pl-8">
            <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border shadow-sm">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground mb-0.5">Live Chat</p>
              <p className="text-xs text-muted-foreground">Available 9 AM - 9 PM</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="ml-auto w-full md:w-auto mt-4 md:mt-0">
            <Button variant="outline" className="w-full rounded-xl border-primary/30 text-primary hover:bg-primary/5 h-11 px-6 font-semibold shadow-sm group">
              Contact Support <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
