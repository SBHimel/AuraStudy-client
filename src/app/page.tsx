"use client";

import { useEffect, useState } from "react";
import { BackgroundGlows } from "@/components/landing/background-glows";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import LandingSections from "@/components/landing/landing-sections";
import { CourseCard, CourseSkeleton } from "@/components/course-listing";
import { fetchExploreCourses } from "@/lib/api";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchExploreCourses("limit=4"); // হোম পেজের জন্য মাত্র ৪টি কোর্স
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <BackgroundGlows />
      <HeroSection />
      
      {/* কোর্স লিস্ট সেকশন */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-black mb-8">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => <CourseSkeleton key={i} />)
          ) : (
            courses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </section>

      <LandingSections />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}