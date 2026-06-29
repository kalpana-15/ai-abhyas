import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MoveDown, BookOpen, Award, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { InstructorsSection } from "@/components/courses/InstructorsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Courses | AI Abhyas",
  description: "Browse industry-focused AI courses built around hands-on learning, live training, and real-world projects.",
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex flex-col">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-primary/10">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[url('/Assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
        </div>

        {/* Mobile Background Image & Overlay */}
        <div className="absolute inset-0 z-0 block lg:hidden pointer-events-none">
          <Image 
            src="/Assets/images/courses hero.png" 
            alt="Courses Background" 
            fill 
            className="object-cover opacity-40 dark:opacity-20"
            priority
          />
          {/* Overlay to ensure text readability on mobile */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase">Explore AI Courses</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 leading-[1.1]">
                Find Your <span className="text-primary">AI Course</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Browse industry-focused AI courses built around hands-on learning, live training, real-world projects, assessments, and verifiable certifications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#course-catalog">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-primary hover:bg-primary/90">
                    Find Your Course
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-background">
                    Talk to an Advisor
                  </Button>
                </Link>
              </div>
            </div>

            {/* Desktop Illustration Area (Hidden on mobile since it's a bg) */}
            <div className="hidden lg:flex flex-1 relative w-full max-w-[600px] h-[450px] items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
              <div className="relative w-full h-full transition-transform duration-700 hover:scale-[1.02]">
                <Image 
                  src="/Assets/images/courses hero.png" 
                  alt="Courses Hero" 
                  fill 
                  className="object-contain drop-shadow-2xl" 
                  priority
                />
                
                {/* Floating Animated Premium Orbs (Particles) */}
                <div className="absolute top-[10%] left-[15%] text-primary animate-particle flex items-center justify-center w-14 h-14 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]" style={{ animationDuration: '6s' }}>
                  <GraduationCap className="w-7 h-7" />
                </div>
                
                <div className="absolute top-[5%] right-[20%] text-amber-500 animate-particle flex items-center justify-center w-12 h-12 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]" style={{ animationDuration: '7s', animationDelay: '1.5s' }}>
                  <Sparkles className="w-6 h-6" />
                </div>
                
                <div className="absolute top-[25%] right-[5%] text-[#14B8A6] animate-particle flex items-center justify-center w-16 h-16 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)]" style={{ animationDuration: '6.5s', animationDelay: '0.8s' }}>
                  <Award className="w-8 h-8" />
                </div>

                <div className="absolute top-[30%] left-[5%] text-blue-500 animate-particle flex items-center justify-center w-12 h-12 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]" style={{ animationDuration: '8s', animationDelay: '2.5s' }}>
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Catalog Section */}
      <CourseCatalog />

      {/* Featured Instructors Section */}
      <InstructorsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTA />

      </main>
      <Footer />
    </>
  );
}
