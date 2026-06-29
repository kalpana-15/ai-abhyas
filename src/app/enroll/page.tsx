"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, ShieldCheck, PlayCircle, Clock, BookOpen, Lock } from "lucide-react";
import Link from "next/link";

function EnrollContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseParam = searchParams.get("course") || "Advanced AI Certification";
  const typeParam = searchParams.get("type") || "paid"; // free or paid

  const isFree = typeParam === "free";
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(isFree ? "Successfully Enrolled!" : "Payment Successful! You are now enrolled.");
      router.push("/dashboard"); // Dummy redirect after success
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Complete your Enrollment</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              You are one step away from joining {courseParam}. Secure your spot and start learning today.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Form & Payment */}
            <div className="flex-1 space-y-6">
              
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" defaultValue="John" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input type="email" defaultValue="you@example.com" disabled className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 text-muted-foreground focus:outline-none" />
                    <p className="text-xs text-muted-foreground">To change your email, please go to your account settings.</p>
                  </div>
                </div>
              </div>

              {!isFree && (
                <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Details
                  </h2>
                  
                  <form onSubmit={handleCheckout} id="enroll-form" className="space-y-6 relative z-10">
                    <div className="flex flex-wrap gap-4 mb-6">
                      <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-background/50 hover:bg-muted'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-primary focus:ring-primary w-4 h-4" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                      </label>
                      <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-background/50 hover:bg-muted'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="text-primary focus:ring-primary w-4 h-4" />
                          <span className="font-medium">PayPal</span>
                        </div>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Card Number</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">CVC</label>
                            <input type="text" placeholder="123" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-background/50 border border-border rounded-xl text-center">
                        <p className="text-muted-foreground text-sm">You will be redirected to PayPal to complete your purchase securely.</p>
                      </motion.div>
                    )}
                  </form>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6 shadow-xl shadow-primary/5">
                <h3 className="text-lg font-bold mb-4 border-b border-border/80 pb-4">Order Summary</h3>
                
                <div className="flex gap-4 mb-6">
                  <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                    <img src="/Assets/images/hero_illustration.png" alt="Course" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <h4 className="font-semibold line-clamp-2 leading-tight">{courseParam}</h4>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Lifetime Access
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t border-border/80 pt-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="line-through">{isFree ? "₹2,999" : "₹4,999"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-500">-{isFree ? "₹2,999" : "₹1,000"}</span>
                  </div>
                </div>

                <div className="border-t border-border/80 pt-4 mb-6 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">{isFree ? "Free" : "₹3,999"}</span>
                </div>

                <button
                  type="submit"
                  form="enroll-form"
                  onClick={isFree ? handleCheckout : undefined}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      {isFree ? "Complete Enrollment" : "Pay Securely"}
                      <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Guaranteed secure checkout
                </p>

                {/* Benefits mini-list */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">30-Day Money-Back Guarantee</p>
                      <p className="text-xs text-muted-foreground">Not satisfied? Get a full refund.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Verifiable Certificate</p>
                      <p className="text-xs text-muted-foreground">Share your success on LinkedIn.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// User Icon since lucide-react User might have different import
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EnrollContent />
    </Suspense>
  );
}
