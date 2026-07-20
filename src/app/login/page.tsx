"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Form, Input, Label, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// AuraStudy প্ল্যাটফর্মের উপযোগী ডেমো অ্যাকাউন্টস
const DEMO_ACCOUNTS = {
  student: {
    email: "student@aurastudy.com",
    password: "Password123",
    label: "Student Hub",
  },
  instructor: {
    email: "instructor@aurastudy.com",
    password: "Password123",
    label: "Instructor Portal",
  },
  admin: {
    email: "admin@aurastudy.com",
    password: "Password123",
    label: "Admin Suite",
  },
};

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
      toast.error("Email address is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      toast.error("Please provide a valid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      if (isValid) toast.error("Password is required."); // মাল্টিপল টোস্ট এড়ানোর জন্য কন্ডিশনাল
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      if (isValid) toast.error("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (emailVal: string, passwordVal: string) => {
    setLoading(true);
    const loginToast = toast.loading("Authenticating credentials...");
    try {
      await authClient.signIn.email({
        email: emailVal,
        password: passwordVal,
        callbackURL: "/",
      });
      toast.success("Welcome back to AuraStudy!", { id: loginToast });
      const session = await authClient.getSession();
      if (session?.data?.user?.role === "instructor") {
        router.push("/dashboard/instructor");
      } else {
        router.push("/dashboard/student");
      }
    } catch (err: any) {
      toast.error(
        err.message || "Failed to sign in. Please verify your credentials.",
        { id: loginToast },
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    await handleLogin(email, password);
  };

  const triggerDemoLogin = async (role: keyof typeof DEMO_ACCOUNTS) => {
    const creds = DEMO_ACCOUNTS[role];
    setEmail(creds.email);
    setPassword(creds.password);
    toast.success(`Loading demo mode for ${creds.label}...`);
    await handleLogin(creds.email, creds.password);
  };

  const handleGoogleLogin = async () => {
    const googleToast = toast.loading("Connecting to Google...");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      toast.success("Google connection initialized!", { id: googleToast });
    } catch (err: any) {
      toast.error(err.message || "Google Authentication failed.", {
        id: googleToast,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12 bg-slate-950 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <Surface className="p-8 rounded-3xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.45)] mb-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm font-light">
              Enter your credentials to access AuraStudy dashboard
            </p>
          </div>

          {/* Social SSO Button */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full py-6 rounded-xl font-bold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.927h6.6v3.18c-.28 1.47-1.11 2.7-2.36 3.53v2.93h3.8c2.23-2.05 3.7-5.07 3.7-8.51z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.8-2.93c-1.05.7-2.4 1.13-4.13 1.13-3.18 0-5.88-2.15-6.84-5.04H1.27v3.02C3.25 21.2 7.37 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.16 14.25c-.25-.7-.39-1.46-.39-2.25s.14-1.55.39-2.25V6.73H1.27C.46 8.32 0 10.1 0 12s.46 3.68 1.27 5.27l3.89-3.02z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.93 1.19 15.22 0 12 0 7.37 0 3.25 2.8 1.27 6.73l3.89 3.02c.96-2.89 3.66-5.04 6.84-5.04z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-x-0 h-px bg-white/[0.06]" />
            <span className="relative px-3 text-xs uppercase tracking-widest text-slate-500 bg-slate-900/10 backdrop-blur-xl">
              or use credentials
            </span>
          </div>

          <Form onSubmit={onSubmit} className="space-y-4">
            <TextField
              isRequired
              name="email"
              value={email}
              onChange={setEmail}
            >
              <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                Email Address
              </Label>
              <Input
                placeholder="you@example.com"
                type="email"
                className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all"
              />
              {emailError && (
                <p className="text-red-400 text-xs mt-1">{emailError}</p>
              )}
            </TextField>

            <TextField
              isRequired
              name="password"
              value={password}
              onChange={setPassword}
            >
              <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-violet-400" />
                Password
              </Label>
              <Input
                placeholder="Enter password"
                type="password"
                className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all"
              />
              {passwordError && (
                <p className="text-red-400 text-xs mt-1">{passwordError}</p>
              )}
            </TextField>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.55)] cursor-pointer hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? "Signing in..." : "Sign In to Classroom"}
              <LogIn className="w-4 h-4" />
            </Button>
          </Form>

          {/* Demo Login Actions */}
          <div className="bg-slate-950/50 border border-white/[0.06] p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Developer Quick Demo Login</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => triggerDemoLogin("student")}
                className="py-2.5 px-2 text-xs font-bold rounded-xl border border-white/[0.08] bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => triggerDemoLogin("instructor")}
                className="py-2.5 px-2 text-xs font-bold rounded-xl border border-white/[0.08] bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Instructor
              </button>
              <button
                type="button"
                onClick={() => triggerDemoLogin("admin")}
                className="py-2.5 px-2 text-xs font-bold rounded-xl border border-white/[0.08] bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 font-light mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-violet-400 font-bold hover:underline transition-colors inline-flex items-center gap-0.5"
            >
              Create Account
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </Surface>
      </motion.div>
    </div>
  );
}
