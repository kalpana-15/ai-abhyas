"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Video, 
  FileText, 
  Trash2, 
  Check, 
  Sparkles, 
  ExternalLink,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: "evaluation" | "course" | "security" | "system";
  timestamp: string;
  read: boolean;
  linkText: string;
  linkUrl: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Capstone Assignment Graded & Verified",
    description: "Your submission for Module 15: Autonomous YouTube Tool-Calling Chatbot has been graded with an evaluated score of 95/100 (A).",
    category: "evaluation",
    timestamp: "10 minutes ago",
    read: false,
    linkText: "View Gradebook",
    linkUrl: "/dashboard/results",
  },
  {
    id: "notif-2",
    title: "New Live Webclass Scheduled",
    description: "Dr. Sarah Chen has scheduled a live interactive office hour: 'LangChain Agent Pipelines & DeepSeek Architecture' for tomorrow at 10:00 AM EST.",
    category: "course",
    timestamp: "2 hours ago",
    read: false,
    linkText: "Register Seat",
    linkUrl: "/dashboard/live",
  },
  {
    id: "notif-3",
    title: "New Device Sign-In Verified",
    description: "We detected a successful sign-in from a Windows PC using Chrome Browser in Patna, India. Your current cryptographic session is active.",
    category: "security",
    timestamp: "Yesterday at 6:45 PM",
    read: true,
    linkText: "Inspect Security",
    linkUrl: "/dashboard/security",
  },
  {
    id: "notif-4",
    title: "Verifiable Diploma Unlocked",
    description: "Congratulations! You have met all academic completion thresholds for Generative AI Engineering Masterclass. Your SHA-256 digital certificate is ready.",
    category: "evaluation",
    timestamp: "3 days ago",
    read: true,
    linkText: "Claim Diploma",
    linkUrl: "/dashboard/certificates",
  },
  {
    id: "notif-5",
    title: "Proctored Exam Benchmark Ready",
    description: "Module 5 Assessment: Prompt Engineering & Guardrails evaluation is unlocked and awaiting your completion in the examinations hub.",
    category: "course",
    timestamp: "5 days ago",
    read: true,
    linkText: "Launch Test",
    linkUrl: "/dashboard/assessments",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "evaluations" | "security">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read!");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("Notification removed from active feed.");
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "unread") return !item.read;
    if (activeTab === "evaluations") return item.category === "evaluation";
    if (activeTab === "security") return item.category === "security" || item.category === "system";
    return true;
  });

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "evaluation":
        return <Award className="w-5 h-5 text-emerald-500" />;
      case "course":
        return <Video className="w-5 h-5 text-[#8B5CF6]" />;
      case "security":
        return <ShieldCheck className="w-5 h-5 text-[#DAA520]" />;
      default:
        return <Bell className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 max-w-4xl mx-auto">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8B5CF6] mb-1">
            <Sparkles className="w-3 h-3 fill-[#8B5CF6]" />
            <span>Activity &amp; Telemetry Feed</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Notifications &amp; Alerts
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Monitor grading evaluations, scheduled webclasses, security check-ins, and earned academic diplomas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {unreadCount > 0 ? (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-[#8B5CF6]/30 hover:border-transparent active:scale-95 shadow-2xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark All Read ({unreadCount})</span>
            </button>
          ) : (
            <div className="px-4 py-2 bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] rounded-xl text-xs font-bold text-[#14B8A6] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>All Up To Date</span>
            </div>
          )}
        </div>

        {/* Floating Toast Notice */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 z-20"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {[
          { id: "all", label: "All Alerts", count: notifications.length },
          { id: "unread", label: "Unread", count: unreadCount },
          { id: "evaluations", label: "Evaluations & Diplomas", count: notifications.filter((n) => n.category === "evaluation").length },
          { id: "security", label: "Security & Access", count: notifications.filter((n) => n.category === "security").length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border",
              activeTab === tab.id
                ? "bg-[#111827] dark:bg-white text-white dark:text-[#111827] border-transparent shadow-xs"
                : "bg-white dark:bg-[#14182F] text-[#6B7280] dark:text-[#9CA3AF] border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6]/50"
            )}
          >
            <span>{tab.label}</span>
            <span className={cn(
              "px-1.5 py-0.2 rounded-md text-[10px]",
              activeTab === tab.id ? "bg-white/20 dark:bg-black/10" : "bg-[#FAFAF7] dark:bg-white/[0.05]"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS FEED */}
      <div className="space-y-3.5">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-[#14182F] rounded-[20px] border border-[#E7E5F4] dark:border-white/[0.08] p-12 text-center text-[#6B7280] dark:text-[#9CA3AF] space-y-2"
            >
              <Bell className="w-10 h-10 mx-auto opacity-30 text-[#8B5CF6]" />
              <p className="text-sm font-bold text-[#111827] dark:text-white">No active notifications in this category</p>
              <p className="text-xs max-w-sm mx-auto">You have reviewed all items in this section. Future updates regarding your masterclasses will appear directly here.</p>
            </motion.div>
          ) : (
            filteredNotifications.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleMarkAsRead(item.id)}
                className={cn(
                  "bg-white dark:bg-[#14182F] rounded-[20px] border p-5 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group cursor-pointer",
                  item.read 
                    ? "border-[#E7E5F4] dark:border-white/[0.08] opacity-85" 
                    : "border-[#8B5CF6]/40 dark:border-violet-500/40 bg-[#FAFAF7]/60 dark:bg-white/[0.02]"
                )}
              >
                {!item.read && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8B5CF6]" />
                )}

                <div className="flex items-start gap-3.5 flex-1 pl-2 sm:pl-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    {getIconForCategory(item.category)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#111827] dark:text-white font-heading tracking-tight">
                        {item.title}
                      </span>
                      {!item.read && (
                        <span className="bg-[#8B5CF6] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400 pt-0.5">
                      <Clock className="w-3 h-3 text-[#DAA520]" />
                      <span>{item.timestamp}</span>
                    </span>
                  </div>
                </div>

                {/* ACTION ROW */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7E5F4] dark:border-white/[0.06] w-full sm:w-auto justify-end">
                  <Link
                    href={item.linkUrl}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(item.id);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.05] hover:bg-[#8B5CF6] hover:text-white text-[#111827] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-[#E7E5F4] dark:border-white/[0.1] hover:border-transparent"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDismiss(item.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                    aria-label="Remove notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
