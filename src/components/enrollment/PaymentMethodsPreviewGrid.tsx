"use client";

import React from "react";
import { Shield, Lock } from "lucide-react";

export function PaymentMethodsPreviewGrid() {
  return (
    <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 shadow-sm dark:shadow-none transition-all duration-300">
      
      {/* Security Header */}
      <div className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1 flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-[#111827] dark:text-white stroke-[2]" />
        <span>Razorpay encrypted checkout</span>
      </div>

      <h4 className="text-base font-semibold text-[#111827] dark:text-white mb-1">
        Supported payment methods
      </h4>
      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-4 font-normal">
        Select your preferred mode securely inside the gateway after clicking proceed.
      </p>

      {/* Compact Streamlined Payment Rows (Adjusted height to equal Left Column!) */}
      <div className="space-y-2">
        
        {/* 1. UPI */}
        <div className="border border-[#E7E5F4] dark:border-white/[0.08] rounded-lg p-2.5 px-3 bg-[#FAFAF7]/60 dark:bg-[#060816]/40 flex items-center justify-between gap-2">
          <div className="min-w-0 pr-2">
            <span className="font-semibold text-[13px] sm:text-sm text-[#111827] dark:text-white block truncate">
              UPI & instant apps
            </span>
            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] block truncate font-normal">
              GPay, PhonePe, Paytm, BHIM (Zero fee)
            </span>
          </div>
          <span className="text-[10px] font-semibold bg-[#111827] dark:bg-white text-white dark:text-[#111827] px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wide">
            Popular
          </span>
        </div>

        {/* 2. Credit & Debit Cards */}
        <div className="border border-[#E7E5F4] dark:border-white/[0.08] rounded-lg p-2.5 px-3 bg-[#FAFAF7]/60 dark:bg-[#060816]/40 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="font-semibold text-[13px] sm:text-sm text-[#111827] dark:text-white block truncate">
              Credit & debit cards
            </span>
            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] block truncate font-normal">
              Visa, Mastercard, RuPay, Amex (OTP secured)
            </span>
          </div>
        </div>

        {/* 3. Net Banking */}
        <div className="border border-[#E7E5F4] dark:border-white/[0.08] rounded-lg p-2.5 px-3 bg-[#FAFAF7]/60 dark:bg-[#060816]/40 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="font-semibold text-[13px] sm:text-sm text-[#111827] dark:text-white block truncate">
              Net banking
            </span>
            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] block truncate font-normal">
              HDFC, SBI, ICICI, Axis, Kotak & 45+ partner banks
            </span>
          </div>
        </div>

        {/* 4. Digital Wallets */}
        <div className="border border-[#E7E5F4] dark:border-white/[0.08] rounded-lg p-2.5 px-3 bg-[#FAFAF7]/60 dark:bg-[#060816]/40 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="font-semibold text-[13px] sm:text-sm text-[#111827] dark:text-white block truncate">
              Digital wallets
            </span>
            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] block truncate font-normal">
              Paytm Wallet, Amazon Pay, Mobikwik
            </span>
          </div>
        </div>

        {/* 5. EMI & Pay Later */}
        <div className="border border-[#E7E5F4] dark:border-white/[0.08] rounded-lg p-2.5 px-3 bg-[#FAFAF7]/60 dark:bg-[#060816]/40 flex items-center justify-between gap-2">
          <div className="min-w-0 pr-2">
            <span className="font-semibold text-[13px] sm:text-sm text-[#111827] dark:text-white block truncate">
              Installments & EMI
            </span>
            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] block truncate font-normal">
              Flexible 3, 6, 9, 12 month card tenure plans
            </span>
          </div>
          <span className="text-[10px] font-semibold bg-[#F3F4F6] dark:bg-[#1F2937] text-[#374151] dark:text-[#E5E7EB] px-2 py-0.5 rounded-md shrink-0 border border-[#E7E5F4] dark:border-white/[0.1]">
            From ₹999/mo
          </span>
        </div>

      </div>

      {/* Security Disclaimer */}
      <div className="mt-4 text-[11px] font-normal text-[#6B7280] dark:text-[#9CA3AF] pt-3 border-t border-[#E7E5F4] dark:border-white/[0.08] flex items-center gap-2">
        <Lock className="w-3 h-3 text-[#6B7280] shrink-0" />
        <span>Protected by standard 256-bit banking encryption.</span>
      </div>

    </div>
  );
}
