"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Sparkles, 
  Send, 
  Trash2, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  Loader2, 
  MessageSquare,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AILearningAssistantDrawerProps {
  courseTitle: string;
  courseId: string;
  activeModule?: string;
  activeLesson?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  isSourced?: boolean;
  timestamp: string;
}

const quickActions = [
  { id: "explain", label: "Explain Current Concept", prompt: "Explain the core mechanics of Transformers and Self-Attention in simple terms." },
  { id: "summarize", label: "Summarize Lesson", prompt: "Give me a concise bullet-point summary of the key takeouts from this lesson." },
  { id: "quiz", label: "Generate Practice Quiz", prompt: "Create a 3-question multiple-choice quick practice quiz on this topic to test my retention." },
  { id: "notes", label: "Create Revision Notes", prompt: "Draft quick flashcard-style revision notes for exam preparation." },
  { id: "question", label: "Ask a Question", prompt: "" },
];

export function AILearningAssistantDrawer({
  courseTitle,
  courseId,
  activeModule = "Module 2: LLM & Transformer Architectures",
  activeLesson = "Lesson 4: Self-Attention Mechanics",
}: AILearningAssistantDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from PostgreSQL database (falling back to localStorage or welcome message)
  useEffect(() => {
    async function loadChatHistory() {
      try {
        const res = await fetch(`/api/ai/chat?courseId=${courseId}`);
        const data = await res.json();
        if (data.success && data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          return;
        }
      } catch (error) {
        console.error("Error loading chat memory from API:", error);
      }

      const stored = localStorage.getItem(`ai_assistant_chat_${courseId}`);
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored chat history", e);
        }
      } else {
        setMessages([
          {
            id: "welcome-1",
            sender: "ai",
            text: `Hello! I am your AI Learning Assistant, contextually tuned to **${courseTitle}**. I'm currently monitoring your progress in **${activeModule}** (${activeLesson}). How can I support your study today?`,
            isSourced: true,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    }
    loadChatHistory();
  }, [courseId, courseTitle, activeModule, activeLesson]);

  // Persist messages to localStorage as local cache
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`ai_assistant_chat_${courseId}`, JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, courseId]);

  // Clear Chat History in Database and Local Cache
  const handleClearHistory = async () => {
    localStorage.removeItem(`ai_assistant_chat_${courseId}`);
    try {
      await fetch(`/api/ai/chat?courseId=${courseId}`, { method: "DELETE" });
    } catch (e) {
      console.error("Error clearing DB history:", e);
    }
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: `Chat history reset in database! Ready to assist with **${activeLesson}** or anything else in the curriculum.`,
        isSourced: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Send interaction to /api/ai/chat backend handler
  const handleSendMessage = async (textToSend?: string) => {
    const content = textToSend || input;
    if (!content.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content.trim(),
          courseId,
          courseTitle,
          activeModule,
          activeLesson,
          history: nextMessages,
        }),
      });

      const data = await response.json();
      if (data.success && data.response) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.response,
          isSourced: true,
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || "Failed to generate AI tutoring response");
      }
    } catch (error) {
      console.error("AI Chat API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: `⚠️ I encountered an intermittent network issue connecting to the inference engine. Please retry your question regarding **${activeLesson}**.`,
          isSourced: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* FLOATING "ASK AI" BUTTON (Fixed Bottom-Right)             */}
      {/* ========================================================= */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-30 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 hover:shadow-violet-500/35 transition-all group border border-white/20"
        aria-label="Open AI Learning Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6 sm:w-5 sm:h-5 text-[#DAA520] animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#14B8A6] ring-2 ring-white dark:ring-[#14182F]" />
        </div>
        <span className="hidden sm:inline font-bold text-sm tracking-tight">Ask AI Assistant</span>
      </motion.button>

      {/* ========================================================= */}
      {/* RIGHT-SIDE SLIDING DRAWER                                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#060816]/50 backdrop-blur-xs cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md sm:max-w-lg bg-white dark:bg-[#14182F] shadow-2xl flex flex-col h-full border-l border-[#E7E5F4] dark:border-white/[0.15]"
            >
              {/* HEADER: Title & Live Lesson Context Subtitle */}
              <div className="p-4 sm:p-5 border-b border-[#E7E5F4] dark:border-white/[0.08] bg-[#FAFAF7] dark:bg-white/[0.02] flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#A855F7] flex items-center justify-center shrink-0 border border-[#8B5CF6]/30">
                    <Bot className="w-6 h-6 text-[#8B5CF6] dark:text-[#DAA520]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#DAA520]">
                      <Sparkles className="w-3 h-3 fill-[#DAA520]" />
                      <span>Context-Aware AI Assistant</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#111827] dark:text-white truncate font-heading">
                      {courseTitle} Assistant
                    </h3>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 truncate flex items-center gap-1 font-medium bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-violet-300 px-2 py-0.5 rounded-md w-fit max-w-full">
                      <BookOpen className="w-3 h-3 shrink-0" />
                      <span className="truncate">Aware of {activeLesson}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    title="Clear Chat History"
                    className="p-1.5 text-[#6B7280] hover:text-[#EF4444] dark:text-[#9CA3AF] dark:hover:text-rose-400 rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Assistant Drawer"
                    className="p-1.5 text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* QUICK ACTIONS ROW */}
              <div className="p-3 bg-white dark:bg-[#14182F] border-b border-[#E7E5F4] dark:border-white/[0.06] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex items-center gap-2 shrink-0">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      if (action.id === "question") {
                        inputRef.current?.focus();
                      } else {
                        handleSendMessage(action.prompt);
                      }
                    }}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#FAFAF7] dark:bg-white/[0.05] border border-[#E7E5F4] dark:border-white/[0.1] text-[#6B7280] hover:text-[#8B5CF6] dark:text-[#E5E7EB] dark:hover:text-[#DAA520] hover:border-[#8B5CF6] transition-all shrink-0 whitespace-nowrap active:scale-95 flex items-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-[#8B5CF6] dark:text-[#DAA520]" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>

              {/* CHAT CONVERSATION AREA */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FAFAF7]/50 dark:bg-[#060816]/30">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col gap-1 max-w-[85%]",
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed relative shadow-xs",
                        msg.sender === "user"
                          ? "bg-[#8B5CF6] text-white rounded-br-none font-medium"
                          : "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1] rounded-bl-none font-normal"
                      )}
                    >
                      {/* Sourced badge for AI messages */}
                      {msg.sender === "ai" && msg.isSourced && (
                        <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded-md mb-2">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sourced from this lesson</span>
                        </div>
                      )}
                      
                      <div className="whitespace-pre-line space-y-2">
                        {msg.text}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] px-1 font-medium">
                      {msg.sender === "user" ? "You" : "AI Tutor"} &bull; {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Loading / Streaming Simulation Indicator */}
                {isLoading && (
                  <div className="mr-auto items-start max-w-[80%]">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#1F2937] border border-[#E7E5F4] dark:border-white/[0.1] rounded-bl-none flex items-center gap-2 text-xs font-semibold text-[#8B5CF6] dark:text-[#DAA520]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing answer from course material...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* FOOTER: Chat Input & Human Support Escape Hatch */}
              <div className="p-3 sm:p-4 border-t border-[#E7E5F4] dark:border-white/[0.1] bg-white dark:bg-[#14182F] space-y-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about transformers, code syntax, or quizzes..."
                    disabled={isLoading}
                    className="flex-1 bg-[#FAFAF7] dark:bg-[#060816] text-[#111827] dark:text-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.15] outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all placeholder:text-[#6B7280] dark:placeholder:text-[#6B7280]"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-md transition-all active:scale-95 shrink-0 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Escape Hatch to Human Support (Section 7 rule: don't trap the learner in an unhelpful loop) */}
                <div className="text-center pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                  <span>Need human assistance or instructor feedback?</span>
                  <Link
                    href="/dashboard/support"
                    onClick={() => setIsOpen(false)}
                    className="text-[#8B5CF6] dark:text-violet-400 hover:underline font-semibold inline-flex items-center gap-0.5"
                  >
                    <span>Contact Support</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
