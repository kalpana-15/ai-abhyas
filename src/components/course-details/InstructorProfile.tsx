"use client";

import Image from "next/image";
import { Star, Users, PlayCircle, Globe } from "lucide-react";

export function InstructorProfile({ instructor }: { instructor: any }) {
  return (
    <section className="mb-0.5">
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-foreground">Meet Your Instructor</h2>
      
      <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        
        {/* Photo */}
        <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-2xl overflow-hidden bg-muted border-4 border-background shadow-xl">
          <Image 
            src={instructor.image} 
            alt={instructor.name} 
            fill 
            className="object-cover" 
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-1">{instructor.name}</h3>
              <p className="text-primary font-medium">{instructor.designation}</p>
            </div>
            
            <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-medium">
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-amber-500 mr-1.5" />
              <span className="text-foreground">{instructor.rating} Rating</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="w-5 h-5 mr-1.5 text-primary" />
              <span>{instructor.students} Students</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <PlayCircle className="w-5 h-5 mr-1.5 text-primary" />
              <span>{instructor.courses} Courses</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">About the Instructor</h4>
            <p className="text-muted-foreground leading-relaxed">
              {instructor.bio}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over {instructor.experience} of industry experience, they bring real-world insights and enterprise-grade architectural knowledge directly to the classroom, ensuring you are learning what actually matters in the industry today.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
