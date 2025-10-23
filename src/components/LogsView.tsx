// src/components/LogsView.tsx
import React, { useMemo, useState } from 'react';

type Log = { ts: string; level: 'INFO'|'WARN'|'ERROR'; msg: string };
type Props = { logs?: Log[] };

const DEFAULT_LIMIT = 400;

function LogsViewImpl({ logs = [] }: Props) {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const visible = useMemo(() => logs.slice(0, limit), [logs, limit]);
  const hasMore = logs.length > limit;

  return (
    <section aria-labelledby="logs-title" className="space-y-4">
      <h2 id="logs-title" className="text-xl font-semibold">Logs</h2>
      <div className="rounded-md border bg-white p-3 font-mono text-sm overflow-auto max-h-[70vh]">
        {visible.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            [{l.ts}] {l.level}: {l.msg}
          </div>
        ))}
        {hasMore && (
          <div className="pt-3">
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
export const LogsView = React.memo(LogsViewImpl);
