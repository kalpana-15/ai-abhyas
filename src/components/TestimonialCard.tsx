"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-card border-border relative overflow-hidden">
        <div className="absolute top-4 right-4 text-primary/10">
          <Quote className="w-12 h-12" />
        </div>
        <CardContent className="pt-8 flex flex-col justify-between h-full">
          <p className="text-lg mb-6 relative z-10 italic">
            "{testimonial.content}"
          </p>
          <div className="flex items-center gap-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full border-2 border-primary/20"
            />
            <div>
              <h4 className="font-bold font-heading">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
