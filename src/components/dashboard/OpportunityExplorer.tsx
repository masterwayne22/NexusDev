'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { 
  Trophy, 
  Lightbulb, 
  Globe, 
  ArrowUpRight, 
  Code, 
  Zap, 
  ExternalLink,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HACKATHONS = [
  { name: 'Google Girl Hackathon 2026', date: 'June 15-20', reward: '$5000', platform: 'Google', link: 'https://buildyourfuture.withgoogle.com/' },
  { name: 'MLH Summer League', date: 'July 1-30', reward: 'Swag + Internship', platform: 'MLH', link: 'https://mlh.io/' },
  { name: 'Devfolio Ethereum India', date: 'August 10-12', reward: '10 ETH Pool', platform: 'Devfolio', link: 'https://devfolio.co/' },
];

const OS_IDEAS = [
  { title: 'AI-Powered Documentation Generator', difficulty: 'Intermediate', tags: ['Python', 'LLM', 'Docs'], description: 'Create a tool that scans codebases and generates technical READMEs using Gemini API.' },
  { title: 'Glassmorphic UI Component Library', difficulty: 'Beginner', tags: ['React', 'CSS', 'Design'], description: 'A collection of reusable, highly-aesthetic React components for modern web apps.' },
  { title: 'Distributed Task Orchestrator', difficulty: 'Advanced', tags: ['Go', 'Redis', 'Systems'], description: 'Build a lightweight alternative to Airflow for small-scale background job processing.' },
];

const PLATFORMS = [
  { name: 'Devpost', type: 'Hackathons', url: 'https://devpost.com' },
  { name: 'GitHub Explore', type: 'Open Source', url: 'https://github.com/explore' },
  { name: 'Unstop', type: 'Competitions', url: 'https://unstop.com' },
  { name: 'Good First Issue', type: 'OS Contributions', url: 'https://goodfirstissue.dev' },
];

export const OpportunityExplorer = () => {
  const [activeTab, setActiveTab] = useState<'hackathons' | 'oss' | 'platforms'>('hackathons');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
            <Zap className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Opportunity Explorer</h2>
            <p className="text-white/40 text-sm">Fuel your growth with hand-picked challenges</p>
          </div>
        </div>

        <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 self-start">
          {(['hackathons', 'oss', 'platforms'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-white/10 text-white shadow-lg' 
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTab === 'hackathons' && HACKATHONS.map((h, i) => (
            <GlassPanel key={i} className="p-5 flex flex-col gap-4 group" hover>
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Trophy size={20} />
                </div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">{h.platform}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">{h.name}</h3>
                <p className="text-sm text-white/40 mt-1">{h.date}</p>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-green-400">{h.reward}</span>
                <a 
                  href={h.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </GlassPanel>
          ))}

          {activeTab === 'oss' && OS_IDEAS.map((idea, i) => (
            <GlassPanel key={i} className="p-5 flex flex-col gap-4 group" hover>
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Lightbulb size={20} />
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  idea.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-400' : 
                  idea.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  {idea.difficulty}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">{idea.title}</h3>
                <p className="text-xs text-white/40 mt-2 line-clamp-2 italic leading-relaxed">&quot;{idea.description}&quot;</p>
              </div>
              <div className="flex gap-2 mt-auto pt-4 flex-wrap">
                {idea.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-white/20 px-2 py-0.5 rounded-full bg-white/5">#{tag}</span>
                ))}
              </div>
            </GlassPanel>
          ))}

          {activeTab === 'platforms' && PLATFORMS.map((p, i) => (
            <GlassPanel key={i} className="p-5 flex items-center justify-between group" hover>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-white/40">{p.type}</p>
                </div>
              </div>
              <a 
                href={p.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-white/20 hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </GlassPanel>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
