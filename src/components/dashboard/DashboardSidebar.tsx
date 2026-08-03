"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  X, 
  MoreHorizontal,
  Compass,
  Home,
  Info,
  Laptop,
  FileText,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

// Explore navigation items (For mobile view inside hamburger)
const exploreNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Courses", href: "/courses", icon: Compass },
  { name: "Training Modes", href: "/courses?mode=online#course-catalog", icon: Laptop },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Contact Us", href: "/contact", icon: MessageSquare },
];

// Primary top navigation items in Global Sidebar (strictly user-level, spans all courses)
const primaryNavItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Learning", href: "/dashboard/courses", icon: BookOpen },
  { name: "Browse Catalog", href: "/courses", icon: Compass },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Billing", href: "/dashboard/payments", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Bottom auxiliary section
const bottomNavItems = [
  { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
];

export interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ isOpen = false, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // Strict Information Architecture rule: hide Global Sidebar inside Course Workspace routes
  if (pathname.includes("/workspace/")) {
    return null;
  }

  const handleLinkClick = (isMobile: boolean = false) => {
    if (isMobile) {
      if (onClose) onClose();
      setMobileMoreOpen(false);
    }
  };

  const renderNavLinks = (items: typeof primaryNavItems, isMobile: boolean = false) => (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard" && item.href !== "/courses" && item.href !== "/");
        return (
          <Link 
            key={`${item.name}-${item.href}`} 
            href={item.href}
            onClick={() => handleLinkClick(isMobile)}
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
                  layoutId={isMobile ? `sidebar-active-mobile-${item.name}` : `sidebar-active-${item.name}`}
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#8B5CF6] rounded-r-full"
                />
              )}
              <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-[#8B5CF6] dark:text-[#A855F7]" : "text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#111827] dark:group-hover:text-white")} />
              <span className="truncate">{item.name}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );

  const renderBottomControls = (isMobile: boolean = false) => (
    <div className="pt-2 border-t border-[#E7E5F4] dark:border-white/[0.08] space-y-1">
      {renderNavLinks(bottomNavItems, isMobile)}
      <button
        type="button"
        onClick={() => {
          handleLinkClick(isMobile);
          logout();
        }}
        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] text-[#EF4444] hover:bg-[#EF4444]/10 font-normal transition-all duration-200 text-left"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        <span className="truncate">Logout</span>
      </button>
    </div>
  );

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP PERSISTENT STICKY SIDEBAR (Visible >= LG)         */}
      {/* ========================================================= */}
      <aside className="w-[260px] xl:w-[270px] bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[16px] shadow-xs transition-all duration-200 hidden lg:flex flex-col shrink-0 sticky top-[5.5rem] h-[calc(100vh-6.5rem)] my-6 ml-4 lg:ml-8 px-3 py-4 justify-between overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 justify-between overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] px-3.5 mb-2 block">
              Global Dashboard
            </span>
            {renderNavLinks(primaryNavItems, false)}
          </div>
          <div className="space-y-2 mt-4">
            {renderBottomControls(false)}
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE BOTTOM TAB BAR (Visible < LG monitors per spec)    */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#14182F]/95 backdrop-blur-lg border-t border-[#E7E5F4] dark:border-white/[0.1] px-2 py-1.5 flex items-center justify-around shadow-lg">
        {primaryNavItems.slice(0, 3).map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard" && item.href !== "/courses" && item.href !== "/");
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg transition-colors group"
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-active:scale-95", isActive ? "text-[#8B5CF6] dark:text-[#A855F7]" : "text-[#6B7280] dark:text-[#9CA3AF]")} />
              <span className={cn("text-[11px] mt-0.5 font-medium truncate max-w-[75px]", isActive ? "text-[#8B5CF6] dark:text-[#A855F7] font-semibold" : "text-[#6B7280] dark:text-[#9CA3AF]")}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Profile tab */}
        <Link 
          href="/dashboard/profile"
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg transition-colors group"
        >
          <User className={cn("w-5 h-5 transition-transform group-active:scale-95", pathname === "/dashboard/profile" ? "text-[#8B5CF6] dark:text-[#A855F7]" : "text-[#6B7280] dark:text-[#9CA3AF]")} />
          <span className={cn("text-[11px] mt-0.5 font-medium", pathname === "/dashboard/profile" ? "text-[#8B5CF6] dark:text-[#A855F7] font-semibold" : "text-[#6B7280] dark:text-[#9CA3AF]")}>
            Profile
          </span>
        </Link>

        {/* More Tab triggering secondary sheet */}
        <button
          type="button"
          onClick={() => setMobileMoreOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[11px] mt-0.5 font-medium">More</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MOBILE OVERLAY DRAWER (Triggered by Header Hamburger or 'More' Tab) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {(isOpen || mobileMoreOpen) && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (onClose) onClose();
                setMobileMoreOpen(false);
              }}
              className="fixed inset-0 bg-[#060816]/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-in Overlay Drawer */}
            <motion.aside
              initial={{ x: isOpen ? "-100%" : 0, y: mobileMoreOpen ? "100%" : 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: isOpen ? "-100%" : 0, y: mobileMoreOpen ? "100%" : 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={cn(
                "relative bg-white dark:bg-[#14182F] shadow-2xl p-4 flex flex-col justify-between overflow-y-auto border-[#E7E5F4] dark:border-white/[0.15]",
                isOpen ? "w-[280px] sm:w-[300px] h-full border-r" : "w-full rounded-t-2xl max-h-[85vh] fixed bottom-0 left-0 right-0 border-t"
              )}
            >
              <div>
                {/* Drawer Top Header & Close Button */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E7E5F4] dark:border-white/[0.08]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                    {mobileMoreOpen ? "More Options" : "Navigation"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (onClose) onClose();
                      setMobileMoreOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Top Section: Explore Links (In Hamburger for Mobile) */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] dark:text-[#A855F7] px-3.5 mb-1.5 block">
                    Explore Site
                  </span>
                  {renderNavLinks(exploreNavItems, true)}
                </div>

                {/* Bottom Section: Global Dashboard Items */}
                <div className="pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] px-3.5 mb-1.5 block">
                    Global Dashboard
                  </span>
                  {renderNavLinks(primaryNavItems, true)}
                </div>

                <div className="mt-4">
                  {renderBottomControls(true)}
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
