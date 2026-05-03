'use client';

import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ArrowLeft, Code2, Award, Terminal } from "lucide-react";
import { GitHubIcon } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Overview
            </span>
          </h1>
          <p className="text-white/60 mt-2">Welcome back! Here&apos;s your unified developer summary.</p>
        </div>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <motion.div variants={item}>
          <GlassPanel className="p-6 flex flex-col gap-4 h-full" hover>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/5">
                <GitHubIcon className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold">GitHub</h2>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-black">1,245</div>
              <div className="text-white/40 text-sm font-medium mt-1">Total Contributions</div>
            </div>
          </GlassPanel>
        </motion.div>
        
        <motion.div variants={item}>
          <GlassPanel className="p-6 flex flex-col gap-4 h-full" hover>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Code2 className="text-orange-400" size={24} />
              </div>
              <h2 className="text-xl font-bold">LeetCode</h2>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-black text-orange-400">342</div>
              <div className="text-white/40 text-sm font-medium mt-1">Problems Solved</div>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={item}>
          <GlassPanel className="p-6 flex flex-col gap-4 h-full" hover>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Award className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-bold">Codeforces</h2>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-black text-blue-400">1450</div>
              <div className="text-white/40 text-sm font-medium mt-1">Current Rating (Specialist)</div>
            </div>
          </GlassPanel>
        </motion.div>
        
        <motion.div variants={item}>
          <GlassPanel className="p-6 flex flex-col gap-4 h-full" hover>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Terminal className="text-purple-400" size={24} />
              </div>
              <h2 className="text-xl font-bold">AI Insights</h2>
            </div>
            <div className="mt-2">
              <p className="text-white/70 text-sm leading-relaxed">
                Your consistent GitHub activity and recent algorithmic practice show a strong readiness for backend engineering roles.
              </p>
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <GlassPanel className="p-6 min-h-[300px] flex items-center justify-center">
          <p className="text-white/40 italic">Activity Graph Placeholder</p>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
