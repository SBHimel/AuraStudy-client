"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Camera,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgUpload"; // 🎯 ImgBB আপলোডার
import Link from "next/link";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(""); // 📸 ইনস্ট্যান্ট ইমেজ প্রিভিউ
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔄 সেশন লোড হলে স্টেট সেট করা
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-violet-400">
        <Loader2 className="animate-spin mb-3" size={32} />
        <p className="text-xs text-slate-400 font-medium">Loading AuraStudy Profile...</p>
      </div>
    );
  }

  // 🖼️ ফাইল নির্বাচন হ্যান্ডলার
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      let finalImageUrl = image;

      // 🎯 নতুন ফাইল থাকলে ImgBB-তে আপলোড হবে
      if (file) {
        const uploadedUrl = await imageUpload(file);
        if (!uploadedUrl) {
          alert("ছবি আপলোড ব্যর্থ হয়েছে! আবার চেষ্টা করুন।");
          setLoading(false);
          return;
        }
        finalImageUrl = uploadedUrl;
      }

      // 🎯 Better-Auth ইউজার ডাটা আপডেট
      await authClient.updateUser({
        name: name,
        image: finalImageUrl,
      });

      setImage(finalImageUrl);
      setFile(null);
      setSuccess(true);
      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("কোথাও একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const userRole = (session?.user as { role?: string })?.role ?? "student";
  const dashboardLink =
    userRole === "student" || userRole === "buyer"
      ? "/dashboard"
      : `/dashboard/${userRole}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* 🔮 Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-xl mx-auto w-full relative z-10">
        
        {/* 🔙 ব্যাক বাটন */}
        <Link
          href={dashboardLink}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-violet-400 mb-6 transition-all group cursor-pointer"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Dashboard
        </Link>

        {/* 💳 প্রোফাইল কার্ড */}
        <div className="bg-slate-900/80 border border-violet-500/20 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl shadow-violet-950/50">
          
          {/* হেডার অংশ */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">Account Settings</h1>
                <Sparkles size={18} className="text-violet-400" />
              </div>
              <p className="text-xs text-slate-400">Update your personal profile information</p>
            </div>
            <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              {userRole}
            </div>
          </div>

          {/* 🎯 সাকসেস অ্যালার্ট */}
          {success && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-semibold animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
              <span>Profile updated successfully! Your changes are now live.</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* 📸 প্রফেশনাল নিওন অবতার আপলোড জোন */}
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-28 w-28 rounded-full p-1 bg-gradient-to-tr from-violet-500 to-indigo-500 cursor-pointer shadow-lg shadow-violet-500/20 hover:scale-105 transition-all duration-300"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                  {previewUrl || image ? (
                    <img
                      src={previewUrl || image}
                      alt="Profile Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="text-slate-500" size={40} />
                  )}

                  {/* হোভার ক্যামেরা ওভারলে */}
                  <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-xs">
                    <Camera className="text-violet-400 mb-1 animate-bounce" size={20} />
                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                  </div>
                </div>
              </div>

              {/* হিডেন ফাইল ইনপুট */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                Click on the avatar to upload a new photo
              </p>
            </div>

            {/* ✉️ ইমেইল এড্রেস (Read-Only) */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-500" size={16} />
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-500 cursor-not-allowed outline-none select-none"
                />
              </div>
            </div>

            {/* 👤 ফুল নেম ইনপুট */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={16} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                />
              </div>
            </div>

            {/* 🚀 সাবমিট বাটন */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-violet-600/25 transition-all duration-200 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Updating Profile...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}