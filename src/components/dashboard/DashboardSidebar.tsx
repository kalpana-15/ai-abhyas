"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FolderOpen, 
  CheckSquare, 
  BarChart2, 
  Award, 
  CreditCard, 
  User, 
  HeadphonesIcon,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Live Classes", href: "/dashboard/live", icon: Video },
  { name: "Study Materials", href: "/dashboard/materials", icon: FolderOpen },
  { name: "Assessments", href: "/dashboard/assessments", icon: CheckSquare },
  { name: "Results", href: "/dashboard/results", icon: BarChart2 },
  { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  { name: "Payment History", href: "/dashboard/payments", icon: CreditCard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Support", href: "/dashboard/support", icon: HeadphonesIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [robotAnimation, setRobotAnimation] = React.useState(null);

  React.useEffect(() => {
    fetch("/Assets/animations/Robot Ai chatbot.json")
      .then(res => res.json())
      .then(data => setRobotAnimation(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  return (
    <aside className="w-[280px] h-screen bg-card border-r border-border/50 hidden lg:flex flex-col flex-shrink-0 sticky top-0 left-0 overflow-y-auto overflow-x-hidden pt-6">
      
      {/* Logo */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <div>
          <h1 className="text-xl font-bold font-heading tracking-tight text-foreground leading-tight">AI Abhyas</h1>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">AI Learning. Real Skills.</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-6 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
          return (
            <Link key={item.name} href={item.href}>
              <span
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  />
                )}
                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground")} />
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Promo Card */}
      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-[#5E35B1] to-[#4527A0] rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-primary/20 group">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          
          <div className="relative z-10 flex flex-col h-full">
            <h4 className="text-white font-semibold text-sm mb-1">AI Learning<br/>Assistant</h4>
            <p className="text-white/70 text-[10px] mb-4">Need help with your learning?</p>
            
            <button className="bg-white text-primary text-xs font-semibold py-2 px-3 rounded-lg w-full flex items-center justify-center gap-1 hover:bg-white/90 transition-colors">
              Chat Now &rarr;
            </button>
          </div>

          <div className="absolute bottom-1 right-1 w-16 h-16 opacity-90 drop-shadow-2xl">
             {robotAnimation ? (
                <Lottie animationData={robotAnimation} loop={true} />
              ) : (
                <Bot className="w-12 h-12 text-white/50" />
              )}
          </div>
        </div>
      </div>
      
    </aside>
  );
}
