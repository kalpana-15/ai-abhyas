"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ href, children, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors group py-2",
        isActive ? "text-primary" : "text-foreground/80 hover:text-primary",
        className
      )}
    >
      {children}
      <span className={cn(
        "absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300",
        isActive ? "w-full" : "w-0 group-hover:w-full"
      )} />
    </Link>
  );
}
