"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  MessageCircle, 
  Phone, 
  Bot, 
  User, 
  ExternalLink, 
  RefreshCw, 
  Loader2, 
  X,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  action?: { label: string; url: string };
  timestamp?: string;
  engine?: string;
}

const FAQ_CHIPS = [
  "Explore Curriculum",
  "Prerequisites & Roadmap",
  "Verifiable Certificates",
  "Fee & EMI Options",
  "Live Webclasses",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "greet-1",
    sender: "advisor",
    text: "👋 **Hello! I am Aria, your AI Advisor.**\n\nAsk me anything about our generative AI courses, pricing, or verifiable certifications below!",
    timestamp: "Just now",
  },
];

export interface AdvisorBotProps {
  onClose?: () => void;
  className?: string;
}

export function AdvisorBot({ onClose, className }: AdvisorBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (customQuery?: string) => {
    const query = customQuery || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query.trim(),
          history: messages,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        const advisorReply: ChatMessage = {
          id: `adv-${Date.now()}`,
          sender: "advisor",
          text: data.response || "I have received your inquiry! Let me assist you with our academic options.",
          action: data.action,
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, advisorReply]);
      } else {
        throw new Error(data.error || "Failed to get AI guidance");
      }
    } catch (err) {
      console.error("Advisor execution error:", err);
      const fallbackMsg: ChatMessage = {
        id: `adv-err-${Date.now()}`,
        sender: "advisor",
        text: "I apologize, our network connection momentarily paused. Our academic counselors are directly reachable below via WhatsApp!",
        action: { label: "WhatsApp Support", url: "https://wa.me/910000000000" },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Clean custom markdown formatter for bolding and bullets
  const renderFormattedText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-heading font-extrabold text-xs sm:text-sm mb-1 text-foreground flex items-center gap-1.5">
            <span>{line.replace("### ", "")}</span>
          </h4>
        );
      }
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const content = line.substring(2);
        return (
          <li key={idx} className="flex items-start gap-2 mb-1 ml-1 text-[13px] text-muted-foreground leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-[13px] text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') }} />
      );
    });
  };

  return (
    <div className={cn(
      "w-full bg-card rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col h-[520px] max-h-[85vh] transition-all duration-300 relative",
      className
    )}>
      {/* SIMPLE MINIMALIST HEADER */}
      <div className="bg-muted/40 px-4 sm:px-5 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-sm text-foreground tracking-tight">
                AI Academic Advisor
              </h3>
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Online</span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Instant answers &amp; academic counseling
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            title="Clear Chat"
            aria-label="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
              aria-label="Close Advisor Chat"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* CONCISE FAQ CHIPS */}
      <div className="bg-background px-4 py-2 border-b border-border overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider shrink-0 mr-1">
          FAQs:
        </span>
        {FAQ_CHIPS.map((chip, i) => (
          <button
            key={i}
            type="button"
            disabled={loading}
            onClick={() => handleSendMessage(chip)}
            className="px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-primary hover:text-primary-foreground border border-border text-xs font-medium text-foreground transition-all shrink-0 active:scale-95 flex items-center gap-1"
          >
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* FIXED CONVERSATION FEED */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={cn("flex items-start gap-2.5 max-w-[85%] sm:max-w-[78%]", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}
              >
                <div className={cn(
                  "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs",
                  isUser 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-foreground border border-border"
                )}>
                  {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>

                <div className={cn(
                  "rounded-2xl p-3.5 shadow-2xs space-y-1.5 text-xs sm:text-[13px] transition-all",
                  isUser 
                    ? "bg-primary text-primary-foreground rounded-tr-xs" 
                    : "bg-card border border-border text-foreground rounded-tl-xs"
                )}>
                  <div className="pt-0.5">
                    {isUser ? (
                      <p className="font-medium leading-relaxed">{msg.text}</p>
                    ) : (
                      <ul className="space-y-0.5">{renderFormattedText(msg.text)}</ul>
                    )}
                  </div>

                  {msg.action && (
                    <div className="pt-1.5">
                      {msg.action.url.startsWith("http") ? (
                        <a
                          href={msg.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold text-xs shadow-xs transition-all active:scale-95"
                        >
                          <span>{msg.action.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          href={msg.action.url}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background hover:opacity-90 font-bold text-xs shadow-xs transition-all active:scale-95"
                        >
                          <span>{msg.action.label}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mr-auto">
            <div className="w-7 h-7 rounded-xl bg-muted text-foreground border border-border flex items-center justify-center shrink-0">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-xs font-medium text-muted-foreground flex items-center gap-2">
              <span>Thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* MINIMAL INPUT & HUMAN SUPPORT FOOTER */}
      <div className="p-3 bg-muted/20 border-t border-border shrink-0 space-y-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your question..."
            disabled={loading}
            className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-border text-xs sm:text-sm font-medium text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary shadow-2xs transition-all"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            aria-label="Send"
            className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 disabled:opacity-50 text-primary-foreground font-bold text-xs shadow-xs transition-all active:scale-95 shrink-0 flex items-center gap-1.5"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* CLEAN SIMPLE SUPPORT BAR */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5 px-1 font-medium">
          <span>Need real human assistance?</span>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+910000000000"
              className="text-foreground hover:underline font-bold inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
