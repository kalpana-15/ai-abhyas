import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramCard } from "@/components/ProgramCard";
import coursesData from "@/data/courses.json";
import { Course } from "@/types";

export function Programs() {
  const courses: Course[] = coursesData;

  return (
    <section id="courses" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Learning Paths"
          title="Featured Programs"
          subtitle="Comprehensive, hands-on curriculums designed to take you from fundamentals to advanced AI engineering."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {courses.map((course, index) => (
            <ProgramCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
