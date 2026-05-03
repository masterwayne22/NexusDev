import { Sparkles } from "lucide-react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <GlassPanel className="max-w-4xl w-full flex flex-col items-center gap-12 py-20 px-8 text-center" variant="default">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-pulse">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-6xl font-black tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              NexusDev
            </span>
          </h1>
          <p className="text-white/60 text-xl max-w-lg font-medium leading-relaxed">
            Your unified developer identity. Aggregating GitHub, LeetCode, and Codeforces stats into one stunning dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/dashboard"
            className="group relative flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-8 text-black font-bold transition-all hover:scale-105 active:scale-95"
          >
            Enter Dashboard
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 blur group-hover:opacity-40 transition-opacity" />
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20"
          >
            Star on GitHub
          </a>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-8">
          {[
            { label: "Real-time Stats", desc: "Live aggregation" },
            { label: "AI Insights", desc: "Career feedback" },
            { label: "Glass UI", desc: "Modern aesthetics" }
          ].map((feature, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">{feature.label}</div>
              <div className="text-white/40 text-sm">{feature.desc}</div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
