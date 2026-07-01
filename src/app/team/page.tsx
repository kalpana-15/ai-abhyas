"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";
import TeamFolder, { TeamMemberData } from "@/components/ui/TeamFolder";

const teamData: TeamMemberData[] = [
  {
    id: "t1",
    name: "Alex Rivera",
    role: "CEO & Founder",
    image: "/images/team/Gemini_Generated_Image_i7h2n3i7h2n3i7h2.png",
    experience: "8+ Years",
    description: "Former Google Brain researcher specializing in large language models and reinforcement learning algorithms. Architect of our core AI infrastructure.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  },
  {
    id: "t2",
    name: "Dr. Sarah Chen",
    role: "Co-Founder",
    image: "/images/team/Gemini_Generated_Image_u7riy6u7riy6u7ri.png",
    experience: "12+ Years",
    description: "PhD in Computer Vision. Leading our efforts in advanced image recognition and generative adversarial networks for creative applications.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  },
  {
    id: "t3",
    name: "Marcus Johnson",
    role: "ML Ops Architect",
    image: "/images/team/Gemini_Generated_Image_ydh3tqydh3tqydh3.png",
    experience: "6+ Years",
    description: "Expert in scaling AI infrastructure. Ensures our models are deployed efficiently, highly available, and run with zero downtime across regions.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  },
  {
    id: "t4",
    name: "Elena Rostova",
    role: "AI Ethics Director",
    image: "/images/team/team1.webp",
    experience: "10+ Years",
    description: "Pioneering responsible AI frameworks and ensuring our models remain unbiased, fair, transparent, and compliant with global regulations.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  },
  {
    id: "t5",
    name: "David Kim",
    role: "NLP Specialist",
    image: "/images/team/team2.webp",
    experience: "7+ Years",
    description: "Focused on natural language understanding and generation. Building conversational AI agents that feel truly human and empathetic.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  },
  {
    id: "t6",
    name: "Priya Patel",
    role: "Senior AI Researcher",
    image: "/images/team/team3.webp",
    experience: "9+ Years",
    description: "Pushing the boundaries of what's possible with multi-modal AI systems. Published author and speaker at major AI conferences.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  },
  {
    id: "t7",
    name: "James Wilson",
    role: "AI Product Manager",
    image: "/images/team/team4.webp",
    experience: "5+ Years",
    description: "Translating complex AI capabilities into intuitive, user-friendly products that solve real-world problems for our enterprise clients.",
    socials: {
      linkedin: "#",
      github: "#",
      portfolio: "#"
    }
  }
];

export default function TeamPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-12">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Assets/images/team bg.png"
              alt="Team Background"
              fill
              className="object-cover opacity-55 dark:opacity-65 blur-md scale-[1.05]"
              priority
            />
            {/* Gradient Overlay for readability and seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/15 to-background" />
          </div>

          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[100px] pointer-events-none z-0" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-black/60 backdrop-blur-xl text-primary font-bold text-sm border border-primary/20 dark:border-primary/50 shadow-sm dark:shadow-[0_0_20px_rgba(var(--primary),0.25)] mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span>Our Team</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground drop-shadow-md leading-tight max-w-4xl mx-auto mb-6"
            >
              Meet the Minds Behind <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 drop-shadow-sm">AI Abhyas</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/90 drop-shadow-sm font-medium max-w-2xl mx-auto"
            >
              Our team of industry professionals, AI scientists, and educators is dedicated to making AI learning practical and accessible.
            </motion.p>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
            <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-black/60 backdrop-blur-xl text-primary font-bold text-sm mb-6 border border-primary/20 dark:border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)] dark:shadow-[0_0_20px_rgba(var(--primary),0.25)]"
              >
                <Users className="w-4 h-4 text-primary" />
                <span className="tracking-wide">FOUNDERS</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 drop-shadow-sm"
              >
                Leadership
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
              >
                The visionaries behind our mission.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mx-auto">
              {teamData.slice(0, 2).map((member) => (
                <TeamFolder key={member.id} member={member} compact={false} />
              ))}
            </div>
          </div>
        </section>

        {/* Execution Team Section */}
        <section className="py-16 pb-24 relative z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
            <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-black/60 backdrop-blur-xl text-primary font-bold text-sm mb-6 border border-primary/20 dark:border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)] dark:shadow-[0_0_20px_rgba(var(--primary),0.25)]"
              >
                <Users className="w-4 h-4 text-primary" />
                <span className="tracking-wide">OUR TEAM</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 drop-shadow-sm"
              >
                Execution Team
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
              >
                The brilliant minds turning vision into reality.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mx-auto">
              {teamData.slice(2, 6).map((member) => (
                <TeamFolder key={member.id} member={member} compact={true} />
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
