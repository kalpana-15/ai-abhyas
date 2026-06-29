"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Hammer, ArrowRight } from "lucide-react";

export function ProjectsShowcase({ projects }: { projects: any[] }) {
  return (
    <section className="mb-0.5">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Projects You'll Build</h2>
        <p className="text-muted-foreground mt-2">Apply your knowledge to solve real-world problems and build a stunning portfolio.</p>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-3xl overflow-hidden border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row"
          >
            {/* Project Image */}
            <div className="relative w-full md:w-[300px] lg:w-[380px] shrink-0 h-56 md:h-auto bg-muted overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                  project.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-red-500/20 text-red-300'
                } backdrop-blur-md border border-white/10`}>
                  {project.difficulty}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:bg-primary group-hover:border-primary transition-colors">
                  <Hammer className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold font-heading text-foreground mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                A comprehensive project where you will implement end-to-end functionality using modern AI principles.
              </p>
              
              <div>
                <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Skills Applied</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill: string, sIdx: number) => (
                    <span key={sIdx} className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
