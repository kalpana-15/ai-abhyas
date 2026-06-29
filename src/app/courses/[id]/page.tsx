import { notFound } from "next/navigation";
import coursesData from "@/data/courses.json";
import { CourseHero } from "@/components/course-details/CourseHero";
import { StickyEnrollment } from "@/components/course-details/StickyEnrollment";
import { MobileStickyEnrollment } from "@/components/course-details/MobileStickyEnrollment";
import { ExploreRelatedTopics } from "@/components/course-details/ExploreRelatedTopics";
import { CourseOverview } from "@/components/course-details/CourseOverview";
import { WhatYouWillLearn } from "@/components/course-details/WhatYouWillLearn";
import { SkillsYouWillGain } from "@/components/course-details/SkillsYouWillGain";
import { ToolsGrid } from "@/components/course-details/ToolsGrid";
import { Curriculum } from "@/components/course-details/Curriculum";
import { ProjectsShowcase } from "@/components/course-details/ProjectsShowcase";
import { LearningResources } from "@/components/course-details/LearningResources";
import { WhoShouldEnroll } from "@/components/course-details/WhoShouldEnroll";
import { LearningJourney } from "@/components/course-details/LearningJourney";
import { InstructorProfile } from "@/components/course-details/InstructorProfile";
import { CertificateShowcase } from "@/components/course-details/CertificateShowcase";
import { StudentReviews } from "@/components/course-details/StudentReviews";
import { RelatedCourses } from "@/components/course-details/RelatedCourses";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = coursesData.find((c) => c.id === resolvedParams.id);

  if (!course) {
    notFound();
  }


  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="relative pt-16 lg:pt-20">
        {/* Solid Hero Background matching theme with a gap from top */}
        <div className="absolute top-16 lg:top-20 left-0 right-0 h-[500px] lg:h-[450px] bg-muted dark:bg-card border-y border-border z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 relative items-start">
            
            <div className="flex flex-col gap-[78px] w-full max-w-4xl pb-16">
              
              {/* Hero Section Content (Left Side) */}
              <div>
                <CourseHero course={course} instructor={course.instructor} />
              </div>

              {/* What You'll Learn (Udemy style detailed box) */}
              <WhatYouWillLearn course={course} />

              {/* Explore Related Topics */}
              <ExploreRelatedTopics course={course} />

              {/* Main Course Content */}
              <CourseOverview course={course} />

              <div>
                <SkillsYouWillGain skills={course.skills} />
              </div>

            <ToolsGrid tools={course.tools} />
            <Curriculum curriculum={course.curriculum} />
            <LearningResources />
            <ProjectsShowcase projects={course.projects} />
            <WhoShouldEnroll />
            <LearningJourney />
            <InstructorProfile instructor={course.instructor} />
            <CertificateShowcase />
            <StudentReviews />
            </div>

            {/* Right Side: Sticky Card overlapping Hero and scrolling past it */}
            <div className="hidden lg:block sticky top-24 z-30 pt-8 lg:pt-12">
              <StickyEnrollment course={course} />
            </div>
          </div>
        </div>
      </div>

      <RelatedCourses currentCourseId={course.id} />

      <Footer />

      <MobileStickyEnrollment course={course} />
    </div>
  );
}
