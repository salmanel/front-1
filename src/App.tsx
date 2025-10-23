import { useState, useEffect, useCallback, lazy } from 'react';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useAppStore } from '@/stores/appStore';

// Lazy-load panels to reduce initial JS without changing visuals.
// (They are named exports, so we map them to default here.)
const SoftPanel = lazy(() => import('@/components/SoftPanel').then(m => ({ default: m.SoftPanel })));
const AdvancedPanel = lazy(() => import('@/components/AdvancedPanel').then(m => ({ default: m.AdvancedPanel })));
const LogsView = lazy(() => import('@/components/LogsView').then(m => ({ default: m.LogsView })));
const ResultsView = lazy(() => import('@/components/ResultsView').then(m => ({ default: m.ResultsView })));

// Optional: invisible "skip to content" target improves keyboard nav with zero visual impact.
const SkipLink = () => (
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2 focus:rounded-md focus:bg-white focus:text-black"
  >
    Skip to content
  </a>
);

function App() {
  const { mode, sidebarCollapsed, setSidebarCollapsed } = useAppStore();
  const [activeView, setActiveView] = useState<string>(mode);

  const isAdvancedMode = mode === 'advanced' || activeView === 'advanced';

  // Keep activeView synced with global mode
  useEffect(() => {
    setActiveView(mode);
  }, [mode]);

  // Responsive sidebar using matchMedia (more reliable than raw resize width checks)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023.98px)'); // < lg
    const handleMQ = (e: MediaQueryListEvent | MediaQueryList) => {
      // On small screens, sidebar should be collapsed by default
      setSidebarCollapsed(e.matches);
    };

    // Initialize
    handleMQ(mq);
    // Subscribe (newer browsers: addEventListener; fallback to addListener)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleMQ);
      return () => mq.removeEventListener('change', handleMQ);
    } else {
      // @ts-expect-error: older Safari
      mq.addListener(handleMQ);
      // @ts-expect-error: older Safari
      return () => mq.removeListener(handleMQ);
    }
  }, [setSidebarCollapsed]);

  // Smooth scroll to top when view changes (respect reduced motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [activeView]);

  // Close sidebar (mobile) on overlay click or ESC
  const closeSidebar = useCallback(() => setSidebarCollapsed(false), [setSidebarCollapsed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeSidebar]);

  const renderMainContent = () => {
    switch (activeView) {
      case 'soft':
        return <SoftPanel />;
      case 'advanced':
        return <AdvancedPanel />;
      case 'logs':
        return <LogsView />;
      case 'results':
        return <ResultsView />;
      default:
        return <SoftPanel />;
    }
  };

  return (
    <div className={`min-h-screen ${isAdvancedMode ? 'bg-neutral' : 'bg-background'}`}>
      <SkipLink />
      <TopBar />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main id="main" className="flex-1 p-8 lg:p-12 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>
      <Toaster />
      {sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          role="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}

export default App;
