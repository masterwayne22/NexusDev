'use client';

import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { AlertTriangle, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeakTopic {
  tag: string;
  accuracy: number;
  solved: number;
}

interface Recommendation {
  name: string;
  difficulty?: string;
  rating?: number;
  id?: string;
  tags?: string[];
}

interface WeakAreaAnalysisProps {
  weakTopics: WeakTopic[];
  recommendations: Recommendation[];
  platform: 'leetcode' | 'codeforces';
}

export const WeakAreaAnalysis = ({ weakTopics, recommendations, platform }: WeakAreaAnalysisProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Weak Areas */}
      <GlassPanel className="p-6 border-red-500/20 bg-red-500/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-500/20">
            <AlertTriangle className="text-red-400" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">DSA Weak Spots</h3>
        </div>

        <div className="space-y-4">
          {weakTopics.length > 0 ? weakTopics.map((topic, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium">{topic.tag}</span>
                <span className="text-red-400 font-bold">{Math.round(topic.accuracy * 100)}% Accuracy</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.accuracy * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className="h-full bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                />
              </div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                {topic.solved} problems solved in this domain
              </p>
            </div>
          )) : (
            <p className="text-white/40 italic">Not enough data to analyze weak areas yet.</p>
          )}
        </div>
      </GlassPanel>

      {/* Recommended Questions */}
      <GlassPanel className="p-6 border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Lightbulb className="text-yellow-400" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">Focus Questions</h3>
        </div>

        <div className="space-y-3">
          {recommendations.length > 0 ? recommendations.map((item, idx) => (
            <div 
              key={idx} 
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all group"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {item.name}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                    item.difficulty === 'Hard' || (item.rating && item.rating > 1800) ? 'bg-red-500/20 text-red-400' : 
                    item.difficulty === 'Medium' || (item.rating && item.rating > 1400) ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {item.difficulty || item.rating || 'Medium'}
                  </span>
                  {item.tags?.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-white/30 italic">#{tag}</span>
                  ))}
                </div>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
          )) : (
            <p className="text-white/40 italic">Keep solving to get personalized recommendations!</p>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5">
          <button className="w-full py-2 rounded-lg bg-white/5 text-white/60 text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            View All Recommendations
            <ExternalLink size={12} />
          </button>
        </div>
      </GlassPanel>
    </div>
  );
};
