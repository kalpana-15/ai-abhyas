"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatYouWillLearn({ course }: { course: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Using dynamic data from course if it exists, otherwise falling back to a detailed list
  const points = course.whatYouWillLearn && course.whatYouWillLearn.length > 0 
    ? course.whatYouWillLearn 
    : [
        "Master the fundamentals of generative AI and understand how Large Language Models (LLMs) work under the hood.",
        "Build, fine-tune, and deploy custom AI models using state-of-the-art frameworks like PyTorch and HuggingFace.",
        "Integrate Vector Databases (Pinecone, Milvus) to create powerful Retrieval-Augmented Generation (RAG) pipelines.",
        "Develop enterprise-ready AI applications using LangChain and OpenAI APIs.",
        "Implement guardrails, ethical AI practices, and security measures in production AI environments.",
        "Optimize models for latency and cost using quantization and efficient deployment strategies."
      ];

  // Show max 4 items when collapsed
  const visiblePoints = isExpanded ? points : points.slice(0, 4);
  const hasMore = points.length > 4;

  return (
    <section className="mb-0.5">
      <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-heading font-bold mb-6 text-foreground">What you'll learn</h2>
        
        <ul className="grid sm:grid-cols-2 gap-4 gap-x-8">
          {visiblePoints.map((point: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5 opacity-80" />
              <span className="text-foreground text-sm font-medium leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        
        {hasMore && (
          <div className="mt-6">
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary hover:bg-primary/5 p-0 h-auto font-bold text-sm tracking-wide"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="w-4 h-4 ml-1" /></>
              ) : (
                <>Show more <ChevronDown className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
