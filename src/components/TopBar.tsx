// src/components/TopBar.tsx
import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';

function TopBarImpl() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between" aria-label="Main">
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5"
          aria-pressed={!sidebarCollapsed ? 'true' : 'false'}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <VisuallyHidden>{sidebarCollapsed ? 'Open menu' : 'Close menu'}</VisuallyHidden>
          {/* your icon here */}
          <span aria-hidden>☰</span>
        </button>

        {/* your centered logo/title block exactly as before */}
        <div className="flex-1 flex items-center justify-center lg:justify-start">
          {/* keep your logo/brand here unchanged */}
        </div>

        <div className="flex items-center gap-2">
          {/* right-side controls unchanged; just ensure buttons have type="button" */}
          <button type="button" className="rounded-md p-2 hover:bg-black/5">?</button>
        </div>
      </nav>
    </header>
  );
}

export const TopBar = React.memo(TopBarImpl);
