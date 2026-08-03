"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Play, Compass, Activity, ArrowUpRight } from "lucide-react";

export function DashboardHero() {
  const { user } = useAuth();
  const displayName = user?.name || "Irham Muhammad Shidiq";

  return (
    <div className="relative w-full rounded-xl sm:rounded-2xl bg-[#0A0D1D] text-white overflow-hidden p-4 sm:p-5 lg:p-6 mb-5 shadow-lg border border-white/[0.1] transition-all duration-200">
      
      {/* Background Architectural Grid & Subtle Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-gradient-to-bl from-violet-600/30 via-indigo-600/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Horizontal layout guaranteed on md breakpoint and up */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 lg:gap-8">
        
        {/* Left Content: Welcome & Actions */}
        <div className="flex-1 min-w-0 pr-0 md:pr-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-violet-300 text-[10px] font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5 text-violet-400 animate-pulse" />
            <span>AI Abhyas &bull; Executive Suite</span>
          </div>

          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-white mb-1.5 font-heading leading-snug">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300">
              {displayName}
            </span>
          </h1>

          <p className="text-zinc-300 text-[11px] sm:text-xs font-normal mb-4 max-w-lg leading-relaxed">
            Your integrated workspace for generative AI mastery. Resume your coursework or launch today&apos;s scheduled live mentor lab environments.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/dashboard/courses"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-[11px] sm:text-xs shadow-sm shadow-violet-600/20 active:scale-95 transition-all duration-150 inline-flex items-center gap-1.5 group"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Resume Active Course</span>
              <span className="group-hover:translate-x-0.5 transition-transform font-bold">&rarr;</span>
            </Link>

            <Link
              href="/courses"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-[11px] sm:text-xs transition-all duration-150 backdrop-blur-md active:scale-95 inline-flex items-center gap-1.5"
            >
              <Compass className="w-3 h-3 text-zinc-300" />
              <span>Explore AI Catalog</span>
            </Link>
          </div>
        </div>

        {/* Right Content: Professional Live Status Widget (Compact & aligned) */}
        <div className="w-full md:w-[260px] lg:w-[280px] shrink-0">
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.1] rounded-xl p-3.5 sm:p-4 w-full shadow-xl relative overflow-hidden group hover:border-violet-500/35 transition-all duration-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-lg pointer-events-none" />
            
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Online Workspaces
                </span>
              </div>
              <Activity className="w-3 h-3 text-zinc-500" />
            </div>

            <div className="space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-wider text-violet-300 block">
                Next Live Cohort Session
              </span>
              <p className="text-[12px] font-bold text-white leading-normal truncate">
                Advanced Prompt Engineering &amp; LLM Fine-Tuning
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-300 font-medium pt-0.5">
                <span className="w-1 h-1 rounded-full bg-fuchsia-400" />
                <span>Starts today at 10:00 AM</span>
              </div>
            </div>

            <Link
              href="/dashboard/live"
              className="w-full py-1.5 px-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-[11px] font-semibold inline-flex items-center justify-between transition-colors group-hover:text-violet-200"
            >
              <span>Enter Live Studio</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
