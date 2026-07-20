"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, GraduationCap, Code, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    tag: "Next-Gen Learning Platform",
    title: "Master Computer Technology with AuraStudy",
    desc: "Dive deep into structured microprocessors, front-end frameworks, and premium tech skills with visual modules.",
    icon: GraduationCap,
    gradient: "from-violet-500 via-indigo-500 to-fuchsia-500"
  },
  {
    tag: "Industry Standard Skills",
    title: "Build Production Ready Applications",
    desc: "From Next.js layouts to HeroUI integrations—transform from a diploma student to a high-performing full-stack engineer.",
    icon: Code,
    gradient: "from-blue-500 via-cyan-500 to-teal-500"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const ActiveIcon = SLIDES[currentSlide].icon;

  return (
    <section className="relative h-[65vh] min-h-[500px] max-h-[650px] w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-white/[0.06]">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)]" />
      
      {/* Animated Background Mesh */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full z-10">
        
        {/* Left Content Slider */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full pr-0 lg:pr-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">
                  {SLIDES[currentSlide].tag}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {SLIDES[currentSlide].title.split("with")[0]}
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${SLIDES[currentSlide].gradient}`}>
                  {SLIDES[currentSlide].title.includes("with") ? `with ${SLIDES[currentSlide].title.split("with")[1]}` : ""}
                </span>
              </h1>

              <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                {SLIDES[currentSlide].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Elements */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/login">
              <Button className="h-11 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 transition-all duration-200">
                Start Learning Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="bordered" className="h-11 px-6 rounded-xl font-bold text-sm text-slate-300 border-white/[0.12] hover:bg-white/[0.05] hover:text-white transition-all">
                Browse Courses
              </Button>
            </Link>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center gap-2 mt-8">
            <button onClick={prevSlide} className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 mx-1">
              {SLIDES.map((_, idx) => (
                <span key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-6 bg-violet-500" : "w-1.5 bg-slate-700"}`} />
              ))}
            </div>
            <button onClick={nextSlide} className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Feature Graphic (Interactive Animation) */}
        <div className="hidden lg:col-span-5 h-full lg:flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 5 }}
              transition={{ duration: 0.45 }}
              className="relative w-72 h-72 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-tr ${SLIDES[currentSlide].gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${SLIDES[currentSlide].gradient} opacity-20 blur-xl absolute`} />
              <ActiveIcon className="w-16 h-16 text-slate-200 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Visual Flow Indicator to Next Section */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 animate-bounce">
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Scroll Down</span>
        <div className="w-1 h-3.5 rounded-full bg-slate-500" />
      </div>
    </section>
  );
}