"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, BrainCircuit, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { CTAButtons } from "./CTAButtons";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const desktopNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "#training", label: "Training Modes" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const tabletNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "#training", label: "Training Modes" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        {/* Desktop (1280px+) Container is 1280px, content 1200px max */}
        <div className="mx-auto max-w-[1200px] w-full px-4 md:px-6 h-16 md:h-[72px] xl:h-20 flex items-center justify-between">
          
          {/* Left Group: Logo & Navigation */}
          <div className="flex items-center gap-16 lg:gap-24 xl:gap-32">
            {/* Logo (Left) */}
          <Link href="/" className="flex items-center group shrink-0">
            <img 
              src="/Assets/logoo.png" 
              alt="AI Abhyas Logo" 
              className="h-10 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center">
            <ul className="flex items-center gap-8">
              {desktopNavLinks.map((link) => (
                <li key={link.href}>
                  {link.label === "Training Modes" ? (
                    <div className="relative group/dropdown">
                      <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2 focus:outline-none">
                        {link.label}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/dropdown:-rotate-180" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 invisible group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-200 w-48 z-50">
                        <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl p-3 flex flex-col gap-2 items-start">
                          <NavLink href="/courses?mode=online#course-catalog" className="px-2 w-fit">Online Courses</NavLink>
                          <NavLink href="/courses?mode=offline#course-catalog" className="px-2 w-fit">Offline Courses</NavLink>
                          <NavLink href="/courses?mode=hybrid#course-catalog" className="px-2 w-fit">Hybrid Courses</NavLink>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink href={link.href}>{link.label}</NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Tablet Nav */}
          <nav className="hidden md:flex xl:hidden items-center">
            <ul className="flex items-center gap-6">
              {tabletNavLinks.map((link) => (
                <li key={link.href}>
                  {link.label === "Training Modes" ? (
                    <div className="relative group/dropdown">
                      <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2 focus:outline-none">
                        {link.label}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/dropdown:-rotate-180" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 invisible group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-200 w-48 z-50">
                        <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl p-3 flex flex-col gap-2 items-start">
                          <NavLink href="/courses?mode=online#course-catalog" className="px-2 w-fit">Online Courses</NavLink>
                          <NavLink href="/courses?mode=offline#course-catalog" className="px-2 w-fit">Offline Courses</NavLink>
                          <NavLink href="/courses?mode=hybrid#course-catalog" className="px-2 w-fit">Hybrid Courses</NavLink>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink href={link.href}>{link.label}</NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          </div>

          {/* Right Actions: Desktop & Tablet */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <ThemeToggle />
            
            {/* Tablet CTA: Only Enroll Now visible or both if space allows. We show both but rely on flex shrinking if needed, or hide Login on tablet. The prompt said "Enroll Button" for tablet. We can just show the full CTAButtons which contains both, or a modified version. Let's show CTAButtons since it looks good. */}
            <div className="hidden xl:block">
              <CTAButtons />
            </div>
            <div className="xl:hidden">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] transition-all">
                Enroll Now
              </Button>
            </div>
            
            {/* Hamburger for Tablet overflow & Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Right Actions: Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={desktopNavLinks}
      />
    </>
  );
}
