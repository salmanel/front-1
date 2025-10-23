// src/main.tsx
import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// If you already have a global stylesheet (e.g., index.css or tailwind.css),
// keep your existing import. If not, you can create styles/hardening.css and import it here.
// import './index.css';
// import './styles/hardening.css';

const rootEl = document.getElementById('root')!;
createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<></>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
