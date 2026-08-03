"use client";

import React from "react";
import { Check } from "lucide-react";

export interface EnrollmentStepperProps {
  currentStep: number; // 1 to 4
  onStepClick?: (step: number) => void;
}

const steps = [
  { id: 1, title: "Student details", label: "01" },
  { id: 2, title: "Review order", label: "02" },
  { id: 3, title: "Secure payment", label: "03" },
  { id: 4, title: "Course access", label: "04" },
];

export function EnrollmentStepper({ currentStep, onStepClick }: EnrollmentStepperProps) {
  return (
    <div className="w-full mb-8">
      {/* Desktop & Tablet Sleek Connected Progression Bar */}
      <div className="hidden md:flex items-center justify-between py-3 px-6 bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-xl shadow-xs">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div
                onClick={() => {
                  if (isCompleted && onStepClick) onStepClick(step.id);
                }}
                className={`flex items-center gap-2.5 transition-all duration-200 select-none ${
                  isCompleted ? "cursor-pointer hover:opacity-80" : ""
                }`}
              >
                {/* Step Circle indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-[11px] transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#111827] dark:bg-white text-white dark:text-[#111827]"
                      : isCurrent
                      ? "bg-[#8B5CF6] text-white ring-4 ring-[#8B5CF6]/15"
                      : "bg-[#F3F4F6] dark:bg-[#1F2937] text-[#6B7280] dark:text-[#9CA3AF]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Step Text */}
                <span
                  className={`text-sm tracking-normal font-semibold truncate ${
                    isCurrent || isCompleted
                      ? "text-[#111827] dark:text-white"
                      : "text-[#6B7280] dark:text-[#9CA3AF] font-normal"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting Divider Line between steps */}
              {!isLast && (
                <div className="flex-1 h-px mx-4 bg-[#E7E5F4] dark:bg-white/[0.1] min-w-[20px]" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Compact Status & Progress Track */}
      <div className="block md:hidden bg-white dark:bg-[#14182F] border border-[#E7E5F4] dark:border-white/[0.1] rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-[#8B5CF6]">Step {currentStep} of {steps.length}</span>
          <span className="text-[#111827] dark:text-white">{steps[currentStep - 1]?.title}</span>
        </div>
        
        {/* Progress bar track */}
        <div className="w-full h-1.5 bg-[#F3F4F6] dark:bg-[#1F2937] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8B5CF6] transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
