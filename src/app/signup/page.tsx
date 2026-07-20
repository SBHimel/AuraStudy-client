"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Image, UserPlus, ArrowRight, Shield } from "lucide-react";
import toast from "react-hot-toast";


export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState("student"); // "student" or "instructor" এ রূপান্তর করা হলো
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setNameError("Full name is required");
      toast.error("Full name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      if (isValid) toast.error("Email address is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      if (isValid) toast.error("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      if (isValid) toast.error("Password is required.");
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const signupToast = toast.loading("Creating your AuraStudy account...");
    try {
      await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl || undefined,
        role, // student / instructor
        plan: "free",
        callbackURL: "/",
      });
      toast.success("Account successfully created! Welcome to AuraStudy.", { id: signupToast });
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to create account. Please try again.", { id: signupToast });
    } finally {
      setLoading(false);
    }
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
      toast.error(err.message || "Google Authentication failed.", { id: googleToast });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
            <p className="text-slate-400 text-sm font-light">
              Join AuraStudy &amp; experience intelligent agentic learning
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
            Sign up with Google
          </Button>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-x-0 h-px bg-white/[0.06]" />
            <span className="relative px-3 text-xs uppercase tracking-widest text-slate-500 bg-slate-900/10 backdrop-blur-xl">
              or fill details
            </span>
          </div>

          <Form onSubmit={onSubmit} className="space-y-4">
            <TextField isRequired name="name" value={name} onChange={setName}>
              <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-violet-400" />
                Full Name
              </Label>
              <Input
                placeholder="John Doe"
                className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all"
              />
              {nameError && <p className="text-red-400 text-xs mt-1">{nameError}</p>}
            </TextField>

            <TextField name="image" value={imageUrl} onChange={setImageUrl}>
              <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-violet-400" />
                Avatar Image URL (Optional)
              </Label>
              <Input
                placeholder="https://example.com/avatar.png"
                type="url"
                className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all"
              />
            </TextField>

            <TextField isRequired name="email" value={email} onChange={setEmail}>
              <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                Email Address
              </Label>
              <Input
                placeholder="you@example.com"
                type="email"
                className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all"
              />
              {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
            </TextField>

            <TextField isRequired name="password" value={password} onChange={setPassword}>
  <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
    <Lock className="w-3.5 h-3.5 text-violet-400" />
    Password
  </Label>
  <div className="relative flex items-center w-full">
    <Input
      placeholder="Choose a password"
      // state এর ওপর ভিত্তি করে type পরিবর্তন হবে
      type={showPassword ? "text" : "password"} 
      className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all w-full pr-10"
    />
    {/* শো/হাইড করার টগল বাটন */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 text-slate-400 hover:text-white transition-colors focus:outline-none"
    >
      {showPassword ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </button>
  </div>
  {passwordError && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
</TextField>

            <Select
              isRequired
              name="role"
              placeholder="Select account role"
              selectedKey={role}
              onSelectionChange={(key) => setRole(String(key))}
            >
              <Label className="text-slate-300 font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-violet-400" />
                Account Role
              </Label>
              <Select.Trigger className="bg-slate-950/60 border border-white/[0.08] text-white focus:border-violet-500/50 hover:border-white/[0.12] rounded-xl text-sm transition-all w-full flex justify-between items-center px-3 py-2.5">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-2 min-w-[200px]">
                <ListBox>
                  <ListBox.Item id="student" textValue="student" className="hover:bg-slate-800 p-2 rounded-xl text-sm text-slate-200">
                    Student (Access Materials)
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="instructor" textValue="instructor" className="hover:bg-slate-800 p-2 rounded-xl text-sm text-slate-200">
                    Instructor (Publish Content)
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full py-6 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.55)] cursor-pointer hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? "Creating Account..." : "Register Classroom Account"}
              <UserPlus className="w-4 h-4" />
            </Button>
          </Form>

          <p className="text-center text-xs text-slate-400 font-light mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 font-bold hover:underline transition-colors inline-flex items-center gap-0.5">
              Sign In
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </Surface>
      </motion.div>
    </div>
  );
}