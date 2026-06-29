"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Award, Download, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const mockCertificates = [
  { id: "CERT-AI-1049", course: "Generative AI Masterclass", date: "June 15, 2026", skills: ["LLMs", "Prompt Engineering", "Fine-Tuning"] },
  { id: "CERT-DS-8821", course: "Python for Data Science", date: "May 22, 2026", skills: ["Python", "Pandas", "Data Visualization"] },
  { id: "CERT-ML-5093", course: "Introduction to Machine Learning", date: "April 10, 2026", skills: ["Regression", "Classification", "Scikit-Learn"] },
];

export default function CertificatesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">My Certificates</h1>
          <p className="text-muted-foreground">View, download, and share your verified course completion certificates.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-500/10 px-4 py-2 rounded-xl">
          <ShieldCheck className="w-4 h-4" /> 100% Industry Verified
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCertificates.map(cert => (
          <div key={cert.id} className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            
            {/* Certificate Preview Thumbnail */}
            <div className="aspect-[4/3] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 relative border-b border-border flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <Award className="w-12 h-12 text-primary mb-2 opacity-80" />
              <h4 className="font-heading font-bold text-gray-900 dark:text-white text-sm uppercase tracking-widest opacity-60">Certificate of Completion</h4>
              <p className="text-xs text-muted-foreground mt-4">Presented to</p>
              <p className="font-bold text-lg text-primary font-heading mt-1">{user.name}</p>
              <p className="text-xs text-muted-foreground mt-4">For successfully completing</p>
              <p className="font-semibold text-sm text-foreground mt-1 line-clamp-2">{cert.course}</p>
              
              <div className="absolute bottom-4 left-4 text-[9px] text-muted-foreground font-mono">
                ID: {cert.id}
              </div>
              <div className="absolute bottom-4 right-4 text-[9px] text-muted-foreground">
                {cert.date}
              </div>
            </div>

            {/* Details & Actions */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-foreground mb-1 line-clamp-1" title={cert.course}>{cert.course}</h3>
              <p className="text-xs text-muted-foreground mb-4">Issued: {cert.date}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {cert.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-muted text-foreground text-[10px] font-semibold rounded-md border border-border/50">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground py-2 rounded-lg text-xs font-semibold transition-colors">
                  <Share2 className="w-4 h-4" /> LinkedIn
                </button>
              </div>
            </div>

          </div>
        ))}

        {mockCertificates.length === 0 && (
          <div className="col-span-full py-20 text-center bg-card border border-border rounded-3xl">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground">Complete courses to earn your verified industry certificates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
