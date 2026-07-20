"use client";

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { addCourse, uploadImageToImgBB } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      await addCourse({
        ...data,
        image: imageUrl,
        price: Number(data.price),
      });

      router.push("/dashboard/manage-items");
    } catch (error) {
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Add New Course</h1>
        <p className="text-slate-400 mt-2">Create an amazing learning experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
        
        {/* Title Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Course Title</label>
          <Input 
            name="title" 
            placeholder="e.g. Next.js Masterclass 2026" 
            required 
            variant="bordered"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Price ($)</label>
            <Input 
              name="price" 
              type="number" 
              placeholder="0.00" 
              required 
              variant="bordered"
            />
          </div>
          {/* Category Placeholder */}
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-300 ml-1">Category</label>
             <Input name="category" placeholder="e.g. Web Development" variant="bordered" />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Short Description</label>
          <Input 
            name="shortDescription" 
            placeholder="Enter a catchy short description" 
            required 
            variant="bordered"
          />
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Full Description</label>
          <textarea 
            name="fullDescription" 
            placeholder="Write detailed information about your course..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-violet-500 focus:outline-none transition-all hover:bg-slate-900 min-h-[120px]"
            required
          />
        </div>
        
        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Course Thumbnail</label>
          <input 
            type="file" 
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700 cursor-pointer p-2 rounded-2xl border border-white/10 bg-slate-950"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-violet-500/20" 
          isLoading={loading}
        >
          {loading ? "Publishing..." : "Publish Course"}
        </Button>
      </form>
    </div>
  );
}