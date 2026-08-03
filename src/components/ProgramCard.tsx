"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { Course } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProgramCardProps {
  course: Course;
  index: number;
}

export function ProgramCard({ course, index }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-border bg-card text-card-foreground transition-all hover:shadow-lg dark:hover:shadow-primary/5">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {course.level}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <h3 className="text-xl font-heading font-bold">{course.title}</h3>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-muted-foreground mb-6 line-clamp-3">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>Self-paced</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            View Syllabus
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
