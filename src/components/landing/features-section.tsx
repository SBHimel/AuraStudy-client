// components/landing/features-section.tsx
import { BrainCircuit, BookOpen, Terminal } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 border-t border-white/[0.04]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold sm:text-4xl text-slate-100">
          Engineered for Modern Learners
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base">
          Everything you need to master complex tracks and boost your software engineering or technical roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* কার্ড ১: AI Core */}
        <div className="group relative rounded-2xl border border-white/[0.06] bg-slate-900/40 p-6 backdrop-blur-md hover:border-violet-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">Agentic AI Mentorship</h3>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Real-time deep analysis on bugs, assignments, and logic processing, optimized explicitly for technical pathways.
          </p>
        </div>

        {/* কার্ড ২: Developer Documentation */}
        <div className="group relative rounded-2xl border border-white/[0.06] bg-slate-900/40 p-6 backdrop-blur-md hover:border-fuchsia-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-fuchsia-950/60 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">Structured Documentation</h3>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Clean API references, detailed code-labs, and step-by-step documentation modules tailored to simplify execution.
          </p>
        </div>

        {/* কার্ড ৩: Dynamic Tracking */}
        <div className="group relative rounded-2xl border border-white/[0.06] bg-slate-900/40 p-6 backdrop-blur-md hover:border-indigo-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">Advanced Sandbox</h3>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Run operations, track active progress directly inside your persistent dashboard layout effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
}