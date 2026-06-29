"use client";

import coursesData from "@/data/courses.json";
import { CourseCard } from "@/components/ui/CourseCard";
import { motion } from "framer-motion";

export function RelatedCourses({ currentCourseId }: { currentCourseId: string }) {
  // Get 3 other courses excluding the current one
  const relatedCourses = coursesData
    .filter((course) => course.id !== currentCourseId)
    .slice(0, 3);

  if (relatedCourses.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Related Courses</h2>
          <p className="text-muted-foreground mt-2">Explore other popular programs to accelerate your journey.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
