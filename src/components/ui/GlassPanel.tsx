import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'card';
  hover?: boolean;
}

export const GlassPanel = ({ 
  children, 
  className, 
  variant = 'default',
  hover = false,
  ...props 
}: GlassPanelProps) => {
  return (
    <div
      className={cn(
        variant === 'default' ? 'glass' : 'glass-card',
        hover && 'hover:glass-card-hover',
        'rounded-2xl p-6 overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
