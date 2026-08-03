"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface OrderSummaryCardProps {
  courseTitle: string;
  amount: string; // e.g. "₹4,499" or "Free"
  isFree?: boolean;
  onCouponApply?: (discountAmount: number, code: string) => void;
}

export function OrderSummaryCard({
  courseTitle = "Computer Vision & AI Mastery",
  amount = "₹4,499",
  isFree = false,
  onCouponApply,
}: OrderSummaryCardProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  const baseAmountStr = (amount.split("/")[0] || "").trim();
  const numericBase = parseInt(baseAmountStr.replace(/[^0-9]/g, ""), 10) || (isFree ? 0 : 4499);
  const originalPrice = isFree ? 0 : Math.round(numericBase * 2.22);
  const initialDiscount = originalPrice - numericBase;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalPayable = Math.max(0, numericBase - couponDiscount);
  const totalSavings = initialDiscount + couponDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCode.trim()) {
      setCouponError("Please enter a promo code.");
      return;
    }
    const cleanCode = couponCode.trim().toUpperCase();
    
    let discount = 500;
    if (cleanCode === "FREE20" || cleanCode === "AIABHYAS500") {
      discount = 500;
    } else if (cleanCode === "WELCOME1000") {
      discount = 1000;
    } else {
      discount = 450;
    }

    if (isFree) {
      setCouponError("Course is already free.");
      return;
    }

    setAppliedCoupon({ code: cleanCode, discount });
    if (onCouponApply) onCouponApply(discount, cleanCode);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    if (onCouponApply) onCouponApply(0, "");
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
      
      <div>
        {/* Clean Header matching exact left column font styling */}
        <div className="pb-3.5 mb-4 border-b border-[#E7E5F4] dark:border-white/[0.08]">
          <h3 className="text-base font-semibold text-[#111827] dark:text-white">
            Order summary
          </h3>
        </div>

        {/* Selected Course Row */}
        <div className="flex items-center justify-between text-sm mb-3.5 pb-2 text-[#111827] dark:text-white">
          <span className="font-normal text-[#6B7280] dark:text-[#9CA3AF] truncate pr-3">{courseTitle}</span>
          <span className="font-semibold shrink-0">{isFree ? "Free" : `₹${numericBase.toLocaleString()}`}</span>
        </div>

        {/* Uniform Line Item Pricing Rows */}
        <div className="space-y-2.5 text-sm font-normal text-[#374151] dark:text-[#E5E7EB] mb-4">
          {!isFree && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] dark:text-[#9CA3AF]">Original tuition value</span>
                <span className="line-through text-[#6B7280] dark:text-[#9CA3AF]">₹{originalPrice.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] dark:text-[#9CA3AF]">Scholarship discount</span>
                <span className="font-semibold text-[#111827] dark:text-white">−₹{initialDiscount.toLocaleString()}</span>
              </div>
            </>
          )}

          {/* Applied Coupon Row */}
          <AnimatePresence>
            {appliedCoupon && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between pt-1"
              >
                <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                  Promo ({appliedCoupon.code})
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#111827] dark:text-white">−₹{appliedCoupon.discount}</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-[#6B7280] hover:text-[#111827] dark:hover:text-white underline ml-1"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] dark:text-[#9CA3AF]">GST & platform fees</span>
            <span className="font-semibold text-[#111827] dark:text-white">Included</span>
          </div>
        </div>

        {/* Promo Input Row */}
        {!isFree && !appliedCoupon && (
          <form onSubmit={handleApplyCoupon} className="my-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 bg-[#FAFAF7] dark:bg-[#060816]/80 border border-[#E7E5F4] dark:border-white/[0.1] rounded-lg px-3 py-2 text-sm font-normal text-[#111827] dark:text-white outline-none focus:border-[#111827] dark:focus:border-white/50 uppercase transition-all"
              />
              <button
                type="submit"
                className="bg-[#111827] dark:bg-[#F3F4F6] text-white dark:text-[#111827] font-semibold text-sm px-4 py-2 rounded-lg transition-all hover:opacity-90 shrink-0"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-xs font-normal text-[#EF4444] mt-1.5">{couponError}</p>}
          </form>
        )}
      </div>

      {/* Bottom section anchored cleanly at base of card */}
      <div>
        <hr className="border-t border-[#E7E5F4] dark:border-white/[0.1] my-3.5" />

        {/* Total Payable Amount */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-base text-[#111827] dark:text-white">
              Total payable
            </span>
            {!isFree && (
              <span className="block text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                You save ₹{totalSavings.toLocaleString()}
              </span>
            )}
          </div>
          <div className="font-semibold text-lg text-[#111827] dark:text-white">
            {isFree ? "Free" : `₹${finalPayable.toLocaleString()}`}
          </div>
        </div>
      </div>

    </div>
  );
}
