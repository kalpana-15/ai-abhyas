"use client";

import React, { useState, useEffect } from "react";
import { getStudyMaterials } from "@/actions/dashboardActions";
import { 
  FolderOpen, 
  FileText, 
  Code, 
  Download, 
  Search, 
  Filter, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Loader2, 
  CheckCircle2, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StudyResourcesPage() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [previewResource, setPreviewResource] = useState<any | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        setLoading(true);
        const res = await getStudyMaterials();
        if (res.success && res.resources) {
          setResources(res.resources);
        }
      } catch (err) {
        console.error("Error loading resources:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, []);

  const handleDownload = (resItem: any) => {
    setDownloadingId(resItem.id);
    setTimeout(() => {
      setDownloadingId(null);
      const fileUrl = resItem.url || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      window.open(fileUrl, "_blank");
    }, 800);
  };

  const filteredResources = resources.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.course?.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFilter === "All") return true;
    if (selectedFilter === "PDFs") return item.type.toLowerCase() === "pdf";
    if (selectedFilter === "Notebooks") return item.type.toLowerCase() === "ipynb" || item.title.toLowerCase().includes("jupyter") || item.title.toLowerCase().includes("colab");
    return true;
  });

  return (
    <div className="w-full space-y-6 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#14B8A6] mb-1">
            <Sparkles className="w-3 h-3 fill-[#14B8A6]" />
            <span>Repository</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Study Materials &amp; Assets
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Access whitepapers, cheat sheets, and code notebooks across your enrolled masterclasses.
          </p>
        </div>

        <div className="bg-[#FAFAF7] dark:bg-white/[0.03] px-4 py-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] flex items-center gap-3 self-start md:self-center">
          <FolderOpen className="w-6 h-6 text-[#14B8A6]" />
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#9CA3AF] uppercase block">
              Total Study Resources
            </span>
            <span className="text-sm font-extrabold text-[#111827] dark:text-white">
              {loading ? "Loading..." : `${resources.length} Available Files`}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "PDFs", "Notebooks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5",
                selectedFilter === tab
                  ? "bg-[#8B5CF6] text-white shadow-md"
                  : "bg-white dark:bg-[#14182F] text-[#6B7280] dark:text-[#9CA3AF] border border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6]/50"
              )}
            >
              <span>{tab}</span>
              {tab === "All" && <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full">{resources.length}</span>}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search study guides or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#14182F] border border-[#E7E5F4] dark:border-white/[0.08] text-xs font-medium text-[#111827] dark:text-white placeholder-[#6B7280] focus:outline-hidden focus:ring-2 focus:ring-[#8B5CF6]/50"
          />
        </div>
      </div>

      {/* RESOURCES GRID */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#6B7280] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
          <span className="text-xs font-semibold">Retrieving course study materials...</span>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-12 text-center text-[#6B7280]">
          <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-semibold text-[#111827] dark:text-white">No matching study materials found</p>
          <p className="text-xs mt-1">Try adjusting your keyword filter or switching tabs above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((item) => {
            const isPdf = item.type.toLowerCase() === "pdf";
            const isDownloading = downloadingId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#14182F] rounded-[18px] border border-[#E7E5F4] dark:border-white/[0.08] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider",
                      isPdf ? "bg-[#14B8A6]/15 text-[#14B8A6]" : "bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-violet-300"
                    )}>
                      {item.type.toUpperCase()} &bull; {item.size || "2.1 MB"}
                    </span>
                    <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] truncate max-w-[140px]">
                      {item.course?.title || "Masterclass Resource"}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                      isPdf ? "bg-emerald-500/10 text-emerald-500" : "bg-violet-500/10 text-violet-500"
                    )}>
                      {isPdf ? <FileText className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#111827] dark:text-white font-heading leading-tight group-hover:text-[#8B5CF6] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1 line-clamp-2">
                        {item.moduleTitle || "Module Reference Documentation"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS ROW */}
                <div className="pt-3 border-t border-[#E7E5F4] dark:border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewResource(item)}
                    className="flex-1 py-2 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] hover:bg-[#E7E5F4]/50 dark:hover:bg-white/[0.08] text-[#111827] dark:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-[#E7E5F4] dark:border-white/[0.08]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    disabled={isDownloading}
                    onClick={() => handleDownload(item)}
                    className="flex-1 py-2 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{isDownloading ? "Fetching..." : "Download"}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {previewResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewResource(null)}
              className="fixed inset-0 bg-[#060816]/70 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#14182F] rounded-2xl p-6 shadow-2xl border border-[#E7E5F4] dark:border-white/[0.15] flex flex-col gap-5 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#8B5CF6]" />
                  <h3 className="text-base font-bold text-[#111827] dark:text-white font-heading">
                    {previewResource.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewResource(null)}
                  className="p-1.5 text-[#6B7280] hover:text-[#111827] dark:hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 min-h-[300px] max-h-[500px] overflow-y-auto rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.06] p-6 font-mono text-xs text-[#374151] dark:text-[#E5E7EB] space-y-4">
                <div className="text-center pb-4 border-b border-gray-300 dark:border-gray-800">
                  <span className="text-sm font-bold block text-[#8B5CF6] uppercase tracking-wider">{previewResource.course?.title} &bull; {previewResource.moduleTitle}</span>
                  <span className="text-[11px] text-[#6B7280]">File Format: {previewResource.type.toUpperCase()} &bull; Size: {previewResource.size}</span>
                </div>
                <p className="font-sans text-sm font-medium text-[#111827] dark:text-white leading-relaxed">
                  <strong>Overview:</strong> This architectural resource details the foundational mathematical definitions and optimization bounds required for modern production LLM deployment.
                </p>
                <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10">
                  <code>
                    # Core Implementation Snippet<br/>
                    import torch<br/>
                    import torch.nn as nn<br/><br/>
                    class ScaledDotProductAttention(nn.Module):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, temperature, attn_dropout=0.1):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super().__init__()<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.temperature = temperature<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.dropout = nn.Dropout(attn_dropout)<br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;def forward(self, q, k, v, mask=None):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;attn = torch.matmul(q / self.temperature, k.transpose(-2, -1))<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if mask is not None: attn = attn.masked_fill(mask == 0, -1e9)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return torch.matmul(self.dropout(torch.softmax(attn, dim=-1)), v)
                  </code>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setPreviewResource(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/[0.05]"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(previewResource)}
                  className="px-6 py-2 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete {previewResource.type.toUpperCase()}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
