"use client";

import { Star, CheckCircle } from "lucide-react";
import Image from "next/image";

export function StudentReviews() {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      profession: "Software Engineer",
      review: "This course completely transformed my understanding of AI. The hands-on projects were exactly what I needed to transition into an AI engineering role.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      name: "Priya Patel",
      profession: "Data Analyst",
      review: "The curriculum is perfectly structured. Going from basics to deploying enterprise-grade LLMs in just a few weeks felt incredible. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      name: "Anand Verma",
      profession: "Product Manager",
      review: "As a non-coder, I was intimidated by AI. This course broke down complex topics into digestible chunks. I now lead our AI product initiatives.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <section className="mb-0.5">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">What Our Learners Say</h2>
        <p className="text-muted-foreground mt-2">Join thousands of professionals upgrading their careers.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
            
            <div className="flex text-amber-500 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-500' : 'fill-muted text-muted'}`} />
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm italic mb-6 flex-1">&quot;{review.review}&quot;</p>
            
            <div className="flex items-center gap-4 mt-auto">
              <Image 
                src={review.image} 
                alt={review.name} 
                width={48} 
                height={48} 
                className="rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  {review.name}
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                </p>
                <p className="text-xs text-muted-foreground">{review.profession}</p>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
