"use client";

import { useEffect, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { deleteCourse, fetchMyCourses } from "@/lib/api";
import { FolderOpen, Trash2 } from "lucide-react";
import Link from "next/link";

type Course = {
  _id: string;
  title: string;
  price: number;
  category?: string;
};

export default function ManageItemsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);

      const data = await fetchMyCourses();

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this course?");

    if (!confirmed) return;

    try {
      await deleteCourse(id);

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id),
      );
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}{" "}
      <div className="mb-8">
        {" "}
        <h1 className="text-3xl font-black text-white tracking-tight">
          Manage My Courses{" "}
        </h1>
        <p className="text-slate-400 mt-2">
          Update or remove your published learning content.
        </p>
      </div>
      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center min-h-80">
          <div className="flex items-center gap-3 bg-slate-900/90 p-5 rounded-xl border border-white/10">
            <Spinner color="secondary" size="sm" />

            <span className="text-sm text-slate-300 font-medium">
              Fetching your courses...
            </span>
          </div>
        </div>
      ) : courses.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/40 rounded-3xl border border-white/5">
          <div className="p-4 rounded-full bg-slate-900/80 border border-white/5 text-slate-400 mb-4 shadow-xl">
            <FolderOpen className="w-10 h-10 stroke-[1.5]" />
          </div>

          <h3 className="text-xl font-bold text-white">No Courses Found</h3>

          <p className="text-sm text-slate-400 mt-1 max-w-sm">
            You haven't added any courses yet. Click "Add Course" from the
            sidebar to get started!
          </p>
        </div>
      ) : (
        /* Course Table */
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
          <table className="w-full text-left">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Title
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Price
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-5 font-semibold text-white">
                    {course.title}
                  </td>

                  <td className="px-6 py-5 text-slate-300 font-medium">
                    ${course.price}
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/10">
                      {course.category || "General"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
  <div className="flex items-center justify-center gap-3">
    {/* View Button */}
    <Link href={`/courses/${course._id}`}>
      <Button
        size="sm"
        variant="flat"
        className="font-bold rounded-xl border border-transparent bg-white/[0.04] text-slate-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 transform hover:-translate-y-0.5"
      >
        View
      </Button>
    </Link>

    {/* Delete Button */}
    <Button
      color="danger"
      size="sm"
      variant="flat"
      onPress={() => handleDelete(course._id)}
      startContent={<Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />}
      className="group font-bold rounded-xl border border-transparent bg-danger/10 text-danger hover:border-danger/40 hover:bg-danger/20 hover:shadow-[0_0_15px_rgba(243,18,96,0.15)] transition-all duration-300 transform hover:-translate-y-0.5"
    >
      Delete
    </Button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
