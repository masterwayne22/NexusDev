'use client';

import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ExternalLink, Loader2, Link2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { updateUserConnections } from '@/app/actions/user';

interface Stats {
  repos: number;
  followers: number;
  stars: number;
  name: string;
  avatar: string;
  bio: string;
}

export const GitHubStats = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubInput, setGithubInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubInput.trim()) return;
    
    setIsConnecting(true);
    try {
      await updateUserConnections({ githubUsername: githubInput });
      await user?.reload();
      await fetchStats();
    } catch {
      setError('Failed to update connection');
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

  if (error || !stats) {
    return (
      <div className="space-y-6">
        <GlassPanel className="p-8 border-blue-500/20 bg-blue-500/5">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="p-4 rounded-2xl bg-blue-500/10">
              <Link2 size={40} className="text-blue-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Connect your GitHub</h2>
              <p className="text-white/40 max-w-sm">
                Enter your GitHub username to aggregate your contributions and repositories.
              </p>
            </div>
            <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input 
                type="text" 
                placeholder="GitHub Username" 
                value={githubInput}
                onChange={(e) => setGithubInput(e.target.value)}
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
      </div>
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
