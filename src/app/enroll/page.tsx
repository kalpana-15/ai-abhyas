"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  Home, 
  ShoppingBag, 
  X, 
  Sparkles, 
  ArrowUp, 
  AlertCircle, 
  CheckCircle2 
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/actions/paymentActions";
import coursesData from "@/data/courses.json";

// Layout import
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Modular Enrollment components
import { EnrollmentStepper } from "@/components/enrollment/EnrollmentStepper";
import { StudentInfoSection, StudentFormData } from "@/components/enrollment/StudentInfoSection";
import { BillingFormData } from "@/components/enrollment/BillingDetailsSection";
import { AdditionalFormData } from "@/components/enrollment/AdditionalInfoSection";
import { OrderSummaryCard } from "@/components/enrollment/OrderSummaryCard";
import { PaymentCTAAndTrust } from "@/components/enrollment/PaymentCTAAndTrust";
import { PaymentSuccessView, PaymentFailedView } from "@/components/enrollment/PaymentResultViews";

function EnrollPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading, refreshSession, enroll } = useAuth();

  const courseParam = searchParams.get("course") || "AI & Deep Learning Foundations Mastery";
  const courseIdParam = searchParams.get("courseId") || "c6";
  const typeParam = searchParams.get("type") || "paid";
  const isFree = typeParam === "free";
  const matchedCourse = coursesData.find((c: any) => c.id === courseIdParam || c.title === courseParam);
  const defaultFee = matchedCourse ? matchedCourse.fee : (isFree ? "Free" : "₹4,499");
  const rawFeeParam = searchParams.get("fee") || defaultFee;
  const baseFeeStr = (rawFeeParam.split("/")[0] || "").trim();
  const rawBasePrice = parseInt(baseFeeStr.replace(/[^0-9]/g, ""), 10) || (isFree ? 0 : 4499);
  const feeParam = isFree || rawBasePrice === 0 ? "Free" : `₹${rawBasePrice.toLocaleString()}`;

  // Flow View States: "form" | "success" | "failed"
  const [viewState, setViewState] = useState<"form" | "success" | "failed">("form");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Inline Real Authentication Gateway States
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const handleInlineAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    try {
      const endpoint = authMode === "signin" ? "/api/auth/login" : "/api/auth/register";
      const body = authMode === "signin"
        ? { email: authEmail, password: authPassword }
        : { name: authName || authEmail.split("@")[0], email: authEmail, password: authPassword };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed. Please verify your credentials.");
        setAuthSubmitting(false);
        return;
      }

      // Immediately synchronize auth session from PostgreSQL across entire app
      await refreshSession();
      setAuthSubmitting(false);
    } catch (err) {
      setAuthError("Network communication error. Please verify your connection and try again.");
      setAuthSubmitting(false);
    }
  };

  // Success state details
  const [successData, setSuccessData] = useState({
    transactionId: "pay_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    orderId: "order_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    paymentMethod: "Razorpay (UPI / Cards / NetBanking)",
    invoiceNumber: `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
  });

  // Form State
  const [studentForm, setStudentForm] = useState<StudentFormData>({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name && user.name.includes(" ") ? user.name.split(" ").slice(1).join(" ") : "",
    email: user?.email || "",
    phone: "",
    city: "",
    college: "",
    organization: "",
    experienceLevel: "Intermediate (1-3 Yrs)",
    occupation: "Software Engineer",
    referralCode: "",
    agreedToTerms: false,
  });

  const [billingForm, setBillingForm] = useState<BillingFormData>({
    billingName: user?.name || "",
    billingAddress: "",
    country: "India",
    state: "",
    billingCity: "",
    postalCode: "",
    gstNumber: "",
    invoiceName: "",
  });

  const [additionalForm, setAdditionalForm] = useState<AdditionalFormData>({
    specialRequirements: "",
    accessibilityRequirements: "",
    instructorMessage: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedCode, setAppliedCode] = useState<string>("");
  const calculatedPayable = Math.max(0, rawBasePrice - appliedDiscount);
  const displayAmount = isFree || rawBasePrice === 0 ? "Free" : `₹${calculatedPayable.toLocaleString()}`;

  // Populate user defaults once auth loads
  useEffect(() => {
    if (user && !studentForm.email) {
      setStudentForm((prev) => ({
        ...prev,
        firstName: prev.firstName || user.name?.split(" ")[0] || "Learner",
        lastName: prev.lastName || (user.name?.includes(" ") ? user.name.split(" ").slice(1).join(" ") : ""),
        email: user.email || prev.email,
      }));
      setBillingForm((prev) => ({
        ...prev,
        billingName: prev.billingName || user.name || "Learner",
      }));
    }
  }, [user]);

  const handleStudentChange = (field: keyof StudentFormData, value: any) => {
    setStudentForm((prev) => {
      const next = { ...prev, [field]: value };
      // Advance stepper to Step 2 (Review order) when user checks the certify box!
      if (field === "agreedToTerms") {
        if (value === true) {
          setCurrentStep(2);
        } else {
          setCurrentStep(1);
        }
      }
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBillingChange = (field: keyof BillingFormData, value: any) => {
    setBillingForm((prev) => ({ ...prev, [field]: value }));
    if (currentStep < 2) setCurrentStep(2);
  };

  const handleAdditionalChange = (field: keyof AdditionalFormData, value: string) => {
    setAdditionalForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyFromStudent = () => {
    const fullName = `${studentForm.firstName} ${studentForm.lastName}`.trim();
    setBillingForm((prev) => ({
      ...prev,
      billingName: fullName || prev.billingName,
      billingCity: studentForm.city || prev.billingCity,
    }));
    alert("✅ Copied student name and city to billing details!");
  };

  // Validate required student info
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};
    if (!studentForm.firstName.trim()) newErrors.firstName = "First name is required";
    if (!studentForm.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!studentForm.email.trim() || !studentForm.email.includes("@")) newErrors.email = "Valid email address is required";
    if (!studentForm.phone.trim() || studentForm.phone.length < 10) newErrors.phone = "Enter a valid 10-digit mobile phone";
    if (!studentForm.agreedToTerms) newErrors.agreedToTerms = "You must agree to Terms of Service to proceed";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("Please complete all required fields and check the agreement certification box to proceed.");
      // Smoothly scroll mobile users up to see the required fields or checkbox!
      window.scrollTo({ top: 150, behavior: "smooth" });
      return false;
    }
    return true;
  };

  // Primary Payment Launcher
  const handleProceedToPayment = async () => {
    setErrorMessage("");

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    if (!validateForm()) return;

    setCurrentStep(3);
    setIsProcessing(true);

    try {
      if (isFree || feeParam === "Free") {
        await enroll(courseParam, false);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(4);
          setViewState("success");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1200);
        return;
      }

      // Calculate discount-adjusted numerical fee string
      const feeString = `₹${calculatedPayable}`;

      const orderRes = await createRazorpayOrder({
        amount: feeString,
        courseId: courseIdParam,
        courseTitle: courseParam,
      });

      if (!orderRes.success || !orderRes.orderId) {
        setErrorMessage(orderRes.error || "Failed to initialize secure banking gateway order. Please check network connection.");
        setIsProcessing(false);
        setViewState("failed");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (!(window as any).Razorpay) {
        setErrorMessage("Razorpay security check library failed to load. Please verify internet connection.");
        setIsProcessing(false);
        setViewState("failed");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TJPNtcp72kpA5G",
        amount: orderRes.amount,
        currency: orderRes.currency || "INR",
        name: "AI Abhyas Platform",
        description: `Lifetime Enrollment: ${courseParam}`,
        order_id: orderRes.orderId,
        handler: async function (response: any) {
          setIsProcessing(true);
          const verifyRes = await verifyRazorpayPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            courseId: courseIdParam,
            courseTitle: courseParam,
            amount: feeString,
            method: "Razorpay Encrypted Gateway",
          });

          setIsProcessing(false);
          if (verifyRes.success) {
            await refreshSession();
            setSuccessData({
              transactionId: response.razorpay_payment_id || "pay_SUCCESS_VERIFIED",
              orderId: response.razorpay_order_id || orderRes.orderId,
              paymentMethod: "Razorpay (Level 1 PCI-DSS)",
              invoiceNumber: `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
            });
            setCurrentStep(4);
            setViewState("success");
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setErrorMessage(verifyRes.error || "Security verification failed: Digital cryptographic transaction signature did not verify.");
            setViewState("failed");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        },
        prefill: {
          name: `${studentForm.firstName} ${studentForm.lastName}`.trim() || user?.name || "Learner",
          email: studentForm.email || user?.email || "student@aiabhyas.com",
          contact: studentForm.phone || "9999999999",
        },
        notes: {
          courseTitle: courseParam,
          courseId: courseIdParam,
          referral: appliedCode || studentForm.referralCode || "NONE",
        },
        theme: {
          color: "#8B5CF6",
          backdrop_color: "rgba(6,8,22,0.85)",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            if (currentStep === 3) setCurrentStep(2);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (resp: any) {
        setIsProcessing(false);
        setErrorMessage(`Transaction Declined: ${resp.error?.description || "Payment failed at banking gateway."}`);
        setViewState("failed");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Launch Razorpay immediately to prevent iOS/Android mobile browsers from blocking the popup modal!
      setIsProcessing(false);
      rzp.open();

    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage("An unexpected network or session error occurred while launching secure payment.");
      setViewState("failed");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] dark:bg-[#060816] text-[#111827] dark:text-[#F3F4F6] font-sans transition-colors duration-300 relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      {/* Top Navbar */}
      <Navbar />

      {/* Branded Pre-payment Loading Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] to-[#14B8A6] p-1 shadow-[0_0_50px_rgba(139,92,246,0.6)] flex items-center justify-center mb-6">
              <div className="w-full h-full rounded-[20px] bg-[#14182F] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <h3 className="text-2xl font-black font-heading text-white mb-2">
              Preparing Razorpay Secure Checkout...
            </h3>
            <p className="text-sm text-slate-300 max-w-md">
              Establishing a Level-1 PCI DSS encrypted tunnel with your banking provider. Please do not refresh or close the page.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/20 border border-[#14B8A6]/40 text-[#14B8A6] text-xs font-extrabold mt-6">
              <ShieldCheck className="w-4 h-4" /> 256-bit SSL Banking Protection
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-32">

        {/* Dynamic View State Render */}
        {viewState === "success" ? (
          <PaymentSuccessView
            courseTitle={courseParam}
            amountPaid={displayAmount}
            transactionId={successData.transactionId}
            orderId={successData.orderId}
            paymentMethod={successData.paymentMethod}
            invoiceNumber={successData.invoiceNumber}
          />
        ) : viewState === "failed" ? (
          <PaymentFailedView
            errorMessage={errorMessage}
            onRetry={handleProceedToPayment}
            onSelectOtherMethod={() => {
              setViewState("form");
              setCurrentStep(2);
            }}
            onGoBack={() => {
              setViewState("form");
              setCurrentStep(1);
            }}
          />
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mb-4 shadow-lg shadow-[#8B5CF6]/20" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
              Verifying learner credentials...
            </p>
          </div>
        ) : !user ? (
          /* INLINE REAL AUTHENTICATION GATEWAY FOR UNENROLLED / UNAUTHENTICATED LEARNERS */
          <div className="max-w-xl mx-auto my-8 bg-white dark:bg-[#14182F] rounded-3xl border border-[#E7E5F4] dark:border-white/[0.08] shadow-2xl overflow-hidden p-6 sm:p-10">
            <div className="text-center space-y-3.5 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mx-auto">
                <Lock className="w-3.5 h-3.5" /> Secure Learner Authentication
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111827] dark:text-white tracking-tight">
                Sign In or Register to Enroll
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed max-w-md mx-auto">
                Authenticate your real learner account to secure your enrollment in <strong className="text-[#111827] dark:text-white font-bold">{courseParam}</strong> and provision your AI engineering workspace.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FAFAF7] dark:bg-white/[0.04] rounded-2xl border border-[#E7E5F4] dark:border-white/[0.06] mb-6">
              <button
                type="button"
                onClick={() => { setAuthMode("signin"); setAuthError(""); }}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${authMode === "signin" ? "bg-[#8B5CF6] text-white shadow-md" : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"}`}
              >
                Existing Account
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("register"); setAuthError(""); }}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${authMode === "register" ? "bg-[#8B5CF6] text-white shadow-md" : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"}`}
              >
                New Learner Sign Up
              </button>
            </div>

            <form onSubmit={handleInlineAuth} className="space-y-4">
              {authMode === "register" && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#D1D5DB]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.1] bg-[#FAFAF7] dark:bg-white/[0.03] text-sm text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all font-medium"
                  />
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#D1D5DB]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.1] bg-[#FAFAF7] dark:bg-white/[0.03] text-sm text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#D1D5DB]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E5F4] dark:border-white/[0.1] bg-[#FAFAF7] dark:bg-white/[0.03] text-sm text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all font-medium"
                />
              </div>

              {authError && (
                <div className="p-3.5 text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/50 font-semibold flex items-start gap-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authSubmitting}
                className="w-full py-3.5 px-6 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-70 text-white rounded-xl font-bold text-sm shadow-lg shadow-[#8B5CF6]/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                {authSubmitting ? (
                  <span>Processing Credentials...</span>
                ) : (
                  <span>{authMode === "signin" ? "Sign In & Continue Enrollment ➔" : "Create Account & Unlock Checkout ➔"}</span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E7E5F4] dark:border-white/[0.08] flex items-center justify-center gap-4 text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#14B8A6]" /> Encrypted Credentials</span>
              <span>•</span>
              <span>Instant Access</span>
            </div>
          </div>
        ) : (
          /* Default "form" Enrollment Checkout Experience for Authenticated Learners */
          <>
            {/* Top Stepper */}
            <EnrollmentStepper
              currentStep={currentStep}
              onStepClick={(step) => setCurrentStep(step)}
            />

            {/* Master Responsive Grid with Equal Height Stretch Alignment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

              {/* LEFT COLUMN: Student Information Form */}
              <div className="min-w-0 flex flex-col h-full">
                
                {/* SECTION 1: STUDENT INFORMATION */}
                <div className="flex-1 flex flex-col">
                  <StudentInfoSection
                    formData={studentForm}
                    onChange={handleStudentChange}
                    errors={errors}
                    userEmail={user?.email || undefined}
                    userName={user?.name || undefined}
                  />
                </div>

                {/* Mobile inline Payment CTA just below forms on small screens */}
                <div className="block lg:hidden mt-6">
                  <PaymentCTAAndTrust
                    onProceed={handleProceedToPayment}
                    isProcessing={isProcessing}
                    amountText={feeParam}
                    isFree={isFree}
                    disabled={!studentForm.agreedToTerms}
                  />
                </div>

              </div>

              {/* RIGHT COLUMN: Sticky Order Summary */}
              <div className="min-w-0 flex flex-col h-full">
                
                {/* Sticky Wrapper stretching to equal height of Left Column */}
                <div className="lg:sticky lg:top-28 flex flex-col justify-between flex-1 space-y-6">
                  
                  {/* ORDER SUMMARY (flex-1 to align perfectly with left box height) */}
                  <OrderSummaryCard
                    courseTitle={courseParam}
                    amount={feeParam}
                    isFree={isFree}
                    onCouponApply={(discount, code) => {
                      setAppliedDiscount(discount);
                      setAppliedCode(code);
                    }}
                  />

                  {/* Desktop Primary Payment CTA */}
                  <div className="hidden lg:block shrink-0">
                    <PaymentCTAAndTrust
                      onProceed={handleProceedToPayment}
                      isProcessing={isProcessing}
                      amountText={displayAmount}
                      isFree={isFree}
                      disabled={!studentForm.agreedToTerms}
                    />
                  </div>

                </div>

              </div>

            </div>
          </>
        )}

      </div>

      {/* MOBILE FLOATING ORDER SUMMARY DRAWER TRIGGER & STICKY BOTTOM BAR */}
      {viewState === "form" && !!user && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#14182F] border-t border-[#E7E5F4] dark:border-white/[0.1] shadow-2xl p-3 sm:p-4 flex lg:hidden items-center justify-between gap-3 backdrop-blur-md">
          <div 
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="flex flex-col cursor-pointer min-w-0 flex-1"
          >
            <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] font-semibold uppercase tracking-wider flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-[#8B5CF6]" /> Order Total <span className="underline text-[#8B5CF6] ml-0.5">{mobileDrawerOpen ? "Hide" : "Details"} ↑</span>
            </span>
            <span className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-white font-variant-numeric truncate">
              {displayAmount}
            </span>
          </div>

          <button
            type="button"
            onClick={handleProceedToPayment}
            disabled={isProcessing || !studentForm.agreedToTerms}
            className={`px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm shadow-md shrink-0 transition-all ${
              isProcessing || !studentForm.agreedToTerms
                ? "bg-[#D1D5DB] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] cursor-not-allowed shadow-none"
                : "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:scale-95 shadow-[#8B5CF6]/25"
            }`}
          >
            {isProcessing ? "Processing..." : isFree ? "Enroll now" : "Proceed to payment"}
          </button>
        </div>
      )}

      {/* MOBILE ORDER SUMMARY MODAL / DRAWER */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            className="fixed inset-x-0 bottom-16 z-30 lg:hidden bg-white dark:bg-[#14182F] border-t border-[#E7E5F4] dark:border-white/[0.15] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-5 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E7E5F4] dark:border-white/[0.08]">
              <span className="font-semibold text-sm text-[#111827] dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" /> Order breakdown
              </span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-[#6B7280] hover:text-[#111827] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <OrderSummaryCard
              courseTitle={courseParam}
              amount={feeParam}
              isFree={isFree}
              onCouponApply={(discount, code) => {
                setAppliedDiscount(discount);
                setAppliedCode(code);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF7] dark:bg-[#060816] flex flex-col items-center justify-center p-6 text-center text-[#374151] dark:text-[#9CA3AF] font-semibold">
        <div className="w-12 h-12 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mb-4" />
        <span>Initializing bank-grade 256-bit encrypted checkout...</span>
      </div>
    }>
      <EnrollPageContent />
    </Suspense>
  );
}
