"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; // তোমার প্রজেক্টের Better Auth ক্লায়েন্ট পাথ
import type { AuthUser } from "@/lib/auth-client";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
  Home,
  ChevronDown,
  BookOpen,
  ArrowUpRight,
  FolderHeart,
  Info,
  Mail,
} from "lucide-react";

// AuraStudy প্রজেক্টের উপযোগী মেইন লিংকস (Logged Out অবস্থায় ৩টি রুট হ্যান্ডেল করবে: Home, Courses, এবং ডানপাশের Sign in/Get Started বাটন)
const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Better Auth সেশন এবং ইউজার ডাটা রিড
  const { data: session } = authClient.useSession();
  const user = session?.user as AuthUser | undefined;
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  // ড্যাশবোর্ডের ভেতরে থাকলে মেইন ন্যাভবার হাইড রাখার লজিক
  if (pathname?.includes("/dashboard")) return null;

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Glassmorphism bar */}
      <div className="relative border-b border-white/[0.06] bg-slate-950/60 backdrop-blur-xl">
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">

          {/* ── LEFT: Brand Logo ── */}
          <div className="flex items-center z-10">
            <Link href="/" className="group flex items-center gap-2.5 outline-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-xl bg-violet-600/40 blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center border border-violet-400/30 shadow-lg">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="font-black text-xl tracking-tight"
              >
                <span className="text-slate-100">Aura</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Study
                </span>
              </motion.span>
            </Link>
          </div>

          {/* ── CENTER: Navigation Links ── */}
          <div className="absolute inset-x-0 hidden lg:flex items-center justify-center pointer-events-none">
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-1 pointer-events-auto"
            >
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                return (
                  <li key={href} className="relative">
                    <Link
                      href={href}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none ${
                        isActive ? "text-white" : "text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.1]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <Icon className="relative w-3.5 h-3.5 shrink-0" />
                      <span className="relative">{label}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Logged in থাকলে আরও ২টি গুরুত্বপূর্ণ রুট এখানে দেখাবে (টোটাল ৫টি রুটের শর্ত পূরণের জন্য) */}
              {user && (
                <>
                  <li className="relative">
                    <Link
                      href="/dashboard"
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none ${
                        pathname?.startsWith("/dashboard") ? "text-white" : "text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      {pathname?.startsWith("/dashboard") && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.1]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <LayoutDashboard className="relative w-3.5 h-3.5 shrink-0" />
                      <span className="relative">Dashboard</span>
                    </Link>
                  </li>

                  <li className="relative">
                    <Link
                      href="/my-courses"
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none ${
                        pathname === "/my-courses" ? "text-white" : "text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      {pathname === "/my-courses" && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.1]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <FolderHeart className="relative w-3.5 h-3.5 shrink-0" />
                      <span className="relative">My Courses</span>
                    </Link>
                  </li>
                </>
              )}
            </motion.ul>
          </div>

          {/* ── RIGHT: Auth State & Mobile Trigger ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-end gap-3 z-10"
          >
            {!user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors"
                >
                  Sign in
                </Link>
                <Link href="/login">
                  <Button className="h-9 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 shadow-[0_0_16px_rgba(139,92,246,0.35)] hover:shadow-[0_0_24px_rgba(139,92,246,0.55)] hover:scale-[1.03] transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 group outline-none cursor-pointer">
                      <div className="relative">
                        <Avatar size="sm" aria-label="User">
                          <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user.name ?? ""}
                            src={user.image ?? ""}
                          />
                        </Avatar>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                      </div>
                      <div className="flex flex-col items-start max-w-[110px]">
                        <span className="text-xs font-bold text-slate-200 truncate leading-tight group-hover:text-white transition-colors">
                          {user.name}
                        </span>
                        <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider leading-tight">
                          Learner
                        </span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="mt-2 w-64 rounded-2xl border border-white/[0.08] bg-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-black/60 p-2 overflow-hidden">
                    <div className="px-3 pt-3 pb-3 mb-1 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <Avatar size="md" aria-label="User">
                            <Avatar.Image src={user.image ?? ""} alt={user.name ?? ""} />
                          </Avatar>
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-100 truncate">{user.name}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <Dropdown.Menu>
                      <Dropdown.Item id="dashboard" textValue="Dashboard" className="p-0">
                        <Link
                          href="/dashboard"
                          className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group/item"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-violet-950/50 border border-violet-500/20 flex items-center justify-center">
                              <LayoutDashboard className="w-3.5 h-3.5 text-violet-400" />
                            </div>
                            <span className="text-sm font-semibold text-slate-300 group-hover/item:text-white transition-colors">
                              Dashboard
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/item:text-violet-400 transition-colors" />
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item id="profile" textValue="Profile" className="p-0">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          <span className="text-sm font-semibold text-slate-300 group-hover/item:text-white transition-colors">
                            Profile Settings
                          </span>
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item id="logout" textValue="Logout" className="p-0 mt-1 border-t border-white/[0.06] pt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-red-950/30 transition-colors group/item text-left cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-red-950/40 border border-red-500/20 flex items-center justify-center">
                            <LogOut className="w-3.5 h-3.5 text-red-400" />
                          </div>
                          <span className="text-sm font-semibold text-red-400 group-hover/item:text-red-300 transition-colors">
                            Sign Out
                          </span>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all cursor-pointer"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {isMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden border-b border-white/[0.06] bg-slate-950/95 backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-7xl px-6 py-4 space-y-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-white/[0.08] text-white border border-white/[0.08]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-violet-400" : ""}`} />
                    {label}
                  </Link>
                );
              })}

              {/* Mobile অবস্থায় ইউজার লগইন থাকলে ড্যাশবোর্ড এবং মাই কোর্সেস লিংক অ্যাড */}
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      pathname?.startsWith("/dashboard")
                        ? "bg-white/[0.08] text-white border border-white/[0.08]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <LayoutDashboard className={`w-4 h-4 shrink-0 ${pathname?.startsWith("/dashboard") ? "text-violet-400" : ""}`} />
                    Dashboard
                  </Link>

                  <Link
                    href="/my-courses"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      pathname === "/my-courses"
                        ? "bg-white/[0.08] text-white border border-white/[0.08]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <FolderHeart className={`w-4 h-4 shrink-0 ${pathname === "/my-courses" ? "text-violet-400" : ""}`} />
                    My Courses
                  </Link>
                </>
              )}

              {/* Mobile Auth */}
              <div className="pt-2 border-t border-white/[0.06] mt-2">
                {!user ? (
                  <div className="flex flex-col gap-2 pt-1">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
                    >
                      Sign in
                    </Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full h-11 rounded-xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg border-0">
                        Get Started →
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 mt-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <Avatar size="sm" aria-label="User">
                          <Avatar.Image src={user.image ?? ""} alt={user.name ?? ""} />
                        </Avatar>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-100 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/[0.06]" />
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-semibold text-slate-200">Profile Settings</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all font-semibold text-sm text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}