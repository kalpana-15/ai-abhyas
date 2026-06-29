"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { QrCode, Fingerprint, Globe, Briefcase, Award, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CertificateShowcase() {
  const benefits = [
    { title: "QR Verification", icon: QrCode },
    { title: "Unique ID Tracking", icon: Fingerprint },
    { title: "LinkedIn Ready", icon: Globe },
    { title: "Resume Friendly", icon: Briefcase },
    { title: "Industry Recognized", icon: Award },
    { title: "Lifetime Validation", icon: ShieldCheck },
  ];

  return (
    <section className="mb-0.5">
      <div className="bg-muted/10 border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          
          {/* Certificate Info */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500 mb-6">
              <Award className="w-4 h-4" /> Official Certification
            </div>
            
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-foreground">Prove Your Expertise</h2>
            <p className="text-muted-foreground mb-8">
              Upon successful completion of the course and final project, you will receive a verifiable digital certificate to showcase your new skills to employers and your professional network.
            </p>

            <ul className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Icon className="w-4 h-4 text-primary shrink-0" /> {benefit.title}
                  </li>
                );
              })}
            </ul>

            <Button variant="outline" className="border-border">
              View Sample Certificate <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Certificate Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/3] bg-card border-8 border-background shadow-2xl rounded-xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            {/* Mock Certificate Visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 flex flex-col items-center justify-center p-8 text-center border-2 border-primary/20 m-2 rounded-lg">
              <Award className="w-16 h-16 text-amber-500 mb-4 opacity-50" />
              <div className="text-2xl font-serif text-foreground/80 mb-2">Certificate of Completion</div>
              <div className="w-20 h-0.5 bg-primary/20 mb-4" />
              <div className="text-sm text-muted-foreground">This certifies that</div>
              <div className="text-xl font-bold font-heading text-foreground mt-2 mb-4">Student Name</div>
              <div className="text-sm text-muted-foreground">has successfully completed</div>
              <div className="text-lg font-bold text-primary mt-2">AI Masterclass Program</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
