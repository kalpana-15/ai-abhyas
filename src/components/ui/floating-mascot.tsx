"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { X, Phone, MessageCircle, Mail, Bot, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { AdvisorBot } from "@/components/ui/AdvisorBot"

export function FloatingMascot() {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showAdvisorModal, setShowAdvisorModal] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || pathname?.startsWith("/dashboard")) return null

  const mascotSrc = resolvedTheme === "dark" 
    ? "/Assets/images/robo_black_theme-removebg-preview.png" 
    : "/Assets/images/robo_white_.png"

  return (
    <>
      {/* VIRTUAL ADVISOR BOT MODAL */}
      <AnimatePresence>
        {showAdvisorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdvisorModal(false)}
              className="fixed inset-0 bg-[#060816]/70 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl z-10"
            >
              <AdvisorBot onClose={() => setShowAdvisorModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-4 bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 w-[280px] flex flex-col gap-3 origin-bottom-right"
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="font-heading font-bold text-sm text-foreground">Academic Support</h4>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-muted-foreground hover:bg-muted p-1 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setShowAdvisorModal(true)
                }}
                className="flex items-center gap-3 w-full bg-gradient-to-r from-[#8B5CF6] to-[#14B8A6] text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-95 text-left"
              >
                <Bot className="w-5 h-5 shrink-0" />
                <div className="flex flex-col">
                  <span>Talk to an Advisor</span>
                  <span className="text-[10px] font-medium text-white/80">Instant answers 24/7</span>
                </div>
              </button>
              
              <a 
                href="https://wa.me/910000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] dark:text-[#4ade80] font-medium py-3 px-4 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              
              <a 
                href="tel:+910000000000" 
                className="flex items-center gap-3 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 px-4 rounded-xl text-sm transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Directly
              </a>
              
              <a 
                href="mailto:hello@aiabhyas.com" 
                className="flex items-center gap-3 w-full bg-muted hover:bg-muted/80 text-foreground font-medium py-3 px-4 rounded-xl text-sm transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send an Email
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Glow effect behind mascot */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 group-hover:bg-primary/30 transition-colors" />
        
        {/* Mascot Image */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl transition-transform group-hover:scale-105">
          <Image
            src={mascotSrc}
            alt="AI Assistant Mascot"
            fill
            className="object-contain"
            priority
            unoptimized={true}
          />
        </div>
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-2 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
          </span>
        )}
      </motion.div>
    </div>
    </>
  )
}
