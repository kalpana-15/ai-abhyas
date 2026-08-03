"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Star, ArrowRight, ArrowLeft } from "lucide-react"
import testimonialsRawData from "@/data/testimonials.json"

const testimonialsData = testimonialsRawData.map((t, i) => ({
  ...t,
  highlight: null,
  bgColor: i % 3 === 0 ? "#14B8A6" : i % 3 === 1 ? "#DAA520" : "#8B5CF6"
}))

const positions = [
  { key: "far-left", z: 1, x: -110, scale: 0.7, opacity: 1 },
  { key: "left", z: 5, x: -55, scale: 0.85, opacity: 1 },
  { key: "active", z: 10, x: 0, scale: 1, opacity: 1 },
  { key: "right", z: 5, x: 55, scale: 0.85, opacity: 1 },
  { key: "far-right", z: 1, x: 110, scale: 0.7, opacity: 1 },
]

function highlightText(text: string, highlight: string | null) {
  if (!highlight) return text
  const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase()
      ? <mark key={i} className="bg-primary/30 text-primary-light px-1 rounded">{part}</mark>
      : part
  )
}

export function Testimonials() {
  const [mounted, setMounted] = useState(false)
  const [testimonials, setTestimonials] = useState(testimonialsData)
  const [loading, setLoading] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const rotateForward = useCallback(() => {
    setTestimonials((prev) => {
      const copy = [...prev]
      copy.push(copy.shift()!)
      return copy
    })
  }, [])

  const rotateBackward = useCallback(() => {
    setTestimonials((prev) => {
      const copy = [...prev]
      copy.unshift(copy.pop()!)
      return copy
    })
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") rotateForward()
      else if (e.key === "ArrowLeft") rotateBackward()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [rotateForward, rotateBackward])

  function handleCardClick(index: number) {
    if (index === 3 || index === 4) rotateForward()
    else if (index === 0 || index === 1) rotateBackward()
  }

  function getCardStyle(index: number) {
    if (index > 4) {
      return {
        opacity: 0,
        pointerEvents: "none",
        zIndex: 0,
        transform: `translateX(0%) scale(0.5)`,
      } as React.CSSProperties
    }
    const pos = positions[index]
    return {
      transform: `translateX(${pos.x}%) scale(${pos.scale})`,
      zIndex: pos.z,
      opacity: pos.opacity,
    }
  }

  return (
    <section className="relative overflow-hidden bg-muted/30 border-y border-border py-24 transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`mx-auto max-w-4xl flex flex-col items-center mb-16 text-center transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <Star className="w-4 h-4" />
            <span className="tracking-wide">Student Feedback</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-foreground">
            What Our <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Students Say</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Real stories from real learners who transformed their careers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className={`relative mt-14 transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: "200ms" }}>
            <div className="relative mx-auto flex items-center justify-center" style={{ height: 480, maxWidth: 900 }}>
              {testimonials.map((t, i) => {
                const isActive = i === 2
                return (
                  <div
                    key={t.id}
                    className="absolute flex cursor-pointer flex-col justify-between rounded-[32px] p-8 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] select-none sm:p-10 bg-card border-2"
                    style={{
                      width: 360,
                      height: 440,
                      borderColor: isActive ? t.bgColor : 'var(--border)',
                      ...getCardStyle(i),
                      ...(isActive ? { boxShadow: `0 0 30px ${t.bgColor}20` } : {}),
                    } as React.CSSProperties}
                    onClick={() => handleCardClick(i)}
                  >
                    {isActive && (
                      <div 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-lg"
                        style={{ backgroundColor: t.bgColor }}
                      >
                        <Star size={12} className="fill-current" />
                        Most Popular
                      </div>
                    )}

                    <div>
                      <div 
                        className="text-7xl leading-none font-serif mb-2 font-bold opacity-20"
                        style={{ color: t.bgColor }}
                      >
                        &ldquo;
                      </div>
                      <p className="flex-1 mt-2 text-sm leading-relaxed text-foreground sm:text-base italic">
                        {highlightText(t.content, t.highlight)}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                      <div 
                        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2"
                        style={{ boxShadow: isActive ? `0 0 0 2px ${t.bgColor}` : 'none' }}
                      >
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold font-heading text-foreground">{t.name}</h4>
                        <p className="mt-0.5 text-sm font-medium" style={{ color: t.bgColor }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-center gap-4 relative z-20">
              <button
                onClick={rotateBackward}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-90"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const diff = (i - 2 + testimonials.length) % testimonials.length
                      const forward = diff <= testimonials.length / 2
                      const steps = forward ? diff : testimonials.length - diff
                      for (let s = 0; s < steps; s++) {
                        if (forward) rotateForward();
                        else rotateBackward();
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === 2
                        ? "w-8 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                        : "w-2 bg-border hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={rotateForward}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-90"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
