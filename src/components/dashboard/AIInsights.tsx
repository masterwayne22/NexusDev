'use client';

import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Sparkles, BrainCircuit, Loader2 } from 'lucide-react';

export const AIInsights = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateInsights = async () => {
      try {
        // 1. Fetch real GitHub data
        const ghResponse = await fetch('/api/stats?username=octocat');
        const ghData = await ghResponse.json();
        
        // 2. Mock LeetCode data for now (or fetch if API existed)
        const leetcodeSolved = 45; // Test value below 50
        
        // 3. Get AI analysis
        const aiResponse = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            githubRepos: ghData.repos || 0,
            leetcodeSolved: leetcodeSolved
          })
        });
        
        const aiData = await aiResponse.json();
        setInsight(aiData.summary);
      } catch (err) {
        setInsight("Unable to generate insights at this time.");
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="animate-spin text-purple-500" size={48} />
        <p className="text-white/40 italic">Analyzing your developer DNA...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in duration-1000">
      <GlassPanel className="p-8 border-purple-500/20 bg-purple-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BrainCircuit size={120} />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Sparkles className="text-purple-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Personalized Analysis</h2>
          </div>
          
          <p className="text-xl text-white/80 leading-relaxed font-medium italic">
            &quot;{insight}&quot;
          </p>
          
          <div className="pt-6 border-t border-white/5 flex gap-4">
            <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
              Gemini Pro
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs font-bold uppercase tracking-widest">
              Real-time Analysis
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
