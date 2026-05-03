'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Code2, 
  Sparkles, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { GlassPanel } from '../ui/GlassPanel';

export const GitHubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'GitHub', href: '/github', icon: GitHubIcon },
  { name: 'LeetCode', href: '/leetcode', icon: Code2 },
  { name: 'AI Insights', href: '/insights', icon: Sparkles },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 glass rounded-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out",
        "w-64 p-4 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <GlassPanel className="h-full p-4 flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 py-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NexusDev</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    isActive ? "text-blue-400" : "group-hover:text-blue-400"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>



          {/* Profile Section */}
          <div className="mt-auto pt-4 border-t border-white/5">
            <SignedIn>
              <div className="flex items-center gap-3 px-2 py-3 hover:bg-white/5 rounded-xl transition-colors">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10 rounded-full",
                      userButtonPopoverCard: "bg-[#0a0a0a] border border-white/10 backdrop-blur-xl",
                      userButtonPopoverActionButtonText: "text-white/80",
                      userButtonPopoverActionButtonIcon: "text-white/80",
                    }
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white truncate max-w-[120px]">Account</span>
                  <span className="text-xs text-white/40 italic">Nexus Member</span>
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <User size={20} />
                  <span className="font-medium">Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </GlassPanel>
      </aside>
    </>
  );
};
