"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Video, 
  Award, 
  FlaskConical, 
  Sparkles, 
  Star, 
  BookOpen, 
  Wrench,
  Users
} from "lucide-react";

export interface CoursePreviewProps {
  courseTitle: string;
  price?: string;
}

interface ModuleData {
  id: string;
  title: string;
  meta: string;
  topics: string[];
}

const defaultModules: ModuleData[] = [
  {
    id: "m1",
    title: "Module 1 · Deep Learning & Neural Network Fundamentals",
    meta: "3 Weeks • 12 Video Lectures • 4 Hands-on Labs",
    topics: [
      "Tensor geometry & autograd in PyTorch / TensorFlow",
      "Backpropagation architectures & regularization techniques",
      "Convolutional Networks & state-of-the-art visual feature extraction",
      "Building custom training loops & GPU acceleration optimization",
    ],
  },
  {
    id: "m2",
    title: "Module 2 · Transformers & Modern Generative Models",
    meta: "4 Weeks • 18 Video Lectures • 6 Industry Assignments",
    topics: [
      "Self-attention mechanisms & multi-head architecture deep-dive",
      "Pre-training vs Instruction Supervised Fine-Tuning (SFT)",
      "Parameter Efficient Fine-Tuning (LoRA & QLoRA) on enterprise datasets",
      "Prompt optimization & real-time inference serving (vLLM / Ollama)",
    ],
  },
  {
    id: "m3",
    title: "Module 3 · Enterprise RAG & Autonomous AI Agents",
    meta: "5 Weeks • 22 Video Lectures • 3 Capstone Projects",
    topics: [
      "Vector embeddings, advanced similarity search & hybrid scoring",
      "Agentic orchestration using LangGraph and custom tool execution",
      "Evaluating LLM outputs, hallucination detection & runtime safety",
      "Deploying end-to-end cloud AI endpoints with containerized MLOps",
    ],
  },
];

