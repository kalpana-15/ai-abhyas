"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import coursesData from "@/data/courses.json";
import { genaiAssignments } from "@/data/genai_assignments";
import { getCourseWorkspaceData, submitCourseAssignment } from "@/actions/lmsActions";
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Eye, 
  MessageSquare, 
  Award,
  Sparkles,
  Loader2,
  Code,
  Copy,
  Check,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WorkspaceAssignmentsPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "c1";
  const course = coursesData.find((c) => c.id === courseId) || coursesData[0];
  const [activeTab, setActiveTab] = useState<"pending" | "submitted">("pending");
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [viewingSpecModal, setViewingSpecModal] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [solutionUrl, setSolutionUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingDb, setLoadingDb] = useState(true);

  const defaultPending: any[] = (courseId === "c1" || courseId === "c2")
    ? genaiAssignments.filter(a => a.status === "pending").map(a => ({ ...a, isOverdue: false }))
    : [
        {
          id: "ass-mod-15",
          title: "Module 15 Capstone: Autonomous Tool-Calling & YouTube Chatbot",
          module: "Module 15: AI Agents & Tool Calling",
          dueDate: "August 10, 2026",
          status: "pending",
          isOverdue: false,
          instructions: "Implement an autonomous LangChain Agent using Pydantic schemas and tools to scrape YouTube transcripts dynamically.",
        }
      ];

  const defaultSubmitted: any[] = [];

  const [pendingAssignments, setPendingAssignments] = useState<any[]>(defaultPending);
  const [submittedAssignments, setSubmittedAssignments] = useState<any[]>(defaultSubmitted);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  useEffect(() => {
    async function fetchDbSubmissions() {
      try {
        setLoadingDb(true);
        const res = await getCourseWorkspaceData(courseId);
        if (res && res.success && res.userProgress?.assignments) {
          const dbSubmissions = res.userProgress.assignments.map((sub: any) => ({
            id: sub.id,
            title: sub.title,
            module: "Enterprise Applied Practice Lab",
            submittedOn: new Date(sub.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            status: sub.status.toLowerCase(),
            grade: sub.score ? `${sub.score} / 100 (AI Evaluated)` : "Under Review",
            feedback: sub.feedback || "Submission verified by AI Proctored evaluation engine.",
            instructor: course.instructor?.name || "AI Grading Assistant",
            fileUrl: sub.fileUrl,
          }));

          // Filter pending list to remove assignments already submitted in DB
          const submittedTitles = new Set(dbSubmissions.map((s: any) => s.title.trim().toLowerCase()));
          setPendingAssignments((prev) => prev.filter((a) => !submittedTitles.has(a.title.trim().toLowerCase())));

          setSubmittedAssignments(dbSubmissions);
        }
      } catch (err) {
        console.error("Error retrieving assignment records:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    fetchDbSubmissions();
  }, [courseId]);

  const handleConfirmSubmit = async () => {
    if (!solutionUrl.trim() || !selectedAssignment) {
      alert("Please provide a solution repository or notebook URL.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitCourseAssignment(courseId, selectedAssignment.title, solutionUrl.trim());
      
      if (res && res.success && res.submission) {
        // Move assignment from pending to submitted with the generated AI score and feedback
        const newSubmission = {
          id: res.submission.id,
          title: res.submission.title,
          module: selectedAssignment.module || "Applied Lab",
          submittedOn: "Just now",
          status: "graded",
          grade: `${res.submission.score} / 100 (AI Evaluated)`,
          feedback: res.submission.feedback || "Submission successfully recorded in academic ledger.",
          instructor: course.instructor?.name || "AI Grading Assistant",
        };

        setSubmittedAssignments((prev) => [newSubmission, ...prev]);
        setPendingAssignments((prev) => prev.filter((item) => item.id !== selectedAssignment.id));
        setSelectedAssignment(null);
        setSolutionUrl("");
        setActiveTab("submitted");
      } else {
        alert(res?.error || "Error recording submission. Please try again.");
      }
    } catch (error) {
      console.error("Submission action error:", error);
      alert("Unexpected error occurred while communicating with the server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDb) {
    return (
      <div className="w-full min-h-[440px] bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] p-10 flex flex-col items-center justify-center text-center shadow-xl my-4 transition-colors">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <Sparkles className="w-5 h-5 text-[#DAA520] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h3 className="text-base font-extrabold font-heading text-[#111827] dark:text-white tracking-tight">
          Loading Course Assignments & Labs...
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-sm font-medium">
          Retrieving real pending challenges and verified AI evaluated submissions from database...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12 relative">
      
      {/* HEADER SECTION & TABS */}
      <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight flex items-center gap-2">
            <span>Course Assignments & Labs</span>
            {loadingDb && <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />}
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Complete real-world programming challenges and review personalized AI evaluations from industry faculty.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#FAFAF7] dark:bg-white/[0.04] p-1.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-2",
              activeTab === "pending"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <span>Pending & Overdue</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md", activeTab === "pending" ? "bg-[#DAA520]/20 text-[#DAA520] font-extrabold" : "bg-[#E7E5F4]/50 dark:bg-white/[0.06]")}>
              {pendingAssignments.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("submitted")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-2",
              activeTab === "submitted"
                ? "bg-white dark:bg-[#1F2937] text-[#111827] dark:text-white shadow-xs border border-[#E7E5F4] dark:border-white/[0.1]"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            )}
          >
            <span>Submitted & Graded</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md", activeTab === "submitted" ? "bg-[#14B8A6]/20 text-[#14B8A6]" : "bg-[#E7E5F4]/50 dark:bg-white/[0.06]")}>
              {submittedAssignments.length}
            </span>
          </button>
        </div>
      </div>

      {/* CONTENT LISTING */}
      {activeTab === "pending" ? (
        <div className="space-y-4">
          {pendingAssignments.length === 0 ? (
            <div className="bg-white dark:bg-[#14182F] rounded-2xl border border-dashed border-[#E7E5F4] dark:border-white/[0.1] p-12 text-center my-8">
              <CheckCircle2 className="w-10 h-10 text-[#14B8A6] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#111827] dark:text-white">All assignments submitted!</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-sm mx-auto">
                You have submitted all practical labs for this cohort. Switch over to the Submitted tab to review your AI evaluated feedback.
              </p>
            </div>
          ) : (
            pendingAssignments.map((ass) => (
              <motion.div
                key={ass.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "bg-white dark:bg-[#14182F] rounded-[18px] border p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group",
                  ass.isOverdue 
                    ? "border-amber-500/40 dark:border-amber-500/50 hover:border-amber-500/70" 
                    : "border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6]/50"
                )}
              >
                {ass.isOverdue && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                )}

                <div className="space-y-2 flex-1 min-w-0 pl-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {ass.isOverdue && (
                      <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1 border border-amber-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span>{ass.overdueText} &bull; Overdue</span>
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#8B5CF6] dark:text-violet-400 uppercase tracking-wide">
                      {ass.module}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight">
                    {ass.title}
                  </h3>
                  
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    {ass.instructions}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#374151] dark:text-[#E5E7EB]">
                    <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Due Deadline: <strong className="text-[#111827] dark:text-white">{ass.dueDate}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col items-stretch justify-center gap-2.5 w-full sm:w-48 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewingSpecModal(ass)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-[#E7E5F4]/60 dark:hover:bg-white/[0.1] text-[#111827] dark:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-[#E7E5F4] dark:border-white/[0.15]"
                  >
                    <Code className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Lab Specs & Code</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAssignment(ass);
                      setSolutionUrl("");
                    }}
                    className="w-full px-5 py-2.5 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {submittedAssignments.length === 0 ? (
            <div className="bg-white dark:bg-[#14182F] rounded-2xl border border-dashed border-[#E7E5F4] dark:border-white/[0.1] p-12 text-center my-8">
              <Award className="w-10 h-10 text-[#DAA520] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#111827] dark:text-white">No graded submissions yet</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-sm mx-auto font-medium">
                You haven't submitted any practical labs yet. Switch to the Pending tab and submit your project solution to receive automated AI grading and instructor feedback!
              </p>
            </div>
          ) : (
            submittedAssignments.map((ass) => (
            <motion.div
              key={ass.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#14182F] rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 shadow-xs hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E5F4] dark:border-white/[0.08]">
                <div>
                  <span className="text-xs font-semibold text-[#14B8A6] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                    <span>Graded &bull; Submitted {ass.submittedOn}</span>
                  </span>
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight">
                    {ass.title}
                  </h3>
                </div>

                {/* Grade Badge */}
                <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 rounded-xl px-4 py-2 flex items-center gap-3 self-start sm:self-center">
                  <Award className="w-6 h-6 text-[#DAA520]" />
                  <div>
                    <span className="text-[10px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] block uppercase">
                      Evaluated Score
                    </span>
                    <span className="text-sm font-extrabold text-[#8B5CF6] dark:text-violet-300">
                      {ass.grade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructor Feedback Block */}
              <div className="bg-[#FAFAF7] dark:bg-[#060816]/50 rounded-xl p-4 border border-[#E7E5F4] dark:border-white/[0.08] flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111827] dark:text-white block">
                    Instructor Feedback from {ass.instructor}:
                  </span>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 italic leading-relaxed">
                    &ldquo;{ass.feedback}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-end items-center gap-3 pt-2">
                {ass.starterCode && (
                  <button
                    type="button"
                    onClick={() => setViewingSpecModal(ass)}
                    className="px-4 py-2 rounded-lg bg-[#FAFAF7] dark:bg-white/[0.05] text-xs font-semibold text-[#8B5CF6] hover:bg-[#8B5CF6]/15 transition-colors flex items-center gap-1.5 border border-[#E7E5F4] dark:border-white/[0.1]"
                  >
                    <Code className="w-4 h-4 text-[#8B5CF6]" />
                    <span>View Lab Specs & Starter Code</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => alert("Verified solution link recorded in academic repository.")}
                  className="px-4 py-2 rounded-lg bg-[#FAFAF7] dark:bg-white/[0.04] text-xs font-semibold text-[#14B8A6] hover:bg-[#14B8A6]/10 transition-colors flex items-center gap-1.5 border border-[#E7E5F4] dark:border-white/[0.1]"
                >
                  <Eye className="w-4 h-4 text-[#14B8A6]" />
                  <span>View Submitted Code & Logs</span>
                </button>
              </div>
            </motion.div>
            ))
          )}
        </div>
      )}

      {/* SUBMISSION MODAL */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setSelectedAssignment(null)}
              className="fixed inset-0 bg-[#060816]/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                  Submit Assignment Solution
                </h3>
                <span className="text-xs font-semibold text-[#8B5CF6]">{selectedAssignment.module}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#111827] dark:text-white mb-1">
                  {selectedAssignment.title}
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Provide your GitHub solution repository URL or paste your Jupyter Notebook hosting link for automated verification.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#374151] dark:text-[#E5E7EB]">
                    Repository / Solution URL
                  </label>
                  <input
                    type="text"
                    value={solutionUrl}
                    onChange={(e) => setSolutionUrl(e.target.value)}
                    placeholder="https://github.com/username/llama3-peft-lab..."
                    className="w-full bg-[#FAFAF7] dark:bg-[#060816] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.15] outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#374151] dark:text-[#E5E7EB]">
                    Additional Implementation Comments (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any experimental hyperparameters or dataset refinements..."
                    className="w-full bg-[#FAFAF7] dark:bg-[#060816] text-xs sm:text-sm p-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.15] outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting || !solutionUrl.trim()}
                  onClick={handleConfirmSubmit}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white text-xs font-bold shadow-md active:scale-95 flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{submitting ? "AI Proctored Evaluation..." : "Confirm & Submit to AI"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LAB SPECS & STARTER CODE PREVIEW MODAL */}
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
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white dark:bg-[#14182F] rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold text-[#DAA520] uppercase px-2 py-0.5 rounded-md bg-[#DAA520]/15">
                      {viewingSpecModal.type || "Engineering Practice Lab"}
                    </span>
                    <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase px-2 py-0.5 rounded-md bg-[#8B5CF6]/15">
                      Level: {viewingSpecModal.difficulty || "Intermediate"}
                    </span>
                    <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#DAA520]" />
                      <span>{viewingSpecModal.estimatedDuration || "60 mins"}</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#111827] dark:text-white font-heading">
                    {viewingSpecModal.title}
                  </h3>
                  <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400 block mt-0.5">
                    {viewingSpecModal.module} &bull; {viewingSpecModal.points || 100} XP Competency Points
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingSpecModal(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lab Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8B5CF6] block">
                  Lab Objective & Architectural Scenario
                </h4>
                <p className="text-xs sm:text-sm text-[#374151] dark:text-gray-300 leading-relaxed bg-[#FAFAF7] dark:bg-white/[0.03] p-4 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08]">
                  {viewingSpecModal.instructions}
                </p>
              </div>

              {/* Deliverables Checklist */}
              {viewingSpecModal.deliverables && viewingSpecModal.deliverables.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#14B8A6] block">
                    Required Lab Deliverables ({viewingSpecModal.deliverables.length} Specifications)
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {viewingSpecModal.deliverables.map((deliv: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF7]/60 dark:bg-[#060816]/40 border border-[#E7E5F4] dark:border-white/[0.06]">
                        <div className="w-5 h-5 rounded-md bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-[#111827] dark:text-gray-200 leading-relaxed">
                          {deliv}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starter Code Snippet */}
              {viewingSpecModal.starterCode && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#DAA520] flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-[#DAA520]" />
                      <span>Starter Code & Template (Python / LCEL)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(viewingSpecModal.starterCode)}
                      className="px-3 py-1 rounded-md text-[11px] font-bold bg-[#FAFAF7] dark:bg-white/[0.06] hover:bg-white/[0.1] text-[#111827] dark:text-white flex items-center gap-1.5 transition-colors border border-[#E7E5F4] dark:border-white/[0.1]"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> : <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                      <span>{copiedCode ? "Copied to Clipboard!" : "Copy Snippet"}</span>
                    </button>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-[#0D1117] text-gray-300 p-4 border border-white/[0.1] text-xs font-mono max-h-72 overflow-y-auto leading-relaxed whitespace-pre shadow-inner">
                    {viewingSpecModal.starterCode}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setViewingSpecModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.06] hover:bg-white/[0.1] text-[#111827] dark:text-white text-xs font-bold border border-[#E7E5F4] dark:border-white/[0.1]"
                >
                  Close Specification
                </button>
                {viewingSpecModal.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => {
                      setViewingSpecModal(null);
                      setSelectedAssignment(viewingSpecModal);
                      setSolutionUrl("");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-extrabold shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Open Submission Portal</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
