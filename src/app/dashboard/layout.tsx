"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, List, Menu, X, ArrowLeft } from "lucide-react";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/add-item", label: "Add Course", icon: PlusCircle },
  { href: "/dashboard/manage-items", label: "Manage Courses", icon: List },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* ── Sidebar (Desktop) ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/[0.08] transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-white">AuraStudy</Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden"><X /></button>
        </div>
        
        <nav className="px-4 py-4 space-y-2">
          {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === href ? "bg-violet-600 text-white" : "hover:bg-white/[0.05]"}`}>
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
          <div className="pt-8 mt-8 border-t border-white/[0.1]">
            <Link href="/" className="flex items-center gap-3 text-slate-400 px-4 hover:text-white">
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
          </div>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-64">
        <header className="h-16 flex items-center px-6 border-b border-white/[0.08] lg:hidden">
          <button onClick={() => setIsOpen(true)}><Menu /></button>
          <span className="ml-4 font-bold">Dashboard</span>
        </header>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}