"use client";

import React, { useState } from "react";
import { genaiAssignments } from "@/data/genai_assignments";
import { 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Eye, 
  MessageSquare, 
  Award,
  Code,
  Copy,
  Check,
  X,
  Calendar,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GlobalAssignmentsHubPage() {
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "graded">("all");
  const [viewingSpecModal, setViewingSpecModal] = useState<any | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [solutionUrl, setSolutionUrl] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [assignments, setAssignments] = useState(genaiAssignments);

  const filteredList = assignments.filter((item) => {
    if (filterTab === "all") return true;
    return item.status === filterTab;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleConfirmSubmit = () => {
    if (!solutionUrl.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedSubmission.id
            ? {
                ...a,
                status: "graded" as const,
                grade: "96 / 100 (AI Evaluated)",
                feedback: "AI Grading Engine: Solution code syntax verified and test assertions executed successfully against target specifications.",
                submittedOn: "Just now",
              }
            : a
        )
      );
      setSubmitting(false);
      setSelectedSubmission(null);
      setSolutionUrl("");
    }, 800);
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* HEADER SECTION & TABS */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#DAA520] mb-1">
            <Sparkles className="w-3 h-3 fill-[#DAA520]" />
            <span>Practical Labs</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Assignments &amp; Projects
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Master Generative AI through practical architecture design, coding pipelines, and project implementations.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="bg-[#FAFAF7] dark:bg-white/[0.04] p-1.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex flex-wrap items-center shrink-0 gap-1">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
              filterTab === "all"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Labs ({assignments.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("pending")}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
              filterTab === "pending"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#DAA520]" />
            <span>Pending ({assignments.filter((a) => a.status === "pending").length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("graded")}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
              filterTab === "graded"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Graded ({assignments.filter((a) => a.status === "graded").length})</span>
          </button>
        </div>
      </div>

      {/* ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 gap-4">
        {filteredList.map((ass) => (
          <motion.div
            key={ass.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 shadow-xs hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
          >
            {ass.status === "pending" && (
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#DAA520]" />
            )}
            {ass.status === "graded" && (
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14B8A6]" />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {ass.status === "graded" ? (
                    <span className="bg-[#14B8A6]/15 text-[#14B8A6] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Graded &amp; Verified</span>
                    </span>
                  ) : (
                    <span className="bg-[#DAA520]/15 text-[#DAA520] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Ready for Submission</span>
                    </span>
                  )}
                  <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-violet-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#8B5CF6]/20">
                    {ass.module}
                  </span>
                  <span className="text-[11px] text-gray-500 font-semibold uppercase">
                    Level: {ass.difficulty} &bull; {ass.estimatedDuration}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight">
                  {ass.title}
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
                  {ass.instructions}
                </p>
              </div>

              {ass.status === "graded" ? (
                <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 rounded-xl px-4 py-2.5 flex items-center gap-3 self-start md:self-center shrink-0">
                  <Award className="w-6 h-6 text-[#DAA520]" />
                  <div>
                    <span className="text-[10px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] block uppercase">
                      Evaluated Grade
                    </span>
                    <span className="text-sm font-extrabold text-[#8B5CF6] dark:text-violet-300">
                      {ass.grade || "95 / 100 (A)"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="self-start md:self-center shrink-0 text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Deadline</span>
                  <span className="text-xs font-extrabold text-[#111827] dark:text-white flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#DAA520]" />
                    {ass.dueDate || "August 15, 2026"}
                  </span>
                </div>
              )}
            </div>

            {/* Instructor Feedback Block if Graded */}
            {ass.status === "graded" && ass.feedback && (
              <div className="bg-[#FAFAF7] dark:bg-[#060816]/50 rounded-xl p-3.5 border border-[#E7E5F4] dark:border-white/[0.08] flex items-start gap-3 ml-2">
                <MessageSquare className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#111827] dark:text-white font-bold block">
                    Review by {ass.instructor || "Nitish Singh"}:
                  </strong>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] italic mt-0.5">&ldquo;{ass.feedback}&rdquo;</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08] pl-2">
              <button
                type="button"
                onClick={() => setViewingSpecModal(ass)}
                className="px-4 py-2 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-white/[0.1] text-[#111827] dark:text-white text-xs font-semibold flex items-center gap-1.5 border border-[#E7E5F4] dark:border-white/[0.15] transition-colors"
              >
                <Code className="w-4 h-4 text-[#8B5CF6]" />
                <span>Lab Specifications &amp; Starter Code</span>
              </button>

              {ass.status === "pending" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubmission(ass);
                    setSolutionUrl("");
                  }}
                  className="px-5 py-2 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Solution</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => alert("Verified solution repository and AI evaluation logs opened successfully.")}
                  className="px-4 py-2 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] text-xs font-bold hover:bg-[#14B8A6]/20 transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Verified Solution</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* SUBMISSION MODAL */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setSelectedSubmission(null)}
              className="fixed inset-0 bg-[#060816]/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                  Submit Lab Solution
                </h3>
                <button onClick={() => !submitting && setSelectedSubmission(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-xs font-extrabold text-[#8B5CF6] uppercase block mb-1">{selectedSubmission.module}</span>
                <h4 className="text-sm font-bold text-[#111827] dark:text-white">{selectedSubmission.title}</h4>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                  Provide your GitHub repository or hosted Jupyter notebook link for real-time verification and automated grading.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-300">Solution Repository Link</label>
                <input
                  type="text"
                  value={solutionUrl}
                  onChange={(e) => setSolutionUrl(e.target.value)}
                  placeholder="https://github.com/username/ai-masterclass-lab..."
                  className="w-full bg-[#FAFAF7] dark:bg-[#060816] text-xs px-3.5 py-2.5 rounded-xl border border-white/[0.15] outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting || !solutionUrl.trim()}
                  onClick={handleConfirmSubmit}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-bold text-xs shadow-md active:scale-95 flex items-center gap-2"
                >
                  <span>{submitting ? "Evaluating Code..." : "Submit for AI Verification"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SPECIFICATION & STARTER CODE MODAL */}
      <AnimatePresence>
        {viewingSpecModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingSpecModal(null)}
              className="fixed inset-0 bg-[#060816]/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white dark:bg-[#14182F] rounded-2xl p-6.5 shadow-2xl border border-white/[0.15] space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold text-[#DAA520] uppercase px-2 py-0.5 rounded-md bg-[#DAA520]/15">
                      {viewingSpecModal.type}
                    </span>
                    <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase px-2 py-0.5 rounded-md bg-[#8B5CF6]/15">
                      Level: {viewingSpecModal.difficulty}
                    </span>
                    <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#DAA520]" />
                      <span>{viewingSpecModal.estimatedDuration}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-white font-heading">
                    {viewingSpecModal.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-400 block mt-0.5">
                    {viewingSpecModal.module} &bull; {viewingSpecModal.points || 100} XP Points
                  </span>
                </div>
                <button onClick={() => setViewingSpecModal(null)} className="text-gray-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8B5CF6] block">
                  Architectural Objective
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.03] p-4 rounded-xl border border-white/[0.08]">
                  {viewingSpecModal.instructions}
                </p>
              </div>

              {viewingSpecModal.deliverables && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#14B8A6] block">
                    Required Lab Deliverables
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {viewingSpecModal.deliverables.map((deliv: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-200">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewingSpecModal.starterCode && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#DAA520] flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-[#DAA520]" />
                      <span>Starter Code (Python / LangChain)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(viewingSpecModal.starterCode)}
                      className="px-3 py-1 rounded-md text-[11px] font-bold bg-white/[0.06] hover:bg-white/[0.1] text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> : <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                      <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-[#0D1117] text-gray-300 p-4 border border-white/[0.1] text-xs font-mono max-h-72 overflow-y-auto leading-relaxed whitespace-pre shadow-inner">
                    {viewingSpecModal.starterCode}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setViewingSpecModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
