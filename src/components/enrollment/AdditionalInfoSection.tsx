"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

export interface AdditionalFormData {
  specialRequirements: string;
  accessibilityRequirements: string;
  instructorMessage: string;
}

export interface AdditionalInfoSectionProps {
  formData: AdditionalFormData;
  onChange: (field: keyof AdditionalFormData, value: string) => void;
}

export function AdditionalInfoSection({ formData, onChange }: AdditionalInfoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const textareaClasses = () => `
    w-full bg-[#FAFAF7] dark:bg-[#060816]/80 border border-[#E7E5F4] dark:border-white/[0.1] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 rounded-lg px-3 py-2.5 text-xs sm:text-[13px] font-medium text-[#111827] dark:text-white outline-none transition-all duration-200 resize-y min-h-[80px] shadow-2xs
  `;

  return (
    <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
      
      {/* Clickable Toggle Disclosure Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 cursor-pointer select-none group"
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#111827] dark:text-white group-hover:text-[#8B5CF6] transition-colors flex items-center gap-2">
              <span>💬</span> Additional Info & Accommodations
            </h3>
            <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#1F2937] px-2 py-0.5 rounded-md uppercase tracking-wide border border-[#E7E5F4] dark:border-white/[0.08]">
              Optional
            </span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">
            Let our instruction mentors tailor your learning journey — 100% inclusive learning.
          </p>
        </div>

        <div className="text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-all shrink-0">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Expandable Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-5 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08] space-y-4"
          >
            {/* Note for Instructor */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" /> Note for Dr. Anand & Instructors
              </label>
              <textarea
                value={formData.instructorMessage}
                onChange={(e) => onChange("instructorMessage", e.target.value)}
                placeholder="Introduce yourself, share your primary learning goals, or let the team know what AI domain you want to specialize in (Generative AI, Robotics, Healthcare NLP)..."
                className={textareaClasses()}
              />
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">
                Special Requirements (Lab Timings, Datasets, Sponsorships)
              </label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => onChange("specialRequirements", e.target.value)}
                placeholder="Mention if you prefer specific lab batches (Weekend vs Weekday evenings) or require specialized corporate receipt formats..."
                className={textareaClasses()}
              />
            </div>

            {/* Accessibility Accommodations */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 flex items-center justify-between">
                <span>Accessibility Accommodations</span>
                <span className="text-[10px] text-[#14B8A6] font-bold lowercase">100% accessible platforms</span>
              </label>
              <textarea
                value={formData.accessibilityRequirements}
                onChange={(e) => onChange("accessibilityRequirements", e.target.value)}
                placeholder="e.g. Screen reader optimization, offline slide packages, closed captions transcripts..."
                className={textareaClasses()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
