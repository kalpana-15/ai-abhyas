"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { FaLinkedin, FaGithub, FaGlobe, FaStar } from "react-icons/fa"

export interface TeamMemberData {
  id: string
  name: string
  role: string
  image: string
  order?: number
  experience?: string
  description?: string
  socials?: { linkedin?: string; github?: string; portfolio?: string }
}

export default function TeamFolder({ member, compact = false }: { member: TeamMemberData, compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  const folderHeight = compact ? 400 : 500

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div
      ref={ref}
      className={`folder-wrapper relative w-full cursor-pointer select-none ${open ? "is-open" : ""}`}
      style={{ perspective: "1500px", minHeight: folderHeight }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="folder relative h-full w-full" style={{ transformStyle: "preserve-3d", minHeight: folderHeight }}>
        {/* Back cover */}
        <div className="folder-back absolute inset-0 rounded-[32px] bg-muted transition-all duration-500 border-[0.75px] border-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.04),0_8px_32px_rgba(0,0,0,0.4)]">
          <div
            className="absolute left-8 -top-4 h-10 w-28 rounded-t-3xl bg-primary"
            style={{ zIndex: -1 }}
          />
        </div>

        {/* Internal document */}
        <div
          className="file-document absolute left-[4%] top-5 flex w-[92%] rounded-[32px] bg-card shadow-md border border-border/50"
          style={{
            height: "88%",
            padding: compact ? "16px" : "24px",
            transformOrigin: "center center",
            zIndex: 2,
            transition: "transform 0.65s cubic-bezier(0.25,1,0.5,1), top 0.65s cubic-bezier(0.25,1,0.5,1), left 0.65s cubic-bezier(0.25,1,0.5,1), box-shadow 0.6s ease",
          }}
        >
          {/* Vertical warning text */}
          <div
            className="document-warning absolute right-4 font-bold tracking-widest text-muted-foreground/40 transition-opacity duration-300"
            style={{ top: 44, writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.75rem", opacity: open ? 0 : 1 }}
          >
            TEAM MEMBER
          </div>

          {/* Document content */}
          <div
            className={`document-content flex w-full h-full ${compact ? "flex-col gap-3" : "gap-4"}`}
            style={{ opacity: open ? 1 : 0, transition: "opacity 0.3s ease", transitionDelay: open ? "0.12s" : "0s" }}
          >
            {/* Image */}
            <div className={`relative overflow-hidden rounded-3xl border border-border/50 flex-shrink-0 ${compact ? "w-full h-[125px]" : "w-1/2 h-full min-h-[200px]"}`}>
              <Image src={member.image} alt={member.name} fill className="object-cover" style={{ objectPosition: "center 20%" }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>

            {/* Details */}
            <div className={`flex flex-col py-1 ${compact ? "w-full flex-1" : "w-1/2 flex-1"}`}>
              <div>
                <h3 className={`${compact ? "text-base" : "text-lg"} font-extrabold leading-tight text-foreground`}>{member.name}</h3>
                <p className={`mt-1 font-bold uppercase tracking-wide text-primary ${compact ? "text-[10px]" : "text-xs"}`}>{member.role}</p>
                {member.experience && (
                  <span className={`mt-2 inline-block rounded-md font-bold uppercase bg-primary/10 text-primary ${compact ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[11px]"}`}>
                    {member.experience}
                  </span>
                )}
              </div>
              {member.description && (
                <p className={`mt-1.5 flex-1 leading-relaxed text-muted-foreground overflow-hidden ${compact ? "text-[10px] line-clamp-4" : "text-[11px] mt-3"}`}>{member.description}</p>
              )}
              {member.socials && (
                <div className={`flex items-center gap-3 border-t border-border/50 ${compact ? "pt-2 mt-auto" : "pt-4 mt-auto"}`}>
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" onClick={(e) => e.stopPropagation()}>
                      <FaLinkedin size={compact ? 14 : 18} />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" onClick={(e) => e.stopPropagation()}>
                      <FaGithub size={compact ? 14 : 18} />
                    </a>
                  )}
                  {member.socials.portfolio && (
                    <a href={member.socials.portfolio} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" onClick={(e) => e.stopPropagation()}>
                      <FaGlobe size={compact ? 14 : 18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Front cover */}
        <div
          className="folder-cover absolute inset-0 overflow-hidden rounded-[32px] bg-card border-[0.75px] border-primary/40 shadow-[10px_0_30px_rgba(0,0,0,0.15)]"
          style={{
            transformOrigin: "left center",
            zIndex: 3,
            backfaceVisibility: "hidden",
            transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
          }}
        >
          {/* Dull greyscale image background */}
          <Image
            src={member.image}
            alt=""
            fill
            className="object-cover cover-image transition-all duration-500 ease-out"
            style={{ filter: "grayscale(80%) brightness(0.45) contrast(1.1)", objectPosition: "center 20%" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Content overlay */}
          <div className="relative flex h-full flex-col justify-between p-6">
            <div
              className={`flex items-center justify-center rounded-lg bg-primary/15 ${compact ? "h-6 w-6" : "h-8 w-8"}`}
            >
              <FaStar size={compact ? 12 : 14} className="text-primary" />
            </div>

            {/* Bottom: name + role */}
            <div>
              <h4 className={`${compact ? "text-base" : "text-lg"} font-bold text-white leading-tight`}>{member.name}</h4>
              <p className={`mt-1 font-medium tracking-wide text-white/70 ${compact ? "text-[10px]" : "text-xs"}`}>{member.role}</p>
            </div>
          </div>
        </div>

        {/* Hover + open CSS */}
        <style>{`
          .folder-wrapper {
            transition: filter 0.4s ease;
          }
          .folder-wrapper:not(.is-open):hover {
            filter: drop-shadow(0 0 24px hsl(var(--primary) / 0.15));
          }
          .folder-wrapper:not(.is-open):hover .folder-cover {
            transform: rotateY(-22deg);
          }
          .folder-wrapper:not(.is-open):hover .folder-back,
          .folder-wrapper:not(.is-open):hover .folder-cover {
            border-color: transparent !important;
          }
          .folder-wrapper:not(.is-open):hover .cover-image {
            filter: grayscale(0%) brightness(0.7) contrast(1.1) !important;
          }
          .folder-wrapper:not(.is-open):hover .file-document {
            left: 12%;
            transform: rotate(4deg);
          }
          .folder-wrapper.is-open .folder-cover {
            transform: rotateY(-130deg);
          }
          .folder-wrapper.is-open .file-document {
            top: 0 !important;
            left: 1% !important;
            transform: rotate(2deg) scale(1.02) !important;
            box-shadow: 0 20px 50px rgba(0,0,0,0.25) !important;
            z-index: 10 !important;
          }
          .folder-wrapper.is-open .document-warning {
            opacity: 0 !important;
          }
        `}</style>
      </div>
    </div>
  )
}
