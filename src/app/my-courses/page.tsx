"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Skeleton, Spinner } from "@heroui/react";
import {
  BookOpen,
  Calendar,
  ArrowUpRight,
  GraduationCap,
  Library,
} from "lucide-react";
import { fetchMyEnrolled } from "@/lib/api";


interface EnrolledCourse {
  _id: string;
  courseId: string;
  courseTitle: string;
  courseImage?: string;
  price: number;
  enrolledAt: string;
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyCourses = async () => {
      try {
        const data = await fetchMyEnrolled();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {" "}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}{" "}
        <div className="mb-10">
          {" "}
          <div className="flex items-center gap-3 mb-3">
            {" "}
            <div className="w-11 h-11 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center">
              {" "}
              <GraduationCap className="w-6 h-6 text-violet-400" />{" "}
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
                Learning Dashboard
              </p>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                My Courses
              </h1>
            </div>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Continue learning from the courses you have enrolled in.
          </p>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[390px] rounded-3xl border border-white/5 bg-slate-900/50 p-4 space-y-4"
              >
                <Skeleton className="h-48 w-full rounded-2xl bg-slate-800" />
                <Skeleton className="h-6 w-3/4 rounded-lg bg-slate-800" />
                <Skeleton className="h-4 w-1/2 rounded-lg bg-slate-800" />
                <Skeleton className="h-10 w-full rounded-xl bg-slate-800" />
              </div>
            ))}
          </div>
        )}
        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="min-h-[450px] flex flex-col items-center justify-center text-center rounded-3xl border border-white/5 bg-slate-900/40 px-6">
            <div className="w-20 h-20 rounded-3xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6">
              <Library className="w-10 h-10 text-violet-400" />
            </div>

            <h2 className="text-2xl font-black text-white">No Courses Yet</h2>

            <p className="text-slate-400 max-w-md mt-2 mb-6">
              You have not enrolled in any course yet. Explore our courses and
              start your learning journey today.
            </p>

            <Link href="/courses">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold">
                Explore Courses
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
        {/* Course Grid */}
        {!loading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 hover:border-violet-500/40 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={
                      course.courseImage || "https://placehold.co/800x450/png"
                    }
                    alt={course.courseTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold">
                    Enrolled
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-lg font-bold text-white line-clamp-2 min-h-[56px]">
                    {course.courseTitle}
                  </h2>

                  {/* Meta Info */}
                  <div className="space-y-3 mt-5 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span>
                        Enrolled{" "}
                        {new Date(course.enrolledAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <BookOpen className="w-4 h-4 text-violet-400" />
                      <span>Self-paced Learning</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/courses/${course.courseId}`}
                    className="mt-auto"
                  >
                    <Button className="w-full h-11 rounded-xl bg-violet-600/15 border border-violet-500/20 text-violet-300 font-bold hover:bg-violet-600 hover:text-white transition-all">
                      Continue Learning
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
