"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="relative inline-flex items-center">
      {/* Light Mode Logo */}
      <img
        src="/Assets/logo-light.png"
        alt="AI Abhyas - AI For Everyone"
        className={cn("h-7 md:h-8 w-auto object-contain drop-shadow-sm block dark:hidden group-hover:scale-105 transition-transform duration-200", className)}
      />
      {/* Dark Mode Logo */}
      <img
        src="/Assets/logo-dark.png"
        alt="AI Abhyas - AI For Everyone"
        className={cn("h-7 md:h-8 w-auto object-contain drop-shadow-sm hidden dark:block group-hover:scale-105 transition-transform duration-200", className)}
      />
    </div>
  );
}
