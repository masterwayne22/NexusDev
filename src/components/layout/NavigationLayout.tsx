'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

export const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="flex min-h-screen">
      {!isHomePage && <Sidebar />}
      <main className={cn(
        "flex-1 w-full transition-all duration-300",
        !isHomePage && "lg:pl-64"
      )}>
        {children}
      </main>
    </div>
  );
};
