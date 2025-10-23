// src/components/SoftPanel.tsx
import React, { useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';

function SoftPanelImpl() {
  const [target, setTarget] = useState('');

  return (
    <section aria-labelledby="soft-title" className="space-y-6">
      <h2 id="soft-title" className="text-xl font-semibold">Soft Scan</h2>

      {/* Example hero/illustration (keep your src/classNames) */}
      {/* Replace /assets/soft-hero.png + sizes with your real ones */}
      <SmartImage
        src="/assets/soft-hero.png"
        alt=""
        width={1200}
        height={320}
        className="w-full h-auto rounded-xl"
        critical
      />

      <form
        className="grid gap-4 max-w-xl"
        onSubmit={(e) => { e.preventDefault(); /* keep your submit flow as-is */ }}
      >
        <label htmlFor="target" className="text-sm font-medium">Target URL</label>
        <input
          id="target"
          name="target"
          type="url"
          required
          placeholder="https://example.com"
          className="border rounded-md px-3 py-2"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          // optional: pattern hardening with no visual change
          // pattern="https?://.*"
          // inputMode="url"
        />

        <div className="flex items-center gap-2">
          <button type="submit" className="rounded-md bg-black text-white px-4 py-2">Run scan</button>
          <button type="button" className="rounded-md border px-4 py-2">Reset</button>
        </div>
      </form>
    </section>
  );
}
export const SoftPanel = React.memo(SoftPanelImpl);
