"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  LayoutDashboard, 
  FileText, 
  Shield, 
  AlertCircle, 
  RefreshCw, 
  HelpCircle, 
  ArrowLeft 
} from "lucide-react";

export interface PaymentSuccessViewProps {
  courseTitle: string;
  amountPaid: string;
  transactionId: string;
  orderId?: string;
  paymentMethod?: string;
  invoiceNumber?: string;
}

export function PaymentSuccessView({
  courseTitle = "AI Foundations & Specialization",
  amountPaid = "₹4,499",
  transactionId = "pay_OqZ928LxpR3a27",
  orderId = "order_OqZ907AklR1p92",
  paymentMethod = "Razorpay (UPI / Net Banking / Card)",
  invoiceNumber = "INV-AIABHYAS-2026084",
}: PaymentSuccessViewProps) {
  const router = useRouter();
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetUrl, setTargetUrl] = useState("/dashboard");

  const transitionMessages = [
    "Creating your enrollment...",
    "Setting up your learning workspace...",
    "Syncing course resources...",
    "Preparing your dashboard...",
    "Almost ready...",
  ];

  const handleStartTransition = (url: string) => {
    setTargetUrl(url);
    setIsTransitioning(true);
    setCurrentStepIndex(0);
  };

  React.useEffect(() => {
    if (!isTransitioning) return;

    const stepDuration = 950; // ~950ms per message
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < transitionMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          // Redirect immediately when the last step finishes
          setTimeout(() => {
            router.push(targetUrl);
          }, 600);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isTransitioning, targetUrl, router, transitionMessages.length]);

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    setTimeout(() => {
      setDownloadingInvoice(false);
      alert(`Official Invoice (${invoiceNumber}) has been generated and downloaded as PDF.`);
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    setDownloadingReceipt(true);
    setTimeout(() => {
      setDownloadingReceipt(false);
      alert(`Payment Receipt (${transactionId}) has been downloaded.`);
    }, 1000);
  };

  if (isTransitioning) {
    const progressPercent = Math.round(((currentStepIndex + 1) / transitionMessages.length) * 100);

    return (
      <div className="w-full max-w-3xl mx-auto py-12 px-4 text-center space-y-10">
        {/* Animated AI Core & Progress Title */}
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] to-[#14B8A6] animate-pulse blur-md opacity-70" />
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] flex items-center justify-center shadow-lg">
              <RefreshCw className="w-8 h-8 animate-spin text-[#8B5CF6] dark:text-[#111827]" />
            </div>
          </div>

          <div className="space-y-2 h-16 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentStepIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-[#111827] dark:text-white"
              >
                {transitionMessages[currentStepIndex]}
              </motion.h2>
            </AnimatePresence>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
              Step {currentStepIndex + 1} of {transitionMessages.length} &bull; {progressPercent}% Completed
            </p>
          </div>

          {/* Smooth Progress Bar */}
          <div className="w-full max-w-md bg-[#E7E5F4] dark:bg-white/[0.08] h-2 rounded-full overflow-hidden p-0.5 border border-transparent shadow-inner">
            <div
              className="bg-gradient-to-r from-[#8B5CF6] to-[#14B8A6] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Skeleton Placeholder representing the upcoming Global Dashboard */}
        <div className="bg-white/60 dark:bg-[#14182F]/60 backdrop-blur-xl border border-[#E7E5F4] dark:border-white/[0.08] rounded-3xl p-6 shadow-xl max-w-2xl mx-auto space-y-6 animate-pulse text-left">
          <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.06] pb-4">
            <div className="space-y-2 w-1/2">
              <div className="h-4 bg-[#6B7280]/20 rounded-lg w-2/3" />
              <div className="h-6 bg-[#6B7280]/30 rounded-lg w-full" />
            </div>
            <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-2xl" />
          </div>

          {/* 4 Skeleton Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] space-y-2 border border-black/5 dark:border-white/[0.05]">
                <div className="h-2.5 bg-[#6B7280]/20 rounded w-2/3" />
                <div className="h-5 bg-[#6B7280]/30 rounded w-1/2" />
              </div>
            ))}
          </div>

          {/* Skeleton Course Row */}
          <div className="space-y-3 pt-2">
            <div className="h-3.5 bg-[#6B7280]/20 rounded w-1/3" />
            <div className="p-4 rounded-2xl bg-[#FAFAF7] dark:bg-white/[0.04] flex items-center gap-4 border border-black/5 dark:border-white/[0.05]">
              <div className="w-20 h-14 rounded-lg bg-[#6B7280]/25 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[#6B7280]/30 rounded w-3/4" />
                <div className="h-2.5 bg-[#6B7280]/20 rounded w-1/2" />
              </div>
              <div className="w-24 h-8 rounded-xl bg-[#8B5CF6]/20 shrink-0" />
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium animate-pulse">
          Establishing your dedicated engineering sandbox. Please do not navigate away...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 text-center">
      
      {/* Minimal Hero Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] mx-auto mb-5 flex items-center justify-center shadow-xs"
      >
        <CheckCircle2 className="w-7 h-7 stroke-[2]" />
      </motion.div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827] dark:text-white mb-2">
        Enrollment successful
      </h1>
      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-normal max-w-md mx-auto mb-8 leading-relaxed">
        You are now officially enrolled in <strong className="text-[#111827] dark:text-white font-semibold">{courseTitle}</strong>. Your lifetime course access has been activated.
      </p>

      {/* Clean Transaction Invoice & Receipt Card */}
      <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-6 shadow-sm dark:shadow-none text-left mb-8 max-w-xl mx-auto">
        
        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#E7E5F4] dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#111827] dark:text-white stroke-[2]" />
            <span className="font-semibold text-sm text-[#111827] dark:text-white">
              Transaction record
            </span>
          </div>
          <span className="bg-[#FAFAF7] dark:bg-[#060816] text-[#111827] dark:text-white px-2.5 py-0.5 rounded-md text-xs font-semibold border border-[#E7E5F4] dark:border-white/[0.1]">
            Settled & verified
          </span>
        </div>

        {/* Clean 2-Column Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm mb-6">
          <div>
            <span className="block text-[#6B7280] dark:text-[#9CA3AF] text-xs font-normal mb-1">
              Course title
            </span>
            <span className="font-semibold text-[#111827] dark:text-white text-sm block truncate">
              {courseTitle}
            </span>
          </div>

          <div>
            <span className="block text-[#6B7280] dark:text-[#9CA3AF] text-xs font-normal mb-1">
              Amount paid
            </span>
            <span className="font-bold text-[#10B981] text-sm sm:text-base">
              {amountPaid}
            </span>
          </div>

          <div>
            <span className="block text-[#6B7280] dark:text-[#9CA3AF] text-xs font-normal mb-1">
              Transaction ID
            </span>
            <span className="font-mono text-xs text-[#111827] dark:text-white">
              {transactionId}
            </span>
          </div>
          <div>
            <span className="block text-[#6B7280] dark:text-[#9CA3AF] text-xs font-normal mb-1">
              Order reference
            </span>
            <span className="font-mono text-xs text-[#111827] dark:text-white">
              {orderId}
            </span>
          </div>

          <div>
            <span className="block text-[#6B7280] dark:text-[#9CA3AF] text-xs font-normal mb-1">
              Payment mode
            </span>
            <span className="font-medium text-[#111827] dark:text-white text-xs sm:text-sm">
              {paymentMethod}
            </span>
          </div>

          <div>
            <span className="block text-[#6B7280] dark:text-[#9CA3AF] text-xs font-normal mb-1">
              Invoice reference
            </span>
            <span className="font-mono text-xs font-semibold text-[#111827] dark:text-white">
              {invoiceNumber}
            </span>
          </div>
        </div>

        {/* Download Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]">
          <button
            type="button"
            onClick={handleDownloadInvoice}
            disabled={downloadingInvoice}
            className="flex-1 min-w-[150px] py-2 px-3.5 rounded-lg bg-[#FAFAF7] dark:bg-[#060816] hover:bg-[#F3F4F6] dark:hover:bg-slate-900 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white flex items-center justify-between gap-2 transition-all shadow-2xs"
          >
            <span className="flex items-center gap-1.5 truncate">
              <FileText className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{downloadingInvoice ? "Generating PDF..." : "Download invoice"}</span>
            </span>
            <Download className="w-3.5 h-3.5 shrink-0 text-[#6B7280]" />
          </button>

          <button
            type="button"
            onClick={handleDownloadReceipt}
            disabled={downloadingReceipt}
            className="flex-1 min-w-[150px] py-2 px-3.5 rounded-lg bg-[#FAFAF7] dark:bg-[#060816] hover:bg-[#F3F4F6] dark:hover:bg-slate-900 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white flex items-center justify-between gap-2 transition-all shadow-2xs"
          >
            <span className="flex items-center gap-1.5 truncate">
              <Shield className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{downloadingReceipt ? "Downloading..." : "Download receipt"}</span>
            </span>
            <Download className="w-3.5 h-3.5 shrink-0 text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Action Buttons Matrix - Triggers Post-Payment Transition Screen */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => handleStartTransition("/dashboard/courses")}
          className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#8B5CF6]/20 transition-all cursor-pointer active:scale-95"
        >
          <span>Start learning now</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleStartTransition("/dashboard")}
          className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white dark:bg-[#14182F] hover:bg-[#FAFAF7] dark:hover:bg-slate-900 border border-[#E7E5F4] dark:border-white/[0.15] font-semibold text-sm text-[#111827] dark:text-white flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <LayoutDashboard className="w-4 h-4 text-[#6B7280]" />
          <span>Go to dashboard</span>
        </button>
      </div>

      <p className="mt-8 text-xs text-[#6B7280] dark:text-[#9CA3AF] font-normal">
        Need assistance with your enrollment credentials? Contact our support team at <strong className="text-[#111827] dark:text-white font-semibold">support@aiabhyas.com</strong>
      </p>
    </div>
  );
}


