'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { GlassPanel } from '../ui/GlassPanel';
import { Trophy } from 'lucide-react';

interface MilestoneData {
  name: string;
  current: number;
  target: number;
  color: string;
}

interface MilestoneChartProps {
  stats: {
    github: number;
    leetcode: number;
    codeforces: number | string;
  };
}

export const MilestoneChart = ({ stats }: MilestoneChartProps) => {
  const cfRating = typeof stats.codeforces === 'number' ? stats.codeforces : 0;

  const data: MilestoneData[] = [
    { name: 'GitHub Repos', current: stats.github, target: 20, color: '#ffffff' },
    { name: 'LeetCode Solved', current: stats.leetcode, target: 300, color: '#f97316' },
    { name: 'CF Rating', current: cfRating, target: 1600, color: '#3b82f6' },
    { name: 'Project Quality', current: 75, target: 100, color: '#a855f7' },
  ];

  const processedData = data.map(item => ({
    ...item,
    progress: Math.min((item.current / item.target) * 100, 100)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-xl p-3 rounded-xl shadow-2xl">
          <p className="text-white font-bold mb-1">{item.name}</p>
          <p className="text-white/60 text-xs">
            Progress: <span className="text-white font-black">{item.current}</span> / {item.target}
          </p>
          <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ width: `${item.progress}%`, backgroundColor: item.color }} 
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassPanel className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <Trophy className="text-yellow-500" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Milestone Progress</h2>
          <p className="text-white/40 text-sm">Target vs Actual achievements</p>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={processedData}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 'bold' }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar 
              dataKey="progress" 
              radius={[0, 10, 10, 0]} 
              barSize={20}
              animationDuration={1500}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
};
