// src/components/AdvancedPanel.tsx
import React from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';

function AdvancedPanelImpl() {
  return (
    <section aria-labelledby="adv-title" className="space-y-6">
      <h2 id="adv-title" className="text-xl font-semibold">Advanced Scan</h2>

      <SmartImage
        src="/assets/advanced-hero.png"
        alt=""
        width={1200}
        height={320}
        className="w-full h-auto rounded-xl"
        critical
      />

      {/* Keep your existing advanced controls; ensure every icon-only button has a label */}
      <div className="flex gap-2">
        <button type="button" className="rounded-md border px-3 py-2">
          <VisuallyHidden>Import custom payloads</VisuallyHidden>
          <span aria-hidden>⭳</span>
        </button>
        <button type="button" className="rounded-md border px-3 py-2">
          <VisuallyHidden>Export configuration</VisuallyHidden>
          <span aria-hidden>⤓</span>
        </button>
      </div>
    </section>
  );
}
export const AdvancedPanel = React.memo(AdvancedPanelImpl);
