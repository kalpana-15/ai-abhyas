"use client";

import { Clock, GraduationCap, MonitorPlay, Code2, Users, FileBadge, Globe2, Shapes } from "lucide-react";

export function CourseOverview({ course }: { course: any }) {
  const overviews = [
    { label: "Duration", value: course.duration, icon: Clock },
    { label: "Training Mode", value: course.mode, icon: MonitorPlay },
    { label: "Course Fee", value: course.fee, icon: Shapes },
    { label: "Eligibility", value: course.eligibility, icon: Users },
    { label: "Modules", value: "15+ Modules", icon: GraduationCap },
    { label: "Projects", value: "Real-world Projects", icon: Code2 },
    { label: "Certificate", value: course.certificateIncluded ? "Included" : "Not Included", icon: FileBadge },
    { label: "Language", value: "English", icon: Globe2 },
  ];

  return (
    <section className="mb-0.5">
      <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 text-foreground">This course includes:</h2>
      
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
        {overviews.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="flex items-center gap-3 text-sm text-foreground"
            >
              <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
              <span>
                {item.label}: <span className="font-semibold">{item.value}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
