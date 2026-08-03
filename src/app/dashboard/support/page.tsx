"use client";

import React, { useState, useEffect } from "react";
import { getSupportTickets, createSupportTicket } from "@/actions/dashboardActions";
import { 
  HelpCircle, 
  MessageSquare, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  Send, 
  X, 
  FileQuestion,
  PhoneCall,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeThreadModal, setActiveThreadModal] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Technical Support & Labs");
  const [message, setMessage] = useState("");

  const faqs = [
    {
      q: "What is my cloud GPU allowance limit for LLM fine-tuning labs?",
      a: "All learners receive 50 complimentary GPU computing hours per course. If you need more resources during assessments, open a support ticket below for an extension."
    },
    {
      q: "What is the turnaround time for code debugging and review?",
      a: "Our engineering faculty actively monitor incoming tickets. Average response time for technical review and debugger support is under 45 minutes during regular hours."
    },
    {
      q: "How do I request a quiz assessment reset?",
      a: "If you experience network issues during a proctored exam, submit a support ticket under 'Proctored Quizzes & Grading' with your course ID to authorize a re-attempt."
    },
    {
      q: "How do I download official invoices and receipts?",
      a: "Navigate to the 'Payments & Invoices' section from your left sidebar navigation. You can view and directly download official tax PDF receipts there."
    },
    {
      q: "Can I schedule a 1-on-1 advisory call with a mentor?",
      a: "Yes! Enrolled learners can book mentor guidance calls via WhatsApp or by contacting our academic support phone line directly."
    }
  ];

  useEffect(() => {
    async function loadTickets() {
      try {
        setLoading(true);
        const res = await getSupportTickets();
        if (res && res.success && res.tickets) {
          setTickets(res.tickets);
        }
      } catch (err) {
        console.error("Error loading tickets:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert("Please provide both a subject line and detailed inquiry message.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await createSupportTicket(subject, category, message);
      if (res.success && res.ticket) {
        setTickets((prev) => [res.ticket, ...prev]);
        setShowNewModal(false);
        setSubject("");
        setMessage("");
        alert("Support ticket logged successfully! Our engineering advisors will respond within 2 hours.");
      } else {
        alert(res?.error || "Could not save ticket.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-12 max-w-6xl mx-auto">
      {/* PROFESSIONAL MINIMAL HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8B5CF6] mb-1">
            <Sparkles className="w-3 h-3 fill-[#8B5CF6]" />
            <span>Support &amp; Advisory Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Help &amp; Support Center
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Connect with technical mentors for lab troubleshooting, computing resources, and curriculum guidance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="px-5 py-3 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 self-start md:self-center shrink-0 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      {/* INSTANT COMMUNICATION CHANNELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-[#14182F] p-5 rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#14B8A6] dark:hover:border-emerald-500 transition-all shadow-xs flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#14B8A6] tracking-wider block">Instant Messaging</span>
            <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading flex items-center gap-1.5">
              <span>WhatsApp Support</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity text-[#14B8A6]" />
            </h3>
            <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">+91 98765-43210 &bull; <span className="text-emerald-500 font-bold">Online</span></p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
        </a>

        <a
          href="mailto:support@aiabhyas.com"
          className="bg-white dark:bg-[#14182F] p-5 rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6] transition-all shadow-xs flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8B5CF6] tracking-wider block">Email Desk</span>
            <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading flex items-center gap-1.5">
              <span>Email Support</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity text-[#8B5CF6]" />
            </h3>
            <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">support@aiabhyas.com</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center shrink-0 border border-[#8B5CF6]/20 group-hover:scale-105 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
        </a>

        <a
          href="tel:18008891080"
          className="bg-white dark:bg-[#14182F] p-5 rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6] transition-all shadow-xs flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-gray-500 dark:text-gray-400 tracking-wider block">Toll-Free Helpline</span>
            <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading flex items-center gap-1.5">
              <span>Phone Support</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity text-gray-400" />
            </h3>
            <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">1800-889-1080 (9am-9pm)</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gray-500/10 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0 border border-gray-500/20 group-hover:scale-105 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FAQ ACCORDION */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-extrabold text-[#111827] dark:text-white font-heading tracking-tight flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-[#8B5CF6]" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-4 sm:p-5 shadow-xs space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-[#E7E5F4] dark:border-white/[0.06] last:border-none pb-3 last:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left py-1 flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold text-[#111827] dark:text-white hover:text-[#8B5CF6] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#8B5CF6]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2 leading-relaxed pt-1 border-t border-dashed border-[#E7E5F4] dark:border-white/[0.05]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: TICKETS LIST SECTION */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-[#111827] dark:text-white font-heading tracking-tight flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
              <span>Support Tickets</span>
            </span>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-bold">{tickets.length} Active Tickets</span>
          </h2>

          {loading ? (
            <div className="py-20 bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
              <span className="text-xs font-bold">Loading support tickets...</span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white dark:bg-[#14182F] p-10 rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center border border-[#8B5CF6]/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wider">No Support Tickets Logged</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-sm leading-relaxed">
                You currently have no active tickets. If you encounter bugs or need assistance, use the button above to log a ticket!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((t) => {
                const messages = Array.isArray(t.messages) ? t.messages : [];
                const isResolved = t.status === "Resolved";

                return (
                  <div key={t.id} className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-5 sm:p-6 shadow-2xs hover:border-[#8B5CF6]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-2 max-w-md">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn(
                          "text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border",
                          isResolved 
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                        )}>
                          {t.status}
                        </span>
                        <span className="text-[11px] font-extrabold text-[#6B7280] dark:text-[#9CA3AF]">
                          {t.category}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-[#111827] dark:text-white font-heading">
                        {t.subject}
                      </h3>
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] line-clamp-1 italic font-medium">
                        Latest: &quot;{messages[messages.length - 1]?.text || "Ticket logged under review by faculty."}&quot;
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveThreadModal(t)}
                      className="px-4 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-[#111827] hover:text-white dark:hover:bg-white dark:hover:text-[#111827] font-bold text-xs text-[#374151] dark:text-white transition-all shrink-0 flex items-center gap-2 border border-[#E7E5F4] dark:border-white/[0.1] active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                      <span>View Thread ({messages.length})</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CREATE TICKET MODAL */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewModal(false)}
              className="fixed inset-0 bg-[#060816]/70 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#14182F] rounded-[22px] p-6 sm:p-8 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3.5">
                <div className="flex items-center gap-2 text-[#8B5CF6]">
                  <PlusCircle className="w-5 h-5" />
                  <h3 className="text-base font-extrabold text-[#111827] dark:text-white font-heading">
                    Open Academic Support Request
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4 pt-1">
                <div>
                  <label className="text-xs font-bold text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs text-[#111827] dark:text-white font-extrabold outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  >
                    <option value="Technical Support & Labs">Technical Support &amp; Labs</option>
                    <option value="Cloud GPU & Compute Credits">Cloud GPU &amp; Compute Credits</option>
                    <option value="Proctored Quizzes & Grading">Proctored Quizzes &amp; Grading</option>
                    <option value="Career Mentorship & Advising">Career Mentorship &amp; Advising</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">Subject Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Requesting PyTorch distributed testing node key"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your technical bug or academic question here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white resize-none outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-black/5 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white disabled:opacity-50 font-extrabold text-xs shadow-md flex items-center gap-2 active:scale-95 transition-all"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{submitting ? "Logging..." : "Submit Ticket"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW THREAD CONVERSATION MODAL */}
      <AnimatePresence>
        {activeThreadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveThreadModal(null)}
              className="fixed inset-0 bg-[#060816]/70 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#14182F] rounded-[22px] p-6 sm:p-8 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3.5">
                <div>
                  <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase block">Ticket #{activeThreadModal.id.slice(-6)} &bull; {activeThreadModal.category}</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#111827] dark:text-white font-heading mt-0.5">
                    {activeThreadModal.subject}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveThreadModal(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto p-2">
                {(activeThreadModal.messages || []).map((msg: any, i: number) => {
                  const isSupport = msg.sender === "support";
                  return (
                    <div
                      key={i}
                      className={cn(
                        "p-4 rounded-2xl text-xs space-y-1 max-w-[85%]",
                        isSupport
                          ? "bg-[#FAFAF7] dark:bg-white/[0.05] border border-[#E7E5F4] dark:border-white/[0.08] text-[#374151] dark:text-gray-200 ml-0 mr-auto"
                          : "bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 text-[#111827] dark:text-white ml-auto mr-0"
                      )}
                    >
                      <div className="flex items-center justify-between font-extrabold text-[11px] gap-4">
                        <span className={isSupport ? "text-[#14B8A6]" : "text-[#8B5CF6]"}>{msg.name}</span>
                        <span className="text-[9px] text-gray-400 font-mono">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="leading-relaxed font-normal pt-1">{msg.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setActiveThreadModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] font-extrabold text-xs transition-all shadow-md active:scale-95"
                >
                  Close Conversation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
