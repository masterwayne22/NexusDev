'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { BrainCircuit, BookOpen, RefreshCw, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RevisionTopic {
  topic: string;
  count: number;
  suggestions: string[];
}

export const RevisionAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RevisionTopic[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startRevision = async () => {
    setIsAnalyzing(true);
    setLoading(true);
    
    try {
      // Fetch recent activity to analyze
      const cfRes = await fetch('/api/codeforces');
      const cfData = await cfRes.ok ? await cfRes.json() : null;
      
      // Simulate AI analysis of the current month's work
      // In a real app, you'd send the list of solved problem IDs/tags to an LLM
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTopics: RevisionTopic[] = [
        {
          topic: 'Dynamic Programming',
          count: 12,
          suggestions: ['Revisit Knapsack variations', 'Review Bitmask DP state transitions']
        },
        {
          topic: 'Graph Theory',
          count: 8,
          suggestions: ['Practice Dijkstra on weighted grids', 'Review Bridge-finding algorithm']
        },
        {
          topic: 'String Manipulation',
          count: 5,
          suggestions: ['Review KMP pattern matching', 'Practice Rolling Hash problems']
        }
      ];
      
      setData(mockTopics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <GlassPanel className="p-8 border-purple-500/20 bg-purple-500/5 min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <BrainCircuit className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Revision Assistant</h2>
            <p className="text-white/40 text-sm">Review this month&apos;s learning progress</p>
          </div>
        </div>
        
        {!data && !loading && (
          <button 
            onClick={startRevision}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <Sparkles size={18} />
            Analyze Month
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative">
              <Loader2 className="animate-spin text-purple-500" size={64} />
              <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-pulse" size={20} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-white text-lg font-medium">Scanning your activity...</p>
              <p className="text-white/40 text-sm italic">Identifying core concepts and knowledge gaps</p>
            </div>
          </motion.div>
        ) : data ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-purple-400 uppercase tracking-widest">{item.topic}</span>
                    <span className="text-xs text-white/20 font-bold">{item.count} Solved</span>
                  </div>
                  <ul className="space-y-3">
                    {item.suggestions.map((sug, sIdx) => (
                      <li key={sIdx} className="flex gap-2 text-sm text-white/70 leading-snug">
                        <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                        {sug}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm italic">
                AI suggests focusing on <span className="text-purple-400 font-bold underline">Dynamic Programming</span> this weekend.
              </p>
              <button 
                onClick={() => setData(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                <RefreshCw size={14} />
                Refresh Analysis
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="p-6 rounded-3xl bg-white/5 mb-6">
              <BookOpen size={48} className="text-white/10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ready to revise?</h3>
            <p className="text-white/40 max-w-md">
              The AI will analyze your GitHub commits, LeetCode submissions, and Codeforces activity from the last 30 days to generate a personalized revision guide.
            </p>
          </div>
        )}
      </AnimatePresence>
    </GlassPanel>
  );
};
