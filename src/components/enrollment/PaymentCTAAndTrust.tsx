"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, RefreshCw } from "lucide-react";

export interface PaymentCTAAndTrustProps {
  onProceed: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isProcessing?: boolean;
  amountText?: string;
  isFree?: boolean;
  disabled?: boolean;
}

export function PaymentCTAAndTrust({
  onProceed,
  isProcessing = false,
  amountText = "₹4,499",
  isFree = false,
  disabled = false,
}: PaymentCTAAndTrustProps) {
  return (
    <div className="mt-0">
      {/* Primary Payment CTA Button */}
      <motion.button
        type="button"
        onClick={onProceed}
        disabled={isProcessing || disabled}
        whileHover={isProcessing || disabled ? {} : { scale: 1.005, y: -1 }}
        whileTap={isProcessing || disabled ? {} : { scale: 0.99 }}
        className={`w-full py-3.5 px-6 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm sm:text-base tracking-normal flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md shadow-[#8B5CF6]/20 disabled:opacity-75 disabled:pointer-events-none group`}
      >
        {isProcessing ? (
          <div className="flex items-center gap-2.5 py-0.5">
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
            <span>Preparing secure checkout...</span>
          </div>
        ) : (
          <>
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              {isFree ? "Activate Free Lifetime Access" : `Proceed to Payment (${amountText})`}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </motion.button>
    </div>
  );
}
