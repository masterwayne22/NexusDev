import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ArrowLeft, Code2 } from "lucide-react";
import { LeetCodeStats } from "@/components/dashboard/LeetCodeStats";

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

      <LeetCodeStats />
    </div>
  );
}
