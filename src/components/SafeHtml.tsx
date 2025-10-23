// src/components/SafeHtml.tsx
import DOMPurify from 'dompurify';

export function SafeHtml({ html }: { html: string }) {
  return (
    <div
      // Sanitization prevents XSS; styling remains identical to your existing container.
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
      }}
    />
  );
}
