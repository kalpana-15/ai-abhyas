"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, Briefcase, Building, MapPin, Lock, 
  Monitor, Users, Repeat, PlayCircle, BarChart3, Award,
  Brain, Sparkles, Cpu, Database, MessageSquare, Eye, 
  Network, Languages, ChevronDown, EyeOff, Check, CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [learningMode, setLearningMode] = useState("Online");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  const courses = [
    { name: "Artificial Intelligence", icon: <Brain className="w-4 h-4" /> },
    { name: "Generative AI", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Machine Learning", icon: <Cpu className="w-4 h-4" /> },
    { name: "Data Science", icon: <Database className="w-4 h-4" /> },
    { name: "Prompt Engineering", icon: <MessageSquare className="w-4 h-4" /> },
    { name: "Computer Vision", icon: <Eye className="w-4 h-4" /> },
    { name: "AI for Business", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Deep Learning", icon: <Network className="w-4 h-4" /> },
    { name: "NLP", icon: <Languages className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-background flex items-center justify-center p-4 sm:p-8">
      {/* Main Container */}
      <div className="w-full max-w-[1200px] bg-white dark:bg-card rounded-3xl shadow-2xl dark:shadow-none dark:border dark:border-border overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side (35% width) */}
        <div className="w-full lg:w-[35%] relative bg-transparent dark:bg-transparent border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-border p-6 lg:p-8 flex flex-col justify-between overflow-hidden shrink-0">
          {/* Background Glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2" />

          {/* Content Wrapper for Top & Text to keep them grouped at the top */}
          <div className="flex flex-col">
            {/* Top Section: Logo and Back Button */}
            <div className="relative z-10 flex items-start justify-between w-full mb-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.792 0-5.484-.235-8.07-.683-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <div>
                  <span className="block text-lg font-bold font-heading tracking-tight text-gray-900 dark:text-white leading-tight">AI Abhyas</span>
                  <span className="block text-[9px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Learn AI. Build Tomorrow.</span>
                </div>
              </div>

              <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all group bg-gray-100/50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-white/10 backdrop-blur-sm mt-0.5">
                <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back
              </Link>
            </div>

            <div className="relative z-10 mt-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight"
              >
                Start Your AI <br />
                Learning Journey <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Today!</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-gray-600 dark:text-gray-400 mb-0 leading-relaxed"
              >
                Create your account and unlock expert-led courses, hands-on projects and a community built for your growth.
              </motion.p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full flex-1 min-h-[250px] mt-6 flex items-start justify-center pointer-events-none"
          >
            <Image 
              src="/Assets/animations/register.svg" 
              alt="Register Animation" 
              fill 
              className="object-contain object-top drop-shadow-2xl scale-[1.15]"
              priority
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 pt-4 pb-2 mt-4 w-full grid grid-cols-2 gap-2.5"
          >
            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-primary">10k+</span> Learners</span>
            </div>
            
            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Monitor className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-purple-600 dark:text-purple-400">50+</span> Projects</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-indigo-600 dark:text-indigo-400">Expert</span> Mentors</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-emerald-600 dark:text-emerald-400">Verified</span> Certs</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                <PlayCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-rose-600 dark:text-rose-400">100+</span> Hrs Video</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-blue-600 dark:text-blue-400">Top Tech</span> Hiring</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-amber-600 dark:text-amber-400">AI-Powered</span> Platform</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                <Network className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight"><span className="font-bold text-cyan-600 dark:text-cyan-400">Global</span> Community</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 flex items-center w-full mt-auto pt-6 gap-3"
          >
             <Link href="/courses" className="flex-1 flex justify-center items-center py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
               Explore Courses
             </Link>
             <Link href="/contact" className="flex-1 flex justify-center items-center py-2.5 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/10 text-xs font-semibold rounded-xl backdrop-blur-md transition-all active:scale-[0.98]">
               Talk to Adviser
             </Link>
          </motion.div>
        </div>

        {/* Right Side (65% width, Form Area) */}
        <div className="w-full lg:w-[65%] bg-white dark:bg-card p-6 sm:p-10 lg:p-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Join AI Abhyas</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create your learner account and begin your AI journey.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-[11px] font-bold tracking-widest text-primary uppercase mb-5">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  {/* Occupation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Select Occupation</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer outline-none">
                        <option value="" disabled selected className="text-gray-400 dark:bg-card">Choose your occupation</option>
                        <option value="student" className="dark:bg-card">Student</option>
                        <option value="professional" className="dark:bg-card">Working Professional</option>
                        <option value="entrepreneur" className="dark:bg-card">Entrepreneur</option>
                        <option value="other" className="dark:bg-card">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  {/* College/Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">College / Company</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Enter your college or company"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Enter your city"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Learning Mode */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-6">
                <h3 className="text-[11px] font-bold tracking-widest text-primary uppercase mb-5">Preferred Learning Mode</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "Online", icon: <Monitor className="w-5 h-5 mb-1.5" />, title: "Online", desc: "Learn from anywhere" },
                    { id: "Offline", icon: <Users className="w-5 h-5 mb-1.5" />, title: "Offline", desc: "In-class training" },
                    { id: "Hybrid", icon: <Repeat className="w-5 h-5 mb-1.5" />, title: "Hybrid", desc: "Online + Offline" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setLearningMode(mode.id)}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        learningMode === mode.id 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                          : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${learningMode === mode.id ? 'text-primary' : 'text-gray-400'}`}>
                          {mode.icon}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold mb-0.5 ${learningMode === mode.id ? 'text-primary dark:text-primary' : 'text-gray-900 dark:text-white'}`}>
                            {mode.title}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{mode.desc}</p>
                        </div>
                      </div>
                      {/* Custom Radio Dot */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          learningMode === mode.id ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {learningMode === mode.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Interests */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-6">
                <h3 className="text-[11px] font-bold tracking-widest text-primary uppercase mb-5 flex items-center">
                  Course Interests 
                  <span className="text-gray-400 dark:text-gray-500 font-normal normal-case ml-2 text-xs tracking-normal">(Select all that apply)</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {courses.map((course) => {
                    const isSelected = selectedCourses.includes(course.name);
                    return (
                      <button
                        key={course.name}
                        type="button"
                        onClick={() => toggleCourse(course.name)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
                            : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className={isSelected ? 'text-white' : 'text-gray-400'}>{course.icon}</span>
                        {course.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-8 space-y-6">
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    agreed ? 'bg-primary border-primary' : 'border-gray-300 border dark:border-gray-600 group-hover:border-primary/50'
                  }`}>
                    {agreed && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the <Link href="#" className="text-primary hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
                  </span>
                </label>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100"
                  disabled={!agreed}
                >
                  Create Account →
                </button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Login</Link>
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
