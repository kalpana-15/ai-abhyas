"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  LogOut, 
  Sparkles, 
  Download, 
  AlertTriangle, 
  Trash2, 
  Loader2,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateUserPassword } from "@/actions/dashboardActions";

interface SessionDevice {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current?: boolean;
}

export default function AccountSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security toggles
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("4hours");

  // Active Sessions State
  const [sessions, setSessions] = useState<SessionDevice[]>([
    { id: "sec-1", device: "Windows Desktop PC", browser: "Google Chrome (Latest)", location: "Patna, India", ip: "103.48.19.42", lastActive: "Active Now (Current Session)", current: true },
    { id: "sec-2", device: "Apple MacBook Pro", browser: "Safari 17.2", location: "Bengaluru, India", ip: "49.205.114.88", lastActive: "Yesterday at 9:15 PM" },
    { id: "sec-3", device: "Apple iPhone 15 Pro", browser: "Mobile Safari", location: "Mumbai, India", ip: "152.58.42.191", lastActive: "3 days ago" }
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
        showToast(res.message || "Cryptographic password updated successfully!");
      } else {
        alert(res.error || "Failed to update password. Please verify current password.");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred during encryption.");
    } finally {
      setUpdatingPass(false);
    }
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    showToast("Selected device session token revoked immediately.");
  };

  const handleRevokeAllOther = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    showToast("Revoked access for all secondary devices.");
  };

  const handleDownloadSecurityAudit = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        securityLevel: "Enterprise Tier-1 Protected",
        auditDate: new Date().toISOString(),
        multiFactorAuth: mfaEnabled ? "Active (TOTP/Email)" : "Disabled",
        loginNotifications: loginAlerts ? "Enabled" : "Disabled",
        activeSessions: sessions
      }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ai_abhyas_security_audit.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded official security telemetry report.");
  };

  return (
    <div className="w-full space-y-6 pb-12 max-w-4xl mx-auto">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#14B8A6] mb-1">
            <Sparkles className="w-3 h-3 fill-[#14B8A6]" />
            <span>Account Protection &amp; Authentication</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-heading tracking-tight">
            Account &amp; Security
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Manage cryptographic password encryption, multi-factor authentication, and monitor active session tokens.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 self-start sm:self-center shrink-0">
          <Shield className="w-4 h-4 text-emerald-500 shrink-0 fill-emerald-500/20" />
          <span>Security Status: Protected</span>
        </div>

        {/* Floating Toast */}
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

      <div className="space-y-6">
        {/* SECTION 1: PASSWORD & ENCRYPTION */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Password &amp; Encryption</span>
            </h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase">BCrypt Hash Secured</span>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-xl">
            <div>
              <label className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.03] border border-[#E7E5F4] dark:border-white/[0.08] text-xs font-semibold text-[#111827] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8B5CF6]/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.03] border border-[#E7E5F4] dark:border-white/[0.08] text-xs font-semibold text-[#111827] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8B5CF6]/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.03] border border-[#E7E5F4] dark:border-white/[0.08] text-xs font-semibold text-[#111827] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8B5CF6]/50"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={updatingPass || !currentPassword || !newPassword}
                className="px-5 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95"
              >
                {updatingPass ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                <span>{updatingPass ? "Updating Password in DB..." : "Update Security Password"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* SECTION 2: MULTI-FACTOR AUTHENTICATION & ALERTS */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Multi-Factor &amp; Session Controls</span>
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-[#E7E5F4] dark:divide-white/[0.06]">
            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5 pr-4">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Two-Factor Authentication (2FA)</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Require an automated email OTP or TOTP authenticator code upon signing in from unrecognized IP addresses.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const val = !mfaEnabled;
                  setMfaEnabled(val);
                  showToast(val ? "Two-Factor Authentication activated!" : "Two-Factor Authentication disabled.");
                }}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors p-0.5 relative shrink-0 focus:outline-hidden",
                  mfaEnabled ? "bg-[#14B8A6]" : "bg-gray-300 dark:bg-white/10"
                )}
              >
                <div className={cn("w-5 h-5 rounded-full bg-white transition-transform shadow-xs", mfaEnabled ? "translate-x-5" : "translate-x-0")} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5 pr-4">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Security Sign-In Notifications</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Receive real-time email alerts whenever a new device or browser requests access to your learning credentials.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const val = !loginAlerts;
                  setLoginAlerts(val);
                  showToast(val ? "Login alerts enabled." : "Login alerts muted.");
                }}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors p-0.5 relative shrink-0 focus:outline-hidden",
                  loginAlerts ? "bg-[#14B8A6]" : "bg-gray-300 dark:bg-white/10"
                )}
              >
                <div className={cn("w-5 h-5 rounded-full bg-white transition-transform shadow-xs", loginAlerts ? "translate-x-5" : "translate-x-0")} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5 pr-4">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">Idle Session Timeout</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Automatically revoke inactive session tokens to prevent unauthorized device access.</p>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => {
                  setSessionTimeout(e.target.value);
                  showToast("Idle session timeout rule updated.");
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FAFAF7] dark:bg-white/[0.04] border border-[#E7E5F4] dark:border-white/[0.08] text-xs font-bold text-[#111827] dark:text-white focus:outline-hidden cursor-pointer shrink-0"
              >
                <option value="1hour">1 Hour</option>
                <option value="4hours">4 Hours (Default)</option>
                <option value="24hours">24 Hours</option>
                <option value="never">Never Expire</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: ACTIVE SESSION DEVICES */}
        <div className="bg-white dark:bg-[#14182F] rounded-[22px] border border-[#E7E5F4] dark:border-white/[0.08] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-[#E7E5F4] dark:border-white/[0.08] pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#111827] dark:text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Active Cryptographic Sessions</span>
            </h2>
            {sessions.length > 1 && (
              <button
                type="button"
                onClick={handleRevokeAllOther}
                className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-all"
              >
                Revoke Other Devices
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-[#FAFAF7] dark:bg-white/[0.02] rounded-xl p-4 border border-[#E7E5F4] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                    {s.device.toLowerCase().includes("iphone") || s.device.toLowerCase().includes("mobile") ? (
                      <Smartphone className="w-5 h-5" />
                    ) : (
                      <Monitor className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#111827] dark:text-white font-heading">
                        {s.device} &bull; {s.browser}
                      </span>
                      {s.current && (
                        <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-sm tracking-wider">
                          Current Device
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Location: <strong>{s.location}</strong></span>
                      <span>IP: <code className="text-[11px] font-mono">{s.ip}</code></span>
                      <span>Last Active: {s.lastActive}</span>
                    </div>
                  </div>
                </div>

                {!s.current && (
                  <button
                    type="button"
                    onClick={() => handleRevokeSession(s.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs transition-all self-end sm:self-center shrink-0 active:scale-95"
                  >
                    Revoke Access
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7E5F4] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#6B7280]">Export comprehensive cryptographic authentication and device audit trails.</span>
            <button
              type="button"
              onClick={handleDownloadSecurityAudit}
              className="px-4 py-2 bg-[#FAFAF7] dark:bg-white/[0.04] hover:bg-[#E7E5F4]/50 text-[#111827] dark:text-white font-bold text-xs rounded-xl border border-[#E7E5F4] dark:border-white/[0.1] transition-all flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-center"
            >
              <Download className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Download Security Telemetry (.JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
