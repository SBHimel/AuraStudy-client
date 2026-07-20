"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  Sparkles,
  Target,
  Users,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learn at Your Pace",
    description:
      "Access carefully structured courses and learn whenever and wherever it works best for you.",
  },
  {
    icon: Target,
    title: "Practical Skills",
    description:
      "Focus on practical knowledge and real-world skills that help you grow professionally.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from passionate instructors who share their knowledge and experience with learners.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}{" "}
      <section className="relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.18),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Learn. Grow. Achieve.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              Learning that moves you
              <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                forward.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              AuraStudy is a modern learning platform designed to make quality
              education accessible, practical, and engaging for everyone.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/courses">
                <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold">
                  Explore Courses
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="bordered"
                  className="h-12 px-6 rounded-xl border-white/10 text-slate-300 font-bold"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest font-bold text-violet-400">
              Our Mission
            </p>

            <h2 className="text-3xl sm:text-4xl font-black mt-3">
              Making learning simple, practical, and accessible.
            </h2>

            <p className="mt-6 text-slate-400 leading-relaxed">
              We believe learning should not be limited by location, schedule,
              or traditional classroom boundaries. AuraStudy brings learners and
              valuable educational content together in one simple platform.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Learn from anywhere",
                "Discover valuable courses",
                "Build practical knowledge",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-400" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/5 bg-slate-900/50 p-8 lg:p-12">
            <div className="absolute inset-0 rounded-3xl bg-violet-600/5 blur-2xl" />

            <div className="relative grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-slate-950 border border-white/5 p-6">
                <BookOpen className="w-8 h-8 text-violet-400 mb-4" />
                <p className="text-3xl font-black">100+</p>
                <p className="text-sm text-slate-400 mt-1">Learning Topics</p>
              </div>

              <div className="rounded-2xl bg-slate-950 border border-white/5 p-6">
                <Users className="w-8 h-8 text-indigo-400 mb-4" />
                <p className="text-3xl font-black">Growing</p>
                <p className="text-sm text-slate-400 mt-1">
                  Learning Community
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-6">
                <Target className="w-8 h-8 text-fuchsia-400 mb-4" />
                <p className="text-xl font-bold">Your growth starts here.</p>
                <p className="text-sm text-slate-400 mt-2">
                  Explore new knowledge, develop new skills, and keep moving
                  forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-widest font-bold text-violet-400">
            Why AuraStudy
          </p>

          <h2 className="text-3xl sm:text-4xl font-black mt-3">
            Built for modern learners
          </h2>

          <p className="text-slate-400 mt-4">
            Everything you need to discover courses and continue your learning
            journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/5 bg-slate-900/40 p-7 hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="text-slate-400 leading-relaxed mt-3">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
