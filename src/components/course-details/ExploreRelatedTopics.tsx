"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ExploreRelatedTopics({ course }: { course: any }) {
  // Use course.relatedTopics if it exists, otherwise a fallback list based on the course
  const topics = course.relatedTopics && course.relatedTopics.length > 0
    ? course.relatedTopics
    : ["Artificial Intelligence", "Large Language Models", "Python", "Data Science", "Machine Learning"];

  return (
    <section className="mb-0.5">
      <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 text-foreground">Explore related topics</h2>
      
      <div className="flex flex-wrap gap-3">
        {topics.map((topic: string, idx: number) => (
          <Link 
            key={idx} 
            href="/courses" 
            className="group flex items-center justify-between gap-2 px-4 py-3 rounded-full border border-border bg-background hover:bg-muted transition-colors"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{topic}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}
