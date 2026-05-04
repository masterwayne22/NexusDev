'use client';

import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Trophy, Loader2, Link2, Target, Zap, Award } from 'lucide-react';
import { useSession, useUser } from '@clerk/nextjs';
import { updateUsername } from '@/app/actions';

interface CodeforcesData {
  username: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  solved: number;
}

export const CodeforcesStats = () => {
  const { user } = useUser();
  const { session } = useSession();
  const [data, setData] = useState<CodeforcesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/codeforces');
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
      await updateUsername(user.id, 'codeforces', input);
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
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <GlassPanel className="p-8 border-blue-500/20 bg-blue-500/5">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="p-4 rounded-2xl bg-blue-500/10">
            <Link2 size={40} className="text-blue-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Connect your Codeforces</h2>
            <p className="text-white/40 max-w-sm">
              Enter your Codeforces handle to sync your competitive programming progress.
            </p>
          </div>
          <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input 
              type="text" 
              placeholder="Codeforces Handle" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button 
              type="submit" 
              disabled={isConnecting}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
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
        <GlassPanel className="p-6 border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={18} className="text-blue-400" />
            <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">Current Rating</div>
          </div>
          <div className="text-3xl font-black text-white">{data.rating}</div>
          <div className="text-xs text-white/40 mt-1 capitalize">{data.rank}</div>
        </GlassPanel>
        
        <GlassPanel className="p-6 border-purple-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Award size={18} className="text-purple-400" />
            <div className="text-sm font-bold text-purple-400 uppercase tracking-widest">Peak Rating</div>
          </div>
          <div className="text-3xl font-black text-white">{data.maxRating}</div>
          <div className="text-xs text-white/40 mt-1 capitalize">{data.maxRank}</div>
        </GlassPanel>

        <GlassPanel className="p-6 border-green-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Target size={18} className="text-green-400" />
            <div className="text-sm font-bold text-green-400 uppercase tracking-widest">Problems Solved</div>
          </div>
          <div className="text-3xl font-black text-white">{data.solved}</div>
          <div className="text-xs text-white/40 mt-1">Total Unique Solved</div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GlassPanel className="p-10 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Trophy size={160} className="text-white" />
          </div>
          <Trophy size={64} className="text-yellow-500 mb-6" />
          <div className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Current Rank</div>
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 uppercase">
            {data.rank}
          </div>
          <p className="mt-4 text-white/60 font-medium italic">
            Keep practicing to reach the next level!
          </p>
        </GlassPanel>
      </div>
    </div>
  );
};
