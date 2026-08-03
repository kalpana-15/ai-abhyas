"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import coursesData from "@/data/courses.json";
import { getCourseWorkspaceData, claimCourseCertificate } from "@/actions/lmsActions";
import { 
  Award, 
  Download, 
  Share2, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ExternalLink, 
  SlidersHorizontal,
  QrCode,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WorkspaceCertificatePage() {
  const params = useParams();
  const { user } = useAuth();
  const courseId = (params?.courseId as string) || "c1";
  const course = coursesData.find((c) => c.id === courseId) || coursesData[0];

  const [loadingDb, setLoadingDb] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [certificateData, setCertificateData] = useState<any | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [progressPct, setProgressPct] = useState<number>(0);

  useEffect(() => {
    async function fetchCertificateStatus() {
      try {
        setLoadingDb(true);
        const res = await getCourseWorkspaceData(courseId);
        if (res && res.success && res.userProgress) {
          // Calculate genuine completion percentage from database activity
          let totalLessons = 0;
          (res.course?.modules || []).forEach((mod: any) => {
            totalLessons += (mod.lessons || []).length;
          });
          const completedCount = (res.userProgress.completedLessons || []).length;
          const calcPct = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;
          setProgressPct(calcPct);

          if (res.userProgress.certificate) {
            setCertificateData(res.userProgress.certificate);
            setIsUnlocked(true);
            setProgressPct(100);
          } else {
            setIsUnlocked(false);
          }
        }
      } catch (err) {
        console.error("Error retrieving database credential status:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    fetchCertificateStatus();
  }, [courseId]);

  const handleClaimCertificate = async () => {
    try {
      setClaiming(true);
      const res = await claimCourseCertificate(courseId);
      if (res && res.success && res.certificate) {
        setCertificateData(res.certificate);
        setIsUnlocked(true);
        setProgressPct(100);
        alert("Certificate successfully verified and saved to your learner profile!");
      } else {
        alert(res?.error || "Unable to claim certificate. Please ensure all coursework is completed.");
      }
    } catch (error) {
      console.error("Error claiming certificate:", error);
    } finally {
      setClaiming(false);
    }
  };

  const handleDownload = () => {
    alert(`Generating verifiable PDF credential for ${user?.name || "Learner"} (ID: ${certificateData?.certificateId || "AIA-2026-GEN-8942"})...`);
  };

  const handleLinkedInShare = () => {
    alert("Opening LinkedIn Add-to-Profile verification gateway with digital badges...");
  };

  const remainingTasks = [
    { title: "Complete all remaining module curriculum lessons", status: isUnlocked ? "done" : "pending" },
    { title: "Submit required Parameter-Efficient practical lab", status: isUnlocked ? "done" : "pending" },
    { title: "Achieve mastery threshold in Certification Examination", status: isUnlocked ? "done" : "pending" },
  ];

  if (loadingDb) {
    return (
      <div className="w-full min-h-[440px] bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] p-10 flex flex-col items-center justify-center text-center shadow-xl my-4 transition-colors">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <Sparkles className="w-5 h-5 text-[#DAA520] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h3 className="text-base font-extrabold font-heading text-[#111827] dark:text-white tracking-tight">
          Verifying Course Credential & Mastery...
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-sm font-medium">
          Checking your graduation qualifications and verifiable diploma signatures in PostgreSQL...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12">

      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Accredited Course Certificate
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Showcase your technical fluency with industry-recognized verification badges and tamper-proof cryptographic signatures.
          </p>
        </div>

        {/* Status indicator pill */}
        <div className="shrink-0">
          {isUnlocked ? (
            <span className="inline-flex items-center gap-2 bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/30 px-4 py-2 rounded-xl font-bold text-xs shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
              <span>Credential Officially Verified</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl font-bold text-xs">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Locked &bull; Complete Course to Unlock</span>
            </span>
          )}
        </div>
      </div>

      {/* REMAINING REQUIREMENTS vs COMPENSATORY CONTROLS */}
      {!isUnlocked ? (
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent rounded-[18px] p-6 border border-amber-500/30 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                    Remaining Completion Requirements ({progressPct}% Complete)
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                    Your official certificate preview below is temporarily watermarked. Complete mandatory curriculum milestones or verify directly for evaluation:
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {remainingTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#374151] dark:text-[#E5E7EB]">
                      <div className="w-4 h-4 rounded-full border border-amber-500/50 text-amber-500 flex items-center justify-center text-[10px]">
                        &bull;
                      </div>
                      <span>{task.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={claiming}
              onClick={handleClaimCertificate}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-bold text-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-2 shrink-0 self-start md:self-center"
            >
              {claiming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4 text-[#DAA520]" />}
              <span>{claiming ? "Minting DB Record..." : "Mint Credential Now"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#14B8A6]/10 rounded-[18px] p-5 border border-[#14B8A6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-10 h-10 text-[#DAA520] shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827] dark:text-white font-heading">
                Congratulations, {user?.name || "Kalpana"}! You have mastered this curriculum.
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                Issued on {certificateData?.issueDate ? new Date(certificateData.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} &bull; Credential ID: {certificateData?.certificateId || "AIA-2026-GEN-8942"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
            {!certificateData && (
              <button
                type="button"
                disabled={claiming}
                onClick={handleClaimCertificate}
                className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                {claiming && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Save to Learner Vault</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleLinkedInShare}
              className="px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#08529A] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to LinkedIn</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* HIGH-FIDELITY CERTIFICATE PREVIEW CARD */}
      <div className="relative rounded-[24px] overflow-hidden border-8 border-[#E7E5F4] dark:border-white/[0.1] bg-white dark:bg-[#1A1F3C] text-[#111827] dark:text-white p-8 sm:p-12 lg:p-16 shadow-2xl transition-all">
        
        {!isUnlocked && (
          <div className="absolute inset-0 z-20 bg-white/75 dark:bg-[#060816]/80 backdrop-blur-[3px] flex flex-col items-center justify-center text-center p-6 border border-amber-500/20">
            <div className="w-20 h-20 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center shadow-xl mb-4 border border-amber-500/30 animate-pulse">
              <Lock className="w-10 h-10" />
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-[#111827] dark:text-white mb-2 tracking-tight">
              PREVIEW WATERMARKED & LOCKED
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto mb-6">
              Complete all remaining lessons, labs, and evaluation milestones to remove this watermark and unlock your official accredited digital signature.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg">
              <span>Current Mastery: {progressPct}%</span>
            </div>
          </div>
        )}

        <div className="absolute inset-4 border-2 border-dashed border-[#DAA520]/50 pointer-events-none rounded-xl" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center gap-2 text-[#DAA520]">
            <Award className="w-10 h-10 text-[#DAA520]" />
            <span className="text-xl font-black font-heading tracking-widest uppercase text-[#111827] dark:text-white">
              AI ABHYAS ACCREDITATION
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#6B7280] dark:text-[#9CA3AF] block">
              This is to officially certify that
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-[#8B5CF6] dark:text-violet-400 border-b-2 border-[#DAA520]/40 pb-2 inline-block px-8">
              {user?.name || "Kalpana Devi"}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#374151] dark:text-[#E5E7EB] leading-relaxed max-w-xl font-medium">
            has successfully fulfilled all academic rigor, technical laboratory implementations, and comprehensive proctored evaluation metrics to achieve documented proficiency in:
          </p>
          
          <h3 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white tracking-tight bg-[#FAFAF7] dark:bg-white/[0.04] px-6 py-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.1]">
            {course.title}
          </h3>

          <div className="w-full pt-8 sm:pt-12 grid grid-cols-2 gap-8 items-end text-left">
            <div className="border-t border-[#E7E5F4] dark:border-white/[0.2] pt-2">
              <p className="font-heading font-extrabold text-sm text-[#111827] dark:text-white">
                {course.instructor?.name || "Dr. Sarah Chen"}
              </p>
              <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                Lead Faculty & Principal AI Engineer
              </p>
            </div>

            <div className="flex flex-col items-end text-right border-t border-[#E7E5F4] dark:border-white/[0.2] pt-2">
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                <QrCode className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>ID: {certificateData?.certificateId || "AIA-2026-GEN-8942"}</span>
              </div>
              <p className="text-[10px] text-[#14B8A6] font-semibold mt-0.5">
                Cryptographically Verifiable Academic Diploma
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
