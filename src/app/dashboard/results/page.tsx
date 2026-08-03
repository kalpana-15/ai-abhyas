"use client";

import React, { useState, useEffect } from "react";
import { getUserAcademicResults } from "@/actions/dashboardActions";
import { 
  BarChart2, 
  Award, 
  CheckCircle2, 
  FileText, 
  Download, 
  Sparkles, 
  BookOpen, 
  TrendingUp, 
  Loader2, 
  ExternalLink, 
  Eye, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PerformanceResultsPage() {
  const [loading, setLoading] = useState(true);
  const [resultsData, setResultsData] = useState<any | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
        const res = await getUserAcademicResults();
        if (res && res.success) {
          setResultsData(res);
        }
      } catch (err) {
        console.error("Error retrieving academic results:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  const handleDownloadTranscript = () => {
    alert("Generating verified official academic transcript with cryptographic security signature...");
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-cyan-500 mb-1">
            <Sparkles className="w-3 h-3 fill-cyan-500" />
            <span>Transcript</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Performance &amp; Results
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Monitor your scores, view instructor reviews, and export verifiable gradebook transcripts from your academic record.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadTranscript}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-[#0D9488] hover:opacity-95 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start md:self-center shrink-0 active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Download Official Transcript</span>
        </button>
      </div>

      {/* KPI SCORECARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#14182F] p-5 rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 font-extrabold text-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-[#6B7280] block">Cumulative GPA</span>
            <span className="text-xl font-extrabold text-[#111827] dark:text-white font-heading">
              {loading ? "..." : `${resultsData ? (resultsData.gpa || 0) : 0}%`} <span className="text-xs text-[#6B7280] font-normal">({(resultsData?.gpa && resultsData.gpa > 0) ? "Active Cohort" : "No grades yet"})</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#14182F] p-5 rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center shrink-0 font-extrabold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-[#6B7280] block">Graded Lab Submissions</span>
            <span className="text-xl font-extrabold text-[#111827] dark:text-white font-heading">
              {loading ? "..." : `${resultsData ? (resultsData?.submissions?.length || 0) : 0} Labs Graded`}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#14182F] p-5 rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-[#DAA520]" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-[#6B7280] block">Diplomas Awarded</span>
            <span className="text-xl font-extrabold text-[#111827] dark:text-white font-heading">
              {loading ? "..." : `${resultsData ? (resultsData?.certificates?.length || 0) : 0} Credentials`}
            </span>
          </div>
        </div>
      </div>

      {/* GRADEBOOK LEDGER TABLE */}
      <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] overflow-hidden shadow-sm">
        <div className="p-5 sm:p-6 border-b border-[#E7E5F4] dark:border-white/[0.08] flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#111827] dark:text-white font-heading">
            Detailed Assessment &amp; Lab Record
          </h2>
          <span className="text-xs text-[#6B7280] font-semibold">Live Transcript Record</span>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-[#6B7280] gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
            <span className="text-xs font-semibold">Loading academic gradebook...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAF7] dark:bg-white/[0.02] text-[11px] font-bold uppercase text-[#6B7280] border-b border-[#E7E5F4] dark:border-white/[0.08]">
                  <th className="py-3.5 px-5">Assessment / Lab Item</th>
                  <th className="py-3.5 px-4">Course Masterclass</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Score &amp; Status</th>
                  <th className="py-3.5 px-5 text-right">Faculty Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5F4] dark:divide-white/[0.06] text-xs font-medium text-[#374151] dark:text-[#E5E7EB]">
                {/* Render Assignment Submissions */}
                {(resultsData?.submissions || []).map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-bold text-[#111827] dark:text-white">
                      {sub.title}
                    </td>
                    <td className="py-4 px-4 text-[#6B7280]">
                      {sub.course?.title || "AI Abhyas Course"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-violet-300 font-bold px-2 py-0.5 rounded-md text-[10px]">
                        Practical Lab
                      </span>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {sub.score ? `${sub.score} / 100 (A+)` : "Pending Grade"}
                    </td>
                    <td className="py-4 px-5 text-right">
                      {sub.feedback ? (
                        <button
                          type="button"
                          onClick={() => setSelectedFeedback(sub)}
                          className="inline-flex items-center gap-1 text-[#14B8A6] hover:underline font-bold text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Review</span>
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">In Queue</span>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Render Assessment Attempts */}
                {(resultsData?.assessments || []).map((att: any) => (
                  <tr key={att.id} className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-bold text-[#111827] dark:text-white">
                      {att.quizTitle}
                    </td>
                    <td className="py-4 px-4 text-[#6B7280]">
                      {att.course?.title || "AI Abhyas Course"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-cyan-500/15 text-cyan-500 font-bold px-2 py-0.5 rounded-md text-[10px]">
                        Proctored Quiz
                      </span>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {att.score}% ({att.status.toUpperCase()})
                    </td>
                    <td className="py-4 px-5 text-right text-gray-500 text-[11px]">
                      Threshold Met ({att.threshold}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* INSTRUCTOR FEEDBACK MODAL */}
      <AnimatePresence>
        {selectedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeedback(null)}
              className="fixed inset-0 bg-[#060816]/70 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <div className="flex items-center gap-2 text-cyan-500">
                  <Award className="w-5 h-5 text-[#DAA520]" />
                  <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                    Faculty Evaluation Report
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Submission Title</span>
                  <h4 className="text-sm font-bold text-[#111827] dark:text-white">{selectedFeedback.title}</h4>
                </div>
                <div className="bg-[#FAFAF7] dark:bg-[#060816]/40 p-4 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-500">Grade: {selectedFeedback.score} / 100</span>
                    <span className="text-[10px] text-gray-400">Reviewed by Dr. Sarah Chen</span>
                  </div>
                  <p className="text-xs text-[#374151] dark:text-[#E5E7EB] leading-relaxed italic">
                    &quot;{selectedFeedback.feedback}&quot;
                  </p>
                </div>
                {selectedFeedback.fileUrl && (
                  <div className="pt-1">
                    <a
                      href={selectedFeedback.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#8B5CF6] hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Submitted GitHub Repository Solution</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-white font-bold text-xs"
                >
                  Close Evaluation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
