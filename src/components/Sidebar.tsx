// src/components/Sidebar.tsx
import React from 'react';
import { useAppStore } from '@/stores/appStore';

type Props = {
  activeView: string;
  onViewChange: (v: string) => void;
};

function SidebarImpl({ activeView, onViewChange }: Props) {
  const { sidebarCollapsed } = useAppStore();
  const items = [
    { id: 'soft', label: 'Soft' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'logs', label: 'Logs' },
    { id: 'results', label: 'Results' },
  ];

  return (
    <aside
      className={`transition-transform duration-150 ease-out bg-white border-r w-72 ${sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
      aria-label="Sidebar"
    >
      <nav className="p-4" role="navigation" aria-label="Views">
        <ul className="space-y-1">
          {items.map(item => {
            const active = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`w-full text-left rounded-md px-3 py-2 ${active ? 'bg-black/10 font-medium' : 'hover:bg-black/5'}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => onViewChange(item.id)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export const Sidebar = React.memo(SidebarImpl);
