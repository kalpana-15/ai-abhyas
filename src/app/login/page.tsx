"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { SiGoogle, SiIntel } from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

function LoginContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      login(data.user, redirect || "/dashboard");
    } catch (err) {
      setError("An unexpected network error occurred. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-background flex items-center justify-center p-4 sm:p-8">
      {/* Main Banner Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-card rounded-3xl shadow-2xl dark:shadow-none dark:border dark:border-border overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side (Banner Info & Animation) */}
        <div className="w-full lg:w-1/2 relative bg-transparent dark:bg-transparent border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-border p-6 lg:p-8 flex flex-col justify-between overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

          {/* Top Section: Logo and Back Button */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <Link href="/" className="inline-block">
              <Logo className="h-7 md:h-8 w-auto" />
            </Link>

            <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all group bg-gray-100/50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-white/10 backdrop-blur-sm mt-0.5">
              <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 mt-6 flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight font-heading">
              Learn Smarter.<br />Build the <span className="text-primary dark:text-primary">Future.</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs max-w-[260px] mb-5 leading-relaxed">
              Join thousands of learners mastering AI through hands-on learning and real-world projects.
            </p>

            {/* Feature Cards & Animation Container */}
            <div className="relative">
              {/* Feature Cards */}
              <div className="space-y-2 max-w-[240px] relative z-20">
                
                <div className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm dark:shadow-none">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-gray-800 dark:text-white font-medium text-[11px]">Expert-Led Courses</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[9px]">Industry experts, real-world skills</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm dark:shadow-none">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-gray-800 dark:text-white font-medium text-[11px]">Hands-on Learning</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[9px]">Projects, labs & practical training</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 dark:border-white/5 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm dark:shadow-none">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0 border border-yellow-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-gray-800 dark:text-white font-medium text-[11px]">Recognized Certificates</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[9px]">Boost your career with credentials</p>
                  </div>
                </div>

              </div>

              {/* The existing animation floating on the right */}
              <div className="absolute top-[30%] sm:top-[25%] right-[-80px] sm:right-[-40px] -translate-y-1/2 w-[200px] sm:w-[240px] aspect-square z-10 pointer-events-none opacity-90">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src="/Assets/animations/login.svg" 
                    alt="Login Animation" 
                    fill 
                    className="object-contain drop-shadow-2xl brightness-110"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Logos */}
          <div className="relative z-10 mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
            <p className="text-[9px] text-gray-500 dark:text-gray-400 font-medium mb-2.5">Trusted by learners from</p>
            <div className="flex items-center justify-between gap-2 opacity-90 transition-all duration-300 flex-wrap">
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <svg className="w-[17px] h-[17px]" viewBox="0 0 21 21">
                <path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/>
              </svg>
              <FaAws className="text-[#FF9900] text-[22px]" />
              <SiIntel className="text-[#0071C5] text-[22px]" />
              <span className="text-[#0050AB] dark:text-[#3B82F6] font-black text-[15px] tracking-tighter uppercase" style={{ fontFamily: 'Arial, Helvetica, sans-serif', transform: 'scaleY(1.1)' }}>Tata</span>
            </div>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 relative bg-white dark:bg-card">
          <div className="w-full max-w-[400px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6 text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-foreground font-heading">Welcome Back</h1>
                <p className="text-gray-500 dark:text-muted-foreground text-sm">
                  Enter your verified credentials to access your AI engineering dashboard and masterclass workspace.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block px-4 py-2.5 w-full text-base text-gray-900 dark:text-foreground bg-gray-50 dark:bg-input/50 rounded-xl border border-gray-200 dark:border-border focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 focus:bg-white dark:focus:bg-input transition-colors shadow-sm"
                      placeholder="you@example.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block px-4 py-2.5 w-full text-base text-gray-900 dark:text-foreground bg-gray-50 dark:bg-input/50 rounded-xl border border-gray-200 dark:border-border focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 focus:bg-white dark:focus:bg-input transition-colors shadow-sm"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-foreground transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <div className={`w-4 h-4 rounded border ${rememberMe ? 'bg-primary border-primary' : 'border-gray-300 bg-white dark:border-border dark:bg-input'} transition-colors flex items-center justify-center group-hover:border-primary/60`}>
                         {rememberMe && (
                           <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                         )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-foreground select-none">Remember Me</span>
                  </label>

                  <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <div className="p-3.5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/50 font-medium animate-in fade-in duration-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-6 relative flex items-center justify-center">
                <div className="absolute inset-x-0 h-px bg-gray-200 dark:bg-border" />
                <span className="relative bg-white dark:bg-card px-4 text-xs font-medium text-gray-400 dark:text-muted-foreground uppercase tracking-wider">
                  Or continue with
                </span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-6">
                <button type="button" className="p-2 hover:scale-110 transition-transform focus:outline-none group">
                  <svg className="w-7 h-7 text-gray-700 transition-colors group-hover:text-gray-900" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                
                <button type="button" className="p-2 hover:scale-110 transition-transform focus:outline-none group">
                  <svg className="w-7 h-7" viewBox="0 0 21 21">
                    <path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/>
                  </svg>
                </button>

                <button type="button" className="p-2 hover:scale-110 transition-transform focus:outline-none group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>

              <p className="mt-6 text-center text-gray-500 dark:text-muted-foreground">
                Don't have an account?{" "}
                <Link href={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : "/register"} className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Create Account
                </Link>
              </p>

            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
