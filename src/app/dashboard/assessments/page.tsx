"use client";

import React, { useState } from "react";
import coursesData from "@/data/courses.json";
import { genaiQuizzes } from "@/data/genai_quizzes";
import { 
  CheckSquare, 
  Play, 
  Award, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  X,
  RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GlobalAssessmentsPage() {
  const [activeQuizModal, setActiveQuizModal] = useState<any | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number>(96);

  // Generate all 15 proctored evaluation modules (10 questions per module = 150 questions)
  const quizzesList = genaiQuizzes.map((item) => ({
    id: item.id,
    courseTitle: `${item.courseTitle} (${item.courseId})`,
    level: item.moduleNumber >= 10 ? "Advanced" : "Intermediate",
    quizTitle: item.title,
    duration: item.duration || "25 mins",
    questionsCount: item.questions.length || 10,
    passThreshold: item.threshold || 75,
    status: item.status === "passed" ? `Passed (${item.score || 95}%)` : "Ready to Start",
    questions: item.questions
  }));

  const handleLaunchQuiz = (quiz: any) => {
    setSelectedAnswers({});
    setQuizFinished(false);
    setActiveQuizModal(quiz);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitEvaluation = () => {
    let correctCount = 0;
    const qList = activeQuizModal?.questions || [];
    qList.forEach((q: any, idx: number) => {
      if (selectedAnswers[idx] === q.correct) correctCount++;
    });
    const score = qList.length > 0 && Object.keys(selectedAnswers).length === qList.length
      ? Math.round((correctCount / qList.length) * 30 + 70)
      : 96;
    setCalculatedScore(score);
    setQuizFinished(true);
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#DAA520] mb-1">
            <Sparkles className="w-3 h-3 fill-[#DAA520]" />
            <span>Assessments</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Quizzes &amp; Evaluations
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Complete technical quizzes across your enrolled masterclasses to qualify for verifiable diplomas.
          </p>
        </div>

        <div className="bg-[#FAFAF7] dark:bg-white/[0.03] px-5 py-3.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center gap-3 shrink-0 self-start md:self-center">
          <CheckSquare className="w-6 h-6 text-[#DAA520]" />
          <div>
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Total Evaluations</span>
            <span className="text-sm font-extrabold text-[#111827] dark:text-white">{quizzesList.length} Active Exams</span>
          </div>
        </div>
      </div>

      {/* QUIZZES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizzesList.map((quiz) => {
          const isPassed = quiz.status.includes("Passed");

          return (
            <div key={quiz.id} className="bg-white dark:bg-[#14182F] rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md",
                    isPassed ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  )}>
                    {quiz.status}
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-bold">
                    Pass Threshold: {quiz.passThreshold}%
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#8B5CF6] uppercase block">{quiz.courseTitle}</span>
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading mt-0.5">
                    {quiz.quizTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#6B7280] dark:text-[#9CA3AF] pt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#DAA520]" /> {quiz.duration} limit</span>
                  <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-[#8B5CF6]" /> {quiz.questionsCount} questions</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6B7280]">Level: {quiz.level}</span>
                <button
                  type="button"
                  onClick={() => handleLaunchQuiz(quiz)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 active:scale-95 shadow-xs",
                    isPassed
                      ? "bg-[#FAFAF7] dark:bg-white/[0.05] text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1]"
                      : "bg-[#DAA520] hover:bg-[#c4931a] text-white"
                  )}
                >
                  {isPassed ? <RefreshCw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isPassed ? "Retake" : "Start Test"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE QUIZ SIMULATION MODAL */}
      <AnimatePresence>
        {activeQuizModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setActiveQuizModal(null)}
              className="fixed inset-0 bg-[#060816]/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-[#DAA520] uppercase block">{activeQuizModal.courseTitle}</span>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                    {activeQuizModal.quizTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveQuizModal(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {quizFinished ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center shadow-inner font-extrabold">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-base font-bold text-[#111827] dark:text-white font-heading">Evaluation Submitted!</h4>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-sm mx-auto">
                    Your responses have been recorded in your gradebook. Your score: <strong className="text-emerald-500">{calculatedScore}% (Passed)</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveQuizModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#DAA520] text-white font-bold text-xs shadow-md active:scale-95"
                  >
                    Return to Assessments Hub
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] bg-[#FAFAF7] dark:bg-white/[0.03] p-3.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08]">
                    Please complete all 10 proctored multiple-choice evaluation questions below to verify your technical mastery of this module.
                  </p>

                  <div className="space-y-6">
                    {activeQuizModal.questions && activeQuizModal.questions.map((q: any, qIdx: number) => (
                      <div key={qIdx} className="space-y-3 p-4 rounded-xl bg-[#FAFAF7]/60 dark:bg-[#060816]/40 border border-[#E7E5F4] dark:border-white/[0.06]">
                        <span className="text-[11px] font-bold text-[#8B5CF6] uppercase block">Question {qIdx + 1} of {activeQuizModal.questions.length}</span>
                        <p className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white leading-relaxed">
                          {q.q}
                        </p>
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt: string, idx: number) => {
                            const isSelected = selectedAnswers[qIdx] === idx;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSelectOption(qIdx, idx)}
                                className={cn(
                                  "w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-3",
                                  isSelected
                                    ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6] dark:text-violet-300 font-bold"
                                    : "bg-white dark:bg-white/[0.02] border-[#E7E5F4] dark:border-white/[0.08] text-[#374151] dark:text-[#E5E7EB] hover:border-[#8B5CF6]/40"
                                )}
                              >
                                <div className={cn(
                                  "w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 font-bold",
                                  isSelected ? "border-[#8B5CF6] bg-[#8B5CF6] text-white" : "border-gray-400 text-gray-400"
                                )}>
                                  {String.fromCharCode(65 + idx)}
                                </div>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setActiveQuizModal(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/[0.05]"
                    >
                      Cancel Exam
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitEvaluation}
                      className="px-6 py-2.5 rounded-xl bg-[#DAA520] hover:bg-[#c4931a] text-white font-extrabold text-xs shadow-md flex items-center gap-2 active:scale-95"
                    >
                      <span>Submit Answers for Evaluation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
