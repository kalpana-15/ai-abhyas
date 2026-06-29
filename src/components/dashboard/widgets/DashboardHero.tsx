"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function DashboardHero() {
  const { user } = useAuth();
  const [robotAnimation, setRobotAnimation] = useState(null);

  useEffect(() => {
    fetch("/Assets/animations/Robot Ai chatbot.json")
      .then(res => res.json())
      .then(data => setRobotAnimation(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  const firstName = user?.name?.split(" ")[0] || "Learner";

  return (
    <div className="relative w-full rounded-[24px] bg-gradient-to-r from-[#DFD9FC] via-[#D1C6F8] to-[#AA97F2] dark:from-[#2e2366] dark:via-[#42318c] dark:to-[#5e43cc] overflow-hidden p-8 md:p-10 mb-8 shadow-sm">
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/40 blur-[80px]" />
      <div className="absolute bottom-[-20%] right-[10%] w-[30%] h-[50%] rounded-full bg-purple-500/20 blur-[60px]" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
        
        {/* Left Side text and stats */}
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2 flex items-center gap-2"
          >
            Good Morning, {firstName}! <span>👋</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-700 dark:text-gray-200 text-sm md:text-base mb-8"
          >
            Keep learning, keep growing. You're doing great!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            {/* Learning Streak */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">Learning Streak</p>
                <p className="font-bold text-gray-900 dark:text-white">14 Days</p>
              </div>
            </div>

            <div className="h-10 w-px bg-white/40 dark:bg-white/20 hidden sm:block" />

            {/* Overall Progress */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200 dark:text-gray-500" />
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="100" strokeDashoffset="32" className="text-green-500" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">Overall Progress</p>
                <p className="font-bold text-gray-900 dark:text-white">68%</p>
              </div>
            </div>

            <div className="h-10 w-px bg-white/40 dark:bg-white/20 hidden sm:block" />

            {/* Next Live Class */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">Next Live Class</p>
                <p className="font-bold text-gray-900 dark:text-white leading-tight">Today, 7:00 PM</p>
                <p className="text-[10px] text-gray-700 dark:text-gray-300 font-medium truncate max-w-[120px]">Advanced Prompt Eng...</p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Right Side Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[350px] aspect-[4/3] relative flex items-center justify-center hidden md:flex"
        >
          {robotAnimation ? (
            <Lottie animationData={robotAnimation} loop={true} className="w-full h-full object-contain scale-[1.5]" />
          ) : (
            <div className="w-48 h-48 bg-white/50 rounded-full flex items-center justify-center">Loading...</div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
