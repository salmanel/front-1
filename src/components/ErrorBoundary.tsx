// src/components/ErrorBoundary.tsx
import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown): State {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Optional: send to your logger/Sentry etc.
    // console.error('UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Keep it minimal to avoid layout shifts; you can customize later.
      return (
        <div role="alert" style={{ padding: 12 }}>
          Something went wrong. {/* Keep copy neutral to avoid UX drift */}
        </div>
      );
    }
    return this.props.children;
  }
}
