"use client";

import React from "react";
import { BookOpen, CheckCircle, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function StatsRow({ enrolledCount }: { enrolledCount: number }) {
  const stats = [
    {
      title: "Enrolled Courses",
      value: enrolledCount,
      subtitle: `${enrolledCount} in progress`,
      icon: BookOpen,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Completed Courses",
      value: 1, // Dummy data
      subtitle: "Keep it up!",
      icon: CheckCircle,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Certificates Earned",
      value: 2, // Dummy data
      subtitle: (
        <Link href="/dashboard/certificates" className="text-primary hover:underline flex items-center gap-1">
          View Certificates &rarr;
        </Link>
      ),
      icon: Award,
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-500 dark:text-orange-400",
    },
    {
      title: "Learning Hours",
      value: 56, // Dummy data
      subtitle: "This Month: 12h",
      icon: Clock,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx }}
          className="bg-card rounded-[20px] p-5 border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-foreground leading-tight">{stat.value}</h3>
            <div className="text-[11px] text-muted-foreground mt-0.5">{stat.subtitle}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
