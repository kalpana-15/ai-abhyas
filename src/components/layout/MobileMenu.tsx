import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavLink } from "./NavLink";
import { CTAButtons } from "./CTAButtons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] md:hidden"
            onClick={onClose}
          />
          
          {/* Drawer from Right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border z-[70] flex flex-col shadow-2xl md:hidden overflow-hidden"
          >
            {/* Header: Theme & Close */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="p-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-lg py-3"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="mt-auto p-6 border-t border-border bg-muted/30">
                <CTAButtons isMobile />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
