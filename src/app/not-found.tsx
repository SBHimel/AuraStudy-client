import Link from "next/link";
import { Compass, Home, Sparkles, LayoutDashboard, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      
      {/* 🔮 Background Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        
        {/* 🧭 Glow Compass Badge */}
        <div className="inline-flex items-center justify-center p-4 bg-violet-500/10 border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-950/50 backdrop-blur-xl animate-bounce">
          <Compass className="w-12 h-12 text-violet-400" />
        </div>

        {/* 404 Gradient Heading */}
        <div>
          <h1 className="text-7xl sm:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 drop-shadow-sm">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-violet-400 font-semibold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Lost in AuraStudy Universe</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Description Text */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
          Oops! The page you are looking for doesn't exist, has been removed, or you typed a wrong URL.
        </p>

        {/* 🚀 Quick Action Navigation Buttons */}
        <div className="pt-2 space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-violet-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home Page
          </Link>

          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-violet-500/40 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-violet-400" />
            Go to Dashboard
          </Link>
        </div>

        {/* AI Chatbot Hint */}
        <p className="text-[11px] text-slate-500 pt-4">
          Need help? Feel free to ask our <span className="text-violet-400 font-medium">AuraStudy AI Assistant</span> on the bottom right corner!
        </p>
      </div>
      
    </div>
  );
}