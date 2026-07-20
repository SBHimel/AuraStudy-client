import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // তোমার নতুন ডার্ক ন্যাভবারটি ইম্পোর্ট করলাম
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";


export const metadata: Metadata = {
  title: "AuraStudy - Agentic AI Study Platform",
  description: "Next-gen AI application for modern learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      {/* পুরো সাইটের ব্যাকগ্রাউন্ড ডার্ক সেট করা হলো যেন গ্লাস-ন্যাভবারটা ফুটে ওঠে */}
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-violet-500/30 selection:text-violet-200">
        
        {/* গ্লোবাল ন্যাভবার */}
        <Navbar /> 
        
        {/* মেইন কন্টেন্ট এরিয়া */}
        <main>
          {children}
        </main>

       

        <ChatBot></ChatBot>
        <Footer></Footer>

      </body>
    </html>
  );
}