export interface PaymentFailedViewProps {
  errorMessage?: string;
  onRetry: () => void;
  onSelectOtherMethod: () => void;
  onGoBack: () => void;
}

export function PaymentFailedView({
  errorMessage = "The banking gateway declined the transaction or the payment window was closed before completion.",
  onRetry,
  onSelectOtherMethod,
  onGoBack,
}: PaymentFailedViewProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4 text-center">
      
      {/* Error Illustration Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 rounded-full bg-[#EF4444]/15 text-[#EF4444] mx-auto mb-5 flex items-center justify-center border border-[#EF4444]/20"
      >
        <AlertCircle className="w-7 h-7 stroke-[2]" />
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827] dark:text-white mb-2">
        Payment unsuccessful
      </h1>
      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-normal max-w-md mx-auto mb-8 leading-relaxed">
        No funds were charged for this attempt. If any temporary debit occurred, it will be automatically reversed by your banking provider within 2–5 business days.
      </p>

      {/* Error Reason Box */}
      <div className="p-4 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/70 border border-[#E7E5F4] dark:border-white/[0.08] text-left mb-8 text-xs font-medium text-[#374151] dark:text-[#E5E7EB] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444] mt-0.5" />
        <div>
          <span className="block font-semibold text-[#111827] dark:text-white mb-0.5">
            Gateway message:
          </span>
          <span className="text-[#6B7280] dark:text-[#9CA3AF]">{errorMessage}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={onRetry}
          className="w-full py-3 px-6 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#8B5CF6]/20 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry secure checkout</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onSelectOtherMethod}
            className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#14182F] hover:bg-[#FAFAF7] dark:hover:bg-slate-900 border border-[#E7E5F4] dark:border-white/[0.1] font-semibold text-xs text-[#111827] dark:text-white flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Change payment mode</span>
          </button>

          <button
            type="button"
            onClick={onGoBack}
            className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#14182F] hover:bg-[#FAFAF7] dark:hover:bg-slate-900 border border-[#E7E5F4] dark:border-white/[0.1] font-semibold text-xs text-[#6B7280] hover:text-[#111827] dark:hover:text-white flex items-center justify-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to student details</span>
          </button>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => router.push("/contact")}
            className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] dark:hover:text-white underline inline-flex items-center gap-1 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Contact billing support</span>
          </button>
        </div>
      </div>

    </div>
  );
}
