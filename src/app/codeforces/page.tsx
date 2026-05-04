import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ArrowLeft, Target } from "lucide-react";
import { CodeforcesStats } from "@/components/dashboard/CodeforcesStats";

export default function CodeforcesPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Target size={32} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">Codeforces</h1>
            <p className="text-white/60">Competitive programming statistics and ranking.</p>
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

      <CodeforcesStats />
    </div>
  );
}
