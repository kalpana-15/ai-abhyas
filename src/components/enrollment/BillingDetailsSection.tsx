"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";

export interface BillingFormData {
  billingName: string;
  billingAddress: string;
  country: string;
  state: string;
  billingCity: string;
  postalCode: string;
  gstNumber: string;
  invoiceName: string;
}

export interface BillingDetailsSectionProps {
  formData: BillingFormData;
  onChange: (field: keyof BillingFormData, value: any) => void;
  onCopyFromStudent?: () => void;
}

export function BillingDetailsSection({
  formData,
  onChange,
  onCopyFromStudent,
}: BillingDetailsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const inputClasses = () => `
    w-full bg-[#FAFAF7] dark:bg-[#060816]/80 border border-[#E7E5F4] dark:border-white/[0.1] focus:border-[#111827] dark:focus:border-white/50 rounded-lg px-3.5 py-2.5 text-sm font-normal text-[#111827] dark:text-white outline-none transition-all duration-200 shadow-2xs
  `;

  return (
    <div className="bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-6 shadow-sm dark:shadow-none transition-all duration-300">
      
      {/* Clickable Toggle Disclosure Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 cursor-pointer select-none group"
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-base font-semibold text-[#111827] dark:text-white group-hover:text-[#6B7280] dark:group-hover:text-white/80 transition-colors">
              Billing details & corporate GST
            </h3>
            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#1F2937] px-2.5 py-0.5 rounded-full border border-[#E7E5F4] dark:border-white/[0.08]">
              Optional
            </span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-normal">
            Add this only if you require a company invoice or GST input tax credit.
          </p>
        </div>

        <div className="text-[#6B7280] dark:text-[#9CA3AF] shrink-0">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Expandable Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-5 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#374151] dark:text-[#E5E7EB]">
                Billing address profile
              </span>
              {onCopyFromStudent && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyFromStudent();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#111827] dark:text-white hover:opacity-80 bg-[#F3F4F6] dark:bg-[#1F2937] px-2.5 py-1 rounded-md transition-all shadow-2xs"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy from student details</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Billing Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  Billing full name
                </label>
                <input
                  type="text"
                  value={formData.billingName}
                  onChange={(e) => onChange("billingName", e.target.value)}
                  placeholder="Kalpana Sharma"
                  className={inputClasses()}
                />
              </div>

              {/* Invoice Display Name */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  Invoice display name <span className="font-normal text-[#6B7280]">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.invoiceName}
                  onChange={(e) => onChange("invoiceName", e.target.value)}
                  placeholder="For corporate reimbursement"
                  className={inputClasses()}
                />
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  Street address
                </label>
                <input
                  type="text"
                  value={formData.billingAddress}
                  onChange={(e) => onChange("billingAddress", e.target.value)}
                  placeholder="House number, building, street, area"
                  className={inputClasses()}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={formData.billingCity}
                  onChange={(e) => onChange("billingCity", e.target.value)}
                  placeholder="Bengaluru"
                  className={inputClasses()}
                />
              </div>

              {/* State / Province */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  State / Province
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => onChange("state", e.target.value)}
                  placeholder="Karnataka"
                  className={inputClasses()}
                />
              </div>

              {/* Postal Pin Code */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  Postal PIN code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => onChange("postalCode", e.target.value)}
                  placeholder="560001"
                  className={inputClasses()}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => onChange("country", e.target.value)}
                  className={inputClasses()}
                />
              </div>

              {/* Corporate GSTIN */}
              <div className="sm:col-span-2 pt-2">
                <div className="p-4 rounded-lg bg-[#FAFAF7] dark:bg-[#060816] border border-[#E7E5F4] dark:border-white/[0.08]">
                  <label className="block text-xs font-semibold text-[#111827] dark:text-white mb-1.5">
                    Corporate GSTIN <span className="text-xs font-normal text-[#6B7280] ml-1">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) => onChange("gstNumber", e.target.value.toUpperCase())}
                    placeholder="29ABCDE1234F1Z5 (15-digit code)"
                    className="w-full bg-white dark:bg-[#14182F] border border-[#E7E5F4] dark:border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#111827] dark:text-white uppercase tracking-wider outline-none focus:border-[#111827] dark:focus:border-white/50 transition-all"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
