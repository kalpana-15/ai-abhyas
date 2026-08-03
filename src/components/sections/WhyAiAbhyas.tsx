"use client";

import { motion } from "framer-motion";
import { Wrench, BriefcaseBusiness, Users, ShieldCheck, BadgeCheck, LayoutDashboard, Library } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: "Hands-On Learning",
    description: "Don't just watch videos. Build real AI applications using the latest frameworks and APIs.",
    icon: Wrench,
    image: "/Assets/images/hands on lerning.jpg",
    buttonText: "Explore Projects",
    link: "/courses",
  },
  {
    title: "Industry Use Cases",
    description: "Our curriculum is built around solving actual business problems faced by top tech companies.",
    icon: BriefcaseBusiness,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    buttonText: "View Curriculum",
    link: "/courses",
  },
  {
    title: "Expert Mentorship",
    description: "Get 1-on-1 guidance and code reviews from senior AI practitioners who work in the industry.",
    icon: Users,
    image: "/Assets/images/mentorship.jpg",
    buttonText: "Meet Mentors",
    link: "/about",
  },
  {
    title: "Resource Library",
    description: "Access a vast collection of curated resources, cheat sheets, and templates for AI development.",
    icon: Library,
    image: "/Assets/images/resorce library.jpg",
    buttonText: "Browse Library",
    link: "/blog",
  },
  {
    title: "Assessments",
    description: "Rigorous technical evaluations to ensure you truly understand the concepts before moving forward.",
    icon: ShieldCheck,
    image: "/Assets/images/assestment.jpg",
    buttonText: "View Process",
    link: "/courses",
  },
  {
    title: "Verifiable Certifications",
    description: "Earn blockchain-verifiable credentials that you can instantly share on LinkedIn.",
    icon: BadgeCheck,
    image: "/Assets/images/certificates.jpg",
    buttonText: "View Certificates",
    link: "/about",
  },
  {
    title: "Learning Dashboard",
    description: "Track your progress, access resources, and submit projects through our premium LMS portal.",
    icon: LayoutDashboard,
    image: "/Assets/images/learning dashboard.jpg",
    buttonText: "Explore Platform",
    link: "/about",
  },
];

const Card = ({ card, heightClass, delay }: { card: typeof cards[0], heightClass: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`relative rounded-[2rem] overflow-hidden group ${heightClass}`}
  >
     <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
     
     {/* Background Overlays */}
     <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/60 z-0" />
     <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-0 z-0" />
     
     {/* Default State (Icon and Heading) */}
     <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end text-white transition-opacity duration-500 group-hover:opacity-0 z-10">
        <div className="flex items-center gap-2 overflow-hidden">
          <card.icon className="w-5 h-5 text-primary shrink-0" />
          <h3 className="text-[11px] md:text-[12px] font-heading font-bold leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap truncate">{card.title}</h3>
        </div>
     </div>

     {/* Hover State (Heading, Description, Button) sliding from right */}
     <div className="absolute inset-0 bg-primary/95 p-4 md:p-5 flex flex-col text-primary-foreground transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-10">
        <h3 className="text-[13px] md:text-[14px] font-heading font-bold mb-2 leading-tight whitespace-nowrap truncate">{card.title}</h3>
        <p className="text-[11px] md:text-xs opacity-90 mb-auto leading-relaxed overflow-hidden">{card.description}</p>
        <Link href={card.link} className="mt-auto">
          <button className="bg-background text-foreground px-3 py-2 rounded-lg text-[10px] md:text-[11px] font-semibold hover:bg-muted transition-colors shadow-sm w-full whitespace-nowrap truncate text-center">
            {card.buttonText}
          </button>
        </Link>
     </div>
  </motion.div>
);

export function WhyAiAbhyas() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16 px-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="tracking-wide">Our Differentiator</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-foreground"
          >
            Why Choose <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">AI Abhyas?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Outcome-based learning beyond generic tutorials.
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-center md:items-stretch">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-1/5">
            <Card card={cards[0]} heightClass="h-80 md:h-96" delay={0} />
            <Card card={cards[1]} heightClass="h-64 md:h-72" delay={0.1} />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-1/5 md:mt-16 lg:mt-20">
            <Card card={cards[2]} heightClass="h-96 md:h-[32rem]" delay={0.2} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-1/5 md:mt-32 lg:mt-40">
            <Card card={cards[3]} heightClass="h-80 md:h-[22rem]" delay={0.3} />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-1/5 md:mt-16 lg:mt-20">
            <Card card={cards[4]} heightClass="h-96 md:h-[32rem]" delay={0.4} />
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full md:w-1/5">
             <Card card={cards[5]} heightClass="h-80 md:h-96" delay={0.5} />
             <Card card={cards[6]} heightClass="h-64 md:h-72" delay={0.6} />
          </div>

        </div>
      </div>
    </section>
  );
}
