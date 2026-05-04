'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { GlassPanel } from '../ui/GlassPanel';

const data = [
  { name: 'Mon', score: 400 },
  { name: 'Tue', score: 300 },
  { name: 'Wed', score: 600 },
  { name: 'Thu', score: 800 },
  { name: 'Fri', score: 500 },
  { name: 'Sat', score: 900 },
  { name: 'Sun', score: 1100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-xl p-3 rounded-xl shadow-2xl">
        <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Nexus Activity</p>
        <p className="text-white text-xl font-black">{payload[0].value} <span className="text-blue-400 text-xs font-medium">pts</span></p>
      </div>
    );
  }
  return null;
};

export const ActivityGraph = () => {
  return (
    <GlassPanel className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Nexus Activity</h2>
          <p className="text-white/40 text-sm">Unified momentum across platforms</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
            Live
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
};
