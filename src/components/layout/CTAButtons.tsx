import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CTAButtonsProps {
  className?: string;
  isMobile?: boolean;
}

export function CTAButtons({ className, isMobile }: CTAButtonsProps) {
  return (
    <div className={cn("flex gap-4", isMobile ? "flex-col items-stretch" : "items-center", className)}>
      <Link href="/login" className={isMobile ? "w-full" : ""}>
        <Button
          variant="outline"
          className={cn(
            "font-medium hover:bg-muted/50 hover:text-primary transition-colors w-full",
            isMobile && "h-12 text-base"
          )}
        >
          Login
        </Button>
      </Link>
      <Link href="/register" className={isMobile ? "w-full" : ""}>
        <Button
          className={cn(
            "bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all hover:scale-[1.02] w-full",
            isMobile ? "h-12 text-base" : "px-6"
          )}
        >
          Enroll Now
        </Button>
      </Link>
    </div>
  );
}
