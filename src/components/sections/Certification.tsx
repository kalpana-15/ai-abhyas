"use client";

import { motion } from "framer-motion";
import { CheckCircle2, QrCode, ShieldCheck, Share2, FileBadge, Award } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const benefits = [
  { text: "QR Verification", icon: QrCode },
  { text: "Unique Certificate ID", icon: ShieldCheck },
  { text: "Industry Recognition", icon: FileBadge },
  { text: "LinkedIn Showcase", icon: Share2 },
];

export function Certification() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <Award className="w-4 h-4" />
            <span className="tracking-wide uppercase">GLOBAL RECOGNITION</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
          >
            Verifiable Credentials <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">That Matter</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
          >
            Stand out to employers with an industry-recognized certification that proves your ability to build and deploy real-world AI applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border"
          >
            <Image
              src="/Assets/images/certificate_mockup.png"
              alt="AI Abhyas Certificate of Completion"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Column: Content */}
          <div className="order-1 lg:order-2 flex flex-col items-start">
            <ul className="space-y-6 mb-10 w-full">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium">{benefit.text}</span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" className="h-14 px-8 text-base">
                View Sample Certificate
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
