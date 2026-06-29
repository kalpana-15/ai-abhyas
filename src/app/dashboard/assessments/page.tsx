"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import assessmentsData from "@/data/dashboard-assessments.json";
import { CheckSquare, Clock, AlertCircle, PlayCircle, CheckCircle2 } from "lucide-react";

export default function AssessmentsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Assessments & Quizzes</h1>
        <p className="text-muted-foreground">Track your pending assignments, upcoming quizzes, and past scores.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        {/* Quick Stats */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <h4 className="text-2xl font-bold text-foreground">3</h4>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <h4 className="text-2xl font-bold text-foreground">12</h4>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
              <h4 className="text-2xl font-bold text-foreground">92%</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold font-heading text-foreground">Pending Assessments</h2>
        </div>
        <div className="divide-y divide-border">
          {assessmentsData.map((assessment, idx) => (
            <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">{assessment.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Due: {assessment.dueDate}</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 text-xs font-semibold">
                      {assessment.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shrink-0">
                <PlayCircle className="w-4 h-4" /> Start Now
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
