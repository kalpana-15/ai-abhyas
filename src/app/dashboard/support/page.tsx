"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { HeadphonesIcon, MessageSquare, FileText, ChevronDown, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How do I download my certificate?", a: "Once you complete 100% of the course modules and pass the final assessment, your certificate will automatically appear in the 'Certificates' tab where you can download it as a PDF." },
  { q: "When are the live sessions held?", a: "Live sessions are scheduled based on the course cohort. You can always check the 'Live Classes' tab for upcoming dates, times, and Zoom links. All sessions are recorded." },
  { q: "How do I contact my mentor?", a: "You can reach out to your assigned mentor via the built-in chat feature or by submitting a specific query in the 'Support' section." },
];

export default function SupportPage() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Support & Help Center</h1>
        <p className="text-muted-foreground">Find answers to common questions or reach out to our support team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center hover:bg-primary/10 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-foreground mb-1">Live Chat</h3>
          <p className="text-xs text-muted-foreground">Response time: &lt; 5 mins</p>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-foreground mb-1">Documentation</h3>
          <p className="text-xs text-muted-foreground">Read detailed guides</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeadphonesIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-foreground mb-1">Mentor Call</h3>
          <p className="text-xs text-muted-foreground">Schedule a 1:1 session</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-foreground hover:bg-muted/50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold font-heading text-foreground mb-1">Send a Message</h2>
          <p className="text-sm text-muted-foreground mb-6">Our support team will get back to you within 24 hours via email.</p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
              <select className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground appearance-none">
                <option>Technical Issue</option>
                <option>Billing & Payments</option>
                <option>Course Content</option>
                <option>Certificate Issue</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
              <textarea 
                rows={5} 
                placeholder="Describe your issue in detail..." 
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground resize-none"
              />
            </div>

            <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit Ticket
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
