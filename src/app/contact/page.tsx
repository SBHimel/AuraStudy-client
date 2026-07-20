"use client";

import { useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { Mail, MessageCircle, Send, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {" "}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Header */}{" "}
        <div className="max-w-3xl mb-12">
          {" "}
          <p className="text-sm uppercase tracking-widest font-bold text-violet-400">
            Get in Touch{" "}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black mt-3">
            We would love to
            <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              hear from you.
            </span>
          </h1>
          <p className="text-slate-400 text-lg mt-5 leading-relaxed">
            Have a question, feedback, or need help? Send us a message and our
            team will get back to you.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6">
              <div className="w-11 h-11 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-5">
                <Mail className="w-5 h-5 text-violet-400" />
              </div>

              <h3 className="font-bold text-lg">Email Us</h3>

              <p className="text-slate-400 text-sm mt-2">
                s.b.himel21@gmail.com
              </p>
            </div>

            <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                <MessageCircle className="w-5 h-5 text-indigo-400" />
              </div>

              <h3 className="font-bold text-lg">Support</h3>

              <p className="text-slate-400 text-sm mt-2">
                Our support team is here to help with your learning journey.
              </p>
            </div>

            <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-violet-400" />
                <span className="text-sm">Online Learning Platform</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300 mt-4">
                <Clock className="w-5 h-5 text-violet-400" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
            {submitted ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Send className="w-7 h-7 text-emerald-400" />
                </div>

                <h2 className="text-2xl font-black">
                  Message Sent Successfully!
                </h2>

                <p className="text-slate-400 mt-3 max-w-md">
                  Thank you for reaching out. We will get back to you as soon as
                  possible.
                </p>

                <Button
                  onPress={() => setSubmitted(false)}
                  variant="bordered"
                  className="mt-6 border-white/10 text-slate-300 rounded-xl"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    placeholder="Enter your name"
                    variant="bordered"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    variant="bordered"
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="How can we help you?"
                  variant="bordered"
                  required
                />

                <TextArea
                  label="Message"
                  placeholder="Write your message here..."
                  variant="bordered"
                  className="min-h-32"
                  required
                />

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
