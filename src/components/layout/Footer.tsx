import Link from "next/link";
import { BrainCircuit, Check, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const footerLinks = {
  courses: [
    { label: "AI Foundations", href: "/courses/c2" },
    { label: "Generative AI Masterclass", href: "/courses/c1" },
    { label: "Prompt Engineering Bootcamp", href: "/courses/c7" },
    { label: "Machine Learning Essentials", href: "/courses/c3" },
    { label: "View All Courses", href: "/courses" },
  ],
  modes: [
    { label: "Online Training", href: "/" },
    { label: "On-Campus Training", href: "/" },
    { label: "Corporate Training", href: "/" },
    { label: "Workshops & Bootcamps", href: "/" },
    { label: "Institution Partnerships", href: "/" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/#faq" },
  ],
  resources: [
    { label: "Learning Resources", href: "#" },
    { label: "Certifications", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const trustItems = [
  "Practical AI Training",
  "Industry Certifications",
  "Corporate Training",
  "Institution Partnerships",
];

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76a5.2 5.2 0 0 0-1.5-3.78c.15-.4.65-1.8-.15-3.8 0 0-1.2-.38-3.9 1.4a13.3 13.3 0 0 0-7 0C4.8 1.62 3.6 2 3.6 2c-.8 2-.3 3.4-.15 3.8A5.2 5.2 0 0 0 2 9.54c0 5.26 3 6.46 6 6.76A4.8 4.8 0 0 0 7 18.5v3.5" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6c1-1.1 2.2-1.1 2.7-1.1C8.7 3.3 12 3.3 12 3.3s3.3 0 6.2.2c.5 0 1.7 0 2.7 1.1.8.8 1 2.5 1 2.5s.2 2 .2 4v2.4c0 2-.2 4-.2 4s-.2 1.7-1 2.5c-1 1.1-2.4 1-3 1.2-3.2.3-6.2.2-6.2.2s-3.3 0-6.2-.2c-.5 0-1.7 0-2.7-1.1-.8-.8-1-2.5-1-2.5s-.2-2-.2-4V9.6c0-2 .2-4 .2-4z" />
    <path d="M9.7 15.6V8l6.3 3.8-6.3 3.8z" />
  </svg>
);

const SocialIcon = ({ Icon, href }: { Icon: any, href: string }) => (
  <Link href={href} className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1">
    <div className="bg-muted p-2.5 rounded-full border border-border">
      <Icon className="w-5 h-5" />
    </div>
  </Link>
);

const FooterLink = ({ label, href }: { label: string, href: string }) => (
  <Link href={href} className="text-muted-foreground text-sm hover:text-primary transition-colors relative group inline-block">
    {label}
    <span className="absolute left-0 bottom-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
  </Link>
);

export function Footer() {
  return (
    <footer className="bg-muted/30 pb-[64px] border border-border border-b-0 rounded-t-[40px] md:rounded-t-[80px] mt-24 relative">
      {/* Background Image that fades in from the bottom */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/images/footer_white.png')] dark:bg-[url('/assets/images/footer_dark.png')] bg-cover bg-bottom bg-no-repeat opacity-60 dark:opacity-70 [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)] pointer-events-none rounded-t-[40px] md:rounded-t-[80px] overflow-hidden" />
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col relative z-10">
        {/* LAYER 3: Main Footer Columns (Desktop/Tablet) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-12 mb-[64px] mt-24">
          {/* Brand Column (Full width on tablet, 1 col on desktop) */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center group w-fit">
              <Logo className="h-8 md:h-9" />
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering learners and organizations with practical AI training for a smarter future.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <SocialIcon Icon={LinkedinIcon} href="#" />
              <SocialIcon Icon={InstagramIcon} href="#" />
              <SocialIcon Icon={YoutubeIcon} href="#" />
              <SocialIcon Icon={GithubIcon} href="#" />
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold mb-6 font-heading text-foreground">Courses</h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, i) => (
                <li key={i}><FooterLink {...link} /></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 font-heading text-foreground">Training Modes</h3>
            <ul className="space-y-3">
              {footerLinks.modes.map((link, i) => (
                <li key={i}><FooterLink {...link} /></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 font-heading text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}><FooterLink {...link} /></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 font-heading text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}><FooterLink {...link} /></li>
              ))}
            </ul>
          </div>
        </div>

        {/* LAYER 3: Main Footer Accordion (Mobile) */}
        <div className="md:hidden flex flex-col gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center group w-fit">
              <Logo className="h-8 md:h-9" />
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering learners and organizations with practical AI training for a smarter future.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon Icon={LinkedinIcon} href="#" />
              <SocialIcon Icon={InstagramIcon} href="#" />
              <SocialIcon Icon={YoutubeIcon} href="#" />
              <SocialIcon Icon={GithubIcon} href="#" />
            </div>
          </div>

          <Accordion className="w-full">
            <AccordionItem value="courses">
              <AccordionTrigger className="font-heading font-bold text-base hover:no-underline">Courses</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pt-2 pb-4">
                  {footerLinks.courses.map((link, i) => (
                    <li key={i}><FooterLink {...link} /></li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="modes">
              <AccordionTrigger className="font-heading font-bold text-base hover:no-underline">Training Modes</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pt-2 pb-4">
                  {footerLinks.modes.map((link, i) => (
                    <li key={i}><FooterLink {...link} /></li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="company">
              <AccordionTrigger className="font-heading font-bold text-base hover:no-underline">Company</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pt-2 pb-4">
                  {footerLinks.company.map((link, i) => (
                    <li key={i}><FooterLink {...link} /></li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="resources">
              <AccordionTrigger className="font-heading font-bold text-base hover:no-underline">Resources</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pt-2 pb-4">
                  {footerLinks.resources.map((link, i) => (
                    <li key={i}><FooterLink {...link} /></li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>

        {/* LAYER 4: Copyright Bar */}
        <div className="border-t border-border pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-sm text-muted-foreground text-center lg:text-left">
          {/* Left */}
          <div>
            <p>© {new Date().getFullYear()} AI Abhyas. All Rights Reserved.</p>
          </div>
          
          {/* Right */}
          <div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
