"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { FileText, Download, Folder, File, Search, ChevronRight } from "lucide-react";

const mockMaterials = [
  { id: 1, title: "Generative AI Fundamentals - PDF Guide", type: "pdf", size: "2.4 MB", date: "2 days ago", folder: "Core Concepts" },
  { id: 2, title: "Python for Data Science Cheat Sheet", type: "pdf", size: "1.1 MB", date: "5 days ago", folder: "Programming" },
  { id: 3, title: "Neural Networks Architecture Diagram", type: "image", size: "3.5 MB", date: "1 week ago", folder: "Deep Learning" },
  { id: 4, title: "LLM Fine-Tuning Code Examples", type: "code", size: "45 KB", date: "2 weeks ago", folder: "Generative AI" },
  { id: 5, title: "Midterm Exam Preparation Notes", type: "doc", size: "1.8 MB", date: "3 weeks ago", folder: "Exams" },
];

const folders = ["All Materials", "Core Concepts", "Programming", "Deep Learning", "Generative AI", "Exams"];

export default function MaterialsPage() {
  const { user } = useAuth();
  const [activeFolder, setActiveFolder] = React.useState("All Materials");

  if (!user) return null;

  const filteredMaterials = activeFolder === "All Materials" 
    ? mockMaterials 
    : mockMaterials.filter(m => m.folder === activeFolder);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Study Materials</h1>
          <p className="text-muted-foreground">Access and download your course resources, PDFs, and guides.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search materials..." 
            className="w-full md:w-64 pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Folders */}
        <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-4 h-fit">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-3">Folders</h3>
          <div className="space-y-1">
            {folders.map(folder => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                  activeFolder === folder 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className={`w-4 h-4 ${activeFolder === folder ? "text-primary" : "text-muted-foreground"}`} />
                  {folder}
                </div>
                {activeFolder === folder && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Materials List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredMaterials.map(material => (
            <div key={material.id} className="bg-card border border-border hover:border-primary/30 transition-colors rounded-2xl p-4 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">{material.title}</h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span>{material.size}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                  <span>{material.date}</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-colors shrink-0 text-muted-foreground">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border border-border">
              No materials found in this folder.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
