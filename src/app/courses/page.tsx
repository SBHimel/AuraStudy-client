"use client";

import { useEffect, useState } from "react";
// Select এবং SelectItem ইমপোর্ট থেকে বাদ দেওয়া হয়েছে
import { Input, Button, Pagination, Skeleton } from "@heroui/react";
import { fetchExploreCourses } from "@/lib/api";
import Link from "next/link";
import RoadmapGenerator from "@/components/RoadmapGenerator";

export default function ExploreCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Web Development",
    "App Development",
    "Design",
    "Marketing",
  ];

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);

      try {
        const query = `page=${page}&limit=8&search=${encodeURIComponent(
          search,
        )}&category=${
          category === "All" ? "" : encodeURIComponent(category)
        }&maxPrice=${maxPrice}&sort=${sort}`;

        const data = await fetchExploreCourses(query);

        setCourses(data.courses);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to load courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [page, search, category, maxPrice, sort]);

  const handleResetFilters = () => {
    setSearch("");
    setCategory("");
    setMaxPrice("");
    setSort("");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-3xl font-black">Explore Our Courses</h1>

        {/* AI Roadmap Generator (Feature A) এখানে বসানো হলো */}
        <RoadmapGenerator />

        {/* Search & Filter Area */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
          
          {/* Search */}
          <Input
            aria-label="Search courses"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />

          {/* Category Filter (Native HTML with Tailwind + Custom Arrow) */}
          <div className="relative w-full h-10">
            <select
              aria-label="Filter by category"
              value={category || ""}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full h-full px-4 rounded-xl bg-slate-100/5 hover:bg-slate-100/10 border-none text-slate-300 text-sm focus:ring-2 focus:ring-violet-500/50 focus:outline-none transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="" disabled className="bg-slate-900 text-slate-400">Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
            {/* Custom SVG Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Price Filter */}
          <Input
            aria-label="Maximum course price"
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />

          {/* Sort Filter (Native HTML with Tailwind + Custom Arrow) */}
          <div className="relative w-full h-10">
            <select
              aria-label="Sort courses"
              value={sort || ""}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full h-full px-4 rounded-xl bg-slate-100/5 hover:bg-slate-100/10 border-none text-slate-300 text-sm focus:ring-2 focus:ring-violet-500/50 focus:outline-none transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="" disabled className="bg-slate-900 text-slate-400">Sort By</option>
              <option value="latest" className="bg-slate-900 text-white">Newest First</option>
              <option value="price_asc" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price_desc" className="bg-slate-900 text-white">Price: High to Low</option>
            </select>
            {/* Custom SVG Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Reset */}
          <Button
            aria-label="Reset all filters"
            onPress={handleResetFilters}
            className="h-10"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-[420px] bg-slate-900/40 rounded-2xl p-4 border border-white/5 flex flex-col gap-4"
                >
                  <Skeleton className="rounded-xl h-48 bg-slate-800" />
                  <Skeleton className="w-3/4 rounded-lg h-6 bg-slate-800" />
                  <Skeleton className="w-full rounded-lg h-12 bg-slate-800" />
                  <Skeleton className="w-1/2 rounded-lg h-5 bg-slate-800 mt-auto" />
                </div>
              ))
          : courses.map((course) => (
              <div
                key={course._id}
                className="h-[420px] bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-violet-500/50 transition-all group"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={course.image || "https://placehold.co/600x400/png"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Category */}
                  <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full w-fit mb-3">
                    {course.category || "General"}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white line-clamp-1 mb-2">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {course.shortDescription}
                  </p>

                  {/* Meta Info */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xl font-black text-white">
                        ${course.price}
                      </p>
                      <p className="text-xs text-slate-500">
                        ⭐ {course.rating || 0}
                      </p>
                    </div>

                    {/* View Details */}
                    <Link href={`/courses/${course._id}`}>
                      <Button
                        size="sm"
                        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Empty State */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white">
            No courses found
          </h2>
          <p className="text-slate-400 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-12">
    {/* Previous */}
    <Button
      isDisabled={page === 1}
      onPress={() => {
        setPage((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="bg-slate-800 text-white"
    >
      Prev
    </Button>

    {/* Page Numbers */}
    <div className="flex items-center gap-2">
  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
    (pageNumber) => (
      <Button
        key={pageNumber}
        onPress={() => {
          setPage(pageNumber);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`min-w-10 h-10 ${
          page === pageNumber
            ? "bg-violet-600 text-white"
            : "bg-slate-800 text-slate-300"
        }`}
      >
        {pageNumber}
      </Button>
    ),
  )}
</div>

    {/* Next */}
    <Button
      isDisabled={page === totalPages}
      onPress={() => {
        setPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="bg-slate-800 text-white"
    >
      Next
    </Button>
  </div>
)}
    </div>
  );
}