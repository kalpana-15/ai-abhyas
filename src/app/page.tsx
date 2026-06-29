import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhoWeTrain } from "@/components/sections/WhoWeTrain";
import { PopularCourses } from "@/components/sections/PopularCourses";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { TrainingModes } from "@/components/sections/TrainingModes";
import { WhyAiAbhyas } from "@/components/sections/WhyAiAbhyas";
import { Outcomes } from "@/components/sections/Outcomes";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-20 bg-background">
        <Hero />

        <WhoWeTrain />
        <TrustedBy />
        <PopularCourses />
        <LearningJourney />
        <TrainingModes />
        <WhyAiAbhyas />
        <Outcomes />
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
