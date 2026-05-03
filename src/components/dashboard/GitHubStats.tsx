'use client';

import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ExternalLink, Loader2 } from 'lucide-react';

interface Stats {
  repos: number;
  followers: number;
  stars: number;
  name: string;
  avatar: string;
  bio: string;
}

export const GitHubStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Using 'octocat' as a default, but this could be dynamic
        const response = await fetch('/api/stats?username=octocat');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <GlassPanel className="p-6 border-red-500/20 bg-red-500/5">
        <p className="text-red-400 font-medium">Error: {error}</p>
      </GlassPanel>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Total Repos</div>
          <div className="text-3xl font-black text-white">{stats?.repos || 0}</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-1">Total Stars</div>
          <div className="text-3xl font-black text-white">{stats?.stars || 0}</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-1">Followers</div>
          <div className="text-3xl font-black text-white">{stats?.followers || 0}</div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-8 flex flex-col items-center justify-center min-h-[400px] border-dashed border-white/10">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mx-auto mb-6">
            <img src={stats?.avatar} alt={stats?.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-white">{stats?.name || 'GitHub User'}</h2>
          <p className="text-white/40 max-w-md mx-auto italic">
            &quot;{stats?.bio || 'No bio available'}&quot;
          </p>
          <div className="pt-4">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <ExternalLink size={32} className="text-white/20" />
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
