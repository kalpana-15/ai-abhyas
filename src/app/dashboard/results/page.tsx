"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, TrendingUp, Award, BookOpen } from "lucide-react";

const mockResults = [
  { course: "Generative AI Masterclass", score: 94, grade: "A", date: "June 15, 2026" },
  { course: "Python for Data Science", score: 88, grade: "B+", date: "May 22, 2026" },
  { course: "Introduction to Machine Learning", score: 98, grade: "A+", date: "April 10, 2026" },
];

export default function ResultsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Performance Results</h1>
        <p className="text-muted-foreground">View your academic transcripts and detailed performance analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
        <div className="bg-gradient-to-br from-[#5E35B1] to-[#4527A0] text-white border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-8 -mt-8" />
          <p className="text-sm font-medium text-white/80 relative z-10">Overall CGPA</p>
          <h4 className="text-3xl font-bold mt-2 relative z-10">3.8<span className="text-lg text-white/60">/4.0</span></h4>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
              <h4 className="text-2xl font-bold text-foreground">24</h4>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Highest Score</p>
              <h4 className="text-2xl font-bold text-foreground">98%</h4>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
              <h4 className="text-2xl font-bold text-foreground">3</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mt-4">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Grade Book
          </h2>
          <button className="text-sm text-primary font-medium hover:underline">Download Transcript PDF</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-semibold">Course Name</th>
                <th className="p-4 font-semibold">Completion Date</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockResults.map((res, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{res.course}</td>
                  <td className="p-4 text-muted-foreground text-sm">{res.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${res.score >= 90 ? 'bg-emerald-500' : 'bg-primary'}`} 
                          style={{ width: `${res.score}%` }} 
                        />
                      </div>
                      <span className="text-sm font-semibold">{res.score}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      res.grade.includes('A') ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {res.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
