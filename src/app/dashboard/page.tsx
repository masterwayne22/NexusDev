'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ArrowLeft, Code2, Award, Terminal, Loader2 } from "lucide-react";
import { GitHubIcon } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityGraph } from "@/components/dashboard/ActivityGraph";
import { MilestoneChart } from "@/components/dashboard/MilestoneChart";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as const 
    } 
  }
} as const;

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
  loading?: boolean;
  error?: string;
}

const StatCard = ({ title, value, label, icon, colorClass, loading, error }: StatCardProps) => (
  <motion.div variants={itemVariants}>
    <GlassPanel className="p-6 flex flex-col gap-4 h-full relative overflow-hidden group" hover>
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colorClass}/10 transition-colors group-hover:${colorClass}/20`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="mt-2">
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 size={24} className="animate-spin text-white/20" />
            <div className="h-8 w-24 bg-white/5 rounded-lg animate-pulse" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm font-medium">Link account</div>
        ) : (
          <>
            <div className={`text-3xl font-black ${colorClass}`}>{value}</div>
            <div className="text-white/40 text-sm font-medium mt-1">{label}</div>
          </>
        )}
      </div>
    </GlassPanel>
  </motion.div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    github: { value: 0, loading: true, error: null as string | null },
    leetcode: { value: 0, loading: true, error: null as string | null },
    codeforces: { value: 'Unranked', loading: true, error: null as string | null },
  });

  const fetchStats = async () => {
    // GitHub
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(prev => ({ ...prev, github: { value: data.repos, loading: false, error: null } }));
    } catch {
      setStats(prev => ({ ...prev, github: { value: 0, loading: false, error: 'error' } }));
    }

    // LeetCode
    try {
      const res = await fetch('/api/leetcode');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(prev => ({ ...prev, leetcode: { value: data.easy + data.medium + data.hard, loading: false, error: null } }));
    } catch {
      setStats(prev => ({ ...prev, leetcode: { value: 0, loading: false, error: 'error' } }));
    }

    // Codeforces
    try {
      const res = await fetch('/api/codeforces');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(prev => ({ ...prev, codeforces: { value: data.rating, loading: false, error: null } }));
    } catch {
      setStats(prev => ({ ...prev, codeforces: { value: 'Unranked', loading: false, error: 'error' } }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
        <StatCard 
          title="GitHub"
          value={stats.github.value}
          label="Public Repositories"
          icon={<GitHubIcon className="text-white" size={24} />}
          colorClass="text-white"
          loading={stats.github.loading}
          error={stats.github.error || undefined}
        />
        
        <StatCard 
          title="LeetCode"
          value={stats.leetcode.value}
          label="Problems Solved"
          icon={<Code2 className="text-orange-400" size={24} />}
          colorClass="text-orange-400"
          loading={stats.leetcode.loading}
          error={stats.leetcode.error || undefined}
        />

        <StatCard 
          title="Codeforces"
          value={stats.codeforces.value}
          label="Current Rating"
          icon={<Award className="text-blue-400" size={24} />}
          colorClass="text-blue-400"
          loading={stats.codeforces.loading}
          error={stats.codeforces.error || undefined}
        />
        
        <motion.div variants={itemVariants}>
          <GlassPanel className="p-6 flex flex-col gap-4 h-full" hover>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Terminal className="text-purple-400" size={24} />
              </div>
              <h2 className="text-xl font-bold">AI Insights</h2>
            </div>
            <div className="mt-2">
              <p className="text-white/70 text-sm leading-relaxed">
                Your coding momentum is increasing! Keep pushing to GitHub and solving problems to stay ahead.
              </p>
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <ActivityGraph />
        <MilestoneChart stats={{
          github: stats.github.value,
          leetcode: stats.leetcode.value,
          codeforces: stats.codeforces.value
        }} />
      </motion.div>
    </div>
  );
}