export function CoursePreviewSection({ courseTitle = "Computer Vision & AI Mastery", price }: CoursePreviewProps) {
  const [showExtraSkills, setShowExtraSkills] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(true);
  const [prereqOpen, setPrereqOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    m1: true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-5">
      
      {/* 1. Course Identity Hero Card */}
      <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 text-[#8B5CF6] dark:text-[#A855F7] text-[11px] font-bold tracking-wide uppercase border border-[#8B5CF6]/20">
            <Sparkles className="w-3.5 h-3.5 fill-[#8B5CF6]/30" /> ✦ AI Engineering Specialization
          </span>

          <div className="flex items-center gap-1 text-[13px] font-bold text-[#DAA520]">
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 fill-[#DAA520]" />
              <Star className="w-3.5 h-3.5 fill-[#DAA520]" />
              <Star className="w-3.5 h-3.5 fill-[#DAA520]" />
              <Star className="w-3.5 h-3.5 fill-[#DAA520]" />
              <Star className="w-3.5 h-3.5 fill-[#DAA520]" />
            </div>
            <span className="ml-0.5">4.9</span>
            <span className="text-[#6B7280] dark:text-[#9CA3AF] font-medium ml-1 text-[11.5px]">
              (2,480+ reviews)
            </span>
          </div>
        </div>

        <h1 className="text-lg sm:text-xl font-bold font-heading text-[#111827] dark:text-white tracking-tight mb-2 leading-snug">
          {courseTitle}
        </h1>

        <p className="text-xs sm:text-[13px] text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed max-w-3xl">
          Master state-of-the-art neural networks, generative LLMs, and agentic AI architectures — custom designed for engineers ready to build and scale production-grade AI systems.
        </p>
      </div>

      {/* 2. Instructor Profile & Key Course Stats */}
      <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
        
        {/* ROW 1: Instructor & Community Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5F4] dark:border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#A855F7] to-[#14B8A6] flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0 ring-2 ring-[#8B5CF6]/20">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[13.5px] sm:text-sm text-[#111827] dark:text-white tracking-tight">
                  Dr. Anand & AI Research Faculty
                </span>
                <span className="text-[9.5px] font-bold bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#A855F7] px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#8B5CF6]/25">
                  LEAD INSTRUCTOR
                </span>
              </div>
              <p className="text-[11.5px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 font-medium">
                MIT & Industry artificial intelligence research veterans
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#374151] dark:text-[#E5E7EB] bg-[#FAFAF7] dark:bg-[#060816]/70 px-3 py-1.5 rounded-lg border border-[#E7E5F4] dark:border-white/[0.08] shrink-0 self-start sm:self-auto">
            <Users className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>12,450+ Active Learners</span>
          </div>
        </div>

        {/* ROW 2: Full-Width Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 border border-[#8B5CF6]/20">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">Duration</div>
              <div className="text-xs sm:text-[13px] font-bold text-[#111827] dark:text-white truncate">16 Wks / 80+ Hrs</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/10 dark:bg-[#14B8A6]/20 flex items-center justify-center text-[#14B8A6] shrink-0 border border-[#14B8A6]/20">
              <Video className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">Training Mode</div>
              <div className="text-xs sm:text-[13px] font-bold text-[#111827] dark:text-white truncate">Live + Recorded</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DAA520]/10 dark:bg-[#DAA520]/20 flex items-center justify-center text-[#DAA520] shrink-0 border border-[#DAA520]/20">
              <Award className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">Certificate</div>
              <div className="text-xs sm:text-[13px] font-bold text-[#111827] dark:text-white truncate">Verifiable Digital</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 border border-[#8B5CF6]/20">
              <FlaskConical className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">Industry Labs</div>
              <div className="text-xs sm:text-[13px] font-bold text-[#111827] dark:text-white truncate">8+ Build Projects</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Skills & Learning Outcomes */}
      <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
        <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#111827] dark:text-white mb-3 flex items-center gap-2">
          <span>🎯</span> Skills & Technologies You&apos;ll Master
        </h3>

        {/* Skills Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
            PyTorch & TensorFlow
          </span>
          <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
            Transformer Architectures
          </span>
          <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
            LLM Fine-Tuning (LoRA)
          </span>
          <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
            RAG & LangChain
          </span>
          <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
            Agentic Workflows
          </span>

          <AnimatePresence>
            {showExtraSkills && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-flex flex-wrap items-center gap-2"
              >
                <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
                  Computer Vision (YOLO/CNNs)
                </span>
                <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
                  Model Quantization & vLLM
                </span>
                <span className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]">
                  MLOps & Container Deployment
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setShowExtraSkills(!showExtraSkills)}
            className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-bold bg-transparent text-[#8B5CF6] dark:text-[#A855F7] border border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10 transition-colors cursor-pointer ml-1"
          >
            {showExtraSkills ? "Show less ↑" : "+3 more ↓"}
          </button>
        </div>

        <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#111827] dark:text-white mb-3 flex items-center gap-2 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]">
          <span>✅</span> Key Learning Outcomes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-[13px] font-medium text-[#374151] dark:text-[#E5E7EB] pt-0.5 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <span className="text-[#14B8A6] font-bold shrink-0 text-sm mt-0.5">✓</span>
            <span>Build, fine-tune, and deploy production-grade LLMs and generative AI pipelines from scratch.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-[#14B8A6] font-bold shrink-0 text-sm mt-0.5">✓</span>
            <span>Master multi-agent autonomous systems and enterprise retrieval-augmented generation (RAG).</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-[#14B8A6] font-bold shrink-0 text-sm mt-0.5">✓</span>
            <span>Develop practical computer vision applications for real-time video analytics and segmentation.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-[#14B8A6] font-bold shrink-0 text-sm mt-0.5">✓</span>
            <span>Gain deep architectural intuition behind self-attention and generative diffusion models.</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Curriculum Accordion */}
      <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
        <div
          onClick={() => setCurriculumOpen(!curriculumOpen)}
          className="flex items-center justify-between cursor-pointer select-none group"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#111827] dark:text-white group-hover:text-[#8B5CF6] transition-colors">
              Course Curriculum & Module Breakdown
            </h3>
            <span className="text-[11px] font-bold text-[#6B7280] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#1F2937] px-2 py-0.5 rounded-md border border-[#E7E5F4] dark:border-white/[0.08]">
              {defaultModules.length} modules
            </span>
          </div>
          <div className="text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors">
            {curriculumOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        <AnimatePresence>
          {curriculumOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3.5 pt-3.5 divide-y divide-[#E7E5F4] dark:divide-white/[0.08]"
            >
              {defaultModules.map((mod) => {
                const isExpanded = !expandedModules[mod.id];
                return (
                  <div key={mod.id} className="py-3.5 first:pt-1 last:pb-0">
                    <div
                      onClick={() => toggleModule(mod.id)}
                      className="flex items-start sm:items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div>
                        <h4 className="font-bold text-[13px] sm:text-sm text-[#111827] dark:text-white group-hover:text-[#8B5CF6] transition-colors">
                          {mod.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 font-medium">
                          {mod.meta}
                        </p>
                      </div>
                      <div className="text-[#6B7280] transition-transform duration-200 mt-0.5 sm:mt-0">
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2.5 space-y-2 pl-1.5 overflow-hidden"
                        >
                          {mod.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-[12.5px] text-[#374151] dark:text-[#E5E7EB] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full border border-[#14B8A6] bg-[#14B8A6]/40 shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Prerequisites Accordion */}
      <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
        <div
          onClick={() => setPrereqOpen(!prereqOpen)}
          className="flex items-center justify-between cursor-pointer select-none group"
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#111827] dark:text-white group-hover:text-[#8B5CF6] transition-colors">
              Prerequisites & System Requirements
            </h3>
          </div>
          <div className="text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors">
            {prereqOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        <AnimatePresence>
          {prereqOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-3.5 pt-3.5 border-t border-[#E7E5F4] dark:border-white/[0.08] text-xs sm:text-[13px] text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed"
            >
              Basic Python fluency recommended. A dedicated GPU is not required — all deep learning and generative LLM labs run directly on our included enterprise cloud Jupyter notebooks. 8GB RAM minimum and stable internet recommended for interactive live engineering sessions.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
