"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={false}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-300 focus-visible:outline-none border-border bg-transparent",
          className
        )}
        aria-label="Toggle theme placeholder"
      >
        <span className="pointer-events-none block h-5 w-5 rounded-full bg-black dark:bg-white shadow-lg ring-0 transition-transform duration-300 translate-x-0" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "border-transparent bg-primary" : "border-border bg-transparent",
        className
      )}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-black dark:bg-white shadow-lg ring-0 transition-transform duration-300",
          isDark ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}

