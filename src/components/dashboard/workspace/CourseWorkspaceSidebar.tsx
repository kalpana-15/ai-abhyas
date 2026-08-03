"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ArrowLeft, 
  LayoutDashboard, 
  PlayCircle, 
  Video, 
  FileText, 
  CheckSquare, 
  FolderOpen, 
  Award,
  MoreHorizontal,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface CourseWorkspaceSidebarProps {
  course: {
    id: string;
    title: string;
    image: string;
    instructor?: { name: string };
  };
}

export function CourseWorkspaceSidebar({ course }: CourseWorkspaceSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: `/dashboard/workspace/${course.id}`, icon: LayoutDashboard },
    { name: "Lessons & Modules", href: `/dashboard/workspace/${course.id}/lessons`, icon: PlayCircle },
    { name: "Live Sessions", href: `/dashboard/workspace/${course.id}/live`, icon: Video },
    { name: "Assignments", href: `/dashboard/workspace/${course.id}/assignments`, icon: FileText },
    { name: "Assessments", href: `/dashboard/workspace/${course.id}/assessments`, icon: CheckSquare },
    { name: "Study Resources", href: `/dashboard/workspace/${course.id}/resources`, icon: FolderOpen },
    { name: "Certificate", href: `/dashboard/workspace/${course.id}/certificate`, icon: Award },
  ];

  const renderNavList = (isMobile: boolean = false) => (
    <div className="space-y-1 mt-2">
      {navItems.map((item) => {
        // Precise active matching for Overview vs sub-paths
        const isOverview = item.href === `/dashboard/workspace/${course.id}`;
        const isActive = isOverview ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => isMobile && setMobileMenuOpen(false)}
            className="block"
          >
            <span
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-200 group relative",
                isActive
                  ? "bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#A855F7] font-semibold"
                  : "text-[#6B7280] dark:text-[#9CA3AF] font-normal hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] hover:text-[#111827] dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={isMobile ? "workspace-active-mobile" : "workspace-active"}
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#8B5CF6] rounded-r-full"
                />
              )}
              <item.icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-[#8B5CF6] dark:text-[#A855F7]" : "text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#111827] dark:group-hover:text-white"
                )}
              />
              <span className="truncate">{item.name}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP STICKY SECONDARY SIDEBAR (Visible >= LG)          */}
      {/* ========================================================= */}
      <aside className="w-[270px] bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[16px] shadow-xs transition-all duration-200 hidden lg:flex flex-col shrink-0 sticky top-2 h-[calc(100vh-7rem)] px-3.5 py-4 justify-between overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div>
          {/* Wayfinding Step 1: One-click Back to Dashboard */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors py-1.5 px-2 rounded-lg hover:bg-[#FAFAF7] dark:hover:bg-white/[0.04] mb-3 -ml-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Wayfinding Step 2: Pinned Course Thumbnail & Header */}
          <div className="bg-[#FAFAF7] dark:bg-white/[0.03] border border-[#E7E5F4] dark:border-white/[0.08] rounded-xl p-2.5 mb-4 text-left shadow-2xs">
            <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2 bg-[#1F2937]">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-1.5 left-2 text-[9px] font-extrabold uppercase bg-[#8B5CF6] text-white px-2 py-0.5 rounded-sm shadow-xs">
                Active Workspace
              </span>
            </div>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#111827] dark:text-white font-heading tracking-tight leading-snug line-clamp-2">
              {course.title}
            </h3>
            {course.instructor?.name && (
              <p className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 font-medium">
                Instructor: {course.instructor.name}
              </p>
            )}
          </div>

          <hr className="border-t border-[#E7E5F4] dark:border-white/[0.08] my-2" />

          {/* Navigation Items Scoped ONLY to Course */}
          <div className="py-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] px-3 block mb-1">
              Course Menu
            </span>
            {renderNavList(false)}
          </div>
        </div>

        {/* Quiet footer badge */}
        <div className="pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08] text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">
            <Sparkles className="w-3.5 h-3.5 text-[#DAA520]" />
            <span>AI Abhyas Verified Course</span>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE WORKSPACE BOTTOM NAV (Visible < LG)                */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#14182F]/95 backdrop-blur-lg border-t border-[#E7E5F4] dark:border-white/[0.1] px-2 py-1 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 3).map((item) => {
          const isOverview = item.href === `/dashboard/workspace/${course.id}`;
          const isActive = isOverview ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg transition-colors group"
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform group-active:scale-95",
                  isActive ? "text-[#8B5CF6] dark:text-[#A855F7]" : "text-[#6B7280] dark:text-[#9CA3AF]"
                )}
              />
              <span
                className={cn(
                  "text-[11px] mt-0.5 font-medium truncate max-w-[70px]",
                  isActive ? "text-[#8B5CF6] dark:text-[#A855F7] font-semibold" : "text-[#6B7280] dark:text-[#9CA3AF]"
                )}
              >
                {item.name.split(" ")[0]}
              </span>
            </Link>
          );
        })}

        {/* Back to Dashboard quick mobile icon */}
        <Link
          href="/dashboard"
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#8B5CF6]"
        >
          <ArrowLeft className="w-5 h-5 text-[#DAA520]" />
          <span className="text-[11px] mt-0.5 font-medium text-[#DAA520]">Exit</span>
        </Link>

        {/* More Tab triggering secondary menu sheet */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[11px] mt-0.5 font-medium">Menu</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MOBILE OVERLAY MENU SHEET                                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#060816]/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-[#14182F] rounded-t-2xl shadow-2xl p-5 border-t border-[#E7E5F4] dark:border-white/[0.15] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E7E5F4] dark:border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider block">
                    {course.title}
                  </span>
                  <span className="text-xs font-bold text-[#111827] dark:text-white">
                    Course Navigation Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderNavList(true)}

              <div className="mt-4 pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit to Global Dashboard</span>
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
