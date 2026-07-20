"use client";

import { Button, Card, Avatar } from "@heroui/react";
import { 
  Terminal, ShieldCheck, Zap, BookOpen, Layers, Cpu, 
  TrendingUp, Users, Trophy, Star, ArrowRight, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function LandingSections() {
  return (
    <div className="bg-slate-950 text-slate-100 selection:bg-violet-500/30">

      {/* ── SECTION 1: CORE FEATURES ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-white/[0.04]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Why Learn with AuraStudy?</h2>
          <p className="text-sm text-slate-400 mt-2">Engineered specifically for diploma technology students and modern front-end enthusiasts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Structured Core Curriculum", desc: "Complex books like Microprocessors mapped precisely into easily digestible video layouts.", icon: Cpu },
            { title: "Production Code Workflows", desc: "Build clean, pixel-perfect UIs using Next.js, Tailwind CSS, and optimized configurations.", icon: Terminal },
            { title: "Blazing Fast Progress", desc: "Interactive modules mapped to speed up logical building blocks with full AI utility advice.", icon: Zap }
          ].map((feat, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 transition-all duration-200">
              <div className="w-9 h-9 rounded-xl bg-violet-950/60 border border-violet-500/20 flex items-center justify-center mb-4">
                <feat.icon className="w-4.5 h-4.5 text-violet-400" />
              </div>
              <h3 className="text-base font-bold text-slate-100">{feat.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: TOP CATEGORIES ── */}
      <section className="py-20 bg-slate-900/30 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Explore Top Tech Domains</h2>
              <p className="text-sm text-slate-400 mt-1">Acquire real-world specializations that employers value.</p>
            </div>
            <Link href="/courses">
              <Button size="sm" variant="secondary" className="bg-white/[0.06] text-slate-200 hover:bg-white/[0.1] font-semibold rounded-lg">View All Categories</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Front-end Dev", count: "12 Courses", icon: Layers, color: "text-sky-400" },
              { name: "Computer Hardware", count: "4 Courses", icon: Cpu, color: "text-emerald-400" },
              { name: "Full-stack Frameworks", count: "8 Courses", icon: Terminal, color: "text-violet-400" },
              { name: "Career Placement", count: "3 Modules", icon: ShieldCheck, color: "text-amber-400" },
            ].map((cat, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] flex items-center gap-3.5 hover:bg-white/[0.03] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center border border-white/[0.06]">
                  <cat.icon className={`w-4.5 h-4.5 ${cat.color}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{cat.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: METRICS / STATISTICS ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 border-b border-white/[0.04]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "15K+", label: "Active Learners", icon: Users },
            { val: "45+", label: "Premium Modules", icon: BookOpen },
            { val: "94%", label: "Success Rate", icon: TrendingUp },
            { val: "120+", label: "GitHub Projects", icon: Trophy }
          ].map((stat, i) => (
            <div key={i} className="p-4 space-y-1.5">
              <div className="flex justify-center text-slate-600 mb-1">
                <stat.icon className="w-5 h-5 text-violet-500/50" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{stat.val}</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: HIGHLIGHTED COURSE ── */}
      <section className="py-20 bg-gradient-to-b from-transparent to-slate-900/40 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">Featured Batch</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">Next.js Alpha Placement Track</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Get comprehensive placement preparation. Build robust portfolio websites, fine-tune GitHub ecosystems, master custom layouts, and qualify for dedicated tech positions.
            </p>
            <ul className="space-y-2 pt-1 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" /> Dynamic SSR & Client Layout integration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" /> Professional Resume & Portfolio reviews</li>
            </ul>
            <div className="pt-2">
              <Link href="/courses">
                <Button size="sm" className="font-bold rounded-lg bg-violet-600 text-white border-0 hover:bg-violet-700">Explore Batch Details</Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/[0.08] bg-slate-900 p-5 shadow-2xl overflow-hidden aspect-video flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Live Interactive Terminal</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">AuraStudy-Engine v1.3</span>
              </div>
              <div className="font-mono text-xs text-violet-300/90 space-y-1.5 my-auto bg-slate-950/70 p-4 rounded-xl border border-white/[0.04]">
                <p className="text-slate-500">$ npm install @heroui/react framer-motion</p>
                <p className="text-emerald-400">✓ Optimization successful. Ready for deployment.</p>
                <p className="text-slate-500">$ git push origin main</p>
                <p className="text-fuchsia-400">→ Repository live at: github.com/aurastudy/next-alpha</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: TESTIMONIALS ── */}
<section className="py-20 max-w-7xl mx-auto px-6 border-b border-white/[0.04]">
  <div className="text-center max-w-xl mx-auto mb-14">
    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
      Loved by Driven Learners
    </h2>

    <p className="text-sm text-slate-400 mt-2">
      See how our structured tracking helps students maintain consistent coding workflows.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        name: "Tahmid Hasan",
        role: "Diploma Student, CST",
        text: "The mapping of Microprocessor concepts alongside clean React modules completely saved my 5th semester preparations.",
      },
      {
        name: "Ahsan Kabir",
        role: "Junior Frontend Engineer",
        text: "Structured Next.js modules helped me polish my personal portfolio website and pass early placement requirements effortlessly.",
      },
      {
        name: "Sajib Ahmed",
        role: "Learner, Batch 13",
        text: "The absolute focus on UI design parameters like glassmorphism and motion flows makes coding exceptionally fun here.",
      },
    ].map((testi, i) => (
      <Card
        key={i}
        className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01] shadow-none flex flex-col justify-between space-y-4"
      >
        <p className="text-xs text-slate-300 italic leading-relaxed">
          "{testi.text}"
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
          <Avatar size="sm">
            <img
              src={`https://i.pravatar.cc/150?img=${i + 11}`}
              alt={testi.name}
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>

          <div>
            <h4 className="text-xs font-bold text-slate-200">
              {testi.name}
            </h4>

            <p className="text-[10px] text-slate-500 font-semibold">
              {testi.role}
            </p>
          </div>
        </div>
      </Card>
    ))}
  </div>
</section>

      {/* ── SECTION 6: FAQ ── */}
      <section className="py-20 bg-slate-900/10 border-b border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is this platform suitable for complete beginners?", a: "Yes. We start from absolute layout fundamentals before moving into advanced architectural states like dynamic JSON routing." },
              { q: "How are diploma curriculum modules structured?", a: "We sync specific theoretical chapters (like Computer and Microprocessor parameters) with core programmatic tasks so you balance academics with high-level skill building." },
              { q: "Can I manage these modules while balancing flexible university routines?", a: "Absolutely. All system structures are entirely asynchronous, designed explicitly to be consumed cleanly in step-by-step formats." }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                <h4 className="text-sm font-bold text-slate-200">{faq.q}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CALL TO ACTION (CTA) ── */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 blur-3xl opacity-30 pointer-events-none" />
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Ready to Shape Your Engineering Path?</h2>
        <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
          Join AuraStudy today. Elevate your system builds, clear technical tasks seamlessly, and enter optimized career pools.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/login">
            <Button className="h-11 px-6 rounded-xl font-extrabold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 shadow-xl">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}