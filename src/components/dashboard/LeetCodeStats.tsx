'use client';

import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Code2, Loader2, Link2, Trophy, Flame } from 'lucide-react';
import { useSession, useUser } from '@clerk/nextjs';
import { updateUsername } from '@/app/actions';
import { WeakAreaAnalysis } from './WeakAreaAnalysis';

interface LeetCodeData {
  username: string;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
  streak: number;
  weakTopics: Array<{ tag: string; accuracy: number; solved: number }>;
  recommendations: Array<{ name: string; difficulty: string; id: string }>;
}

export const LeetCodeStats = () => {
  const { user } = useUser();
  const { session } = useSession();
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/leetcode');
      if (!response.ok) throw new Error('Not linked');
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError('Not linked');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsConnecting(true);
    try {
      if (!user?.id) return;
      await updateUsername(user.id, 'leetcode', input);
      await session?.reload();
      await fetchStats();
    } catch {
      setError('Failed to link account');
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <GlassPanel className="p-8 border-orange-500/20 bg-orange-500/5">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="p-4 rounded-2xl bg-orange-500/10">
            <Link2 size={40} className="text-orange-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Connect your LeetCode</h2>
            <p className="text-white/40 max-w-sm">
              Enter your LeetCode username to sync your problem-solving progress.
            </p>
          </div>
          <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input 
              type="text" 
              placeholder="LeetCode Username" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button 
              type="submit" 
              disabled={isConnecting}
              className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-50"
            >
              {isConnecting ? 'Linking...' : 'Connect'}
            </button>
          </form>
        </div>
      </GlassPanel>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-green-400 uppercase tracking-widest mb-1">Easy Solved</div>
          <div className="text-3xl font-black text-white">{data.easy}</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-1">Medium Solved</div>
          <div className="text-3xl font-black text-white">{data.medium}</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Hard Solved</div>
          <div className="text-3xl font-black text-white">{data.hard}</div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassPanel className="p-8 flex flex-col items-center justify-center min-h-[300px]">
          <Trophy size={48} className="text-orange-400 mb-4" />
          <div className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Global Ranking</div>
          <div className="text-4xl font-black text-white">#{data.ranking.toLocaleString()}</div>
        </GlassPanel>

        <GlassPanel className="p-8 flex flex-col items-center justify-center min-h-[300px]">
          <Flame size={48} className="text-red-500 mb-4 animate-pulse" />
          <div className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Daily Streak</div>
          <div className="text-4xl font-black text-white">{data.streak} Days</div>
        </GlassPanel>
      </div>

      <WeakAreaAnalysis 
        weakTopics={data.weakTopics} 
        recommendations={data.recommendations} 
        platform="leetcode" 
      />
    </div>
  );
};
