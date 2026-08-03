"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] dark:bg-[#060816] flex flex-col items-center justify-center p-4 transition-colors duration-200">
        <div className="w-12 h-12 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mb-4 shadow-lg shadow-[#8B5CF6]/20" />
        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
          Verifying secure learner session...
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAFAF7] dark:bg-[#060816] text-[#111827] dark:text-white flex flex-col transition-colors duration-200">
      {/* Top Navbar with mobile hamburger drawer trigger */}
      <DashboardHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {/* Below Header: Sidebar & Main Content */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Responsive Sidebar (Sticky on Desktop, Overlay on Mobile) */}
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area with bottom padding for mobile tab bar */}
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 sm:pb-24 lg:pb-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
            
            {/* Minimal Clean Footer Text */}
            <div className="mt-16 text-center text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] pb-6 border-t border-[#E7E5F4] dark:border-white/[0.08] pt-6">
              &ldquo;The expert in anything was once a beginner.&rdquo; &mdash; Helen Hayes &nbsp;|&nbsp; AI Abhyas Learning Platform
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
