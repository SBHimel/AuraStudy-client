"use client";

import { Card, CardFooter, Button, Skeleton } from "@heroui/react";
import { Star, Clock } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    shortDescription: string;
    image?: string;
    category?: string;
    price?: number | string;
    rating?: number | string;
    duration?: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="w-full h-full border border-white/[0.08] bg-slate-900/50 hover:bg-slate-900 transition-all duration-300">
      <div className="p-0 overflow-hidden">
        <img
          src={course.image || "https://placehold.co/600x400/1e293b/ffffff?text=No+Image"}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-1 rounded-md">
              {course.category || "General"}
            </span>
            <span className="text-sm font-black text-white">
              {course.price && course.price !== "0" ? `$${course.price}` : "Free"}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white line-clamp-1 mt-1">
            {course.title}
          </h3>
          
          <p className="text-sm text-slate-400 line-clamp-2">
            {course.shortDescription}
          </p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> 
              {course.rating || "4.5"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 
              {course.duration || "Self-paced"}
            </span>
          </div>
        </div>
      </div>
      
      <CardFooter className="pt-0 px-4 pb-4">
        <Link href={`/courses/${course._id}`} className="w-full">
          <Button className="w-full bg-white/[0.05] hover:bg-violet-600 text-white border border-white/[0.1] font-semibold transition-all">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
// Data লোড হওয়ার সময় দেখানোর জন্য Skeleton Loader
export function CourseSkeleton() {
  return (
    <Card className="w-full h-full border border-white/[0.08] bg-slate-900/20">
      <Skeleton className="rounded-t-xl">
        <div className="h-48 w-full bg-slate-800" />
      </Skeleton>
      
      <div className="space-y-3 p-4 flex flex-col h-[180px]">
        {/* Category & Price Skeleton */}
        <div className="flex justify-between">
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-5 bg-slate-800" />
          </Skeleton>
          <Skeleton className="w-1/6 rounded-lg">
            <div className="h-5 bg-slate-800" />
          </Skeleton>
        </div>
        
        {/* Title Skeleton */}
        <Skeleton className="w-full rounded-lg mt-2">
          <div className="h-6 bg-slate-800" />
        </Skeleton>
        
        {/* Description Skeleton */}
        <Skeleton className="w-full rounded-lg">
          <div className="h-4 bg-slate-800" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 bg-slate-800" />
        </Skeleton>
        
        {/* Meta Info Skeleton */}
        <div className="flex gap-4 mt-auto">
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-4 bg-slate-800" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-4 bg-slate-800" />
          </Skeleton>
        </div>
      </div>

      {/* Button Skeleton */}
      <CardFooter className="pt-0 px-4 pb-4 mt-auto">
        <Skeleton className="w-full rounded-xl">
          <div className="h-10 bg-slate-800" />
        </Skeleton>
      </CardFooter>
      
    </Card>
  );
}