// components/landing/cta-section.tsx
import { Button } from "@heroui/react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20 text-center">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-slate-900/80 to-slate-950 p-10 backdrop-blur-2xl shadow-2xl">
        <div className="absolute inset-0 bg-violet-600/5 blur-xl pointer-events-none" />
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
          Ready to experience next-gen learning?
        </h2>
        <p className="text-slate-400 mt-3 max-w-md mx-auto text-sm">
          Join thousands of active learners setting up structured development structures globally.
        </p>
        
        <div className="mt-8 flex justify-center">
          <Link href="/login">
            <Button className="h-11 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg border-0 hover:scale-[1.03] transition-all">
              Create Account Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}