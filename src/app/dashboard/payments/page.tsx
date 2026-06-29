"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, Download, ArrowUpRight, ReceiptText } from "lucide-react";

const mockPayments = [
  { id: "INV-2026-001", course: "Generative AI Masterclass", amount: "$199.00", status: "Paid", date: "May 10, 2026", method: "Visa ending in 4242" },
  { id: "INV-2026-002", course: "Python for Data Science", amount: "$149.00", status: "Paid", date: "April 05, 2026", method: "Mastercard ending in 8891" },
  { id: "INV-2026-003", course: "Introduction to Machine Learning", amount: "$129.00", status: "Paid", date: "Feb 20, 2026", method: "PayPal" },
];

export default function PaymentsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Payment History</h1>
        <p className="text-muted-foreground">Manage your billing, view receipts, and track past purchases.</p>
      </div>

      {/* Active Subscription/Card Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden h-[200px] flex flex-col justify-between">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <CreditCard className="w-8 h-8 opacity-80" />
            <span className="text-xl font-black italic tracking-wider opacity-90">VISA</span>
          </div>
          
          <div className="relative z-10 mt-auto">
            <div className="flex items-center gap-4 text-xl font-mono tracking-widest mb-4 opacity-90">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>4242</span>
            </div>
            <div className="flex items-center justify-between text-sm opacity-80">
              <span className="font-medium uppercase">{user.name}</span>
              <span className="font-medium">12/28</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-foreground mb-1">Billing Overview</h3>
          <p className="text-sm text-muted-foreground mb-6">Your next payment is not scheduled as you have lifetime access to your enrolled courses.</p>
          
          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
              Update Payment Method
            </button>
            <button className="bg-muted text-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-muted/80 border border-border transition-colors">
              Billing Settings
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <ReceiptText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-heading text-foreground">Invoices & Receipts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-semibold">Invoice ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Method</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-4 text-sm font-medium text-foreground">{payment.id}</td>
                  <td className="p-4 text-sm text-muted-foreground">{payment.date}</td>
                  <td className="p-4 text-sm text-foreground">{payment.course}</td>
                  <td className="p-4 text-sm text-muted-foreground">{payment.method}</td>
                  <td className="p-4 text-sm font-bold text-foreground">{payment.amount}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600">
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
