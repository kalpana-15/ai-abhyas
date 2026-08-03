"use client";

import React from "react";
import { Check, ShieldCheck } from "lucide-react";

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  college?: string;
  organization?: string;
  experienceLevel: string;
  occupation: string;
  referralCode?: string;
  agreedToTerms: boolean;
}

export interface StudentInfoSectionProps {
  formData: StudentFormData;
  onChange: (field: keyof StudentFormData, value: any) => void;
  errors?: Partial<Record<keyof StudentFormData, string>>;
  userEmail?: string;
  userName?: string;
}

export function StudentInfoSection({
  formData,
  onChange,
  errors = {},
  userEmail,
}: StudentInfoSectionProps) {
  const inputClasses = (hasError?: boolean) => `
    w-full bg-[#FAFAF7] dark:bg-[#060816]/80 border ${
      hasError 
        ? "border-[#EF4444] focus:ring-[#EF4444]/20" 
        : "border-[#E7E5F4] dark:border-white/[0.1] focus:border-[#111827] dark:focus:border-white/50"
    } rounded-lg px-3.5 py-2 text-sm font-normal text-[#111827] dark:text-white outline-none transition-all duration-200 shadow-2xs
  `;

  return (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-[#14182F]/90 dark:backdrop-blur-md border border-[#E7E5F4] dark:border-white/[0.1] rounded-[14px] p-5 sm:p-6 shadow-sm dark:shadow-none transition-all duration-300">
      
      <div>
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3.5 border-b border-[#E7E5F4] dark:border-white/[0.08]">
          <div>
            <h3 className="text-base font-semibold text-[#111827] dark:text-white">
              Student information
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-normal mt-0.5">
              Used for your official verifiable completion certificate and credentials.
            </p>
          </div>

          {userEmail ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] bg-[#FAFAF7] dark:bg-[#060816] border border-[#E7E5F4] dark:border-white/[0.1] px-3 py-1 rounded-full shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#111827] dark:text-white" />
              <span>Verified account</span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#1F2937] px-2.5 py-0.5 rounded-full border border-[#E7E5F4] dark:border-white/[0.08]">
              Step 1 of 2
            </span>
          )}
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* First Name */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              First name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="Kalpana"
              className={inputClasses(!!errors.firstName)}
              required
            />
            {errors.firstName && <p className="text-xs font-normal text-[#EF4444] mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              Last name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Sharma"
              className={inputClasses(!!errors.lastName)}
              required
            />
            {errors.lastName && <p className="text-xs font-normal text-[#EF4444] mt-1">{errors.lastName}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              Email address <span className="text-[#EF4444]">*</span>
            </label>
            {userEmail ? (
              <div className="w-full bg-[#FAFAF7] dark:bg-[#060816] border border-[#E7E5F4] dark:border-white/[0.1] rounded-lg px-3.5 py-2 text-sm font-normal text-[#111827] dark:text-white flex items-center justify-between shadow-2xs">
                <span className="truncate pr-2">{userEmail}</span>
                <div className="w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] flex items-center justify-center shrink-0 shadow-2xs">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="student@aiabhyas.com"
                  className={inputClasses(!!errors.email)}
                  required
                />
                {errors.email && <p className="text-xs font-normal text-[#EF4444] mt-1">{errors.email}</p>}
              </>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              Phone number <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className={inputClasses(!!errors.phone)}
              required
            />
            {errors.phone && <p className="text-xs font-normal text-[#EF4444] mt-1">{errors.phone}</p>}
          </div>

          {/* City of Residence */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              City of residence <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Bengaluru, Delhi, Hyderabad"
              className={inputClasses(!!errors.city)}
              required
            />
          </div>

          {/* College / Alma Mater */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              College / Organization <span className="font-normal text-[#6B7280] dark:text-[#9CA3AF]">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.college || ""}
              onChange={(e) => onChange("college", e.target.value)}
              placeholder="IIT, BIT Mesra, NIT"
              className={inputClasses()}
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              Occupation <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => onChange("occupation", e.target.value)}
              placeholder="Software / Data Engineer"
              className={inputClasses()}
              required
            />
          </div>

          {/* AI Experience Level */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-[#E5E7EB] mb-1.5">
              AI experience level
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => onChange("experienceLevel", e.target.value)}
              className={`${inputClasses()} cursor-pointer`}
            >
              <option value="Beginner (0-1 Yrs)">Beginner (0–1 Years)</option>
              <option value="Intermediate (1–3 Yrs)">Intermediate (1–3 Years)</option>
              <option value="Advanced (3+ Yrs)">Advanced (3+ Years Engineering)</option>
              <option value="Executive / Product Leader">Executive / Product Leader</option>
            </select>
          </div>

        </div>
      </div>

      {/* Agreement Checkbox Row at base of flex container */}
      <div>
        <div className="flex items-start gap-3 mt-6 pt-4 border-t border-[#E7E5F4] dark:border-white/[0.08]">
          <input
            type="checkbox"
            id="terms"
            checked={formData.agreedToTerms}
            onChange={(e) => onChange("agreedToTerms", e.target.checked)}
            className="w-4 h-4 rounded mt-0.5 text-[#111827] dark:text-white border-[#D1D5DB] dark:border-white/[0.2] focus:ring-0 cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-normal leading-normal cursor-pointer select-none">
            I certify that all details above are correct and agree to AI Abhyas&apos;s <a href="#" className="text-[#111827] dark:text-white font-semibold underline">Terms of Service</a> and <a href="#" className="text-[#111827] dark:text-white font-semibold underline">Student Code of Conduct</a>. I understand I am covered under the official 30-day satisfaction policy.
          </label>
        </div>
        {errors.agreedToTerms && <p className="text-xs font-normal text-[#EF4444] mt-1 pl-7">{errors.agreedToTerms}</p>}
      </div>

    </div>
  );
}
