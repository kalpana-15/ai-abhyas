"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, Settings, Shield, HelpCircle, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "#training", label: "Training Modes" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 w-full bg-white/90 dark:bg-[#14182F]/90 backdrop-blur-md border-b border-[#E7E5F4] dark:border-white/[0.1] shadow-xs h-16 md:h-18 lg:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      
      {/* Left Group: Mobile Hamburger, Logo & Site Navigation */}
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-10 xl:gap-12 min-w-0">
        
        {/* Dedicated Mobile Sidebar Toggle (Visible exclusively below LG monitors) */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] rounded-lg transition-colors shrink-0"
            aria-label="Toggle Dashboard Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link href="/" className="flex items-center shrink-0">
          <Logo className="h-6 md:h-7 lg:h-8 w-auto transition-all" />
        </Link>

        {/* Desktop Site Navigation Links */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.label === "Training Modes" ? (
                  <div className="relative group/dropdown">
                    <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors py-2 focus:outline-none">
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/dropdown:-rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 invisible group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-150 w-48 z-50">
                      <div className="bg-white dark:bg-[#14182F] backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-xl shadow-lg p-1.5 flex flex-col">
                        <Link 
                          href="/courses?mode=online#course-catalog" 
                          className="text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] hover:text-[#8B5CF6] dark:hover:text-[#A855F7] hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] px-3 py-2 rounded-lg transition-all w-full text-left"
                        >
                          Online Courses
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={link.href} 
                    className="text-sm font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right side actions: Theme Toggle, Notifications, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Link 
          href="/dashboard/notifications" 
          aria-label="View Notifications"
          className="relative p-2 text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-white hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] rounded-full transition-colors flex items-center justify-center"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B5CF6] rounded-full ring-2 ring-white dark:ring-[#14182F]" />
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] border border-transparent hover:border-[#E7E5F4] dark:hover:border-white/[0.1] transition-all"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#A855F7] overflow-hidden flex items-center justify-center font-semibold text-sm shrink-0 border border-[#8B5CF6]/20">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name?.charAt(0) || "U"}</span>
              )}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-xs font-semibold text-[#111827] dark:text-white leading-none truncate max-w-[110px]">{user?.name || "Student"}</span>
              <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{user?.role || "Learner"}</span>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#14182F] rounded-xl shadow-xl border border-[#E7E5F4] dark:border-white/[0.1] p-1.5 z-50 animate-in fade-in duration-150">
                <Link 
                  href="/dashboard/profile" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-[#6B7280]" /> Profile settings
                </Link>
                <Link 
                  href="/dashboard/security" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4 text-[#6B7280]" /> Account & security
                </Link>
                <Link 
                  href="/dashboard/support" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] hover:bg-[#FAFAF7] dark:hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#6B7280]" /> Help & support
                </Link>
                
                <hr className="border-t border-[#E7E5F4] dark:border-white/[0.08] my-1 mx-2" />
                
                <button 
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
