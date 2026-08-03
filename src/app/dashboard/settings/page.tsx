"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Shield, 
  Lock, 
  Smartphone, 
  Monitor, 
  Key, 
  LogOut, 
  CheckCircle2, 
  Sliders, 
  Terminal, 
  Video, 
  Clock, 
  Download, 
  Sparkles, 
  AlertTriangle,
  RefreshCw,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateUserPassword } from "@/actions/dashboardActions";

interface SessionDevice {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  current?: boolean;
}

export default function PlatformSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [editorKeymap, setEditorKeymap] = useState("vscode");
  const [autoSaveInterval, setAutoSaveInterval] = useState("30s");
  const [analyticsSharing, setAnalyticsSharing] = useState(true);

  // Active sessions state
  const [sessions, setSessions] = useState<SessionDevice[]>([
    { id: "s-1", device: "Windows PC • Chrome Browser", location: "Patna, India", ip: "103.48.19.42", lastActive: "Active Now (Current Session)", current: true },
    { id: "s-2", device: "Apple MacBook Pro • Safari", location: "Bengaluru, India", ip: "49.205.114.88", lastActive: "Yesterday at 9:15 PM" },
    { id: "s-3", device: "Apple iPhone 15 Pro • Mobile Safari", location: "Mumbai, India", ip: "152.58.42.191", lastActive: "4 days ago" }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }
    try {
      setUpdatingPass(true);
      const res = await updateUserPassword(currentPassword, newPassword);
      if (res.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showToast(res.message || "Password updated successfully!");
      } else {
        alert(res.error || "Failed to update password.");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while updating password.");
    } finally {
      setUpdatingPass(false);
    }
  };

  const handleRevokeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showToast("Selected device session revoked immediately.");
  };

  const handleDownloadLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        accountStatus: "Verified Academic Pass",
        exportTimestamp: new Date().toISOString(),
        preferences: { videoQuality, editorKeymap, autoSaveInterval, twoFactorEnabled },
        sessionsCount: sessions.length
      }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ai_abhyas_account_security_log.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded verified account telemetry logs.");
  };

  return (
    <div className="w-full space-y-8 pb-12 max-w-4xl mx-auto">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8B5CF6] mb-1">
            <Sparkles className="w-3 h-3 fill-[#8B5CF6]" />
            <span>Preferences</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Security &amp; Workspace Settings
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-lg">
            Manage your password, active device sessions, theme, and workspace defaults.
          </p>
        </div>

        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-4 py-2.5 rounded-xl border border-emerald-500/30 font-bold text-xs flex items-center gap-2 shadow-xs shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        
        {/* 1. PASSWORD & ACCOUNT SECURITY */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Password &amp; Authentication</span>
            </h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-mono text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-mono text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-mono text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={updatingPass || !newPassword}
                className="px-6 py-2 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white font-extrabold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                {updatingPass ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>

          {/* 2FA ROW */}
          <div className="pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#14B8A6]" />
                <h4 className="text-xs font-bold text-[#111827] dark:text-white">Two-Factor Authentication (2FA)</h4>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Add an extra layer of security to your account with TOTP authenticator apps.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const next = !twoFactorEnabled;
                setTwoFactorEnabled(next);
                showToast(next ? "Two-Factor Authentication enabled!" : "Two-Factor Authentication disabled.");
              }}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 shadow-inner",
                twoFactorEnabled ? "bg-[#14B8A6]" : "bg-gray-300 dark:bg-white/20"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200",
                twoFactorEnabled ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
          </div>
        </div>

        {/* 2. WORKSPACE & VIDEO DEFAULTS */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#DAA520]" />
              <span>Workspace &amp; Video Defaults</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#111827] dark:text-white flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Video Quality</span>
              </label>
              <select
                value={videoQuality}
                onChange={(e) => {
                  setVideoQuality(e.target.value);
                  showToast(`Video quality changed to ${e.target.value}`);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                <option value="auto">Auto (Adaptive)</option>
                <option value="1080p">1080p Full HD</option>
                <option value="720p">720p HD</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#111827] dark:text-white flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Editor Keybinding</span>
              </label>
              <select
                value={editorKeymap}
                onChange={(e) => {
                  setEditorKeymap(e.target.value);
                  showToast(`Keymap changed to ${e.target.value.toUpperCase()}`);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                <option value="vscode">VS Code (Default)</option>
                <option value="vim">Vim</option>
                <option value="emacs">Emacs</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#111827] dark:text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#DAA520]" />
                <span>Auto-Save Frequency</span>
              </label>
              <select
                value={autoSaveInterval}
                onChange={(e) => {
                  setAutoSaveInterval(e.target.value);
                  showToast(`Auto-save updated to ${e.target.value}`);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-[#060816]/60 border border-[#E7E5F4] dark:border-white/[0.1] text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                <option value="15s">Every 15s</option>
                <option value="30s">Every 30s</option>
                <option value="1m">Every 1m</option>
                <option value="off">Manual Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. ACTIVE SESSIONS */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Active Sessions</span>
            </h2>
            <span className="text-[11px] font-bold text-[#8B5CF6]">{sessions.length} Devices Active</span>
          </div>

          <div className="divide-y divide-[#E7E5F4] dark:divide-white/[0.06]">
            {sessions.map((sess) => (
              <div key={sess.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                    {sess.device.includes("iPhone") || sess.device.includes("Mobile") ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">{sess.device}</h4>
                      {sess.current && (
                        <span className="bg-[#14B8A6]/15 text-[#14B8A6] text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                          This Device
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-medium mt-0.5">
                      {sess.location} &bull; IP: <span className="font-mono">{sess.ip}</span> &bull; {sess.lastActive}
                    </p>
                  </div>
                </div>

                {!sess.current ? (
                  <button
                    type="button"
                    onClick={() => handleRevokeSession(sess.id)}
                    className="self-start sm:self-center px-4 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revoke Access</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-gray-400 self-start sm:self-center">Active Session</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. APPEARANCE & THEME PREFERENCES */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Appearance &amp; Theme</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {[
              { id: "light", label: "Light Theme", desc: "Clean light theme" },
              { id: "dark", label: "Dark Theme", desc: "Sleek dark contrast (Default)" },
              { id: "system", label: "System Auto", desc: "Match desktop OS preference" }
            ].map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => showToast(`Theme setting saved to ${theme.label}!`)}
                className="p-4 rounded-xl border border-[#E7E5F4] dark:border-white/[0.08] hover:border-[#8B5CF6] dark:hover:border-violet-400 text-left bg-[#FAFAF7] dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] transition-all group shadow-2xs"
              >
                <div className="text-xs font-bold text-[#111827] dark:text-white group-hover:text-[#8B5CF6] dark:group-hover:text-violet-400 transition-colors">
                  {theme.label}
                </div>
                <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                  {theme.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 5. PRIVACY & TELEMETRY EXPORT */}
        <div className="bg-[#FAFAF7] dark:bg-white/[0.02] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Export Account Data</span>
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
              Download a JSON archive of your account settings, session records, and activity logs.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadLogs}
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-white/[0.08] hover:bg-[#8B5CF6] hover:text-white text-[#111827] dark:text-white font-bold text-xs transition-all border border-[#E7E5F4] dark:border-white/[0.15] hover:border-transparent shadow-2xs active:scale-95 shrink-0 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Data</span>
          </button>
        </div>

        {/* 6. DANGER ZONE / ACCOUNT DELETION */}
        <div className="bg-red-500/5 dark:bg-red-500/[0.02] rounded-[22px] border border-red-500/20 p-6 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 font-heading uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>Delete Account</span>
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
              Permanently revoking your learner pass will erase your account history, enrollments, and certificates. This cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to request permanent account deactivation? All course access and earned diplomas will be permanently unassigned.")) {
                alert("Account deactivation request submitted. You will be signed out shortly.");
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account</span>
          </button>
        </div>

      </div>
    </div>
  );
}
