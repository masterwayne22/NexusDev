import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ArrowLeft, Sparkles, BrainCircuit } from "lucide-react";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { RevisionAssistant } from "@/components/dashboard/RevisionAssistant";

export default function InsightsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Sparkles size={32} className="text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">AI Career Insights</h1>
            <p className="text-white/60">AI-powered analysis of your developer profile.</p>
          </div>
        </div>
        
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </header>

      <AIInsights />

      <RevisionAssistant />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <BrainCircuit className="text-purple-400" size={20} />
            Skill Assessment
          </h2>
          <p className="text-white/70 leading-relaxed">
            Based on your repository languages and LeetCode focus, your strongest areas are <span className="text-blue-400">System Design</span> and <span className="text-blue-400">Back-end Architecture</span>.
          </p>
        </GlassPanel>

        <GlassPanel className="p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Sparkles className="text-yellow-400" size={20} />
            Growth Opportunities
          </h2>
          <p className="text-white/70 leading-relaxed">
            Increasing your activity in <span className="text-pink-400">Open Source</span> contributions could significantly boost your visibility to recruiters in the next quarter.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
