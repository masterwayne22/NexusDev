import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ArrowLeft, Code2, Trophy } from "lucide-react";

export default function LeetCodePage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Code2 size={32} className="text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">LeetCode</h1>
            <p className="text-white/60">Algorithmic progress and problem solving metrics.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-green-400 uppercase tracking-widest mb-1">Easy</div>
          <div className="text-3xl font-black text-white">150</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-1">Medium</div>
          <div className="text-3xl font-black text-white">142</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Hard</div>
          <div className="text-3xl font-black text-white">50</div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Trophy size={64} className="text-orange-400/20 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white">Rank: Top 5%</h2>
          <p className="text-white/40 max-w-md mx-auto">
            Your global ranking and contest rating history will be visualized here once the integration is complete.
          </p>
        </div>
      </GlassPanel>
    </div>
  );
}
