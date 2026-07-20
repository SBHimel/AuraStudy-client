"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input, Form } from "@heroui/react";
import { 
  Sparkles, 
  Mail, 
  
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Globe 
} from "lucide-react";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedin, FaSquareGithub, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    const subscribeToast = toast.loading("Subscribing to newsletter...");
    
    try {
      // এখানে তোমার নিউজলেটার এপিআই কল করতে পারো
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay
      toast.success("Welcome aboard! You've successfully subscribed.", { id: subscribeToast });
      setNewsletterEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: subscribeToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Neon Glowing Effect */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-12 left-10 w-[250px] h-[250px] bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Aura<span className="text-violet-400">Study</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
              Empowering next-generation learners with intelligent agentic learning, dynamic curriculum structures, and expert-led tech classrooms.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/SBHimel" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
                <FaSquareGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/sbhimel/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="https://x.com/himel2nd" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/s.b.himel.669113" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 space-y-4 lg:pl-8">
            <h3 className="text-white text-base font-semibold tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              Stay updated with tech updates & releases
            </h3>
            <p className="text-slate-400 text-sm font-light">
              Get premium course updates, system announcements, and dev notes directly in your inbox.
            </p>
            
            <Form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl pt-2">
              <div className="relative flex items-center flex-1 w-full">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-500 z-20 pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-900/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all w-full pl-10 h-[48px]"
                />
              </div>
              <Button
                type="submit"
                isDisabled={loading}
                className="h-[48px] px-6 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.45)] cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Form>
          </div>
        </div>

        {/* Middle Section: Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm font-light text-slate-400">
              <li><Link href="/courses" className="hover:text-violet-400 transition-colors">All Classrooms</Link></li>
              <li><Link href="/learning-paths" className="hover:text-violet-400 transition-colors">Learning Tracks</Link></li>
              <li><Link href="/pricing" className="hover:text-violet-400 transition-colors">Premium Plans</Link></li>
              <li><Link href="/faq" className="hover:text-violet-400 transition-colors">General FAQs</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm tracking-wider uppercase">Instructors</h4>
            <ul className="space-y-2 text-sm font-light text-slate-400">
              <li><Link href="/signup" className="hover:text-violet-400 transition-colors">Become a Mentor</Link></li>
              <li><Link href="/dashboard/instructor" className="hover:text-violet-400 transition-colors">Course Builder</Link></li>
              <li><Link href="/guidelines" className="hover:text-violet-400 transition-colors">Teaching Rules</Link></li>
              <li><Link href="/community" className="hover:text-violet-400 transition-colors">Instructor Forum</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm tracking-wider uppercase">Developer ecosystem</h4>
            <ul className="space-y-2 text-sm font-light text-slate-400">
              <li><Link href="/docs" className="hover:text-violet-400 transition-colors">API References</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">Open Source Core</a></li>
              <li><Link href="/changelog" className="hover:text-violet-400 transition-colors">System Changelog</Link></li>
              <li><Link href="/status" className="hover:text-violet-400 transition-colors">Network Status</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm tracking-wider uppercase">Legal & Security</h4>
            <ul className="space-y-2 text-sm font-light text-slate-400">
              <li><Link href="/privacy" className="hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-violet-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-violet-400 transition-colors">Data Protection</Link></li>
              <li><Link href="/cookies" className="hover:text-violet-400 transition-colors">Cookie Settings</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Badges */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <div>
            &copy; {new Date().getFullYear()} AuraStudy. Inc. Built with precise Next.js &amp; HeroUI ecosystems. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secured via Better-Auth
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              Global Cloud Distribution
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}