// src/components/ResultsView.tsx
import React, { useMemo, useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';

type Finding = {
  id: string;
  severity: 'INFO'|'LOW'|'MEDIUM'|'HIGH'|'CRITICAL';
  title: string;
  description?: string;
  icon?: string; // optional icon path
};

type Props = { findings?: Finding[] };

const DEFAULT_LIMIT = 200;

function ResultsViewImpl({ findings = [] }: Props) {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const visible = useMemo(() => findings.slice(0, limit), [findings, limit]);
  const hasMore = findings.length > limit;

  return (
    <section aria-labelledby="results-title" className="space-y-4">
      <h2 id="results-title" className="text-xl font-semibold">Results</h2>
      <div className="overflow-auto rounded-md border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-black/5 text-left">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Severity</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((f, idx) => (
              <tr key={f.id || idx} className="border-t">
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{f.severity}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {f.icon ? (
                      <SmartImage
                        src={f.icon}
                        alt=""
                        width={16}
                        height={16}
                        className="inline-block"
                      />
                    ) : null}
                    <span>{f.title}</span>
                  </div>
                </td>
                <td className="px-3 py-2">{f.description || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasMore && (
          <div className="p-3">
            <button
              type="button"
              className="rounded-md border px-3 py-1"
              onClick={() => setLimit(limit + DEFAULT_LIMIT)}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export const ResultsView = React.memo(ResultsViewImpl);
