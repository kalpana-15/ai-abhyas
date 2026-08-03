"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCourseWorkspaceData } from "@/actions/lmsActions";
import { 
  FolderOpen, 
  FileText, 
  Code, 
  Database, 
  Download, 
  Check, 
  Sparkles,
  Search,
  Filter,
  Eye,
  X,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ResourceType = "all" | "pdf" | "code" | "dataset";

interface ResourceItem {
  id: string;
  title: string;
  module: string;
  type: "pdf" | "code" | "dataset";
  size: string;
  filename: string;
  url: string;
}

export default function WorkspaceResourcesPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "c1";
  const [loadingDb, setLoadingDb] = useState(true);
  const [filter, setFilter] = useState<ResourceType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [previewModal, setPreviewModal] = useState<ResourceItem | null>(null);

  useEffect(() => {
    async function verifyCourse() {
      try {
        setLoadingDb(true);
        await getCourseWorkspaceData(courseId);
      } catch (err) {
        console.error("Error checking course study resources:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    verifyCourse();
  }, [courseId]);

  const resources: ResourceItem[] = [
    {
      id: "res-mod-1",
      title: "Generative AI 2027 Roadmap & Foundation Models Study Guide",
      module: "Module 1: GenAI Roadmap for Beginners",
      type: "pdf",
      size: "3.8 MB",
      filename: "mod1_genai_2027_roadmap_handbook.pdf",
      url: "/resources/genai_study_guide.md"
    },
    {
      id: "res-mod-4",
      title: "LangChain Core Components & Modular Architecture Reference",
      module: "Module 4: Components & Modular Architecture",
      type: "pdf",
      size: "2.4 MB",
      filename: "mod4_langchain_components_manual.pdf",
      url: "/resources/genai_study_guide.md"
    },
    {
      id: "res-mod-8",
      title: "Structured JSON Output & Pydantic Validation (Jupyter Notebook Lab)",
      module: "Module 8: Structured Output in LangChain",
      type: "code",
      size: "1.5 MB",
      filename: "mod8_structured_json_pydantic_lab.ipynb",
      url: "https://raw.githubusercontent.com/langchain-ai/langchain/master/README.md"
    },
    {
      id: "res-mod-10",
      title: "LCEL Runnables & UNIX-Style Pipeline Composition Guide",
      module: "Module 10: Runnables in LCEL",
      type: "pdf",
      size: "4.1 MB",
      filename: "mod10_lcel_runnables_cheatsheet.pdf",
      url: "/resources/genai_study_guide.md"
    },
    {
      id: "res-mod-13",
      title: "Enterprise Document Vector Embeddings & ChromaDB Dataset",
      module: "Module 13: Vector Stores & High-Dim Embeddings",
      type: "dataset",
      size: "42.5 MB",
      filename: "chroma_enterprise_vectors_benchmark.jsonl",
      url: "/resources/genai_study_guide.md"
    },
    {
      id: "res-mod-15",
      title: "End-to-End Autonomous YouTube Chatbot with Tool Calling (Code Lab)",
      module: "Module 15: Capstone Autonomous Agent",
      type: "code",
      size: "3.2 MB",
      filename: "mod15_autonomous_youtube_chatbot.ipynb",
      url: "https://raw.githubusercontent.com/langchain-ai/langchain/master/README.md"
    },
  ];

  const filteredResources = resources.filter((item) => {
    const matchesType = filter === "all" || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });



  const handleDownload = (id: string, url: string) => {
    if (!downloaded.includes(id)) {
      setDownloaded((prev) => [...prev, id]);
    }
    window.open(url, "_blank");
  };

  if (loadingDb) {
    return (
      <div className="w-full min-h-[440px] bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] p-10 flex flex-col items-center justify-center text-center shadow-xl my-4 transition-colors">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <Sparkles className="w-5 h-5 text-[#14B8A6] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h3 className="text-base font-extrabold font-heading text-[#111827] dark:text-white tracking-tight">
          Loading Study Resources & Assets...
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-sm font-medium">
          Retrieving downloadable Jupyter notebooks and PDF manuals from server...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Course Study Materials &amp; Assets
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Download high-definition PDF guides, Google Colab notebooks, and pre-tokenized corpora to build your Capstone projects.
          </p>
        </div>

        {/* STAT BADGE */}
        <div className="bg-[#FAFAF7] dark:bg-white/[0.03] px-5 py-4 rounded-2xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center gap-3.5 shrink-0 self-start md:self-center">
          <FolderOpen className="w-7 h-7 text-[#14B8A6]" />
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase block">Total Files Available</span>
            <span className="text-base font-extrabold text-[#111827] dark:text-white">{resources.length} Downloadable Items</span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {[
            { id: "all", label: "All Resources" },
            { id: "pdf", label: "PDF Guides" },
            { id: "code", label: "PyTorch & Notebooks" },
            { id: "dataset", label: "Datasets & Corpora" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as ResourceType)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 shrink-0",
                filter === tab.id
                  ? "bg-[#8B5CF6] text-white shadow-sm"
                  : "bg-white dark:bg-[#14182F] text-[#6B7280] dark:text-[#9CA3AF] border border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6]/40 hover:text-[#111827] dark:hover:text-white"
              )}
            >
              <span>{tab.label}</span>
              {tab.id === "all" && (
                <span className="text-[10px] bg-black/15 text-white px-1.5 py-0.5 rounded-md">
                  {resources.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search by filename or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#14182F] border border-[#E7E5F4] dark:border-white/[0.08] text-xs font-semibold text-[#111827] dark:text-white placeholder-[#6B7280] focus:outline-hidden focus:ring-2 focus:ring-[#8B5CF6]"
          />
        </div>
      </div>

      {/* RESOURCES LISTING - RESPONSIVE BANNERS */}
      <div className="space-y-3.5">
        {filteredResources.length === 0 ? (
          <div className="bg-white dark:bg-[#14182F] rounded-2xl border border-dashed border-[#E7E5F4] dark:border-white/[0.1] p-12 text-center my-6">
            <FolderOpen className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#111827] dark:text-white">No resources found</h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any study files matching your filter criteria or search query.
            </p>
          </div>
        ) : (
          filteredResources.map((item) => {
            const isDown = downloaded.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#14182F] rounded-[16px] border border-[#E7E5F4] dark:border-white/[0.08] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group w-full"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#111827] dark:text-white font-heading tracking-tight group-hover:text-[#8B5CF6] dark:group-hover:text-[#A855F7] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7E5F4] dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setPreviewModal(item)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] hover:bg-black/5 dark:hover:bg-white/10 text-xs font-semibold text-[#111827] dark:text-white border border-[#E7E5F4] dark:border-white/[0.1] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Eye className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(item.id, item.url)}
                    className={cn(
                      "flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95",
                      isDown
                        ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                        : "bg-[#14B8A6] hover:bg-[#0D9488] text-white"
                    )}
                  >
                    {isDown ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    <span>{isDown ? "Downloaded" : "Download"}</span>
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {previewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewModal(null)}
              className="fixed inset-0 bg-[#060816]/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <div>
                  <span className="text-[10px] font-bold text-[#14B8A6] uppercase block">{previewModal.module}</span>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                    {previewModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.08] font-mono text-xs space-y-3 text-[#374151] dark:text-[#E5E7EB]">
                <div className="text-center font-sans border-b border-gray-300 dark:border-gray-800 pb-3">
                  <span className="font-extrabold text-[#8B5CF6] block">AI Abhyas Technical Toolkit Preview</span>
                  <span className="text-[11px] text-gray-400">File: {previewModal.filename} ({previewModal.size})</span>
                </div>
                <p className="font-sans text-xs text-[#374151] dark:text-[#E5E7EB] leading-relaxed">
                  <strong>Resource Content Summary:</strong> This architectural blueprint contains validated PyTorch modules and equations necessary for implementing self-attention blocks in production.
                </p>
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-[11px]">
                  <code>
                    # Verified Code Snippet from {previewModal.filename}<br/>
                    import torch.nn.functional as F<br/>
                    def apply_rotary_emb(xq, xk, freqs_cis):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;xq_out = torch.view_as_complex(xq.float()) * freqs_cis<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;xk_out = torch.view_as_complex(xk.float()) * freqs_cis<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;return torch.view_as_real(xq_out), torch.view_as_real(xk_out)
                  </code>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/[0.05]"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(previewModal.id, previewModal.url)}
                  className="px-6 py-2 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {previewModal.type.toUpperCase()} File</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
