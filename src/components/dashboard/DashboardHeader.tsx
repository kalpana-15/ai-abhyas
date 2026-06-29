"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, Search, Settings, Shield, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="h-20 bg-card border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-40">
      
      {/* Mobile Menu Button (if needed) - Left blank for desktop fidelity */}
      <div className="flex-1 lg:hidden">
        {/* Placeholder for mobile hamburger */}
      </div>

      {/* Center Links (Visible on desktop as per design) */}
      <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
        {mainLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center justify-end gap-5 flex-1 lg:flex-none">
        
        {/* Theme Toggle */}
        <div className="flex items-center gap-2 bg-muted rounded-full px-1 py-1">
          <ThemeToggle />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-muted border border-transparent hover:border-border transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                  {user?.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-foreground leading-none">{user?.name}</span>
              <span className="text-[11px] text-muted-foreground">{user?.role || "Student"}</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-border p-2 z-50 py-3">
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-xl transition-colors">
                  <Settings className="w-4 h-4 text-muted-foreground" /> Profile Settings
                </Link>
                <Link href="/dashboard/security" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-xl transition-colors">
                  <Shield className="w-4 h-4 text-muted-foreground" /> Account & Security
                </Link>
                <Link href="/dashboard/support" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-xl transition-colors">
                  <HelpCircle className="w-4 h-4 text-muted-foreground" /> Help & Support
                </Link>
                
                <div className="h-px bg-border my-2 mx-4" />
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </header>
  );
}
