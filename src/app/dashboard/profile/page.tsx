"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Camera, Mail, Phone, MapPin, Briefcase, Link as LinkIcon, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your personal information, security preferences, and public profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Profile Sidebar */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-3xl p-6 text-center shadow-sm relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-muted border-4 border-background shadow-md overflow-hidden relative group">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-xl text-foreground mt-4 font-heading">{user.name}</h3>
            <p className="text-sm text-primary font-medium mt-1">{user.role}</p>
            <p className="text-xs text-muted-foreground mt-2 px-4">Joined in May 2026. Enrolled in multiple AI courses.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <button 
              onClick={() => setActiveTab("personal")}
              className={`w-full text-left px-5 py-3.5 text-sm font-semibold transition-colors flex items-center gap-3 border-b border-border ${activeTab === 'personal' ? 'bg-primary/5 text-primary border-l-4 border-l-primary' : 'text-foreground hover:bg-muted border-l-4 border-l-transparent'}`}
            >
              <User className="w-4 h-4" /> Personal Information
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full text-left px-5 py-3.5 text-sm font-semibold transition-colors flex items-center gap-3 ${activeTab === 'security' ? 'bg-primary/5 text-primary border-l-4 border-l-primary' : 'text-foreground hover:bg-muted border-l-4 border-l-transparent'}`}
            >
              <Shield className="w-4 h-4" /> Security & Password
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          {activeTab === "personal" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-xl font-bold font-heading text-foreground mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" defaultValue={user.name} className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" defaultValue={user.email} className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" defaultValue="San Francisco, CA" className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                  </div>
                </div>
                
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bio / Headline</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea rows={3} defaultValue="Aspiring AI Engineer passionate about Generative AI, LLMs, and making technology accessible to everyone." className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground resize-none" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex justify-end gap-4">
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-xl font-bold font-heading text-foreground mb-6">Security Settings</h3>
              
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New Password</label>
                  <input type="password" placeholder="Enter new password" className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
