"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { enrollInCourse, fetchCourseDetails } from "@/lib/api";
import { Button, Spinner, Tabs, Card } from "@heroui/react";
import { Calendar, User, Star, Award } from "lucide-react";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id as string)
        .then(setCourse)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleEnroll = async () => {
  try {
    setEnrolling(true);

    await enrollInCourse(course._id);

    alert("Successfully enrolled in this course!");
  } catch (error: any) {
    alert(error.message || "Failed to enroll");
  } finally {
    setEnrolling(false);
  }
};

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Spinner size="lg" color="secondary" />
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Course Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-white/5 bg-slate-900 aspect-video">
            <img
              src={course.image || "https://placehold.co/800x450/png"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Separate Sections with Tabs */}
          <Tabs variant="secondary" className="w-full border-b border-white/10">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Course options">
                <Tabs.Tab id="overview">
                  Description / Overview
                  <Tabs.Indicator />
                </Tabs.Tab>

                <Tabs.Tab id="specs">
                  Specifications
                  <Tabs.Indicator />
                </Tabs.Tab>

                <Tabs.Tab id="reviews">
                  Reviews & Ratings
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="overview">
              <Card className="bg-slate-900/40 border border-white/5 mt-4 rounded-2xl">
                <div className="p-6 text-slate-300 leading-relaxed space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Course Details
                  </h3>

                  <p>{course.fullDescription || course.shortDescription}</p>
                </div>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel id="specs">
              <Card className="bg-slate-900/40 border border-white/5 mt-4 rounded-2xl">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Key Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-white/5">
                      <User className="text-violet-400 w-5 h-5" />

                      <div>
                        <p className="text-xs text-slate-400">Instructor</p>

                        <p className="text-sm font-semibold">
                          {course.instructorName || "Verified Expert"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-white/5">
                      <Calendar className="text-violet-400 w-5 h-5" />

                      <div>
                        <p className="text-xs text-slate-400">Published Date</p>

                        <p className="text-sm font-semibold">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel id="reviews">
              <Card className="bg-slate-900/40 border border-white/5 mt-4 rounded-2xl">
                <div className="p-6 text-center py-10">
                  <Star className="w-12 h-12 text-amber-400 mx-auto mb-3 fill-amber-400/20" />

                  <h4 className="text-lg font-bold">No Reviews Yet</h4>

                  <p className="text-sm text-slate-400 mt-1">
                    Be the first student to share your thoughts after
                    enrollment!
                  </p>
                </div>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* Right Column: Checkout Widget */}
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-white/5 p-6 rounded-3xl sticky top-6 backdrop-blur-md">
            <span className="text-xs font-bold text-violet-400 tracking-wider uppercase">
              {course.category}
            </span>
            <h1 className="text-2xl font-black mt-2 leading-tight">
              {course.title}
            </h1>

            <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />{" "}
                <span className="ml-1 font-bold text-white">4.8</span>
              </div>
              <span>•</span>
              <span>Self-paced Learning</span>
            </div>

            <div className="my-6 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                Course Price
              </p>
              <h2 className="text-4xl font-black mt-1 text-white">
                ${course.price}
              </h2>
            </div>

            <Button
  onPress={handleEnroll}
  isLoading={enrolling}
  className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-violet-500/20 rounded-xl"
>
  {enrolling ? "Enrolling..." : "Enroll in Course"}
</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
