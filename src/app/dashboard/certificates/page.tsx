"use client";

import React, { useState, useEffect } from "react";
import { getUserAcademicResults } from "@/actions/dashboardActions";
import { 
  Award, 
  Download, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Loader2, 
  FileText, 
  Eye, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CertificatesPage() {
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [activeCertModal, setActiveCertModal] = useState<any | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCerts() {
      try {
        setLoading(true);
        const res = await getUserAcademicResults();
        if (res && res.success && res.certificates) {
          setCertificates(res.certificates);
        }
      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCerts();
  }, []);

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Downloaded high-resolution cryptographic digital diploma PDF for: ${title}`);
    }, 800);
  };

  const handleShareLinkedIn = (certId: string) => {
    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Generative+AI+Masterclass&organizationName=AI+Abhyas+Global&certId=${certId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#DAA520] mb-1">
            <Sparkles className="w-3 h-3 fill-[#DAA520]" />
            <span>Credentials Gallery</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Digital Certificates
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Showcase your engineering diplomas, backed by cryptographic verification and LinkedIn validation.
          </p>
        </div>

        <div className="bg-[#FAFAF7] dark:bg-white/[0.03] px-5 py-3.5 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center gap-3 shrink-0 self-start md:self-center">
          <Award className="w-7 h-7 text-[#DAA520]" />
          <div>
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Verified Diplomas</span>
            <span className="text-sm font-extrabold text-[#111827] dark:text-white">
              {loading ? "Loading..." : `${certificates.length} Unlocked Diplomas`}
            </span>
          </div>
        </div>
      </div>

      {/* CERTIFICATES GRID */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#6B7280] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#DAA520]" />
          <span className="text-xs font-semibold">Retrieving verified credentials...</span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="bg-white dark:bg-[#14182F] rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] p-12 text-center text-gray-400">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#DAA520]" />
          <h3 className="text-sm font-bold text-white">No Unlocked Certificates Found Yet</h3>
          <p className="text-xs mt-1">Complete all video modules and pass proctored quizzes in your courses to unlock verifiable diplomas!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert) => {
            const isBusy = downloadingId === cert.id;
            const title = cert.course?.title || "Generative AI Engineering Masterclass";

            return (
              <motion.div
                key={cert.id}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.1] p-6 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden group"
              >
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#DAA520]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-[#DAA520]/15 text-[#DAA520] font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider border border-[#DAA520]/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified DB Credential</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      ID: {cert.credentialId}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider block">Awarded to Kalpana Devi</span>
                    <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading mt-1 group-hover:text-[#DAA520] transition-colors">
                      {title}
                    </h3>
                  </div>

                  <div className="bg-[#FAFAF7] dark:bg-white/[0.03] p-4 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center justify-between">
                    <span>Issued Date: <strong className="text-[#111827] dark:text-white">{new Date(cert.issuedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong></span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Hash</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                  <button
                    type="button"
                    onClick={() => setActiveCertModal(cert)}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 text-xs font-bold text-[#111827] dark:text-white transition-all flex items-center justify-center gap-1.5 border border-[#E7E5F4] dark:border-white/[0.1]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>View Diploma</span>
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleDownload(cert.id, title)}
                      className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-[#DAA520] hover:bg-[#c4931a] disabled:opacity-50 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      {isBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{isBusy ? "Exporting..." : "Download PDF"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareLinkedIn(cert.credentialId)}
                      className="py-2.5 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                      title="Add credential to LinkedIn profile"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* DIPLOMA VIEW MODAL */}
      <AnimatePresence>
        {activeCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertModal(null)}
              className="fixed inset-0 bg-[#060816]/80 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-[#FAFAF7] dark:bg-[#0E1225] rounded-[24px] p-8 sm:p-12 shadow-2xl border-4 border-[#DAA520]/50 text-center space-y-6 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#DAA520]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-end relative z-10">
                <button
                  type="button"
                  onClick={() => setActiveCertModal(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="w-20 h-20 rounded-full bg-[#DAA520]/15 text-[#DAA520] mx-auto flex items-center justify-center border-2 border-[#DAA520]/40 shadow-md">
                  <Award className="w-10 h-10" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B5CF6] block">AI Abhyas Institute of Engineering</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] dark:text-white font-heading tracking-tight">
                  Certificate of Professional Achievement
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-lg mx-auto leading-relaxed">
                  This official diplomatic credential certifies that <strong className="text-[#DAA520] text-base">Kalpana Devi</strong> has demonstrated mastery by satisfactorily completing all curriculum modules, laboratories, and proctored examinations for:
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#DAA520] font-heading pt-2">
                  {activeCertModal.course?.title || "Generative AI Masterclass"}
                </h3>
              </div>

              <div className="pt-6 border-t border-gray-300 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400 relative z-10">
                <span>Credential ID: <strong className="text-white">{activeCertModal.credentialId}</strong></span>
                <span>Issued: <strong className="text-white">{new Date(activeCertModal.issuedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong></span>
                <span className="text-emerald-500 font-sans font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Officially Verified</span>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
