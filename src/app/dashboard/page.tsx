"use client";

import { Card,} from "@heroui/react";
import Link from "next/link";
import { PlusCircle, List, BarChart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-black mb-8 text-white">Instructor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Add New Course" 
          desc="Create and publish a new course" 
          icon={<PlusCircle className="w-8 h-8 text-violet-400" />} 
          href="/dashboard/add-item" 
        />
        <DashboardCard 
          title="Manage Courses" 
          desc="Edit or delete your courses" 
          icon={<List className="w-8 h-8 text-indigo-400" />} 
          href="/dashboard/manage-items" 
        />
        <DashboardCard 
          title="Analytics" 
          desc="View your course performance" 
          icon={<BarChart className="w-8 h-8 text-emerald-400" />} 
          href="#" 
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, icon, href }: any) {
  return (
    <Link href={href}>
      <Card className="bg-slate-900/50 border border-white/[0.08] hover:bg-slate-900 transition-all cursor-pointer">
        <Card className="p-6 flex flex-col items-center text-center gap-3">
          {icon}
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-sm text-slate-400">{desc}</p>
        </Card>
      </Card>
    </Link>
  );
}